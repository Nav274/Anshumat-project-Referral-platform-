import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <p className="text-sm">Developed by <span className="font-semibold"><Link to="https://www.linkedin.com/in/naveen274" target="_blank" className="text-blue">V Naveen</Link></span></p>
    </footer>
  );
};

export default Footer;
