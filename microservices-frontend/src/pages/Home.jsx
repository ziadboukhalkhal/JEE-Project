import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commandeService } from '../services/commandeService';
import { produitService } from '../services/produitService';

const Home = () => {
  const [stats, setStats] = useState({
    totalCommandes: 0,
    totalProduits: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [commandesRes, produitsRes] = await Promise.all([
          commandeService.getAll(),
          produitService.getAll(),
        ]);
        
        setStats({
          totalCommandes: commandesRes.data.length,
          totalProduits: produitsRes.data.length,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenue sur MicroStore
          </h1>
          <p className="text-xl text-gray-600">
            Système de gestion de microservices Spring Cloud
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">
                  Total Produits
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {stats.loading ? '...' : stats.totalProduits}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">
                  Total Commandes
                </p>
                <p className="text-4xl font-bold text-green-600">
                  {stats.loading ? '...' : stats.totalCommandes}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/produits" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                📦 Gérer les Produits
              </h2>
              <p className="text-gray-600 mb-4">
                Créer, modifier et supprimer des produits dans votre catalogue
              </p>
              <span className="text-blue-600 font-medium group-hover:underline">
                Accéder →
              </span>
            </div>
          </Link>

          <Link to="/commandes" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                🛒 Gérer les Commandes
              </h2>
              <p className="text-gray-600 mb-4">
                Créer et suivre les commandes de vos clients
              </p>
              <span className="text-green-600 font-medium group-hover:underline">
                Accéder →
              </span>
            </div>
          </Link>
        </div>

        {/* Architecture Info */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🏗️ Architecture Microservices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">Eureka Server</p>
              <p className="text-sm text-blue-600">Service Discovery</p>
              <p className="text-xs text-gray-600 mt-1">Port: 8761</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-800 mb-2">API Gateway</p>
              <p className="text-sm text-green-600">Routing & Load Balancing</p>
              <p className="text-xs text-gray-600 mt-1">Port: 8080</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold text-purple-800 mb-2">Config Server</p>
              <p className="text-sm text-purple-600">Centralized Config</p>
              <p className="text-xs text-gray-600 mt-1">Port: 8888</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;