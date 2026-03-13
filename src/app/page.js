"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MonsterCard from "@/components/MonsterCard";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [monsters, setMonsters] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("monster_update", (data) => {
      setMonsters((prev) => ({
        ...prev,
        [data.address]: { ...data, lastUpdate: Date.now() },
      }));
    });

    const cleanup = setInterval(() => {
      const now = Date.now();
      setMonsters((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const id in next) {
          if (now - next[id].lastUpdate > 3000) {
            delete next[id];
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 1000);

    return () => {
      socket.disconnect();
      clearInterval(cleanup);
    };
  }, []);

  const monsterList = Object.values(monsters);

  return (
    <main className="min-h-screen p-10 bg-gray-50/50">
      {/* Usamos um fundo levemente cinza para o card branco "saltar" da tela */}

      <div className="max-w-7xl mx-auto flex flex-wrap gap-8 items-start justify-center">
        <AnimatePresence>
          {monsterList.map((m) => (
            <MonsterCard key={m.address} monster={m} />
          ))}
        </AnimatePresence>

        {monsterList.length === 0 && (
          <div className="flex flex-col items-center opacity-20 mt-20">
            <img src="/logo_eye.png" className="w-32 grayscale mb-4" />
            <p className="font-black italic text-2xl uppercase tracking-[0.2em]">
              Wyvern Eye Active
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
