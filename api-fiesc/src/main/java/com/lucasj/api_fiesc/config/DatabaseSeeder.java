package com.lucasj.api_fiesc.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.lucasj.api_fiesc.models.ClassicFlavor;
import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;
import com.lucasj.api_fiesc.repositories.ClassicFlavorRepository;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(
            IngredientRepository ingredientRepository,
            ClassicFlavorRepository flavorRepository
    ) {
        return args -> {

            if (ingredientRepository.count() > 0 || flavorRepository.count() > 0) {
                System.out.println("ℹ️ Dados já existentes no banco. Seeder não executado.");
                return;
            }

            Ingredient espresso = ingredientRepository.save(
                    new Ingredient(null, "Espresso", IngredientType.BASE, new BigDecimal("5.00"), 100, true)
            );
            Ingredient leite = ingredientRepository.save(
                    new Ingredient(null, "Leite", IngredientType.BASE, new BigDecimal("3.00"), 100, true)
            );
            Ingredient espuma = ingredientRepository.save(
                    new Ingredient(null, "Espuma", IngredientType.BASE, new BigDecimal("2.00"), 100, true)
            );
            Ingredient sorvete = ingredientRepository.save(
                    new Ingredient(null, "Sorvete", IngredientType.BASE, new BigDecimal("6.00"), 100, true)
            );
            Ingredient chocolate = ingredientRepository.save(
                    new Ingredient(null, "Chocolate", IngredientType.BASE, new BigDecimal("4.00"), 100, true)
            );

            Ingredient chantilly = ingredientRepository.save(
                    new Ingredient(null, "Chantilly", IngredientType.ADDITIONAL, new BigDecimal("2.00"), 100, true)
            );
            Ingredient canela = ingredientRepository.save(
                    new Ingredient(null, "Canela", IngredientType.ADDITIONAL, new BigDecimal("1.00"), 100, true)
            );

            Ingredient caramelo = ingredientRepository.save(
                    new Ingredient(null, "caramelo", IngredientType.ADDITIONAL, new BigDecimal("3.00"), 100, true)
            );


            flavorRepository.save(
                    new ClassicFlavor(null, "Macchiato", List.of(espresso, leite, espuma), new BigDecimal("8.00"))
            );
            flavorRepository.save(
                    new ClassicFlavor(null, "Latte", List.of(espresso, leite), new BigDecimal("9.00"))
            );
            flavorRepository.save(
                    new ClassicFlavor(null, "Mocha", List.of(espresso, leite, chocolate), new BigDecimal("9.00"))
            );
            flavorRepository.save(
                    new ClassicFlavor(null, "Affogato", List.of(espresso, sorvete), new BigDecimal("10.00"))
            );
            flavorRepository.save(
                    new ClassicFlavor(null, "Chocolatudo", List.of(sorvete, chocolate), new BigDecimal("30.00"))
            );

            System.out.println("✅ Banco populado com ingredientes e sabores clássicos.");
        };
    }
}
