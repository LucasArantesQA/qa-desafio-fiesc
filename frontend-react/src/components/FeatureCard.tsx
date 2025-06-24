import type { ReactNode } from 'react';
import {ArrowRight} from 'lucide-react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  buttonTxt: string;
}

export default function FeatureCard({
  icon,
  title,
  subtitle,
  buttonTxt,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-between items-center text-center gap-4 max-w-xs shadow p-5">
      <div className="">{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{subtitle}</p>
      <button className="mt-2 text-sm font-medium text-black flex items-center gap-1 hover:cursor-pointer ">
        {buttonTxt} <ArrowRight  size={12}/>
      </button>
    </div>
  );
}
