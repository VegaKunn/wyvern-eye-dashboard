"use client";

export default function MonsterDropsTable({
  monsterData,
  selectedMonster,
  rank,
  loading,
}) {
  if (loading) return <p className="text-gray-600">Carregando...</p>;
  if (!monsterData) return <p className="text-red-500">Erro ao carregar</p>;
  if (!selectedMonster)
    return <p className="text-gray-600">Selecione um monstro</p>;

  const monster = monsterData[selectedMonster];
  const drops = monster?.[rank];

  if (!drops) return <p className="text-gray-600">Sem dados</p>;

  return Object.entries(drops).map(([type, items]) => {
    const sorted = [...items].sort((a, b) => b.chance - a.chance);

    return (
      <div key={type} className="mb-6">
        <h4 className="font-bold text-sm uppercase mb-2 text-gray-700">
          {type}
        </h4>
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2">Item</th>
                <th className="px-3 py-2">Qtd</th>
                <th className="px-3 py-2">Chance</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((i, idx) => {
                const isRare = i.chance <= 5;
                return (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td
                      className={`px-3 py-2 ${isRare ? "text-red-600 font-semibold" : "text-gray-800"}`}
                    >
                      {i.item}
                    </td>
                    <td className="text-center text-gray-700">{i.qty}</td>
                    <td
                      className={`text-center font-semibold ${isRare ? "text-red-500" : "text-gray-700"}`}
                    >
                      {i.chance}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  });
}
