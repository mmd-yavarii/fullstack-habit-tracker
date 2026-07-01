import React, { useState, useMemo } from 'react';
import Heatmap from '@/components/Heatmap';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/* ---------------- BUILD RANGE ---------------- */
function buildRange(logs, days = null) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const map = new Map();
    logs.forEach((l) => map.set(l.date, l));

    const result = [];

    const totalDays = days ?? 30; // default window

    for (let i = totalDays - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const key = d.toISOString().slice(0, 10);
        const log = map.get(key);

        result.push({
            date: key,
            value: log?.value ?? 0,
            isCompleted: log?.isCompleted ?? false,
        });
    }

    return result;
}

/* ---------------- MAIN ---------------- */
export default function Habit() {
    const [range, setRange] = useState(30);

    const data = {
        title: 'React Study',
        category: 'programming',
        duration: '60 minutes',
        color: '#3b82f6',
        logs: [
            { date: '2026-01-01', isCompleted: true, value: 3 },
            { date: '2026-01-02', isCompleted: true, value: 2 },
            { date: '2026-01-03', isCompleted: false, value: 0 },
            { date: '2026-01-04', isCompleted: true, value: 4 },
            { date: '2026-01-05', isCompleted: true, value: 3 },
            { date: '2026-01-06', isCompleted: false, value: 0 },
            { date: '2026-01-07', isCompleted: true, value: 2 },
            { date: '2026-01-08', isCompleted: true, value: 3 },
            { date: '2026-01-09', isCompleted: false, value: 0 },
            { date: '2026-01-10', isCompleted: true, value: 4 },

            { date: '2026-02-01', isCompleted: true, value: 3 },
            { date: '2026-02-02', isCompleted: false, value: 0 },
            { date: '2026-02-03', isCompleted: true, value: 2 },
            { date: '2026-02-04', isCompleted: true, value: 4 },
            { date: '2026-02-05', isCompleted: true, value: 3 },
            { date: '2026-02-06', isCompleted: false, value: 0 },
            { date: '2026-02-07', isCompleted: true, value: 2 },
            { date: '2026-02-08', isCompleted: true, value: 3 },
            { date: '2026-02-09', isCompleted: false, value: 0 },
            { date: '2026-02-10', isCompleted: true, value: 4 },

            { date: '2026-03-01', isCompleted: true, value: 4 },
            { date: '2026-03-02', isCompleted: true, value: 3 },
            { date: '2026-03-03', isCompleted: false, value: 0 },
            { date: '2026-03-04', isCompleted: true, value: 2 },
            { date: '2026-03-05', isCompleted: true, value: 3 },
            { date: '2026-03-06', isCompleted: false, value: 0 },
            { date: '2026-03-07', isCompleted: true, value: 4 },
            { date: '2026-03-08', isCompleted: true, value: 3 },
            { date: '2026-03-09', isCompleted: false, value: 0 },
            { date: '2026-03-10', isCompleted: true, value: 2 },

            { date: '2026-04-01', isCompleted: true, value: 3 },
            { date: '2026-04-02', isCompleted: false, value: 0 },
            { date: '2026-04-03', isCompleted: true, value: 4 },
            { date: '2026-04-04', isCompleted: true, value: 2 },
            { date: '2026-04-05', isCompleted: true, value: 3 },
            { date: '2026-04-06', isCompleted: false, value: 0 },
            { date: '2026-04-07', isCompleted: true, value: 4 },
            { date: '2026-04-08', isCompleted: true, value: 3 },
            { date: '2026-04-09', isCompleted: false, value: 0 },
            { date: '2026-04-10', isCompleted: true, value: 2 },

            { date: '2026-05-01', isCompleted: true, value: 5 },
            { date: '2026-05-02', isCompleted: true, value: 4 },
            { date: '2026-05-03', isCompleted: false, value: 0 },
            { date: '2026-05-04', isCompleted: true, value: 3 },
            { date: '2026-05-05', isCompleted: true, value: 2 },
            { date: '2026-05-06', isCompleted: false, value: 0 },
            { date: '2026-05-07', isCompleted: true, value: 4 },
            { date: '2026-05-08', isCompleted: true, value: 3 },
            { date: '2026-05-09', isCompleted: false, value: 0 },
            { date: '2026-05-10', isCompleted: true, value: 2 },

            { date: '2026-06-01', isCompleted: true, value: 3 },
            { date: '2026-06-02', isCompleted: false, value: 0 },
            { date: '2026-06-03', isCompleted: true, value: 2 },
            { date: '2026-06-04', isCompleted: true, value: 4 },
            { date: '2026-06-05', isCompleted: false, value: 0 },
            { date: '2026-06-06', isCompleted: true, value: 3 },
            { date: '2026-06-07', isCompleted: true, value: 4 },
            { date: '2026-06-08', isCompleted: false, value: 0 },
            { date: '2026-06-09', isCompleted: true, value: 2 },
            { date: '2026-06-10', isCompleted: true, value: 3 },

            { date: '2026-07-01', isCompleted: true, value: 4 },
            { date: '2026-07-02', isCompleted: false, value: 0 },
            { date: '2026-07-03', isCompleted: true, value: 3 },
            { date: '2026-07-04', isCompleted: true, value: 2 },
            { date: '2026-07-05', isCompleted: true, value: 4 },
            { date: '2026-07-06', isCompleted: false, value: 0 },
            { date: '2026-07-07', isCompleted: true, value: 3 },
            { date: '2026-07-08', isCompleted: true, value: 2 },
            { date: '2026-07-09', isCompleted: false, value: 0 },
            { date: '2026-07-10', isCompleted: true, value: 4 },

            { date: '2026-08-01', isCompleted: true, value: 3 },
            { date: '2026-08-02', isCompleted: false, value: 0 },
            { date: '2026-08-03', isCompleted: true, value: 2 },
            { date: '2026-08-04', isCompleted: true, value: 4 },
            { date: '2026-08-05', isCompleted: true, value: 3 },
            { date: '2026-08-06', isCompleted: false, value: 0 },
            { date: '2026-08-07', isCompleted: true, value: 2 },
            { date: '2026-08-08', isCompleted: true, value: 3 },
            { date: '2026-08-09', isCompleted: false, value: 0 },
            { date: '2026-08-10', isCompleted: true, value: 4 },

            { date: '2026-09-01', isCompleted: true, value: 4 },
            { date: '2026-09-02', isCompleted: true, value: 3 },
            { date: '2026-09-03', isCompleted: false, value: 0 },
            { date: '2026-09-04', isCompleted: true, value: 2 },
            { date: '2026-09-05', isCompleted: true, value: 3 },
            { date: '2026-09-06', isCompleted: false, value: 0 },
            { date: '2026-09-07', isCompleted: true, value: 4 },
            { date: '2026-09-08', isCompleted: true, value: 3 },
            { date: '2026-09-09', isCompleted: false, value: 0 },
            { date: '2026-09-10', isCompleted: true, value: 2 },

            { date: '2026-10-01', isCompleted: true, value: 3 },
            { date: '2026-10-02', isCompleted: false, value: 0 },
            { date: '2026-10-03', isCompleted: true, value: 4 },
            { date: '2026-10-04', isCompleted: true, value: 2 },
            { date: '2026-10-05', isCompleted: true, value: 3 },
            { date: '2026-10-06', isCompleted: false, value: 0 },
            { date: '2026-10-07', isCompleted: true, value: 4 },
            { date: '2026-10-08', isCompleted: true, value: 3 },
            { date: '2026-10-09', isCompleted: false, value: 0 },
            { date: '2026-10-10', isCompleted: true, value: 2 },

            { date: '2026-11-01', isCompleted: true, value: 4 },
            { date: '2026-11-02', isCompleted: true, value: 3 },
            { date: '2026-11-03', isCompleted: false, value: 0 },
            { date: '2026-11-04', isCompleted: true, value: 2 },
            { date: '2026-11-05', isCompleted: true, value: 3 },
            { date: '2026-11-06', isCompleted: false, value: 0 },
            { date: '2026-11-07', isCompleted: true, value: 4 },
            { date: '2026-11-08', isCompleted: true, value: 3 },
            { date: '2026-11-09', isCompleted: false, value: 0 },
            { date: '2026-11-10', isCompleted: true, value: 2 },

            { date: '2026-12-01', isCompleted: true, value: 5 },
            { date: '2026-12-02', isCompleted: true, value: 4 },
            { date: '2026-12-03', isCompleted: false, value: 0 },
            { date: '2026-12-04', isCompleted: true, value: 3 },
            { date: '2026-12-05', isCompleted: true, value: 2 },
            { date: '2026-12-06', isCompleted: false, value: 0 },
            { date: '2026-12-07', isCompleted: true, value: 4 },
            { date: '2026-12-08', isCompleted: true, value: 3 },
            { date: '2026-12-09', isCompleted: false, value: 0 },
            { date: '2026-12-10', isCompleted: true, value: 2 },
        ],
    };

    /* ---------------- DERIVED DATA ---------------- */
    const chartData = useMemo(() => {
        return buildRange(data.logs, range);
    }, [range]);

    /* ---------------- KPI ---------------- */
    const completed = data.logs.filter((l) => l.isCompleted).length;
    const total = data.logs.length;
    const completionRate = total ? ((completed / total) * 100).toFixed(1) : 0;

    return (
        <div className="p-6 text-white space-y-6 my-20">
            {/* KPI SECTION */}
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-lg">
                    <p className="text-xs text-slate-400">Completion</p>
                    <p className="text-xl font-bold mt-1">{completionRate}%</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-lg">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-xl font-bold mt-1">{total}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-lg">
                    <p className="text-xs text-slate-400">Completed</p>
                    <p className="text-xl font-bold mt-1">{completed}</p>
                </div>
            </div>

            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
                <p className="text-slate-400 text-sm">
                    {data.category} • {data.duration}
                </p>
            </div>

            {/* FILTER */}
            <div className="flex flex-wrap gap-2">
                {[
                    { value: 7, label: 'Week' },
                    { value: 30, label: 'Month' },
                    { value: 90, label: '3 Months' },
                    { value: 365, label: 'Year' },
                ].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => setRange(item.value)}
                        className={`
                        px-4 py-2 rounded-xl text-sm border transition-all duration-200
                        ${range === item.value ? 'bg-white text-black shadow-md' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}
                    `}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* HEATMAP CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-lg">
                <Heatmap
                    cellCount={range}
                    cellSize={12}
                    gap={3}
                    values={chartData}
                    colors={{
                        empty: '#ffffff15',
                        base: data.color,
                    }}
                />
            </div>

            {/* LINE CHART CARD */}
            <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-4 shadow-lg h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} style={{ pointerEvents: 'none' }}>
                        <XAxis dataKey="date" hide />
                        <YAxis hide />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={data.color}
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
