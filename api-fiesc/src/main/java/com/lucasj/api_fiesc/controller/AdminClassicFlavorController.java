package com.lucasj.api_fiesc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lucasj.api_fiesc.models.ClassicFlavor;
import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.repositories.ClassicFlavorRepository;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@RestController
@RequestMapping("/admin/flavors")
public class AdminClassicFlavorController {

    private final ClassicFlavorRepository flavorRepo;
    private final IngredientRepository ingredientRepo;

    public AdminClassicFlavorController(ClassicFlavorRepository flavorRepo, IngredientRepository ingredientRepo) {
        this.flavorRepo = flavorRepo;
        this.ingredientRepo = ingredientRepo;
    }

    @PostMapping
    public ClassicFlavor create(@RequestParam String name,
                                @RequestParam List<Long> ingredientIds,
                                @RequestParam(required = false) Double basePrice) {

        List<Ingredient> ingredients = ingredientRepo.findAllById(ingredientIds);
        ClassicFlavor flavor = new ClassicFlavor();
        flavor.setName(name);
        flavor.setBaseIngredients(ingredients);

        if (basePrice != null) {
            flavor.setBasePrice(java.math.BigDecimal.valueOf(basePrice));
        }

        return flavorRepo.save(flavor);
    }

    @PutMapping("/{id}")
    public ClassicFlavor update(@PathVariable Long id,
                                @RequestParam String name,
                                @RequestParam List<Long> ingredientIds,
                                @RequestParam(required = false) Double basePrice) {

        ClassicFlavor flavor = flavorRepo.findById(id).orElseThrow(() -> new RuntimeException("Sabor não encontrado"));
        List<Ingredient> ingredients = ingredientRepo.findAllById(ingredientIds);

        flavor.setName(name);
        flavor.setBaseIngredients(ingredients);

        if (basePrice != null) {
            flavor.setBasePrice(java.math.BigDecimal.valueOf(basePrice));
        }

        return flavorRepo.save(flavor);
    }

    @GetMapping
    public List<ClassicFlavor> listAll() {
        return flavorRepo.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        flavorRepo.deleteById(id);
    }
}