import { GlassWater, HelpCircle, Martini } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function FeatureCardSection() {
  return (
    <section className="py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Descubra como personalizar seu café de <br /> forma simples e rápida
      </h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center ">
        <FeatureCard
          icon={<GlassWater size={40} />}
          title="Passo a passo para criar sua bebida perfeita"
          subtitle="Escolha seus ingredientes, identifique seu sabor clássico e veja o resumo da sua bebida."
          buttonTxt="Confirmar"
        />

        <FeatureCard
          icon={<HelpCircle size={40} />}
          title="Como funciona a identificação do sabor clássico?"
          subtitle="Nosso sistema reconhece automaticamente se sua combinação de ingredientes forma um sabor clássico!"
          buttonTxt="Verificar"
        />

        <FeatureCard
          icon={<Martini size={40} />}
          title="Resumo da sua bebida personalizada"
          subtitle="Veja o nome da sua bebida e todos os ingredientes escolhidos."
          buttonTxt="Adicionar"
        />
      </div>
    </section>
  );
}
