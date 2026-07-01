import { useState } from 'react';
import Heatmap from './Heatmap';
import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';

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
                    <h3 className="font-semibold text-[18px] mb-1 text-white">{title}</h3>
                    <div className="text-xs text-slate-400">🔥 streak: {streak} days</div>
                </div>
                {/* Done Button */}

                <div className="flex gap-2 items-center">
                    <button
                        onClick={handleDone}
                        disabled={loading}
                        style={{ '--c': color }}
                        className={`
                        relative overflow-hidden
                        px-3.5 py-2
                        rounded-[32px]
                        border border-white/[0.08]
                        bg-white/[0.03]
                        backdrop-blur-[40px]
                        backdrop-saturate-[180%]
                        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                        transition-all duration-300
                        active:scale-95 hover:scale-[1.04]
                        ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                    >
                        {/* top shine (same system as header/footer/filter) */}
                        <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        {/* base glow */}
                        <div className="absolute inset-0 bg-white/5 opacity-20" />

                        {/* dynamic accent glow when done */}
                        <div
                            className={`
                                absolute -top-6 left-1/2 h-12 w-24 -translate-x-1/2
                                rounded-full blur-xl transition-opacity duration-300
                                ${isDone ? 'opacity-40' : 'opacity-0'}
                            `}
                            style={{ backgroundColor: 'var(--c)' }}
                        />

                        {/* text */}
                        <span
                            className={`
                                relative z-10 text-sm font-medium transition-colors duration-300
                                ${isDone ? 'text-white' : 'text-slate-300'}
                            `}
                            style={{
                                color: isDone ? '#ffffffbb' : undefined,
                            }}
                        >
                            {loading ? 'Saving...' : isDone ? 'Done ✓' : 'Mark Done'}
                        </span>

                        {/* border accent when done */}
                        <div
                            className={`
                                absolute inset-0 rounded-[32px] border transition-opacity duration-300
                                ${isDone ? 'opacity-100' : 'opacity-0'}
                            `}
                            style={{
                                borderColor: 'var(--c)',
                                opacity: isDone ? 0.4 : 0,
                            }}
                        />
                    </button>
                    <Link
                        href={`/${_id}`}
                        className="
                            relative inline-flex items-center justify-center

                            h-10 w-10

                            rounded-[32px]

                            border border-white/[0.08]
                            bg-white/[0.03]

                            backdrop-blur-[40px]
                            backdrop-saturate-[180%]

                            shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                            transition-all duration-300

                            hover:bg-white/[0.06]
                            hover:scale-105
                            hover:text-white
                        "
                    >
                        {/* top shine */}
                        <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        {/* icon */}
                        <HiOutlineChevronRight className="relative z-10 h-4 w-4 text-slate-300" />
                    </Link>
                </div>
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
        </div>
    );
}
