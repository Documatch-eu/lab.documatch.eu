import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { QUESTIONS } from "./src/data/questions";

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

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

// Serve XML Sitemap
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml; charset=utf-8");
  res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
});

// Serve robots.txt
app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
});

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
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("❌ [RESEND ERROR] RESEND_API_KEY environment variable is missing.");
    }

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
      if (!resendApiKey) {
        console.error(`❌ Cannot send email to ${toEmail}: RESEND_API_KEY environment variable is not defined.`);
        return { ok: false, status: 401, json: async () => ({ error: "RESEND_API_KEY environment variable is missing" }) } as Response;
      }

      const primaryFrom = "Documatch <noreply@documatch.eu>";
      const fallbackFrom = "Documatch Lab <onboarding@resend.dev>";

      const emailPayload: any = {
        from: primaryFrom,
        to: toEmail,
        reply_to: replyToEmail || undefined,
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
        const errMsg = errJson.message || errJson.name || JSON.stringify(errJson);

        if (res.status === 401) {
          console.error(`❌ Resend API Key is invalid or revoked (401): ${errMsg}`);
          return {
            ok: false,
            status: 401,
            json: async () => errJson,
          } as Response;
        }

        console.warn(`Primary domain (noreply@documatch.eu) send to ${toEmail} failed (${errMsg}). Retrying with onboarding@resend.dev...`);
        
        emailPayload.from = fallbackFrom;
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });

        if (!res.ok) {
          const fallbackErrJson = await res.json().catch(() => ({}));
          const fallbackErrMsg = fallbackErrJson.message || fallbackErrJson.name || JSON.stringify(fallbackErrJson);
          console.error(`❌ Resend fallback send to ${toEmail} failed (${fallbackErrMsg})`);
          return {
            ok: false,
            status: res.status,
            json: async () => fallbackErrJson,
          } as Response;
        }
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

    resendSuccess = emailSentToOwner || emailSentToUser;

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

