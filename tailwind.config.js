/** @type {import('tailwindcss').Config} */

// Three colour names, each meaning what it says. No aliases, no lies.
//
//   ochre — the single accent. 8.7:1 on the canvas.
//   ink   — the neutral ramp. Warm throughout; the three darkest steps used to
//           flip to blue (hue 267°) which is why the warm palette never landed.
//   sage  — one job only: marking a plugin live on WordPress.org.

const ochre = {
  50: '#FDF7EC', 100: '#F9EBD1', 200: '#F3D7A6', 300: '#EBBE74',
  400: '#E0A542', 500: '#CE8C2A', 600: '#AC6F20', 700: '#87551D',
  800: '#6B441C', 900: '#57391A', 950: '#301D0B',
};

const ink = {
  50: '#F6F5F2', 100: '#EDEAE4', 200: '#DAD5CB', 300: '#BDB6A8', 400: '#999285',
  500: '#837D71',  // 4.65:1 on ink-950, passes AA for body text
  600: '#625D54',  // borders and disabled states only, never text
  700: '#4A4740',  // borders only
  800: '#34312C',
  900: '#1F1D19',
  950: '#11100D',  // canvas
};

const sage = {
  300: '#95B9B0',  // 8.9:1 on the badge ground below
  900: '#192623',  // badge ground
};

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ochre, ink, sage },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 13px floor, in rem so user font settings are respected.
        xs: ['0.8125rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1.0625rem', { lineHeight: '1.65' }], // 17px body on a dark ground
        lg: ['1.1875rem', { lineHeight: '1.55' }],
        xl: ['1.375rem', { lineHeight: '1.4' }],
        '2xl': ['1.75rem', { lineHeight: '1.25' }],
        '3xl': ['2.25rem', { lineHeight: '1.15' }],
        '4xl': ['3rem', { lineHeight: '1.05' }],
      },
      maxWidth: { measure: '68ch' },
      borderRadius: { card: '0.5rem' }, // the one radius
    },
  },
  plugins: [],
};
