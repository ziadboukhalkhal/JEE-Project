import React from 'react';

const CommandeCard = ({ commande, produits, onEdit, onDelete }) => {
  const getProduitNom = (idProduit) => {
    const produit = produits.find(p => p.id === idProduit);
    return produit ? produit.nom : 'Produit non trouvé';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Commande #{commande.id}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {formatDate(commande.date)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-700">
          <span className="font-medium">Description:</span> {commande.description}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Produit:</span> {getProduitNom(commande.idProduit)}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Quantité:</span> {commande.quantite}
        </p>
      </div>
      
      <div className="border-t pt-4 mb-4">
        <p className="text-2xl font-bold text-blue-600">{commande.montant} MAD</p>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(commande)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(commande.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CommandeCard;