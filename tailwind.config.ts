import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], theme: { extend: { colors: { forest: '#176b4b', mint: '#e8f4ed' } } }, plugins: [] };
export default config;
