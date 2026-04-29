/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        rag: {
          bg: '#0B0F19',
          container: '#111827',
          primary: '#6366F1',
          secondary: '#22C55E',
          text: '#E5E7EB',
          muted: '#9CA3AF',
          error: '#EF4444',
          surface: '#1E293B',
          border: '#374151',
        },
      },
    },
  },
  plugins: [],
};
