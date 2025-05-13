/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#4a5568',
        success: '#48bb78',
        warning: '#ed8936',
        danger: '#f56565',
      },
    },
  },
  plugins: [],
} 