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
      pricing: 'Choose Your Plan'
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
      verifiedCustomer: 'Verified Customer'
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
      pricing: 'Elige Tu Plan'
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
      verifiedCustomer: 'Cliente Verificado'
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
      pricing: 'Escolha Seu Plano'
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
      verifiedCustomer: 'Cliente Verificado'
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