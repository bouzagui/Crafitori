/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables dark mode based on a class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "64px",
        sm: "3rem"
      },
    },
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      colors: {
        lightBg: '#efefef', 
        darkBg: '#5e5e5e',  
        primary: "#007BFF",
        primaryBlack: "#003166",
        primaryBlackHover: "#003166c4",
        secondary: "#FF7F50",
        secondaryBlack: "#ad3a11",
        success: "#28A745",
        error: "#ce0c0c",
        text: "#001e3f",
        background: "#f9fafb",
        'modal-overlay': 'rgba(0, 0, 0, 0.6)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};



