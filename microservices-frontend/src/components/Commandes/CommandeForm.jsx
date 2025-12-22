import React, { useState, useEffect } from 'react';

const CommandeForm = ({ commande, produits, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    quantite: '',
    date: new Date().toISOString().split('T')[0],
    montant: '',
    idProduit: '',
  });

  useEffect(() => {
    if (commande) {
      setFormData({
        ...commande,
        date: commande.date ? new Date(commande.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [commande]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantite: parseInt(formData.quantite),
      montant: parseFloat(formData.montant),
      idProduit: parseInt(formData.idProduit),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {commande ? 'Modifier la commande' : 'Nouvelle commande'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Produit *
          </label>
          <select
            name="idProduit"
            value={formData.idProduit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un produit</option>
            {produits.map((produit) => (
              <option key={produit.id} value={produit.id}>
                {produit.nom} - {produit.prix} MAD
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quantité *
          </label>
          <input
            type="number"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Montant (MAD) *
          </label>
          <input
            type="number"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {commande ? 'Mettre à jour' : 'Créer'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default CommandeForm;