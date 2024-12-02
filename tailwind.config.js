/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // Agregar prefijo para evitar conflictos con Bootstrap
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '0.5rem',
    },
  },
  plugins: [],
  corePlugins: {
    // Opcional: Desactiva utilidades de Tailwind que puedan entrar en conflicto con Bootstrap
    preflight: false, // Deshabilitar estilos base de Tailwind (como reset)
  },
};
