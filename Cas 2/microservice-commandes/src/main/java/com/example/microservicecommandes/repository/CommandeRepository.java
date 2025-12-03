package com.example.microservicecommandes.repository;

import com.example.microservicecommandes.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Find commands received in the last N days
    @Query("SELECT c FROM Commande c WHERE c.date >= :dateDebut")
    List<Commande> findCommandesRecentes(@Param("dateDebut") LocalDate dateDebut);

    // Count commands
    long count();
}
