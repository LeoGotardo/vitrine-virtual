import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const API_URL = 'http://localhost:3001';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex items-start gap-3 mb-7">
    <div className="w-1 h-8 bg-blue-600 rounded-full mt-0.5 shrink-0" />
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const HomePage = ({ onProductClick, onNavigate, scrollTo }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const produtosRef = useRef(null);
  const ofertasRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch(() => setErro('Erro ao carregar produtos. Verifique se o backend está rodando.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (scrollTo === 'produtos' && produtosRef.current) {
      produtosRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollTo === 'ofertas' && ofertasRef.current) {
      ofertasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTo]);

  const handleNavigate = (section) => {
    if (section === 'cadastro') {
      onNavigate('cadastro');
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'produtos' && produtosRef.current) {
      produtosRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'ofertas' && ofertasRef.current) {
      ofertasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const emOferta = produtos.filter((p) => p.emOferta);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNavigate={handleNavigate} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Bem-vindo à TechStore
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Tecnologia de ponta,<br />os melhores preços
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
            Encontre notebooks, periféricos e muito mais com qualidade garantida.
          </p>
          <button
            onClick={() => produtosRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Ver produtos
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Error */}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-8 text-center">
            {erro}
          </div>
        )}

        {/* Produtos */}
        <section id="produtos" ref={produtosRef} className="mb-16">
          <SectionHeader title="Produtos" subtitle="Todos os itens disponíveis na loja" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : produtos.map((produto) => (
                  <ProductCard
                    key={produto.id}
                    produto={produto}
                    onClick={() => onProductClick(produto)}
                  />
                ))}
          </div>
        </section>

        {/* Ofertas */}
        {!loading && emOferta.length > 0 && (
          <section id="ofertas" ref={ofertasRef}>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-7">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-white" />
                <h2 className="text-2xl font-bold text-white">Ofertas da Semana</h2>
              </div>
              <p className="text-orange-100 text-sm">Preços imperdíveis por tempo limitado</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {emOferta.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  onClick={() => onProductClick(produto)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default HomePage;
