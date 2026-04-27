import React from 'react';
import { Cpu } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-lg">TechStore</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tecnologia de ponta com os melhores preços. Qualidade garantida em cada produto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {onNavigate && (
                <>
                  <li>
                    <button onClick={() => onNavigate('produtos')} className="hover:text-white transition-colors">
                      Produtos
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('ofertas')} className="hover:text-white transition-colors">
                      Ofertas
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('cadastro')} className="hover:text-white transition-colors">
                      Cadastrar Produto
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-sm">
              <li>Frete calculado pelo CEP</li>
              <li>Produtos com garantia de fábrica</li>
              <li>Atendimento de segunda a sexta</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} TechStore. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
