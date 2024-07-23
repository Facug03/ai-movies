import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(233, 225, 38, 1)',
        b: 'rgba(30, 30, 29, 1)',
        'b-75': 'rgba(30, 30, 29, 0.75)',
        'b-50': 'rgba(30, 30, 29, 0.5)',
        'b-25': 'rgba(30, 30, 29, 0.25)',
        'b-15': 'rgba(30, 30, 29, 0.15)',
        'b-10': 'rgba(30, 30, 29, 0.1)',
        'b-5': 'rgba(30, 30, 29, 0.05)',
        w: 'rgba(243, 243, 237, 1)',
        'w-75': 'rgba(243, 243, 237, 0.75)',
        'w-50': 'rgba(243, 243, 237, 0.5)',
        'w-25': 'rgba(243, 243, 237, 0.25)',
        'w-15': 'rgba(243, 243, 237, 0.15)',
        'w-10': 'rgba(243, 243, 237, 0.1)',
        'w-5': 'rgba(243, 243, 237, 0.05)'
      },
      fontSize: {
        t1: '42px',
        t2: '35px',
        t3: '29px',
        t4: '24px',
        t5: '20px',
        t6: '16px',
        t7: '14px',
        t8: '12px',
        'm-t1': '28px',
        'm-t2': '25px',
        'm-t3': '22px',
        'm-t4': '20px',
        'm-t5': '18px',
        'm-t6': '16px',
        'm-t7': '14px',
        'm-t8': '12px'
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
