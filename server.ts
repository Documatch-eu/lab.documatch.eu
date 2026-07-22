import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { QUESTIONS } from "./src/data/questions";

// Load logo as base64 for inline email rendering
let logoPureBase64 = "";
let logoDataUri = "";
try {
  const logoPath = path.join(process.cwd(), "public", "documatch-logo.jpg");
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    logoPureBase64 = logoBuffer.toString("base64");
    logoDataUri = `data:image/jpeg;base64,${logoPureBase64}`;
  }
} catch (e) {
  console.warn("Could not load logo file for base64 email embedding:", e);
}

// We use the global fetch API since Node 18+ includes it natively.
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

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

    // 2. Send to Formspree (Frontend & Backend public endpoint)
    let formspreeSuccess = false;
    let formspreeResponseText = "";
    const formspreeFormId = process.env.FORMSPREE_FORM_ID || "mrenkqvb";
    
    try {
      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": process.env.APP_URL || "https://documatch.eu",
          "Origin": process.env.APP_URL || "https://documatch.eu"
        },
        body: JSON.stringify({
          client_email: lead.email,
          _subject: `[Documatch Lead] ${lead.company} - ${lead.firstname} ${lead.lastname || ''} (${finalScore}/100)`,
          firstname: lead.firstname,
          lastname: lead.lastname || "",
          company: lead.company,
          role: lead.role,
          phone: lead.phone || "",
          country: lead.country || "",
          score: `${finalScore} / 100`,
          language: currentLang,
          message: answersSummaryText,
          answers: answersSummaryText,
        }),
      });
      formspreeSuccess = formspreeResponse.ok;
      formspreeResponseText = await formspreeResponse.text();
      console.log(`Formspree submission status (${formspreeFormId}):`, formspreeResponse.status, formspreeResponseText);
    } catch (e: any) {
      console.error("Formspree submit error:", e);
      formspreeResponseText = e.message || "Network error";
    }

    // 3. Send via Resend (Server-side secure proxy)
    let resendSuccess = false;
    let resendError = null;
    const resendApiKey = process.env.RESEND_API_KEY || "re_Co1giFQb_GpvTNJjuXjd4Wo33hmNRMipX";

    // Determine localized text templates
    const t = {
      es: {
        ownerSubject: `[Nuevo Lead] Diagnóstico GED (${finalScore}/100) - ${lead.company}`,
        userSubject: `Su Informe de Madurez GED y Facturación Electrónica — Documatch Lab`,
        title: `Informe de Madurez — Documatch Lab`,
        subtitle: `Resultados del diagnóstico de madurez digital y factura electrónica para ${lead.firstname} ${lead.lastname}`,
        ownerLeadInfo: "Información del Lead",
        userLeadInfo: "Información de su Empresa",
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
        ownerSubject: `[Nouveau Lead] Diagnostic GED (${finalScore}/100) - ${lead.company}`,
        userSubject: `Votre Rapport de Maturité GED & Facturation Électronique — Documatch Lab`,
        title: `Rapport de Maturité — Documatch Lab`,
        subtitle: `Résultats du diagnostic de maturité GED et facturation électronique pour ${lead.firstname} ${lead.lastname}`,
        ownerLeadInfo: "Informations du Lead",
        userLeadInfo: "Informations de votre Entreprise",
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
        ownerSubject: `[New Lead] DMS Diagnostic (${finalScore}/100) - ${lead.company}`,
        userSubject: `Your DMS & E-Invoicing Maturity Report — Documatch Lab`,
        title: `Maturity Report — Documatch Lab`,
        subtitle: `DMS and e-Invoicing compliance diagnostic results for ${lead.firstname} ${lead.lastname}`,
        ownerLeadInfo: "Lead Information",
        userLeadInfo: "Your Company & Contact Details",
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

    const buildHtmlEmail = (sectionTitle: string) => `
      <!DOCTYPE html>
      <html lang="${currentLang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <title>${loc.title}</title>
        <style>
          /* Basic Reset */
          body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
          /* Responsive Overrides */
          @media only screen and (max-width: 600px) {
            .email-body-wrapper {
              padding: 8px 4px !important;
            }
            .email-card {
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 8px !important;
              border-left: none !important;
              border-right: none !important;
            }
            .header-padding {
              padding: 24px 16px !important;
            }
            .content-padding {
              padding: 20px 14px !important;
            }
            .score-circle {
              width: 84px !important;
              height: 84px !important;
              line-height: 72px !important;
              font-size: 24px !important;
            }
            .mobile-stack {
              display: block !important;
              width: 100% !important;
            }
            .mobile-text-sm {
              font-size: 12px !important;
            }
            .mobile-hide {
              display: none !important;
            }
          }
        </style>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; width: 100% !important; -webkit-font-smoothing: antialiased;">
        <div class="email-body-wrapper" style="background-color: #f1f5f9; padding: 24px 12px; width: 100%; box-sizing: border-box;">
          
          <!-- Outer Main Container Card -->
          <div class="email-card" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #cbd5e1; overflow: hidden;">
            
            <!-- Header Banner with Documatch Logo -->
            <div class="header-padding" style="background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
              
              <!-- Documatch Logo Badge -->
              <div style="display: inline-block; margin-bottom: 12px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 12px;">
                      <!-- Metallic Badge with Blue D Icon -->
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 52px; height: 52px; background: linear-gradient(145deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%); border-radius: 12px; border-collapse: separate; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
                        <tr>
                          <td style="text-align: center; vertical-align: middle; padding: 3px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 46px; height: 46px; background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%); border-radius: 9px; border-collapse: separate;">
                              <tr>
                                <td style="text-align: center; vertical-align: middle; font-family: Arial, sans-serif; font-size: 32px; font-weight: 900; color: #2563eb; line-height: 1;">
                                  D
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle; text-align: left;">
                      <div style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; line-height: 1;">
                        DOCUMATCH
                        <span style="font-size: 11px; font-weight: 800; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.4); padding: 3px 8px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.8px; margin-left: 4px; vertical-align: middle;">LAB</span>
                      </div>
                      <div style="font-size: 11px; font-weight: 600; color: #93c5fd; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 5px;">GED &amp; Facturation Électronique</div>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%); margin: 16px auto; width: 80%;"></div>

              <h1 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">${loc.title}</h1>
              <p style="margin: 0; font-size: 13px; color: #dbeafe; font-weight: 400; line-height: 1.4;">${loc.subtitle}</p>
            </div>

            <!-- Body Content Area -->
            <div class="content-padding" style="padding: 28px 24px;">
              
              <!-- Company Info Block -->
              <div style="margin-bottom: 28px; background-color: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0;">
                <h2 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">${sectionTitle}</h2>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; table-layout: fixed; word-wrap: break-word;">
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b; width: 38%;">${loc.name}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${lead.firstname} ${lead.lastname || ""}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b;">${loc.email}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #2563eb;"><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none; word-break: break-all;">${lead.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b;">${loc.company}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${lead.company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b;">${loc.role}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${lead.role}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b;">${loc.phone}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${lead.phone || "-"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; font-size: 13px; color: #64748b;">${loc.country}:</td>
                    <td style="padding: 5px 0; font-size: 13px; font-weight: 700; color: #0f172a;">${lead.country || "-"}</td>
                  </tr>
                </table>
              </div>

              <!-- Overall Score Circle Card -->
              <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 14px; padding: 24px 16px; text-align: center; margin-bottom: 28px; border: 1px solid #e2e8f0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">${loc.scoreLabel}</p>
                
                <div class="score-circle" style="display: inline-block; width: 96px; height: 96px; line-height: 84px; border-radius: 50%; background-color: #ffffff; border: 6px solid ${levelColor}; font-size: 28px; font-weight: 900; color: #0f172a; margin: 4px auto 12px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.06); text-align: center; box-sizing: border-box;">
                  <span style="display: inline-block; vertical-align: middle;">${finalScore}</span>
                </div>

                <div style="font-size: 16px; font-weight: 900; color: ${levelColor}; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px;">${finalLevel}</div>
              </div>

              <!-- Axis breakdown table -->
              <div style="margin-bottom: 28px;">
                <h2 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 2px solid #2563eb; padding-bottom: 6px; display: inline-block;">${loc.axisTitle}</h2>
                <div style="border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; table-layout: fixed; word-wrap: break-word;">
                    <thead>
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                        <th style="padding: 10px; text-align: left; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; width: 45%;">Eje / Axe</th>
                        <th style="padding: 10px; text-align: center; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; width: 25%;">Score</th>
                        <th style="padding: 10px; text-align: right; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; width: 30%;">Nivel</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${axisRowsHtml}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Selected Answers List -->
              <div>
                <h2 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 2px solid #2563eb; padding-bottom: 6px; display: inline-block;">${loc.answersTitle}</h2>
                <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px 16px; border: 1px solid #e2e8f0;">
                  ${answersListHtml}
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #1e3a5f; padding: 24px 16px; text-align: center; color: #cbd5e1; font-size: 12px; line-height: 1.6; border-top: 3px solid #2563eb;">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 700; font-size: 13px;">Documatch Lab — Solution GED &amp; Facturation Électronique</p>
              <p style="margin: 0 0 12px 0; color: #94a3b8;">Ce document a été généré automatiquement suite à votre diagnostic en ligne.</p>
              
              <div style="margin: 12px 0;">
                <a href="https://documatch.eu" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 9px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; box-shadow: 0 2px 8px rgba(37,99,235,0.4);">Visiter Documatch.eu</a>
              </div>

              <p style="margin: 12px 0 0 0; font-size: 11px; color: #94a3b8;">
                Questions ? Contactez-nous à <a href="mailto:info@documatch.eu" style="color: #60a5fa; text-decoration: none; font-weight: 600;">info@documatch.eu</a><br>
                &copy; 2026 Documatch.eu. Tous droits réservés.
              </p>
            </div>

          </div>

        </div>
      </body>
      </html>
    `;

    const ownerHtmlContent = buildHtmlEmail(loc.ownerLeadInfo);
    const userHtmlContent = buildHtmlEmail(loc.userLeadInfo);

    // Try sending email via Resend with automatic sandbox fallback
    let emailSentToOwner = false;
    let emailSentToUser = false;

    const sendResendEmail = async (toEmail: string, emailSubject: string, htmlContentStr: string, replyToEmail?: string) => {
      const primaryFrom = "Documatch <noreply@documatch.eu>";
      const fallbackFrom = "Documatch Lab <onboarding@resend.dev>";

      const emailPayload: any = {
        from: primaryFrom,
        to: toEmail,
        reply_to: replyToEmail,
        subject: emailSubject,
        html: htmlContentStr,
      };

      let res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        console.warn(`Primary domain resend to ${toEmail} failed, retrying with onboarding domain:`, errJson);
        emailPayload.from = fallbackFrom;
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });
      }
      return res;
    };

    // 1. Send admin notification to info@documatch.eu
    try {
      const ownerRes = await sendResendEmail("info@documatch.eu", loc.ownerSubject, ownerHtmlContent, lead.email);
      emailSentToOwner = ownerRes.ok;
      if (!ownerRes.ok) {
        resendError = await ownerRes.json().catch(() => "Failed owner send");
      }
    } catch (e: any) {
      console.error("Resend owner error:", e);
      resendError = e.message;
    }

    // 2. Send client report to lead.email
    try {
      const userRes = await sendResendEmail(lead.email, loc.userSubject, userHtmlContent);
      emailSentToUser = userRes.ok;
    } catch (e) {
      console.error("Resend user error:", e);
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
