package com.lucasj.api_fiesc.service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.lucasj.api_fiesc.models.Ingredient;
import com.lucasj.api_fiesc.models.IngredientType;
import com.lucasj.api_fiesc.repositories.IngredientRepository;

@ExtendWith(MockitoExtension.class) 
class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @Test
    void shouldReturnIngredientsByType() {
        Ingredient espresso = new Ingredient(1L, "Espresso", IngredientType.BASE, null, 10, true);

        when(ingredientRepository.findByTypeAndActiveTrue(IngredientType.BASE))
                .thenReturn(List.of(espresso));

        List<Ingredient> result = ingredientService.listByType(IngredientType.BASE);

        assertEquals(1, result.size());
        assertEquals("Espresso", result.get(0).getName());
        verify(ingredientRepository, times(1)).findByTypeAndActiveTrue(IngredientType.BASE);
    }

    @Test
    void shouldReturnIngredientsByIds() {
        Ingredient leite = new Ingredient(2L, "Leite", IngredientType.BASE, null, 10, true);

        when(ingredientRepository.findAllById(List.of(2L)))
                .thenReturn(List.of(leite));

        List<Ingredient> result = ingredientService.getByIds(List.of(2L));

        assertEquals(1, result.size());
        assertEquals("Leite", result.get(0).getName());
        verify(ingredientRepository).findAllById(List.of(2L));
    }
}
