package com.lucasj.api_fiesc.models;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "coffee_order")
@Entity
public class CoffeeOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private List<Ingredient> baseIngredients;

    @ManyToMany
    private List<Ingredient> additionalIngredients;

    private String generatedName;

    private BigDecimal totalPrice;

    @ManyToOne
    private ClassicFlavor matchedFlavor;

}
