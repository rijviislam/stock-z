/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
  			xxs: '0',
  			xs: '360px',
  			sm: '576px',
  			md: '768px',
  			lg: '992px',
  			xl: '1200px',
  			xxl: '1400px',
  			'3xl': '1600px',
  			'4xl': '1920px',
  			largest: '2560px'
  		},
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			]
  		},
  		textShadow: {
  			sm: '1px 1px 2px rgba(0, 0, 0, 0.25)',
  			md: '2px 2px 4px rgba(0, 0, 0, 0.25)',
  			lg: '3px 3px 6px rgba(0, 0, 0, 0.3)',
  			xl: '4px 4px 8px rgba(0, 0, 0, 0.35)'
  		},
    },
  },
  plugins: [],
};
