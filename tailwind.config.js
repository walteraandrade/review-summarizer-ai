
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['League Spartan', 'sans-serif'],
      },
      colors: {
        'background': '#030712', // gray-950
        'foreground': '#e5e7eb', // gray-200
        'card': '#111827',       // gray-900
        'muted': '#1f2937',      // gray-800
        'muted-foreground': '#6b7280', // gray-500
        'primary': '#374151',    // gray-700
        'primary-hover': '#4b5563', // gray-600
        'primary-foreground': '#f9fafb', // gray-50
        'accent': '#1f2937',      // gray-800
        'border': '#1f2937',      // gray-800
        'input': '#111827',       // gray-900
        'ring': '#6b7280',        // gray-500
        'destructive': '#7f1d1d',   // red-900
        'destructive-hover': '#991b1b', // red-800
        'destructive-foreground': '#fecaca', // red-200
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}
