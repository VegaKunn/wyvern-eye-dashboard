"use client";
import { useState } from "react";
// Importe suas versões aqui
import TreeNode1 from "./TreeNodes/TreeNode1";
import TreeNode2 from "./TreeNodes/TreeNode2";
import TreeNode3 from "./TreeNodes/TreeNode3";
import TreeNode4 from "./TreeNodes/TreeNode4";
import TreeNode5 from "./TreeNodes/TreeNode5";

export default function WeaponTree({ data, loading }) {
  const [weaponType, setWeaponType] = useState("");
  const [viewMode, setViewMode] = useState("v2"); // Estado para controlar a versão

  // Mapeamento dos componentes para facilitar a troca
  const treeNodes = {
    v1: TreeNode1, // A primeira versão (mais vertical)
    v2: TreeNode2, // A compacta com Tooltip
    v3: TreeNode3, // A técnica/tabela
    v4: TreeNode4,
    v5: TreeNode5,
  };

  // Componente selecionado dinamicamente
  const SelectedTreeNode = treeNodes[viewMode];

  if (loading)
    return (
      <div className="flex items-center justify-center py-10 text-gray-500 animate-pulse">
        Carregando árvore de forja...
      </div>
    );

  if (!data)
    return (
      <p className="text-red-500 font-bold p-4">Erro ao carregar dados.</p>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 pb-4 shadow-sm mb-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* SELETOR DE ARMA */}
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
              Classe de Arma
            </label>
            <select
              className="border border-gray-300 p-2.5 w-full rounded-xl text-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
              onChange={(e) => setWeaponType(e.target.value)}
              value={weaponType}
            >
              <option value="">Selecione uma classe...</option>
              {Object.keys(data).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* SELETOR DE VERSÃO (MODO DE VISÃO) */}
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner">
            {[
              { id: "v1", label: "V1" },
              { id: "v2", label: "V2" },
              { id: "v3", label: "V3" },
              { id: "v4", label: "V4" },
              { id: "v5", label: "V5" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                  viewMode === mode.id
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-max pr-10">
          {weaponType ? (
            data[weaponType].map((node, index) => (
              <SelectedTreeNode key={index} node={node} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-300 italic border-2 border-dashed border-gray-50 rounded-2xl">
              Selecione um tipo de arma para ver sua linhagem de evolução.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
