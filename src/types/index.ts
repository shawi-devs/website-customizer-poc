/**
 * Core configuration types for the site builder
 */

export interface Branch {
  id: string;
  name: string;
  subdomain: string; // validated: lowercase alphanumeric + hyphens
  config: SiteConfig;
  publishedConfig: SiteConfig | null; // snapshot at last publish
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface BranchStore {
  branches: Branch[];
  activeBranchId: string | null;
}

export type ButtonShape = 'pill' | 'rounded' | 'square';
export type Language = 'en' | 'es' | 'fr' | 'pt';

export interface PageContent {
  title: string;
  content: string; // HTML for rich text
  source: 'upload' | 'typed'; // Where the content came from
  fileUrl?: string; // If uploaded PDF
}

export interface SiteConfig {
  // Branding
  branding: {
    companyName: string;
    logo: {
      url: string;
      alt: string;
    };
    accentColor: string;
    secondaryColor: string;
    highlightColor: string;
    buttonShape: ButtonShape;
    headingFont: string;
    bodyFont: string;
    heroImage: {
      url: string;
      alt: string;
    };
    sectionsImages: {
      [key: string]: {
        url: string;
        alt: string;
      };
    };
  };

  // Content
  content: {
    headline: string;
    heroCity: string;
    subheadline: string;
    bodyText: string;
    ctaButtonLabel: string;
    ctaLink: string;
    footerTagline: string;
    testimonials: Array<{
      name: string;
      location: string;
      rating: number;
      text: string;
    }>;
    faqCtaLink: string;
    faqItems: Array<{ question: string; answer: string }>;
    branchImageUrl: string;
    branchMapLink: string;
  };

  // Pages
  pages: {
    privacyPolicy: PageContent;
    termsConditions: PageContent;
  };

  // Settings
  settings: {
    languages: Language[];
    primaryLanguage: Language;
  };

  // Social media
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    twitter: string;
  };

  // Publishing
  publishing: {
    isPublished: boolean;
    customSubdomain: string; // slug format, e.g., "mycompany"
    customDomain?: string;
  };
}

/**
 * Default config for a new site
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  branding: {
    companyName: 'My Company',
    logo: {
      url: 'https://picsum.photos/200/50?random=1',
      alt: 'Company Logo',
    },
    accentColor: '#201a1c',
    secondaryColor: '#90f7bf',
    highlightColor: '#f28bb6',
    buttonShape: 'rounded',
    headingFont: 'Bricolage Grotesque',
    bodyFont: 'Inter',
    heroImage: {
      url: 'https://picsum.photos/1200/400?random=2',
      alt: 'Hero Image',
    },
    sectionsImages: {},
  },
  content: {
    headline: 'Welcome to Your Website',
    heroCity: 'CDMX',
    subheadline: 'Build and customize your online presence',
    bodyText: 'Create a professional website in minutes with our visual editor.',
    ctaButtonLabel: 'Get Started',
    ctaLink: '#',
    footerTagline: 'Built with Shawi Site Builder',
    testimonials: [
      { name: 'María G.',    location: 'Ciudad de México', rating: 5, text: 'Excelente servicio, muy puntual y mis prendas quedaron impecables. Definitivamente lo seguiré usando.' },
      { name: 'Carlos R.',   location: 'Polanco',          rating: 5, text: 'Rápido y confiable. Mi camisa de lino quedó perfecta, mejor que en cualquier tintorería que haya probado.' },
      { name: 'Ana P.',      location: 'Santa Fe',         rating: 5, text: 'Recogieron mi ropa en menos de 45 minutos y la entregaron al día siguiente impecable. Muy recomendado.' },
      { name: 'Jorge M.',    location: 'Condesa',          rating: 5, text: 'Increíble servicio. En 24 horas tengo mi ropa lista y perfectamente doblada. Nunca más lavo en casa.' },
      { name: 'Sofía L.',    location: 'Lomas de Chapultepec', rating: 5, text: 'El mejor servicio de lavandería que he usado. Trato cuidadoso con la ropa delicada y precios justos.' },
      { name: 'Roberto H.',  location: 'Nápoles',          rating: 5, text: 'Puntualidad y calidad en cada visita. Ya lo uso cada semana y nunca me ha fallado.' },
      { name: 'Valeria T.',  location: 'Del Valle',        rating: 5, text: 'Perfecto para quien no tiene tiempo. La app es fácil y el servicio superó mis expectativas.' },
      { name: 'Diego F.',    location: 'Coyoacán',         rating: 5, text: 'Muy recomendado. Ropa limpia en tiempo récord y el equipo siempre amable y profesional.' },
    ],
    branchImageUrl: '',
    branchMapLink: '',
    faqCtaLink: 'https://wa.me/',
    faqItems: [
      { question: '¿Hay un valor mínimo de pedido?',         answer: 'No tenemos un valor mínimo de pedido. Puedes agendar una recolección con la cantidad de ropa que necesites.' },
      { question: '¿Cómo se me cobrará?',                    answer: 'El cobro se realiza al momento de la entrega, ya sea en efectivo o por transferencia. También aceptamos pagos digitales.' },
      { question: '¿Cómo funciona Shawi?',                   answer: 'Agendas la recolección, nosotros recogemos tu ropa, la lavamos en nuestros centros certificados y la entregamos en tu puerta en 24 horas.' },
      { question: '¿Cuál es el tiempo de entrega?',          answer: 'Garantizamos la entrega en 24 horas hábiles. Ofrecemos también servicio express para entregas el mismo día.' },
      { question: '¿Tienen precios especiales para empresas?', answer: 'Sí, contamos con planes corporativos adaptados a las necesidades de tu empresa. Contáctanos para más información.' },
    ],
  },
  pages: {
    privacyPolicy: {
      title: 'Privacy Policy',
      content: '<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>',
      source: 'typed',
    },
    termsConditions: {
      title: 'Terms & Conditions',
      content: '<h1>Terms & Conditions</h1><p>Please read our terms...</p>',
      source: 'typed',
    },
  },
  settings: {
    languages: ['en'],
    primaryLanguage: 'en',
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    twitter: '',
  },
  publishing: {
    isPublished: false,
    customSubdomain: 'mycompany',
  },
};
