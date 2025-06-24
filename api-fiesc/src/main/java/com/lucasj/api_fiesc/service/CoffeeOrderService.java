package com.lucasj.api_fiesc.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.lucasj.api_fiesc.models.ClassicFlavor;
import com.lucasj.api_fiesc.models.CoffeeOrder;
import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.repositories.ClassicFlavorRepository;
import com.lucasj.api_fiesc.repositories.CoffeeOrderRepository;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@Service
public class CoffeeOrderService {

    private final IngredientRepository ingredientRepository;

    private final CoffeeOrderRepository orderRepository;
    private final ClassicFlavorRepository flavorRepository;

    public CoffeeOrderService(CoffeeOrderRepository orderRepository, ClassicFlavorRepository flavorRepository, IngredientRepository ingredientRepository) {
        this.orderRepository = orderRepository;
        this.flavorRepository = flavorRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public CoffeeOrder createOrder(List<Ingredient> base, List<Ingredient> additional) {

        // RN001.3: Verifica se há pelo menos 2 ingredientes base
        if (base == null || base.size() < 2) {
            throw new IllegalArgumentException(
                    "É necessário selecionar pelo menos 2 ingredientes base para montar um café.");
        }

        validateOnlyActiveIngredients(base, "pedido");
        validateOnlyActiveIngredients(additional, "pedido");

        validateStock(base);
        validateStock(additional);

        ClassicFlavor matched = findMatchingFlavor(base);

        CoffeeOrder order = new CoffeeOrder();
        order.setBaseIngredients(base);
        order.setAdditionalIngredients(additional);

        order.setMatchedFlavor(matched);

        String name = generateName(matched, additional);
        order.setGeneratedName(name);

        BigDecimal price = calculateTotal(base, additional, matched);
        order.setTotalPrice(price);

        return orderRepository.save(order);
    }

    private void validateOnlyActiveIngredients(List<Ingredient> ingredients, String contexto) {
        List<Ingredient> inativos = ingredients.stream()
                .filter(i -> !i.isActive())
                .toList();

        if (!inativos.isEmpty()) {
            throw new IllegalArgumentException("Não é possível criar " + contexto + " com ingredientes inativos: " +
                    inativos.stream().map(Ingredient::getName).toList());
        }
    }

    private void validateStock(List<Ingredient> ingredients) {
        List<Ingredient> semEstoque = ingredients.stream()
                .filter(i -> i.getStockQuantity() == null || i.getStockQuantity() <= 0)
                .toList();

        if (!semEstoque.isEmpty()) {
            throw new IllegalArgumentException("Os seguintes ingredientes estão sem estoque: " +
                    semEstoque.stream().map(Ingredient::getName).toList());
        }
    }

    public CoffeeOrder getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    private ClassicFlavor findMatchingFlavor(List<Ingredient> selected) {
        List<ClassicFlavor> flavors = flavorRepository.findAll();

        for (ClassicFlavor flavor : flavors) {
            if (Objects.equals(flavor.getBaseIngredients().size(), selected.size()) &&
                    flavor.getBaseIngredients().containsAll(selected)) {
                return flavor;
            }
        }
        return null;
    }

    private String generateName(ClassicFlavor flavor, List<Ingredient> additional) {
        StringBuilder name = new StringBuilder();
        if (flavor != null) {
            name.append(flavor.getName());
        } else {
            name.append("Café Personalizado");
        }

        if (!additional.isEmpty()) {
            name.append(" com ");
            name.append(String.join(", ",
                    additional.stream().map(Ingredient::getName).toList()));
        }

        return name.toString();
    }

    private BigDecimal calculateTotal(List<Ingredient> base, List<Ingredient> additional, ClassicFlavor flavor) {
        BigDecimal total = BigDecimal.ZERO;
        if (flavor != null && flavor.getBasePrice() != null) {
            total = total.add(flavor.getBasePrice());
        } else {
            total = total.add(base.stream()
                    .map(Ingredient::getPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add));
        }

        total = total.add(additional.stream()
                .map(Ingredient::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return total;
    }

    public String confirmOrder(Long id) {
        CoffeeOrder order = getOrder(id);

        updateStock(order.getBaseIngredients());

        updateStock(order.getAdditionalIngredients());

        return "Pedido confirmado: " + order.getGeneratedName() + " - Total: R$ " + order.getTotalPrice();
    }

    private void updateStock(List<Ingredient> ingredients) {
        ingredients.forEach(ingredient -> {
            Integer stock = ingredient.getStockQuantity();
            if (stock != null && stock > 0) {
                ingredient.setStockQuantity(stock - 1);
            }
        });
        ingredientRepository.saveAll(ingredients);
    }

}