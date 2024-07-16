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
        primary: "#B91C1C",
        secondary:"#434242"
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
          "primary": "#B91C1C",
          "secondary": "#434242",
          "accent": "#310cff",
          "neutral": "#38bdf8",
          // "base-100": "#",
          "base-100": "#fff",
          "info": "#fff",
          "success": "#22c55e",
          "warning": "#fde047",
          "error": "#B91C1C",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
  plugins: [require("daisyui")],
  
}

