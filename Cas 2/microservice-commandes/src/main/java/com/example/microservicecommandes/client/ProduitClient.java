package com.example.microservicecommandes.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservice-produits")
public interface ProduitClient {

    @GetMapping("/produits/{id}")
    String getProduitById(@PathVariable Long id);
}