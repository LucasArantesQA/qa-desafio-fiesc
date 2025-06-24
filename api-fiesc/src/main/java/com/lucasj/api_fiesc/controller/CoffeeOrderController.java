package com.lucasj.api_fiesc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lucasj.api_fiesc.models.CoffeeOrder;
import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.service.CoffeeOrderService;
import com.lucasj.api_fiesc.service.IngredientService;

@RestController
@RequestMapping("/orders")
public class CoffeeOrderController {

    private final CoffeeOrderService orderService;
    private final IngredientService ingredientService;

    public CoffeeOrderController(CoffeeOrderService orderService, IngredientService ingredientService) {
        this.orderService = orderService;
        this.ingredientService = ingredientService;
    }

    @PostMapping
    public CoffeeOrder createOrder(
            @RequestParam List<Long> baseIds,
            @RequestParam(required = false) List<Long> additionalIds) {
        List<Ingredient> baseIngredients = ingredientService.getByIds(baseIds);
        List<Ingredient> additionalIngredients = additionalIds != null ? ingredientService.getByIds(additionalIds)
                : List.of();

        return orderService.createOrder(baseIngredients, additionalIngredients);
    }

    @GetMapping("/{id}/summary")
    public CoffeeOrder getOrderSummary(@PathVariable Long id) {
        return orderService.getOrder(id);
    }

    @PostMapping("/{id}/confirm")
    public String confirmOrder(@PathVariable Long id) {
        CoffeeOrder order = orderService.getOrder(id);
        return "Pedido confirmado: " + order.getGeneratedName() + " - Total: R$ " + order.getTotalPrice();
    }
}