# Shawi Site Builder

A modern, visual website template customization and publishing platform built with React, TypeScript, and Tailwind CSS. Users can customize a website template through an intuitive editor interface and publish it to custom subdomains or custom domains.

## Features

- **Visual Editor** - Live real-time preview of site changes
- **Branding** - Logo upload, accent color picker, button shape selection, hero image management
- **Content Management** - Editable headlines, subheadlines, body text, CTA buttons, and footer taglines
- **Pages Management** - Privacy Policy and Terms & Conditions with PDF upload or rich text editing
- **Multi-language Support** - i18next integration with English, Spanish, French, and Portuguese
- **Settings** - Language configuration and selection
- **Publishing** - Subdomain management, custom domain setup instructions, config export/import
- **Persistent State** - All editor state saved to localStorage automatically
- **Type-Safe** - Full TypeScript support for configuration and state management

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Zustand** - Lightweight state management with localStorage persistence
- **react-hook-form** - Form validation and handling
- **i18next** - Internationalization and multi-language support
- **react-quill** - Rich text editor for content
- **pdfjs-dist** - PDF viewer support

## Project Structure

```
src/
├── components/
│   ├── common/               # Reusable UI components (FormInput, ColorPicker, etc.)
│   ├── sections/             # Editor section components
│   │   ├── BrandingSection.tsx
│   │   ├── ContentSection.tsx
│   │   ├── PagesSection.tsx
│   │   ├── SettingsSection.tsx
│   │   └── PublishSection.tsx
│   └── Editor.tsx            # Main editor layout
├── template/
│   └── SiteTemplate.tsx      # Your website template component
├── store/
│   └── useSiteConfigStore.ts # Zustand store for state management
├── types/
│   └── index.ts              # TypeScript types and SiteConfig definition
├── i18n/
│   └── index.ts              # i18next configuration and translations
├── App.tsx                   # Main app with routing
├── main.tsx                  # Entry point
└── index.css                 # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js v18+ (v20+ recommended for full compatibility)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## How It Works

### SiteConfig Type

All editor state is built around the `SiteConfig` type:

```typescript
interface SiteConfig {
  branding: {
    companyName: string;
    logo: { url: string; alt: string };
    accentColor: string;
    buttonShape: 'pill' | 'rounded' | 'square';
    heroImage: { url: string; alt: string };
    sectionsImages: { [key: string]: { url: string; alt: string } };
  };
  content: {
    headline: string;
    subheadline: string;
    bodyText: string;
    ctaButtonLabel: string;
    ctaLink: string;
    footerTagline: string;
  };
  pages: {
    privacyPolicy: PageContent;
    termsConditions: PageContent;
  };
  settings: {
    languages: Language[];
    primaryLanguage: Language;
  };
  publishing: {
    isPublished: boolean;
    customSubdomain: string;
    customDomain?: string;
  };
}
```

### State Management

The app uses **Zustand** for state management (`useSiteConfigStore`):

```typescript
// In any component:
import { useSiteConfigStore } from './store/useSiteConfigStore';

