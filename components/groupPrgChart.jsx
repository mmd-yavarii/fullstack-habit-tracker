import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

/* ------------------ DATA BUILDER ------------------ */
function buildCategoryData(habits) {
    const map = new Map();

    habits.forEach((habit) => {
        const category = habit.category;

        habit.logs.forEach((log) => {
            if (!map.has(log.date)) {
                map.set(log.date, { date: log.date });
            }

            const day = map.get(log.date);

            if (!day[category]) day[category] = 0;

            if (log.isCompleted) {
                day[category] += log.value || 1;
            }
        });
    });

    return Array.from(map.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function GroupPrgChart({ habits }) {
    const data = useMemo(() => buildCategoryData(habits), [habits]);

    const keys = useMemo(() => [...new Set(habits.map((h) => h.category))], [habits]);

    const [activeCategory, setActiveCategory] = useState(keys[0]);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 shadow-xl">
            {/* FILTER */}
            {/* FILTER */}
            <div className="flex flex-wrap gap-2 mb-3">
                {keys.map((key) => {
                    const isActive = activeCategory === key;

                    return (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`
                    relative px-4 py-2
                    rounded-[32px]

                    border border-white/[0.08]
                    bg-white/[0.03]

                    backdrop-blur-[40px]
                    backdrop-saturate-[180%]

                    shadow-[0_10px_50px_rgba(0,0,0,0.35)]

                    overflow-hidden

                    transition-all duration-300
                    capitalize text-[11px]

                    ${
                        isActive
                            ? `
                                text-white
                                -translate-y-1 scale-[1.05]
                                border-white/20
                                bg-white/10
                                shadow-[0_15px_60px_rgba(0,0,0,0.5)]
                            `
                            : `
                                text-slate-400
                                hover:text-white
                                hover:bg-white/[0.06]
                                hover:scale-[1.03]
                            `
                    }
                `}
                        >
                            {/* top shine (like header/footer) */}
                            <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                            {/* glow for active */}
                            {isActive && <div className="absolute -top-6 left-1/2 h-10 w-20 -translate-x-1/2 rounded-full bg-white/10 blur-xl" />}

                            <span className="relative z-10">{key}</span>
                        </button>
                    );
                })}
            </div>

            {/* CHART */}
            <div className="h-44 sm:h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} style={{ pointerEvents: 'none' }}>
                        <defs>
                            {/* gradient */}
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                                <stop offset="50%" stopColor="#a855f7" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#e11d48" stopOpacity={0.9} />
                            </linearGradient>

                            {/* shadow filter */}
                            <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="#a855f7" floodOpacity="0.22" />
                            </filter>
                        </defs>

                        <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" opacity={0.1} />

                        <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />

                        <YAxis width={25} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />

                        {activeCategory && (
                            <Line
                                type="monotone"
                                dataKey={activeCategory}
                                stroke="url(#lineGradient)"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={false}
                                isAnimationActive={true}
                                filter="url(#lineShadow)"
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
