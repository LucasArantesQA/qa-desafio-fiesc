import { useEffect, useState } from "react";
import { useOrder } from "../contexts/OrderContext";
import { getAllFlavors } from "../services/adminService";
import {
  createOrder,
  getOrderSummary,
  confirmOrder,
} from "../services/orderService";
import type { Flavor } from "../types/index";
import OrderSummaryModal from "../components/modals/OrderSummaryModal";

export default function CombinedFlavor() {
  const { confirmedBases, confirmedAdditionals } = useOrder();
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [matchedFlavor, setMatchedFlavor] = useState<Flavor | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const hasSelection = confirmedBases.length > 0;

  const basePriceSum = confirmedBases.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  const additionalPriceSum = confirmedAdditionals.reduce(
    (acc, item) => acc + (item.price || 0),
    0
  );

  const classicFlavorPrice = matchedFlavor ? matchedFlavor.basePrice : 0;

  const totalPrice =
    (matchedFlavor ? classicFlavorPrice : basePriceSum) + additionalPriceSum;

  useEffect(() => {
    getAllFlavors()
      .then((res) => setFlavors(res.data))
      .catch((err) => console.error("Erro ao buscar sabores clássicos", err));
  }, []);

  useEffect(() => {
    if (!hasSelection) {
      setMatchedFlavor(null);
      return;
    }

    const matched = flavors.find((flavor) => {
  const flavorBaseNames = (flavor.baseIngredients ?? [])
    .map((i) => i.name)
    .sort()
    .join(",");

  const selectedBaseNames = confirmedBases
    .map((i) => i.name)
    .sort()
    .join(",");

  console.log("Selecionado:", selectedBaseNames);
  console.log("Sabor Clássico:", flavorBaseNames);

  return flavorBaseNames === selectedBaseNames;
});

    if (matched) {
      setMatchedFlavor(matched);
    } else {
      setMatchedFlavor(null);
    }
  }, [confirmedBases, flavors, hasSelection]);

  const handleCreateOrder = async () => {
    try {
      const baseIds = confirmedBases.map((b) => Number(b.id));
      const additionalIds = confirmedAdditionals.map((a) => Number(a.id));

      const res = await createOrder({
        baseIds,
        additionalIds,
      });

      const orderSummary = await getOrderSummary(res.data.id);

      setSummary(orderSummary.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao criar pedido", error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (!summary) return;
      await confirmOrder(summary.id);
      alert("Pedido confirmado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao confirmar pedido", error);
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto flex flex-col gap-12 py-12"
      data-testid="combined-flavor-page"
    >
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">
          Identificação do Sabor Clássico
        </h2>
        <p className="text-base text-neutral-600">
          Verifique se sua combinação forma um sabor clássico.
        </p>
      </div>

      {hasSelection && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Box da esquerda: Sabor Clássico + Adicionais */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Sabor Clássico */}
            <div
              className="flex gap-4 p-4 border border-neutral-200 rounded-md shadow-sm bg-white"
              data-testid="matched-flavor"
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-md"></div>
              <div>
                {matchedFlavor ? (
                  <>
                    <p className="font-semibold mb-1">
                      Sabor Clássico Reconhecido
                    </p>
                    <p>
                      Você criou um <strong>{matchedFlavor.name}</strong>!{" "}
                      {matchedFlavor.basePrice && (
                        <span className="text-sm text-neutral-500">
                          (R$ {matchedFlavor.basePrice.toFixed(2)})
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold mb-1">
                      Sabor Clássico Não Reconhecido
                    </p>
                    <p>
                      <strong>Café personalizado</strong> sujeito à verificação
                      de disponibilidade. 
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Adicionais */}
            <div
              className="flex gap-4 p-4 border border-neutral-200 rounded-md shadow-sm bg-white"
              data-testid="additional-summary"
            >
              <div className="w-16 h-16 bg-neutral-200 rounded-md"></div>
              <div>
                <p className="font-semibold mb-1">Adicionais:</p>
                {confirmedAdditionals.length > 0 ? (
                  <ul>
                    {confirmedAdditionals.map((add) => (
                      <li key={add.id}>
                        {add.name}{" "}
                        <span className="text-sm text-neutral-500">
                          (R$ {add.price?.toFixed(2)})
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    <strong>Nenhum</strong> adicional selecionado.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Box da direita: Resumo dos Ingredientes */}
          <div
            className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-md shadow-sm bg-white flex-1"
            data-testid="ingredients-summary"
          >
            <h3 className="text-lg font-semibold">Resumo dos Ingredientes:</h3>

            {/* Bases Confirmadas */}
            <div>
              <p className="font-medium mb-2">Bases Confirmadas:</p>
              <ul className="list-disc ml-5" data-testid="base-ingredients">
                {confirmedBases.length > 0 ? (
                  confirmedBases.map((i) => (
                    <li key={i.id}>
                      {i.name}{" "}
                      
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-neutral-500">
                    Nenhuma base confirmada.
                  </li>
                )}
              </ul>
            </div>

            {/* Adicionais Confirmados */}
            <div>
              <p className="font-medium mb-2">Adicionais Confirmados:</p>
              {confirmedAdditionals.length > 0 ? (
                <ul
                  className="list-disc ml-5"
                  data-testid="additional-ingredients"
                >
                  {confirmedAdditionals.map((i) => (
                    <li key={i.id}>
                      {i.name}{" "}
                      <span className="text-sm text-neutral-500">
                        (R$ {i.price?.toFixed(2)})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="text-sm text-neutral-500"
                  data-testid="no-additional-selected"
                >
                  Nenhum adicional confirmado.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {hasSelection && (
        <>
          <div className="text-right text-xl font-bold mt-4"
          data-testid="total-price"
          >
            Total: R$ {totalPrice.toFixed(2)}
          </div>

          <button
            onClick={handleCreateOrder}
            data-testid="create-order-button"
            className="my-5 bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            Criar pedido
          </button>
        </>
      )}

      <OrderSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={summary}
        onConfirm={handleConfirmOrder}
        data-testid="order-summary-modal"
      />
    </div>
  );
}
