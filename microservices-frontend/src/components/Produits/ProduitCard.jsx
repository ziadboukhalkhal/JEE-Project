import React from 'react';

const ProduitCard = ({ produit, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{produit.nom}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          #{produit.id}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{produit.description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-2xl font-bold text-green-600">{produit.prix} MAD</p>
          <p className="text-sm text-gray-500">Stock: {produit.stock} unités</p>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(produit)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(produit.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ProduitCard;