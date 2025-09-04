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
      aiPoweredPlatform: 'Our AI-powered platform handles the heavy lifting so you can focus on what matters most - your work.',
      goToDashboard: 'Go to Dashboard →',
      currentPlan: 'Current Plan',
      switchToFree: 'Switch to Free',
      upgradeNow: 'Upgrade Now'
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
      viewFullProposal: 'View Full Proposal',
      noProposals: 'You haven\'t generated any proposals yet.',
      createFirst: 'Create Your First Proposal',
      totalProposals: 'Total Proposals',
      totalValue: 'Total Proposal Value',
      averageValue: 'Average Value',
      winRate: 'Win Rate',
      loading: 'Loading...',
      untitledProposal: 'Untitled Proposal',
      client: 'Client',
      // Usage Dashboard
      yourPlanUsage: 'Your Plan & Usage',
      proposalsThisMonth: 'Proposals This Month',
      used: 'used',
      limitReached: 'Limit Reached',
      limitReachedDesc: 'You\'ve used all {limit} proposals this month. Upgrade to continue creating proposals.',
      almostAtLimit: 'Almost at Limit',
      almostAtLimitDesc: 'Only {remaining} proposal{s} remaining this month.',
      getUnlimited: 'Get unlimited proposals and advanced features',
      upgradeToProfessional: 'Upgrade to Professional',
      upgradeToAgency: 'Upgrade to Agency',
      manageBilling: 'Manage Billing',
      manageSubscription: 'Manage your subscription and billing',
      needMorePower: 'Need more power? Upgrade to Agency for unlimited proposals and team features',
      usageResets: 'Usage resets',
      nextBillingPeriod: 'Next billing period',
      billingManagement: 'Billing Management'
    },
    // Analytics
    analytics: {
      proposalAnalytics: 'Proposal Analytics',
      insightsPerformance: 'Insights into your proposal performance and trends',
      totalProposals: 'Total Proposals',
      totalProposalValue: 'Total Proposal Value',
      averageValue: 'Average Value',
      winRate: 'Win Rate',
      proposalStatusBreakdown: 'Proposal Status Breakdown',
      pricingStructureBreakdown: 'Pricing Structure Breakdown',
      projectTimelineDistribution: 'Project Timeline Distribution',
      monthlyProposalTrends: 'Monthly Proposal Trends',
      month: 'Month',
      proposals: 'Proposals',
      totalValue: 'Total Value',
      avgValue: 'Avg Value',
      avg: 'avg',
      avgValue2: 'avg value',
      insightsAndTips: '💡 Insights & Tips',
      mostPopularPricing: '• Your most popular pricing structure: ',
      mostCommonTimeline: '• Most common timeline: ',
      considerRaisingRates: '• Consider raising rates if win rate > 80%',
      trackConversionRates: '• Track conversion rates to optimize pricing',
      createFirstProposal: 'Create your first proposal to start seeing analytics insights!'
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
      hasRevisions: 'Has Revisions',
      // Status descriptions
      draftDesc: 'Still working on this proposal',
      sentDesc: 'Proposal has been sent to client',
      viewedDesc: 'Client has viewed the proposal',
      underReviewDesc: 'Client is considering the proposal',
      acceptedDesc: 'Client accepted the proposal! 🎉',
      wonDesc: 'Contract signed and project started! 🚀',
      rejectedDesc: 'Client declined the proposal',
      expiredDesc: 'Proposal expired without response',
      withdrawnDesc: 'Proposal was withdrawn'
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
    },
    // Final CTA
    cta: {
      readyToWin: 'Ready to',
      winMoreClients: 'Win More Clients?',
      joinThousandsSuccessful: 'Join thousands of successful freelancers using PITCHLY to create winning proposals.',
      startCreatingBetter: 'Start Creating Better Proposals Today',
      noCreditCard: 'No credit card required • 5 free proposals to get started'
    },
    // Profile Page
    profile: {
      pageTitle: 'Profile Settings',
      pageDescription: 'Manage your PITCHLY profile and account settings',
      loadingProfile: 'Loading profile...',
      backToDashboard: '← Back to Dashboard',
      title: 'Profile Settings',
      subtitle: 'Manage your account information and preferences',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      advancedSettings: 'Advanced Settings →',
      
      // Messages
      messages: {
        profileUpdated: 'Profile updated successfully!',
        updateFailed: 'Failed to update profile. Please try again.'
      },

      // Form fields
      fields: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'Your full name',
        emailAddress: 'Email Address',
        emailCannotChange: 'Email cannot be changed',
        emailCannotChangeDesc: 'Email address cannot be changed',
        companyName: 'Company/Business Name',
        companyNamePlaceholder: 'Your company name',
        businessType: 'Business Type',
        selectBusinessType: 'Select your business type'
      },

      // Business types
      businessTypes: {
        freelancer: 'Freelancer',
        smallAgency: 'Small Agency',
        consultant: 'Consultant',
        creativeServices: 'Creative Services',
        marketingAgency: 'Marketing Agency',
        webDevelopment: 'Web Development',
        other: 'Other'
      },

      // Goals
      goals: {
        winMoreClients: 'Win more clients',
        saveTime: 'Save time on proposals',
        increaseValue: 'Increase proposal value',
        improveRates: 'Improve win rates',
        standardize: 'Standardize processes',
        scaleBusiness: 'Scale my business'
      },

      // Sections
      sections: {
        businessInfo: 'Business Information',
        yourGoals: 'Your Goals',
        goalsDescription: 'Select all that apply to help us personalize your experience',
        regionalPreferences: '🌍 Regional Preferences',
        regionalDescription: 'Set your preferred region, language, and currency format',
        billing: 'Billing & Subscription',
        accountActions: 'Account Actions'
      },

      // Actions
      actions: {
        exportData: {
          title: 'Export Data',
          description: 'Download all your proposals and account data',
          button: 'Export'
        },
        deleteAccount: {
          title: 'Delete Account',
          description: 'Permanently delete your account and all data',
          button: 'Delete',
          comingSoon: 'Account deletion coming soon. Contact support for assistance.'
        }
      }
    },
    // Billing Portal
    billing: {
      cancelConfirm: 'Are you sure you want to cancel your subscription?',
      subscriptionCancelled: 'Subscription cancelled successfully',
      cancelFailed: 'Failed to cancel subscription',
      cancelError: 'Error cancelling subscription',
      paymentMethodUpdated: 'Payment method updated successfully!',
      noActiveSubscription: 'No Active Subscription',
      noActiveSubscriptionDesc: "You don't have an active subscription yet.",
      viewPlans: 'View Plans',
      currentPlan: 'Current Plan',
      active: 'Active',
      inactive: 'Inactive',
      plan: 'Plan',
      nextBillingDate: 'Next billing date',
      updatePaymentMethod: 'Update Payment Method',
      cancelSubscription: 'Cancel Subscription',
      paymentMethods: 'Payment Methods',
      expires: 'Expires',
      default: 'Default',
      noPaymentMethods: 'No payment methods on file.',
      billingHistory: 'Billing History',
      invoice: 'Invoice',
      view: 'View →',
      noInvoices: 'No invoices found.'
    },
    // Footer
    footer: {
      description: 'The AI-powered proposal platform trusted by thousands of freelancers and agencies worldwide. Win more clients with professional proposals that convert.',
      product: 'Product',
      features: 'Features',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      dashboard: 'Dashboard',
      company: 'Company',
      aboutUs: 'About Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      copyright: '© 2024 PITCHLY. All rights reserved. | Made with ❤️ for freelancers worldwide.'
    },
    // Checkout Modal
    checkout: {
      upgradeTo: 'Upgrade to'
    },
    // Proposal Creation Form
    proposalForm: {
      createNewProposal: 'Create New Proposal',
      createSubtitle: 'Fill in the details and let AI generate a winning proposal for you',
      hideTemplates: 'Hide Templates',
      useTemplate: 'Use Template',
      clientName: 'Client Name',
      clientEmail: 'Client Email',
      projectTitle: 'Project Title',
      projectDescription: 'Project Description',
      projectBudget: 'Project Budget',
      amount: 'Amount',
      pricingStructure: 'Pricing Structure',
      lumpSum: 'Lump Sum (Total Project)',
      perHour: 'Per Hour',
      perDay: 'Per Day',
      perWeek: 'Per Week',
      perMonth: 'Per Month',
      perDeliverable: 'Per Deliverable',
      perMilestone: 'Per Milestone',
      retainer: 'Monthly Retainer',
      projectTimeline: 'Project Timeline',
      durationBased: 'Duration Based',
      specificDeadline: 'Specific Deadline',
      selectDuration: 'Select project duration',
      oneWeek: '1 week',
      twoWeeks: '2 weeks',
      threeWeeks: '3 weeks',
      oneMonth: '1 month',
      sixWeeks: '6 weeks',
      twoMonths: '2 months',
      threeMonths: '3 months',
      fourMonths: '4 months',
      sixMonths: '6 months',
      twelveMonths: '12 months',
      ongoing: 'Ongoing',
      completionDeadline: 'Project Completion Deadline',
      cancel: 'Cancel',
      generating: 'Generating...',
      generateProposal: 'Generate Proposal with AI',
      aiPoweredGeneration: 'AI-Powered Proposal Generation',
      aiGenerationDesc: 'Our AI will analyze your project details and generate a professional, persuasive proposal tailored to your client\'s needs. Include as much detail as possible for the best results.',
      clientNamePlaceholder: 'Enter client name',
      clientEmailPlaceholder: 'client@example.com',
      projectTitlePlaceholder: 'Website redesign, Mobile app, etc.',
      projectDescPlaceholder: 'Describe the project requirements, goals, and key deliverables...',
      budgetPlaceholder: '5000'
    },
    // Authentication Pages
    auth: {
      signIn: 'Sign In',
      welcomeBack: 'Welcome Back',
      getStartedToday: 'Get Started Today',
      signInSubtitle: 'Sign in to create winning proposals with AI',
      joinThousands: 'Join thousands creating winning proposals with AI',
      emailAddress: 'Email address',
      enterEmail: 'Enter your email',
      continueWithEmail: 'Continue with Email',
      orContinueWith: 'Or continue with',
      continueWithGoogle: 'Continue with Google',
      continueWithApple: 'Continue with Apple',
      noAccount: 'Don\'t have an account?',
      autoSignUp: 'Sign up automatically on first sign-in',
      backToHome: '← Back to home'
    },
    // Proposals List Page
    proposalsList: {
      yourProposals: 'Your Proposals',
      loadingProposals: 'Loading proposals...',
      noProposalsFound: 'No proposals found.',
      untitledProposal: 'Untitled Proposal',
      toClient: 'To',
      fromSender: 'From',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this proposal?',
      deleteFailed: 'Failed to delete'
    },
    // Error Pages
    errors: {
      authError: 'Authentication Error',
      authErrorDesc: 'There was a problem signing you in',
      signInFailed: 'Sign-in Failed',
      errorCode: 'Error Code',
      tryAgain: 'Try Again',
      backToHome: '← Back to home',
      configurationError: 'There is a problem with the server configuration.',
      accessDenied: 'Access was denied.',
      verificationError: 'The verification link was invalid or has expired.',
      defaultError: 'An error occurred during authentication.'
    },
    // Proposal Viewing Page
    proposalView: {
      loadingProposal: 'Loading proposal...',
      proposalNotFound: 'Proposal not found',
      backToDashboard: 'Back to Dashboard',
      client: 'Client',
      created: 'Created',
      project: 'Project',
      budget: 'Budget',
      timeline: 'Timeline',
      createAnotherProposal: '✨ Create Another Proposal',
      requestModifications: '✏️ Request Modifications',
      exportAndShare: 'Export & Share Options',
      copyText: '📋 Copy Text',
      saveAsPDF: '📄 Save as PDF',
      printProposal: '🖨️ Print Proposal',
      proposalCopied: 'Proposal copied to clipboard!',
      pdfGenerationFailed: 'PDF generation failed. Using print dialog instead.'
    },
    // Proposal Templates
    proposalTemplates: {
      title: 'Proposal Templates',
      saveTimeDesc: 'Save time with pre-made templates',
      upgradeDesc: 'Upgrade to Professional to create custom templates',
      saveAsTemplate: '💾 Save as Template',
      advancedTemplates: '⭐ Advanced Templates',
      professional: 'Professional',
      advanced: 'Advanced',
      starterTemplates: 'Starter Templates',
      free: 'Free',
      yourTemplates: 'Your Templates',
      proFeature: 'Pro Feature',
      customTemplates: 'Custom Templates',
      customTemplatesDesc: 'Save your best proposals as templates and reuse them for similar projects.',
      upgradeToPro: '⭐ Upgrade to Professional',
      noCustomTemplates: 'No custom templates yet',
      noCustomTemplatesDesc: 'Generate a proposal first, then save it as a template',
      created: 'Created',
      deleteConfirm: 'Are you sure you want to delete this template?',
      templateName: 'Template Name',
      templateNamePlaceholder: 'e.g., Web Design Template',
      cancel: 'Cancel',
      saveTemplate: 'Save Template',
      // Template names and descriptions
      templates: {
        enterpriseConsulting: {
          name: 'Enterprise Consulting Package',
          description: 'Comprehensive enterprise-level consulting and strategy development'
        },
        saasDevelopment: {
          name: 'SaaS Platform Development',
          description: 'Full-stack SaaS application with advanced features'
        },
        brandTransformation: {
          name: 'Complete Brand Transformation',
          description: 'Full brand overhaul with marketing strategy and implementation'
        },
        ecommercePlatform: {
          name: 'Enterprise E-commerce Platform',
          description: 'Advanced e-commerce solution with custom features'
        },
        dataAnalytics: {
          name: 'Enterprise Data & Analytics',
          description: 'Custom data platform with advanced analytics and reporting'
        },
        webDesign: {
          name: 'Web Design Project',
          description: 'Template for web design and development projects'
        },
        marketing: {
          name: 'Marketing Campaign',
          description: 'Template for marketing and advertising campaigns'
        },
        branding: {
          name: 'Brand Identity Package',
          description: 'Complete brand identity and logo design package'
        },
        appDevelopment: {
          name: 'Mobile App Development',
          description: 'Native or cross-platform mobile application'
        },
        consulting: {
          name: 'Business Consulting',
          description: 'Strategic business consulting and advisory services'
        }
      }
    },
    // Proposal Revision Page
    proposalRevise: {
      reviseTitle: 'Revise',
      requestModifications: 'Request Modifications',
      requestModificationsDesc: 'Describe what changes you\'d like to make to',
      originalProposal: 'Original Proposal',
      whatWouldYouChange: 'What would you like to change?',
      revisionPlaceholder: 'Example: Make it more formal, add a section about our company\'s experience with similar projects, emphasize cost-effectiveness, etc.',
      revisionTip: '💡 Tip: Be specific about what you want changed. The AI will use your original proposal as a base and make the modifications you request.',
      backToProposal: '← Back to Proposal',
      generatingRevision: 'Generating Revision...',
      generateRevision: 'Generate Revision',
      loadingProposal: 'Loading proposal...',
      proposalNotFound: 'Proposal not found',
      failedToLoad: 'Failed to load proposal',
      backToDashboard: 'Back to Dashboard',
      revisionError: '❌ Error generating revision: '
    },
    // Proposal Status Manager
    statusManager: {
      statusLabel: 'Status:',
      updateProposalStatus: 'Update Proposal Status',
      statusUpdated: 'Proposal status updated to',
      statusUpdateFailed: 'Failed to update proposal status. Please try again.',
      unlockMoreStatuses: 'Unlock More Statuses',
      trackMoreStatuses: 'Track "Accepted", "Won", "Rejected" and more with Professional',
      upgradeNow: '⭐ Upgrade Now →'
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
      aiPoweredPlatform: 'Nuestra plataforma potenciada por IA maneja el trabajo pesado para que puedas enfocarte en lo que más importa: tu trabajo.',
      goToDashboard: 'Ir al Panel →',
      currentPlan: 'Plan Actual',
      switchToFree: 'Cambiar a Gratis',
      upgradeNow: 'Actualizar Ahora'
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
      viewFullProposal: 'Ver Propuesta Completa',
      noProposals: 'Aún no has generado ninguna propuesta.',
      createFirst: 'Crea Tu Primera Propuesta',
      totalProposals: 'Propuestas Totales',
      totalValue: 'Valor Total de Propuestas',
      averageValue: 'Valor Promedio',
      winRate: 'Tasa de Éxito',
      loading: 'Cargando...',
      untitledProposal: 'Propuesta Sin Título',
      client: 'Cliente',
      // Usage Dashboard
      yourPlanUsage: 'Tu Plan y Uso',
      proposalsThisMonth: 'Propuestas Este Mes',
      used: 'usadas',
      limitReached: 'Límite Alcanzado',
      limitReachedDesc: 'Has usado todas las {limit} propuestas este mes. Actualiza para continuar creando propuestas.',
      almostAtLimit: 'Casi en el Límite',
      almostAtLimitDesc: 'Solo {remaining} propuesta{s} restante{s} este mes.',
      getUnlimited: 'Obtén propuestas ilimitadas y características avanzadas',
      upgradeToProfessional: 'Actualizar a Profesional',
      upgradeToAgency: 'Actualizar a Agencia',
      manageBilling: 'Gestionar Facturación',
      manageSubscription: 'Gestiona tu suscripción y facturación',
      needMorePower: '¿Necesitas más poder? Actualiza a Agencia para propuestas ilimitadas y características de equipo',
      usageResets: 'El uso se restablece',
      nextBillingPeriod: 'Próximo período de facturación',
      billingManagement: 'Gestión de Facturación'
    },
    // Analytics
    analytics: {
      proposalAnalytics: 'Analíticas de Propuestas',
      insightsPerformance: 'Insights sobre el rendimiento y tendencias de tus propuestas',
      totalProposals: 'Propuestas Totales',
      totalProposalValue: 'Valor Total de Propuestas',
      averageValue: 'Valor Promedio',
      winRate: 'Tasa de Éxito',
      proposalStatusBreakdown: 'Desglose de Estado de Propuestas',
      pricingStructureBreakdown: 'Desglose de Estructura de Precios',
      projectTimelineDistribution: 'Distribución de Cronograma de Proyectos',
      monthlyProposalTrends: 'Tendencias Mensuales de Propuestas',
      month: 'Mes',
      proposals: 'Propuestas',
      totalValue: 'Valor Total',
      avgValue: 'Valor Prom',
      avg: 'prom',
      avgValue2: 'valor prom',
      insightsAndTips: '💡 Insights y Consejos',
      mostPopularPricing: '• Tu estructura de precios más popular: ',
      mostCommonTimeline: '• Cronograma más común: ',
      considerRaisingRates: '• Considera aumentar tarifas si la tasa de éxito > 80%',
      trackConversionRates: '• Rastrea tasas de conversión para optimizar precios',
      createFirstProposal: '¡Crea tu primera propuesta para comenzar a ver insights de analíticas!'
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
      hasRevisions: 'Tiene Revisiones',
      // Status descriptions
      draftDesc: 'Aún trabajando en esta propuesta',
      sentDesc: 'La propuesta ha sido enviada al cliente',
      viewedDesc: 'El cliente ha visto la propuesta',
      underReviewDesc: 'El cliente está considerando la propuesta',
      acceptedDesc: '¡El cliente aceptó la propuesta! 🎉',
      wonDesc: '¡Contrato firmado y proyecto iniciado! 🚀',
      rejectedDesc: 'El cliente rechazó la propuesta',
      expiredDesc: 'La propuesta expiró sin respuesta',
      withdrawnDesc: 'La propuesta fue retirada'
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
    },
    // Final CTA
    cta: {
      readyToWin: '¿Listo para',
      winMoreClients: 'Ganar Más Clientes?',
      joinThousandsSuccessful: 'Únete a miles de freelancers exitosos que usan PITCHLY para crear propuestas ganadoras.',
      startCreatingBetter: 'Comienza a Crear Mejores Propuestas Hoy',
      noCreditCard: 'No se requiere tarjeta de crédito • 5 propuestas gratis para empezar'
    },
    // Profile Page
    profile: {
      pageTitle: 'Configuración del Perfil',
      pageDescription: 'Gestiona tu perfil de PITCHLY y configuración de la cuenta',
      loadingProfile: 'Cargando perfil...',
      backToDashboard: '← Volver al Panel',
      title: 'Configuración del Perfil',
      subtitle: 'Gestiona la información de tu cuenta y preferencias',
      saving: 'Guardando...',
      saveChanges: 'Guardar Cambios',
      advancedSettings: 'Configuración Avanzada →',
      
      // Messages
      messages: {
        profileUpdated: '¡Perfil actualizado exitosamente!',
        updateFailed: 'No se pudo actualizar el perfil. Por favor intenta de nuevo.'
      },

      // Form fields
      fields: {
        fullName: 'Nombre Completo',
        fullNamePlaceholder: 'Tu nombre completo',
        emailAddress: 'Dirección de Email',
        emailCannotChange: 'El email no se puede cambiar',
        emailCannotChangeDesc: 'La dirección de email no se puede cambiar',
        companyName: 'Nombre de la Empresa/Negocio',
        companyNamePlaceholder: 'Nombre de tu empresa',
        businessType: 'Tipo de Negocio',
        selectBusinessType: 'Selecciona tu tipo de negocio'
      },

      // Business types
      businessTypes: {
        freelancer: 'Freelancer',
        smallAgency: 'Agencia Pequeña',
        consultant: 'Consultor',
        creativeServices: 'Servicios Creativos',
        marketingAgency: 'Agencia de Marketing',
        webDevelopment: 'Desarrollo Web',
        other: 'Otro'
      },

      // Goals
      goals: {
        winMoreClients: 'Ganar más clientes',
        saveTime: 'Ahorrar tiempo en propuestas',
        increaseValue: 'Aumentar el valor de propuestas',
        improveRates: 'Mejorar tasas de éxito',
        standardize: 'Estandarizar procesos',
        scaleBusiness: 'Hacer crecer mi negocio'
      },

      // Sections
      sections: {
        businessInfo: 'Información del Negocio',
        yourGoals: 'Tus Objetivos',
        goalsDescription: 'Selecciona todos los que apliquen para ayudarnos a personalizar tu experiencia',
        regionalPreferences: '🌍 Preferencias Regionales',
        regionalDescription: 'Establece tu región, idioma y formato de moneda preferidos',
        billing: 'Facturación y Suscripción',
        accountActions: 'Acciones de la Cuenta'
      },

      // Actions
      actions: {
        exportData: {
          title: 'Exportar Datos',
          description: 'Descarga todas tus propuestas y datos de la cuenta',
          button: 'Exportar'
        },
        deleteAccount: {
          title: 'Eliminar Cuenta',
          description: 'Eliminar permanentemente tu cuenta y todos los datos',
          button: 'Eliminar',
          comingSoon: 'Eliminación de cuenta próximamente. Contacta soporte para asistencia.'
        }
      }
    },
    // Billing Portal
    billing: {
      cancelConfirm: '¿Estás seguro de que quieres cancelar tu suscripción?',
      subscriptionCancelled: 'Suscripción cancelada exitosamente',
      cancelFailed: 'No se pudo cancelar la suscripción',
      cancelError: 'Error al cancelar la suscripción',
      paymentMethodUpdated: '¡Método de pago actualizado exitosamente!',
      noActiveSubscription: 'Sin Suscripción Activa',
      noActiveSubscriptionDesc: 'Aún no tienes una suscripción activa.',
      viewPlans: 'Ver Planes',
      currentPlan: 'Plan Actual',
      active: 'Activa',
      inactive: 'Inactiva',
      plan: 'Plan',
      nextBillingDate: 'Próxima fecha de facturación',
      updatePaymentMethod: 'Actualizar Método de Pago',
      cancelSubscription: 'Cancelar Suscripción',
      paymentMethods: 'Métodos de Pago',
      expires: 'Expira',
      default: 'Predeterminado',
      noPaymentMethods: 'No hay métodos de pago registrados.',
      billingHistory: 'Historial de Facturación',
      invoice: 'Factura',
      view: 'Ver →',
      noInvoices: 'No se encontraron facturas.'
    },
    // Footer
    footer: {
      description: 'La plataforma de propuestas potenciada por IA en la que confían miles de freelancers y agencias en todo el mundo. Gana más clientes con propuestas profesionales que convierten.',
      product: 'Producto',
      features: 'Características',
      pricing: 'Precios',
      testimonials: 'Testimonios',
      dashboard: 'Panel',
      company: 'Empresa',
      aboutUs: 'Acerca de',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      contact: 'Contacto',
      copyright: '© 2024 PITCHLY. Todos los derechos reservados. | Hecho con ❤️ para freelancers en todo el mundo.'
    },
    // Checkout Modal
    checkout: {
      upgradeTo: 'Actualizar a'
    },
    // Proposal Creation Form
    proposalForm: {
      createNewProposal: 'Crear Nueva Propuesta',
      createSubtitle: 'Completa los detalles y deja que la IA genere una propuesta ganadora para ti',
      hideTemplates: 'Ocultar Plantillas',
      useTemplate: 'Usar Plantilla',
      clientName: 'Nombre del Cliente',
      clientEmail: 'Email del Cliente',
      projectTitle: 'Título del Proyecto',
      projectDescription: 'Descripción del Proyecto',
      projectBudget: 'Presupuesto del Proyecto',
      amount: 'Cantidad',
      pricingStructure: 'Estructura de Precios',
      lumpSum: 'Suma Global (Proyecto Total)',
      perHour: 'Por Hora',
      perDay: 'Por Día',
      perWeek: 'Por Semana',
      perMonth: 'Por Mes',
      perDeliverable: 'Por Entregable',
      perMilestone: 'Por Hito',
      retainer: 'Retainer Mensual',
      projectTimeline: 'Cronograma del Proyecto',
      durationBased: 'Basado en Duración',
      specificDeadline: 'Fecha Límite Específica',
      selectDuration: 'Seleccionar duración del proyecto',
      oneWeek: '1 semana',
      twoWeeks: '2 semanas',
      threeWeeks: '3 semanas',
      oneMonth: '1 mes',
      sixWeeks: '6 semanas',
      twoMonths: '2 meses',
      threeMonths: '3 meses',
      fourMonths: '4 meses',
      sixMonths: '6 meses',
      twelveMonths: '12 meses',
      ongoing: 'Continuo',
      completionDeadline: 'Fecha Límite de Finalización del Proyecto',
      cancel: 'Cancelar',
      generating: 'Generando...',
      generateProposal: 'Generar Propuesta con IA',
      aiPoweredGeneration: 'Generación de Propuestas con IA',
      aiGenerationDesc: 'Nuestra IA analizará los detalles de tu proyecto y generará una propuesta profesional y persuasiva adaptada a las necesidades de tu cliente. Incluye tantos detalles como sea posible para obtener los mejores resultados.',
      clientNamePlaceholder: 'Ingresa el nombre del cliente',
      clientEmailPlaceholder: 'cliente@ejemplo.com',
      projectTitlePlaceholder: 'Rediseño de sitio web, App móvil, etc.',
      projectDescPlaceholder: 'Describe los requisitos del proyecto, objetivos y entregables clave...',
      budgetPlaceholder: '5000'
    },
    // Authentication Pages
    auth: {
      signIn: 'Iniciar Sesión',
      welcomeBack: 'Bienvenido de Vuelta',
      getStartedToday: 'Comenzar Hoy',
      signInSubtitle: 'Inicia sesión para crear propuestas ganadoras con IA',
      joinThousands: 'Únete a miles creando propuestas ganadoras con IA',
      emailAddress: 'Dirección de email',
      enterEmail: 'Ingresa tu email',
      continueWithEmail: 'Continuar con Email',
      orContinueWith: 'O continuar con',
      continueWithGoogle: 'Continuar con Google',
      continueWithApple: 'Continuar con Apple',
      noAccount: '¿No tienes una cuenta?',
      autoSignUp: 'Regístrate automáticamente en el primer inicio de sesión',
      backToHome: '← Volver al inicio'
    },
    // Proposals List Page
    proposalsList: {
      yourProposals: 'Tus Propuestas',
      loadingProposals: 'Cargando propuestas...',
      noProposalsFound: 'No se encontraron propuestas.',
      untitledProposal: 'Propuesta Sin Título',
      toClient: 'Para',
      fromSender: 'De',
      view: 'Ver',
      edit: 'Editar',
      delete: 'Eliminar',
      confirmDelete: '¿Estás seguro de que quieres eliminar esta propuesta?',
      deleteFailed: 'Error al eliminar'
    },
    // Error Pages
    errors: {
      authError: 'Error de Autenticación',
      authErrorDesc: 'Hubo un problema al iniciar sesión',
      signInFailed: 'Error al Iniciar Sesión',
      errorCode: 'Código de Error',
      tryAgain: 'Intentar de Nuevo',
      backToHome: '← Volver al inicio',
      configurationError: 'Hay un problema con la configuración del servidor.',
      accessDenied: 'Acceso denegado.',
      verificationError: 'El enlace de verificación era inválido o ha expirado.',
      defaultError: 'Ocurrió un error durante la autenticación.'
    },
    // Proposal Viewing Page
    proposalView: {
      loadingProposal: 'Cargando propuesta...',
      proposalNotFound: 'Propuesta no encontrada',
      backToDashboard: 'Volver al Panel',
      client: 'Cliente',
      created: 'Creado',
      project: 'Proyecto',
      budget: 'Presupuesto',
      timeline: 'Cronograma',
      createAnotherProposal: '✨ Crear Otra Propuesta',
      requestModifications: '✏️ Solicitar Modificaciones',
      exportAndShare: 'Opciones de Exportar y Compartir',
      copyText: '📋 Copiar Texto',
      saveAsPDF: '📄 Guardar como PDF',
      printProposal: '🖨️ Imprimir Propuesta',
      proposalCopied: '¡Propuesta copiada al portapapeles!',
      pdfGenerationFailed: 'Error al generar PDF. Usando diálogo de impresión en su lugar.'
    },
    // Proposal Templates
    proposalTemplates: {
      title: 'Plantillas de Propuestas',
      saveTimeDesc: 'Ahorra tiempo con plantillas prediseñadas',
      upgradeDesc: 'Actualiza a Profesional para crear plantillas personalizadas',
      saveAsTemplate: '💾 Guardar como Plantilla',
      advancedTemplates: '⭐ Plantillas Avanzadas',
      professional: 'Profesional',
      advanced: 'Avanzada',
      starterTemplates: 'Plantillas Básicas',
      free: 'Gratis',
      yourTemplates: 'Tus Plantillas',
      proFeature: 'Función Pro',
      customTemplates: 'Plantillas Personalizadas',
      customTemplatesDesc: 'Guarda tus mejores propuestas como plantillas y reutilízalas para proyectos similares.',
      upgradeToPro: '⭐ Actualizar a Profesional',
      noCustomTemplates: 'Aún no hay plantillas personalizadas',
      noCustomTemplatesDesc: 'Genera una propuesta primero, luego guárdala como plantilla',
      created: 'Creada',
      deleteConfirm: '¿Estás seguro de que quieres eliminar esta plantilla?',
      templateName: 'Nombre de la Plantilla',
      templateNamePlaceholder: 'ej., Plantilla de Diseño Web',
      cancel: 'Cancelar',
      saveTemplate: 'Guardar Plantilla',
      // Template names and descriptions
      templates: {
        enterpriseConsulting: {
          name: 'Paquete de Consultoría Empresarial',
          description: 'Consultoría integral a nivel empresarial y desarrollo estratégico'
        },
        saasDevelopment: {
          name: 'Desarrollo de Plataforma SaaS',
          description: 'Aplicación SaaS completa con características avanzadas'
        },
        brandTransformation: {
          name: 'Transformación de Marca Completa',
          description: 'Renovación completa de marca con estrategia e implementación de marketing'
        },
        ecommercePlatform: {
          name: 'Plataforma de E-commerce Empresarial',
          description: 'Solución avanzada de comercio electrónico con características personalizadas'
        },
        dataAnalytics: {
          name: 'Datos y Análisis Empresariales',
          description: 'Plataforma de datos personalizada con análisis avanzado e informes'
        },
        webDesign: {
          name: 'Proyecto de Diseño Web',
          description: 'Plantilla para proyectos de diseño y desarrollo web'
        },
        marketing: {
          name: 'Campaña de Marketing',
          description: 'Plantilla para campañas de marketing y publicidad'
        },
        branding: {
          name: 'Paquete de Identidad de Marca',
          description: 'Paquete completo de identidad de marca y diseño de logo'
        },
        appDevelopment: {
          name: 'Desarrollo de Aplicación Móvil',
          description: 'Aplicación móvil nativa o multiplataforma'
        },
        consulting: {
          name: 'Consultoría de Negocios',
          description: 'Servicios de consultoría y asesoría estratégica de negocios'
        }
      }
    },
    // Proposal Revision Page
    proposalRevise: {
      reviseTitle: 'Revisar',
      requestModifications: 'Solicitar Modificaciones',
      requestModificationsDesc: 'Describe qué cambios te gustaría hacer a',
      originalProposal: 'Propuesta Original',
      whatWouldYouChange: '¿Qué te gustaría cambiar?',
      revisionPlaceholder: 'Ejemplo: Hacerlo más formal, agregar una sección sobre la experiencia de nuestra empresa con proyectos similares, enfatizar la rentabilidad, etc.',
      revisionTip: '💡 Consejo: Sé específico sobre lo que quieres cambiar. La IA usará tu propuesta original como base y hará las modificaciones que solicites.',
      backToProposal: '← Volver a la Propuesta',
      generatingRevision: 'Generando Revisión...',
      generateRevision: 'Generar Revisión',
      loadingProposal: 'Cargando propuesta...',
      proposalNotFound: 'Propuesta no encontrada',
      failedToLoad: 'Error al cargar propuesta',
      backToDashboard: 'Volver al Panel',
      revisionError: '❌ Error al generar revisión: '
    },
    // Proposal Status Manager
    statusManager: {
      statusLabel: 'Estado:',
      updateProposalStatus: 'Actualizar Estado de Propuesta',
      statusUpdated: 'Estado de propuesta actualizado a',
      statusUpdateFailed: 'Error al actualizar el estado de la propuesta. Inténtalo de nuevo.',
      unlockMoreStatuses: 'Desbloquear Más Estados',
      trackMoreStatuses: 'Rastrea "Aceptado", "Ganado", "Rechazado" y más con Profesional',
      upgradeNow: '⭐ Actualizar Ahora →'
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
      aiPoweredPlatform: 'Nossa plataforma com IA cuida do trabalho pesado para que você possa focar no que mais importa: seu trabalho.',
      goToDashboard: 'Ir ao Painel →',
      currentPlan: 'Plano Atual',
      switchToFree: 'Mudar para Gratuito',
      upgradeNow: 'Atualizar Agora'
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
      viewFullProposal: 'Ver Proposta Completa',
      noProposals: 'Você ainda não gerou nenhuma proposta.',
      createFirst: 'Crie Sua Primeira Proposta',
      totalProposals: 'Total de Propostas',
      totalValue: 'Valor Total das Propostas',
      averageValue: 'Valor Médio',
      winRate: 'Taxa de Sucesso',
      loading: 'Carregando...',
      untitledProposal: 'Proposta Sem Título',
      client: 'Cliente',
      // Usage Dashboard
      yourPlanUsage: 'Seu Plano e Uso',
      proposalsThisMonth: 'Propostas Este Mês',
      used: 'usadas',
      limitReached: 'Limite Atingido',
      limitReachedDesc: 'Você usou todas as {limit} propostas este mês. Atualize para continuar criando propostas.',
      almostAtLimit: 'Quase no Limite',
      almostAtLimitDesc: 'Apenas {remaining} proposta{s} restante{s} este mês.',
      getUnlimited: 'Obtenha propostas ilimitadas e recursos avançados',
      upgradeToProfessional: 'Atualizar para Profissional',
      upgradeToAgency: 'Atualizar para Agência',
      manageBilling: 'Gerenciar Cobrança',
      manageSubscription: 'Gerencie sua assinatura e cobrança',
      needMorePower: 'Precisa de mais poder? Atualize para Agência para propostas ilimitadas e recursos de equipe',
      usageResets: 'O uso é redefinido',
      nextBillingPeriod: 'Próximo período de cobrança',
      billingManagement: 'Gerenciamento de Cobrança'
    },
    // Analytics
    analytics: {
      proposalAnalytics: 'Análises de Propostas',
      insightsPerformance: 'Insights sobre o desempenho e tendências de suas propostas',
      totalProposals: 'Total de Propostas',
      totalProposalValue: 'Valor Total das Propostas',
      averageValue: 'Valor Médio',
      winRate: 'Taxa de Sucesso',
      proposalStatusBreakdown: 'Divisão por Status de Proposta',
      pricingStructureBreakdown: 'Divisão por Estrutura de Preços',
      projectTimelineDistribution: 'Distribuição de Cronograma do Projeto',
      monthlyProposalTrends: 'Tendências Mensais de Propostas',
      month: 'Mês',
      proposals: 'Propostas',
      totalValue: 'Valor Total',
      avgValue: 'Valor Méd',
      avg: 'méd',
      avgValue2: 'valor méd',
      insightsAndTips: '💡 Insights e Dicas',
      mostPopularPricing: '• Sua estrutura de preços mais popular: ',
      mostCommonTimeline: '• Cronograma mais comum: ',
      considerRaisingRates: '• Considere aumentar as taxas se a taxa de sucesso > 80%',
      trackConversionRates: '• Acompanhe as taxas de conversão para otimizar preços',
      createFirstProposal: 'Crie sua primeira proposta para começar a ver insights de análises!'
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
      hasRevisions: 'Tem Revisões',
      // Status descriptions
      draftDesc: 'Ainda trabalhando nesta proposta',
      sentDesc: 'Proposta foi enviada ao cliente',
      viewedDesc: 'Cliente visualizou a proposta',
      underReviewDesc: 'Cliente está considerando a proposta',
      acceptedDesc: 'Cliente aceitou a proposta! 🎉',
      wonDesc: 'Contrato assinado e projeto iniciado! 🚀',
      rejectedDesc: 'Cliente rejeitou a proposta',
      expiredDesc: 'Proposta expirou sem resposta',
      withdrawnDesc: 'Proposta foi retirada'
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
    },
    // Final CTA
    cta: {
      readyToWin: 'Pronto para',
      winMoreClients: 'Conquistar Mais Clientes?',
      joinThousandsSuccessful: 'Junte-se a milhares de freelancers bem-sucedidos que usam PITCHLY para criar propostas vencedoras.',
      startCreatingBetter: 'Comece a Criar Propostas Melhores Hoje',
      noCreditCard: 'Não é necessário cartão de crédito • 5 propostas grátis para começar'
    },
    // Profile Page
    profile: {
      pageTitle: 'Configurações do Perfil',
      pageDescription: 'Gerencie seu perfil PITCHLY e configurações da conta',
      loadingProfile: 'Carregando perfil...',
      backToDashboard: '← Voltar ao Painel',
      title: 'Configurações do Perfil',
      subtitle: 'Gerencie suas informações de conta e preferências',
      saving: 'Salvando...',
      saveChanges: 'Salvar Alterações',
      advancedSettings: 'Configurações Avançadas →',
      
      // Messages
      messages: {
        profileUpdated: 'Perfil atualizado com sucesso!',
        updateFailed: 'Falha ao atualizar perfil. Por favor tente novamente.'
      },

      // Form fields
      fields: {
        fullName: 'Nome Completo',
        fullNamePlaceholder: 'Seu nome completo',
        emailAddress: 'Endereço de Email',
        emailCannotChange: 'Email não pode ser alterado',
        emailCannotChangeDesc: 'Endereço de email não pode ser alterado',
        companyName: 'Nome da Empresa/Negócio',
        companyNamePlaceholder: 'Nome da sua empresa',
        businessType: 'Tipo de Negócio',
        selectBusinessType: 'Selecione seu tipo de negócio'
      },

      // Business types
      businessTypes: {
        freelancer: 'Freelancer',
        smallAgency: 'Agência Pequena',
        consultant: 'Consultor',
        creativeServices: 'Serviços Criativos',
        marketingAgency: 'Agência de Marketing',
        webDevelopment: 'Desenvolvimento Web',
        other: 'Outro'
      },

      // Goals
      goals: {
        winMoreClients: 'Conquistar mais clientes',
        saveTime: 'Economizar tempo em propostas',
        increaseValue: 'Aumentar valor das propostas',
        improveRates: 'Melhorar taxas de sucesso',
        standardize: 'Padronizar processos',
        scaleBusiness: 'Escalar meu negócio'
      },

      // Sections
      sections: {
        businessInfo: 'Informações do Negócio',
        yourGoals: 'Seus Objetivos',
        goalsDescription: 'Selecione todos que se aplicam para nos ajudar a personalizar sua experiência',
        regionalPreferences: '🌍 Preferências Regionais',
        regionalDescription: 'Defina sua região, idioma e formato de moeda preferidos',
        billing: 'Faturamento e Assinatura',
        accountActions: 'Ações da Conta'
      },

      // Actions
      actions: {
        exportData: {
          title: 'Exportar Dados',
          description: 'Baixe todas suas propostas e dados da conta',
          button: 'Exportar'
        },
        deleteAccount: {
          title: 'Excluir Conta',
          description: 'Excluir permanentemente sua conta e todos os dados',
          button: 'Excluir',
          comingSoon: 'Exclusão de conta em breve. Entre em contato com o suporte para assistência.'
        }
      }
    },
    // Billing Portal
    billing: {
      cancelConfirm: 'Tem certeza de que deseja cancelar sua assinatura?',
      subscriptionCancelled: 'Assinatura cancelada com sucesso',
      cancelFailed: 'Falha ao cancelar assinatura',
      cancelError: 'Erro ao cancelar assinatura',
      paymentMethodUpdated: 'Método de pagamento atualizado com sucesso!',
      noActiveSubscription: 'Nenhuma Assinatura Ativa',
      noActiveSubscriptionDesc: 'Você ainda não tem uma assinatura ativa.',
      viewPlans: 'Ver Planos',
      currentPlan: 'Plano Atual',
      active: 'Ativo',
      inactive: 'Inativo',
      plan: 'Plano',
      nextBillingDate: 'Próxima data de cobrança',
      updatePaymentMethod: 'Atualizar Método de Pagamento',
      cancelSubscription: 'Cancelar Assinatura',
      paymentMethods: 'Métodos de Pagamento',
      expires: 'Expira',
      default: 'Padrão',
      noPaymentMethods: 'Nenhum método de pagamento registrado.',
      billingHistory: 'Histórico de Cobrança',
      invoice: 'Fatura',
      view: 'Ver →',
      noInvoices: 'Nenhuma fatura encontrada.'
    },
    // Footer
    footer: {
      description: 'A plataforma de propostas com IA confiada por milhares de freelancers e agências no mundo todo. Conquiste mais clientes com propostas profissionais que convertem.',
      product: 'Produto',
      features: 'Recursos',
      pricing: 'Preços',
      testimonials: 'Depoimentos',
      dashboard: 'Painel',
      company: 'Empresa',
      aboutUs: 'Sobre Nós',
      privacyPolicy: 'Política de Privacidade',
      termsOfService: 'Termos de Serviço',
      contact: 'Contato',
      copyright: '© 2024 PITCHLY. Todos os direitos reservados. | Feito com ❤️ para freelancers no mundo todo.'
    },
    // Checkout Modal
    checkout: {
      upgradeTo: 'Atualizar para'
    },
    // Proposal Creation Form
    proposalForm: {
      createNewProposal: 'Criar Nova Proposta',
      createSubtitle: 'Preencha os detalhes e deixe a IA gerar uma proposta vencedora para você',
      hideTemplates: 'Ocultar Modelos',
      useTemplate: 'Usar Modelo',
      clientName: 'Nome do Cliente',
      clientEmail: 'Email do Cliente',
      projectTitle: 'Título do Projeto',
      projectDescription: 'Descrição do Projeto',
      projectBudget: 'Orçamento do Projeto',
      amount: 'Valor',
      pricingStructure: 'Estrutura de Preços',
      lumpSum: 'Valor Fixo (Projeto Total)',
      perHour: 'Por Hora',
      perDay: 'Por Dia',
      perWeek: 'Por Semana',
      perMonth: 'Por Mês',
      perDeliverable: 'Por Entregável',
      perMilestone: 'Por Marco',
      retainer: 'Retainer Mensal',
      projectTimeline: 'Cronograma do Projeto',
      durationBased: 'Baseado em Duração',
      specificDeadline: 'Prazo Específico',
      selectDuration: 'Selecionar duração do projeto',
      oneWeek: '1 semana',
      twoWeeks: '2 semanas',
      threeWeeks: '3 semanas',
      oneMonth: '1 mês',
      sixWeeks: '6 semanas',
      twoMonths: '2 meses',
      threeMonths: '3 meses',
      fourMonths: '4 meses',
      sixMonths: '6 meses',
      twelveMonths: '12 meses',
      ongoing: 'Contínuo',
      completionDeadline: 'Prazo de Conclusão do Projeto',
      cancel: 'Cancelar',
      generating: 'Gerando...',
      generateProposal: 'Gerar Proposta com IA',
      aiPoweredGeneration: 'Geração de Propostas com IA',
      aiGenerationDesc: 'Nossa IA analisará os detalhes do seu projeto e gerará uma proposta profissional e persuasiva adaptada às necessidades do seu cliente. Inclua o máximo de detalhes possível para obter os melhores resultados.',
      clientNamePlaceholder: 'Digite o nome do cliente',
      clientEmailPlaceholder: 'cliente@exemplo.com',
      projectTitlePlaceholder: 'Redesign de site, App móvel, etc.',
      projectDescPlaceholder: 'Descreva os requisitos do projeto, objetivos e entregas principais...',
      budgetPlaceholder: '5000'
    },
    // Authentication Pages
    auth: {
      signIn: 'Entrar',
      welcomeBack: 'Bem-vindo de Volta',
      getStartedToday: 'Comece Hoje',
      signInSubtitle: 'Entre para criar propostas vencedoras com IA',
      joinThousands: 'Junte-se a milhares criando propostas vencedoras com IA',
      emailAddress: 'Endereço de email',
      enterEmail: 'Digite seu email',
      continueWithEmail: 'Continuar com Email',
      orContinueWith: 'Ou continue com',
      continueWithGoogle: 'Continuar com Google',
      continueWithApple: 'Continuar com Apple',
      noAccount: 'Não tem uma conta?',
      autoSignUp: 'Cadastre-se automaticamente no primeiro login',
      backToHome: '← Voltar ao início'
    },
    // Proposals List Page
    proposalsList: {
      yourProposals: 'Suas Propostas',
      loadingProposals: 'Carregando propostas...',
      noProposalsFound: 'Nenhuma proposta encontrada.',
      untitledProposal: 'Proposta Sem Título',
      toClient: 'Para',
      fromSender: 'De',
      view: 'Ver',
      edit: 'Editar',
      delete: 'Excluir',
      confirmDelete: 'Tem certeza de que deseja excluir esta proposta?',
      deleteFailed: 'Falha ao excluir'
    },
    // Error Pages
    errors: {
      authError: 'Erro de Autenticação',
      authErrorDesc: 'Houve um problema ao fazer login',
      signInFailed: 'Falha no Login',
      errorCode: 'Código de Erro',
      tryAgain: 'Tentar Novamente',
      backToHome: '← Voltar ao início',
      configurationError: 'Há um problema com a configuração do servidor.',
      accessDenied: 'Acesso negado.',
      verificationError: 'O link de verificação era inválido ou expirou.',
      defaultError: 'Ocorreu um erro durante a autenticação.'
    },
    // Proposal Viewing Page
    proposalView: {
      loadingProposal: 'Carregando proposta...',
      proposalNotFound: 'Proposta não encontrada',
      backToDashboard: 'Voltar ao Painel',
      client: 'Cliente',
      created: 'Criado',
      project: 'Projeto',
      budget: 'Orçamento',
      timeline: 'Cronograma',
      createAnotherProposal: '✨ Criar Outra Proposta',
      requestModifications: '✏️ Solicitar Modificações',
      exportAndShare: 'Opções de Exportar e Compartilhar',
      copyText: '📋 Copiar Texto',
      saveAsPDF: '📄 Salvar como PDF',
      printProposal: '🖨️ Imprimir Proposta',
      proposalCopied: 'Proposta copiada para a área de transferência!',
      pdfGenerationFailed: 'Falha na geração do PDF. Usando diálogo de impressão.'
    },
    // Proposal Templates
    proposalTemplates: {
      title: 'Modelos de Propostas',
      saveTimeDesc: 'Economize tempo com modelos pré-feitos',
      upgradeDesc: 'Atualize para Profissional para criar modelos personalizados',
      saveAsTemplate: '💾 Salvar como Modelo',
      advancedTemplates: '⭐ Modelos Avançados',
      professional: 'Profissional',
      advanced: 'Avançado',
      starterTemplates: 'Modelos Básicos',
      free: 'Grátis',
      yourTemplates: 'Seus Modelos',
      proFeature: 'Recurso Pro',
      customTemplates: 'Modelos Personalizados',
      customTemplatesDesc: 'Salve suas melhores propostas como modelos e reutilize-as para projetos similares.',
      upgradeToPro: '⭐ Atualizar para Profissional',
      noCustomTemplates: 'Ainda não há modelos personalizados',
      noCustomTemplatesDesc: 'Gere uma proposta primeiro, depois salve-a como modelo',
      created: 'Criado',
      deleteConfirm: 'Tem certeza de que deseja excluir este modelo?',
      templateName: 'Nome do Modelo',
      templateNamePlaceholder: 'ex., Modelo de Design Web',
      cancel: 'Cancelar',
      saveTemplate: 'Salvar Modelo',
      // Template names and descriptions
      templates: {
        enterpriseConsulting: {
          name: 'Pacote de Consultoria Empresarial',
          description: 'Consultoria abrangente de nível empresarial e desenvolvimento estratégico'
        },
        saasDevelopment: {
          name: 'Desenvolvimento de Plataforma SaaS',
          description: 'Aplicação SaaS completa com recursos avançados'
        },
        brandTransformation: {
          name: 'Transformação Completa da Marca',
          description: 'Renovação completa da marca com estratégia e implementação de marketing'
        },
        ecommercePlatform: {
          name: 'Plataforma de E-commerce Empresarial',
          description: 'Solução avançada de e-commerce com recursos personalizados'
        },
        dataAnalytics: {
          name: 'Dados e Análise Empresarial',
          description: 'Plataforma de dados personalizada com análise avançada e relatórios'
        },
        webDesign: {
          name: 'Projeto de Design Web',
          description: 'Modelo para projetos de design e desenvolvimento web'
        },
        marketing: {
          name: 'Campanha de Marketing',
          description: 'Modelo para campanhas de marketing e publicidade'
        },
        branding: {
          name: 'Pacote de Identidade da Marca',
          description: 'Pacote completo de identidade da marca e design de logo'
        },
        appDevelopment: {
          name: 'Desenvolvimento de Aplicativo Móvel',
          description: 'Aplicativo móvel nativo ou multiplataforma'
        },
        consulting: {
          name: 'Consultoria de Negócios',
          description: 'Serviços de consultoria e assessoria estratégica de negócios'
        }
      }
    },
    // Proposal Revision Page
    proposalRevise: {
      reviseTitle: 'Revisar',
      requestModifications: 'Solicitar Modificações',
      requestModificationsDesc: 'Descreva quais mudanças você gostaria de fazer em',
      originalProposal: 'Proposta Original',
      whatWouldYouChange: 'O que você gostaria de mudar?',
      revisionPlaceholder: 'Exemplo: Tornar mais formal, adicionar uma seção sobre a experiência da nossa empresa com projetos similares, enfatizar custo-benefício, etc.',
      revisionTip: '💡 Dica: Seja específico sobre o que você quer mudar. A IA usará sua proposta original como base e fará as modificações que você solicitar.',
      backToProposal: '← Voltar à Proposta',
      generatingRevision: 'Gerando Revisão...',
      generateRevision: 'Gerar Revisão',
      loadingProposal: 'Carregando proposta...',
      proposalNotFound: 'Proposta não encontrada',
      failedToLoad: 'Falha ao carregar proposta',
      backToDashboard: 'Voltar ao Painel',
      revisionError: '❌ Erro ao gerar revisão: '
    },
    // Proposal Status Manager
    statusManager: {
      statusLabel: 'Status:',
      updateProposalStatus: 'Atualizar Status da Proposta',
      statusUpdated: 'Status da proposta atualizado para',
      statusUpdateFailed: 'Falha ao atualizar o status da proposta. Tente novamente.',
      unlockMoreStatuses: 'Desbloquear Mais Status',
      trackMoreStatuses: 'Acompanhe "Aceito", "Ganho", "Rejeitado" e mais com Profissional',
      upgradeNow: '⭐ Atualizar Agora →'
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