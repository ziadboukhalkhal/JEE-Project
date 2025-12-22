import api from './api';

export const produitService = {
  getAll: () => api.get('/produits'),
  
  getById: (id) => api.get(`/produits/${id}`),
  
  create: (produit) => api.post('/produits', produit),
  
  update: (id, produit) => api.put(`/produits/${id}`, produit),
  
  delete: (id) => api.delete(`/produits/${id}`),
};