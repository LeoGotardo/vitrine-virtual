import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

const formatPrice = (preco) => preco.toFixed(2).replace('.', ',');

const ProductCard = ({ produto, onClick }) => {
  const discount = produto.precoOriginal
    ? Math.round((1 - produto.preco / produto.precoOriginal) * 100)
    : null;

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden cursor-pointer
                 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl
                 border border-gray-100 dark:border-gray-800
                 hover:ring-2 hover:ring-blue-500/20 dark:hover:ring-blue-400/20
                 flex flex-col"
    >
      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
            Ver produto <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {produto.emOferta && discount && (
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {produto.fabricante && (
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
            {produto.fabricante}
          </span>
        )}

        <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug mb-1.5 flex-1">
          {produto.nome}
        </h3>

        <p className="text-gray-400 dark:text-gray-500 text-xs mb-3 line-clamp-1">
          {produto.descricao}
        </p>

        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <div>
            {produto.precoOriginal && (
              <span className="text-xs text-gray-400 dark:text-gray-600 line-through block">
                R$ {formatPrice(produto.precoOriginal)}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
              R$ {formatPrice(produto.preco)}
            </span>
          </div>
          {produto.emOferta && (
            <span className="text-xs font-semibold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
              Oferta
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
