"use client";

export default function TreeNode4({
  node,
  depth = 0,
  lineageColor = "bg-gray-200",
}) {
  // Extraímos a cor para as bordas e fundos
  // Espera-se algo como "bg-amber-500" ou "bg-blue-500"
  const strokeColor = lineageColor.replace("bg-", "bg-").replace("500", "400");
  const lightBgColor = lineageColor.replace("500", "50");

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
      {/* LINHAS DE CONEXÃO COLORIDAS PELA LINHAGEM */}
      {depth > 0 && (
        <>
          {/* Linha Vertical (Opacidade reduzida para não cansar o olho) */}
          <div
            className={`absolute left-[-16px] top-[-10px] h-[calc(100%+10px)] w-[2px] ${lineageColor} opacity-30`}
          />
          {/* Linha Horizontal */}
          <div
            className={`absolute left-[-16px] top-5 w-4 h-[2px] ${lineageColor} opacity-40 rounded-full`}
          />
        </>
      )}

      {/* CARD DA ARMA */}
      <div
        className={`
        group relative border mb-2 rounded-lg p-2 transition-all shadow-sm
        ${depth === 0 ? "border-l-4" : "border-l-2"} 
        ${lineageColor.replace("bg-", "border-")}
        ${depth === 0 ? "bg-white" : "bg-white/90"}
        hover:shadow-md hover:translate-x-1
      `}
      >
        {/* Background sutil da linhagem para tirar o "branco total" */}
        <div
          className={`absolute inset-0 opacity-[0.03] pointer-events-none ${lineageColor}`}
        />

        <div className="flex items-center gap-3 relative z-10">
          {/* Indicador de Raridade */}
          <div
            className={`w-3 h-3 rounded-full border shadow-sm shrink-0 ${getRareColor(node.slots)}`}
            title={`Raridade ${node.slots}`}
          />

          <div className="flex-1 flex items-center justify-between gap-4">
            <h4
              className={`font-bold text-[12px] truncate max-w-[140px] ${depth === 0 ? "text-gray-900 uppercase" : "text-gray-700"}`}
            >
              {node.name}
            </h4>

            <div className="flex gap-2 shrink-0">
              <span className="text-[10px] font-mono bg-gray-100/80 px-1.5 rounded text-gray-600 border border-gray-200/50">
                {node.attack}
              </span>
              {node.element && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50/80 px-1.5 rounded border border-blue-100">
                  {node.element.substring(0, 3).toUpperCase()}{" "}
                  {node.elementValue}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Materiais - Estilo ultra-clean */}
        {node.materials && node.materials.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-gray-100/50 relative z-10">
            {node.materials.map((m, i) => (
              <div key={i} className="flex items-start gap-2 mb-1 last:mb-0">
                <span
                  className={`text-[7px] font-black uppercase py-0.5 px-1 rounded shrink-0 ${
                    m.type === "create"
                      ? "text-green-700 bg-green-100/50"
                      : "text-orange-700 bg-orange-100/50"
                  }`}
                >
                  {m.type === "create" ? "FORGE" : "UPGRADE"}
                </span>

                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {m.items.map((it, j) => (
                    <span
                      key={j}
                      className="text-[9px] text-gray-500 whitespace-nowrap flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      {it.item}{" "}
                      <b className="text-gray-800 font-bold italic">
                        x{it.qty}
                      </b>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECURSÃO - Passando a cor da linhagem adiante */}
      <div className="relative">
        {node.children?.map((child, index) => (
          <TreeNode4
            key={index}
            node={child}
            depth={depth + 1}
            lineageColor={lineageColor}
          />
        ))}
      </div>
    </div>
  );
}
