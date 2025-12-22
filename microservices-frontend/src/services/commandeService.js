import api from './api';

export const commandeService = {
  getAll: () => api.get('/commandes'),
  
  getById: (id) => api.get(`/commandes/${id}`),
  
  create: (commande) => api.post('/commandes', commande),
  
  update: (id, commande) => api.put(`/commandes/${id}`, commande),
  
  delete: (id) => api.delete(`/commandes/${id}`),
  
  getRecentes: () => api.get('/commandes/recentes'),
  
  getConfig: () => api.get('/commandes/config'),
};