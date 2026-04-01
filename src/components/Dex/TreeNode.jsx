"use client";

export default function TreeNode1({ node, depth = 0 }) {
  return (
    <div className="relative ml-8">
      {/* LINHAS DE CONEXÃO HIERÁRQUICA */}
      {depth > 0 && (
        <>
          {/* Linha Vertical que liga os irmãos */}
          <div className="absolute left-[-20px] top-[-12px] h-[calc(100%+12px)] w-[2px] bg-gray-200" />
          {/* Linha Horizontal que liga ao card */}
          <div className="absolute left-[-20px] top-6 w-5 h-[2px] bg-gray-200" />
        </>
      )}

      {/* CARD DA ARMA */}
      <div className="group bg-white border border-gray-200 rounded-xl p-3 mb-4 shadow-sm hover:border-red-200 hover:shadow-md transition-all duration-200">
        {/* Header Compacto */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-red-600 transition-colors">
              {node.name}
            </h4>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                ⚔️ {node.attack}
              </span>
              {node.element && (
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                  💧 {node.element} {node.elementValue}
                </span>
              )}
              <span className="text-[10px] font-medium text-gray-400">
                Slots: {node.slots}
              </span>
            </div>
          </div>
        </div>

        {/* Materiais em Pills Compactas */}
        {node.materials && node.materials.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-50 space-y-2">
            {node.materials.map((m, i) => (
              <div key={i}>
                <p className="text-[9px] uppercase font-black text-gray-400 mb-1 tracking-wider">
                  {m.type === "create" ? "⚒️ Forjar" : "⬆️ Melhorar"}
                </p>
                <div className="flex flex-wrap gap-1">
                  {m.items.map((it, j) => (
                    <span
                      key={j}
                      className="text-[10px] bg-gray-50 border border-gray-100 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      {it.item} <b className="text-red-500">x{it.qty}</b>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECURSÃO PARA FILHOS */}
      <div className="relative">
        {node.children?.map((child, index) => (
          <TreeNode key={index} node={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}
