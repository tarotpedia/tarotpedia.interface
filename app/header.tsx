import { Moon, Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-10">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Moon className="w-7 h-7 text-[#3d3a2a]" />
        <h1 className="text-5xl font-bold text-amber-900 tracking-wide">tarotpedia</h1>
        <Star className="w-7 h-7 text-[#3d3a2a]" />
      </div>
      <p className="text-[#3d3a2a] text-sm tracking-wide uppercase">
        Ancient wisdom meets artificial intelligence
      </p>
    </div>
  );
}
