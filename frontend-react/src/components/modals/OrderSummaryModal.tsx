import { X } from "lucide-react";

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: {
    generatedName: string;
    totalPrice: number;
    baseIngredients: { id: number; name: string }[];
    additionalIngredients: { id: number; name: string }[];
    matchedFlavor: { id: number; name: string } | null;
  } | null;
  onConfirm: () => void;
}

export default function OrderSummaryModal({
  isOpen,
  onClose,
  summary,
  onConfirm,
}: OrderSummaryModalProps) {
  if (!isOpen || !summary) return null;

  return (
    <div className="fixed inset-0  bg-black/80 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-neutral-500 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>

        <div className="space-y-2">
          <p>
            <strong>Sabor Clássico:</strong> {summary.generatedName}
          </p>
          <p>
            <strong>Bases:</strong>{" "}
            {summary.baseIngredients.map((b) => b.name).join(", ")}
          </p>
          <p>
            <strong>Adicionais:</strong>{" "}
            {summary.additionalIngredients.length > 0
              ? summary.additionalIngredients.map((a) => a.name).join(", ")
              : "Nenhum"}
          </p>
          <p className="text-lg font-semibold">
            <strong>Valor Total:</strong> R$ {summary.totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={onConfirm}
          className="mt-6 w-full bg-black text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}