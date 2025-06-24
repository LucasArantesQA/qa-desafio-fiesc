export interface Ingredient {
  id: string;
  name: string;
  type: 'BASE' | 'ADDITIONAL';
  price: number;
  stockQuantity: number;
  active: boolean;
}

export interface Flavor {
  id: string;
  name: string;
  baseIngredients: Ingredient[];
  basePrice: number;
}

export interface OrderResponse {
  id: string;
  name: string;
  baseIngredients: Ingredient[];
  additionalIngredients: Ingredient[];
  classicFlavor?: string;
  totalPrice: number;
}
