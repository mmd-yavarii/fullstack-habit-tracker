import { FaFire, FaSnowflake } from 'react-icons/fa';

function normalize(date) {
    return new Date(date).toISOString().slice(0, 10);
}

function getLast7Days() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        days.push(d);
    }

    return days;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function WeekStreak({ habits = [] }) {
    const week = getLast7Days();

    const map = new Map();

    habits.forEach((habit) => {
        habit.logs.forEach((log) => {
            map.set(normalize(log.date), !!log.isCompleted);
        });
    });

    return (
        <div className="flex gap-3 items-end">
            {week.map((dateObj) => {
                const dateKey = normalize(dateObj);
                const done = map.get(dateKey) || false;
                const isToday = normalize(new Date()) === dateKey;
                const dayName = weekDays[dateObj.getDay()];

                return (
                    <div key={dateKey} className="flex-1 flex flex-col items-center justify-center py-2 select-none relative">
                        {/* glow behind icon */}
                        <div
                            className={`
                                absolute
                                w-10 h-10
                                rounded-full
                                blur-2xl
                                transition-all
                                duration-300
                                opacity-40
                                ${done ? 'bg-fuchsia-500' : 'bg-slate-500'}
                            `}
                        />

                        {/* icon */}
                        <div className="relative z-10">
                            {done ? (
                                <FaFire className="text-fuchsia-400 text-lg drop-shadow-[0_0_12px_rgba(217,70,239,0.9)]" />
                            ) : (
                                <FaSnowflake className="text-slate-500 text-lg opacity-60" />
                            )}
                        </div>

                        {/* day label */}
                        <span
                            className={`
                                mt-1 text-[11px] relative z-10
                                transition
                                ${done ? 'text-fuchsia-200' : 'text-slate-500'}
                                ${isToday ? 'font-semibold' : ''}
                            `}
                        >
                            {dayName}
                        </span>

                        {/* today indicator (very subtle) */}
                        {isToday && <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-fuchsia-400 opacity-70" />}
                    </div>
                );
            })}
        </div>
    );
}
