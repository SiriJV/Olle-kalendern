
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors
				pastel: {
					blue: '#D1E5F7',
					pink: '#FFE5EC',
					yellow: '#FFF8E1',
					green: '#E8F5E9',
				},
				brand: {
					primary: '#61DAFB',
					secondary: '#FF6B81',
					accent: '#FFBE0B',
					dark: '#1A1A2E',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'text-reveal': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0' 
					},
					'100%': { 
						opacity: '1' 
					}
				},
				'slide-up': {
					'0%': { 
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-down': {
					'0%': { 
						transform: 'translateY(-20px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': { 
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-left': {
					'0%': { 
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'bounce': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-5px)' 
					}
				},
				'pulse': {
					'0%, 100%': { 
						opacity: '1' 
					},
					'50%': { 
						opacity: '0.5' 
					}
				},
				'shake': {
					'0%, 100%': { 
						transform: 'translateX(0)' 
					},
					'10%, 30%, 50%, 70%, 90%': { 
						transform: 'translateX(-5px)' 
					},
					'20%, 40%, 60%, 80%': { 
						transform: 'translateX(5px)' 
					}
				},
				'jumping-button': {
					'0%, 20%, 50%, 80%, 100%': { 
						transform: 'translateY(0) translateX(0)' 
					},
					'40%': { 
						transform: 'translateY(-30px) translateX(30px)' 
					},
					'60%': { 
						transform: 'translateY(-15px) translateX(-30px)' 
					}
				},
				'scale': {
					'0%': { 
						transform: 'scale(0.9)' 
					},
					'100%': { 
						transform: 'scale(1)' 
					}
				},
				'rotate': {
					'0%': { 
						transform: 'rotate(0deg)' 
					},
					'100%': { 
						transform: 'rotate(360deg)' 
					}
				},
				'blur-in': {
					'0%': { 
						filter: 'blur(5px)',
						opacity: '0' 
					},
					'100%': { 
						filter: 'blur(0)',
						opacity: '1' 
					}
				},
				'letter-wave': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'25%': { 
						transform: 'translateY(-5px)' 
					},
					'75%': { 
						transform: 'translateY(5px)' 
					}
				},
				'move-random': {
					'0%': { 
						transform: 'translate(0, 0)' 
					},
					'20%': { 
						transform: 'translate(30px, -50px)' 
					},
					'40%': { 
						transform: 'translate(-60px, 40px)' 
					},
					'60%': { 
						transform: 'translate(20px, 60px)' 
					},
					'80%': { 
						transform: 'translate(-30px, -30px)' 
					},
					'100%': { 
						transform: 'translate(0, 0)' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'text-reveal': 'text-reveal 0.5s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-in-left': 'slide-in-left 0.5s ease-out',
				'bounce': 'bounce 1s infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'shake': 'shake 0.5s ease-in-out',
				'jumping-button': 'jumping-button 2s ease-in-out',
				'scale': 'scale 0.3s ease-out',
				'rotate': 'rotate 1s linear infinite',
				'blur-in': 'blur-in 0.5s ease-out',
				'letter-wave': 'letter-wave 1.5s ease-in-out infinite',
				'move-random': 'move-random 8s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Poppins', 'Roboto', 'sans-serif'],
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'button': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'card': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'hover': '0 20px 30px -10px rgba(0, 0, 0, 0.2)',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(10px)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
