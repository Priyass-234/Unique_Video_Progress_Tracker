import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LecturePage from './pages/LecturePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lecture/:id" element={<LecturePage />} />
      </Routes>
    </Router>
  );
}

export default App;