const { config, updateConfig, updateBranding, exportConfig, importConfig } = useSiteConfigStore();
```

The store automatically persists to localStorage under the key `shawi-site-config`.

### Editor Sections

#### Branding
- Upload company logo (PNG/SVG)
- Pick accent color with color picker
- Select button shape (pill, rounded, or square)
- Upload hero and section images

#### Content
- Edit headline and subheadline
- Write body copy
- Set CTA button label and link
- Customize footer tagline

#### Pages
- Toggle between PDF upload or rich text for Privacy Policy and Terms & Conditions
- Rich text editor powered by react-quill
- Auto-generates `/privacy` and `/terms` routes

#### Settings
- Select primary language for UI
- Choose which languages are available on published site

#### Publish
- Auto-generate subdomain from company name (slugified)
- Set custom domain with DNS setup instructions
- Export config as JSON for backup
- Import config from JSON file

## Customizing the Template

The website template lives in `src/template/SiteTemplate.tsx` as a self-contained React component.

### To replace with your own template:

1. Create or modify `src/template/SiteTemplate.tsx`:
   ```typescript
   interface SiteTemplateProps {
     config: SiteConfig;
   }

   const SiteTemplate: React.FC<SiteTemplateProps> = ({ config }) => {
     // Your custom template HTML/JSX here
     return (
       <div>
         {/* Use config data to render your template */}
         <h1>{config.content.headline}</h1>
         {/* ... */}
       </div>
     );
   };

   export default SiteTemplate;
   ```

2. The template receives the full `SiteConfig` object as props, so you can access:
   - `config.branding.*` - All branding settings
   - `config.content.*` - All editable content
   - `config.pages.*` - Privacy policy and terms
   - `config.settings.*` - Language settings
   - `config.publishing.*` - Publishing info

3. Test in real-time - the live preview updates as users edit

### Example: Accessing Config in Template

```typescript
const SiteTemplate: React.FC<SiteTemplateProps> = ({ config }) => (
  <div>
    <header>
      <img 
        src={config.branding.logo.url} 
        alt={config.branding.logo.alt}
      />
      <p>{config.branding.companyName}</p>
    </header>
    
    <section 
      style={{ backgroundColor: config.branding.accentColor }}
    >
      <h1>{config.content.headline}</h1>
      <p>{config.content.subheadline}</p>
      
      <button 
        style={{
          borderRadius: config.branding.buttonShape === 'pill' 
            ? '999px' 
            : config.branding.buttonShape === 'rounded'
            ? '8px'
            : '0px'
        }}
      >
        {config.content.ctaButtonLabel}
      </button>
    </section>
  </div>
);
```

## Multi-Language Support

All UI strings are fully translatable via i18next. Translations are in `src/i18n/index.ts` with keys like `nav.branding`, `content.headline`, etc.

To add a new language:

1. Add translation object to `src/i18n/index.ts`:
   ```typescript
   const deTranslations = {
     translation: {
       'nav.branding': 'Markenführung',
       'content.headline': 'Schlagzeile',
       // ... all keys
     },
   };
   ```

2. Register in i18next:
   ```typescript
   resources: {
     en: enTranslations,
     es: esTranslations,
     de: deTranslations, // new
     // ...
   },
   ```

3. Add to language selector in SettingsSection.tsx

## Deployment

### Client-Side Only (Recommended for Now)

Since everything runs client-side:

1. **Build:** `npm run build`
2. **Output:** Files go to `dist/` directory
3. **Deploy to:** Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.

Example with Vercel:
```bash
npm install -g vercel
vercel deploy
```

### Future: Backend Integration

When you're ready to add persistence and multi-user support:

1. Create API endpoints for saving/loading configs
2. Modify Zustand store to sync with backend
3. Add authentication
4. Implement actual domain publishing

## Config Export/Import

Users can download their site config as JSON and re-import it later:

```javascript
// Export config as JSON file
const config = useSiteConfigStore().exportConfig();

// Import config from JSON file
const success = useSiteConfigStore().importConfig(jsonString);
```

The exported JSON includes all branding, content, pages, settings, and publishing info.

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Errors
- Clear cache: `rm -rf dist node_modules/.vite`
- Hard rebuild: `rm -rf dist && npm run build`

### localStorage Not Persisting
- Check browser console for errors
- Ensure localStorage isn't disabled
- Check browser privacy settings

### Images Not Loading
- Placeholder images use picsum.photos and unsplash
- Replace URLs in code with your own image sources
- For uploaded images, they're stored as base64 data URLs in localStorage

## Future Enhancements

- [ ] Backend API for persistent storage
- [ ] Multi-user support with authentication
- [ ] Real domain publishing integration
- [ ] Advanced template builder UI
- [ ] Template marketplace/library
- [ ] Analytics dashboard
- [ ] A/B testing support
- [ ] Email integration
- [ ] CMS integration
- [ ] Mobile responsive editor UI

## License

MIT

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
