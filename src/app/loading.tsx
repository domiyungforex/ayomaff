export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050806] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-950 border-t-electric-green animate-spin" />
        <span className="absolute text-[10px] font-black tracking-widest text-electric-green">
          MAFF
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 animate-pulse">
        CONNECTING TO SOUND WORLD...
      </p>
    </div>
  );
}
