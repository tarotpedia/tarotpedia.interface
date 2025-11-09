import { Moon, Star } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12 z-10">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Moon className="w-7 h-7 text-[#3d3a2a]" />
        <h1 className="text-5xl font-bold bg-linear-to-r from-amber-900 via-amber-700 to-amber-400 bg-clip-text text-transparent tracking-wide">
          tarotpedia
        </h1>
        <Star className="w-7 h-7 text-[#3d3a2a]" />
      </div>
      <p className="text-[#3d3a2a] text-xs md:text-sm tracking-wide uppercase">
        ancient wisdom meets artificial intelligence
      </p>
    </div>
  );
}
