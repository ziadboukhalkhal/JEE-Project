package com.example.microservicecommandes.health;

import com.example.microservicecommandes.service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CommandesHealthIndicator implements HealthIndicator {

    @Autowired
    private CommandeService commandeService;

    @Override
    public Health health() {
        try {
            boolean hasCommandes = commandeService.hasCommandes();

            if (hasCommandes) {
                return Health.up()
                        .withDetail("message", "Des commandes existent dans la base de données")
                        .build();
            } else {
                return Health.down()
                        .withDetail("message", "Aucune commande dans la base de données")
                        .build();
            }
        } catch (Exception e) {
            return Health.down()
                    .withDetail("error", e.getMessage())
                    .build();
        }
    }
}