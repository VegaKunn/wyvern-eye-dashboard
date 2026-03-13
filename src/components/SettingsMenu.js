export default function SettingsMenu({ settings, setSettings }) {
  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="flex gap-4 p-2 bg-white/5 rounded-lg mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
      <button
        onClick={() => toggle("showStatus")}
        className={`px-3 py-1 rounded transition ${settings.showStatus ? "bg-red-600 text-white" : "hover:bg-white/10"}`}
      >
        Status
      </button>
      <button
        onClick={() => toggle("showRage")}
        className={`px-3 py-1 rounded transition ${settings.showRage ? "bg-orange-600 text-white" : "hover:bg-white/10"}`}
      >
        Rage
      </button>
      <button
        onClick={() => toggle("showMinions")}
        className={`px-3 py-1 rounded transition ${settings.showMinions ? "bg-blue-600 text-white" : "hover:bg-white/10"}`}
      >
        Minions
      </button>
    </div>
  );
}
