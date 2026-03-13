import { motion } from "framer-motion";

export default function MonsterCard({ monster, settings }) {
  if (!monster) return null;

  const hpPercent = monster.maxHp > 0 ? (monster.hp / monster.maxHp) * 100 : 0;

  const isBoss = monster.isLarge;

  const getBarColor = () => {
    if (hpPercent >= 80) return "bg-green-500";
    if (hpPercent <= 30) return "bg-red-500";
    return "bg-yellow-400";
  };

  const statusConfig = {
    poison: { color: "text-purple-400", label: "Poison" },
    sleep: { color: "text-blue-400", label: "Sleep" },
    para: { color: "text-yellow-400", label: "Para" },
    dizzy: { color: "text-amber-400", label: "Stun" },
    exhaust: { color: "text-emerald-400", label: "Fatigue" },
    slime: { color: "text-red-400", label: "Blast" },
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        bg-white/5 border border-white/10 backdrop-blur-xl
        rounded-2xl p-5 shadow-2xl text-white
        ${isBoss ? "w-[480px] border-l-8 border-red-500" : "w-[320px] border-l-4 border-blue-400"}
      `}
    >
      <div className="flex gap-4">
        <img
          src={`/monsters/${monster.code}.webp`}
          className={`rounded-xl bg-black/20 ${isBoss ? "w-28 h-28" : "w-16 h-16"}`}
          onError={(e) => (e.target.src = "/monsters/unknown.png")}
        />

        <div className="flex-1">
          <h3 className={`font-black ${isBoss ? "text-2xl" : "text-lg"}`}>
            {monster.name}
          </h3>

          <div className="mt-3">
            <div className="h-4 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${hpPercent}%` }}
                className={`h-full ${getBarColor()}`}
              />
            </div>
            <p className="text-xs mt-1 font-mono text-gray-300">
              {monster.hp} / {monster.maxHp}
            </p>
          </div>
        </div>
      </div>

      {/* STATUS */}
      {monster.status && (settings.showStatus || settings.showRage) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {settings.showRage && (
            <div className="px-3 py-1 bg-orange-600 rounded-xl text-xs font-black">
              🔥 Rage: {monster.status?.rage || 0}s
            </div>
          )}

          {settings.showStatus &&
            Object.entries(monster.status || {}).map(([key, value]) => {
              if (key === "rage") return null;

              const config = statusConfig[key] || {
                color: "text-gray-400",
                label: key,
              };

              const current = value?.current || 0;
              const threshold = value?.threshold || 1;

              const percent = Math.min((current / threshold) * 100, 100);

              return (
                <div
                  key={key}
                  className="bg-black/20 border border-white/10 rounded-xl p-2 min-w-[90px]"
                >
                  <div className="flex justify-between text-[10px]">
                    <span className={`font-black ${config.color}`}>
                      {config.label}
                    </span>
                    <span>{Math.floor(percent)}%</span>
                  </div>

                  <div className="h-1 bg-black/40 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      animate={{ width: `${percent}%` }}
                      className={`h-full bg-current ${config.color}`}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </motion.div>
  );
}
