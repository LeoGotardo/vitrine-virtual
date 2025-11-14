import React, { useState } from 'react';
import { ShoppingCart, Package, MapPin, Truck, Home } from 'lucide-react';

const produtos = [
  {
    id: 1,
    nome: "Notebook Dell Inspiron 15",
    descricao: "Notebook para uso profissional e pessoal",
    preco: 3499.99,
    imagem: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
    fabricante: "Dell",
    especificacoes: {
      processador: "Intel Core i5 11ª Geração",
      memoria: "8GB RAM DDR4",
      armazenamento: "256GB SSD",
      tela: "15.6 polegadas Full HD",
      placaVideo: "Intel UHD Graphics"
    }
  },
  {
    id: 2,
    nome: "Mouse Logitech MX Master 3",
    descricao: "Mouse ergonômico wireless premium",
    preco: 549.90,
    imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    fabricante: "Logitech",
    especificacoes: {
      tipo: "Wireless",
      conexao: "Bluetooth e USB",
      bateria: "Até 70 dias com carga completa",
      dpi: "Até 4000 DPI",
      botoes: "7 botões programáveis"
    }
  },
  {
    id: 3,
    nome: "Teclado Mecânico Keychron K2",
    descricao: "Teclado mecânico compacto wireless",
    preco: 799.00,
    imagem: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop",
    fabricante: "Keychron",
    especificacoes: {
      layout: "75% compacto",
      switches: "Gateron Brown",
      conexao: "Bluetooth e USB-C",
      bateria: "Até 240 horas",
      retroiluminacao: "RGB personalizável"
    }
  },
  {
    id: 4,
    nome: "Monitor LG UltraWide 29\"",
    descricao: "Monitor ultrawide para produtividade",
    preco: 1299.99,
    imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    fabricante: "LG",
    especificacoes: {
      tamanho: "29 polegadas",
      resolucao: "2560x1080 (UltraWide Full HD)",
      taxaAtualizacao: "75Hz",
      painel: "IPS",
      conectividade: "HDMI, DisplayPort"
    }
  },
  {
    id: 5,
    nome: "Headset HyperX Cloud II",
    descricao: "Headset gamer com som surround 7.1",
    preco: 499.90,
    imagem: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop",
    fabricante: "HyperX",
    especificacoes: {
      tipo: "Over-ear fechado",
      som: "Virtual Surround 7.1",
      microfone: "Removível com cancelamento de ruído",
      conexao: "USB e P2 3.5mm",
      compatibilidade: "PC, PS4, Xbox, Nintendo Switch"
    }
  },
  {
    id: 6,
    nome: "Webcam Logitech C920",
    descricao: "Webcam Full HD para videoconferências",
    preco: 399.00,
    imagem: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop",
    fabricante: "Logitech",
    especificacoes: {
      resolucao: "1080p Full HD a 30fps",
      foco: "Automático",
      microfones: "Estéreo integrados",
      campoVisao: "78 graus",
      compatibilidade: "Windows, Mac, Chrome OS"
    }
  }
];

const ProductCard = ({ produto, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={produto.imagem} 
          alt={produto.nome}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {produto.nome}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {produto.descricao}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
          <ShoppingCart className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onProductClick }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl font-bold">TechStore</h1>
          </div>
          <p className="mt-2 text-blue-100">Sua loja de tecnologia online</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Nossos Produtos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map(produto => (
            <ProductCard 
              key={produto.id}
              produto={produto}
              onClick={() => onProductClick(produto)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const ProductDetailPage = ({ produto, onBackClick }) => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCep = async () => {
    if (cep.length !== 8) {
      setErro('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    setErro('');
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setErro('CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro('Erro ao buscar CEP');
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    setCep(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <button 
            onClick={onBackClick}
            className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-4"
          >
            <Home className="w-5 h-5" />
            <span>Voltar para a loja</span>
          </button>
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl font-bold">TechStore</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
              <img 
                src={produto.imagem} 
                alt={produto.nome}
                className="max-w-full h-auto max-h-96 object-contain"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {produto.nome}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {produto.descricao}
              </p>

              <div className="mb-6">
                <span className="text-sm text-gray-500 block mb-1">Fabricante</span>
                <span className="text-lg font-semibold text-gray-700">
                  {produto.fabricante}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Especificações Técnicas
                </h3>
                <div className="space-y-2">
                  {Object.entries(produto.especificacoes).map(([chave, valor]) => (
                    <div key={chave} className="flex border-b border-gray-200 pb-2">
                      <span className="font-semibold text-gray-700 capitalize w-1/3">
                        {chave.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-gray-600 w-2/3">{valor}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Calcular Frete
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Digite o CEP"
                    value={cep}
                    onChange={handleCepChange}
                    maxLength={8}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={buscarCep}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>

                {erro && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                    {erro}
                  </div>
                )}

                {endereco && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Entregar em: {endereco.localidade} - {endereco.uf}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {endereco.logradouro && `${endereco.logradouro}, `}
                          {endereco.bairro}
                        </p>
                        <p className="text-sm text-green-600 mt-2 font-semibold">
                          Frete calculado para esta região
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleProductClick = (produto) => {
    setProdutoSelecionado(produto);
    setPaginaAtual('detalhes');
  };

  const handleBackClick = () => {
    setPaginaAtual('home');
    setProdutoSelecionado(null);
  };

  return (
    <>
      {paginaAtual === 'home' && (
        <HomePage onProductClick={handleProductClick} />
      )}
      {paginaAtual === 'detalhes' && produtoSelecionado && (
        <ProductDetailPage 
          produto={produtoSelecionado}
          onBackClick={handleBackClick}
        />
      )}
    </>
  );
}
