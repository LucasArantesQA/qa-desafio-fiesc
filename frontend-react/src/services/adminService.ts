import { api } from './Api.ts';
import type { Ingredient, Flavor } from '../types';

export const getAllIngredients = () => api.get<Ingredient[]>('/admin/ingredients');

export const createIngredient = (data: Partial<Ingredient>) => 
  api.post('/admin/ingredients', data);

export const updateIngredient = (id: string, data: Partial<Ingredient>) => 
  api.put(`/admin/ingredients/${id}`, data);

export const changeIngredientStatus = (id: string, active: boolean) =>
  api.put(`/admin/ingredients/${id}/status?ativo=${active}`, {});

export const deleteIngredient = (id: string) =>
  api.delete(`/admin/ingredients/${id}`);

export const getAllFlavors = () => api.get<Flavor[]>('/admin/flavors');

export const createFlavor = (data: Partial<Flavor>) => 
  api.post('/admin/flavors', data);

export const updateFlavor = (id: string, data: Partial<Flavor>) => 
  api.put(`/admin/flavors/${id}`, data);

export const deleteFlavor = (id: string) =>
  api.delete(`/admin/flavors/${id}`);
