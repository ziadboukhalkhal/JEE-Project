package com.example.microserviceproduits.controller;

import com.example.microserviceproduits.entity.Produit;
import com.example.microserviceproduits.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produits")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @Value("${server.port}")
    private String port;

    // Create
    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
        Produit savedProduit = produitService.createProduit(produit);
        return new ResponseEntity<>(savedProduit, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        return ResponseEntity.ok(produits);
    }

    // Read by ID (with port for load balancing demo)
    @GetMapping("/{id}")
    public ResponseEntity<String> getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id)
                .map(produit -> ResponseEntity.ok(
                        "Produit: " + produit.toString() + " | Handled by instance on port: " + port))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        try {
            Produit updatedProduit = produitService.updateProduit(id, produit);
            return ResponseEntity.ok(updatedProduit);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
}