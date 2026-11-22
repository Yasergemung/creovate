import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {
    colors: { ink: '#0D0F14', panel: '#171923', violet: '#7957E8', cyan: '#16C7D9' },
    boxShadow: { glow: '0 0 35px rgba(121,87,232,.18)' }
  }},
  plugins: [],
};
export default config;
