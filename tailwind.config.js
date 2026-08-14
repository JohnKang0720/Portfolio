/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#14161c',
          900: '#1b1e26',
          850: '#20242d',
          800: '#2a2f3a',
          700: '#363c48',
          600: '#444b58',
          500: '#5a616f',
          400: '#737b8a',
          300: '#9aa1af',
          200: '#c0c5cf',
          100: '#edeff3',
        },
        accent: {
          DEFAULT: '#5b9dff',
          soft: '#89b6ff',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
