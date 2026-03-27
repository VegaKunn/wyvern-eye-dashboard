"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SettingsMenu from "@/components/SettingsMenu";
import MonsterCardDark from "@/components/MonsterCardDark";
import MonsterCardLight from "@/components/MonsterCardLight";
import { AnimatePresence } from "framer-motion";
import DexModal from "@/components/Dex/DexModal";

const MONSTER_TTL = 3000; // tempo sem update pra sumir
const CLEAN_INTERVAL = 1000;

export default function Home() {
  const [monsters, setMonsters] = useState({});
  const [dexOpen, setDexOpen] = useState(false);
  const [settings, setSettings] = useState({
    showStatus: true,
    showRage: true,
    showMinions: true,
    darkMode: true,
  });

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("monster_update", (data) => {
      setMonsters((prev) => ({
        ...prev,
        [data.address]: {
          ...data,
          lastUpdate: Date.now(),
        },
      }));
    });

    // 🔥 LIMPEZA AUTOMÁTICA DE MONSTROS "FANTASMAS"
    const interval = setInterval(() => {
      const now = Date.now();

      setMonsters((prev) => {
        let changed = false;
        const next = { ...prev };

        for (const addr in next) {
          if (now - next[addr].lastUpdate > MONSTER_TTL) {
            delete next[addr];
            changed = true;
          }
        }

        return changed ? next : prev;
      });
    }, CLEAN_INTERVAL);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  let monsterList = Object.values(monsters);

  if (!settings.showMinions) monsterList = monsterList.filter((m) => m.isLarge);

  return (
    <main
      className={
        settings.darkMode
          ? "min-h-screen p-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
          : "min-h-screen p-10 bg-gray-100"
      }
    >
      <div className="max-w-7xl mx-auto">
        <SettingsMenu settings={settings} setSettings={setSettings} />

        <div className="flex flex-wrap gap-8 justify-center mt-8">
          <AnimatePresence>
            {monsterList.map((m) =>
              settings.darkMode ? (
                <MonsterCardDark
                  key={m.address}
                  monster={m}
                  settings={settings}
                />
              ) : (
                <MonsterCardLight
                  key={m.address}
                  monster={m}
                  settings={settings}
                />
              ),
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🔥 BOTÃO DEX FIXO */}
      <button
        onClick={() => setDexOpen(true)}
        className={`
        fixed bottom-6 right-6 z-50
        px-5 py-3 rounded-2xl font-black tracking-wide
        shadow-xl transition-all duration-300
        ${
          settings.darkMode
            ? "bg-red-600 hover:bg-red-500 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }
      `}
      >
        DEX 📖
      </button>

      {/* 🔥 MODAL */}
      <DexModal open={dexOpen} onClose={() => setDexOpen(false)} />
    </main>
  );
}
