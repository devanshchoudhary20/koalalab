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
        primary: {
          background_green: '#E0FFF6',
          testimonial_text: '#3548A2',
          background_purple: '#F4EDF9',
          background_brown: '#F2F2F2',
          text_blue: '#394BA5',
          text_gray: '#3D3D3D',
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        'gradient-fill': {
          mobile: '#4EF0D2',
          desktop: '#4EF0D2',
          blueText: '#394CA9',
          submitButton: '#3547A1',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        // Common typography patterns
        '.text-heading-large': {
          'font-size': '2.5rem',
          'line-height': '1.2',
          'font-weight': '700',
          'font-family': 'var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif',
        },
        '.text-heading-medium': {
          'font-size': '1.5rem',
          'line-height': '1.3',
          'font-weight': '700',
          'font-family': 'var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif',
        },
        '.text-body-large': {
          'font-size': '1.5rem',
          'line-height': '1.6',
          'font-weight': '300',
          'font-family': 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif',
          'letter-spacing': '-0.025em',
        },
        '.text-body-medium': {
          'font-size': '1.125rem',
          'line-height': '1.6',
          'font-weight': '300',
          'font-family': 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif',
          'letter-spacing': '-0.025em',
        },
        '.text-body-small': {
          'font-size': '0.875rem',
          'line-height': '1.6',
          'font-weight': '300',
          'font-family': 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif',
          'letter-spacing': '-0.025em',
        },
        // Common layout patterns
        '.section-container': {
          'max-width': '72rem',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'text-align': 'center',
        },
        '.section-padding': {
          'padding-top': '4rem',
          'padding-bottom': '4rem',
          'padding-left': '1rem',
          'padding-right': '1rem',
        },
        '.card-base': {
          'background-color': 'white',
          'border-radius': '0.5rem',
          'padding': '1.5rem',
          'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        '.link-external': {
          'color': '#1f2937',
          'text-decoration': 'underline',
          'text-decoration-thickness': '1px',
          'text-underline-offset': '2px',
          'transition': 'color 0.2s ease-in-out',
          '&:hover': {
            'color': '#4b5563',
          },
        },
        '.button-primary': {
          'background': '#4EF0D2',
          'color': '#394BA5',
          'font-weight': '600',
          'padding': '0.75rem 2rem',
          'border-radius': '0.5rem',
          'transition': 'all 0.2s ease-in-out',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': '0.5rem',
          '&:hover': {
            'opacity': '0.9',
          },
        },
        '.button-secondary': {
          'background': 'white',
          'color': '#394BA5',
          'border': '1px solid #394BA5',
          'font-weight': '600',
          'padding': '0.75rem 1rem',
          'border-radius': '0.5rem',
          'transition': 'all 0.2s ease-in-out',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': '0.5rem',
          '&:hover': {
            'background-color': '#f9fafb',
          },
        },
        '.number-badge': {
          'background': '#4EF0D2',
          'color': 'white',
          'border-radius': '50%',
          'width': '2rem',
          'height': '2rem',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'font-size': '0.875rem',
          'font-weight': '700',
          'flex-shrink': '0',
        },
      })
    },
  ],
}