import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [scrollTo, setScrollTo] = useState(null);

  const handleProductClick = (produto) => {
    setProdutoSelecionado(produto);
    setPaginaAtual('detalhes');
    window.scrollTo({ top: 0 });
  };

  const handleNavigate = (section) => {
    if (section === 'cadastro') {
      setPaginaAtual('cadastro');
      setProdutoSelecionado(null);
      window.scrollTo({ top: 0 });
    } else {
      setPaginaAtual('home');
      setProdutoSelecionado(null);
      setScrollTo(section === 'home' ? null : section);
    }
  };

  return (
    <>
      {paginaAtual === 'home' && (
        <HomePage
          onProductClick={handleProductClick}
          onNavigate={handleNavigate}
          scrollTo={scrollTo}
        />
      )}
      {paginaAtual === 'detalhes' && produtoSelecionado && (
        <ProductDetailPage
          produto={produtoSelecionado}
          onNavigate={handleNavigate}
        />
      )}
      {paginaAtual === 'cadastro' && (
        <AddProductPage onNavigate={handleNavigate} />
      )}
    </>
  );
}
