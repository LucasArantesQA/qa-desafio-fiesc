package com.lucasj.api_fiesc.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;
import com.lucasj.api_fiesc.service.IngredientService;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    private final IngredientService service;

    public IngredientController(IngredientService service) {
        this.service = service;
    }

    @GetMapping("/base")
    public List<Ingredient> listBaseIngredients() {
        return service.listByType(IngredientType.BASE);
    }

    @GetMapping("/additional")
    public List<Ingredient> listAdditionalIngredients() {
        return service.listByType(IngredientType.ADDITIONAL);
    }
}