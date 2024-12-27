import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Donation from "./Components/Donation";

const App = () => {
  
  useEffect(() => {
    const handleOrientation = () => {
      if (window.innerHeight < window.innerWidth) {
        // Si paysage, forcer un retour en portrait
        document.body.style.transform = "rotate(0deg)";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.transform = "none";
        document.body.style.overflow = "auto";
      }
    };
  
    window.addEventListener("resize", handleOrientation);
    handleOrientation();
  
    return () => {
      window.removeEventListener("resize", handleOrientation);
    };
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Donation />} />
      </Routes>
    </Router>
  );
};

export default App;
