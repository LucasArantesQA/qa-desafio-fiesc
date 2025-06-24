package com.lucasj.api_fiesc.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findByTypeAndActiveTrue(IngredientType type);

}