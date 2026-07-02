'use client';

import { useMemo, useState } from 'react';
import Heatmap from './Heatmap';
import Link from 'next/link';
import { RiDeleteBin6Line, RiCloseLargeLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';

export default function HabitCard({ _id, color, title, logs = [], onDone, onDelete }) {
    const [loading, setLoading] = useState(false);

    // =========================
    // DATE HELPERS
    // =========================
    const normalizeDate = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.toISOString().slice(0, 10);
    };

    const todayKey = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d.toISOString().slice(0, 10);
    }, []);

    // =========================
    // DONE STATUS
    // =========================
    const isDone = useMemo(() => {
        return logs.some((l) => normalizeDate(l.date) === todayKey && l.isCompleted === true);
    }, [logs, todayKey]);

    // =========================
    // DONE TOGGLE
    // =========================
    const handleDone = async () => {
        if (loading) return;

        setLoading(true);

        try {
            await onDone(_id);
        } catch (err) {
            console.error('Done failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // DELETE HABIT
    // =========================
    const handleDelete = async () => {
        if (loading) return;

        const ok = confirm('Delete this habit?');
        if (!ok) return;

        setLoading(true);

        try {
            await onDelete(_id);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // STREAK
    // =========================
    function getCurrentStreak(logs) {
        if (!logs?.length) return 0;

        const doneDays = logs
            .filter((l) => l.isCompleted)
            .map((l) => new Date(l.date))
            .sort((a, b) => b - a);

        if (!doneDays.length) return 0;

        let streak = 1;

        for (let i = 0; i < doneDays.length - 1; i++) {
            const diff = (doneDays[i] - doneDays[i + 1]) / (1000 * 60 * 60 * 24);

            if (diff === 1) streak++;
            else break;
        }

        return streak;
    }

    // =========================
    // HEATMAP
    // =========================
    function buildLast30Days(logs) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

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
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-[18px] text-white">{title}</h3>
                    <div className="text-xs text-slate-400">🔥 streak: {streak} days</div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                    {/* DONE */}
                    <button
                        onClick={handleDone}
                        disabled={loading}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                        {isDone ? <RiCloseLargeLine /> : <FaCheck />}
                    </button>

                    {/* EDIT */}
                    <Link
                        href={`/edit-habit/${_id}`}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-blue-500/10"
                    >
                        <FiEdit3 />
                    </Link>

                    {/* DELETE */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-red-500/10"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>

            {/* HEATMAP */}
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
