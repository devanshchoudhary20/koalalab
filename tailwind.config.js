/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary : {
          background_green : '#E0FFF6',
          testimonial_text : '#3548A2',
          background_purple : '#F1F0FF',
          background_brown : '#F2F2F2',
          text_blue : '#394BA5',
          text_gray : '#3D3D3D',
        },
        'gradient-fill': {
          mobile: '#1CE8AB',
          desktop: '#4EF0D2',
          blueText: '#394CA9',
          submitButton: '#3547A1',
        },       
      },
      fontFamily: {
        'heading': ['var(--font-nunito-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'content': ['var(--font-noto-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    },
  ],
}