import React, { useState, useEffect } from 'react';
import { commandeService } from '../../services/commandeService';
import { produitService } from '../../services/produitService';
import CommandeCard from './CommandeCard';
import CommandeForm from './CommandeForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const CommandesList = () => {
  const [commandes, setCommandes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCommande, setEditingCommande] = useState(null);
  const [configInfo, setConfigInfo] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [commandesRes, produitsRes, configRes] = await Promise.all([
        commandeService.getAll(),
        produitService.getAll(),
        commandeService.getConfig(),
      ]);
      
      setCommandes(commandesRes.data);
      setProduits(produitsRes.data);
      setConfigInfo(configRes.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (commandeData) => {
    try {
      if (editingCommande) {
        await commandeService.update(editingCommande.id, commandeData);
      } else {
        await commandeService.create(commandeData);
      }
      fetchData();
      setShowForm(false);
      setEditingCommande(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la commande');
      console.error(err);
    }
  };

  const handleEdit = (commande) => {
    setEditingCommande(commande);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) {
      try {
        await commandeService.delete(id);
        fetchData();
      } catch (err) {
        setError('Erreur lors de la suppression de la commande');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCommande(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Commandes</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors"
          >
            + Nouvelle Commande
          </button>
        )}
      </div>

      {configInfo && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700 font-medium">ℹ️ {configInfo}</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <CommandeForm
          commande={editingCommande}
          produits={produits}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commandes.map((commande) => (
          <CommandeCard
            key={commande.id}
            commande={commande}
            produits={produits}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {commandes.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
};

export default CommandesList;