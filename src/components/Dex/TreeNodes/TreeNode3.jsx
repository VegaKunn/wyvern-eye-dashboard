"use client";

export default function TreeNode3({ node, depth = 0 }) {
  // Cores de raridade simplificadas para o TreeNode3
  const getRareColor = (rare) => {
    const colors = {
      1: "bg-gray-300",
      2: "bg-white border-gray-300",
      3: "bg-green-400",
      4: "bg-blue-400",
      5: "bg-pink-400",
      6: "bg-purple-500",
      7: "bg-orange-400",
      8: "bg-cyan-400",
    };
    return colors[rare] || "bg-gray-800";
  };

  return (
    <div className="relative ml-6">
      {/* LINHAS DE CONEXÃO - Mais finas e discretas */}
      {depth > 0 && (
        <>
          <div className="absolute left-[-16px] top-[-10px] h-[calc(100%+10px)] w-[1px] bg-gray-200" />
          <div className="absolute left-[-16px] top-5 w-4 h-[1px] bg-gray-200" />
        </>
      )}

      {/* CARD DA ARMA - Ultra compacto */}
      <div className="group bg-white border border-gray-100 rounded-lg p-2 mb-2 shadow-sm hover:border-blue-400 transition-all">
        <div className="flex items-center gap-3">
          {/* Indicador de Raridade (Círculo) */}
          <div
            className={`w-3 h-3 rounded-full border shadow-sm ${getRareColor(node.slots)}`}
            title={`Raridade ${node.slots}`}
          />

          {/* Nome e Status Básicos na mesma linha */}
          <div className="flex-1 flex items-center justify-between gap-4">
            <h4 className="font-bold text-gray-700 text-[12px] truncate max-w-[140px]">
              {node.name}
            </h4>

            <div className="flex gap-2 shrink-0">
              <span className="text-[10px] font-mono bg-gray-50 px-1 rounded text-gray-500">
                ATK:{node.attack}
              </span>
              {node.element && (
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1 rounded">
                  {node.element.substring(0, 3)}:{node.elementValue}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Materiais - Estilo "Linha Única" */}
        {node.materials && node.materials.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-gray-50">
            {node.materials.map((m, i) => (
              <div key={i} className="flex items-start gap-2 mb-1 last:mb-0">
                <span
                  className={`text-[8px] font-bold uppercase py-0.5 px-1 rounded shrink-0 ${
                    m.type === "create"
                      ? "text-green-600 bg-green-50"
                      : "text-orange-600 bg-orange-50"
                  }`}
                >
                  {m.type === "create" ? "Forge" : "Up"}
                </span>

                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  {m.items.map((it, j) => (
                    <span
                      key={j}
                      className="text-[9px] text-gray-500 whitespace-nowrap"
                    >
                      {it.item}{" "}
                      <b className="text-gray-700 font-medium">x{it.qty}</b>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECURSÃO - Mantém o TreeNode3 */}
      <div className="relative">
        {node.children?.map((child, index) => (
          <TreeNode3 key={index} node={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
