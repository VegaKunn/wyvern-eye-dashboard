import { motion } from "framer-motion";

export default function MonsterCardLight({ monster, settings }) {
  if (!monster) return null;

  const hpPercent = monster.maxHp > 0 ? (monster.hp / monster.maxHp) * 100 : 0;

  const isBoss = monster.isLarge;

  const getBarColor = () => {
    if (hpPercent >= 80) return "bg-emerald-500";
    if (hpPercent <= 30) return "bg-rose-500";
    return "bg-amber-400";
  };

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`bg-white rounded-2xl p-5 shadow-xl border border-gray-100 transition-all duration-300
      ${isBoss ? "w-[480px] border-l-8 border-rose-500" : "w-[320px] border-l-4 border-blue-400"}`}
    >
      {/* HEADER */}
      <div className="flex gap-4 items-start">
        <div
          className={`relative flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 ${
            isBoss ? "w-28 h-28" : "w-16 h-16"
          }`}
        >
          <img
            src={`/monsters/${monster.code}.webp`}
            className="w-full h-full object-contain p-2"
            onError={(e) => (e.target.src = "/monsters/unknown.png")}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3
                className={`font-black text-gray-800 leading-none tracking-tight ${
                  isBoss ? "text-2xl" : "text-lg"
                }`}
              >
                {monster.name}
              </h3>

              <p className="text-gray-400 font-mono text-[9px] mt-1 uppercase tracking-widest">
                ID: #{monster.code} | {isBoss ? "Large" : "Minion"}
              </p>
            </div>

            {isBoss && hpPercent <= 30 && hpPercent > 0 && (
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="bg-rose-600 text-white text-[10px] px-2 py-1 rounded-lg font-black"
              >
                CAPTURE
              </motion.span>
            )}
          </div>

          {/* HP */}
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] font-black text-gray-400 uppercase">
                Vitality
              </span>
              <span className="text-xs font-black text-gray-700">
                {Math.floor(hpPercent)}%
              </span>
            </div>

            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden p-[2px] border border-gray-200">
              <motion.div
                animate={{ width: `${hpPercent}%` }}
                transition={{ type: "spring", stiffness: 120 }}
                className={`h-full rounded-full ${getBarColor()}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* STATUS */}
      {monster.status && (settings.showStatus || settings.showRage) && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          {/* RAGE */}
          {settings.showRage && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border
              ${
                monster.status.rage > 0
                  ? "bg-orange-500 border-orange-600 text-white shadow-md"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span
                className={
                  monster.status.rage > 0
                    ? "animate-pulse text-sm"
                    : "text-sm opacity-40"
                }
              >
                🔥
              </span>

              <span className="text-xs font-black font-mono">
                {monster.status.rage > 0
                  ? `${monster.status.rage}s`
                  : "RAGE OFF"}
              </span>
            </div>
          )}

          {/* BUILDUPS */}
          {settings.showStatus &&
            Object.entries(monster.status).map(([key, value]) => {
              if (key === "rage") return null;

              const config = statusConfig[key] || {
                color: "text-gray-500 bg-gray-50 border-gray-100",
                label: key,
              };

              const current = value?.current ?? 0;
              const threshold = value?.threshold ?? 1;

              const progress =
                threshold > 0 ? Math.min((current / threshold) * 100, 100) : 0;

              const nearTrigger = progress >= 75;

              return (
                <div
                  key={key}
                  className={`flex flex-col gap-1 p-2 rounded-xl border min-w-[90px] transition-all
                  ${
                    progress > 0
                      ? config.color
                      : "bg-gray-50 border-gray-100 opacity-40"
                  }
                  ${nearTrigger ? "ring-2 ring-offset-1 ring-red-300" : ""}
                  `}
                >
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="uppercase truncate">{config.label}</span>
                    <span className="font-mono">{Math.floor(progress)}%</span>
                  </div>

                  <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="h-full bg-current opacity-80"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* FOOTER */}
      <div className="mt-3 flex justify-between items-center">
        <span className="text-[10px] font-mono text-gray-300 truncate max-w-[150px]">
          {monster.address}
        </span>

        <span className="font-mono font-bold text-gray-400 text-xs">
          {monster.hp} / {monster.maxHp}
        </span>
      </div>

      {settings.showDamage && monster.damage && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm font-mono">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-[10px]">LAST HIT</p>
            <p className="font-black text-pink-600 text-lg">
              {monster.damage.lastHit}
            </p>
          </div>

          <motion.div
            animate={
              monster.damage.lastHit >= monster.damage.record
                ? { scale: [1, 1.15, 1] }
                : {}
            }
            className="bg-gray-50 rounded-lg p-3 text-center"
          >
            <p className="text-gray-400 text-[10px]">RECORD</p>
            <p className="font-black text-red-500 text-lg">
              {monster.damage.record}
            </p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
