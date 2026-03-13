import { motion } from "framer-motion";

export default function MonsterCard({ monster, settings }) {
  const hpPercent = (monster.hp / monster.maxHp) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 border border-white/10 p-4 rounded-xl shadow-2xl mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-black text-white italic">{monster.name}</h3>
        <span className="text-[10px] font-mono text-gray-500">
          {monster.hp} / {monster.maxHp}
        </span>
      </div>

      {/* Barra de Vida */}
      <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${hpPercent}%` }}
          className={`h-full ${hpPercent > 20 ? "bg-red-600" : "bg-white animate-pulse"}`}
        />
      </div>

      {/* Seção Opcional de Status */}
      {settings.showStatus && monster.status && (
        <div className="mt-3 space-y-2">
          {/* Aqui você pode mapear os status como Poison, Sleep, etc */}
          {monster.status.poison?.current > 0 && (
            <div className="text-[9px] text-purple-400 font-bold uppercase">
              🤢 Poison: {monster.status.poison.current}/
              {monster.status.poison.threshold}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
