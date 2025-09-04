// Internationalization (i18n) system for PITCHLY
import { createContext, useContext } from 'react';

// Translation strings organized by page/component
export const translations = {
  // English (default)
  en: {
    // Navigation
    nav: {
      pricing: 'Pricing',
      features: 'Features',
      testimonials: 'Testimonials',
      aboutUs: 'About Us',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      dashboard: 'Dashboard',
      proposals: 'Proposals',
      templates: 'Templates',
      analytics: 'Analytics',
      profile: 'Profile',
      signOut: 'Sign Out'
    },
    // Landing page
    landing: {
      heroTitle: 'AI-Powered Proposal Generation',
      heroSubtitle: 'Create winning proposals in minutes with AI. Professional, personalized proposals that convert prospects into clients.',
      getStartedFree: 'Start Creating Proposals',
      viewPricing: 'View Pricing',
      trustedBy: 'Trusted by freelancers and agencies worldwide',
      howItWorks: 'See How It Works',
      step1Title: 'Describe Your Project',
      step1Desc: 'Tell us about your client and project requirements',
      step2Title: 'AI Generates Proposal', 
      step2Desc: 'Our AI creates a professional, customized proposal',
      step3Title: 'Review & Send',
      step3Desc: 'Make final edits and send to your client',
      features: 'Features',
      pricing: 'Choose Your Plan',
      fasterProposalCreation: 'Faster Proposal Creation',
      higherWinRate: 'Higher Win Rate',
      hoursSavedMonthly: 'Hours Saved Monthly',
      tryItNow: 'Try It Now - Create Your First Proposal',
      everythingYouNeed: 'Everything You Need to',
      winClients: 'Win Clients',
      aiPoweredPlatform: 'Our AI-powered platform handles the heavy lifting so you can focus on what matters most - your work.'
    },
    // Features
    features: {
      proposalAIEngine: 'ProposalAI™ Engine',
      proposalAIDesc: 'Our proprietary AI algorithm, trained exclusively on winning proposals, analyzes client requirements and generates persuasive, industry-specific content that converts prospects into clients.',
      advancedProposalAI: 'Advanced ProposalAI™ Technology',
      trainedOn50k: 'Trained on 50,000+ winning proposals from top freelancers',
      industrySpecific: 'Industry-specific language patterns and terminology',
      conversionOptimized: 'Conversion-optimized structure and persuasion techniques',
      realTimeAnalysis: 'Real-time client requirement analysis and adaptation',
      continuousLearning: 'Continuous learning from successful proposal outcomes',
      personalizedTone: 'Personalized tone matching for different client types',
      
      lightningFast: 'Lightning Fast Generation',
      lightningFastDesc: 'Generate comprehensive proposals in under 2 minutes. No more spending hours crafting the perfect pitch.',
      speedWithoutSacrifice: 'Speed Without Sacrifice',
      averageGeneration: 'Average generation time: 47 seconds for full proposals',
      instantBrief: 'Instant brief analysis and requirement extraction',
      completeProposals: 'Complete proposals with scope, timeline, and pricing',
      realTimeEditing: 'Real-time editing and refinement capabilities',
      multipleFormats: 'Multiple format exports (PDF, Word, HTML)',
      autoSave: 'Auto-save and version history for all proposals',

      higherConversion: 'Higher Conversion Rates',
      higherConversionDesc: 'Our proposals follow proven frameworks that consistently convert prospects into paying clients.',
      conversionFramework: 'Conversion-Optimized Framework',
      acceptanceRate: '85% average acceptance rate vs 30% industry standard',
      psychologyBased: 'Psychology-based persuasion techniques built-in',
      valueFocused: 'Value-focused positioning that justifies premium pricing',
      painPointId: 'Pain point identification and solution mapping',
      clearProjectScope: 'Clear project scopes that prevent scope creep',
      professionalFormatting: 'Professional formatting that builds instant credibility',

      smartAnalytics: 'Smart Analytics Dashboard',
      smartAnalyticsDesc: 'Track which proposals perform best and optimize your approach with data-driven insights.',
      dataDrivenInsights: 'Data-Driven Success Insights',
      proposalPerformance: 'Proposal performance tracking and success rates',
      clientEngagement: 'Client engagement metrics (views, time spent, sections read)',
      aiRecommendations: 'AI-powered recommendations for improvement',
      revenueAttribution: 'Revenue attribution and ROI tracking per proposal',
      industryBenchmarking: 'Industry benchmarking and competitive analysis',
      followUpReminders: 'Follow-up reminders and client communication tracking',

      enterpriseSecurity: 'Enterprise Security',
      enterpriseSecurityDesc: 'Your client data and proposals are encrypted and stored securely. We never share your information.',
      bankLevelSecurity: 'Bank-Level Security Standards',
      aes256Encryption: 'AES-256 encryption for all data at rest and in transit',
      soc2Compliance: 'SOC 2 Type II compliance and regular security audits',
      gdprCompliant: 'GDPR and CCPA compliant data handling practices',
      automatedBackups: 'Automated backups with 99.9% uptime guarantee',
      zeroDataSharing: 'Zero data sharing - your proposals remain private',
      roleBasedAccess: 'Role-based access controls and team permissions',

      professionalTemplates: 'Professional Templates',
      professionalTemplatesDesc: 'Choose from industry-specific templates designed by successful freelancers and agencies.',
      industrySpecificTemplates: 'Industry-Specific Templates',
      fiftyPlusTemplates: '50+ professional templates for every industry',
      designsByAward: 'Designs by award-winning agencies and top freelancers',
      webDevDesign: 'Web Development, Design, Marketing, Consulting themes',
      customizableBranding: 'Customizable branding and color schemes',
      mobileResponsive: 'Mobile-responsive proposal viewing experience',
      regularUpdates: 'Regular template updates based on market trends',
      hoverForDetails: 'Hover for details'
    },
    // Pricing
    pricing: {
      free: 'Free',
      professional: 'Professional', 
      agency: 'Agency',
      forever: 'forever',
      month: 'month',
      mostPopular: 'Most Popular',
      currentPlan: 'Current Plan',
      upgradeText: 'Upgrade to',
      getStartedFree: 'Get Started Free',
      startFreeTrial: 'Start Free Trial',
      contactSales: 'Contact Sales',
      getStarted: 'Get Started',
      simpleTransparent: 'Simple, Transparent Pricing',
      startFreeScale: 'Start free and scale as you grow. No hidden fees, no long-term contracts.',
      planStarter: 'Starter',
      planProfessional: 'Professional',
      planAgency: 'Agency',
      perMonth: 'per month',
      // Features
      proposalsPerMonth: 'proposals per month',
      basicAI: 'Basic AI generation',
      standardTemplates: 'Standard templates',
      emailSupport: 'Email support',
      // Plan features
      basicFeatures: '3 proposals per month, Basic AI templates, Email support',
      professionalFeatures: 'Unlimited proposals, Advanced AI templates, Priority support, Analytics dashboard, Custom branding',
      agencyFeatures: 'Everything in Professional, Team collaboration, API access, Custom integrations, Dedicated account manager',
      basicAITemplates: 'Basic AI templates',
      advancedAITemplates: 'Advanced AI templates',
      analyticsDeclaration: 'Analytics dashboard',
      customBranding: 'Custom branding',
      everythingProfessional: 'Everything in Professional',
      teamCollaboration: 'Team collaboration',
      apiAccess: 'API access',
      customIntegrations: 'Custom integrations',
      dedicatedAccountManager: 'Dedicated account manager',
      customTemplates: 'Custom template creation',
      advancedAnalytics: 'Advanced analytics & insights',
      priorityAI: 'Priority AI processing',
      exportPDF: 'Export to PDF/Word',
      prioritySupport: 'Priority support',
      teamCollaboration: 'Team collaboration tools',
      unlimitedProposals: 'Unlimited proposals',
      emailSupport: 'Email support',
      whiteLabelBranding: 'White-label branding',
      apiAccess: 'API access',
      customIntegrations: 'Custom integrations',
      dedicatedManager: 'Dedicated account manager',
      advancedTeamMgmt: 'Advanced team management',
      allProfessionalFeatures: 'All Professional features'
    },
    // Dashboard
    dashboard: {
      welcome: 'Welcome back',
      yourDashboard: 'Your Dashboard',
      analytics: 'Analytics',
      createNewProposal: 'Create New Proposal',
      recentProposals: 'Recent Proposals',
      viewAll: 'View All',
      noProposals: 'You haven\'t generated any proposals yet.',
      createFirst: 'Create Your First Proposal',
      totalProposals: 'Total Proposals',
      totalValue: 'Total Proposal Value',
      averageValue: 'Average Value',
      winRate: 'Win Rate'
    },
    // Proposal statuses
    status: {
      draft: 'Draft',
      sent: 'Sent', 
      viewed: 'Viewed',
      underReview: 'Under Review',
      accepted: 'Accepted',
      won: 'Won',
      rejected: 'Rejected',
      expired: 'Expired',
      withdrawn: 'Withdrawn',
      revision: 'Revision',
      hasRevisions: 'Has Revisions'
    },
    // Forms & actions
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
      saving: 'Saving...',
      processing: 'Processing...',
      submit: 'Submit',
      continue: 'Continue',
      back: 'Back',
      next: 'Next'
    },
    // Regional
    regional: {
      title: 'Regional Settings',
      subtitle: 'Configure your regional preferences for currency, language, and business practices',
      regionCurrency: 'Region & Currency',
      language: 'Language',
      preview: 'Preview',
      currency: 'Currency',
      date: 'Date',
      numbers: 'Numbers',
      businessStyle: 'Business Style',
      whatAffects: 'What This Affects',
      comingSoon: 'Coming Soon'
    },
    // Testimonials
    testimonials: {
      trustedBy: 'Trusted by Successful Freelancers',
      joinThousands: 'Join thousands of freelancers who\'ve transformed their proposal process',
      verifiedCustomer: 'Verified Customer',
      sarahRole: 'UX Designer',
      sarahQuote: 'PITCHLY increased my proposal acceptance rate from 30% to 85%. The AI understands exactly what clients want to hear.',
      marcusRole: 'Marketing Consultant', 
      marcusQuote: 'I used to spend 6 hours per proposal. Now it takes 5 minutes and they\'re more persuasive than ever.',
      elenaRole: 'Web Developer',
      elenaQuote: 'The proposals generated by PITCHLY consistently outperform my hand-written ones. It\'s like having a copywriting expert on my team.'
    }
  },

  // Spanish
  es: {
    nav: {
      pricing: 'Precios',
      features: 'Características',
      testimonials: 'Testimonios',
      aboutUs: 'Acerca de',
      signIn: 'Iniciar Sesión',
      getStarted: 'Comenzar',
      dashboard: 'Panel',
      proposals: 'Propuestas',
      templates: 'Plantillas',
      analytics: 'Analíticas',
      profile: 'Perfil',
      signOut: 'Cerrar Sesión'
    },
    landing: {
      heroTitle: 'Generación de Propuestas con IA',
      heroSubtitle: 'Crea propuestas ganadoras en minutos con IA. Propuestas profesionales y personalizadas que convierten prospectos en clientes.',
      getStartedFree: 'Comenzar a Crear Propuestas',
      viewPricing: 'Ver Precios',
      trustedBy: 'Confiado por freelancers y agencias en todo el mundo',
      howItWorks: 'Ver Cómo Funciona',
      step1Title: 'Describe Tu Proyecto',
      step1Desc: 'Cuéntanos sobre tu cliente y los requisitos del proyecto',
      step2Title: 'IA Genera la Propuesta',
      step2Desc: 'Nuestra IA crea una propuesta profesional y personalizada',
      step3Title: 'Revisar y Enviar',
      step3Desc: 'Haz los ajustes finales y envía a tu cliente',
      features: 'Características',
      pricing: 'Elige Tu Plan',
      fasterProposalCreation: 'Creación de Propuestas Más Rápida',
      higherWinRate: 'Mayor Tasa de Éxito',
      hoursSavedMonthly: 'Horas Ahorradas Mensualmente',
      tryItNow: 'Pruébalo Ahora - Crea Tu Primera Propuesta',
      everythingYouNeed: 'Todo lo Que Necesitas para',
      winClients: 'Ganar Clientes',
      aiPoweredPlatform: 'Nuestra plataforma potenciada por IA maneja el trabajo pesado para que puedas enfocarte en lo que más importa: tu trabajo.'
    },
    // Features  
    features: {
      proposalAIEngine: 'Motor ProposalAI™',
      proposalAIDesc: 'Nuestro algoritmo de IA patentado, entrenado exclusivamente con propuestas ganadoras, analiza los requisitos del cliente y genera contenido persuasivo específico de la industria que convierte prospectos en clientes.',
      advancedProposalAI: 'Tecnología Avanzada ProposalAI™',
      trainedOn50k: 'Entrenado con más de 50,000 propuestas ganadoras de freelancers exitosos',
      industrySpecific: 'Patrones de lenguaje y terminología específicos de la industria',
      conversionOptimized: 'Estructura optimizada para conversión y técnicas de persuasión',
      realTimeAnalysis: 'Análisis en tiempo real de requisitos del cliente y adaptación',
      continuousLearning: 'Aprendizaje continuo de resultados exitosos de propuestas',
      personalizedTone: 'Concordancia de tono personalizado para diferentes tipos de clientes',
      
      lightningFast: 'Generación Ultra Rápida',
      lightningFastDesc: 'Genera propuestas integrales en menos de 2 minutos. No más gastar horas creando la propuesta perfecta.',
      speedWithoutSacrifice: 'Velocidad Sin Sacrificio',
      averageGeneration: 'Tiempo promedio de generación: 47 segundos para propuestas completas',
      instantBrief: 'Análisis instantáneo de briefing y extracción de requisitos',
      completeProposals: 'Propuestas completas con alcance, cronograma y precios',
      realTimeEditing: 'Capacidades de edición y refinamiento en tiempo real',
      multipleFormats: 'Exportación en múltiples formatos (PDF, Word, HTML)',
      autoSave: 'Guardado automático e historial de versiones para todas las propuestas',

      higherConversion: 'Mayores Tasas de Conversión',
      higherConversionDesc: 'Nuestras propuestas siguen marcos probados que consistentemente convierten prospectos en clientes pagadores.',
      conversionFramework: 'Marco Optimizado para Conversión',
      acceptanceRate: '85% de tasa de aceptación promedio vs 30% estándar de la industria',
      psychologyBased: 'Técnicas de persuasión basadas en psicología incorporadas',
      valueFocused: 'Posicionamiento enfocado en valor que justifica precios premium',
      painPointId: 'Identificación de puntos de dolor y mapeo de soluciones',
      clearProjectScope: 'Alcances de proyecto claros que previenen expansión del proyecto',
      professionalFormatting: 'Formateo profesional que construye credibilidad instantánea',

      smartAnalytics: 'Panel de Analíticas Inteligente',
      smartAnalyticsDesc: 'Rastrea qué propuestas funcionan mejor y optimiza tu enfoque con insights basados en datos.',
      dataDrivenInsights: 'Insights de Éxito Basados en Datos',
      proposalPerformance: 'Seguimiento de rendimiento de propuestas y tasas de éxito',
      clientEngagement: 'Métricas de participación del cliente (vistas, tiempo gastado, secciones leídas)',
      aiRecommendations: 'Recomendaciones potenciadas por IA para mejora',
      revenueAttribution: 'Atribución de ingresos y seguimiento de ROI por propuesta',
      industryBenchmarking: 'Benchmarking de industria y análisis competitivo',
      followUpReminders: 'Recordatorios de seguimiento y seguimiento de comunicación con clientes',

      enterpriseSecurity: 'Seguridad Empresarial',
      enterpriseSecurityDesc: 'Los datos de tus clientes y propuestas están encriptados y almacenados de forma segura. Nunca compartimos tu información.',
      bankLevelSecurity: 'Estándares de Seguridad de Nivel Bancario',
      aes256Encryption: 'Encriptación AES-256 para todos los datos en reposo y en tránsito',
      soc2Compliance: 'Cumplimiento SOC 2 Tipo II y auditorías de seguridad regulares',
      gdprCompliant: 'Prácticas de manejo de datos compatibles con GDPR y CCPA',
      automatedBackups: 'Respaldos automatizados con garantía de 99.9% de tiempo de actividad',
      zeroDataSharing: 'Cero compartición de datos - tus propuestas permanecen privadas',
      roleBasedAccess: 'Controles de acceso basados en roles y permisos de equipo',

      professionalTemplates: 'Plantillas Profesionales',
      professionalTemplatesDesc: 'Elige entre plantillas específicas de la industria diseñadas por freelancers exitosos y agencias.',
      industrySpecificTemplates: 'Plantillas Específicas de la Industria',
      fiftyPlusTemplates: 'Más de 50 plantillas profesionales para cada industria',
      designsByAward: 'Diseños por agencias galardonadas y freelancers destacados',
      webDevDesign: 'Temas de Desarrollo Web, Diseño, Marketing, Consultoría',
      customizableBranding: 'Esquemas de marca y color personalizables',
      mobileResponsive: 'Experiencia de visualización de propuestas adaptada a móviles',
      regularUpdates: 'Actualizaciones regulares de plantillas basadas en tendencias del mercado',
      hoverForDetails: 'Pasar el cursor para detalles'
    },
    pricing: {
      free: 'Gratis',
      professional: 'Profesional',
      agency: 'Agencia',
      forever: 'para siempre',
      month: 'mes',
      mostPopular: 'Más Popular',
      currentPlan: 'Plan Actual',
      upgradeText: 'Actualizar a',
      getStartedFree: 'Comenzar Gratis',
      startFreeTrial: 'Iniciar Prueba Gratis',
      contactSales: 'Contactar Ventas',
      getStarted: 'Comenzar',
      simpleTransparent: 'Precios Simples y Transparentes',
      startFreeScale: 'Comienza gratis y escala conforme creces. Sin tarifas ocultas, sin contratos a largo plazo.',
      planStarter: 'Inicial',
      planProfessional: 'Profesional',
      planAgency: 'Agencia',
      perMonth: 'por mes',
      // Plan features
      basicFeatures: '3 propuestas por mes, Plantillas básicas de IA, Soporte por email',
      professionalFeatures: 'Propuestas ilimitadas, Plantillas avanzadas de IA, Soporte prioritario, Panel de analíticas, Marca personalizada',
      agencyFeatures: 'Todo lo Profesional, Colaboración en equipo, Acceso API, Integraciones personalizadas, Gerente de cuenta dedicado',
      basicAITemplates: 'Plantillas básicas de IA',
      advancedAITemplates: 'Plantillas avanzadas de IA',
      analyticsDeclaration: 'Panel de analíticas',
      customBranding: 'Marca personalizada',
      everythingProfessional: 'Todo lo Profesional',
      teamCollaboration: 'Colaboración en equipo',
      apiAccess: 'Acceso API',
      customIntegrations: 'Integraciones personalizadas',
      dedicatedAccountManager: 'Gerente de cuenta dedicado',
      proposalsPerMonth: 'propuestas por mes',
      basicAI: 'Generación básica de IA',
      standardTemplates: 'Plantillas estándar',
      emailSupport: 'Soporte por email',
      customTemplates: 'Creación de plantillas personalizadas',
      advancedAnalytics: 'Analíticas e insights avanzados',
      priorityAI: 'Procesamiento prioritario de IA',
      exportPDF: 'Exportar a PDF/Word',
      prioritySupport: 'Soporte prioritario',
      teamCollaboration: 'Herramientas de colaboración en equipo',
      unlimitedProposals: 'Propuestas ilimitadas',
      emailSupport: 'Soporte por email',
      whiteLabelBranding: 'Marca blanca',
      apiAccess: 'Acceso a API',
      customIntegrations: 'Integraciones personalizadas',
      dedicatedManager: 'Gerente de cuenta dedicado',
      advancedTeamMgmt: 'Gestión avanzada de equipos',
      allProfessionalFeatures: 'Todas las características Profesionales'
    },
    dashboard: {
      welcome: 'Bienvenido de vuelta',
      yourDashboard: 'Tu Panel',
      analytics: 'Analíticas',
      createNewProposal: 'Crear Nueva Propuesta',
      recentProposals: 'Propuestas Recientes',
      viewAll: 'Ver Todas',
      noProposals: 'Aún no has generado ninguna propuesta.',
      createFirst: 'Crea Tu Primera Propuesta',
      totalProposals: 'Propuestas Totales',
      totalValue: 'Valor Total de Propuestas',
      averageValue: 'Valor Promedio',
      winRate: 'Tasa de Éxito'
    },
    status: {
      draft: 'Borrador',
      sent: 'Enviado',
      viewed: 'Visto',
      underReview: 'En Revisión',
      accepted: 'Aceptado',
      won: 'Ganado',
      rejected: 'Rechazado',
      expired: 'Expirado',
      withdrawn: 'Retirado',
      revision: 'Revisión',
      hasRevisions: 'Tiene Revisiones'
    },
    actions: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      loading: 'Cargando...',
      saving: 'Guardando...',
      processing: 'Procesando...',
      submit: 'Enviar',
      continue: 'Continuar',
      back: 'Atrás',
      next: 'Siguiente'
    },
    regional: {
      title: 'Configuración Regional',
      subtitle: 'Configura tus preferencias regionales para moneda, idioma y prácticas comerciales',
      regionCurrency: 'Región y Moneda',
      language: 'Idioma',
      preview: 'Vista Previa',
      currency: 'Moneda',
      date: 'Fecha',
      numbers: 'Números',
      businessStyle: 'Estilo de Negocio',
      whatAffects: 'Lo Que Esto Afecta',
      comingSoon: 'Próximamente'
    },
    // Testimonials
    testimonials: {
      trustedBy: 'Confiado por Freelancers Exitosos',
      joinThousands: 'Únete a miles de freelancers que han transformado su proceso de propuestas',
      verifiedCustomer: 'Cliente Verificado',
      sarahRole: 'Diseñadora UX',
      sarahQuote: 'PITCHLY aumentó mi tasa de aceptación de propuestas del 30% al 85%. La IA entiende exactamente lo que los clientes quieren escuchar.',
      marcusRole: 'Consultor de Marketing',
      marcusQuote: 'Solía pasar 6 horas por propuesta. Ahora toma 5 minutos y son más persuasivas que nunca.',
      elenaRole: 'Desarrolladora Web',
      elenaQuote: 'Las propuestas generadas por PITCHLY consistentemente superan a las que escribo a mano. Es como tener un experto en copywriting en mi equipo.'
    }
  },

  // French
  fr: {
    nav: {
      pricing: 'Tarifs',
      features: 'Fonctionnalités',
      aboutUs: 'À Propos',
      signIn: 'Se Connecter',
      getStarted: 'Commencer',
      dashboard: 'Tableau de Bord',
      proposals: 'Propositions',
      templates: 'Modèles',
      analytics: 'Analyses',
      profile: 'Profil',
      signOut: 'Se Déconnecter'
    },
    landing: {
      heroTitle: 'Génération de Propositions par IA',
      heroSubtitle: 'Créez des propositions gagnantes en minutes avec l\'IA. Des propositions professionnelles et personnalisées qui convertissent les prospects en clients.',
      getStartedFree: 'Commencer Gratuitement',
      viewPricing: 'Voir les Tarifs',
      trustedBy: 'Approuvé par les freelancers et agences du monde entier',
      howItWorks: 'Comment Ça Marche',
      step1Title: 'Décrivez Votre Projet',
      step1Desc: 'Parlez-nous de votre client et des exigences du projet',
      step2Title: 'L\'IA Génère la Proposition',
      step2Desc: 'Notre IA crée une proposition professionnelle et personnalisée',
      step3Title: 'Réviser et Envoyer',
      step3Desc: 'Effectuez les modifications finales et envoyez à votre client',
      features: 'Fonctionnalités',
      pricing: 'Choisissez Votre Plan'
    },
    // Add more French translations...
  },

  // German  
  de: {
    nav: {
      pricing: 'Preise',
      features: 'Funktionen',
      aboutUs: 'Über Uns',
      signIn: 'Anmelden',
      getStarted: 'Loslegen',
      dashboard: 'Dashboard',
      proposals: 'Angebote',
      templates: 'Vorlagen',
      analytics: 'Analysen',
      profile: 'Profil',
      signOut: 'Abmelden'
    },
    landing: {
      heroTitle: 'KI-Gestützte Angebotserstellung',
      heroSubtitle: 'Erstellen Sie in Minuten gewinnende Angebote mit KI. Professionelle, personalisierte Angebote, die Interessenten zu Kunden machen.',
      getStartedFree: 'Kostenlos Beginnen',
      viewPricing: 'Preise Ansehen',
      trustedBy: 'Vertraut von Freelancern und Agenturen weltweit',
      howItWorks: 'So Funktioniert Es',
      step1Title: 'Beschreiben Sie Ihr Projekt',
      step1Desc: 'Erzählen Sie uns über Ihren Kunden und die Projektanforderungen',
      step2Title: 'KI Erstellt das Angebot',
      step2Desc: 'Unsere KI erstellt ein professionelles, maßgeschneidertes Angebot',
      step3Title: 'Überprüfen und Senden',
      step3Desc: 'Nehmen Sie finale Änderungen vor und senden Sie es an Ihren Kunden',
      features: 'Funktionen',
      pricing: 'Wählen Sie Ihren Plan'
    }
  },

  // Brazilian Portuguese
  pt: {
    nav: {
      pricing: 'Preços',
      features: 'Recursos',
      testimonials: 'Depoimentos',
      aboutUs: 'Sobre Nós',
      signIn: 'Entrar',
      getStarted: 'Começar',
      dashboard: 'Painel',
      proposals: 'Propostas',
      templates: 'Modelos',
      analytics: 'Análises',
      profile: 'Perfil',
      signOut: 'Sair'
    },
    landing: {
      heroTitle: 'Geração de Propostas com IA',
      heroSubtitle: 'Crie propostas vencedoras em minutos com IA. Propostas profissionais e personalizadas que convertem prospects em clientes.',
      getStartedFree: 'Começar a Criar Propostas',
      viewPricing: 'Ver Preços',
      trustedBy: 'Confiado por freelancers e agências no mundo todo',
      howItWorks: 'Ver Como Funciona',
      step1Title: 'Descreva Seu Projeto',
      step1Desc: 'Nos conte sobre seu cliente e os requisitos do projeto',
      step2Title: 'IA Gera a Proposta',
      step2Desc: 'Nossa IA cria uma proposta profissional e personalizada',
      step3Title: 'Revisar e Enviar',
      step3Desc: 'Faça os ajustes finais e envie para seu cliente',
      features: 'Recursos',
      pricing: 'Escolha Seu Plano',
      fasterProposalCreation: 'Criação de Propostas Mais Rápida',
      higherWinRate: 'Maior Taxa de Sucesso',
      hoursSavedMonthly: 'Horas Economizadas Mensalmente',
      tryItNow: 'Experimente Agora - Crie Sua Primeira Proposta',
      everythingYouNeed: 'Tudo que Você Precisa para',
      winClients: 'Conquistar Clientes',
      aiPoweredPlatform: 'Nossa plataforma com IA cuida do trabalho pesado para que você possa focar no que mais importa: seu trabalho.'
    },
    // Features  
    features: {
      proposalAIEngine: 'Motor ProposalAI™',
      proposalAIDesc: 'Nosso algoritmo de IA patenteado, treinado exclusivamente em propostas vencedoras, analisa requisitos do cliente e gera conteúdo persuasivo específico da indústria que converte prospects em clientes.',
      advancedProposalAI: 'Tecnologia Avançada ProposalAI™',
      trainedOn50k: 'Treinado em mais de 50.000 propostas vencedoras de freelancers de sucesso',
      industrySpecific: 'Padrões de linguagem e terminologia específicos da indústria',
      conversionOptimized: 'Estrutura otimizada para conversão e técnicas de persuasão',
      realTimeAnalysis: 'Análise em tempo real de requisitos do cliente e adaptação',
      continuousLearning: 'Aprendizado contínuo a partir de resultados bem-sucedidos de propostas',
      personalizedTone: 'Correspondência de tom personalizada para diferentes tipos de clientes',
      
      lightningFast: 'Geração Ultra Rápida',
      lightningFastDesc: 'Gere propostas abrangentes em menos de 2 minutos. Chega de gastar horas criando a proposta perfeita.',
      speedWithoutSacrifice: 'Velocidade Sem Sacrifício',
      averageGeneration: 'Tempo médio de geração: 47 segundos para propostas completas',
      instantBrief: 'Análise instantânea de briefing e extração de requisitos',
      completeProposals: 'Propostas completas com escopo, cronograma e preços',
      realTimeEditing: 'Capacidades de edição e refinamento em tempo real',
      multipleFormats: 'Exportação em múltiplos formatos (PDF, Word, HTML)',
      autoSave: 'Salvamento automático e histórico de versões para todas as propostas',

      higherConversion: 'Maiores Taxas de Conversão',
      higherConversionDesc: 'Nossas propostas seguem estruturas comprovadas que consistentemente convertem prospects em clientes pagadores.',
      conversionFramework: 'Estrutura Otimizada para Conversão',
      acceptanceRate: '85% de taxa de aceitação média vs 30% padrão da indústria',
      psychologyBased: 'Técnicas de persuasão baseadas em psicologia incorporadas',
      valueFocused: 'Posicionamento focado em valor que justifica preços premium',
      painPointId: 'Identificação de pontos de dor e mapeamento de soluções',
      clearProjectScope: 'Escopos de projeto claros que previnem expansão do escopo',
      professionalFormatting: 'Formatação profissional que constrói credibilidade instantânea',

      smartAnalytics: 'Painel de Análises Inteligente',
      smartAnalyticsDesc: 'Acompanhe quais propostas têm melhor desempenho e otimize sua abordagem com insights baseados em dados.',
      dataDrivenInsights: 'Insights de Sucesso Baseados em Dados',
      proposalPerformance: 'Acompanhamento de desempenho de propostas e taxas de sucesso',
      clientEngagement: 'Métricas de engajamento do cliente (visualizações, tempo gasto, seções lidas)',
      aiRecommendations: 'Recomendações alimentadas por IA para melhoria',
      revenueAttribution: 'Atribuição de receita e acompanhamento de ROI por proposta',
      industryBenchmarking: 'Benchmarking da indústria e análise competitiva',
      followUpReminders: 'Lembretes de acompanhamento e rastreamento de comunicação com clientes',

      enterpriseSecurity: 'Segurança Empresarial',
      enterpriseSecurityDesc: 'Os dados dos seus clientes e propostas são criptografados e armazenados com segurança. Nunca compartilhamos suas informações.',
      bankLevelSecurity: 'Padrões de Segurança de Nível Bancário',
      aes256Encryption: 'Criptografia AES-256 para todos os dados em repouso e em trânsito',
      soc2Compliance: 'Conformidade SOC 2 Tipo II e auditorias de segurança regulares',
      gdprCompliant: 'Práticas de tratamento de dados compatíveis com GDPR e CCPA',
      automatedBackups: 'Backups automatizados com garantia de 99.9% de tempo de atividade',
      zeroDataSharing: 'Zero compartilhamento de dados - suas propostas permanecem privadas',
      roleBasedAccess: 'Controles de acesso baseados em função e permissões de equipe',

      professionalTemplates: 'Modelos Profissionais',
      professionalTemplatesDesc: 'Escolha entre modelos específicos da indústria projetados por freelancers bem-sucedidos e agências.',
      industrySpecificTemplates: 'Modelos Específicos da Indústria',
      fiftyPlusTemplates: 'Mais de 50 modelos profissionais para cada indústria',
      designsByAward: 'Designs por agências premiadas e freelancers de destaque',
      webDevDesign: 'Temas de Desenvolvimento Web, Design, Marketing, Consultoria',
      customizableBranding: 'Esquemas de marca e cor personalizáveis',
      mobileResponsive: 'Experiência de visualização de propostas adaptada para mobile',
      regularUpdates: 'Atualizações regulares de modelos baseadas em tendências de mercado',
      hoverForDetails: 'Passe o mouse para detalhes'
    },
    pricing: {
      free: 'Gratuito',
      professional: 'Profissional',
      agency: 'Agência',
      forever: 'para sempre',
      month: 'mês',
      mostPopular: 'Mais Popular',
      currentPlan: 'Plano Atual',
      upgradeText: 'Atualizar para',
      getStartedFree: 'Começar Grátis',
      startFreeTrial: 'Iniciar Teste Grátis',
      contactSales: 'Contatar Vendas',
      getStarted: 'Começar',
      simpleTransparent: 'Preços Simples e Transparentes',
      startFreeScale: 'Comece grátis e escale conforme cresce. Sem taxas ocultas, sem contratos de longo prazo.',
      planStarter: 'Inicial',
      planProfessional: 'Profissional',
      planAgency: 'Agência',
      perMonth: 'por mês',
      // Plan features
      basicFeatures: '3 propostas por mês, Modelos básicos de IA, Suporte por email',
      professionalFeatures: 'Propostas ilimitadas, Modelos avançados de IA, Suporte prioritário, Painel de análises, Marca personalizada',
      agencyFeatures: 'Tudo do Profissional, Colaboração em equipe, Acesso à API, Integrações personalizadas, Gerente de conta dedicado',
      basicAITemplates: 'Modelos básicos de IA',
      advancedAITemplates: 'Modelos avançados de IA',
      analyticsDeclaration: 'Painel de análises',
      customBranding: 'Marca personalizada',
      everythingProfessional: 'Tudo do Profissional',
      teamCollaboration: 'Colaboração em equipe',
      apiAccess: 'Acesso à API',
      customIntegrations: 'Integrações personalizadas',
      dedicatedAccountManager: 'Gerente de conta dedicado',
      proposalsPerMonth: 'propostas por mês',
      basicAI: 'Geração básica de IA',
      standardTemplates: 'Modelos padrão',
      emailSupport: 'Suporte por email',
      customTemplates: 'Criação de modelos personalizados',
      advancedAnalytics: 'Análises e insights avançados',
      priorityAI: 'Processamento prioritário de IA',
      exportPDF: 'Exportar para PDF/Word',
      prioritySupport: 'Suporte prioritário',
      teamCollaboration: 'Ferramentas de colaboração em equipe',
      unlimitedProposals: 'Propostas ilimitadas',
      emailSupport: 'Suporte por email',
      whiteLabelBranding: 'Marca branca',
      apiAccess: 'Acesso à API',
      customIntegrations: 'Integrações personalizadas',
      dedicatedManager: 'Gerente de conta dedicado',
      advancedTeamMgmt: 'Gerenciamento avançado de equipe',
      allProfessionalFeatures: 'Todos os recursos Profissionais'
    },
    dashboard: {
      welcome: 'Bem-vindo de volta',
      yourDashboard: 'Seu Painel',
      analytics: 'Análises',
      createNewProposal: 'Criar Nova Proposta',
      recentProposals: 'Propostas Recentes',
      viewAll: 'Ver Todas',
      noProposals: 'Você ainda não gerou nenhuma proposta.',
      createFirst: 'Crie Sua Primeira Proposta',
      totalProposals: 'Total de Propostas',
      totalValue: 'Valor Total das Propostas',
      averageValue: 'Valor Médio',
      winRate: 'Taxa de Sucesso'
    },
    status: {
      draft: 'Rascunho',
      sent: 'Enviado',
      viewed: 'Visualizado',
      underReview: 'Em Análise',
      accepted: 'Aceito',
      won: 'Ganho',
      rejected: 'Rejeitado',
      expired: 'Expirado',
      withdrawn: 'Retirado',
      revision: 'Revisão',
      hasRevisions: 'Tem Revisões'
    },
    actions: {
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      edit: 'Editar',
      loading: 'Carregando...',
      saving: 'Salvando...',
      processing: 'Processando...',
      submit: 'Enviar',
      continue: 'Continuar',
      back: 'Voltar',
      next: 'Próximo'
    },
    regional: {
      title: 'Configurações Regionais',
      subtitle: 'Configure suas preferências regionais para moeda, idioma e práticas comerciais',
      regionCurrency: 'Região e Moeda',
      language: 'Idioma',
      preview: 'Visualizar',
      currency: 'Moeda',
      date: 'Data',
      numbers: 'Números',
      businessStyle: 'Estilo de Negócio',
      whatAffects: 'O Que Isso Afeta',
      comingSoon: 'Em Breve'
    },
    // Testimonials
    testimonials: {
      trustedBy: 'Confiado por Freelancers de Sucesso',
      joinThousands: 'Junte-se a milhares de freelancers que transformaram seu processo de propostas',
      verifiedCustomer: 'Cliente Verificado',
      sarahRole: 'Designer UX',
      sarahQuote: 'PITCHLY aumentou minha taxa de aceitação de propostas de 30% para 85%. A IA entende exatamente o que os clientes querem ouvir.',
      marcusRole: 'Consultor de Marketing',
      marcusQuote: 'Eu costumava gastar 6 horas por proposta. Agora leva 5 minutos e elas são mais persuasivas do que nunca.',
      elenaRole: 'Desenvolvedora Web',
      elenaQuote: 'As propostas geradas pelo PITCHLY consistentemente superam as que escrevo manualmente. É como ter um especialista em copywriting na minha equipe.'
    }
  }
};

// Translation hook
export const useTranslation = (language = 'en') => {
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    // Fallback to English if translation not found
    if (!value && language !== 'en') {
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (!value) break;
      }
    }
    
    return value || key;
  };

  return { t };
};

// Translation context
export const I18nContext = createContext({
  language: 'en',
  t: (key) => key
});

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};