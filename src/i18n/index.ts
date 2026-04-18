import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  translation: {
    // Navigation
    'nav.branding': 'Branding',
    'nav.content': 'Content',
    'nav.pages': 'Pages',
    'nav.settings': 'Settings',
    'nav.publish': 'Publish',

    // Common
    'common.companyName': 'Company Name',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.upload': 'Upload',
    'common.preview': 'Preview',
    'common.edit': 'Edit',
    'common.reset': 'Reset',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.color': 'Color',
    'common.url': 'URL',

    // Branding section
    'branding.title': 'Branding Settings',
    'branding.logo': 'Logo',
    'branding.logoInfo': 'Upload PNG or SVG',
    'branding.accentColor': 'Primary Color',
    'branding.secondaryColor': 'Secondary Color',
    'branding.highlightColor': 'Highlight Color',
    'branding.buttonShape': 'Button Shape',
    'branding.buttonShapePill': 'Pill',
    'branding.buttonShapeRounded': 'Rounded',
    'branding.buttonShapeSquare': 'Square',
    'branding.heroImage': 'Hero Image',
    'branding.changeImage': 'Change Image',

    // Content section
    'content.title': 'Content Settings',
    'content.headline': 'Headline',
    'content.subheadline': 'Subheadline',
    'content.bodyText': 'Body Text',
    'content.ctaButtonLabel': 'CTA Button Label',
    'content.ctaLink': 'CTA Link',
    'content.footerTagline': 'Footer Tagline',

    // Pages section
    'pages.title': 'Pages Management',
    'pages.privacyPolicy': 'Privacy Policy',
    'pages.termsConditions': 'Terms & Conditions',
    'pages.uploadPDF': 'Upload PDF',
    'pages.typeDirectly': 'Type Directly',
    'pages.uploadFile': 'Upload PDF File',
    'pages.editor': 'Rich Text Editor',

    // Settings section
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.languages': 'Languages',
    'settings.selectLanguages': 'Select available languages',

    // Publish section
    'publish.title': 'Publish Site',
    'publish.subdomain': 'Subdomain',
    'publish.subdomainFormat': '.shawi.app',
    'publish.customDomain': 'Custom Domain',
    'publish.dnsSetup': 'DNS Setup Instructions',
    'publish.dnsInstructions': 'Point your custom domain to us using a CNAME record',
    'publish.publishButton': 'Publish Site',
    'publish.published': 'Published',
    'publish.notPublished': 'Not Published',
    'publish.exportConfig': 'Export Configuration',

    // Template
    'template.hero': 'Hero Section',
    'template.features': 'Features',
    'template.cta': 'Call to Action',
    'template.footer': 'Footer',
  },
};

// Spanish translations
const esTranslations = {
  translation: {
    'nav.branding': 'Marca',
    'nav.content': 'Contenido',
    'nav.pages': 'Páginas',
    'nav.settings': 'Configuración',
    'nav.publish': 'Publicar',

    'common.companyName': 'Nombre de la Empresa',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.upload': 'Subir',
    'common.preview': 'Vista Previa',
    'common.edit': 'Editar',
    'common.reset': 'Reiniciar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.color': 'Color',
    'common.url': 'URL',

    'branding.title': 'Configuración de Marca',
    'branding.logo': 'Logo',
    'branding.logoInfo': 'Subir PNG o SVG',
    'branding.accentColor': 'Color Primario',
    'branding.secondaryColor': 'Color Secundario',
    'branding.highlightColor': 'Color de Realce',
    'branding.buttonShape': 'Forma del Botón',
    'branding.buttonShapePill': 'Píldora',
    'branding.buttonShapeRounded': 'Redondeado',
    'branding.buttonShapeSquare': 'Cuadrado',
    'branding.heroImage': 'Imagen de Héroe',
    'branding.changeImage': 'Cambiar Imagen',

    'content.title': 'Configuración de Contenido',
    'content.headline': 'Título',
    'content.subheadline': 'Subtítulo',
    'content.bodyText': 'Texto del Cuerpo',
    'content.ctaButtonLabel': 'Etiqueta del Botón CTA',
    'content.ctaLink': 'Enlace CTA',
    'content.footerTagline': 'Lema del Pie de Página',

    'pages.title': 'Gestión de Páginas',
    'pages.privacyPolicy': 'Política de Privacidad',
    'pages.termsConditions': 'Términos y Condiciones',
    'pages.uploadPDF': 'Subir PDF',
    'pages.typeDirectly': 'Escribir Directamente',
    'pages.uploadFile': 'Subir Archivo PDF',
    'pages.editor': 'Editor de Texto Enriquecido',

    'settings.title': 'Configuración',
    'settings.language': 'Idioma',
    'settings.languages': 'Idiomas',
    'settings.selectLanguages': 'Seleccionar idiomas disponibles',

    'publish.title': 'Publicar Sitio',
    'publish.subdomain': 'Subdominio',
    'publish.subdomainFormat': '.shawi.app',
    'publish.customDomain': 'Dominio Personalizado',
    'publish.dnsSetup': 'Instrucciones de Configuración DNS',
    'publish.dnsInstructions': 'Apunta tu dominio personalizado a nosotros usando un registro CNAME',
    'publish.publishButton': 'Publicar Sitio',
    'publish.published': 'Publicado',
    'publish.notPublished': 'No Publicado',
    'publish.exportConfig': 'Exportar Configuración',

    'template.hero': 'Sección de Héroe',
    'template.features': 'Características',
    'template.cta': 'Llamada a la Acción',
    'template.footer': 'Pie de Página',
  },
};

