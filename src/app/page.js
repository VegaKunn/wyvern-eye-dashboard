"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SettingsMenu from "@/components/SettingsMenu";
import MonsterCard from "@/components/MonsterCard";

export default function Home() {
  const [monsters, setMonsters] = useState({}); // Mudamos para objeto para usar o endereço como chave
  const [settings, setSettings] = useState({
    showStatus: true,
    showRage: true,
    showMinions: true,
  });

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("monster_update", (data) => {
      // Filtro de Minions baseado no menu
      if (!data.isLarge && !settings.showMinions) {
        // Se o minion for desativado, removemos ele da lista se ele existir
        setMonsters((prev) => {
          const newMonsters = { ...prev };
          delete newMonsters[data.address]; // Supondo que você enviou 'p4' como 'address' no Node
          return newMonsters;
        });
        return;
      }

      // Atualiza ou adiciona o monstro na lista usando o endereço como ID único
      setMonsters((prev) => ({
        ...prev,
        [data.address]: data,
      }));
    });

    return () => socket.disconnect();
  }, [settings.showMinions]);

  // Transformamos o objeto de volta em array para renderizar
  const monsterList = Object.values(monsters);
  console.log(monsterList);
  console.log(monsters);
  return (
    <main className="min-h-screen p-8 bg-transparent">
      <SettingsMenu settings={settings} setSettings={setSettings} />

      {/* Grid: Aqui definimos se aparecem lado a lado ou um embaixo do outro */}
      <div className="flex flex-wrap gap-4 items-start">
        {monsterList.map((m) => (
          <div key={m.address} className="w-[350px]">
            <MonsterCard monster={m} settings={settings} />
          </div>
        ))}

        {monsterList.length === 0 && (
          <p className="text-gray-600 italic text-sm font-mono">
            🔍 Aguardando dados do scanner...
          </p>
        )}
      </div>
    </main>
  );
}
