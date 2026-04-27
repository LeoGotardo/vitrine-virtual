import React from 'react';
import { Cpu, PlusCircle } from 'lucide-react';

const Navbar = ({ onNavigate }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">TechStore</span>
        </button>

        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('produtos')}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Produtos
          </button>
          <button
            onClick={() => onNavigate('ofertas')}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Ofertas
          </button>
          <button
            onClick={() => onNavigate('cadastro')}
            className="ml-2 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Cadastrar
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
