import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-3">
              <img src={logo} alt="TechStore" className="h-7 w-auto invert" />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Tecnologia de ponta com os melhores preços. Qualidade garantida em cada produto.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/', { state: { scrollTo: 'produtos' } })} className="text-gray-500 hover:text-white transition-colors">
                  Produtos
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/', { state: { scrollTo: 'ofertas' } })} className="text-gray-500 hover:text-white transition-colors">
                  Ofertas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/add-product')} className="text-gray-500 hover:text-white transition-colors">
                  Cadastrar Produto
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Informações</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
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
