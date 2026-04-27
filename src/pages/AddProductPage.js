import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, ImageIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:3001';

const emptySpec = () => ({ chave: '', valor: '' });

const AddProductPage = ({ onNavigate }) => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    precoOriginal: '',
    imagem: '',
    fabricante: '',
    emOferta: false,
  });
  const [specs, setSpecs] = useState([emptySpec()]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSpecChange = (index, field, value) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSpec = () => setSpecs((prev) => [...prev, emptySpec()]);
  const removeSpec = (index) => setSpecs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const especificacoes = {};
    for (const { chave, valor } of specs) {
      if (chave.trim()) especificacoes[chave.trim()] = valor.trim();
    }

    const payload = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim(),
      preco: parseFloat(form.preco),
      precoOriginal: form.precoOriginal ? parseFloat(form.precoOriginal) : null,
      imagem: form.imagem.trim(),
      fabricante: form.fabricante.trim(),
      emOferta: form.emOferta,
      especificacoes,
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao cadastrar produto');
      }
      setSucesso(true);
      setTimeout(() => onNavigate('home'), 1500);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, required, children }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNavigate={onNavigate} />

      <main className="container mx-auto px-4 py-10 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Cadastrar Produto</h2>
            <p className="text-gray-500 text-sm mt-1">Preencha as informações do novo produto</p>
          </div>

          {sucesso && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">Produto cadastrado com sucesso! Redirecionando...</span>
            </div>
          )}

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                Informações Básicas
              </h3>

              <Field label="Nome" required>
                <input name="nome" value={form.nome} onChange={handleChange} required className={inputClass} />
              </Field>

              <Field label="Descrição">
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <Field label="Fabricante">
                <input name="fabricante" value={form.fabricante} onChange={handleChange} className={inputClass} />
              </Field>
            </div>

            {/* Pricing card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Preço</h3>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Preço (R$)" required>
                  <input
                    name="preco"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.preco}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="Preço Original (R$)">
                  <input
                    name="precoOriginal"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.precoOriginal}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className={inputClass}
                  />
                </Field>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    id="emOferta"
                    name="emOferta"
                    type="checkbox"
                    checked={form.emOferta}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">Marcar como oferta</span>
              </label>
            </div>

            {/* Image card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Imagem</h3>

              <Field label="URL da Imagem">
                <input
                  name="imagem"
                  value={form.imagem}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>

              {form.imagem ? (
                <img
                  src={form.imagem}
                  alt="preview"
                  className="h-40 w-full object-contain rounded-xl border border-gray-100 bg-gray-50"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div className="h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-300">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-xs">Pré-visualização</span>
                </div>
              )}
            </div>

            {/* Specs card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                Especificações Técnicas
              </h3>

              <div className="space-y-2.5">
                {specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={spec.chave}
                      onChange={(e) => handleSpecChange(i, 'chave', e.target.value)}
                      placeholder="Característica"
                      className={inputClass}
                    />
                    <input
                      value={spec.valor}
                      onChange={(e) => handleSpecChange(i, 'valor', e.target.value)}
                      placeholder="Valor"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpec(i)}
                      disabled={specs.length === 1}
                      className="p-2 text-gray-300 hover:text-red-400 disabled:opacity-30 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar especificação
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || sucesso}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
            </button>
          </form>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AddProductPage;
