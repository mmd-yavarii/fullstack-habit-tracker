export default function AppBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* MAIN DARK LAYER */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />

            {/* EXTRA DARK OVERLAY (برای عمق بیشتر) */}
            <div className="absolute inset-0 bg-black/40" />

            {/* GLOW 1 - کنترل شده‌تر */}
            <div
                className="absolute top-10 left-10
                           h-72 w-72
                           rounded-full
                           bg-blue-600/10
                           blur-3xl"
            />

            {/* GLOW 2 - ضعیف‌تر */}
            <div
                className="absolute bottom-10 right-10
                           h-72 w-72
                           rounded-full
                           bg-purple-600/10
                           blur-3xl"
            />
        </div>
    );
}
