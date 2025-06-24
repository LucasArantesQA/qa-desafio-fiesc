import { api } from './Api.ts';
import type { Ingredient } from '../types';

export const getBaseIngredients = () => {
  return api.get<Ingredient[]>('/ingredients/base');
};

export const getAdditionalIngredients = () => {
  return api.get<Ingredient[]>('/ingredients/additional');
};
