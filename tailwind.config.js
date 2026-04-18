/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body:    ['InterVariable', 'Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        site: {
          primary:            'var(--background-secondary)', // main buttons, how-it-works bg
          secondary:          'var(--secondary-90)',          // secondary buttons
          highlight:          'var(--primary)',               // stars, accent links
          'dark-highlight':   'var(--dark-primary)',
          surface:            'var(--surface)',
          'on-surface':       'var(--on-surface)',
          'on-surface-muted': 'var(--on-surface-variant)',
          'surface-variant':  'var(--surface-variant)',
          'outline-variant':  'var(--outline-variant)',
          'bg-input':         'var(--background-primary)',
          'secondary-dark':   'var(--secondary-20)',
          'secondary-91':     'var(--secondary-91)',
        },
      },
      letterSpacing: {
        'display':    '-0.1875rem',  // -3px  headings
        'display-md': '-0.125rem',   // -2px
        'display-sm': '-0.09375rem', // -1.5px
        'title':      '-0.03125rem', // -0.5px
      },
    },
  },
  plugins: [],
}
