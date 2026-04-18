import { Language } from '../types';

export interface TemplateText {
  nav: {
    howItWorks: string;
    pricing: string;
    about: string;
    business: string;
    cta: string;
  };
  hero: {
    headline: string;
    city: string;
    reviews: string;
    faster: string;
    nextSlot: string;
    later: string;
    laterSlot: string;
    allSchedules: string;
  };
  howItWorks: {
    heading: string;
    linkText: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  pricing: {
    heading: string;
    body: string;
    cta: string;
    service1Name: string;
    service1Price: string;
    service2Name: string;
    service2Price: string;
  };
  whyUs: {
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
  };
  featureBlocks: {
    block1Heading: string;
    block1Feature1: string;
    block1Feature2: string;
    block1Cta: string;
    block2Heading: string;
    block2Feature1: string;
    block2Feature2: string;
    block2Feature3: string;
  };
  branchInfo: {
    heading: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    cta: string;
    ctaSecondary: string;
  };
  faq: {
    heading: string;
    cta: string;
    item1Q: string; item1A: string;
    item2Q: string; item2A: string;
    item3Q: string; item3A: string;
    item4Q: string; item4A: string;
    item5Q: string; item5A: string;
  };
  bottomCta: {
    subheading: string;
    heading: string;
    cta: string;
  };
  testimonials: {
    heading: string;
    subheading: string;
    linkText: string;
  };
  footer: {
    followUs: string;
    explore: string;
    exploreLinks: [string, string, string, string];
    solutions: string;
    solutionLinks: [string, string, string, string];
    about: string;
    contact: string;
    privacy: string;
    terms: string;
  };
}

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
};

