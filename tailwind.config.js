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
// One hue family end to end. The old ramp was warm down to 700 and then
// flipped to blue at 800/900/950 (hue ~260 deg), and since those three steps
// are the canvas, every card and every border, the whole page read cool while
// the text read warm. That mismatch is why the warm palette never landed.
//
// 500 is lifted so it passes 4.5:1 as body text on both the canvas and a card.
// 600 and 700 are borders and disabled states only, never text.
const ink = {
  50: '#F7F6F3', 100: '#EDEAE4', 200: '#DAD5CB', 300: '#BDB6A8',
  400: '#A79E8F', 500: '#8B8474', 600: '#625D54', 700: '#4A4740',
  800: '#34312C', 900: '#1F1D19', 950: '#11100D',
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
      // 13px floor. text-xs was 12px and appeared on 214 elements, often at
      // 4.2:1, which is the combination that makes small print unreadable
      // rather than merely small. rem so OS font-size settings are respected.
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.65' }],
      },
    },
  },
  plugins: [],
};
