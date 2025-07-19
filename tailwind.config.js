/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          dark: 'var(--primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)',
        },
        
        // Neutral Colors
        light: 'var(--light)',
        background: 'var(--background)',
        'text-light': 'var(--text-light)',
        'card-bg': 'var(--card-bg)',
        'secondary-bg': 'var(--secondary-bg)',
        'footer-bg': 'var(--footer-bg)',
        
        // Text Colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        
        // Border Colors
        'border-light': 'var(--border-light)',
        'border-focus': 'var(--border-focus)',
      },
      
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-card': 'var(--gradient-card)',
        'auth-features': 'var(--auth-features-bg)',
      },
      
      boxShadow: {
        'kasheer': 'var(--shadow-kasheer)',
        'kasheer-lg': 'var(--shadow-kasheer-lg)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 