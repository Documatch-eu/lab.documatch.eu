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
    tagDe: 'Profil',
    tagNl: 'Profiel',
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
    de: {
      q: 'Was ist Ihre Hauptfunktion im Unternehmen?',
      hint: 'Dies passt die Empfehlungen an Ihre Entscheidungsrolle an.',
    },
    nl: {
      q: 'Wat is uw primaire functie binnen de organisatie?',
      hint: 'Dit stemt de aanbevelingen af op uw beslissingsrol.',
    },
    opts: [
      { fr: 'CEO / Directeur Général', es: 'CEO / Director General', en: 'CEO / General Manager', de: 'CEO / Geschäftsführer', nl: 'CEO / Algemeen Directeur', s: 10 },
      { fr: 'DAF / Directeur Financier', es: 'DAF / Director Financiero', en: 'CFO / Finance Director', de: 'CFO / Finanzleiter', nl: 'CFO / Financieel Directeur', s: 10 },
      { fr: 'DSI / Directeur des Systèmes d\'Information', es: 'DSI / Director de Sistemas de Información', en: 'CIO / IT Director', de: 'CIO / IT-Leiter', nl: 'CIO / IT-Directeur', s: 10 },
      { fr: 'Directeur Administratif / Opérations', es: 'Director Administrativo / Operaciones', en: 'Operations / Administrative Director', de: 'Verwaltungsleiter / Operations', nl: 'Operationeel / Administratief Directeur', s: 9 },
      { fr: 'Responsable IT / Chef de projet', es: 'Responsable IT / Jefe de proyecto', en: 'IT Manager / Project Manager', de: 'IT-Manager / Projektleiter', nl: 'IT-Manager / Projectmanager', s: 8 },
      { fr: 'Autre décideur métier', es: 'Otro decisor de negocio', en: 'Other business decision maker', de: 'Andere Entscheidungsträger', nl: 'Andere zakelijke beslisser', s: 7 },
    ],
  },
  {
    id: 2,
    phase: 0,
    axis: 'profil',
    tagFr: 'Taille',
    tagEs: 'Tamaño',
    tagEn: 'Company Size',
    tagDe: 'Größe',
    tagNl: 'Grootte',
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
    de: {
      q: 'Wie groß ist Ihr Unternehmen?',
      hint: 'Dokumentenvolumen und E-Rechnungspflichten hängen stark von der Unternehmensgröße ab.',
    },
    nl: {
      q: 'Wat is de omvang van uw bedrijf?',
      hint: 'Documentvolume en e-invoicing verplichtingen hangen sterk af van uw bedrijfsgrootte.',
    },
    opts: [
      { fr: 'TPE / Startup (Moins de 10 salariés)', es: 'Microempresa / Autónomo (Menos de 10 empleados)', en: 'Micro / Small Business (Under 10 employees)', de: 'Kleinstunternehmen / Startup (<10 Mitarbeiter)', nl: 'Micro-onderneming / ZZP (<10 werknemers)', s: 4 },
      { fr: 'PME (10 à 49 salariés)', es: 'PYME (10 a 49 empleados)', en: 'Small-Medium Enterprise (10-49 employees)', de: 'KMU (10 bis 49 Mitarbeiter)', nl: 'KMO (10 tot 49 werknemers)', s: 7 },
      { fr: 'ETI (50 à 249 salariés)', es: 'Mediana (50 a 249 empleados)', en: 'Medium-Sized Enterprise (50-249 employees)', de: 'Mittelstand (50 bis 249 Mitarbeiter)', nl: 'Middelgroot bedrijf (50 tot 249 werknemers)', s: 9 },
      { fr: 'Grande entreprise (250 à 999 salariés)', es: 'Gran empresa (250 a 999 empleados)', en: 'Large Enterprise (250-999 employees)', de: 'Großunternehmen (250 bis 999 Mitarbeiter)', nl: 'Grote onderneming (250 tot 999 werknemers)', s: 10 },
      { fr: 'Groupe multinational (1 000+ salariés)', es: 'Grupo multinacional (Más de 1.000 empleados)', en: 'Multinational Group (1,000+ employees)', de: 'Konzern / Multinational (1.000+ Mitarbeiter)', nl: 'Multinationale groep (1.000+ werknemers)', s: 10 },
    ],
  },
  {
    id: 3,
    phase: 0,
    axis: 'profil',
    tagFr: 'Secteur',
    tagEs: 'Sector',
    tagEn: 'Industry',
    tagDe: 'Branche',
    tagNl: 'Sector',
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
    de: {
      q: 'In welcher Branche sind Sie tätig?',
      hint: 'Einige Branchen unterliegen speziellen GoBD- und E-Archivierungsnormen.',
    },
    nl: {
      q: 'In welke sector bent u actief?',
      hint: 'Sommige sectoren hebben specifieke e-archiverings- en nalevingsvereisten.',
    },
    opts: [
      { fr: 'BTP / Immobilier / Promotion', es: 'Construcción / Inmobiliario', en: 'Construction / Real Estate / Development', de: 'Bauwesen / Immobilien / Projektentwicklung', nl: 'Bouw / Vastgoed / Ontwikkeling', s: 10 },
      { fr: 'Industrie / Manufacturing / Énergie', es: 'Industria / Manufactura / Energía', en: 'Manufacturing / Industrial / Energy', de: 'Industrie / Fertigung / Energie', nl: 'Industrie / Productie / Energie', s: 9 },
      { fr: 'Finance / Assurance / Banque', es: 'Finanzas / Seguros / Banca', en: 'Finance / Insurance / Banking', de: 'Finanzen / Versicherungen / Banken', nl: 'Financiën / Verzekeringen / Bankwezen', s: 10 },
      { fr: 'Santé / Cliniques / Pharmaceutique', es: 'Salud / Clínicas / Farmacéutica', en: 'Healthcare / Pharma / Biotech', de: 'Gesundheitswesen / Pharma / Biotech', nl: 'Gezondheidszorg / Farmacie / Biotech', s: 9 },
      { fr: 'Commerce / Distribution / Retail', es: 'Comercio / Distribución / Retail', en: 'Retail / Wholesale / E-commerce', de: 'Handel / E-Commerce / Retail', nl: 'Detailhandel / Groothandel / E-commerce', s: 8 },
      { fr: 'Services / Conseil / Juridique / IT', es: 'Servicios / Consultoría / Jurídico / IT', en: 'Professional Services / Consulting / Legal / IT', de: 'Dienstleistungen / Beratung / Rechtsberatung / IT', nl: 'Zakelijke dienstverlening / Advies / Juridisch / IT', s: 8 },
      { fr: 'Public / Collectivités / Éducation', es: 'Sector público / Educación', en: 'Public Sector / Gov / Education', de: 'Öffentlicher Sektor / Bildung', nl: 'Publieke sector / Onderwijs', s: 9 },
      { fr: 'Autre', es: 'Otro', en: 'Other', de: 'Sonstige', nl: 'Overig', s: 6 },
    ],
  },
  {
    id: 4,
    phase: 0,
    axis: 'profil',
    tagFr: 'Volume',
    tagEs: 'Volumen',
    tagEn: 'Volume',
    tagDe: 'Volumen',
    tagNl: 'Volume',
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
    de: {
      q: 'Wie hoch ist Ihr monatliches Dokumentenvolumen (Buchhaltung, HR)?',
      hint: 'Eingangs-/Ausgangsrechnungen, Verträge, Lohnabrechnungen. Bestimmt den Bedarf an automatischer Texterfassung (OCR).',
    },
    nl: {
      q: 'Wat is uw maandelijkse volume aan verwerkte boekhoud- en HR-documenten?',
      hint: 'Inkomende/uitgaande facturen, contracten, loonstroken. Bepaalt de behoefte aan automatische OCR-herkenning.',
    },
    opts: [
      { fr: 'Moins de 100 documents/mois', es: 'Menos de 100 documentos/mes', en: 'Less than 100 documents/month', de: 'Unter 100 Dokumente / Monat', nl: 'Minder dan 100 documenten / maand', s: 4 },
      { fr: '100 à 500 documents/mois', es: '100 a 500 documentos/mes', en: '100 to 500 documents/month', de: '100 bis 500 Dokumente / Monat', nl: '100 tot 500 documenten / maand', s: 7 },
      { fr: '500 à 2 500 documents/mois', es: '500 a 2.500 documentos/mes', en: '500 to 2,500 documents/month', de: '500 bis 2.500 Dokumente / Monat', nl: '500 tot 2.500 documenten / maand', s: 9 },
      { fr: 'Plus de 2 500 documents/mois', es: 'Más de 2.500 documentos/mes', en: 'More than 2,500 documents/month', de: 'Über 2.500 Dokumente / Monat', nl: 'Meer dan 2.500 documenten / maand', s: 10 },
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
    tagDe: 'Verwaltung',
    tagNl: 'Beheer',
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
    de: {
      q: 'Wie verwalten und archivieren Sie derzeit Ihre Unternehmensdokumente?',
      hint: 'Bewerten Sie Ihren Grad an Abhängigkeit von Papier oder veralteten Ordnerstrukturen.',
    },
    nl: {
      q: 'Hoe beheert en archiveert u momenteel uw bedrijfsdocumenten?',
      hint: 'Beoordeel uw afhankelijkheid van papier of verouderde mappenstructuren.',
    },
    opts: [
      { fr: 'Classeurs physiques / Papier', es: 'Archivadores físicos / Papel', en: 'Physical filing cabinets / Paper-based', de: 'Physische Ordner / Papierarchiv', nl: 'Fysieke ordners / Papier', s: 1 },
      { fr: 'Serveurs locaux ou dossiers partagés cloud (OneDrive, Google Drive, NAS)', es: 'Servidor local o carpetas en la nube (OneDrive, Google Drive, NAS)', en: 'Local server or cloud storage folders (OneDrive, GDrive, DropBox, NAS)', de: 'Lokale Server oder Cloud-Ordner (OneDrive, Google Drive, NAS)', nl: 'Lokale server of cloudmappen (OneDrive, Google Drive, NAS)', s: 4 },
      { fr: 'Système de GED basique ou logiciel métier limité', es: 'Sistema de GED básico o software sectorial limitado', en: 'Basic Document Management System (DMS) or limited business software', de: 'Einfaches DMS-System oder begrenzte Branchensoftware', nl: 'Basissysteem voor documentbeheer of beperkte software', s: 7 },
      { fr: 'Solution de GED professionnelle (Zeendoc, DocuWare, Yooz, etc.)', es: 'Solución de GED profesional integrada', en: 'Professional enterprise DMS / Content Services platform', de: 'Professionelle DMS-Komplettlösung (z.B. DocuWare, Zeendoc, Elo)', nl: 'Professionele DMS-oplossing (geïntegreerd enterprise-systeem)', s: 10 },
    ],
  },
  {
    id: 6,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Historique',
    tagEs: 'Histórico',
    tagEn: 'Backlog',
    tagDe: 'Archivbestand',
    tagNl: 'Archief',
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
    de: {
      q: 'Wie hoch ist der Digitalisierungsgrad Ihres historischen Dokumentenarchivs?',
      hint: 'Der sofortige Zugriff auf digitale Archive ist entscheidend für die GoBD-Konformität bei Betriebsprüfungen.',
    },
    nl: {
      q: 'Wat is de digitaliseringsgraad van uw historische documentenarchief?',
      hint: 'Directe toegang tot archieven is essentieel voor efficiëntie bij fiscale audits.',
    },
    opts: [
      { fr: 'Quasiment aucun (Moins de 10% d\'historique numérisé)', es: 'Prácticamente ninguno (Menos del 10% digitalizado)', en: 'Almost none (Less than 10% of historical backlog digitized)', de: 'Nahezu null (weniger als 10% digitalisiert)', nl: 'Vrijwel niets (minder dan 10% gedigitaliseerd)', s: 2 },
      { fr: 'Partiel (De 10% à 50% de nos archives papier numérisées)', es: 'Parcial (Del 10% al 50% digitalizado)', en: 'Partial (10% to 50% of our paper archives scanned)', de: 'Partiell (10% bis 50% der Papierarchive gescannt)', nl: 'Gedeeltelijk (10% tot 50% van papierarchief gedigitaliseerd)', s: 5 },
      { fr: 'Avancé (Plus de 50% numérisé, mais indexation basique)', es: 'Avanzado (Más del 50%, pero indexación muy básica)', en: 'Advanced (Over 50% digitized, but search metadata is basic)', de: 'Fortgeschritten (über 50% digitalisiert, aber einfache Verschlagwortung)', nl: 'Geavanceerd (meer dan 50% gedigitaliseerd, basisindexering)', s: 8 },
      { fr: 'Total (100% numérisé, indexé et consultable instantanément)', es: 'Total (100% digitalizado, indexado y accesible)', en: 'Complete (100% digitized, structured, and instantly searchable)', de: 'Vollständig (100% digitalisiert, strukturiert und sofort durchsuchbar)', nl: 'Volledig (100% gedigitaliseerd, geïndexeerd en direct doorzoekbaar)', s: 10 },
    ],
  },
  {
    id: 7,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Automatisation',
    tagEs: 'Automatización',
    tagEn: 'Automation',
    tagDe: 'Automatisierung',
    tagNl: 'Automatisering',
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
    de: {
      q: 'Wie erfolgt die Erfassung von Eingangsrechnungen in Ihrer Buchhaltung?',
      hint: 'Die automatische Datenextraktion verhindert zeitraubende und fehleranfällige manuelle Eingaben.',
    },
    nl: {
      q: 'Hoe worden leveranciersfacturen ingevoerd in uw boekhouding?',
      hint: 'Automatische data-extractie voorkomt tijdrovende en foutgevoelige handmatige invoer.',
    },
    opts: [
      { fr: 'Saisie manuelle ligne par ligne par un comptable', es: 'Registro manual línea por línea por un contable', en: 'Manual entry line-by-line by an accountant', de: 'Manuelle Zeile-für-Zeile-Eingabe durch Buchhalter', nl: 'Handmatige invoer regel voor regel door een boekhouder', s: 1 },
      { fr: 'Saisie assistée avec un OCR basique (détection simple)', es: 'Registro asistido con un OCR básico (detección simple)', en: 'Assisted entry using basic OCR/scanning with manual checks', de: 'Unterstützte Erfassung mit einfachem OCR', nl: 'Geassisteerde invoer met basis OCR', s: 5 },
      { fr: 'Lecture automatique (LAD/RAD) intelligente avec videocodage', es: 'Lectura inteligente (LAD/RAD) con videocodificación', en: 'Intelligent AI capture (OCR/LAD) with automated header & line matching', de: 'Intelligente OCR/LAD-Erfassung mit automatischer Positionszuordnung', nl: 'Slimme automatische herkenning (LAD/RAD) met controle', s: 8 },
      { fr: 'Flux 100% automatisé, de l\'intégration comptable au paiement', es: 'Flujo 100% automatizado, desde la contabilidad al pago', en: 'Zero-touch fully automated processing from receipt to ERP posting', de: '100% automatisierter Prozess vom Empfang bis zur Buchung', nl: '100% geautomatiseerde stroom van ontvangst tot boeking', s: 10 },
    ],
  },
  {
    id: 8,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Workflows',
    tagEs: 'Workflows',
    tagEn: 'Workflows',
    tagDe: 'Workflows',
    tagNl: 'Workflows',
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
    de: {
      q: 'Wie sieht der Freigabeprozess für Rechnungen oder Verträge in Ihrem Unternehmen aus?',
      hint: 'Automatisierte Freigabe-Workflows stellen die Einhaltung gesetzlicher Zahlungsfristen sicher.',
    },
    nl: {
      q: 'Hoe verloopt het goedkeuringsproces voor facturen of contracten in uw organisatie?',
      hint: 'Geautomatiseerde goedkeuringsstromen garanderen het naleven van wettelijke betalingstermijnen.',
    },
    opts: [
      { fr: 'Circulation physique du papier ou envoi de mails manuels', es: 'Circulación física del papel o envío manual de emails', en: 'Physical paper routing or manual back-and-forth emails', de: 'Physischer Umlauf von Papier oder manuelle E-Mails', nl: 'Fysieke papiercirculatie of handmatige e-mails', s: 2 },
      { fr: 'Workflow basique de validation par mail ou outil tiers', es: 'Workflow básico de validación por email o herramienta externa', en: 'Simple email validation workflow or non-integrated software', de: 'Einfacher E-Mail-Freigabeprozess oder separates Tool', nl: 'Basisfreigabeworkflow via e-mail of externe tool', s: 5 },
      { fr: 'Workflow structuré dans la GED avec notifications et relances', es: 'Workflow estructurado en la GED con notificaciones', en: 'Structured DMS workflows with automated user task alerts', de: 'Strukturierter Workflow im DMS mit Benachrichtigungen', nl: 'Gestructureerde workflow in DMS met meldingen en herinneringen', s: 9 },
      { fr: 'Workflows complexes avec gestion d\'en-cours et analytiques', es: 'Workflows complejos con gestión analítica y multidepartamento', en: 'Complex rules-based workflows with dynamic cost-center routing', de: 'Komplexe Workflows mit Kostenstellenaufteilung und Analyse', nl: 'Complexes workflows met afdelingssturing en analyse', s: 10 },
    ],
  },
  {
    id: 9,
    phase: 1,
    axis: 'systeme',
    tagFr: 'Temps',
    tagEs: 'Tiempo',
    tagEn: 'Search',
    tagDe: 'Suche',
    tagNl: 'Zoektijd',
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
    de: {
      q: 'Wie lange dauert es, ein bestimmtes Dokument von vor 3 Jahren zu finden?',
      hint: 'Volltextsuche (OCR) und Metadaten sparen erheblich Arbeitszeit.',
    },
    nl: {
      q: 'Hoeveel tijd kost het om een specifiek document van 3 jaar geleden terug te vinden?',
      hint: 'Full-text zoeken (OCR) of zoeken op metadata levert enorme tijdwinst op.',
    },
    opts: [
      { fr: 'Plus de 15 minutes (Recherche dans archives physiques ou réseau complexe)', es: 'Más de 15 minutos (Búsqueda física o en red compleja)', en: 'More than 15 minutes (Digging in physical archives or file shares)', de: 'Mehr als 15 Minuten (Durchsuchen von Papierarchiven oder komplexen Netzwerken)', nl: 'Meer dan 15 minuten (Zoeken in fysieke archieven of complexe mappen)', s: 2 },
      { fr: 'Entre 5 et 15 minutes (Il faut ouvrir plusieurs dossiers ou outils)', es: 'Entre 5 y 15 minutos (Requiere abrir varias carpetas o herramientas)', en: 'Between 5 and 15 minutes (Requires looking through different drives)', de: 'Zwischen 5 und 15 Minuten (Mehrere Ordner oder Systeme öffnen)', nl: 'Tussen 5 en 15 minuten (Meerdere mappen of tools openen)', s: 5 },
      { fr: 'Moins de 2 minutes (Grâce à une recherche par index dans notre GED)', es: 'Menos de 2 minutos (Gracias a una búsqueda indexada en la GED)', en: 'Less than 2 minutes (Indexed metadata search in our DMS)', de: 'Unter 2 Minuten (Dank indexierter Suche im DMS)', nl: 'Minder dan 2 minuten (Dankzij geïndexeerde zoekopdracht in DMS)', s: 9 },
      { fr: 'Quelques secondes (Recherche full-text / IA instantanée)', es: 'Unos segundos (Búsqueda instantánea full-text / IA)', en: 'A few seconds (Instant global full-text / AI semantic search)', de: 'Wenige Sekunden (Sofortige Volltext- / KI-Suche)', nl: 'Enkele seconden (Directe full-text / KI-zoekopdracht)', s: 10 },
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
    tagDe: 'E-Rechnung',
    tagNl: 'e-Invoicing',
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
    de: {
      q: 'Beherrscht Ihre Organisation die Anforderungen der E-Rechnungspflicht (Wachstumschancengesetz / GoBD / Peppol)?',
      hint: 'Verpflichtender Empfang seit Jan. 2025 in Deutschland, Formate ZUGFeRD, XRechnung, Peppol BIS3.',
    },
    nl: {
      q: 'Is uw organisatie voorbereid op de Europese e-invoicing normen en Peppol/NLius verplichtingen?',
      hint: 'Gevraagde netwerkkoppeling via Peppol, UBL en NLius-standaarden.',
    },
    opts: [
      {
        fr: 'Non, c\'est encore très flou pour nos équipes',
        es: 'No, todavía es un tema muy confuso para nosotros',
        en: 'No, we are not familiar with the technical requirements or act deadlines',
        de: 'Nein, das ist für unsere Teams noch sehr unklar',
        nl: 'Nee, dit is nog erg onduidelijk voor onze teams',
        s: 1
      },
      {
        fr: 'Oui, nous connaissons le sujet mais n\'avons pas de plan d\'action précis',
        es: 'Sí, conocemos el tema pero no tenemos un plan de acción concreto',
        en: 'We know the basics but do not have a defined software implementation roadmap',
        de: 'Ja, wir kennen das Thema, haben aber noch keinen konkreten Fahrplan',
        nl: 'Ja, we kennen het onderwerp maar hebben geen concret actieplan',
        s: 4
      },
      {
        fr: 'Oui, nous avons un projet en cours pour être prêts avant le 1er septembre 2026',
        es: 'Sí, tenemos un proyecto en marcha para cumplir los plazos de la Ley Crea y Crece',
        en: 'Yes, we are actively implementing tools to meet the EU & local deadlines',
        de: 'Ja, wir setzen derzeit ein Projekt um, um alle Fristen einzuhalten',
        nl: 'Ja, we hebben een lopend project om tijdig te voldoen',
        s: 9
      },
      {
        fr: 'Tout est prêt, notre système gère ou gérera les flux PPF/PDP natifs',
        es: 'Todo está listo, nuestro sistema gestiona o gestionará flujos oficiales firmados',
        en: 'We are fully prepared, with compliant Peppol/XML pipelines built into our systems',
        de: 'Alles ist bereit, unser System verarbeitet native E-Rechnungsformate',
        nl: 'Alles is klaar, ons systeem verwerkt alle e-factuurformaten',
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
    tagDe: 'Archivierung',
    tagNl: 'Archivering',
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
    de: {
      q: 'Wie speichern Sie Rechnungen und Dokumente von hoher rechtlicher Relevanz?',
      hint: 'Die GoBD-konforme E-Archivierung garantiert Unveränderbarkeit und Revisionssicherheit bei Prüfungen.',
    },
    nl: {
      q: 'Hoe slaat u facturen en juridisch kritische documenten op?',
      hint: 'Gecertificeerde digitale archivering garandeert de authenticiteit en integriteit bij controles.',
    },
    opts: [
      { fr: 'Stockage papier classique ou disques durs locaux', es: 'Almacenamiento en papel o discos duros locales', en: 'Standard paper files, network shares, or local hard drives', de: 'Klassische Papierarchivierung oder lokale Festplatten', nl: 'Klassieke opslag op papier of lokale harde schijven', s: 1 },
      { fr: 'Dossiers Cloud cryptés (mais sans valeur probante légale)', es: 'Carpetas Cloud encriptadas (sin valor probatorio legal)', en: 'Encrypted cloud folders (without true write-once legal compliance)', de: 'Verschlüsselte Cloud-Ordner (ohne GoBD-Revisionssicherheit)', nl: 'Gecodeerde cloudmappen (zonder juridische bewijskracht)', s: 4 },
      { fr: 'Archivage avec signature électronique simple', es: 'Archivo digital básico con firma electrónica simple', en: 'DMS archive with basic digital signatures applied', de: 'Digitale Archivierung mit einfacher elektronischer Signatur', nl: 'Digitale archivering met eenvoudige elektronische handtekening', s: 7 },
      { fr: 'Coffre-fort électronique certifié (valeur probante, normes NF Z42-020 / eIDAS)', es: 'Almacén electrónico certificado con valor probatorio', en: 'Certified audit-proof archive (e.g., GoBD-certified, Peppol/eIDAS compliant)', de: 'Zertifiziertes GoBD-E-Archiv (Revisionssicherheit, eIDAS, WORM-Speicher)', nl: 'Gecertificeerd e-archief met bewijskracht (GoBD, eIDAS-conform)', s: 10 }
    ]
  },
  {
    id: 12,
    phase: 2,
    axis: 'conformite',
    tagFr: 'Conservation',
    tagEs: 'Conservación',
    tagEn: 'Retention',
    tagDe: 'Aufbewahrung',
    tagNl: 'Bewaartermijn',
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
    de: {
      q: 'Wenden Sie eine strenge Aufbewahrungsrichtlinie (Löschfristen) für Dokumente an?',
      hint: 'Z.B. 10 Jahre für Buchhaltungsbelege/Rechnungen, 6 Jahre für Handelsbriefe.',
    },
    nl: {
      q: 'Hanteert u een strikt bewaartermijnenbeleid voor uw documenten?',
      hint: 'Bijvoorbeeld 10 jaar voor facturen en fiscale documenten, 5 jaar voor personeelsdossiers.',
    },
    opts: [
      { fr: 'Non, nous gardons tout indéfiniment sans politique définie', es: 'No, lo guardamos todo indefinidamente sin política definida', en: 'No, we keep everything forever on our drives without rules', de: 'Nein, wir bewahren alles ohne festgelegte Richtlinie auf', nl: 'Nee, we bewaren alles onbeperkt zonder beleid', s: 1 },
      { fr: 'Oui, mais de façon manuelle et irrégulière', es: 'Sí, pero de forma manual e irregular', en: 'Yes, but it is done manually and inconsistently', de: 'Ja, aber manuell und unregelmäßig', nl: 'Ja, maar handmatig en onregelmatig', s: 5 },
      { fr: 'Oui, notre politique DUA est écrite, mais l\'épuration est complexe', es: 'Sí, la política está escrita, pero el purgado es complejo', en: 'Yes, we have written policies, but execution/purging is hard', de: 'Ja, die Richtlinie ist schriftlich fixiert, aber die Löschung ist aufwendig', nl: 'Ja, het beleid staat op papier, maar het schonen is complex', s: 8 },
      { fr: 'Oui, les durées de conservation sont automatisées dans notre GED', es: 'Sí, los plazos de conservación están automatizados en la GED', en: 'Yes, retention schedules are automated and enforced inside our DMS', de: 'Ja, Aufbewahrungs- und Löschfristen sind im DMS automatisiert', nl: 'Ja, bewaartermijnen zijn geautomatiseerd in ons DMS', s: 10 }
    ]
  },
  {
    id: 13,
    phase: 2,
    axis: 'conformite',
    tagFr: 'RGPD',
    tagEs: 'RGPD',
    tagEn: 'GDPR',
    tagDe: 'DSGVO',
    tagNl: 'AVG/GDPR',
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
    de: {
      q: 'Stellt Ihr Dokumentenmanagement die DSGVO-Konformität (Zugriffsrechte, Recht auf Vergessenwerden) sicher?',
      hint: 'HR- und Kundendaten müssen geschützt und auditiert werden.',
    },
    nl: {
      q: 'Garanteert uw documentbeheer naleving van de AVG/GDPR (toegangsrechten, recht op vergetelheid)?',
      hint: 'Personeels- en klantgegevens moeten goed beveiligd en controleerbaar zijn.',
    },
    opts: [
      { fr: 'Non, nous ne gérons pas cet aspect de façon centralisée', es: 'No, no gestionamos este aspecto de forma centralizada', en: 'No, we do not centrally manage document-level privacy compliance', de: 'Nein, wir verwalten diesen Aspekt nicht zentralisiert', nl: 'Nee, we beheren dit niet centraal', s: 1 },
      { fr: 'Partiellement (Quelques restrictions d\'accès existent)', es: 'Parcialmente (Existen algunas restricciones de acceso)', en: 'Partially (Basic user folder permissions are set up)', de: 'Partiell (Es existieren einfache Zugriffsbeschränkungen)', nl: 'Gedeeltelijk (Er bestaan enkele toegangsbeperkingen)', s: 4 },
      { fr: 'Oui (Droits d\'accès stricts, journal d\'audit complet de qui lit quoi)', es: 'Sí (Derechos de acceso estrictos e histórico de auditoría)', en: 'Yes (Strict roles, full audit trails of who viewed/edited which files)', de: 'Ja (Strenge Zugriffsrechte, lückenloses Audit-Log)', nl: 'Ja (Strikte toegangsrechten, volledig audit-logboek)', s: 9 },
      { fr: 'Totalement (Gestion avancée des habilitations, masquage des données sensibles)', es: 'Totalmente (Gestión avanzada de permisos y enmascaramiento de datos)', en: 'Completely (Granular control, automatic redaction of sensitive PII)', de: 'Vollständig (Erweiterte Rechtestuerung, automatische Datenanonymisierung)', nl: 'Volledig (Geavanceerde machtigingen, anonimisering van gevoelige data)', s: 10 }
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
    tagDe: 'Software',
    tagNl: 'Software',
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
    de: {
      q: 'Was ist Ihr primäres Warenwirtschaftssystem oder ERP?',
      hint: 'Die Anbindung von DMS an Ihr ERP ist der Schlüssel für automatisierte Rechnungsverarbeitung.',
    },
    nl: {
      q: 'Wat is uw primaire ERP- of boekhoudsysteem?',
      hint: 'Naadloze koppeling tussen DMS en ERP is de sleutel tot succes.',
    },
    opts: [
      { fr: 'ERP Majeur (SAP, Microsoft Dynamics, Oracle...)', es: 'ERP de primer nivel (SAP, Microsoft Dynamics, Oracle...)', en: 'Major ERP (SAP, Microsoft Dynamics, Oracle, Infor...)', de: 'Großes ERP (SAP, Microsoft Dynamics, Oracle, Infor...)', nl: 'Groot ERP (SAP, Microsoft Dynamics, Oracle...)', s: 10 },
      { fr: 'ERP Moyen de gamme (Sage 100/X3, Cegid, Cegid XRP...)', es: 'ERP de gama media (Sage, Cegid, Microsoft Business Central...)', en: 'Mid-Market ERP (Sage, Unit4, Exact, AFAS, Cegid...)', de: 'Mittelstands-ERP (Sage, Business Central, Exact, Unit4, AFAS...)', nl: 'Middelgroot ERP (Sage, Unit4, Exact, AFAS...)', s: 9 },
      { fr: 'Logiciel de comptabilité classique (Sage 50, QuickBooks, Pennylane...)', es: 'Software de contabilidad clásico (A3, Sage 50, Holded...)', en: 'SMB Cloud Accounting (QuickBooks, Pennylane, Exact, Xero...)', de: 'Klassische Buchhaltungssoftware (Datev, Lexware, Sage 50, QuickBooks...)', nl: 'Standaard boekhoudpakket (Exact Online, SnelStart, Twinfield, e-Boekhouden...)', s: 8 },
      { fr: 'ERP propriétaire / Outil développé sur-mesure / Aucun', es: 'ERP propietario / Software a medida / Ninguno', en: 'Custom proprietary system / Industry-niche software / None', de: 'Eigenes ERP / Maßgeschneiderte Lösung / Keine', nl: 'Eigen ERP / Maatwerksoftware / Geen', s: 6 }
    ]
  },
  {
    id: 15,
    phase: 3,
    axis: 'erp',
    tagFr: 'Intégration',
    tagEs: 'Integración',
    tagEn: 'Integration',
    tagDe: 'Integration',
    tagNl: 'Integratie',
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
    de: {
      q: 'Wie erfolgt heute die Übertragung von Buchungssätzen vom DMS in die Buchhaltung?',
      hint: 'Die Vermeidung doppelter Dateneingabe ist essenziell für die Rentabilität.',
    },
    nl: {
      q: 'Hoe verloopt de overdracht van boekingsgegevens van DMS naar de boekhouding?',
      hint: 'Dubbele invoer vermijden is cruciaal voor een goed rendement.',
    },
    opts: [
      { fr: 'Ressaisie manuelle de chaque écriture (Zéro intégration)', es: 'Doble introducción manual de cada asiento (Sin integración)', en: 'Manual manual entry into our ledger (No active interface)', de: 'Manuelle Neueingabe jedes Buchungssatzes (Keine Schnittstelle)', nl: 'Handmatige herinvoer van elke boeking (Geen integratie)', s: 1 },
      { fr: 'Import/Export manuel de fichiers plats (CSV, Excel)', es: 'Importación/exportación manual de archivos (CSV, Excel)', en: 'Manual import/export of flat files (CSV, XML, Excel)', de: 'Manueller Import/Export von Dateien (CSV, XML, Excel)', nl: 'Handmatige import/export van bestanden (CSV, Excel)', s: 4 },
      { fr: 'Intégration semi-automatique (Dossier d\'échange surveillé ou API basique)', es: 'Integración semiautomática (Carpetas de intercambio o API básica)', en: 'Semi-automated syncing (Watched folder uploads or basic API)', de: 'Halbautomatische Integration (Überwachter Ordner oder einfache API)', nl: 'Halfautomatische integratie (Uitwisselingsmap of basis API)', s: 7 },
      { fr: 'Synchronisation en temps réel bidirectionnelle via connecteur natif', es: 'Sincronización bidireccional en tiempo real mediante conector nativo', en: 'Real-time bi-directional integration via native API connectors', de: 'Bi-direktionale Echtzeit-Synchronisation über nativen Konnektor', nl: 'Real-time tweerichtingsverbinding via gecertificeerde koppeling', s: 10 }
    ]
  },
  {
    id: 16,
    phase: 3,
    axis: 'erp',
    tagFr: 'Signature',
    tagEs: 'Firma',
    tagEn: 'Signature',
    tagDe: 'Signatur',
    tagNl: 'Handtekening',
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
    de: {
      q: 'Wie verwalten Sie die Unterzeichnung von Verträgen oder Angeboten mit Dritten?',
      hint: 'E-Signatur nach eIDAS-Verordnung garantiert Rechtssicherheit.',
    },
    nl: {
      q: 'Hoe beheert u het ondertekenen van contracten of offertes?',
      hint: 'Gecertificeerde digitale handtekeningen garanderen juridische geldigheid.',
    },
    opts: [
      { fr: 'Impression, signature manuelle, scan et envoi par mail', es: 'Impresión, firma manuscrita, escaneo y envío por email', en: 'Print, sign by hand, scan, and email back', de: 'Drucken, handschriftlich unterschreiben, scannen und per E-Mail senden', nl: 'Afdrukken, handmatig ondertekenen, scannen en mailen', s: 1 },
      { fr: 'Outil de signature électronique tiers non intégré (Yousign, DocuSign...)', es: 'Herramienta externa de firma electrónica no integrada (DocuSign, Yousign...)', en: 'Standalone third-party signing tool (DocuSign, Yousign, Adobe Sign)', de: 'Eines externes E-Signatur-Tool (DocuSign, Yousign, Adobe Sign)', nl: 'Losse externe e-signature tool (DocuSign, Yousign, Adobe Sign)', s: 6 },
      { fr: 'Signature électronique certifiée directement intégrée dans nos workflows GED', es: 'Firma electrónica certificada integrada directamente en la GED', en: 'eIDAS-compliant digital signatures integrated directly into our DMS workflows', de: 'Zertifizierte digitale Signatur direkt im DMS-Workflow integriert', nl: 'Gecertificeerde digitale handtekening direct geïntegreerd in DMS-workflows', s: 10 }
    ]
  },
  {
    id: 17,
    phase: 3,
    axis: 'erp',
    tagFr: 'Messagerie',
    tagEs: 'Mensajería',
    tagEn: 'Inbox',
    tagDe: 'E-Mail',
    tagNl: 'E-mail',
    fr: {
      q: 'Comment classey-vous les emails et pièces jointes importants que vous recevez\u00a0?',
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
    de: {
      q: 'Wie archivieren Sie wichtige E-Mails und deren Anhänge?',
      hint: 'Ein Outlook-/Gmail-Plugin verhindert Informationsverlust in persönlichen Postfächern.',
    },
    nl: {
      q: 'Hoe archiveert u belangrijke e-mails en bijlagen die u ontvangt?',
      hint: 'Een Outlook/Gmail koppeling voorkomt verlies van informatie in individuele mailboxen.',
    },
    opts: [
      { fr: 'Chacun gère dans sa boîte mail, pas de classement centralisé', es: 'Cada uno gestiona su buzón, sin archivo centralizado', en: 'Left in individual inboxes; no structured central storage', de: 'Jeder verwaltet in seinem Postfach, keine zentrale Ablage', nl: 'Ieder beheert in eigen mailbox, geen centrale opslag', s: 1 },
      { fr: 'Téléchargement manuel et dépôt dans un dossier partagé', es: 'Descarga manual y almacenamiento en carpeta compartida', en: 'Manual download and upload to server drives/folders', de: 'Manuelles Herunterladen und Speichern im Netzwerkordner', nl: 'Handmatig downloaden en opslaan in een gedeelde map', s: 4 },
      { fr: 'Classement via un connecteur de messagerie vers notre GED', es: 'Archivo mediante un conector de mensajería hacia nuestra GED', en: 'Direct email plugin filing into corresponding DMS project folders', de: 'Ablage über einen E-Mail-Konnektor direkt im DMS', nl: 'Archivering via een e-mailkoppeling direct naar ons DMS', s: 9 },
      { fr: 'Archivage automatique des flux de mails selon règles intelligentes', es: 'Archivo automático de emails basado en reglas inteligentes', en: 'Automated email archiving based on smart rules/AI mapping', de: 'Automatische Archivierung von E-Mail-Flüssen nach intelligenten Regeln', nl: 'Automatische e-mailarchivering op basis van slimme regels', s: 10 }
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
    tagDe: 'Zeitplan',
    tagNl: 'Planning',
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
    de: {
      q: 'Wie sieht der geplante Zeitrahmen für Ihr DMS- / E-Rechnungsprojekt aus?',
      hint: 'Gesetzliche Fristen erfordern frühzeitiges Handeln (eine Einführung dauert 3 bis 6 Monate).',
    },
    nl: {
      q: 'Wat is de geplande tijdslijn voor uw DMS- / E-invoicing project?',
      hint: 'Wettelijke deadlines vereisen tijdig handelen (een implementatie duurt 3 tot 6 maanden).',
    },
    opts: [
      { fr: 'Urgent — Dans les 3 prochains mois', es: 'Urgente — En los próximos 3 meses', en: 'Urgent — Over the next 3 months', de: 'Dringend — In den nächsten 3 Monaten', nl: 'Dringend — Binnen de komende 3 maanden', s: 10 },
      { fr: 'Court terme — D\'ici la fin de l\'année ou avant la réforme', es: 'Corto plazo — Antes de que acabe el año o entre en vigor la ley', en: 'Short term — Fully deployed before key regulatory deadlines', de: 'Kurzfristig — Bis Ende des Jahres oder vor Inkrafttreten der Frist', nl: 'Korte termijn — Voor het einde van het jaar of voor de verplichting', s: 9 },
      { fr: 'Moyen terme — D\'ici 12 mois', es: 'Medio plazo — En los próximos 12 meses', en: 'Medium term — Within the next 12 months', de: 'Mittelfristig — Innerhalb von 12 Monaten', nl: 'Middellange termijn — Binnen 12 maanden', s: 7 },
      { fr: 'Pas de date fixe / Veille technologique', es: 'Sin fecha fija / Vigilancia tecnológica', en: 'No fixed date / Just researching options for now', de: 'Kein fester Termin / Reine Marktbeobachtung', nl: 'Geen vaste datum / Oriënterende fase', s: 4 }
    ]
  },
  {
    id: 19,
    phase: 4,
    axis: 'projet',
    tagFr: 'Budget',
    tagEs: 'Presupuesto',
    tagEn: 'Budget',
    tagDe: 'Budget',
    tagNl: 'Budget',
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
    de: {
      q: 'Welches Jahresbudget (Lizenzen, Hosting, Integration) planen Sie ein?',
      hint: 'Moderne Cloud-Lösungen ermöglichen planbare monatliche Kosten.',
    },
    nl: {
      q: 'Welk jaarlijks budget (licenties, hosting, implementatie) voorziet u?',
      hint: 'Moderne cloudoplossingen maken beheersbare maandelijkse kosten mogelijk.',
    },
    opts: [
      { fr: 'Moins de 2 500 € / an (TPE, solutions d\'entrée de gamme)', es: 'Menos de 2.500 € / año', en: 'Under €2,500 / year (Entry-level cloud / light setups)', de: 'Unter 2.500 € / Jahr (Einsteiger-Cloud-Lösungen)', nl: 'Minder dan € 2.500 / jaar (Basissystemen)', s: 4 },
      { fr: '2 500 à 10 000 € / an (PME, GED standard comptable)', es: 'De 2.500 a 10.000 € / año', en: '€2,500 to €10,000 / year (Standard SMB setups)', de: '2.500 bis 10.000 € / Jahr (Standard-DMS für KMU)', nl: '€ 2.500 tot € 10.000 / jaar (Standaard DMS voor KMO)', s: 7 },
      { fr: '10 000 à 40 000 € / an (ETI, flux avancés, multisites, ERP)', es: 'De 10.000 a 40.000 € / año', en: '€10,000 to €40,000 / year (Multi-site, ERP-integrated DMS)', de: '10.000 bis 40.000 € / Jahr (Mittelstand, ERP-Integration, Multi-Site)', nl: '€ 10.000 tot € 40.000 / jaar (Gevorderd DMS met ERP-integratie)', s: 9 },
      { fr: 'Plus de 40 000 € / an (Grands groupes, sur-mesure complexe)', es: 'Más de 40.000 € / año', en: 'Over €40,000 / year (Enterprise-grade, custom business setups)', de: 'Über 40.000 € / Jahr (Großunternehmen, Komplexe Individuallösung)', nl: 'Meer dan € 40.000 / jaar (Enterprise-niveau, maatwerk)', s: 10 },
      { fr: 'Non défini / Nous cherchons à évaluer le coût', es: 'No definido / Buscamos evaluar el coste', en: 'Not yet defined / Looking to evaluate pricing options', de: 'Nicht definiert / Kosten evaluieren', nl: 'Nog niet gedefinieerd / Kosten oriëntatie', s: 5 }
    ]
  },
  {
    id: 20,
    phase: 4,
    axis: 'projet',
    tagFr: 'Accompagnement',
    tagEs: 'Acompañamiento',
    tagEn: 'Advisory',
    tagDe: 'Beratung',
    tagNl: 'Advies',
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
    de: {
      q: 'Welche Unterstützung benötigen Sie bei der Auswahl und Einführung Ihres DMS?',
      hint: 'Documatch bietet herstellerneutrale Beratung und direkte Anbieter-Vergleiche.',
    },
    nl: {
      q: 'Welk niveau van ondersteuning heeft u nodig bij de keuze en uitrol van uw DMS?',
      hint: 'Documatch biedt onafhankelijk advies of brengt u direct in contact met gekwalificeerde leveranciers.',
    },
    opts: [
      { fr: 'Autonomie complète (Accès à vos outils de comparaison en ligne)', es: 'Autonomía completa (Acceso a comparadores online)', en: 'Self-Service (Access to online comparison tools only)', de: 'Vollständige Autonomie (Zugriff auf Online-Vergleichstools)', nl: 'Volledig zelfstandig (Gebruik van online vergelijkingstools)', s: 5 },
      { fr: 'Aide à la sélection (Shortlist personnalisé de 3 solutions éligibles)', es: 'Ayuda en la selección (Shortlist personalizado de 3 soluciones)', en: 'Assisted Matching (A custom shortlist of 3 eligible solutions)', de: 'Unterstützung bei der Auswahl (Individuelle Shortlist von 3 Lösungen)', nl: 'Hulp bij selectie (Gepersonaliseerde shortlist van 3 oplossingen)', s: 8 },
      { fr: 'Accompagnement de bout en bout (Aide à la rédaction du cahier des charges / RFP)', es: 'Acompañamiento integral (Ayuda en pliego de condiciones / RFP)', en: 'Full Advisory (Assistance with requirements writing and RFPs)', de: 'End-to-End-Begleitung (Unterstützung bei Lastenheft / Ausschreibung)', nl: 'Volledige begeleiding (Hulp bij programma van eisen / RFP)', s: 10 }
    ]
  }
];
