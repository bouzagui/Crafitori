const { Container } = require("postcss");
const { MdPadding } = require("react-icons/md");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
      lightBg: '#efefef', 
      darkBg: '#5e5e5e',  
      primary: "#007BFF",
      primaryBlack: "#003166",
      primaryBlackHover: "#003166c4",
      secondary: "#FF7F50",
      secondaryBlack: "#ad3a11",
      success: "#28A745",
      error: "ce0c0c",
      text: "#001e3f",
      background: "#f9fafb",
       },
       container:{
        center: true,
        padding:{
          DEFAULT: "64px",
          sm: "3rem"
        },
       },
       fontFamily: {
        Poppins: [ "Poppins", "sans-serif"]

       }
    }
  },
  // plugins: [
  //   function ({ addBase, theme }) {
  //     addBase({
  //       'body': {
  //         '@apply bg-lightBg': {}, // Apply light mode background color
  //         '@apply bg-darkBg': {}, // Apply dark mode background color
  //         },
  //       });
  //   },
  // ],
}