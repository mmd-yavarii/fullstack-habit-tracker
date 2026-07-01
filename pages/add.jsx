import React, { useState } from 'react';

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
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'programming',
        importance: 'C',
        color: '#ff0033',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        const payload = {
            ...form,
            duration: Number(form.duration),
            deadline: form.deadline ? new Date(form.deadline) : null,
        };

        console.log(payload);
    };

    return (
        <div className="min-h-screen p-4 pt-20 flex justify-center">
            <div className="w-full max-w-md">
                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white">Create Habit</h1>
                    <p className="text-sm text-slate-400 mt-1">Build a new habit and track your progress</p>
                </div>

                {/* CARD */}
                <div
                    className="
                    rounded-2xl p-6 space-y-4
                    bg-white/[0.03]
                    border border-white/[0.06]
                    backdrop-blur-2xl
                    shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                "
                >
                    {/* TITLE */}
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Habit title" className={glassInput} />

                    {/* DESCRIPTION */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                        className={glassInput + ' min-h-[90px] resize-none'}
                    />

                    {/* CATEGORY */}
                    <select name="category" value={form.category} onChange={handleChange} className={glassInput + ' appearance-none'}>
                        <option value="programming">Programming</option>
                        <option value="language">Language</option>
                        <option value="fitness">Fitness</option>
                        <option value="reading">Reading</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>

                    {/* IMPORTANCE */}
                    <select name="importance" value={form.importance} onChange={handleChange} className={glassInput + ' appearance-none'}>
                        <option value="A">A - Critical</option>
                        <option value="B">B - Important</option>
                        <option value="C">C - Normal</option>
                        <option value="D">D - Low</option>
                    </select>

                    {/* COLOR PICKER */}
                    <div>
                        <p className="text-sm text-slate-300 mb-2">Pick color</p>

                        <div className="flex flex-wrap gap-3">
                            {colors.map((c) => {
                                const isActive = form.color === c;

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
                                            relative w-8 h-8 rounded-full transition duration-300
                                            ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100'}
                                        `}
                                        style={{
                                            backgroundColor: c,
                                            boxShadow: isActive ? `0 0 22px ${c}cc, 0 0 50px ${c}55` : `inset 0 2px 4px rgba(255,255,255,0.1)`,
                                        }}
                                    >
                                        {/* ring */}
                                        {isActive && <span className="absolute inset-0 rounded-full border-2 border-white/90" />}

                                        {/* center dot */}
                                        {isActive && <span className="absolute inset-0 flex items-center justify-center"></span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        onClick={handleSubmit}
                        className="
                            w-full py-3 rounded-2xl font-semibold text-white

                            bg-white/[0.04]
                            border border-white/[0.08]

                            backdrop-blur-2xl

                            shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_15px_60px_rgba(0,0,0,0.6)]

                            transition
                            hover:bg-white/[0.06]
                            active:scale-[0.98]
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
