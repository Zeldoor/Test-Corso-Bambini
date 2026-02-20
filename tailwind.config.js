/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-pastello': '#C8E6C9',
        'verde-scuro': '#81C784',
        'arancione': '#F2B0A3',
        'arancione-chiaro': '#F2B0A3',
        'giallo': '#FFD54F',
        'giallo-chiaro': '#FFE082',
        'crema': '#FFF8E1',
        'crema-scuro': '#FFECB3',
        'logo': '#CCD7F3',
      },
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
