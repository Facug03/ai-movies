import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '40rem' /* 640px / 16 */,
      md: '48rem' /* 768px / 16 */,
      lg: '64rem' /* 1024px / 16 */,
      xl: '80rem' /* 1280px / 16 */,
      '2xl': '96rem' /* 1536px / 16 */
    },
    extend: {
      colors: {
        primary: 'rgba(233, 225, 38, 1)',
        'primary-80': 'rgba(201, 195, 44, 1)',
        b: 'rgba(30, 30, 29, 1)',
        'b-75': 'rgba(23, 23, 22, 1)',
        'b-50': 'rgba(15, 15, 15, 1)',
        'b-25': 'rgba(30, 30, 29, 0.25)',
        'b-15': 'rgba(30, 30, 29, 0.15)',
        'b-10': 'rgba(30, 30, 29, 0.1)',
        'b-5': 'rgba(30, 30, 29, 0.05)',
        w: 'rgba(243, 243, 237, 1)',
        'w-75': 'rgba(182, 182, 178, 1)',
        'w-50': 'rgba(122, 122, 119, 1)',
        'w-25': 'rgba(61, 61, 59, 1)',
        'w-15': 'rgba(243, 243, 237, 0.15)',
        'w-10': 'rgba(243, 243, 237, 0.1)',
        'w-5': 'rgba(243, 243, 237, 0.05)'
      },
      fontSize: {
        t1: '2.625rem',
        t2: '2.1875rem',
        t3: '1.8125rem',
        t4: '1.5rem',
        t5: '1.25rem',
        t6: '1rem',
        t7: '0.875rem',
        t8: '0.75rem',
        'm-t1': '1.75rem',
        'm-t2': '1.5625rem',
        'm-t3': '1.375rem',
        'm-t4': '1.25rem',
        'm-t5': '1.125rem',
        'm-t6': '1rem',
        'm-t7': '0.875rem',
        'm-t8': '0.75rem',
        tinherit: 'inherit'
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in both',
        'fade-out': 'fade-out 0.6s ease-out both'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      }
    }
  },
  plugins: []
}
export default config
