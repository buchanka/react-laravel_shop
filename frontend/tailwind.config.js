/* @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/*/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'footer-card': 'background-color: rgba(0, 0, 0, 0.5);',
  			custom_gradient2: 'linear-gradient(90deg, rgba(11,94,172,1) 0%, rgba(149,132,196,1) 18%, rgba(240,196,223,1) 54%, rgba(221,131,159,1) 78%, rgba(146,49,30,1) 96%);',
  			custom_gradient3: 'linear-gradient(90deg, rgba(11,94,172,1) 5%, rgba(222,180,206,1) 64%)'
  		},
  		fontFamily: {
  			montserrat: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		colors: {
  			black: '#070707',
  			voila: '#E5E5E5',
  			haze: '#bbd0ff',
  			icecream: '#fdfffc',
  			frost: '#fdfffc',
  			momo: '#e6e6e9',
  			griff: '#6c757d',
  			purple: '#A85DC4',
  			darkpurple: '#8C107E',
  			violet: '#9584C4',
  			poise: '#0B5EAC',
  			cornflower_blue: '#5659D0',
  			dust_pink: '#9F3467',
  			plum: '#8C107E',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		width: {
  			'85percent': '85%'
  		},
  		container: {
  			center: true,
  			padding: '2rem',
  			screens: {
  				'2xl': '1400px'
  			}
  		},
  		base: {
  			body: {},
  			'h1, h2, h3, h4, h5, h6': {
  				fontFamily: 'Montserrat'
  			},
  			html: {
  				scrollBehavior: 'smooth'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

