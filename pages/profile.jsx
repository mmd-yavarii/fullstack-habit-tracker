'use client';

import Heatmap from '@/components/Heatmap';
import React from 'react';

const user = {
    name: 'Ali Reza',
    username: 'alireza.dev',
    bio: 'Building consistency every day. Focused on 1% improvement.',
    location: 'Tehran, Iran',
    joined: 'Jan 2024',
    avatar: 'https://i.pravatar.cc/150?img=12',
    stats: {
        posts: 128,
        followers: '2.4K',
        following: 180,
        streak: 94,
    },
};

function Stat({ label, value }) {
    return (
        <div className="text-center py-3">
            <div className="text-lg font-semibold">{value}</div>
            <div className="text-xs text-white/40">{label}</div>
        </div>
    );
}

export default function Profile() {
    return (
        <div className="min-h-screen text-white px-6 py-12 flex justify-center">
            <div className="w-full max-w-5xl space-y-8">
                {/* HEADER */}
                <div
                    className="
                    relative overflow-hidden rounded-3xl
                    border border-white/10
                    bg-white/[0.04]
                    backdrop-blur-2xl
                    shadow-[0_30px_120px_-50px_rgba(0,0,0,0.8)]
                    p-6
                "
                >
                    <div className="flex gap-5 items-center">
                        <img src={user.avatar} className="w-16 h-16 rounded-2xl ring-2 ring-white/10 shadow-lg" />

                        <div className="flex-1">
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                            <p className="text-sm text-white/50">@{user.username}</p>
                            <p className="text-sm text-white/60 mt-2 max-w-md">{user.bio}</p>

                            <div className="flex gap-2 mt-3 text-xs text-white/40">
                                <span>{user.location}</span>
                                <span>•</span>
                                <span>{user.joined}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="
                        mt-6 grid grid-cols-3
                        divide-x divide-white/10
                        rounded-2xl
                        bg-white/[0.02]
                        backdrop-blur-xl
                        border border-white/10
                    "
                    >
                        <Stat label="Posts" value={user.stats.posts} />
                        <Stat label="Followers" value={user.stats.followers} />
                        <Stat label="Following" value={user.stats.following} />
                    </div>
                </div>

                {/* STREAK */}
                <div
                    className="
                    relative overflow-hidden rounded-3xl
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-2xl
                    shadow-[0_30px_120px_-55px_rgba(0,0,0,0.85)]
                    p-6
                "
                >
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-xs text-white/40">Current streak</div>
                            <div className="text-4xl font-semibold text-pink-400">
                                {user.stats.streak}
                                <span className="text-sm text-white/40 ml-2">days</span>
                            </div>
                        </div>

                        <div className="text-xs text-white/40">momentum: +12% this month</div>
                    </div>

                    <div className="mt-5 h-[1px] bg-gradient-to-r from-pink-500/30 via-white/10 to-transparent" />
                </div>

                {/* HEATMAP (ONLY REAL ONE) */}
                <div
                    className="
                    relative overflow-hidden rounded-3xl
                    border border-white/10
                    bg-white/[0.02]
                    backdrop-blur-xl
                    p-6
                "
                >
                    <div className="flex justify-between mb-4">
                        <h2 className="text-sm text-white/70">Activity</h2>
                        <span className="text-xs text-white/40">365 days</span>
                    </div>

                    <Heatmap
                        cellCount={365}
                        cellSize={15}
                        gap={3}
                        values={[
                            { date: '2026-06-01', isCompleted: true, value: 1 },
                            { date: '2026-06-02', isCompleted: false, value: 0 },
                            { date: '2026-06-03', isCompleted: true, value: 3 },
                            { date: '2026-06-04', isCompleted: true, value: 5 },
                            { date: '2026-06-05', isCompleted: false, value: 0 },
                        ]}
                        colors={{
                            empty: 'rgba(255,255,255,0.06)',
                            base: 'rgb(236,72,153)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
