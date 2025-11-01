import { Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#d3d2ca] bg-[#fdfdf8] mt-12 py-8">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-[#3d3a2a] mb-3">About tarotpedia</h3>
            <p className="text-sm text-[#3d3a2a] leading-relaxed">
              Combining ancient tarot wisdom with modern AI technology to provide insightful
              readings and guidance for your life's questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#3d3a2a] mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-[#3d3a2a]">
              <li>
                <a href="/tarot-guide" className="hover:text-amber-600 transition-colors">
                  Understanding Tarot
                </a>
              </li>
              <li>
                <a href="/numerology" className="hover:text-amber-600 transition-colors">
                  Numerology Basics
                </a>
              </li>
              <li>
                <a href="/card-meanings" className="hover:text-amber-600 transition-colors">
                  Card Meanings
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-amber-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#3d3a2a] mb-3">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="mailto:contact@tarotpedia.com"
                className="text-[#3d3a2a] hover:text-amber-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-[#3d3a2a]">
              Questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-[#d3d2ca] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#3d3a2a]">
          <p>© 2025 tarotpedia. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for seekers of wisdom</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
