import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

/* ------------------ TOOLTIP ------------------ */
function TooltipBox({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 shadow-2xl">
            <div className="text-[11px] text-slate-300 mb-2">{label}</div>

            <div className="space-y-1">
                {payload.map((p, i) => (
                    <div key={i} className="flex justify-between gap-6 text-xs">
                        <span className="text-slate-200 capitalize">{p.name}</span>
                        <span className="text-white font-medium">{p.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function GroupPrgChart({ habits }) {
    const data = useMemo(() => buildCategoryData(habits), [habits]);

    const keys = useMemo(() => [...new Set(habits.map((h) => h.category))], [habits]);

    const [activeCategory, setActiveCategory] = useState(keys[0]);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-xl">
            {/* FILTER */}
            <div className="flex flex-wrap gap-2 mb-4">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`
                            px-3 py-1 text-[11px] rounded-full border transition capitalize
                            ${
                                activeCategory === key
                                    ? 'bg-white/10 text-white border-white/20'
                                    : 'bg-transparent text-slate-400 border-white/10 opacity-70 hover:opacity-100'
                            }
                        `}
                    >
                        {key}
                    </button>
                ))}
            </div>

            {/* CHART */}
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        {/* LINE GRADIENT */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.25} />
                                <stop offset="50%" stopColor="#34d399" stopOpacity={0.75} />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity={1} />
                            </linearGradient>
                        </defs>

                        {/* GRID (lighter) */}
                        <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" opacity={0.1} />

                        {/* AXIS */}
                        <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} dy={8} />

                        <YAxis width={25} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />

                        {/* TOOLTIP */}
                        <Tooltip content={<TooltipBox />} />

                        {/* LINE */}
                        {activeCategory && (
                            <Line
                                type="monotone"
                                dataKey={activeCategory}
                                stroke="url(#lineGradient)"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
