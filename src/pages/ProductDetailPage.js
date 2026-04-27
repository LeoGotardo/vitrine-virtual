import React, { useState } from 'react';
import { MapPin, Truck, ShoppingCart, Tag, ChevronLeft, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formatPrice = (preco) => preco.toFixed(2).replace('.', ',');

const ProductDetailPage = ({ produto, onNavigate }) => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [erroCep, setErroCep] = useState('');
  const [comprado, setComprado] = useState(false);

  const discount = produto.precoOriginal
    ? Math.round((1 - produto.preco / produto.precoOriginal) * 100)
    : null;

  const buscarCep = async () => {
    if (cep.length !== 8) { setErroCep('CEP deve conter 8 dígitos'); return; }
    setLoadingCep(true);
    setErroCep('');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) { setErroCep('CEP não encontrado'); setEndereco(null); }
      else setEndereco(data);
    } catch {
      setErroCep('Erro ao buscar CEP');
      setEndereco(null);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCepChange = (e) => setCep(e.target.value.replace(/\D/g, ''));
  const handleCepKeyDown = (e) => { if (e.key === 'Enter') buscarCep(); };
  const handleComprar = () => { setComprado(true); setTimeout(() => setComprado(false), 3000); };

  const specEntries = Object.entries(produto.especificacoes || {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200">
      <Navbar onNavigate={onNavigate} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para a loja
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Image panel */}
            <div className="bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-10 relative min-h-80 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
              {produto.emOferta && discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  -{discount}%
                </span>
              )}
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="max-w-full h-auto max-h-80 object-contain drop-shadow-md"
              />
            </div>

            {/* Info panel */}
            <div className="p-8 flex flex-col gap-5">
              {produto.fabricante && (
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {produto.fabricante}
                </span>
              )}

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
                {produto.nome}
              </h1>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{produto.descricao}</p>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-100 dark:border-blue-900/50 rounded-xl p-5">
                {produto.precoOriginal && (
                  <span className="text-sm text-gray-400 dark:text-gray-600 line-through block mb-0.5">
                    R$ {formatPrice(produto.precoOriginal)}
                  </span>
                )}
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                    R$ {formatPrice(produto.preco)}
                  </span>
                  {discount && (
                    <span className="text-sm font-bold text-red-500 dark:text-red-400 mb-1">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Buy button */}
              <button
                onClick={handleComprar}
                className={`flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl transition-all active:scale-95 w-full text-white ${
                  comprado
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {comprado ? (
                  <><CheckCircle className="w-5 h-5" /> Adicionado ao carrinho!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Comprar</>
                )}
              </button>

              {/* Specs */}
              {specEntries.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                    Especificações Técnicas
                  </h3>
                  <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {specEntries.map(([chave, valor], i) => (
                      <div
                        key={chave}
                        className={`flex px-4 py-2.5 text-sm ${
                          i % 2 === 0
                            ? 'bg-gray-50 dark:bg-gray-800/50'
                            : 'bg-white dark:bg-gray-900'
                        }`}
                      >
                        <span className="font-medium text-gray-500 dark:text-gray-400 capitalize w-2/5">
                          {chave.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-800 dark:text-gray-200 w-3/5">{valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CEP */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Calcular Frete
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={handleCepChange}
                    onKeyDown={handleCepKeyDown}
                    maxLength={8}
                    className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                  <button
                    onClick={buscarCep}
                    disabled={loadingCep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {loadingCep ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>

                {erroCep && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-2">{erroCep}</p>
                )}

                {endereco && (
                  <div className="mt-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900/50 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {endereco.localidade} — {endereco.uf}
                        </p>
                        {(endereco.logradouro || endereco.bairro) && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {[endereco.logradouro, endereco.bairro].filter(Boolean).join(', ')}
                          </p>
                        )}
                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1.5">
                          Frete disponível para esta região
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

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default ProductDetailPage;
