import daisyui from 'daisyui';
import themes from './src/themes';

const highContrastTheme = {
  'high-contrast': {
    primary: '#ffffff',
    'primary-content': '#000000',
    secondary: '#ffff00',
    'secondary-content': '#000000',
    accent: '#ff4500',
    'accent-content': '#ffffff',
    neutral: '#444444',
    'neutral-content': '#cccccc',
    'base-100': '#000000',
    'base-200': '#111111',
    'base-300': '#222222',
    'base-content': '#ffffff',
    success: '#00e676',
    'success-content': '#000000',
    info: '#29b6f6',
    warning: '#ffca28',
    error: '#ef5350',
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [...themes.filter((t) => t !== 'high-contrast'), highContrastTheme],
  },
};
