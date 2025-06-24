import FeatureCardSection from "../components/FeatureCardSection";
import Header from "../components/Header";
import IngredientsConstructor from "../components/IgredientsContructor";
import { OrderProvider } from "../contexts/OrderContext";
import OrderSummary from '../components/CombinedFlavor';

export default function Home() {
  return (
    <OrderProvider>
      <div>
        <Header />

        <div className="max-w-6xl mx-auto">
          <section className="space-y-4 my-20 py-10">
            <p className="text-sm font-semibold">O café do seu jeito!</p>
            <h1 className="text-6xl font-bold">Monte Seu Café</h1>
            <p className="text-base">
              Descubra como criar a bebida perfeita para você! Escolha seus
              ingredientes e personalize seu café de forma simples e divertida.
            </p>
          </section>

          <section className="p-6 flex flex-col gap-12">
            <FeatureCardSection />
          </section>

          <section className="p-6 flex flex-col gap-12">
            <IngredientsConstructor />
          </section>

          <section>
            <OrderSummary />
          </section>
        </div>
      </div>
    </OrderProvider>
  );
}
