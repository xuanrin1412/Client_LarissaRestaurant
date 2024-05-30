/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        header: "4rem"
      },

      // margin: {
      //   header: theme.spacing.header,
      // },
      color: {
        primary: "#B91C1C"
      },
      fontFamily: {
        "josefin": ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
        "greatVibes": ['"Great Vibes"', ...defaultTheme.fontFamily.sans],
        "parisienne": ['"Parisienne"', ...defaultTheme.fontFamily.sans]

      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#dc2626",
          "secondary": "#850000",
          "accent": "#310cff",
          "neutral": "#38bdf8",
          // "base-100": "#fef9c3",
          "base-100": "#fff",
          "info": "#fff",
          "success": "#22c55e",
          "warning": "#fde047",
          "error": "#dc2626",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}