export const translations: Record<Language, TemplateText> = {
  es: {
    nav: {
      howItWorks: 'Cómo funciona',
      pricing: 'Precios y servicios',
      about: 'Quiénes somos',
      business: 'Para empresas',
      cta: 'Agendar recolección',
    },
    hero: {
      headline: 'Lavandería con entrega en 24h en',
      city: 'CDMX',
      reviews: 'basado en más de 500 opiniones',
      faster: 'Más rápido',
      nextSlot: 'Próximos 45min',
      later: 'Más tarde',
      laterSlot: '6:00 - 7:30pm',
      allSchedules: 'Ver todos los horarios',
    },
    howItWorks: {
      heading: 'Recupera tu vida. Déjanos la ropa sucia a nosotros.',
      linkText: 'Cómo funciona',
      step1Title: 'Agenda y prepara tus prendas',
      step1Desc: 'Prepara tus prendas en bolsas y agenda la recolección cuando más te convenga.',
      step2Title: 'Lavado cuidadosamente, localmente',
      step2Desc: 'Recogemos tu ropa y la lavamos en nuestra red de lavanderías certificadas.',
      step3Title: 'Entrega rápida, resultados impecables',
      step3Desc: 'Relájate mientras lavamos y entregamos tus prendas en la puerta de tu casa o negocio.',
    },
    pricing: {
      heading: 'Prendas limpias y relucientes a un precio justo.',
      body: 'Recogemos, limpiamos y entregamos tu ropa sucia por menos de lo que gastarías haciéndolo por tu cuenta. Sin complicaciones, solo ropa limpia a un precio justo.',
      cta: 'Precios',
      service1Name: 'Lavandería por peso',
      service1Price: 'Desde $34 el kilo',
      service2Name: 'Tintorería',
      service2Price: 'Desde $80 por prenda',
    },
    whyUs: {
      item1Title: 'Lavado con máximo cuidado',
      item1Desc: 'Nuestros centros de servicio manipulan con cuidado tus prendas, garantizando que estén protegidas con las normas de seguridad más estrictas.',
      item2Title: 'Años de confianza',
      item2Desc: 'Nuestros aliados llevan décadas de experiencia que se traduce en miles de clientes satisfechos y una garantía de fiabilidad y calidad.',
      item3Title: 'Atención de primera, en todo momento',
      item3Desc: 'Cada prenda recibe el tratamiento que necesita, con procesos de lavado diseñados para preservar su calidad.',
    },
    featureBlocks: {
      block1Heading: 'Programa la recolección de tus prendas en cualquier momento y lugar.',
      block1Feature1: 'Agenda una recolección hoy',
      block1Feature2: 'Recíbela de regreso en 24 horas',
      block1Cta: 'Agendar recolección',
      block2Heading: 'Control total de tus pedidos.',
      block2Feature1: 'Actualizaciones instantáneas',
      block2Feature2: 'Seguimiento de conductores en tiempo real',
      block2Feature3: 'Cambia fácilmente la fecha de entrega',
    },
    branchInfo: {
      heading: 'Conoce nuestra sucursal',
      feature1: 'Autoservicio disponible',
      feature2: 'Servicio por encargo',
      feature3: 'Equipos certificados',
      feature4: 'Disponible de lunes a domingo',
      cta: 'Ubicación',
      ctaSecondary: 'Verificar cobertura',
    },
    faq: {
      heading: '¿Tienes alguna duda? Estamos aquí para ayudarte.',
      cta: 'Haz una pregunta',
      item1Q: '¿Hay un valor mínimo de pedido?',
      item1A: 'No tenemos un valor mínimo de pedido. Puedes agendar una recolección con la cantidad de ropa que necesites.',
      item2Q: '¿Cómo se me cobrará?',
      item2A: 'El cobro se realiza al momento de la entrega, ya sea en efectivo o por transferencia. También aceptamos pagos digitales.',
      item3Q: '¿Cómo funciona Shawi?',
      item3A: 'Agendas la recolección, nosotros recogemos tu ropa, la lavamos en nuestros centros certificados y la entregamos en tu puerta en 24 horas.',
      item4Q: '¿Cuál es el tiempo de entrega?',
      item4A: 'Garantizamos la entrega en 24 horas hábiles. Ofrecemos también servicio express para entregas el mismo día.',
      item5Q: '¿Tienen precios especiales para empresas?',
      item5A: 'Sí, contamos con planes corporativos adaptados a las necesidades de tu empresa. Contáctanos para más información.',
    },
    bottomCta: {
      subheading: 'Tu ropa limpia está a unos pasos',
      heading: 'Descuento en tu primer servicio',
      cta: 'Agenda tu recolección',
    },
    testimonials: {
      heading: '+10,000 artículos lavados y entregados cada semana.',
      subheading: 'Miles de clientes confían en nosotros cada semana',
      linkText: 'Explora los comentarios',
    },
    footer: {
      followUs: 'Síguenos en',
      explore: 'Explorar',
      exploreLinks: ['Cómo funciona', 'Precios', 'Verificar cobertura', 'Testimonios'],
      solutions: 'Soluciones',
      solutionLinks: ['Lavandería', 'Tintorería', 'Edredones y blancos', 'Lavado de tenis'],
      about: 'Nosotros',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos y condiciones',
    },
  },

  en: {
    nav: {
      howItWorks: 'How it works',
      pricing: 'Pricing & services',
      about: 'About us',
      business: 'For business',
      cta: 'Schedule pickup',
    },
    hero: {
      headline: 'Laundry with 24h delivery in',
      city: 'CDMX',
      reviews: 'based on 500+ reviews',
      faster: 'Faster',
      nextSlot: 'Next 45min',
      later: 'Later',
      laterSlot: '6:00 - 7:30pm',
      allSchedules: 'See all schedules',
    },
    howItWorks: {
      heading: 'Get your life back. Leave the laundry to us.',
      linkText: 'How it works',
      step1Title: 'Schedule and prepare your clothes',
      step1Desc: 'Prepare your clothes in bags and schedule pickup at your convenience.',
      step2Title: 'Carefully washed, locally',
      step2Desc: 'We pick up your clothes and wash them at our certified laundry network.',
      step3Title: 'Fast delivery, impeccable results',
      step3Desc: 'Relax while we wash and deliver your clothes right to your door.',
    },
    pricing: {
      heading: 'Clean, fresh clothes at a fair price.',
      body: 'We pick up, clean, and deliver your laundry for less than you\'d spend doing it yourself. No hassle, just clean clothes at a fair price.',
      cta: 'Pricing',
      service1Name: 'Laundry by weight',
      service1Price: 'From $34 per kg',
      service2Name: 'Dry cleaning',
      service2Price: 'From $80 per item',
    },
    whyUs: {
      item1Title: 'Washed with the utmost care',
      item1Desc: 'Our service centers handle your garments with care, ensuring they are protected under the strictest safety standards.',
      item2Title: 'Years of trust',
      item2Desc: 'Our partners bring decades of experience, translating into thousands of satisfied customers and a guarantee of reliability and quality.',
      item3Title: 'First-class service, every time',
      item3Desc: 'Each garment receives the treatment it needs, with washing processes designed to preserve its quality.',
    },
    featureBlocks: {
      block1Heading: 'Schedule your laundry pickup anytime, anywhere.',
      block1Feature1: 'Book a pickup today',
      block1Feature2: 'Get it back in 24 hours',
      block1Cta: 'Schedule pickup',
      block2Heading: 'Full control over your orders.',
      block2Feature1: 'Instant updates',
      block2Feature2: 'Real-time driver tracking',
      block2Feature3: 'Easily reschedule your delivery',
    },
    branchInfo: {
      heading: 'Visit our branch',
      feature1: 'Self-service available',
      feature2: 'Drop-off service',
      feature3: 'Certified equipment',
      feature4: 'Open Monday to Sunday',
      cta: 'Get directions',
      ctaSecondary: 'Verify coverage',
    },
    faq: {
      heading: "Have a question? We're here to help.",
      cta: 'Ask a question',
      item1Q: 'Is there a minimum order value?',
      item1A: 'There is no minimum order value. You can schedule a pickup with as much or as little laundry as you need.',
      item2Q: 'How will I be charged?',
      item2A: 'Payment is collected at the time of delivery, by cash or transfer. We also accept digital payments.',
      item3Q: 'How does Shawi work?',
      item3A: 'You schedule a pickup, we collect your laundry, wash it at our certified facilities, and deliver it back to your door within 24 hours.',
      item4Q: 'What is the delivery time?',
      item4A: 'We guarantee delivery within 24 business hours. We also offer express service for same-day delivery.',
      item5Q: 'Do you offer special prices for businesses?',
      item5A: 'Yes, we have corporate plans tailored to your company\'s needs. Contact us for more information.',
    },
    bottomCta: {
      subheading: 'Your clean clothes are just steps away',
      heading: 'Discount on your first service',
      cta: 'Schedule your pickup',
    },
    testimonials: {
      heading: '+10,000 items washed and delivered every week.',
      subheading: 'Thousands of customers trust us every week',
      linkText: 'Explore reviews',
    },
    footer: {
      followUs: 'Follow us',
      explore: 'Explore',
      exploreLinks: ['How it works', 'Pricing', 'Verify Coverage', 'Testimonials'],
      solutions: 'Solutions',
      solutionLinks: ['Laundry', 'Dry cleaning', 'Comforters & linens', 'Sneaker wash'],
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms & Conditions',
    },
  },

  fr: {
    nav: {
      howItWorks: 'Comment ça marche',
      pricing: 'Tarifs et services',
      about: 'Qui sommes-nous',
      business: 'Pour les entreprises',
      cta: 'Planifier la collecte',
    },
    hero: {
      headline: 'Blanchisserie avec livraison en 24h à',
      city: 'CDMX',
      reviews: 'basé sur plus de 500 avis',
      faster: 'Plus rapide',
      nextSlot: '45 prochaines min',
      later: 'Plus tard',
      laterSlot: '18:00 - 19:30',
      allSchedules: 'Voir tous les horaires',
    },
    howItWorks: {
      heading: 'Reprenez votre vie. Laissez-nous votre linge sale.',
      linkText: 'Comment ça marche',
      step1Title: 'Planifiez et préparez vos vêtements',
      step1Desc: 'Préparez vos vêtements en sacs et planifiez la collecte quand vous voulez.',
      step2Title: 'Lavé soigneusement, localement',
      step2Desc: 'Nous collectons vos vêtements et les lavons dans notre réseau certifié.',
      step3Title: 'Livraison rapide, résultats impeccables',
      step3Desc: 'Détendez-vous pendant que nous lavons et livrons vos vêtements à votre porte.',
    },
    pricing: {
      heading: 'Des vêtements propres à un prix juste.',
      body: 'Nous collectons, nettoyons et livrons votre linge pour moins que ce que vous dépenseriez vous-même.',
      cta: 'Tarifs',
      service1Name: 'Blanchisserie au poids',
      service1Price: 'À partir de 34€ le kg',
      service2Name: 'Pressing',
      service2Price: 'À partir de 80€ par pièce',
    },
    whyUs: {
      item1Title: 'Lavé avec le plus grand soin',
      item1Desc: 'Nos centres de service manipulent vos vêtements avec soin, en veillant à ce qu\'ils soient protégés selon les normes de sécurité les plus strictes.',
      item2Title: 'Des années de confiance',
      item2Desc: 'Nos partenaires apportent des décennies d\'expérience, qui se traduisent par des milliers de clients satisfaits et une garantie de fiabilité et de qualité.',
      item3Title: 'Un service de premier ordre, à tout moment',
      item3Desc: 'Chaque vêtement reçoit le traitement dont il a besoin, avec des processus de lavage conçus pour préserver sa qualité.',
    },
    featureBlocks: {
      block1Heading: 'Planifiez la collecte de votre linge à tout moment et n\'importe où.',
      block1Feature1: 'Réservez une collecte aujourd\'hui',
      block1Feature2: 'Récupérez-le en 24 heures',
      block1Cta: 'Planifier la collecte',
      block2Heading: 'Contrôle total de vos commandes.',
      block2Feature1: 'Mises à jour instantanées',
      block2Feature2: 'Suivi du livreur en temps réel',
      block2Feature3: 'Reprogrammez facilement votre livraison',
    },
    branchInfo: {
      heading: 'Visitez notre succursale',
      feature1: 'Libre-service disponible',
      feature2: 'Service à la demande',
      feature3: 'Équipements certifiés',
      feature4: 'Ouvert du lundi au dimanche',
      cta: 'Itinéraire',
      ctaSecondary: 'Vérifier la couverture',
    },
    faq: {
      heading: "Une question ? Nous sommes là pour vous aider.",
      cta: 'Poser une question',
      item1Q: "Y a-t-il une valeur de commande minimale ?",
      item1A: "Il n'y a pas de valeur minimale de commande. Vous pouvez planifier une collecte avec autant de linge que vous le souhaitez.",
      item2Q: "Comment serai-je facturé ?",
      item2A: "Le paiement est effectué au moment de la livraison, en espèces ou par virement. Nous acceptons aussi les paiements numériques.",
      item3Q: "Comment fonctionne Shawi ?",
      item3A: "Vous planifiez une collecte, nous récupérons votre linge, le lavons dans nos installations certifiées et le livrons chez vous en 24 heures.",
      item4Q: "Quel est le délai de livraison ?",
      item4A: "Nous garantissons la livraison en 24 heures ouvrées. Nous proposons également un service express pour une livraison le jour même.",
      item5Q: "Avez-vous des tarifs spéciaux pour les entreprises ?",
      item5A: "Oui, nous avons des plans d'entreprise adaptés aux besoins de votre société. Contactez-nous pour plus d'informations.",
    },
    bottomCta: {
      subheading: 'Votre linge propre est à portée de main',
      heading: 'Réduction sur votre premier service',
      cta: 'Planifiez votre collecte',
    },
    testimonials: {
      heading: '+10 000 articles lavés et livrés chaque semaine.',
      subheading: 'Des milliers de clients nous font confiance chaque semaine',
      linkText: 'Explorer les avis',
    },
    footer: {
      followUs: 'Suivez-nous',
      explore: 'Explorer',
      exploreLinks: ['Comment ça marche', 'Tarifs', 'Vérifier la couverture', 'Témoignages'],
      solutions: 'Solutions',
      solutionLinks: ['Blanchisserie', 'Pressing', 'Couettes et linge de maison', 'Lavage de baskets'],
      about: 'À propos',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions générales',
    },
  },

  pt: {
    nav: {
      howItWorks: 'Como funciona',
      pricing: 'Preços e serviços',
      about: 'Quem somos',
      business: 'Para empresas',
      cta: 'Agendar coleta',
    },
    hero: {
      headline: 'Lavanderia com entrega em 24h em',
      city: 'CDMX',
      reviews: 'baseado em mais de 500 avaliações',
      faster: 'Mais rápido',
      nextSlot: 'Próximos 45min',
      later: 'Mais tarde',
      laterSlot: '18:00 - 19:30',
      allSchedules: 'Ver todos os horários',
    },
    howItWorks: {
      heading: 'Recupere sua vida. Deixe a roupa suja com a gente.',
      linkText: 'Como funciona',
      step1Title: 'Agende e prepare suas roupas',
      step1Desc: 'Prepare suas roupas em sacolas e agende a coleta na hora que for melhor.',
      step2Title: 'Lavado com cuidado, localmente',
      step2Desc: 'Coletamos suas roupas e as lavamos em nossa rede de lavanderias certificadas.',
      step3Title: 'Entrega rápida, resultados impecáveis',
      step3Desc: 'Relaxe enquanto lavamos e entregamos suas roupas na porta de casa.',
    },
    pricing: {
      heading: 'Roupas limpas e brilhantes a um preço justo.',
      body: 'Coletamos, limpamos e entregamos suas roupas sujas por menos do que você gastaria por conta própria.',
      cta: 'Preços',
      service1Name: 'Lavanderia por peso',
      service1Price: 'A partir de R$34 o kg',
      service2Name: 'Lavanderia a seco',
      service2Price: 'A partir de R$80 por peça',
    },
    whyUs: {
      item1Title: 'Lavado com o máximo cuidado',
      item1Desc: 'Nossos centros de serviço manipulam suas peças com cuidado, garantindo que estejam protegidas pelas normas de segurança mais rigorosas.',
      item2Title: 'Anos de confiança',
      item2Desc: 'Nossos parceiros trazem décadas de experiência, resultando em milhares de clientes satisfeitos e uma garantia de confiabilidade e qualidade.',
      item3Title: 'Atendimento de excelência, em todo momento',
      item3Desc: 'Cada peça recebe o tratamento que precisa, com processos de lavagem desenvolvidos para preservar sua qualidade.',
    },
    featureBlocks: {
      block1Heading: 'Agende a coleta das suas roupas a qualquer hora e em qualquer lugar.',
      block1Feature1: 'Agende uma coleta hoje',
      block1Feature2: 'Receba de volta em 24 horas',
      block1Cta: 'Agendar coleta',
      block2Heading: 'Controle total dos seus pedidos.',
      block2Feature1: 'Atualizações instantâneas',
      block2Feature2: 'Rastreamento do entregador em tempo real',
      block2Feature3: 'Reagende facilmente a sua entrega',
    },
    branchInfo: {
      heading: 'Conheça nossa filial',
      feature1: 'Autoatendimento disponível',
      feature2: 'Serviço por encomenda',
      feature3: 'Equipamentos certificados',
      feature4: 'Disponível de segunda a domingo',
      cta: 'Como chegar',
      ctaSecondary: 'Verificar cobertura',
    },
    faq: {
      heading: "Tem alguma dúvida? Estamos aqui para ajudar.",
      cta: 'Fazer uma pergunta',
      item1Q: "Existe um valor mínimo de pedido?",
      item1A: "Não há valor mínimo de pedido. Você pode agendar uma coleta com a quantidade de roupa que precisar.",
      item2Q: "Como serei cobrado?",
      item2A: "O pagamento é feito no momento da entrega, em dinheiro ou transferência. Também aceitamos pagamentos digitais.",
      item3Q: "Como funciona o Shawi?",
      item3A: "Você agenda a coleta, nós buscamos suas roupas, lavamos em nossas instalações certificadas e entregamos na sua porta em 24 horas.",
      item4Q: "Qual é o prazo de entrega?",
      item4A: "Garantimos a entrega em 24 horas úteis. Também oferecemos serviço expresso para entregas no mesmo dia.",
      item5Q: "Vocês têm preços especiais para empresas?",
      item5A: "Sim, temos planos corporativos adaptados às necessidades da sua empresa. Entre em contato para mais informações.",
    },
    bottomCta: {
      subheading: 'Suas roupas limpas estão a poucos passos',
      heading: 'Desconto no seu primeiro serviço',
      cta: 'Agende sua coleta',
    },
    testimonials: {
      heading: '+10.000 itens lavados e entregues toda semana.',
      subheading: 'Milhares de clientes confiam em nós toda semana',
      linkText: 'Explorar avaliações',
    },
    footer: {
      followUs: 'Siga-nos',
      explore: 'Explorar',
      exploreLinks: ['Como funciona', 'Preços', 'Verificar cobertura', 'Depoimentos'],
      solutions: 'Soluções',
      solutionLinks: ['Lavanderia', 'Lavanderia a seco', 'Edredons e roupas de cama', 'Lavagem de tênis'],
      about: 'Sobre nós',
      contact: 'Contato',
      privacy: 'Privacidade',
      terms: 'Termos e condições',
    },
  },
};
