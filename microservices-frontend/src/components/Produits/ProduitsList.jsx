import React, { useState, useEffect } from 'react';
import { produitService } from '../../services/produitService';
import ProduitCard from './ProduitCard';
import ProduitForm from './ProduitForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const ProduitsList = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduit, setEditingProduit] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      setLoading(true);
      const response = await produitService.getAll();
      setProduits(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (produitData) => {
    try {
      if (editingProduit) {
        await produitService.update(editingProduit.id, produitData);
      } else {
        await produitService.create(produitData);
      }
      fetchProduits();
      setShowForm(false);
      setEditingProduit(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde du produit');
      console.error(err);
    }
  };

  const handleEdit = (produit) => {
    setEditingProduit(produit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      try {
        await produitService.delete(id);
        fetchProduits();
      } catch (err) {
        setError('Erreur lors de la suppression du produit');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduit(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Produits</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
          >
            + Nouveau Produit
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <ProduitForm
          produit={editingProduit}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produits.map((produit) => (
          <ProduitCard
            key={produit.id}
            produit={produit}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {produits.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  );
};

export default ProduitsList;