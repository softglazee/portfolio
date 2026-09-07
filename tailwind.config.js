/** @type {import('tailwindcss').Config} */

// Warm-ink palette. The markup uses Tailwind's cyan / purple / pink / slate
// scales throughout, so those scales are redefined here rather than rewritten
// across 2,500 lines of JSX. Changing a value here re-skins the whole site.
//
//   cyan   -> ochre, the single primary accent
//   purple -> sage, a quiet secondary
//   pink   -> clay, used sparingly for a third voice
//   slate  -> warm neutral ink, replacing Tailwind's blue-grey
//   yellow / green / orange / rose -> pulled toward the same family so the
//   per-card accent colours stop reading as a rainbow

const ochre = {
  50: '#FDF7EC', 100: '#F9EBD1', 200: '#F3D7A6', 300: '#EBBE74',
  400: '#E0A542', 500: '#CE8C2A', 600: '#AC6F20', 700: '#87551D',
  800: '#6B441C', 900: '#57391A', 950: '#301D0B',
};

const sage = {
  50: '#F1F6F4', 100: '#DDEAE6', 200: '#BDD5CE', 300: '#95B9B0',
  400: '#6E9B92', 500: '#547F77', 600: '#41655F', 700: '#37524E',
  800: '#2F4341', 900: '#2A3937', 950: '#141F1E',
};

const clay = {
  50: '#FBF3F1', 100: '#F7E5E0', 200: '#F0CFC6', 300: '#E4AFA1',
  400: '#D28874', 500: '#BE6A54', 600: '#A8543F', 700: '#8C4434',
  800: '#753C30', 900: '#63362C', 950: '#351A14',
};

// Warm ink. Deliberately not blue-black: it sits better against a photograph
// and it is the fastest way to stop a dark portfolio looking like every other
// dark portfolio.
const ink = {
  50: '#F6F5F2', 100: '#EDEAE4', 200: '#DAD5CB', 300: '#BDB6A8',
  400: '#9A9285', 500: '#7D766A', 600: '#635D54', 700: '#4A4740',
  800: '#2E3138', 900: '#1A1D22', 950: '#0E1013',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: ochre,
        purple: sage,
        pink: clay,
        slate: ink,
        yellow: ochre,
        green: sage,
        orange: clay,
        rose: clay,
        amber: ochre,
        teal: sage,
        blue: sage,
        indigo: sage,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
