package com.lucasj.api_fiesc.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.lucasj.api_fiesc.models.CoffeeOrder;
import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;
import com.lucasj.api_fiesc.repositories.ClassicFlavorRepository;
import com.lucasj.api_fiesc.repositories.CoffeeOrderRepository;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@ExtendWith(MockitoExtension.class)
class CoffeeOrderServiceTest {

    @Mock
    private CoffeeOrderRepository orderRepository;

    @Mock
    private ClassicFlavorRepository flavorRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private CoffeeOrderService orderService;

    private Ingredient espresso;
    private Ingredient leite;

    @BeforeEach
    void setup() {
        espresso = new Ingredient(1L, "Espresso", IngredientType.BASE, BigDecimal.valueOf(5), 10, true);
        leite = new Ingredient(2L, "Leite", IngredientType.BASE, BigDecimal.valueOf(3), 10, true);
    }

    @Test
    void shouldCreateOrderSuccessfully() {
        CoffeeOrder fakeOrder = new CoffeeOrder();
        fakeOrder.setId(1L);

        when(orderRepository.save(any(CoffeeOrder.class))).thenReturn(fakeOrder);

        CoffeeOrder result = orderService.createOrder(List.of(espresso, leite), List.of());

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(orderRepository).save(any(CoffeeOrder.class));
    }

    @Test
    void shouldThrowWhenLessThanTwoBaseIngredients() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> orderService.createOrder(List.of(espresso), List.of()));

        assertEquals("É necessário selecionar pelo menos 2 ingredientes base para montar um café.",
                exception.getMessage());
    }

    @Test
    void shouldGetOrderById() {
        CoffeeOrder order = new CoffeeOrder();
        order.setId(1L);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        CoffeeOrder result = orderService.getOrder(1L);

        assertEquals(1L, result.getId());
    }
    
    @Test
    void shouldUpdateStockWhenConfirmOrder() {
        Ingredient espresso = new Ingredient(1L, "Espresso", IngredientType.BASE, BigDecimal.valueOf(5), 2, true);
        Ingredient leite = new Ingredient(2L, "Leite", IngredientType.BASE, BigDecimal.valueOf(3), 1, true);

        System.out.println("Estoque antes: Espresso=" + espresso.getStockQuantity() + ", Leite=" + leite.getStockQuantity());

        CoffeeOrder order = new CoffeeOrder();
        order.setId(1L);
        order.setBaseIngredients(List.of(espresso, leite));
        order.setAdditionalIngredients(List.of());

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        String result = orderService.confirmOrder(1L);

        System.out.println("Estoque depois: Espresso=" + espresso.getStockQuantity() + ", Leite=" + leite.getStockQuantity());

        assertEquals(1, espresso.getStockQuantity());
        assertEquals(0, leite.getStockQuantity());
        assertTrue(result.contains("Pedido confirmado"));

        verify(ingredientRepository, times(1)).saveAll(List.of(espresso, leite));
    

    }
    }
