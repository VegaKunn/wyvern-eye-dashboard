"use client";
import { useState, useMemo } from "react";

export default function WeaponTable({ craftingData, loading }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWeaponName, setSelectedWeaponName] = useState("");

  // 1. Pega as categorias disponíveis (Keys do JSON)
  const categories = useMemo(() => {
    return craftingData ? Object.keys(craftingData) : [];
  }, [craftingData]);

  // 2. Pega as armas da categoria selecionada
  const weaponsInCategory = useMemo(() => {
    if (!selectedCategory || !craftingData) return [];
    return craftingData[selectedCategory];
  }, [selectedCategory, craftingData]);

  // 3. Encontra o objeto da arma selecionada para renderizar
  const selectedWeaponData = useMemo(() => {
    return weaponsInCategory.find((w) => w.name === selectedWeaponName);
  }, [selectedWeaponName, weaponsInCategory]);

  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (!craftingData)
    return <p className="text-gray-600">Erro ao carregar dados.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* SELECT DE CATEGORIA */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
            Tipo de Arma
          </label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg text-gray-800 bg-white shadow-sm"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedWeaponName(""); // Reseta a arma ao mudar categoria
            }}
          >
            <option value="">Selecione um tipo...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* SELECT DE ARMA (SÓ APARECE SE HOUVER CATEGORIA) */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
            Ramificação / Arma
          </label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg text-gray-800 bg-white shadow-sm disabled:opacity-50"
            value={selectedWeaponName}
            onChange={(e) => setSelectedWeaponName(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Selecione a arma...</option>
            {weaponsInCategory.map((weapon, idx) => (
              <option key={idx} value={weapon.name}>
                {weapon.name} (ATK: {weapon.attack})
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="my-2 border-gray-100" />

      {/* RENDERIZAÇÃO DA ARMA SELECIONADA */}
      {selectedWeaponData ? (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Header da Arma */}
          <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {selectedWeaponData.name}
              </h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                {selectedCategory}
              </p>
            </div>
            <div className="flex gap-4 text-sm bg-black/20 px-3 py-1 rounded-lg">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 uppercase">
                  Ataque
                </span>
                <span className="font-bold">{selectedWeaponData.attack}</span>
              </div>
              {selectedWeaponData.element && (
                <div className="flex flex-col items-center border-x border-white/10 px-4">
                  <span className="text-[10px] text-gray-400 uppercase">
                    {selectedWeaponData.element}
                  </span>
                  <span className="font-bold text-blue-300">
                    {selectedWeaponData.elementValue}
                  </span>
                </div>
              )}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-400 uppercase">
                  Slots
                </span>
                <span className="font-bold">{selectedWeaponData.slots}</span>
              </div>
            </div>
          </div>

          {/* Tabela de Materiais */}
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Método</th>
                <th className="text-left px-4 py-3 font-semibold">
                  Materiais Necessários
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedWeaponData.materials.map((matGroup, mIdx) => (
                <tr
                  key={mIdx}
                  className="border-b last:border-0 border-gray-50"
                >
                  <td className="px-4 py-4 align-top w-32">
                    <span
                      className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-md ${
                        matGroup.type === "create"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}
                    >
                      {matGroup.type === "create" ? "Criação" : "Melhoria"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matGroup.items.map((i, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100"
                        >
                          <span className="text-gray-700 font-medium">
                            {i.item}
                          </span>
                          <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs font-bold">
                            x{i.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
          <p>Escolha o tipo e a arma acima para ver os detalhes de forja.</p>
        </div>
      )}
    </div>
  );
}
