"use client";

export default function TreeNode2({ node, depth = 0 }) {
  // Cores oficiais de Raridade (Estilo Monster Hunter)
  const getRareColor = (rare) => {
    const colors = {
      1: "border-gray-400 text-gray-500 bg-gray-50",
      2: "border-white text-gray-700 bg-gray-100",
      3: "border-green-500 text-green-600 bg-green-50",
      4: "border-blue-400 text-blue-500 bg-blue-50",
      5: "border-pink-400 text-pink-600 bg-pink-50",
      6: "border-purple-500 text-purple-600 bg-purple-50",
      7: "border-orange-400 text-orange-600 bg-orange-50",
      8: "border-cyan-400 text-cyan-600 bg-cyan-50",
    };
    return colors[rare] || "border-gray-800 text-gray-800 bg-gray-50";
  };

  // Cores de Elemento
  const getElementColor = (el) => {
    const colors = {
      Fire: "border-red-500 text-red-600 bg-red-50",
      Ice: "border-cyan-300 text-cyan-600 bg-cyan-50",
      Water: "border-blue-500 text-blue-600 bg-blue-50",
      Thunder: "border-yellow-400 text-yellow-600 bg-yellow-50",
      Dragon: "border-indigo-700 text-indigo-800 bg-indigo-50",
      Poison: "border-purple-500 text-purple-600 bg-purple-50",
      Paralysis: "border-yellow-600 text-yellow-700 bg-yellow-50",
      Sleep: "border-teal-400 text-teal-600 bg-teal-50",
    };
    return colors[el] || null;
  };

  const rareStyle = getRareColor(node.slots); // slots aqui é a raridade
  const elementStyle = getElementColor(node.element);

  return (
    <div className="relative ml-10">
      {/* LINHAS DE CONEXÃO */}
      {depth > 0 && (
        <>
          <div className="absolute left-[-24px] top-[-16px] h-[calc(100%+16px)] w-[2px] bg-gray-200" />
          <div className="absolute left-[-24px] top-8 w-6 h-[2px] bg-gray-200" />
        </>
      )}

      {/* CARD */}
      <div className="group relative bg-white border border-gray-200 rounded-r-xl rounded-l-md mb-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden max-w-[340px]">
        {/* Barra Lateral Dinâmica (Prioriza cor do elemento, senão usa a da raridade) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            elementStyle ? elementStyle.split(" ")[0] : rareStyle.split(" ")[0]
          }`}
        />

        <div className="pl-5 pr-4 py-3">
          {/* Header: Nome e Ataque */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-black text-gray-800 text-[13px] uppercase tracking-tight group-hover:text-red-600 transition-colors leading-tight">
                {node.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${rareStyle}`}
                >
                  RARE {node.slots}
                </span>
              </div>
            </div>
            <div className="text-right bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              <p className="text-[8px] font-bold text-gray-400 uppercase leading-none mb-1">
                Power
              </p>
              <span className="text-base font-black text-gray-900 leading-none">
                {node.attack}
              </span>
            </div>
          </div>

          {/* Atributos Secundários */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Elemento */}
            <div
              className={`flex flex-col items-center justify-center py-1.5 rounded-lg border ${elementStyle || "bg-gray-50 border-gray-100"}`}
            >
              <span className="text-[8px] uppercase font-bold opacity-60">
                Element
              </span>
              <span className="text-[10px] font-black uppercase italic">
                {node.element || "None"}
              </span>
              {node.elementValue && (
                <span className="text-[9px] font-bold mt-[-2px]">
                  {node.elementValue}
                </span>
              )}
            </div>

            {/* Sharpness ou Info Adicional (Placeholder visual para preencher o grid) */}
            <div className="flex flex-col items-center justify-center py-1.5 rounded-lg bg-gray-900 text-white border border-gray-800">
              <span className="text-[8px] uppercase font-bold text-gray-500">
                Tree Depth
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">
                LVL {depth + 1}
              </span>
            </div>
          </div>

          {/* Seção de Materiais */}
          {node.materials?.map((m, i) => (
            <div key={i} className="mt-3 first:mt-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${
                    m.type === "create"
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {m.type === "create" ? "Forge" : "Upgrade"}
                </span>
                <div className="h-[1px] flex-1 bg-gray-100" />
              </div>

              <div className="grid grid-cols-1 gap-1">
                {m.items.map((it, j) => (
                  <div
                    key={j}
                    className="flex justify-between items-center text-[10px] bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 py-1.5 px-2 rounded-md transition-all"
                  >
                    <span className="text-gray-600 font-semibold">
                      {it.item}
                    </span>
                    <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
                      x{it.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILHOS - Importante: chama TreeNode2 aqui */}
      <div className="relative">
        {node.children?.map((child, index) => (
          <TreeNode2 key={index} node={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
