'use client';

import React, { useState } from 'react';
import axios from 'axios';

const colors = ['#ff0033', '#ff1744', '#ff4081', '#ff00ff', '#7c00ff', '#a100ff', '#651fff', '#d500f9', '#00e5ff', '#00b0ff', '#18ffff'];

const glassInput =
    'w-full p-3 rounded-xl text-white placeholder-slate-400 ' +
    'bg-white/[0.04] border border-white/[0.06] ' +
    'backdrop-blur-xl backdrop-saturate-150 ' +
    'shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),_0_8px_30px_rgba(0,0,0,0.35)] ' +
    'transition duration-300 outline-none ' +
    'focus:bg-white/[0.06] ' +
    'focus:border-fuchsia-400/40 ' +
    'focus:shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_0_0_1px_rgba(168,85,247,0.25),_0_10px_40px_rgba(168,85,247,0.15)]';

function AddHabit() {
    const initialState = {
        title: '',
        description: '',
        category: 'programming',
        importance: 'C',
        color: '#ff0033',
    };

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // submit handeler
    const handleSubmit = async () => {
        if (!form.title.trim()) {
            alert('Title is required');
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post('/api/habits/create', form);

            if (data.success) {
                setForm(initialState);

                alert('Habit created successfully');
            }
        } catch (error) {
            console.error(error);

            alert(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 pt-20 flex justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white">Create Habit</h1>

                    <p className="text-sm text-slate-400 mt-1">Build a new habit and track your progress</p>
                </div>

                {/* Card */}
                <div
                    className="
                    rounded-2xl p-6 space-y-4
                    bg-white/[0.03]
                    border border-white/[0.06]
                    backdrop-blur-2xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                "
                >
                    {/* Title */}
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Habit title" className={glassInput} />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                        className={`${glassInput} min-h-[90px] resize-none`}
                    />

                    {/* Category */}
                    <select name="category" value={form.category} onChange={handleChange} className={`${glassInput} appearance-none`}>
                        <option value="programming">Programming</option>
                        <option value="language">Language</option>
                        <option value="fitness">Fitness</option>
                        <option value="reading">Reading</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>

                    {/* Importance */}
                    <select name="importance" value={form.importance} onChange={handleChange} className={`${glassInput} appearance-none`}>
                        <option value="A">A - Critical</option>
                        <option value="B">B - Important</option>
                        <option value="C">C - Normal</option>
                        <option value="D">D - Low</option>
                    </select>

                    {/* Color Picker */}
                    <div>
                        <p className="text-sm text-slate-300 mb-2">Pick color</p>

                        <div className="flex flex-wrap gap-3">
                            {colors.map((c) => {
                                const active = form.color === c;

                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                color: c,
                                            }))
                                        }
                                        className={`
                                            relative
                                            w-8 h-8 rounded-full
                                            transition-all duration-300
                                            ${active ? 'scale-125' : 'opacity-80 hover:opacity-100'}
                                        `}
                                        style={{
                                            backgroundColor: c,
                                            boxShadow: active ? `0 0 25px ${c}cc, 0 0 60px ${c}66` : `0 0 12px ${c}55`,
                                        }}
                                    >
                                        {active && <span className="absolute inset-0 rounded-full border-2 border-white" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
                            w-full py-3 rounded-2xl
                            font-semibold text-white

                            bg-white/[0.04]
                            border border-white/[0.08]

                            backdrop-blur-2xl

                            shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_15px_60px_rgba(0,0,0,0.6)]

                            transition-all

                            hover:bg-white/[0.06]
                            active:scale-[0.98]

                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? 'Creating...' : 'Create Habit'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddHabit;
