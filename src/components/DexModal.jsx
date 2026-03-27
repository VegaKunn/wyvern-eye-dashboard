"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DexModal({ open, onClose }) {
  const [tab, setTab] = useState("monster");

  const [monsterData, setMonsterData] = useState(null);
  const [itemData, setItemData] = useState(null);

  const [selectedMonster, setSelectedMonster] = useState(null);

  const [selectedItem, setSelectedItem] = useState("");

  const [filteredItems, setFilteredItems] = useState(null);
  const wrapperRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [rank, setRank] = useState("low");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!itemData || !selectedItem) {
      setFilteredItems([]);
      setShowDropdown(false);
      return;
    }

    const search = selectedItem.toLowerCase();

    const results = Object.keys(itemData)
      .filter((name) => name.toLowerCase().includes(search))
      .slice(0, 10);

    setFilteredItems(results);
    setShowDropdown(true);
  }, [selectedItem, itemData]);

  useEffect(() => {
    if (!open) return;

    async function load() {
      setLoading(true);
      try {
        const [monsterRes, itemRes] = await Promise.all([
          fetch("/Monsters.json"),
          fetch("/DropMonsters.json"),
        ]);

        const monsterJson = await monsterRes.json();
        const itemJson = await itemRes.json();

        setMonsterData(monsterJson);
        setItemData(itemJson);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [open]);

  if (!open) return null;

  // =========================
  // MONSTER DROPS (ANTIGO)
  // =========================
  const renderMonsterDrops = () => {
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
                        className={`px-3 py-2 ${
                          isRare
                            ? "text-red-600 font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {i.item}
                      </td>

                      <td className="text-center text-gray-700">{i.qty}</td>

                      <td
                        className={`text-center font-semibold ${
                          isRare ? "text-red-500" : "text-gray-700"
                        }`}
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
  };

  // =========================
  // ITEM DROPS (NOVO)
  // =========================
  const renderItemDrops = () => {
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
                    className={`text-center font-semibold ${
                      isRare ? "text-red-500" : "text-gray-700"
                    }`}
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
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-[950px] h-[620px] rounded-2xl shadow-2xl flex overflow-hidden"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
        >
          {/* MENU */}
          <div className="w-56 bg-gray-100 p-4 flex flex-col gap-2">
            <button
              onClick={() => setTab("monster")}
              className={`p-2 rounded font-semibold transition ${
                tab === "monster"
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monster Drops
            </button>

            <button
              onClick={() => setTab("item")}
              className={`p-2 rounded font-semibold transition ${
                tab === "item"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Item Search
            </button>

            <button className="p-2 rounded opacity-40">Crafting</button>
            <button className="p-2 rounded opacity-40">Item Location</button>

            <button
              onClick={onClose}
              className="mt-auto text-xs text-gray-500 hover:text-black"
            >
              Fechar
            </button>
          </div>

          {/* CONTEÚDO */}
          <div className="flex-1 p-5 overflow-y-auto">
            {tab === "monster" && (
              <>
                <select
                  className="border border-gray-300 p-2 mb-4 w-full rounded-lg text-gray-800 bg-white"
                  onChange={(e) => setSelectedMonster(e.target.value)}
                >
                  <option>Selecione um monstro</option>
                  {monsterData &&
                    Object.keys(monsterData).map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                </select>

                <div className="flex gap-2 mb-4">
                  {["low", "high", "g"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRank(r)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition ${
                        rank === r
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>

                {renderMonsterDrops()}
              </>
            )}

            {tab === "item" && (
              <>
                <div className="relative mb-4" ref={wrapperRef}>
                  <input
                    type="text"
                    placeholder="Ex: Zinogre Jasper"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    onFocus={() => {
                      if (filteredItems.length > 0) setShowDropdown(true);
                    }}
                    className="border border-gray-300 p-2 w-full rounded-lg text-gray-800"
                  />

                  {showDropdown && filteredItems.length > 0 && (
                    <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                      {filteredItems.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDropdown(false); // 🔥 FECHA AO SELECIONAR
                          }}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {renderItemDrops()}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
