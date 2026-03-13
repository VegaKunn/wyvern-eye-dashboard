import { motion } from "framer-motion";

export default function SettingsMenu({ settings, setSettings }) {
  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const Button = ({ label, icon, active, onClick, color }) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
        backdrop-blur-xl shadow-lg
        ${
          active
            ? `bg-gradient-to-r ${color} text-white border-transparent`
            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-black uppercase tracking-widest">
        {label}
      </span>
    </motion.button>
  );

  return (
    <div className="flex justify-center">
      <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex-wrap justify-center">
        <Button
          label="Status"
          icon="☠️"
          active={settings.showStatus}
          color="from-red-500 to-red-700"
          onClick={() => toggle("showStatus")}
        />

        <Button
          label="Rage"
          icon="🔥"
          active={settings.showRage}
          color="from-orange-500 to-orange-700"
          onClick={() => toggle("showRage")}
        />

        <Button
          label="Minions"
          icon="👹"
          active={settings.showMinions}
          color="from-blue-500 to-blue-700"
          onClick={() => toggle("showMinions")}
        />

        <Button
          label="Damage"
          icon="💥"
          active={settings.showDamage}
          color="from-pink-500 to-rose-700"
          onClick={() => toggle("showDamage")}
        />

        <Button
          label={settings.darkMode ? "Dark Mode" : "Light Mode"}
          icon="🌗"
          active={settings.darkMode}
          color="from-purple-500 to-indigo-700"
          onClick={() => toggle("darkMode")}
        />
      </div>
    </div>
  );
}
