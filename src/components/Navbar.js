import React from 'react';
import { PlusCircle, Moon, Sun } from 'lucide-react';
import logo from '../logo.svg';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onNavigate }) => {
  const { dark, toggle } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="hover:opacity-75 transition-opacity"
        >
          <img src={logo} alt="TechStore" className="h-8 w-auto dark:invert" />
        </button>

        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('produtos')}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
          >
            Produtos
          </button>
          <button
            onClick={() => onNavigate('ofertas')}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
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
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="ml-2 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
