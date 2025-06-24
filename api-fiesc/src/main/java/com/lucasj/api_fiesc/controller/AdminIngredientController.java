package com.lucasj.api_fiesc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.repositories.IngredientRepository;


@RestController
@RequestMapping("/admin/ingredients")
public class AdminIngredientController {

    private final IngredientRepository repository;

    public AdminIngredientController(IngredientRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Ingredient create(@RequestBody Ingredient ingredient) {
        return repository.save(ingredient);
    }

    @PutMapping("/{id}")
    public Ingredient update(@PathVariable Long id, @RequestBody Ingredient updated) {
        Ingredient ingredient = repository.findById(id).orElseThrow(() -> new RuntimeException("Ingrediente não encontrado"));
        ingredient.setName(updated.getName());
        ingredient.setType(updated.getType());
        ingredient.setPrice(updated.getPrice());
        ingredient.setStockQuantity(updated.getStockQuantity());
        return repository.save(ingredient);
    }

    @GetMapping
    public List<Ingredient> listAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}/status")
public Ingredient toggleActive(@PathVariable Long id, @RequestParam boolean active) {
    Ingredient ingredient = repository.findById(id).orElseThrow(() -> new RuntimeException("Ingrediente não encontrado"));
    ingredient.setActive(active);;
    return repository.save(ingredient);
}
}
