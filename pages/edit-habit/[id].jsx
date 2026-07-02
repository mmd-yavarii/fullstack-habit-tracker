'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

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

export default function EditHabit() {
    const { id } = useParams();
    const router = useRouter();

    const initialState = {
        title: '',
        description: '',
        category: 'programming',
        importance: 'C',
        color: '#ff0033',
    };

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // GET data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/habits/edit/${id}`);

                if (data.success) {
                    setForm(data.habit);
                }
            } catch (err) {
                console.error(err);
                alert('Failed to load habit');
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.title.trim()) {
            return alert('Title is required');
        }

        try {
            setLoading(true);

            const { data } = await axios.put(`/api/habits/edit/${id}`, form);

            if (data.success) {
                alert('Updated successfully');
                router.push('/');
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="text-white p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen p-4 pt-20 flex justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-white">Edit Habit</h1>
                <p className="text-sm text-slate-400 mt-1">Update your habit</p>

                <div className="mt-6 rounded-2xl p-6 space-y-4 bg-white/[0.03] border border-white/[0.06] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                    <input name="title" value={form.title} onChange={handleChange} className={glassInput} placeholder="Habit title" />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`${glassInput} min-h-[90px] resize-none`}
                        placeholder="Description"
                    />

                    <select name="category" value={form.category} onChange={handleChange} className={`${glassInput} appearance-none`}>
                        <option value="programming">Programming</option>
                        <option value="language">Language</option>
                        <option value="fitness">Fitness</option>
                        <option value="reading">Reading</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>

                    <select name="importance" value={form.importance} onChange={handleChange} className={`${glassInput} appearance-none`}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <div className="flex flex-wrap gap-3">
                        {colors.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, color: c }))}
                                className={`w-8 h-8 rounded-full transition ${form.color === c ? 'scale-125' : 'opacity-70'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 rounded-2xl text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Habit'}
                    </button>
                </div>
            </div>
        </div>
    );
}
