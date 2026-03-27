"use client";
import { useState, useMemo } from "react";

export default function WeaponTable({ craftingData, loading }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedElement, setSelectedElement] = useState("All");
  const [selectedWeaponName, setSelectedWeaponName] = useState("");

  // 1. Categorias (Keys do JSON)
  const categories = useMemo(() => {
    return craftingData ? Object.keys(craftingData) : [];
  }, [craftingData]);

  // 2. Armas da categoria selecionada
  const weaponsInCategory = useMemo(() => {
    if (!selectedCategory || !craftingData) return [];
    return craftingData[selectedCategory];
  }, [selectedCategory, craftingData]);

  // 3. Extrair elementos únicos presentes nessa categoria
  const availableElements = useMemo(() => {
    if (weaponsInCategory.length === 0) return [];
    const elements = new Set();
    weaponsInCategory.forEach((w) => {
      elements.add(w.element || "None");
    });
    return Array.from(elements).sort();
  }, [weaponsInCategory]);

  // 4. Filtrar armas pelo elemento selecionado
  const filteredWeapons = useMemo(() => {
    if (selectedElement === "All") return weaponsInCategory;
    return weaponsInCategory.filter(
      (w) => (w.element || "None") === selectedElement,
    );
  }, [selectedElement, weaponsInCategory]);

  // 5. Dados da arma final
  const selectedWeaponData = useMemo(() => {
    return filteredWeapons.find((w) => w.name === selectedWeaponName);
  }, [selectedWeaponName, filteredWeapons]);

  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (!craftingData)
    return <p className="text-gray-600">Erro ao carregar dados.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SELECT 1: CATEGORIA */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
            Tipo de Arma
          </label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg text-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedElement("All");
              setSelectedWeaponName("");
            }}
          >
            <option value="">Selecione o tipo...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* SELECT 2: ELEMENTO */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
            Elemento
          </label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg text-gray-800 bg-white shadow-sm disabled:opacity-50"
            value={selectedElement}
            onChange={(e) => {
              setSelectedElement(e.target.value);
              setSelectedWeaponName("");
            }}
            disabled={!selectedCategory}
          >
            <option value="All">Todos os Elementos</option>
            {availableElements.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* SELECT 3: ARMA */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
            Arma
          </label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg text-gray-800 bg-white shadow-sm disabled:opacity-50"
            value={selectedWeaponName}
            onChange={(e) => setSelectedWeaponName(e.target.value)}
            disabled={filteredWeapons.length === 0}
          >
            <option value="">Selecione a arma...</option>
            {filteredWeapons.map((weapon, idx) => (
              <option key={idx} value={weapon.name}>
                {weapon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="my-2 border-gray-100" />

      {/* DETALHES DA ARMA */}
      {selectedWeaponData ? (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-md">
          {/* Header */}
          <div className="bg-gray-900 text-white px-5 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mb-1">
                {selectedCategory}
              </p>
              <h3 className="font-bold text-xl leading-none">
                {selectedWeaponData.name}
              </h3>
            </div>

            <div className="flex gap-3">
              <div className="bg-white/10 p-2 rounded text-center min-w-[60px]">
                <p className="text-[9px] uppercase text-gray-400">Atk</p>
                <p className="font-bold text-lg">{selectedWeaponData.attack}</p>
              </div>
              {selectedWeaponData.element && (
                <div className="bg-blue-500/20 p-2 rounded text-center min-w-[80px] border border-blue-500/30">
                  <p className="text-[9px] uppercase text-blue-300">
                    {selectedWeaponData.element}
                  </p>
                  <p className="font-bold text-lg text-blue-100">
                    {selectedWeaponData.elementValue}
                  </p>
                </div>
              )}
              <div className="bg-white/10 p-2 rounded text-center min-w-[60px]">
                <p className="text-[9px] uppercase text-gray-400">Slots</p>
                <p className="font-bold text-lg">{selectedWeaponData.slots}</p>
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="p-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 px-1">
              Materiais de Forja
            </h4>
            <div className="space-y-3">
              {selectedWeaponData.materials.map((matGroup, mIdx) => (
                <div
                  key={mIdx}
                  className="border border-gray-100 rounded-lg overflow-hidden"
                >
                  <div
                    className={`px-3 py-1 text-[10px] font-bold uppercase ${
                      matGroup.type === "create"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {matGroup.type === "create"
                      ? "Criação Direta"
                      : "Melhoria (Upgrade)"}
                  </div>
                  <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-gray-50/50">
                    {matGroup.items.map((i, iIdx) => (
                      <div
                        key={iIdx}
                        className="flex justify-between items-center bg-white border border-gray-100 p-2 rounded shadow-sm"
                      >
                        <span className="text-sm text-gray-700">{i.item}</span>
                        <span className="font-bold text-red-600">x{i.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-gray-300 italic border-2 border-dashed border-gray-50 rounded-2xl">
          Selecione os filtros acima para exibir os materiais.
        </div>
      )}
    </div>
  );
}
