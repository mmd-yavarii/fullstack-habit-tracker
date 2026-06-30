import { useState } from 'react';
import Heatmap from './Heatmap';
import Link from 'next/link';

export default function HabitCard({ _id, color, title, duration, onDone, logs = [] }) {
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDone = async () => {
        if (loading) return;

        setLoading(true);

        try {
            if (onDone) {
                await onDone(!isDone);
            }

            setIsDone((prev) => !prev);
        } catch (err) {
            console.error('Done action failed:', err);
        } finally {
            setLoading(false);
        }
    };

    function getCurrentStreak(logs) {
        if (!logs || logs.length === 0) return 0;

        // فقط completed ها
        const doneDays = logs
            .filter((l) => l.isCompleted)
            .map((l) => new Date(l.date))
            .sort((a, b) => b - a); // جدید به قدیم

        if (doneDays.length === 0) return 0;

        let streak = 1;

        for (let i = 0; i < doneDays.length - 1; i++) {
            const current = doneDays[i];
            const next = doneDays[i + 1];

            const diffDays = (current - next) / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    function buildLast30Days(logs) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // map برای دسترسی سریع
        const map = new Map();

        logs.forEach((l) => {
            const d = new Date(l.date);
            d.setHours(0, 0, 0, 0);

            map.set(d.getTime(), l);
        });

        const result = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const key = date.getTime();
            const log = map.get(key);

            result.push({
                date: date.toISOString().slice(0, 10),
                isCompleted: log?.isCompleted || false,
                value: log?.value || 0,
            });
        }

        return result;
    }

    const streak = getCurrentStreak(logs);
    const heatmapData = buildLast30Days(logs);

    return (
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5 space-y-4 mb-3">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-sm text-slate-400">{duration}</p>
                    <div className="text-xs text-slate-400">🔥 Current streak: {streak} days</div>
                </div>

                {/* Done Button */}
                <button
                    onClick={handleDone}
                    disabled={loading}
                    style={{ '--c': color }}
                    className={`
                        relative overflow-hidden px-4 py-2 rounded-xl text-sm font-medium
                        border transition-all duration-300
                        active:scale-95 hover:scale-[1.04]

                        ${isDone ? 'text-[var(--c)] border-[var(--c)]/30 bg-[var(--c)]/10' : 'text-slate-300 border-white/10 bg-white/5'}

                        ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                >
                    {/* Glow layer */}
                    <span className="absolute inset-0 bg-white/5 blur-xl opacity-30" />

                    <span className="relative z-10">{loading ? 'Saving...' : isDone ? 'Done ✓' : 'Mark Done'}</span>
                </button>
            </div>

            {/* Heatmap */}

            <Heatmap
                cellCount={30}
                cellSize={13}
                gap={3}
                values={heatmapData}
                colors={{
                    empty: '#ffffff17',
                    base: color,
                }}
            />

            <Link href={`/${_id}`}>show more info</Link>
        </div>
    );
}
