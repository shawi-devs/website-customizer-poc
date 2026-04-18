# Shawi Site Builder - Copilot Instructions

## Project Overview

**Shawi Site Builder** is a React + TypeScript web application that allows users to visually customize a website template and publish it to custom subdomains or domains.

## Architecture

### Core Concepts

- **Template-Centric** - The entire app is built around injecting user config into a `SiteTemplate` component
- **State-Driven** - All editor state lives in Zustand store with localStorage persistence
- **Type-Safe** - Full TypeScript coverage with central `SiteConfig` type
- **Multi-Language** - i18next integration for full i18n support

### Key Files

- `src/types/index.ts` - Central `SiteConfig` type definition
- `src/store/useSiteConfigStore.ts` - Zustand store for all state
- `src/template/SiteTemplate.tsx` - Website template component (easily replaceable)
- `src/components/Editor.tsx` - Main editor UI layout
- `src/components/sections/` - Individual editor section components
- `src/i18n/index.ts` - i18next translations (EN, ES, FR, PT)

## Development Guidelines

### Adding Features

1. **New fields** - Update `SiteConfig` type first
2. **New UI** - Create component in `src/components/`
3. **State** - Use Zustand hooks: `useSiteConfigStore()`
4. **Translations** - Add keys to all 4 language objects in `src/i18n/index.ts`

### Modifying the Template

Replace `src/template/SiteTemplate.tsx` with your own custom template. The component receives `config: SiteConfig` and must render:

```typescript
interface SiteTemplateProps {
  config: SiteConfig;
}

const SiteTemplate: React.FC<SiteTemplateProps> = ({ config }) => {
  // Use config properties to render template
  return <div>...</div>;
};
```

### Adding Translations

All UI strings use i18next keys. To add new languages:

1. Add translation object to `src/i18n/index.ts`
2. Register in i18next resources
3. Add to SettingsSection language options

## Code Standards

- Use TypeScript strictly (tsconfig has `strict: false` due to i18next types, but avoid `any`)
- All components are functional React components with hooks
- Use Tailwind CSS for styling
- Component props are always typed
- Use named exports for components

## Common Tasks

### Running Development
```bash
npm run dev              # Start at localhost:5173
npm run build           # Production build
npm run preview         # Test production build
```

### Testing Changes
1. Edit files and watch hot reload
2. Check browser console for errors
3. Test localStorage persistence by refreshing page
4. Test export/import in Publish section

### Debugging State
```javascript
// In browser console:
console.log(useSiteConfigStore.getState().config)
localStorage.getItem('shawi-site-config')
```

## Deployment

App is client-side only and deploys to any static host:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Cloudflare Pages

## Future Considerations

- This is client-side only. When adding backend:
  - Replace localStorage with API calls in Zustand store
  - Add authentication layer
  - Implement real domain publishing
  - Add multi-user support

## Useful Resources

- [SiteConfig Type Definition](src/types/index.ts)
- [Store Documentation](src/store/useSiteConfigStore.ts)
- [README with Full Setup Guide](README.md)
