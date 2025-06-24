import React, { useEffect, useState } from "react";
import {
  getAdditionalIngredients,
  getBaseIngredients,
} from "../services/ingredientService";
import type { Ingredient } from "../types";
import { useOrder } from "../contexts/OrderContext";

const IngredientsConstructor: React.FC = () => {
  const {
    selectedBases,
    setSelectedBases,
    selectedAdditionals,
    setSelectedAdditionals,
    setConfirmedBases,
    setConfirmedAdditionals,
  } = useOrder();

  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);
  const [additionalIngredients, setAdditionalIngredients] = useState<Ingredient[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getBaseIngredients()
      .then((res) => setBaseIngredients(res.data))
      .catch((err) => console.error("Erro ao buscar ingredientes base", err));

    getAdditionalIngredients()
      .then((res) => setAdditionalIngredients(res.data))
      .catch((err) => console.error("Erro ao buscar adicionais", err));
  }, []);

  const handleSelectBase = (ingredient: Ingredient) => {
    setErrorMessage(null);
    if (selectedBases.find((i) => i.id === ingredient.id)) {
      setSelectedBases(selectedBases.filter((i) => i.id !== ingredient.id));
    } else {
      setSelectedBases([...selectedBases, ingredient]);
    }
  };

  const handleConfirmBases = () => {
    if (selectedBases.length < 2) {
      setErrorMessage("Selecione pelo menos 2 ingredientes base.");
    } else {
      setConfirmedBases(selectedBases);
      setErrorMessage(null);
    }
  };

  const handleSelectAdditional = (ingredient: Ingredient) => {
    setErrorMessage(null);
    if (selectedAdditionals.find((i) => i.id === ingredient.id)) {
      setSelectedAdditionals(selectedAdditionals.filter((i) => i.id !== ingredient.id));
    } else {
      if (selectedAdditionals.length < 2) {
        setSelectedAdditionals([...selectedAdditionals, ingredient]);
      } else {
        setErrorMessage("Você só pode selecionar até 2 adicionais.");
      }
    }
  };

  const handleConfirmAdditionals = () => {
    if (selectedAdditionals.length === 0) {
      setErrorMessage("Selecione pelo menos 1 adicional.");
    } else {
      setConfirmedAdditionals(selectedAdditionals);
      setErrorMessage(null);
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto px-4"
      data-testid="ingredients-constructor-page"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">
        Monte seu Café
      </h2>

      {errorMessage && (
        <div className="text-red-600 text-center mb-4" data-testid="error-message">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/* Ingredientes Base */}
        <div className="flex-1" data-testid="base-section">
          <h3 className="font-semibold mb-3">Base</h3>
          <div
            className="flex flex-wrap gap-2 mb-2"
            data-testid="base-ingredients-list"
          >
            {baseIngredients.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectBase(item)}
                data-testid={`base-${item.name}`}
                className={`px-4 py-2 rounded-md 
                ${
                  selectedBases.find((i) => i.id === item.id)
                    ? "bg-black text-white"
                    : "bg-neutral-100 hover:bg-neutral-200 text-black"
                }
                text-sm cursor-pointer transition`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            className="my-5 bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
            onClick={handleConfirmBases}
            data-testid="confirm-base-button"
          >
            Confirmar sabor base
          </button>
          <p className="text-xs text-neutral-500">
            Monte a receita de sua preferência.
          </p>
        </div>

        {/* Ingredientes Adicionais */}
        <div className="flex-1" data-testid="additional-section">
          <h3 className="font-semibold mb-3">Adicionais</h3>
          <div
            className="flex flex-wrap gap-2 mb-2"
            data-testid="additional-ingredients-list"
          >
            {additionalIngredients.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectAdditional(item)}
                data-testid={`additional-${item.name}`}
                className={`px-4 py-2 rounded-md 
                ${
                  selectedAdditionals.find((i) => i.id === item.id)
                    ? "bg-black text-white"
                    : "bg-neutral-100 hover:bg-neutral-200 text-black"
                }
                text-sm cursor-pointer transition`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            className="my-5 bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
            onClick={handleConfirmAdditionals}
            data-testid="confirm-additional-button"
          >
            Adicionar
          </button>
          <p className="text-xs text-neutral-500">
            Selecione até 2 adicionais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientsConstructor;
