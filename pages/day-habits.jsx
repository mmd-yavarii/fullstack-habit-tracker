import React from 'react';

function DayHabits() {
    return (
        <div className="min-h-screen p-4 pt-20">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Today's Habits</h1>

                    <p className="mt-1 text-slate-400">Track your daily progress</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl shadow-xl p-6">
                    <div className="text-slate-300">DayHabits</div>
                </div>
            </div>
        </div>
    );
}

export default DayHabits;
