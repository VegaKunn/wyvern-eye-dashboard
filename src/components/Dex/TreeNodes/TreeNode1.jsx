"use client";

export default function TreeNode({ node, depth = 0 }) {
  // Cores de raridade (MHW style)
  const getRareColor = (rare) => {
    const colors = [
      "bg-gray-400", // R1
      "bg-white", // R2
      "bg-green-500", // R3
      "bg-blue-400", // R4
      "bg-pink-500", // R5
      "bg-blue-600", // R6
      "bg-purple-600", // R7
      "bg-orange-400", // R8
      "bg-red-600", // R9
      "bg-cyan-400", // R10
    ];
    return colors[rare - 1] || "bg-gray-500";
  };

  return (
    <div className="relative ml-6 flex flex-col">
      {/* LINHAS DE CONEXÃO (Mais sutis) */}
      {depth > 0 && (
        <>
          <div className="absolute left-[-18px] top-[-10px] h-[calc(100%+10px)] w-[1.5px] bg-gray-200" />
          <div className="absolute left-[-18px] top-[18px] w-4 h-[1.5px] bg-gray-200" />
        </>
      )}

      {/* CARD MINI (Horizontal e Escaneável) */}
      <div className="group relative flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1.5 mb-2 shadow-sm hover:border-red-400 hover:z-10 transition-all w-fit min-w-[320px]">
        {/* Badge de Raridade */}
        <div
          className={`w-2 h-8 rounded-sm ${getRareColor(node.slots)} shadow-inner`}
          title={`Raridade ${node.slots}`}
        />

        {/* Info Principal (Lado a Lado) */}
        <div className="flex-1 flex items-center gap-4">
          <div className="min-w-[120px]">
            <h4 className="font-bold text-gray-800 text-[11px] truncate leading-none">
              {node.name}
            </h4>
            <p className="text-[9px] text-gray-400 font-bold uppercase">
              RARE {node.slots}
            </p>
          </div>

          <div className="flex gap-3 items-center border-l border-gray-100 pl-3">
            <div className="text-center">
              <p className="text-[8px] text-gray-400 uppercase leading-none">
                Atk
              </p>
              <span className="text-[11px] font-black text-gray-700">
                {node.attack}
              </span>
            </div>

            {node.element && (
              <div className="text-center border-l border-gray-100 pl-3">
                <p className="text-[8px] text-blue-400 uppercase leading-none">
                  {node.element}
                </p>
                <span className="text-[11px] font-black text-blue-600">
                  {node.elementValue}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* MATERIAIS - HOVER TOOLTIP */}
        {node.materials && (
          <div className="relative group/mat">
            <div className="cursor-help bg-gray-100 p-1 rounded hover:bg-red-100 transition-colors">
              <span className="text-[10px]">⚒️</span>
            </div>

            {/* Tooltip de Materiais (Só aparece no Hover) */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 invisible group-hover/mat:visible bg-gray-900 text-white p-3 rounded-xl shadow-2xl z-50 min-w-[180px] border border-gray-700">
              <div className="triangle-left absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900"></div>
              {node.materials.map((m, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <p className="text-[9px] font-black uppercase text-red-400 mb-1">
                    {m.type === "create" ? "Forge" : "Upgrade"}
                  </p>
                  <ul className="space-y-1">
                    {m.items.map((it, j) => (
                      <li
                        key={j}
                        className="text-[10px] flex justify-between gap-4 border-b border-gray-800 pb-0.5"
                      >
                        <span className="text-gray-300">{it.item}</span>
                        <span className="text-yellow-400 font-bold">
                          x{it.qty}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FILHOS (Recursão) */}
      <div className="flex flex-col">
        {node.children?.map((child, index) => (
          <TreeNode key={index} node={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
