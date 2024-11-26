import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Donation from "./Components/Donation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Donation />} />
      </Routes>
    </Router>
  );
};

export default App;
