// SEO Configuration for PITCHLY
export const defaultSEO = {
  titleTemplate: '%s | PITCHLY',
  defaultTitle: 'PITCHLY - AI-Powered Proposal Generation | Win More Clients',
  description: 'Create winning proposals in minutes with AI. PITCHLY helps freelancers and agencies generate professional, personalized proposals that convert prospects into paying clients.',
  canonical: 'https://usepitchly.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://usepitchly.com',
    site_name: 'PITCHLY',
    title: 'PITCHLY - AI-Powered Proposal Generation',
    description: 'Create winning proposals in minutes with AI. Generate professional, personalized proposals that convert prospects into paying clients.',
    images: [
      {
        url: 'https://usepitchly.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PITCHLY - AI-Powered Proposal Generation',
        type: 'image/jpeg',
      },
      {
        url: 'https://usepitchly.com/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'PITCHLY - AI-Powered Proposal Generation',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    handle: '@usepitchly',
    site: '@usepitchly',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'AI proposals, proposal generator, freelancer tools, business proposals, client proposals, proposal software, proposal templates, AI writing, proposal automation'
    },
    {
      name: 'author',
      content: 'PITCHLY'
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    },
    {
      name: 'googlebot',
      content: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ]
};

// Page-specific SEO configurations
export const pageSEO = {
  about: {
    title: 'About PITCHLY - AI-Powered Proposal Generation',
    description: 'Learn about PITCHLY, the AI-powered platform helping freelancers and agencies create winning proposals. Our mission is to help you win more clients with professional proposals.',
    canonical: 'https://usepitchly.com/about'
  },
  pricing: {
    title: 'Pricing - Choose Your PITCHLY Plan',
    description: 'Flexible pricing plans for every freelancer and agency. Start free, upgrade to Professional for advanced features, or go Agency for unlimited proposals and white-label options.',
    canonical: 'https://usepitchly.com/pricing'
  },
  contact: {
    title: 'Contact PITCHLY - Get Support & Help',
    description: 'Get in touch with the PITCHLY team. We\'re here to help with questions, feedback, and support for your AI-powered proposal generation needs.',
    canonical: 'https://usepitchly.com/contact'
  },
  signin: {
    title: 'Sign In to PITCHLY - Access Your Dashboard',
    description: 'Sign in to your PITCHLY account to create AI-powered proposals, manage your projects, and grow your business with professional proposal generation.',
    canonical: 'https://usepitchly.com/auth/signin'
  },
  privacy: {
    title: 'Privacy Policy - PITCHLY',
    description: 'PITCHLY privacy policy. Learn how we collect, use, and protect your personal information when using our AI-powered proposal generation platform.',
    canonical: 'https://usepitchly.com/privacy'
  },
  terms: {
    title: 'Terms of Service - PITCHLY',
    description: 'PITCHLY terms of service. Read our terms and conditions for using our AI-powered proposal generation platform and services.',
    canonical: 'https://usepitchly.com/terms'
  }
};

// Structured Data Schemas
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PITCHLY',
    url: 'https://usepitchly.com',
    logo: 'https://usepitchly.com/logo.png',
    description: 'AI-powered proposal generation platform for freelancers and agencies',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      email: 'hello@usepitchly.com',
      availableLanguage: ['English', 'Spanish', 'Portuguese']
    },
    sameAs: [
      'https://twitter.com/usepitchly',
      'https://linkedin.com/company/pitchly'
    ]
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PITCHLY',
    url: 'https://usepitchly.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://usepitchly.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },

  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI-Powered Proposal Generation',
    provider: {
      '@type': 'Organization',
      name: 'PITCHLY',
      url: 'https://usepitchly.com'
    },
    description: 'Create professional, personalized proposals in minutes using artificial intelligence',
    serviceType: 'Business Proposal Generation',
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: 'Freelancers, Agencies, Consultants'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PITCHLY Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Plan'
          },
          price: '0',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Plan'
          },
          price: '29',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agency Plan'
          },
          price: '99',
          priceCurrency: 'USD'
        }
      ]
    }
  },

  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PITCHLY',
    operatingSystem: 'Web Browser',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'AI-powered proposal generation platform for creating professional business proposals',
    featureList: [
      'AI-powered proposal generation',
      'Custom templates',
      'Multi-language support',
      'Advanced analytics',
      'Team collaboration',
      'Export to PDF'
    ],
    screenshot: 'https://usepitchly.com/app-screenshot.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '127'
    }
  }
};