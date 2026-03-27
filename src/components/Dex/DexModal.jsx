"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MonsterDropsTable from "./MonsterDropsTable";
import ItemDropsTable from "./ItemDropsTable";
import WeaponTable from "./WeaponTable";

export default function DexModal({ open, onClose }) {
  const [tab, setTab] = useState("monster");
  const [monsterData, setMonsterData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [craftingData, setCraftingData] = useState(null);

  const [selectedMonster, setSelectedMonster] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [rank, setRank] = useState("low");
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Carregamento centralizado de todos os JSONs
  useEffect(() => {
    if (!open) return;

    async function load() {
      setLoading(true);
      try {
        const [monsterRes, itemRes, craftingRes] = await Promise.all([
          fetch("/Monsters.json"),
          fetch("/DropMonsters.json"),
          fetch("/WeaponTrees.json"),
        ]);

        setMonsterData(await monsterRes.json());
        setItemData(await itemRes.json());
        setCraftingData(await craftingRes.json());
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [open]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtro do autocomplete de itens
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

  if (!open) return null;

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
          {/* MENU LATERAL */}
          <div className="w-56 bg-gray-100 p-4 flex flex-col gap-2">
            <button
              onClick={() => setTab("monster")}
              className={`p-2 rounded font-semibold text-left transition ${tab === "monster" ? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              Monster Drops
            </button>

            <button
              onClick={() => setTab("item")}
              className={`p-2 rounded font-semibold text-left transition ${tab === "item" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              Item Search
            </button>

            <button
              onClick={() => setTab("weapon")}
              className={`p-2 rounded font-semibold text-left transition ${tab === "weapon" ? "bg-green-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              Weapon Table
            </button>

            <button className="p-2 rounded opacity-40 cursor-not-allowed text-left font-semibold">
              Item Location
            </button>

            <button
              onClick={onClose}
              className="mt-auto text-xs text-gray-500 hover:text-black"
            >
              Fechar
            </button>
          </div>

          {/* CONTEÚDO DINÂMICO */}
          <div className="flex-1 p-5 overflow-y-auto">
            {/* ABA: MONSTROS */}
            {tab === "monster" && (
              <>
                <select
                  className="border border-gray-300 p-2 mb-4 w-full rounded-lg text-gray-800 bg-white"
                  onChange={(e) => setSelectedMonster(e.target.value)}
                  defaultValue={selectedMonster || ""}
                >
                  <option value="" disabled>
                    Selecione um monstro
                  </option>
                  {monsterData &&
                    Object.keys(monsterData).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                </select>

                <div className="flex gap-2 mb-4">
                  {["low", "high", "g"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRank(r)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition ${rank === r ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>

                <MonsterDropsTable
                  monsterData={monsterData}
                  selectedMonster={selectedMonster}
                  rank={rank}
                  loading={loading}
                />
              </>
            )}

            {/* ABA: ITENS */}
            {tab === "item" && (
              <>
                <div className="relative mb-4" ref={wrapperRef}>
                  <input
                    type="text"
                    placeholder="Ex: Zinogre Jasper"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    onFocus={() =>
                      filteredItems.length > 0 && setShowDropdown(true)
                    }
                    className="border border-gray-300 p-2 w-full rounded-lg text-gray-800"
                  />

                  {showDropdown && filteredItems.length > 0 && (
                    <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                      {filteredItems.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedItem(item);
                            setShowDropdown(false);
                          }}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <ItemDropsTable
                  itemData={itemData}
                  selectedItem={selectedItem}
                />
              </>
            )}

            {/* ABA: WEAPONS */}
            {tab === "weapon" && (
              <WeaponTable craftingData={craftingData} loading={loading} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
