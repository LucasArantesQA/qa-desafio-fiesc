package com.lucasj.api_fiesc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@Service
public class IngredientService {

    private final IngredientRepository repository;

    public IngredientService(IngredientRepository repository) {
        this.repository = repository;
    }

   public List<Ingredient> listByType(IngredientType type) {
    return repository.findByTypeAndActiveTrue(type);
}

    public List<Ingredient> getByIds(List<Long> ids) {
        return repository.findAllById(ids);
    }
}