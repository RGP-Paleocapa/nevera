// Sanitization.js
const Sanitization = (s) => {
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  };
  
  export default Sanitization;
  