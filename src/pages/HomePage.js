import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const API_URL = 'http://localhost:3001';

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200 dark:bg-gray-800" />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mt-4" />
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, count }) => (
  <div className="flex items-start justify-between mb-7">
    <div className="flex items-start gap-3">
      <div className="w-1 h-8 bg-blue-600 rounded-full mt-0.5 shrink-0" />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{title}</h2>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {count != null && (
      <span className="text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full self-center">
        {count} {count === 1 ? 'item' : 'itens'}
      </span>
    )}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200">
      <Navbar onNavigate={handleNavigate} />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Dot grid decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase border border-white/20">
            Bem-vindo à TechStore
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            Tecnologia de ponta,<br />
            <span className="text-blue-200">os melhores preços</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-md mx-auto">
            Notebooks, periféricos e muito mais — com qualidade e preço garantidos.
          </p>
          <button
            onClick={() => produtosRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-7 py-3.5 rounded-full hover:bg-blue-50 transition-colors shadow-xl shadow-blue-900/30"
          >
            Ver produtos
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-14 flex-1">
        {erro && (
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl p-4 mb-10 text-center text-sm">
            {erro}
          </div>
        )}

        {/* Produtos */}
        <section id="produtos" ref={produtosRef} className="mb-20">
          <SectionHeader
            title="Produtos"
            subtitle="Todos os itens disponíveis na loja"
            count={!loading ? produtos.length : null}
          />
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
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-7 overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-white" />
                    <h2 className="text-2xl font-bold text-white">Ofertas da Semana</h2>
                  </div>
                  <p className="text-orange-100 text-sm">Preços imperdíveis por tempo limitado</p>
                </div>
                <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full self-center">
                  {emOferta.length} {emOferta.length === 1 ? 'oferta' : 'ofertas'}
                </span>
              </div>
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
