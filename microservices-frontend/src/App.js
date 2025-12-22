import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import ProduitsPage from './pages/ProduitsPage';
import CommandesPage from './pages/CommandesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<ProduitsPage />} />
          <Route path="/commandes" element={<CommandesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;