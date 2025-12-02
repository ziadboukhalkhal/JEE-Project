package com.example.microservicecommandes.controller;

import com.example.microservicecommandes.config.CommandesConfigProperties;
import com.example.microservicecommandes.entity.Commande;
import com.example.microservicecommandes.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @Autowired
    private CommandesConfigProperties configProperties;

    // Create
    @PostMapping
    public ResponseEntity<Commande> createCommande(@RequestBody Commande commande) {
        Commande savedCommande = commandeService.createCommande(commande);
        return new ResponseEntity<>(savedCommande, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<Commande>> getAllCommandes() {
        List<Commande> commandes = commandeService.getAllCommandes();
        return ResponseEntity.ok(commandes);
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long id) {
        return commandeService.getCommandeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable Long id, @RequestBody Commande commande) {
        try {
            Commande updatedCommande = commandeService.updateCommande(id, commande);
            return ResponseEntity.ok(updatedCommande);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }

    // Get recent commands based on configuration
    @GetMapping("/recentes")
    public ResponseEntity<List<Commande>> getCommandesRecentes() {
        List<Commande> commandes = commandeService.getCommandesRecentes();
        return ResponseEntity.ok(commandes);
    }

    // Get current configuration value
    @GetMapping("/config")
    public ResponseEntity<String> getConfig() {
        return ResponseEntity.ok("Affichage des commandes des derniers " +
                configProperties.getCommandesLast() + " jours");
    }
}