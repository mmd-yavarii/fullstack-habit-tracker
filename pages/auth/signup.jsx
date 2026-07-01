'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.name) return;

        setLoading(true);

        try {
            await new Promise((r) => setTimeout(r, 1200));
            console.log('signup:', form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center text-white px-4 relative overflow-hidden">
            <div className="w-full max-w-md rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[50px] backdrop-saturate-[180%] shadow-[0_30px_120px_rgba(0,0,0,0.7)] p-7 space-y-6 relative overflow-hidden">
                {/* top line */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* glow */}
                <div className="absolute -top-20 left-1/2 h-40 w-60 -translate-x-1/2 bg-white/5 blur-3xl" />

                {/* header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
                    <p className="text-sm text-slate-400 mt-1">Start building your consistency today</p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    {/* name */}
                    <div>
                        <label className="text-xs text-slate-400">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Your name"
                            className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 outline-none transition focus:border-[#c52279]/50 focus:bg-white/[0.06]"
                        />
                    </div>

                    {/* email */}
                    <div>
                        <label className="text-xs text-slate-400">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 outline-none transition focus:border-[#c52279]/50 focus:bg-white/[0.06]"
                        />
                    </div>

                    {/* password */}
                    <div>
                        <label className="text-xs text-slate-400">Password</label>
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 outline-none transition focus:border-[#3c00ff]/50 focus:bg-white/[0.06]"
                        />
                    </div>

                    {/* button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            relative w-full py-3 mt-2

                            rounded-[28px]

                            border border-white/[0.08]
                            bg-white/[0.03]

                            backdrop-blur-[40px]
                            backdrop-saturate-[180%]

                            shadow-[0_10px_50px_rgba(0,0,0,0.45)]

                            overflow-hidden

                            transition-all duration-300
                            active:scale-95
                            hover:bg-white/[0.06]

                            ${loading ? 'opacity-60 cursor-not-allowed' : ''}
                        `}
                    >
                        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        <div className="absolute -top-10 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-[#c52279]/10 blur-2xl opacity-0 hover:opacity-100 transition" />

                        <span className="relative z-10 text-sm font-medium text-white/90 tracking-wide">
                            {loading ? 'Creating account...' : 'Sign up'}
                        </span>
                    </button>
                </form>

                {/* footer */}
                <div className="text-xs text-slate-500 text-center">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="
                            text-[#c52279]
                            font-medium
                            hover:text-[#ff4fa3]
                            transition
                            underline underline-offset-4
                        "
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Signup;
