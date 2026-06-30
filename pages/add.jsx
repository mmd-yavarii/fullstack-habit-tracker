import React, { useState } from 'react';

function AddHabit() {
    const [form, setForm] = useState({
        title: '',
        category: 'programming',
        duration: '',
        color: '#3b82f6',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(form);
    };

    return (
        <div className="min-h-screen p-4 pt-20 flex justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white">Create Habit</h1>

                    <p className="mt-1 text-sm text-slate-400">Build a new habit and track your progress</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl shadow-xl p-6 space-y-5">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Habit title"
                        className="
                            w-full p-3 rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            placeholder-gray-400
                            outline-none
                            focus:border-blue-400
                            transition
                        "
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="
                            w-full p-3 rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            outline-none
                            focus:border-blue-400
                            transition
                        "
                    >
                        <option value="programming">Programming</option>
                        <option value="fitness">Fitness</option>
                        <option value="language">Language</option>
                    </select>

                    <input
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 60 min)"
                        className="
                            w-full p-3 rounded-xl
                            bg-white/5
                            border border-white/10
                            text-white
                            placeholder-gray-400
                            outline-none
                            focus:border-blue-400
                            transition
                        "
                    />

                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            className="w-10 h-10 cursor-pointer bg-transparent"
                        />

                        <span className="text-sm text-slate-300">Pick color</span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="
                            w-full py-3 rounded-xl
                            font-semibold text-white
                            bg-gradient-to-r
                            from-blue-500
                            to-purple-600
                            hover:opacity-90
                            active:scale-[0.98]
                            transition
                        "
                    >
                        Create Habit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddHabit;