// API route for AI Chatbot (DocuBot)
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, lang = "fr", country = "fr", score } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array" });
    }

    const currentLang = (typeof lang === "string" ? lang.toLowerCase() : "fr");
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const langNameMap: Record<string, { name: string; nativeName: string; specificContext: string }> = {
      es: {
        name: "Spanish",
        nativeName: "Español",
        specificContext: `
REGULACIÓN Y CONTEXTO EN ESPAÑA:
- Marco Legal: Ley Crea y Crece (Facturación Electrónica obligatoria B2B) y Reglamento Veri*Factu (Sistemas Informáticos de Facturación y trazabilidad AEAT).
- Calendario: 
  * Fase 1: Empresas con facturación superior a 8M€ (12 meses tras publicación del reglamento técnico definitivo).
  * Fase 2: Resto de empresas, pymes y autónomos (24 meses tras reglamento técnico, previsto 2026-2027).
- Formatos: Facturae (XML), estándares europeos (UBL, CII), plataformas de intercambio privado y solución pública estatal (FACeB2B).
- Sanciones: Multas de hasta 10.000 € por no disponer de sistemas de facturación electrónica o no facilitar el acceso a los clientes.
- Terminología obligatoria en español: Use "Gestión Documental", "Software Documental", "DMS" o "SGD". NUNCA use acrónimos franceses como "GED", "PDP" o "PPF" en respuestas en español.
- Software destacado: DocuWare, Athento, DocuClass, OpenText, ELO Digital, R2 Docuo, M-Files e integraciones con ERPs (SAP, Sage 50/200, Microsoft Dynamics 365, Navision, A3Software, Odoo).`,
      },
      fr: {
        name: "French",
        nativeName: "Français",
        specificContext: `
RÉGLEMENTATION ET CONTEXTE EN FRANCE :
- Cadre Légal : Réforme de la facturation électronique 2026 (Ordonnance n° 2021-1190 & Loi de Finances).
- Calendrier officiel :
  * 1er septembre 2026 : Réception obligatoire pour TOUTES les entreprises (TPE, PME, ETI, GE) et émission obligatoire pour Grandes Entreprises et ETI.
  * 1er septembre 2027 : Émission obligatoire pour PME et micro-entreprises / indépendants.
- Architecture : Système en Y avec PDP (Plateformes de Dématérialisation Partenaire immatriculées) et PPF (Portail Public de Facturation / Concentrateur public).
- Formats du socle minimal : Factur-X (format hybride PDF/A-3 + XML), UBL 2.1, CII. Cycle de vie avec 4 statuts obligatoires (Déposée, Rejetée, Refusée, Encaissée) et e-reporting.
- Terminologie : Gestion Électronique de Documents (GED), Système d'Archivage Électronique (SAE NF Z42-013).`,
      },
      de: {
        name: "German",
        nativeName: "Deutsch",
        specificContext: `
GESETZLICHE VORGABEN IN DEUTSCHLAND:
- Gesetzlicher Rahmen: E-Rechnungspflicht für B2B-Umsätze im Rahmen des Wachstumschancengesetzes.
- Zeitplan & Fristen:
  * 1. Januar 2025: Zwingende Empfangsbereitschaft für alle inländischen B2B-Unternehmen (E-Rechnungsempfang).
  * 1. Januar 2027: Ausstellungspflicht für Unternehmen mit Vorjahresumsatz > 800.000 €.
  * 1. Januar 2028: Vollständige Ausstellungspflicht für alle übrigen Unternehmen.
- Formate & Standards: XRechnung (reines XML) und ZUGFeRD (hybrides Format ab Version 2.0.1 / PDF/A-3 + XML), EN 16931 Konformität.
- GoBD-Anforderungen: Revisionssichere Archivierung im Originalformat, Unveränderbarkeit, Verfahrensdokumentation.
- Terminologie: Dokumentenmanagement-System (DMS), ECM, Revisionssichere Archivierung. Keine französischen Abkürzungen verwenden.`,
      },
      nl: {
        name: "Dutch",
        nativeName: "Nederlands",
        specificContext: `
WETGEVING EN CONTEXT IN NEDERLAND & EUROPA:
- Regelgeving: E-invoicing mandaten, Peppol netwerk, ViDA (VAT in the Digital Age) EU-richtlijnen.
- Netwerk & Formaten: Peppol e-Delivery netwerk, Peppol BIS Billing 3.0, UBL 2.1, NLCIUS standaard.
- Deadlines: Verplicht voor leveranciers aan de Rijksoverheid; gefaseerde Europese harmonisatie voor B2B transacties richting 2026/2028.
- Terminologie: Document Management Systeem (DMS), E-invoicing, Peppol Access Point, Revisionssichere digitale opslag.`,
      },
      en: {
        name: "English",
        nativeName: "English",
        specificContext: `
INTERNATIONAL & EUROPEAN REGULATORY CONTEXT:
- Framework: European B2B E-Invoicing mandates, Directive 2014/55/EU, EN 16931, and the ViDA (VAT in the Digital Age) European initiative.
- Architecture: Peppol 4-corner network model, national platforms, and certified partner dematerialization providers.
- Formats: UBL (Universal Business Language), CII (Cross Industry Invoice), Factur-X/ZUGFeRD hybrid PDF/A-3.
- Key DMS Benefits: Automated OCR extraction, multi-ERP two-way synchronization, compliant cloud archiving, and full audit trails.`,
      },
    };

    const currentLangMeta = langNameMap[currentLang] || langNameMap.fr;

    const systemInstruction = `You are DocuBot, the premier AI Document Management and Electronic Invoicing Expert for "Documatch Lab" (documatch.eu).
Documatch Lab is Europe's leading independent comparator and maturity diagnostic platform helping companies audit their document workflows and comply with 2026 mandatory B2B e-invoicing standards.

CRITICAL LANGUAGE & LOCALIZATION DIRECTIVES:
1. STRICT MONOLINGUAL REQUIREMENT: You MUST formulate 100% of your response exclusively in ${currentLangMeta.name.toUpperCase()} (${currentLangMeta.nativeName}).
2. NEVER MIX LANGUAGES: If responding in Spanish, write entirely in clean, professional Spanish. If responding in German, write entirely in German. If responding in Dutch, write entirely in Dutch. If responding in French, write in French.
3. ADAPT TERMINOLOGY LOCALLY: Do NOT use France-specific acronyms (such as "GED", "PDP", "PPF", "Factur-X") when speaking Spanish, German, Dutch, or English, UNLESS specifically comparing cross-border standards. In Spanish, use "Gestión Documental" or "DMS" and "Ley Crea y Crece / Veri*Factu".

${currentLangMeta.specificContext}

Response Guidelines:
- Authoritative, objective, independent and friendly tone.
- Concise formatting: short paragraphs, bullet points (•) for lists, bold highlights for key takeaways.
- Keep the length under 180 words for readability.
- Independent advice: Mention that Documatch Lab evaluates over 200 software solutions objectively (DocuWare, M-Files, OpenText, Zeendoc, ELO, etc.).
- Proactively suggest taking the free 5-minute diagnostic on Documatch Lab to audit their compliance.
${score ? `\n[User Context: The user has completed the diagnostic with a maturity score of ${score}/100]` : ""}`;

    const client = getGeminiClient();

    if (client) {
      try {
        // Format history for Gemini SDK, filtering empty or irrelevant content
        const validMessages = messages.filter((m: any) => m && typeof m.content === "string" && m.content.trim().length > 0);
        
        // Ensure alternating role order required by Gemini SDK
        const contents = validMessages.map((m: any) => ({
          role: m.role === "assistant" || m.role === "model" ? "model" : "user",
          parts: [{ text: String(m.content).trim() }],
        }));

        const response = await client.models.generateContent({
          model: "gemini-3.7-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.5,
            topP: 0.9,
          },
        });

        const replyText = response.text || "";
        if (replyText.trim()) {
          return res.json({ reply: replyText.trim() });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, using intelligent rule-based knowledge fallback:", geminiError?.message || geminiError);
      }
    }

    // Comprehensive Native Fallback Knowledge Base per language
    const qLower = lastUserMessage.toLowerCase();
    let reply = "";

    if (currentLang === "es") {
      if (qLower.includes("fecha") || qLower.includes("plazo") || qLower.includes("cuándo") || qLower.includes("crea y crece") || qLower.includes("2026") || qLower.includes("obligatori") || qLower.includes("sancion")) {
        reply = `**Plazos y Sanciones de la Ley Crea y Crece en España:**\n\n• **Fase 1 (Empresas > 8M€ de facturación)**: Obligatoriedad de expedir y recibir facturas electrónicas 12 meses después de la aprobación del reglamento definitivo.\n• **Fase 2 (Pymes y Autónomos < 8M€)**: Obligatoriedad a los 24 meses (previsto 2026-2027).\n• **Sanciones**: Multas de hasta **10.000 €** por no facilitar sistemas de facturación electrónica a clientes.\n\nUn software de gestión documental homologado le permite anticiparse y automatizar todos los flujos sin riesgo.`;
      } else if (qLower.includes("verifactu") || qLower.includes("requisito") || qLower.includes("formato") || qLower.includes("facturae") || qLower.includes("qr") || qLower.includes("aeat")) {
        reply = `**Requisitos Técnicos Veri*Factu y Facturación en España:**\n\n• **Inalterabilidad**: Registros de facturación con encadenamiento criptográfico (hash) que impiden la alteración u ocultación de ventas.\n• **Código QR**: Obligatorio en facturas para verificación ciudadana ante la Agencia Tributaria (AEAT).\n• **Formatos admitidos**: Facturae (XML) y estándares europeos estructurados (UBL).\n• **Conservación segura**: Registro de auditoría y trazabilidad completa de cada factura durante el periodo fiscal legal.`;
      } else if (qLower.includes("elegir") || qLower.includes("software") || qLower.includes("solución") || qLower.includes("comparar") || qLower.includes("mejor") || qLower.includes("erp") || qLower.includes("sage") || qLower.includes("sap")) {
        reply = `**Cómo elegir el mejor software de Gestión Documental (DMS):**\n\n• **Conectividad con su ERP**: Integración bidireccional nativa con sistemas como SAP, Sage, Microsoft Dynamics, A3 o Navision.\n• **Reconocimiento OCR inteligente**: Extracción automática de datos de cabecera y líneas sin tecleo manual.\n• **Flujos de aprobación (Workflows)**: Circuitos de validación de compras, contratos y facturas con firma digital.\n• **Conformidad legal**: Homologación frente a Veri*Factu y normativas europeas.\n\nEn Documatch comparamos de forma 100% independiente más de 200 soluciones para recomendarle la más rentable.`;
      } else if (qLower.includes("precio") || qLower.includes("coste") || qLower.includes("cuánto") || qLower.includes("roi") || qLower.includes("rentabilidad") || qLower.includes("gratis")) {
        reply = `**Coste y Rentabilidad (ROI) de un Software Documental:**\n\n• **Diagnóstico Documatch Lab**: **100% gratuito** y sin compromiso.\n• **Coste medio de software**: Suele oscilar entre **15 € y 50 € por usuario/mes** en la nube (SaaS), según el volumen de documentos y módulos de OCR.\n• **Ahorro demostrado**: Reduce el tiempo de tramitación de facturas en un **75%** (ahorro medio de 3 a 5 horas semanales por administrativo), amortizando la inversión en menos de 6 meses.`;
      } else {
        reply = `¡Hola! Soy DocuBot, el asesor de Inteligencia Artificial de Documatch Lab para Gestión Documental y Facturación Electrónica en España.\n\nPuedo ayudarle con los plazos de la Ley Crea y Crece, los requisitos de Veri*Factu, la selección del software documental adecuado o la integración con su ERP. ¿Qué duda desea consultar?`;
      }
    } else if (currentLang === "fr") {
      if (qLower.includes("date") || qLower.includes("calendrier") || qLower.includes("quand") || qLower.includes("obligation") || qLower.includes("2026") || qLower.includes("2027")) {
        reply = `**Calendrier officiel de la réforme 2026 en France :**\n\n• **1er septembre 2026** : Obligation de **réception** des factures électroniques pour TOUTES les entreprises (TPE, PME, ETI, GE), et obligation d'**émission** pour les grandes entreprises et ETI.\n• **1er septembre 2027** : Obligation d'**émission** étendue aux PME et micro-entreprises.\n\nUne GED compatible vous permet d'automatiser l'intégration et l'archivage légal dès maintenant !`;
      } else if (qLower.includes("pdp") || qLower.includes("ppf") || qLower.includes("différence") || qLower.includes("plateforme")) {
        reply = `**Différence entre Portail Public (PPF) et PDP :**\n\n• **PPF (Portail Public de Facturation)** : Concentrateur public gratuit assurant les fonctions socles (dépôt, transmission à l'administration fiscale et annuaire central).\n• **PDP (Plateforme de Dématérialisation Partenaire)** : Prestataires privés certifiés par l'État capables de convertir les formats (Factur-X, UBL, CII), d'automatiser les flux métiers, et d'assurer les statuts du cycle de vie en direct avec votre GED/ERP.`;
      } else if (qLower.includes("choisir") || qLower.includes("logiciel") || qLower.includes("solution") || qLower.includes("comparer") || qLower.includes("docuware") || qLower.includes("zeendoc") || qLower.includes("erp")) {
        reply = `**Critères clés pour choisir votre logiciel GED :**\n\n• **Connecteurs ERP** : Compatibilité native avec votre logiciel comptable (Sage, Cegid, SAP, EBP, Dynamics, Odoo).\n• **Capture OCR & IA** : Reconnaissance automatique des montants HT/TTC, TVA et lignes d'articles.\n• **Workflows de validation** : Circuits de B.A.P. (Bon À Payer) et signatures électroniques.\n• **Archivage à valeur probante (SAE)** : Conservation sécurisée conforme NF Z42-013.\n\nDocumatch analyse plus de 200 solutions de façon 100% neutre pour cibler votre outil idéal.`;
      } else if (qLower.includes("prix") || qLower.includes("coût") || qLower.includes("tarif") || qLower.includes("roi") || qLower.includes("combien") || qLower.includes("rentabilité")) {
        reply = `**Coût et Retour sur Investissement (ROI) d'une GED :**\n\n• **Diagnostic Documatch Lab** : **100% gratuit** et immédiat.\n• **Tarif logiciel moyen** : De **15 € à 60 € / utilisateur / mois** en SaaS selon les modules et le volume annuel de factures.\n• **Gains concrets** : Économie moyenne de 3 à 5 heures par semaine et par collaborateur, suppression des pertes de documents et respect total des obligations 2026.`;
      } else {
        reply = `Bonjour ! Je suis DocuBot, l'assistant expert de Documatch Lab, spécialiste de la GED et de la facture électronique 2026.\n\nJe peux vous éclairer sur les obligations réglementaires (PDP, PPF, Factur-X), les critères de choix d'un logiciel GED, ou vous aider à interpréter vos résultats de diagnostic. Comment puis-je vous renseigner ?`;
      }
    } else if (currentLang === "de") {
      if (qLower.includes("frist") || qLower.includes("datum") || qLower.includes("wann") || qLower.includes("pflicht") || qLower.includes("2025") || qLower.includes("2026") || qLower.includes("2027") || qLower.includes("2028") || qLower.includes("wachstum")) {
        reply = `**Fahrplan der E-Rechnungspflicht in Deutschland (Wachstumschancengesetz):**\n\n• **1. Januar 2025**: Gesetzliche **Empfangspflicht** für elektronische Rechnungen für alle inländischen B2B-Unternehmen.\n• **1. Januar 2027**: **Ausstellungspflicht** für Unternehmen mit einem Vorjahresumsatz von mehr als 800.000 €.\n• **1. Januar 2028**: Vollständige **Ausstellungspflicht** für alle übrigen Unternehmen und KMU.\n\nEin GoBD-konformes Dokumentenmanagement-System (DMS) sichert Ihre revisionssichere Archivierung und automatisiert Belegprozesse.`;
      } else if (qLower.includes("gobd") || qLower.includes("xrechnung") || qLower.includes("zugferd") || qLower.includes("archiv") || qLower.includes("format")) {
        reply = `**E-Rechnungsformate und GoBD-Archivierung in Deutschland:**\n\n• **ZUGFeRD (ab v2.0.1)**: Hybrides Format aus lesbarem PDF/A-3 und strukturierter XML-Datei.\n• **XRechnung**: Rein strukturierter XML-Datensatz, Standard für Behörden und B2G/B2B.\n• **GoBD-Konformität**: Elektronische Rechnungen müssen im Originalformat unveränderbar, vollzählig und maschinell auswertbar für 8 bis 10 Jahre archiviert werden.`;
      } else if (qLower.includes("auswahl") || qLower.includes("dms") || qLower.includes("software") || qLower.includes("system") || qLower.includes("vergleich") || qLower.includes("erp") || qLower.includes("sap") || qLower.includes("datev")) {
        reply = `**Auswahl des passenden DMS-Systems:**\n\n• **ERP- und Fibu-Schnittstellen**: Nahtlose Anbindung an DATEV, SAP, Microsoft Dynamics 365, Sage oder Lexware.\n• **Automatische Belegerkennung (OCR)**: Fehlerfreie Extraktion von Rechnungsdaten und Steuersätzen.\n• **Digitale Freigabeprozesse (Workflows)**: Schnelle Genehmigung von Rechnungen und Verträgen per Mausklick.\n\nDocumatch vergleicht über 200 DMS-Lösungen unabhängig und kostenlos für Sie.`;
      } else if (qLower.includes("kosten") || qLower.includes("preis") || qLower.includes("roi") || qLower.includes("nutzen") || qLower.includes("gebühr")) {
        reply = `**Kosten und Wirtschaftlichkeit (ROI) eines DMS:**\n\n• **Documatch Diagnose**: **100% kostenlos** und unverbindlich.\n• **Softwarekosten**: Typischerweise zwischen **15 € und 55 € pro Nutzer/Monat** im Cloud-Abo.\n• **Wirtschaftlicher Nutzen**: Zeitersparnis von ca. 3 bis 5 Stunden pro Mitarbeiter/Woche bei der Belegbearbeitung und vollständige Rechtssicherheit vor dem Finanzamt.`;
      } else {
        reply = `Guten Tag! Ich bin DocuBot, Ihr KI-Berater von Documatch Lab für Dokumentenmanagement (DMS), GoBD und die E-Rechnungspflicht.\n\nWie kann ich Ihnen bei Fristen, Schnittstellen zu Ihrem ERP/DATEV oder der Auswahl des besten Systems behilflich sein?`;
      }
    } else if (currentLang === "nl") {
      if (qLower.includes("datum") || qLower.includes("wanneer") || qLower.includes("deadline") || qLower.includes("peppol") || qLower.includes("verplicht") || qLower.includes("2026") || qLower.includes("overheid")) {
        reply = `**E-invoicing en Peppol Verplichtingen in Nederland & Europa:**\n\n• **Overheid (B2G)**: E-invoicing via het **Peppol-netwerk** is al verplicht voor alle leveranciers aan de Rijksoverheid.\n• **B2B Uitrol (ViDA)**: Gefaseerde Europese harmonisatie (VAT in the Digital Age) met verplichte gestructureerde e-facturatie voor bedrijven.\n• **DMS-voordeel**: Automatische validatie van Peppol BIS Billing 3.0 en UBL-facturen direct in uw administratie.`;
      } else if (qLower.includes("peppol") || qLower.includes("ubl") || qLower.includes("nlcius") || qLower.includes("formaat")) {
        reply = `**Standaarden en Formaten (Peppol, UBL, NLCIUS):**\n\n• **UBL 2.1 (Universal Business Language)**: Het universele XML-formaat voor foutloze digitale factuurverwerking.\n• **NLCIUS**: De specifieke Nederlandse toepassing van de Europese e-invoicing norm EN 16931.\n• **Peppol Access Point**: Veilige, gecertificeerde uitwisseling zonder risico op factuurfraude of onderschepping.`;
      } else if (qLower.includes("dms") || qLower.includes("kiezen") || qLower.includes("software") || qLower.includes("systeem") || qLower.includes("vergelijk") || qLower.includes("erp") || qLower.includes("exact") || qLower.includes("afas")) {
        reply = `**DMS-software selectie en ERP-koppelingen:**\n\n• **ERP-integratie**: Directe koppeling met Exact Online, AFAS, SAP, Microsoft Dynamics of Twinfield.\n• **Slimme OCR-herkenning**: Automatisch inlezen van factuurregels en btw-bedragen.\n• **Digitale goedkeuringsflow**: Snelle accordering van inkoopfacturen door bevoegde managers.\n\nDocumatch helpt u onafhankelijk het meest geschikte DMS voor uw organisatie te selecteren.`;
      } else if (qLower.includes("kost") || qLower.includes("prijs") || qLower.includes("roi") || qLower.includes("tarief") || qLower.includes("gratis")) {
        reply = `**Kosten en Rendement (ROI) van een DMS:**\n\n• **Documatch Diagnose**: **100% gratis** en direct inzicht.\n• **DMS softwareprijzen**: Gemiddeld tussen **€ 15 en € 50 per gebruiker/maand** (Cloud SaaS).\n• **Rendement**: Bespaart gemiddeld 4 uur per week per medewerker op administratieve handelingen en voorkomt zoekgeraakte documenten.`;
      } else {
        reply = `Hallo! Ik ben DocuBot, de AI-adviseur van Documatch Lab voor Document Management Systemen (DMS) en E-invoicing.\n\nWaarmee kan ik u helpen op het gebied van Peppol, softwarekeuze of de audit van uw documentprocessen?`;
      }
    } else {
      if (qLower.includes("date") || qLower.includes("deadline") || qLower.includes("when") || qLower.includes("mandate") || qLower.includes("2026") || qLower.includes("reform")) {
        reply = `**European B2B E-Invoicing Deadlines & Mandates:**\n\n• **France**: Mandatory reception for all businesses on Sept 1, 2026; mandatory issuance for large/mid companies (Sept 2026) and SMEs (Sept 2027).\n• **Spain (Crea y Crece & Veri*Factu)**: Mandatory B2B electronic invoicing starting with large enterprises and expanding to SMEs.\n• **Germany (Wachstumschancengesetz)**: Mandatory B2B e-invoice reception since Jan 2025; phased issuance starting 2027/2028.\n• **EU ViDA & Peppol**: Harmonized standard (EN 16931) and real-time digital reporting across member states.`;
      } else if (qLower.includes("pdp") || qLower.includes("peppol") || qLower.includes("format") || qLower.includes("ubl") || qLower.includes("standard")) {
        reply = `**Technical Formats & Platforms:**\n\n• **Universal Standards**: UBL 2.1, CII, and hybrid Factur-X / ZUGFeRD (PDF/A-3 + XML).\n• **Peppol Network**: The 4-corner secure e-delivery network standard across Europe.\n• **Compliance Features**: Cryptographic hashes, digital audit trails, and automated status lifecycle tracking (Submitted, Approved, Paid).`;
      } else if (qLower.includes("choose") || qLower.includes("dms") || qLower.includes("software") || qLower.includes("solution") || qLower.includes("compare") || qLower.includes("erp") || qLower.includes("sap")) {
        reply = `**Key Criteria for Selecting a Document Management System (DMS):**\n\n• **ERP & Accounting Connectors**: Bi-directional integration with SAP, Sage, Microsoft Dynamics 365, Odoo, NetSuite, QuickBooks.\n• **AI OCR & Data Capture**: Automatic line-item and header extraction with high precision.\n• **Automated Approval Workflows**: Digital sign-offs and customizable routing rules.\n• **Certified Archiving**: Compliant long-term storage preserving legal authenticity.\n\nDocumatch provides 100% neutral comparisons across 200+ DMS platforms to identify your ideal fit.`;
      } else if (qLower.includes("price") || qLower.includes("cost") || qLower.includes("pricing") || qLower.includes("roi") || qLower.includes("free")) {
        reply = `**DMS Pricing & Return on Investment (ROI):**\n\n• **Documatch Lab Diagnostic**: **100% free** and instant.\n• **Cloud DMS Costs**: Typically ranges from **$18 to $55 / user / month** depending on document volume and OCR capabilities.\n• **Measurable ROI**: Saves an average of 3–5 hours per employee each week in invoice routing and approval, achieving payback within 6 months.`;
      } else {
        reply = `Hello! I am DocuBot, the AI Document Management & 2026 E-Invoicing Compliance Advisor for Documatch Lab.\n\nHow can I assist you with regulatory deadlines, DMS selection, ERP connectors, or your compliance diagnostic?`;
      }
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error("Chat API handler error:", error);
    return res.status(500).json({ error: error.message || "Chat service error" });
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
    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️ [WARNING] RESEND_API_KEY is missing from environment variables. Emails will fail until RESEND_API_KEY is configured.");
    } else {
      console.log("✅ [RESEND] RESEND_API_KEY is configured in process.env.");
    }
  });
}

startServer();
