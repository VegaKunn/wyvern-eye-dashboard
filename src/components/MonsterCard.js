import { motion } from "framer-motion";

export default function MonsterCard({ monster }) {
  const hpPercent = (monster.hp / monster.maxHp) * 100;
  const isBoss = monster.isLarge;
  console.log(monster);
  const getBarColor = () => {
    if (hpPercent >= 80) return "bg-green-500";
    if (hpPercent <= 30) return "bg-red-500";
    return "bg-yellow-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white rounded-2xl p-5 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl 
        ${isBoss ? "w-[480px] border-l-8 border-l-red-500" : "w-[320px] border-l-4 border-l-blue-400"}`}
    >
      <div className="flex gap-4 items-start">
        {/* Foto do Monstro */}
        <div
          className={`relative flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 
          ${isBoss ? "w-28 h-28" : "w-16 h-16"}`}
        >
          <img
            src={`/monsters/${monster.code}.webp`}
            alt={monster.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => (e.target.src = "/monsters/unknown.png")}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={`font-black text-gray-800 leading-none tracking-tight ${isBoss ? "text-2xl" : "text-lg"}`}
              >
                {monster.name}
              </h3>
              <p className="text-gray-400 font-mono text-[9px] mt-1 uppercase tracking-widest">
                ID: #{monster.code} | {isBoss ? "Large" : "Minion"}
              </p>
            </div>
            {isBoss && hpPercent <= 30 && (
              <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-lg font-black animate-bounce">
                CAPTURAR! 🪤
              </span>
            )}
          </div>

          {/* Barra de Vida */}
          <div className="mt-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                Vitality
              </span>
              <span className="text-xs font-black text-gray-700">
                {Math.floor(hpPercent)}%
              </span>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-[2px] border border-gray-200">
              <motion.div
                animate={{ width: `${hpPercent}%` }}
                className={`h-full rounded-full ${getBarColor()}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO DE STATUS --- */}
      {monster.status && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          {/* Rage Mode - Destaque Principal */}
          {monster.status.rage > 0 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl shadow-sm"
            >
              <span className="text-orange-600 text-sm animate-pulse">🔥</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-orange-400 uppercase leading-none tracking-tighter">
                  Rage Mode
                </span>
                <span className="text-xs font-black text-orange-700 font-mono">
                  {monster.status.rage}s
                </span>
              </div>
            </motion.div>
          )}

          {/* Mapeamento Dinâmico de todos os Status de Buildup */}
          {Object.entries(monster.status).map(([key, value]) => {
            // Ignora Rage (já tratado) e status sem progresso (current 0)
            if (key === "rage" || !value.current || value.current <= 0)
              return null;

            // Mapeamento completo de cores para MH3U
            const statusConfig = {
              poison: {
                color: "text-purple-600 bg-purple-50 border-purple-100",
                label: "Poison",
              },
              sleep: {
                color: "text-blue-500 bg-blue-50 border-blue-100",
                label: "Sleep",
              },
              para: {
                color: "text-yellow-600 bg-yellow-50 border-yellow-100",
                label: "Para",
              },
              dizzy: {
                color: "text-amber-700 bg-amber-50 border-amber-100",
                label: "Stun",
              },
              exhaust: {
                color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                label: "Fatigue",
              },
              slime: {
                color: "text-red-600 bg-red-50 border-red-100",
                label: "Blast",
              },
            };

            const config = statusConfig[key] || {
              color: "text-gray-500 bg-gray-50 border-gray-100",
              label: key,
            };
            const progress = Math.min(
              (value.current / value.threshold) * 100,
              100,
            );

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col gap-1 p-2 rounded-xl border shadow-sm min-w-[90px] ${config.color}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[9px] font-black uppercase leading-none truncate">
                    {config.label}
                  </span>
                  <span className="text-[9px] font-mono font-bold">
                    {Math.floor(progress)}%
                  </span>
                </div>

                {/* Progress Bar do Status */}
                <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden border border-black/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-current opacity-80 rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-3 flex justify-between items-center">
        <span className="text-[10px] font-mono text-gray-300 truncate max-w-[150px]">
          {monster.address}
        </span>
        <span className="font-mono font-bold text-gray-400 text-xs tracking-tighter">
          {monster.hp} <span className="text-gray-200">/</span> {monster.maxHp}
        </span>
      </div>
    </motion.div>
  );
}
