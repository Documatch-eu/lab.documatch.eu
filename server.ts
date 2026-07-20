import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { QUESTIONS } from "./src/data/questions";

// We use the global fetch API since Node 18+ includes it natively.
const app = express();
const PORT = 3000;

app.use(express.json());

// API route to submit form
app.post("/api/submit-form", async (req, res) => {
  try {
    const { lead, answers, lang } = req.body;

    if (!lead || !lead.email || !lead.firstname || !lead.company) {
      return res.status(400).json({ error: "Missing required lead fields" });
    }

    const currentLang = lang || "en";

    // 1. Calculate score and compile detailed answers
    const axisScores: { [key: string]: number } = {};
    const axisTotals: { [key: string]: { sum: number; count: number } } = {};

    QUESTIONS.forEach((q, idx) => {
      const selectedOptIdx = answers[idx];
      if (selectedOptIdx !== null && selectedOptIdx !== undefined) {
        if (!axisTotals[q.axis]) {
          axisTotals[q.axis] = { sum: 0, count: 0 };
        }
        axisTotals[q.axis].sum += q.opts[selectedOptIdx].s;
        axisTotals[q.axis].count += 1;
      }
    });

    Object.keys(axisTotals).forEach((axis) => {
      const data = axisTotals[axis];
      axisScores[axis] = Math.round((data.sum / data.count) * 10);
    });

    const finalScore = Math.round(
      Object.values(axisScores).reduce((a, b) => a + b, 0) / Object.keys(axisScores).length
    );

    // Build readable answers text for Formspree and email
    const compiledAnswers = QUESTIONS.map((q, idx) => {
      const selectedOptIdx = answers[idx];
      if (selectedOptIdx === null || selectedOptIdx === undefined) return null;
      const opt = q.opts[selectedOptIdx];
      const questionText = currentLang === 'fr' ? q.fr.q : currentLang === 'es' ? q.es.q : q.en.q;
      const optionText = currentLang === 'fr' ? opt.fr : currentLang === 'es' ? opt.es : opt.en;
      return {
        question: questionText,
        answer: optionText,
        score: opt.s
      };
    }).filter(Boolean);

    const answersSummaryText = compiledAnswers
      .map((a, idx) => `Q${idx + 1}: ${a?.question}\nAnswer: ${a?.answer} (${a?.score}/10)`)
      .join("\n\n");

    // 2. Send to Formspree (Frontend public endpoint)
    let formspreeSuccess = false;
    let formspreeResponseText = "";
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/mrenkqvb", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: lead.email,
          firstname: lead.firstname,
          lastname: lead.lastname || "",
          company: lead.company,
          role: lead.role,
          phone: lead.phone || "",
          country: lead.country || "",
          score: finalScore,
          language: currentLang,
          answers: answersSummaryText,
        }),
      });
      formspreeSuccess = formspreeResponse.ok;
      formspreeResponseText = await formspreeResponse.text();
    } catch (e: any) {
      console.error("Formspree submit error:", e);
      formspreeResponseText = e.message || "Network error";
    }

    // 3. Send via Resend (Server-side secure proxy)
    let resendSuccess = false;
    let resendError = null;
    const resendApiKey = process.env.RESEND_API_KEY || "re_Co1giFQb_GpvTNJjuXjd4W...";

    // Determine localized text templates
    const t = {
      es: {
        subject: `Nuevo Diagnóstico de Gestión Documental (${finalScore}/100) - ${lead.company}`,
        title: `Informe de Madurez — Documatch Lab`,
        subtitle: `Resultados del diagnóstico de madurez digital y factura electrónica de ${lead.firstname} ${lead.lastname}`,
        leadInfo: "Información del Lead",
        scoreTitle: "Puntuación de Conformidad",
        axisTitle: "Detalle de los Ejes de Evaluación",
        answersTitle: "Respuestas al Cuestionario",
        levelEx: "Excelente",
        levelGo: "Bueno",
        levelIm: "A mejorar",
        levelCr: "Crítico",
        name: "Nombre",
        company: "Empresa",
        role: "Puesto / Rol",
        phone: "Teléfono",
        country: "País",
        email: "Correo",
        scoreLabel: "Puntuación de madurez global",
      },
      fr: {
        subject: `Nouveau Diagnostic GED & Facturation Électronique (${finalScore}/100) - ${lead.company}`,
        title: `Rapport de Maturité — Documatch Lab`,
        subtitle: `Résultats du diagnostic de maturité GED et facturation électronique pour ${lead.firstname} ${lead.lastname}`,
        leadInfo: "Informations du Lead",
        scoreTitle: "Score de Conformité",
        axisTitle: "Détails des Axes d'Évaluation",
        answersTitle: "Réponses au Questionnaire",
        levelEx: "Excellent",
        levelGo: "Bon",
        levelIm: "À améliorer",
        levelCr: "Critique",
        name: "Nom",
        company: "Entreprise",
        role: "Fonction / Rôle",
        phone: "Téléphone",
        country: "Pays",
        email: "Adresse e-mail",
        scoreLabel: "Score de maturité globale",
      },
      en: {
        subject: `New Document Management System Diagnostic (${finalScore}/100) - ${lead.company}`,
        title: `Maturity Report — Documatch Lab`,
        subtitle: `DMS and e-Invoicing compliance diagnostic results for ${lead.firstname} ${lead.lastname}`,
        leadInfo: "Lead Information",
        scoreTitle: "Compliance Score",
        axisTitle: "Evaluation Axes Breakdown",
        answersTitle: "Questionnaire Answers",
        levelEx: "Excellent",
        levelGo: "Good",
        levelIm: "Needs Improvement",
        levelCr: "Critical",
        name: "Name",
        company: "Company",
        role: "Role",
        phone: "Phone",
        country: "Country",
        email: "Email",
        scoreLabel: "Global maturity score",
      }
    };

    const loc = t[currentLang as keyof typeof t] || t.en;

    // Map overall level
    let finalLevel = loc.levelCr;
    let levelColor = "#ef4444";
    if (finalScore >= 80) {
      finalLevel = loc.levelEx;
      levelColor = "#10b981";
    } else if (finalScore >= 60) {
      finalLevel = loc.levelGo;
      levelColor = "#3b82f6";
    } else if (finalScore >= 40) {
      finalLevel = loc.levelIm;
      levelColor = "#f59e0b";
    }

    // Build the axes rows
    const AXIS_CONF = {
      profil: { name: { fr: 'Profil décisionnel', es: 'Perfil decisional', en: 'Decision Profile' }, color: '#3b82f6' },
      systeme: { name: { fr: 'Maturité système', es: 'Madurez del sistema', en: 'System Maturity' }, color: '#10b981' },
      conformite: { name: { fr: 'Conformité légale', es: 'Conformidad legal', en: 'Legal Compliance' }, color: '#f59e0b' },
      erp: { name: { fr: 'Intégrations ERP', es: 'Integraciones ERP', en: 'ERP Integrations' }, color: '#8b5cf6' },
      projet: { name: { fr: 'Maturité projet', es: 'Madurez du projet', en: 'Project Readiness' }, color: '#ef4444' },
    };

    const axisRowsHtml = Object.keys(AXIS_CONF).map((key) => {
      const scoreVal = axisScores[key] || 0;
      const cfg = AXIS_CONF[key as keyof typeof AXIS_CONF];
      const axisLabel = scoreVal >= 80 ? loc.levelEx : scoreVal >= 60 ? loc.levelGo : scoreVal >= 40 ? loc.levelIm : loc.levelCr;
      const axisName = cfg.name[currentLang as keyof typeof cfg.name] || cfg.name.en;

      return `
        <tr>
          <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;"><strong>${axisName}</strong></td>
          <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-align: center;">
            <span style="font-weight: bold; color: ${cfg.color};">${scoreVal}/100</span>
          </td>
          <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: right;">${axisLabel}</td>
        </tr>
      `;
    }).join("");

    const answersListHtml = compiledAnswers.map((item, idx) => {
      if (!item) return "";
      return `
        <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
          <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #1e3a5f;">Q${idx + 1}: ${item.question}</p>
          <p style="margin: 0; font-size: 13px; color: #334155;"><strong>R:</strong> ${item.answer} <span style="color: #64748b; font-size: 11px; font-weight: normal;">(${item.score}/10)</span></p>
        </div>
      `;
    }).join("");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${loc.title}</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; -webkit-font-smoothing: antialiased;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; overflow: hidden;">
          
          <!-- Header -->
          <div style="background-color: #1e3a5f; padding: 30px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Documatch Lab</h1>
            <p style="margin: 0; font-size: 14px; color: #94a3b8; font-weight: 500;">${loc.subtitle}</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">
            
            <!-- Lead Info Table -->
            <h2 style="font-size: 16px; font-weight: 700; color: #1e3a5f; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${loc.leadInfo}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 35%;">${loc.name}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #1e293b;">${lead.firstname} ${lead.lastname || ""}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${loc.email}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #2563eb;"><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${loc.company}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #1e293b;">${lead.company}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${loc.role}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #1e293b;">${lead.role}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${loc.phone}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #1e293b;">${lead.phone || "-"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${loc.country}</td>
                <td style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #1e293b;">${lead.country || "-"}</td>
              </tr>
            </table>

            <!-- Overall Score Circle Card -->
            <div style="background-color: #f1f5f9; border-radius: 10px; padding: 25px; text-align: center; margin-bottom: 30px;">
              <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">${loc.scoreLabel}</p>
              <div style="display: inline-block; width: 100px; height: 100px; line-height: 88px; border-radius: 50%; background-color: #ffffff; border: 6px solid ${levelColor}; font-size: 28px; font-weight: 800; color: #1e3a5f; margin-bottom: 12px; box-sizing: border-box; text-align: center;">
                <div style="padding-top: 6px;">${finalScore}</div>
              </div>
              <p style="margin: 0; font-size: 16px; font-weight: 800; color: ${levelColor}; text-transform: uppercase; letter-spacing: 0.5px;">${finalLevel}</p>
            </div>

            <!-- Axis breakdown table -->
            <h2 style="font-size: 16px; font-weight: 700; color: #1e3a5f; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${loc.axisTitle}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                  <th style="padding: 10px; text-align: left; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Eje / Axe</th>
                  <th style="padding: 10px; text-align: center; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 25%;">Score</th>
                  <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 30%;">Nivel</th>
                </tr>
              </thead>
              <tbody>
                ${axisRowsHtml}
              </tbody>
            </table>

            <!-- Selected Answers List -->
            <h2 style="font-size: 16px; font-weight: 700; color: #1e3a5f; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${loc.answersTitle}</h2>
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 20px; border: 1px solid #e2e8f0;">
              ${answersListHtml}
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f1f5f9; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.5;">
            <p style="margin: 0 0 5px 0;">Ce document a été généré automatiquement par <strong>Documatch Lab</strong>.</p>
            <p style="margin: 0;">&copy; 2026 Documatch.eu. Tous droits réservés.</p>
          </div>

        </div>
      </body>
      </html>
    `;

    // Try sending email via Resend
    let emailSentToOwner = false;
    let emailSentToUser = false;

    // Send to info@documatch.eu
    try {
      const resendOwnerRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Documatch <noreply@documatch.eu>",
          to: "info@documatch.eu",
          reply_to: lead.email,
          subject: loc.subject,
          html: htmlContent,
        }),
      });
      const ownerData = await resendOwnerRes.json();
      emailSentToOwner = resendOwnerRes.ok;
      if (!resendOwnerRes.ok) {
        resendError = ownerData;
        console.error("Resend owner email failed:", ownerData);
      }
    } catch (e: any) {
      console.error("Resend owner submit error:", e);
      resendError = e.message;
    }

    // Attempt sending a copy to the lead's email (graceful failure allowed for sandbox domains)
    try {
      const resendUserRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Documatch <noreply@documatch.eu>",
          to: lead.email,
          subject: loc.title,
          html: htmlContent,
        }),
      });
      emailSentToUser = resendUserRes.ok;
    } catch (e) {
      console.error("Resend user submit copy error (could be unverified sandbox limit):", e);
    }

    resendSuccess = emailSentToOwner;

    return res.json({
      success: true,
      formspree: formspreeSuccess,
      resend: resendSuccess,
      emailSentToUser,
      resendError,
      formspreeResponse: formspreeResponseText
    });

  } catch (error: any) {
    console.error("API handler error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
