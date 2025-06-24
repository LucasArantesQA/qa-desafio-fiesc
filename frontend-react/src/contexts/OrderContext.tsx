import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Ingredient } from '../types';

interface OrderContextType {
  selectedBases: Ingredient[];
  setSelectedBases: (items: Ingredient[]) => void;
  selectedAdditionals: Ingredient[];
  setSelectedAdditionals: (items: Ingredient[]) => void;

  confirmedBases: Ingredient[];
  setConfirmedBases: (items: Ingredient[]) => void;
  confirmedAdditionals: Ingredient[];
  setConfirmedAdditionals: (items: Ingredient[]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBases, setSelectedBases] = useState<Ingredient[]>([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState<Ingredient[]>([]);

  const [confirmedBases, setConfirmedBases] = useState<Ingredient[]>([]);
  const [confirmedAdditionals, setConfirmedAdditionals] = useState<Ingredient[]>([]);

  return (
    <OrderContext.Provider
      value={{
        selectedBases,
        setSelectedBases,
        selectedAdditionals,
        setSelectedAdditionals,
        confirmedBases,
        setConfirmedBases,
        confirmedAdditionals,
        setConfirmedAdditionals,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder deve ser usado dentro de um OrderProvider');
  }
  return context;
};
