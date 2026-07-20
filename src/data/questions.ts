import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // --- PHASE 1: PROFIL ---
  {
    id: 1,
    phase: 0,
    axis: 'profil',
    tagFr: 'Profil',
    tagEs: 'Perfil',
    tagEn: 'Profile',
    fr: {
      q: 'Quelle est votre fonction principale au sein de l\'organisation\u00a0?',
      hint: 'Cela personnalise les recommandations selon votre rôle décisionnel.',
    },
    es: {
      q: '¿Cuál es su función principal en la organización?',
      hint: 'Esto personaliza las recomendaciones según su rol decisional.',
    },
    en: {
      q: 'What is your primary function in the organization?',
      hint: 'This customizes the recommendations based on your decision-making role.',
    },
    opts: [
      { fr: 'CEO / Directeur Général', es: 'CEO / Director General', en: 'CEO / General Manager', s: 10 },
      { fr: 'DAF / Directeur Financier', es: 'DAF / Director Financiero', en: 'CFO / Finance Director', s: 10 },
      { fr: 'DSI / Directeur des Systèmes d\'Information', es: 'DSI / Director de Sistemas de Información', en: 'CIO / IT Director', s: 10 },
      { fr: 'Directeur Administratif / Opérations', es: 'Director Administrativo / Operaciones', en: 'Operations / Administrative Director', s: 9 },
      { fr: 'Responsable IT / Chef de projet', es: 'Responsable IT / Jefe de proyecto', en: 'IT Manager / Project Manager', s: 8 },
      { fr: 'Autre décideur métier', es: 'Otro decisor de negocio', en: 'Other business decision maker', s: 7 },
    ],
  },
  {
    id: 2,
    phase: 0,
    axis: 'profil',
    tagFr: 'Taille',
    tagEs: 'Tamaño',
    tagEn: 'Company Size',
    fr: {
      q: 'Quelle est la taille de votre entreprise\u00a0?',
      hint: 'Le volume documentaire et les obligations de facturation électronique (ViDA) dépendent fortement de la taille de votre structure.',
    },
    es: {
      q: '¿Cuál es el tamaño de su empresa?',
      hint: 'El volumen documental y los plazos de facturación electrónica dependen del tamaño de su estructura.',
    },
    en: {
      q: 'What is the size of your company?',
      hint: 'Document volume and European e-invoicing compliance deadlines (ViDA) depend heavily on your company scale.',
    },
    opts: [
      { fr: 'TPE / Startup (Moins de 10 salariés)', es: 'Microempresa / Autónomo (Menos de 10 empleados)', en: 'Micro / Small Business (Under 10 employees)', s: 4 },
      { fr: 'PME (10 à 49 salariés)', es: 'PYME (10 a 49 empleados)', en: 'Small-Medium Enterprise (10-49 employees)', s: 7 },
      { fr: 'ETI (50 à 249 salariés)', es: 'Mediana (50 a 249 empleados)', en: 'Medium-Sized Enterprise (50-249 employees)', s: 9 },
      { fr: 'Grande entreprise (250 à 999 salariés)', es: 'Gran empresa (250 a 999 empleados)', en: 'Large Enterprise (250-999 employees)', s: 10 },
      { fr: 'Groupe multinational (1 000+ salariés)', es: 'Grupo multinacional (Más de 1.000 empleados)', en: 'Multinational Group (1,000+ employees)', s: 10 },
    ],
  },
  {
    id: 3,
    phase: 0,
    axis: 'profil',
    tagFr: 'Secteur',
    tagEs: 'Sector',
    tagEn: 'Industry',
    fr: {
      q: 'Dans quel secteur d\'activité exercez-vous\u00a0?',
      hint: 'Certains secteurs (BTP, santé, finance, public) sont soumis à des normes d\'archivage électronique (NF Z42-020) spécifiques.',
    },
    es: {
      q: '¿En qué sector de actividad opera?',
      hint: 'Algunos sectores (construcción, salud, finanzas) tienen obligaciones de facturación y archivo eIDAS adicionales.',
    },
    en: {
      q: 'Which industry sector do you operate in?',
      hint: 'Certain industries (construction, healthcare, financial, public sector) face stricter local tax audit or secure archiving mandates.',
    },
    opts: [
      { fr: 'BTP / Immobilier / Promotion', es: 'Construcción / Inmobiliario', en: 'Construction / Real Estate / Development', s: 10 },
      { fr: 'Industrie / Manufacturing / Énergie', es: 'Industria / Manufactura / Energía', en: 'Manufacturing / Industrial / Energy', s: 9 },
      { fr: 'Finance / Assurance / Banque', es: 'Finanzas / Seguros / Banca', en: 'Finance / Insurance / Banking', s: 10 },
      { fr: 'Santé / Cliniques / Pharmaceutique', es: 'Salud / Clínicas / Farmacéutica', en: 'Healthcare / Pharma / Biotech', s: 9 },
      { fr: 'Commerce / Distribution / Retail', es: 'Comercio / Distribución / Retail', en: 'Retail / Wholesale / E-commerce', s: 8 },
      { fr: 'Services / Conseil / Juridique / IT', es: 'Servicios / Consultoría / Jurídico / IT', en: 'Professional Services / Consulting / Legal / IT', s: 8 },
      { fr: 'Public / Collectivités / Éducation', es: 'Sector público / Educación', en: 'Public Sector / Gov / Education', s: 9 },
      { fr: 'Autre', es: 'Otro', en: 'Other', s: 6 },
    ],
  },
  {
    id: 4,
    phase: 0,
    axis: 'profil',
    tagFr: 'Volume',
    tagEs: 'Volumen',
    tagEn: 'Volume',
    fr: {
      q: 'Quel est votre volume mensuel de documents comptables et RH traités\u00a0?',
      hint: 'Factures reçues/émises, contrats, bulletins de paie. Détermine le besoin de LAD (Lecture Automatique de Documents) et d\'automatisation.',
    },
    es: {
      q: '¿Cuál es su volumen mensual de documentos contables y de RRHH procesados?',
      hint: 'Facturas recibidas/emitidas, contratos, nóminas. Determina la necesidad de automatización y lectura OCR.',
    },
    en: {
      q: 'What is your monthly volume of processed accounting and HR documents?',
      hint: 'Inbound/outbound invoices, contracts, payroll. Determines your need for automated OCR capture and automated workflows.',
    },
    opts: [
      { fr: 'Moins de 100 documents/mois', es: 'Menos de 100 documentos/mes', en: 'Less than 100 documents/month', s: 4 },
      { fr: '100 à 500 documents/mois', es: '100 a 500 documentos/mes', en: '100 to 500 documents/month', s: 7 },
      { fr: '500 à 2 500 documents/mois', es: '500 a 2.500 documentos/mes', en: '500 to 2,500 documents/month', s: 9 },
      { fr: 'Plus de 2 500 documents/mois', es: 'Más de 2.500 documentos/mes', en: 'More than 2,500 documents/month', s: 10 },
    ],
  },

  // --- PHASE 2: SYSTEME ACTUEL ---
  {
    id: 5,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Gestion',
    tagEs: 'Gestión',
    tagEn: 'Management',
    fr: {
      q: 'Comment gérez-vous et archivez-vous actuellement vos documents d\'entreprise\u00a0?',
      hint: 'Évaluez votre niveau de dépendance au papier ou aux structures de dossiers obsolètes.',
    },
    es: {
      q: '¿Cómo gestiona y archiva actualmente los documentos de su empresa?',
      hint: 'Evalúe su nivel de dependencia del papel o de las estructuras de carpetas obsoletas.',
    },
    en: {
      q: 'How do you currently manage and archive your business documents?',
      hint: 'Assess your level of dependency on paper files or outdated, siloed folder structures.',
    },
    opts: [
      { fr: 'Classeurs physiques / Papier', es: 'Archivadores físicos / Papel', en: 'Physical filing cabinets / Paper-based', s: 1 },
      { fr: 'Serveurs locaux ou dossiers partagés cloud (OneDrive, Google Drive, NAS)', es: 'Servidor local o carpetas en la nube (OneDrive, Google Drive, NAS)', en: 'Local server or cloud storage folders (OneDrive, GDrive, DropBox, NAS)', s: 4 },
      { fr: 'Système de GED basique ou logiciel métier limité', es: 'Sistema de GED básico o software sectorial limitado', en: 'Basic Document Management System (DMS) or limited business software', s: 7 },
      { fr: 'Solution de GED professionnelle (Zeendoc, DocuWare, Yooz, etc.)', es: 'Solución de GED profesional integrada', en: 'Professional enterprise DMS / Content Services platform', s: 10 },
    ],
  },
  {
    id: 6,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Historique',
    tagEs: 'Histórico',
    tagEn: 'Backlog',
    fr: {
      q: 'Quel est le taux de numérisation de votre historique documentaire\u00a0?',
      hint: 'L\'accès instantané aux archives est une clé d\'efficacité pour les contrôles fiscaux ou audits.',
    },
    es: {
      q: '¿Cuál es la tasa de digitalización de su archivo documental histórico?',
      hint: 'El acceso instantáneo a los archivos es clave para la eficiencia en auditorías o inspecciones fiscales.',
    },
    en: {
      q: 'What is the digitization rate of your historical document archives?',
      hint: 'Instant access to historical business archives is a major efficiency driver during tax audits.',
    },
    opts: [
      { fr: 'Quasiment aucun (Moins de 10% d\'historique numérisé)', es: 'Prácticamente ninguno (Menos del 10% digitalizado)', en: 'Almost none (Less than 10% of historical backlog digitized)', s: 2 },
      { fr: 'Partiel (De 10% à 50% de nos archives papier numérisées)', es: 'Parcial (Del 10% al 50% digitalizado)', en: 'Partial (10% to 50% of our paper archives scanned)', s: 5 },
      { fr: 'Avancé (Plus de 50% numérisé, mais indexation basique)', es: 'Avanzado (Más del 50%, pero indexación muy básica)', en: 'Advanced (Over 50% digitized, but search metadata is basic)', s: 8 },
      { fr: 'Total (100% numérisé, indexé et consultable instantanément)', es: 'Total (100% digitalizado, indexado y accesible)', en: 'Complete (100% digitized, structured, and instantly searchable)', s: 10 },
    ],
  },
  {
    id: 7,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Automatisation',
    tagEs: 'Automatización',
    tagEn: 'Automation',
    fr: {
      q: 'Comment s\'effectue la saisie des factures fournisseurs dans votre comptabilité\u00a0?',
      hint: 'L\'extraction automatique évite les ressaisies manuelles chronophages et sources d\'erreurs.',
    },
    es: {
      q: '¿Cómo se realiza el registro de facturas de proveedores en su contabilidad?',
      hint: 'La extracción automática evita la introducción manual de datos, lenta y propensa a errores.',
    },
    en: {
      q: 'How are vendor invoices entered and registered in your accounting system?',
      hint: 'Automated data extraction eliminates manual keying, which is slow and error-prone.',
    },
    opts: [
      { fr: 'Saisie manuelle ligne par ligne par un comptable', es: 'Registro manual línea por línea por un contable', en: 'Manual entry line-by-line by an accountant', s: 1 },
      { fr: 'Saisie assistée avec un OCR basique (détection simple)', es: 'Registro asistido con un OCR básico (detección simple)', en: 'Assisted entry using basic OCR/scanning with manual checks', s: 5 },
      { fr: 'Lecture automatique (LAD/RAD) intelligente avec videocodage', es: 'Lectura inteligente (LAD/RAD) con videocodificación', en: 'Intelligent AI capture (OCR/LAD) with automated header & line matching', s: 8 },
      { fr: 'Flux 100% automatisé, de l\'intégration comptable au paiement', es: 'Flujo 100% automatizado, desde la contabilidad al pago', en: 'Zero-touch fully automated processing from receipt to ERP posting', s: 10 },
    ],
  },
  {
    id: 8,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Workflows',
    tagEs: 'Workflows',
    tagEn: 'Workflows',
    fr: {
      q: 'Quel est le circuit d\'approbation d\'une facture ou d\'un contrat chez vous\u00a0?',
      hint: 'Des circuits automatisés garantissent le respect des échéances de paiement de la réforme 2026.',
    },
    es: {
      q: '¿Cuál es el circuito de aprobación de una factura o contrato en su empresa?',
      hint: 'Los circuitos automatizados garantizan el cumplimiento de los plazos de pago legales.',
    },
    en: {
      q: 'What is the approval route for an invoice or contract in your organization?',
      hint: 'Automated approval routes ensure compliant processing times and prompt vendor payments.',
    },
    opts: [
      { fr: 'Circulation physique du papier ou envoi de mails manuels', es: 'Circulación física del papel o envío manual de emails', en: 'Physical paper routing or manual back-and-forth emails', s: 2 },
      { fr: 'Workflow basique de validation par mail ou outil tiers', es: 'Workflow básico de validación por email o herramienta externa', en: 'Simple email validation workflow or non-integrated software', s: 5 },
      { fr: 'Workflow structuré dans la GED avec notifications et relances', es: 'Workflow estructurado en la GED con notificaciones', en: 'Structured DMS workflows with automated user task alerts', s: 9 },
      { fr: 'Workflows complexes avec gestion d\'en-cours et analytiques', es: 'Workflows complejos con gestión analítica y multidepartamento', en: 'Complex rules-based workflows with dynamic cost-center routing', s: 10 },
    ],
  },
  {
    id: 9,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Temps',
    tagEs: 'Tiempo',
    tagEn: 'Search',
    fr: {
      q: 'Combien de temps faut-il pour retrouver un document précis d\'il y a 3 ans\u00a0?',
      hint: 'La recherche plein texte (Full-text) ou par métadonnées permet un gain de temps considérable.',
    },
    es: {
      q: '¿Cuánto tiempo tarda en encontrar un documento específico de hace 3 años?',
      hint: 'La búsqueda de texto completo (Full-text) o por metadatos permite ahorrar mucho tiempo.',
    },
    en: {
      q: 'How much time does it take to retrieve a specific contract or invoice from 3 years ago?',
      hint: 'Full-text OCR searching or metadata tagging provides a massive productivity boost.',
    },
    opts: [
      { fr: 'Plus de 15 minutes (Recherche dans archives physiques ou réseau complexe)', es: 'Más de 15 minutos (Búsqueda física o en red compleja)', en: 'More than 15 minutes (Digging in physical archives or file shares)', s: 2 },
      { fr: 'Entre 5 et 15 minutes (Il faut ouvrir plusieurs dossiers ou outils)', es: 'Entre 5 y 15 minutos (Requiere abrir varias carpetas o herramientas)', en: 'Between 5 and 15 minutes (Requires looking through different drives)', s: 5 },
      { fr: 'Moins de 2 minutes (Grâce à une recherche par index dans notre GED)', es: 'Menos de 2 minutos (Gracias a una búsqueda indexada en la GED)', en: 'Less than 2 minutes (Indexed metadata search in our DMS)', s: 9 },
      { fr: 'Quelques secondes (Recherche full-text / IA instantanée)', es: 'Unos segundos (Búsqueda instantánea full-text / IA)', en: 'A few seconds (Instant global full-text / AI semantic search)', s: 10 },
    ],
  },

  // --- PHASE 3: CONFORMITE & NORMES ---
  {
    id: 10,
    phase: 2,
    axis: 'conformite',
    tagFr: 'e-Invoicing',
    tagEs: 'e-Factura',
    tagEn: 'e-Invoicing',
    fr: {
      q: 'Votre organisation maîtrise-t-elle les exigences de la réforme e-Invoicing française 2026\u00a0?',
      hint: 'PPF (Portail Public), PDP (Plateformes Partenaires), formats Factur-X / UBL / CII.',
    },
    es: {
      q: '¿Su organización domina las exigencias de la facturación electrónica obligatoria (Ley Crea y Crece)?',
      hint: 'Intercambio obligado de ficheros FacturaE firmados con clientes/proveedores B2B.',
    },
    en: {
      q: 'Is your organization prepared for European e-Invoicing standards and local acts (GoBD, Wachstumschancengesetz, Peppol)\u00a0?',
      hint: 'Covers mandatory B2B e-invoice reception (e.g. Germany 2025), Peppol infrastructure, and XRechnung/ZUGFeRD formats.',
    },
    opts: [
      {
        fr: 'Non, c\'est encore très flou pour nos équipes',
        es: 'No, todavía es un tema muy confuso para nosotros',
        en: 'No, we are not familiar with the technical requirements or act deadlines',
        s: 1
      },
      {
        fr: 'Oui, nous connaissons le sujet mais n\'avons pas de plan d\'action précis',
        es: 'Sí, conocemos el tema pero no tenemos un plan de acción concreto',
        en: 'We know the basics but do not have a defined software implementation roadmap',
        s: 4
      },
      {
        fr: 'Oui, nous avons un projet en cours pour être prêts avant le 1er septembre 2026',
        es: 'Sí, tenemos un proyecto en marcha para cumplir los plazos de la Ley Crea y Crece',
        en: 'Yes, we are actively implementing tools to meet the EU & local deadlines',
        s: 9
      },
      {
        fr: 'Tout est prêt, notre système gère ou gérera les flux PPF/PDP natifs',
        es: 'Todo está listo, nuestro sistema gestiona o gestionará flujos oficiales firmados',
        en: 'We are fully prepared, with compliant Peppol/XML pipelines built into our systems',
        s: 10
      }
    ]
  },
  {
    id: 11,
    phase: 2,
    axis: 'conformite',
    tagFr: 'Archivage',
    tagEs: 'Archivo',
    tagEn: 'Archiving',
    fr: {
      q: 'Comment stockez-vous vos factures et documents à forte valeur juridique\u00a0?',
      hint: 'La norme NF Z42-020 (Coffre-Fort Électronique) garantit l\'intégrité et la valeur probante lors des contrôles.',
    },
    es: {
      q: '¿Cómo almacena sus facturas y documentos de alto valor jurídico?',
      hint: 'El archivo digital con firma y sello de tiempo garantiza la integridad frente a la AEAT.',
    },
    en: {
      q: 'How do you store your tax-relevant invoices and legal contracts?',
      hint: 'Compliant electronic archiving requires write-once storage (WORM) to guarantee document integrity for fiscal audits (e.g. GoBD / Dutch Belastingdienst).',
    },
    opts: [
      { fr: 'Stockage papier classique ou disques durs locaux', es: 'Almacenamiento en papel o discos duros locales', en: 'Standard paper files, network shares, or local hard drives', s: 1 },
      { fr: 'Dossiers Cloud cryptés (mais sans valeur probante légale)', es: 'Carpetas Cloud encriptadas (sin valor probatorio legal)', en: 'Encrypted cloud folders (without true write-once legal compliance)', s: 4 },
      { fr: 'Archivage avec signature électronique simple', es: 'Archivo digital básico con firma electrónica simple', en: 'DMS archive with basic digital signatures applied', s: 7 },
      { fr: 'Coffre-fort électronique certifié (valeur probante, normes NF Z42-020 / eIDAS)', es: 'Almacén electrónico certificado con valor probatorio', en: 'Certified audit-proof archive (e.g., GoBD-certified, Peppol/eIDAS compliant)', s: 10 }
    ]
  },
  {
    id: 12,
    phase: 2,
    axis: 'conformite',
    tagFr: 'Conservation',
    tagEs: 'Conservación',
    tagEn: 'Retention',
    fr: {
      q: 'Appliquez-vous une politique stricte de durée de conservation des documents (DUA)\u00a0?',
      hint: 'Par exemple, 10 ans pour les factures, 5 ans pour les contrats de travail, etc.',
    },
    es: {
      q: '¿Aplica una política estricta de plazo de conservación de documentos?',
      hint: 'Por ejemplo, 10 años para facturas, 5 años para contratos laborales, etc.',
    },
    en: {
      q: 'Do you enforce a strict and automated document retention policy?',
      hint: 'E.g., 10 years for tax records/invoices, 5-7 years for contracts or HR files depending on local country law.',
    },
    opts: [
      { fr: 'Non, nous gardons tout indéfiniment sans politique définie', es: 'No, lo guardamos todo indefinidamente sin política definida', en: 'No, we keep everything forever on our drives without rules', s: 1 },
      { fr: 'Oui, mais de façon manuelle et irrégulière', es: 'Sí, pero de forma manual e irregular', en: 'Yes, but it is done manually and inconsistently', s: 5 },
      { fr: 'Oui, notre politique DUA est écrite, mais l\'épuration est complexe', es: 'Sí, la política está escrita, pero el purgado es complejo', en: 'Yes, we have written policies, but execution/purging is hard', s: 8 },
      { fr: 'Oui, les durées de conservation sont automatisées dans notre GED', es: 'Sí, los plazos de conservación están automatizados en la GED', en: 'Yes, retention schedules are automated and enforced inside our DMS', s: 10 }
    ]
  },
  {
    id: 13,
    phase: 2,
    axis: 'conformite',
    tagFr: 'RGPD',
    tagEs: 'RGPD',
    tagEn: 'GDPR',
    fr: {
      q: 'Votre gestion documentaire assure-t-elle la conformité RGPD (traçabilité, droit à l\'oubli)\u00a0?',
      hint: 'Les données RH ou clients doivent être hautement protégées, avec possibilité d\'anonymisation.',
    },
    es: {
      q: '¿Garantiza su gestión documental el cumplimiento del RGPD (privacidad, derecho al olvido)?',
      hint: 'Los datos de empleados o clientes deben estar protegidos frente a accesos no autorizados.',
    },
    en: {
      q: 'Does your document repository guarantee GDPR compliance (access logs, right to be forgotten)?',
      hint: 'Personal customer/HR data must be heavily restricted, tracked, and purgeable upon request.',
    },
    opts: [
      { fr: 'Non, nous ne gérons pas cet aspect de façon centralisée', es: 'No, no gestionamos este aspecto de forma centralizada', en: 'No, we do not centrally manage document-level privacy compliance', s: 1 },
      { fr: 'Partiellement (Quelques restrictions d\'accès existent)', es: 'Parcialmente (Existen algunas restricciones de acceso)', en: 'Partially (Basic user folder permissions are set up)', s: 4 },
      { fr: 'Oui (Droits d\'accès stricts, journal d\'audit complet de qui lit quoi)', es: 'Sí (Derechos de acceso estrictos e histórico de auditoría)', en: 'Yes (Strict roles, full audit trails of who viewed/edited which files)', s: 9 },
      { fr: 'Totalement (Gestion avancée des habilitations, masquage des données sensibles)', es: 'Totalmente (Gestión avanzada de permisos y enmascaramiento de datos)', en: 'Completely (Granular control, automatic redaction of sensitive PII)', s: 10 }
    ]
  },

  // --- PHASE 4: ERP & INTEGRATIONS ---
  {
    id: 14,
    phase: 3,
    axis: 'erp',
    tagFr: 'Logiciel',
    tagEs: 'Software',
    tagEn: 'Software',
    fr: {
      q: 'Quel est votre outil principal de gestion commerciale ou ERP\u00a0?',
      hint: 'La connectivité entre votre GED et votre ERP est le secret d\'un projet réussi.',
    },
    es: {
      q: '¿Cuál es su herramienta principal de gestión comercial o ERP?',
      hint: 'La conectividad entre su GED y su ERP es el secreto de un proyecto de éxito.',
    },
    en: {
      q: 'What is your primary commercial management system or ERP?',
      hint: 'DMS-to-ERP connectivity is a critical driver for project ROI and automated invoice posting.',
    },
    opts: [
      { fr: 'ERP Majeur (SAP, Microsoft Dynamics, Oracle...)', es: 'ERP de primer nivel (SAP, Microsoft Dynamics, Oracle...)', en: 'Major ERP (SAP, Microsoft Dynamics, Oracle, Infor...)', s: 10 },
      { fr: 'ERP Moyen de gamme (Sage 100/X3, Cegid, Cegid XRP...)', es: 'ERP de gama media (Sage, Cegid, Microsoft Business Central...)', en: 'Mid-Market ERP (Sage, Unit4, Exact, AFAS, Cegid...)', s: 9 },
      { fr: 'Logiciel de comptabilité classique (Sage 50, QuickBooks, Pennylane...)', es: 'Software de contabilidad clásico (A3, Sage 50, Holded...)', en: 'SMB Cloud Accounting (QuickBooks, Pennylane, Exact, Xero...)', s: 8 },
      { fr: 'ERP propriétaire / Outil développé sur-mesure / Aucun', es: 'ERP propietario / Software a medida / Ninguno', en: 'Custom proprietary system / Industry-niche software / None', s: 6 }
    ]
  },
  {
    id: 15,
    phase: 3,
    axis: 'erp',
    tagFr: 'Intégration',
    tagEs: 'Integración',
    tagEn: 'Integration',
    fr: {
      q: 'Comment s\'effectue aujourd\'hui le transfert d\'écritures de la GED vers la comptabilité\u00a0?',
      hint: 'Éviter la double saisie est indispensable pour rentabiliser votre investissement.',
    },
    es: {
      q: '¿Cómo se realiza hoy la transferencia de asientos desde la GED hacia su contabilidad?',
      hint: 'Evitar duplicar la entrada de datos es indispensable para rentabilizar su inversión.',
    },
    en: {
      q: 'How is transactional data synchronized between your invoice capture and accounting ledgers?',
      hint: 'Eliminating duplicate entries is essential to unlock speed and efficiency.',
    },
    opts: [
      { fr: 'Ressaisie manuelle de chaque écriture (Zéro intégration)', es: 'Doble introducción manual de cada asiento (Sin integración)', en: 'Manual manual entry into our ledger (No active interface)', s: 1 },
      { fr: 'Import/Export manuel de fichiers plats (CSV, Excel)', es: 'Importación/exportación manual de archivos (CSV, Excel)', en: 'Manual import/export of flat files (CSV, XML, Excel)', s: 4 },
      { fr: 'Intégration semi-automatique (Dossier d\'échange surveillé ou API basique)', es: 'Integración semiautomática (Carpetas de intercambio o API básica)', en: 'Semi-automated syncing (Watched folder uploads or basic API)', s: 7 },
      { fr: 'Synchronisation en temps réel bidirectionnelle via connecteur natif', es: 'Sincronización bidireccional en tiempo real mediante conector nativo', en: 'Real-time bi-directional integration via native API connectors', s: 10 }
    ]
  },
  {
    id: 16,
    phase: 3,
    axis: 'erp',
    tagFr: 'Signature',
    tagEs: 'Firma',
    tagEn: 'Signature',
    fr: {
      q: 'Comment gérez-vous la signature de vos contrats ou devis avec vos tiers\u00a0?',
      hint: 'La signature électronique certifiée garantit la valeur légale des actes dématérialisés.',
    },
    es: {
      q: '¿Cómo gestiona la firma de sus contratos o presupuestos con terceros?',
      hint: 'La firma electrónica certificada garantiza el valor legal de los acuerdos digitales.',
    },
    en: {
      q: 'How do you handle contract or sales quote sign-offs with external parties?',
      hint: 'Compliant digital signature solutions (eIDAS certified) guarantee contract enforceability.',
    },
    opts: [
      { fr: 'Impression, signature manuelle, scan et envoi par mail', es: 'Impresión, firma manuscrita, escaneo y envío por email', en: 'Print, sign by hand, scan, and email back', s: 1 },
      { fr: 'Outil de signature électronique tiers non intégré (Yousign, DocuSign...)', es: 'Herramienta externa de firma electrónica no integrada (DocuSign, Yousign...)', en: 'Standalone third-party signing tool (DocuSign, Yousign, Adobe Sign)', s: 6 },
      { fr: 'Signature électronique certifiée directement intégrée dans nos workflows GED', es: 'Firma electrónica certificada integrada directamente en la GED', en: 'eIDAS-compliant digital signatures integrated directly into our DMS workflows', s: 10 }
    ]
  },
  {
    id: 17,
    phase: 3,
    axis: 'erp',
    tagFr: 'Messagerie',
    tagEs: 'Mensajería',
    tagEn: 'Inbox',
    fr: {
      q: 'Comment classez-vous les emails et pièces jointes importants que vous recevez\u00a0?',
      hint: 'Un connecteur Outlook/Gmail évite la perte d\'informations clés dans les boîtes mail.',
    },
    es: {
      q: '¿Cómo archiva los correos electrónicos y anexos importantes que recibe?',
      hint: 'Un conector con Outlook/Gmail evita la pérdida de información clave en bandejas de entrada individuales.',
    },
    en: {
      q: 'How do you archive critical business emails and incoming attachments?',
      hint: 'Direct Outlook/Gmail plugins prevent critical commercial documents from being lost in siloed employee inboxes.',
    },
    opts: [
      { fr: 'Chacun gère dans sa boîte mail, pas de classement centralisé', es: 'Cada uno gestiona su buzón, sin archivo centralizado', en: 'Left in individual inboxes; no structured central storage', s: 1 },
      { fr: 'Téléchargement manuel et dépôt dans un dossier partagé', es: 'Descarga manual y almacenamiento en carpeta compartida', en: 'Manual download and upload to server drives/folders', s: 4 },
      { fr: 'Classement via un connecteur de messagerie vers notre GED', es: 'Archivo mediante un conector de mensajería hacia nuestra GED', en: 'Direct email plugin filing into corresponding DMS project folders', s: 9 },
      { fr: 'Archivage automatique des flux de mails selon règles intelligentes', es: 'Archivo automático de emails basado en reglas inteligentes', en: 'Automated email archiving based on smart rules/AI mapping', s: 10 }
    ]
  },

  // --- PHASE 5: PROJET & BUDGET ---
  {
    id: 18,
    phase: 4,
    axis: 'projet',
    tagFr: 'Délai',
    tagEs: 'Plazo',
    tagEn: 'Timeline',
    fr: {
      q: 'Quel est le calendrier envisagé pour votre projet de GED / Facturation 2026\u00a0?',
      hint: 'L\'échéance du 1er septembre 2026 impose d\'agir rapidement (un projet prend 3 à 6 mois).',
    },
    es: {
      q: '¿Cuál es el plazo previsto para su proyecto de GED / Facturación electrónica?',
      hint: 'Los plazos de la Ley Crea y Crece obligan a actuar con previsión (un despliegue suele tardar de 3 a 6 meses).',
    },
    en: {
      q: 'What is your target timeline for your new DMS or e-Invoicing project?',
      hint: 'With local and EU compliance deadlines fast approaching, deployment backlogs are growing. Fast action is recommended.',
    },
    opts: [
      { fr: 'Urgent — Dans les 3 prochains mois', es: 'Urgente — En los próximos 3 meses', en: 'Urgent — Over the next 3 months', s: 10 },
      { fr: 'Court terme — D\'ici la fin de l\'année ou avant la réforme', es: 'Corto plazo — Antes de que acabe el año o entre en vigor la ley', en: 'Short term — Fully deployed before key regulatory deadlines', s: 9 },
      { fr: 'Moyen terme — D\'ici 12 mois', es: 'Medio plazo — En los próximos 12 meses', en: 'Medium term — Within the next 12 months', s: 7 },
      { fr: 'Pas de date fixe / Veille technologique', es: 'Sin fecha fija / Vigilancia tecnológica', en: 'No fixed date / Just researching options for now', s: 4 }
    ]
  },
  {
    id: 19,
    phase: 4,
    axis: 'projet',
    tagFr: 'Budget',
    tagEs: 'Presupuesto',
    tagEn: 'Budget',
    fr: {
      q: 'Quel budget annuel (licences, hébergement, intégration) prévoyez-vous\u00a0?',
      hint: 'Les solutions Cloud permettent aujourd\'hui de démarrer avec des budgets maîtrisés.',
    },
    es: {
      q: '¿Qué presupuesto anual (licencias, alojamiento, integración) prevé?',
      hint: 'Las soluciones Cloud permiten hoy en día empezar con presupuestos muy contenidos.',
    },
    en: {
      q: 'What annual budget (software licenses, implementation, support) is allocated?',
      hint: 'Modern SaaS/Cloud platforms allow for scalable pricing matching your actual monthly consumption.',
    },
    opts: [
      { fr: 'Moins de 2 500 € / an (TPE, solutions d\'entrée de gamme)', es: 'Menos de 2.500 € / año', en: 'Under €2,500 / year (Entry-level cloud / light setups)', s: 4 },
      { fr: '2 500 à 10 000 € / an (PME, GED standard comptable)', es: 'De 2.500 a 10.000 € / año', en: '€2,500 to €10,000 / year (Standard SMB setups)', s: 7 },
      { fr: '10 000 à 40 000 € / an (ETI, flux avancés, multisites, ERP)', es: 'De 10.000 a 40.000 € / año', en: '€10,000 to €40,000 / year (Multi-site, ERP-integrated DMS)', s: 9 },
      { fr: 'Plus de 40 000 € / an (Grands groupes, sur-mesure complexe)', es: 'Más de 40.000 € / año', en: 'Over €40,000 / year (Enterprise-grade, custom business setups)', s: 10 },
      { fr: 'Non défini / Nous cherchons à évaluer le coût', es: 'No definido / Buscamos evaluar el coste', en: 'Not yet defined / Looking to evaluate pricing options', s: 5 }
    ]
  },
  {
    id: 20,
    phase: 4,
    axis: 'projet',
    tagFr: 'Accompagnement',
    tagEs: 'Acompañamiento',
    tagEn: 'Advisory',
    fr: {
      q: 'De quel niveau d\'aide avez-vous besoin pour choisir et déployer votre outil\u00a0?',
      hint: 'Documatch peut vous proposer un accompagnement neutre ou vous mettre en relation directe.',
    },
    es: {
      q: '¿Qué nivel de ayuda necesita para elegir e implantar su herramienta?',
      hint: 'Documatch puede ofrecerle asesoramiento neutro o conectarle directamente con proveedores.',
    },
    en: {
      q: 'What level of support do you require for system selection and deployment?',
      hint: 'Documatch offers fully independent consultancy or direct, qualified vendor matching.',
    },
    opts: [
      { fr: 'Autonomie complète (Accès à vos outils de comparaison en ligne)', es: 'Autonomía completa (Acceso a comparadores online)', en: 'Self-Service (Access to online comparison tools only)', s: 5 },
      { fr: 'Aide à la sélection (Shortlist personnalisé de 3 solutions éligibles)', es: 'Ayuda en la selección (Shortlist personalizado de 3 soluciones)', en: 'Assisted Matching (A custom shortlist of 3 eligible solutions)', s: 8 },
      { fr: 'Accompagnement de bout en bout (Aide à la rédaction du cahier des charges / RFP)', es: 'Acompañamiento integral (Ayuda en pliego de condiciones / RFP)', en: 'Full Advisory (Assistance with requirements writing and RFPs)', s: 10 }
    ]
  }
];