// French translations
const frTranslations = {
  translation: {
    'nav.branding': 'Marque',
    'nav.content': 'Contenu',
    'nav.pages': 'Pages',
    'nav.settings': 'Paramètres',
    'nav.publish': 'Publier',

    'common.companyName': 'Nom de l\'Entreprise',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.upload': 'Télécharger',
    'common.preview': 'Aperçu',
    'common.edit': 'Modifier',
    'common.reset': 'Réinitialiser',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    'common.color': 'Couleur',
    'common.url': 'URL',

    'branding.title': 'Paramètres de Marque',
    'branding.logo': 'Logo',
    'branding.logoInfo': 'Télécharger PNG ou SVG',
    'branding.accentColor': 'Couleur Primaire',
    'branding.secondaryColor': 'Couleur Secondaire',
    'branding.highlightColor': 'Couleur de Mise en Valeur',
    'branding.buttonShape': 'Forme du Bouton',
    'branding.buttonShapePill': 'Pilule',
    'branding.buttonShapeRounded': 'Arrondi',
    'branding.buttonShapeSquare': 'Carré',
    'branding.heroImage': 'Image Héroïque',
    'branding.changeImage': 'Changer l\'Image',

    'content.title': 'Paramètres de Contenu',
    'content.headline': 'Titre',
    'content.subheadline': 'Sous-titre',
    'content.bodyText': 'Texte du Corps',
    'content.ctaButtonLabel': 'Étiquette du Bouton CTA',
    'content.ctaLink': 'Lien CTA',
    'content.footerTagline': 'Phrase Accroche du Pied',

    'pages.title': 'Gestion des Pages',
    'pages.privacyPolicy': 'Politique de Confidentialité',
    'pages.termsConditions': 'Conditions Générales',
    'pages.uploadPDF': 'Télécharger PDF',
    'pages.typeDirectly': 'Taper Directement',
    'pages.uploadFile': 'Télécharger Fichier PDF',
    'pages.editor': 'Éditeur de Texte Enrichi',

    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.languages': 'Langues',
    'settings.selectLanguages': 'Sélectionner les langues disponibles',

    'publish.title': 'Publier le Site',
    'publish.subdomain': 'Sous-domaine',
    'publish.subdomainFormat': '.shawi.app',
    'publish.customDomain': 'Domaine Personnalisé',
    'publish.dnsSetup': 'Instructions de Configuration DNS',
    'publish.dnsInstructions': 'Pointez votre domaine personnalisé sur nous en utilisant un enregistrement CNAME',
    'publish.publishButton': 'Publier le Site',
    'publish.published': 'Publié',
    'publish.notPublished': 'Non Publié',
    'publish.exportConfig': 'Exporter la Configuration',

    'template.hero': 'Section Héroïque',
    'template.features': 'Caractéristiques',
    'template.cta': 'Appel à l\'Action',
    'template.footer': 'Pied de Page',
  },
};

// Portuguese translations
const ptTranslations = {
  translation: {
    'nav.branding': 'Marca',
    'nav.content': 'Conteúdo',
    'nav.pages': 'Páginas',
    'nav.settings': 'Configurações',
    'nav.publish': 'Publicar',

    'common.companyName': 'Nome da Empresa',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.upload': 'Enviar',
    'common.preview': 'Visualizar',
    'common.edit': 'Editar',
    'common.reset': 'Redefinir',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.color': 'Cor',
    'common.url': 'URL',

    'branding.title': 'Configurações de Marca',
    'branding.logo': 'Logo',
    'branding.logoInfo': 'Enviar PNG ou SVG',
    'branding.accentColor': 'Cor Primária',
    'branding.secondaryColor': 'Cor Secundária',
    'branding.highlightColor': 'Cor de Destaque',
    'branding.buttonShape': 'Forma do Botão',
    'branding.buttonShapePill': 'Pílula',
    'branding.buttonShapeRounded': 'Arredondado',
    'branding.buttonShapeSquare': 'Quadrado',
    'branding.heroImage': 'Imagem do Herói',
    'branding.changeImage': 'Alterar Imagem',

    'content.title': 'Configurações de Conteúdo',
    'content.headline': 'Título',
    'content.subheadline': 'Subtítulo',
    'content.bodyText': 'Texto do Corpo',
    'content.ctaButtonLabel': 'Rótulo do Botão CTA',
    'content.ctaLink': 'Link CTA',
    'content.footerTagline': 'Tagline do Rodapé',

    'pages.title': 'Gerenciamento de Páginas',
    'pages.privacyPolicy': 'Política de Privacidade',
    'pages.termsConditions': 'Termos e Condições',
    'pages.uploadPDF': 'Enviar PDF',
    'pages.typeDirectly': 'Digitar Diretamente',
    'pages.uploadFile': 'Enviar Arquivo PDF',
    'pages.editor': 'Editor de Texto Rico',

    'settings.title': 'Configurações',
    'settings.language': 'Idioma',
    'settings.languages': 'Idiomas',
    'settings.selectLanguages': 'Selecionar idiomas disponíveis',

    'publish.title': 'Publicar Site',
    'publish.subdomain': 'Subdomínio',
    'publish.subdomainFormat': '.shawi.app',
    'publish.customDomain': 'Domínio Personalizado',
    'publish.dnsSetup': 'Instruções de Configuração DNS',
    'publish.dnsInstructions': 'Aponte seu domínio personalizado para nós usando um registro CNAME',
    'publish.publishButton': 'Publicar Site',
    'publish.published': 'Publicado',
    'publish.notPublished': 'Não Publicado',
    'publish.exportConfig': 'Exportar Configuração',

    'template.hero': 'Seção do Herói',
    'template.features': 'Características',
    'template.cta': 'Chamada à Ação',
    'template.footer': 'Rodapé',
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      es: esTranslations,
      fr: frTranslations,
      pt: ptTranslations,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
