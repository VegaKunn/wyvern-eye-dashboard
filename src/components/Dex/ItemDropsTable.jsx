"use client";

export default function ItemDropsTable({ itemData, selectedItem }) {
  if (!selectedItem) return <p className="text-gray-600">Digite um item</p>;

  const drops = itemData?.[selectedItem];
  if (!drops || drops.length === 0)
    return <p className="text-gray-600">Nenhum drop encontrado</p>;

  const sorted = [...drops].sort((a, b) => b.chance - a.chance);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left px-3 py-2">Monster</th>
            <th className="px-3 py-2">Rank</th>
            <th className="px-3 py-2">Method</th>
            <th className="px-3 py-2">Qtd</th>
            <th className="px-3 py-2">Chance</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((d, idx) => {
            const isRare = d.chance <= 5;
            return (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-3 py-2 text-gray-800">{d.monster}</td>
                <td className="text-center text-gray-700">
                  {d.rank.toUpperCase()}
                </td>
                <td className="text-center text-gray-700">{d.method}</td>
                <td className="text-center text-gray-700">{d.qty}</td>
                <td
                  className={`text-center font-semibold ${isRare ? "text-red-500" : "text-gray-700"}`}
                >
                  {d.chance}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
