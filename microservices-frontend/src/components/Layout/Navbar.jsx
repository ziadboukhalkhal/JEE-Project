import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-2xl font-bold">
                🏪 MicroStore
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Accueil
              </Link>
              <Link
                to="/produits"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Produits
              </Link>
              <Link
                to="/commandes"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Commandes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;