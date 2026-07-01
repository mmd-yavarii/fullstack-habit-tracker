'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            await new Promise((r) => setTimeout(r, 1200));

            // اینجا API واقعی:
            // await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ email }) })

            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center text-white px-4">
            <div className="w-full max-w-md rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[50px] shadow-[0_30px_120px_rgba(0,0,0,0.7)] p-7 space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">Forgot password</h1>
                    <p className="text-sm text-slate-400 mt-1">We will send a verification code to your email</p>
                </div>

                {!sent ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-400">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-[#c52279]/50"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition"
                        >
                            {loading ? 'Sending OTP...' : 'Send code'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="text-sm text-green-400">OTP sent successfully ✔</div>

                        <Link
                            href={`/verify-otp?email=${email}`}
                            className="block text-center py-3 rounded-2xl bg-[#c52279]/20 border border-[#c52279]/30 hover:bg-[#c52279]/30 transition"
                        >
                            Go to verification
                        </Link>
                    </div>
                )}

                <div className="text-xs text-center text-slate-500">
                    <Link href="/auth/login" className="hover:text-white underline underline-offset-4">
                        Back to login
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ForgotPassword;
