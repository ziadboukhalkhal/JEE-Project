package com.example.microservicecommandes.service;


import com.example.microservicecommandes.config.CommandesConfigProperties;
import com.example.microservicecommandes.entity.Commande;
import com.example.microservicecommandes.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private CommandesConfigProperties configProperties;

    // Create
    public Commande createCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    // Read all
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    // Read by ID
    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    // Update
    public Commande updateCommande(Long id, Commande commandeDetails) {
        Commande commande = commandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Commande not found with id: " + id));
        commande.setDescription(commandeDetails.getDescription());
        commande.setQuantite(commandeDetails.getQuantite());
        commande.setDate(commandeDetails.getDate());
        commande.setMontant(commandeDetails.getMontant());

        return commandeRepository.save(commande);
    }

    // Delete
    public void deleteCommande(Long id) {
        commandeRepository.deleteById(id);
    }

    // Get recent commands based on configuration
    public List<Commande> getCommandesRecentes() {
        int days = configProperties.getCommandesLast();
        LocalDate dateDebut = LocalDate.now().minusDays(days);
        return commandeRepository.findCommandesRecentes(dateDebut);
    }

    // Check if there are commands (for health check)
    public boolean hasCommandes() {
        return commandeRepository.count() > 0;
    }
}