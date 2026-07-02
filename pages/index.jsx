'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import HabitCard from '@/components/HabitCard';
import WeekStreak from '@/components/WeekStreak';
import GroupPrgChart from '@/components/groupPrgChart';

export default function Home() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHabits();
    }, []);

    // get all habits
    const getHabits = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get('/api/habits');

            setHabits(data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // add or delete log handeler
    const toggleLog = async (habitId) => {
        const today = new Date();

        const { data } = await axios.post('/api/logs/toggle', {
            habitId,
            date: today,
        });

        return data;
    };

    // delete habit handeler s
    const deleteHabit = async (id) => {
        try {
            await axios.delete(`/api/habits/delete/${id}`);

            setHabits((prev) => prev.filter((h) => h._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <main className="min-h-screen flex items-center justify-center text-white">Loading...</main>;
    }

    return (
        <main className="min-h-screen px-4 text-white">
            <header className="pt-20 mt-6">
                <WeekStreak habits={habits} />
            </header>

            <section className="mt-2">
                <h2 className="mb-4 text-xl font-semibold text-white/90">Group progress overview</h2>

                <GroupPrgChart habits={habits} />
            </section>

            <section className="mt-10 pb-32">
                <h2 className="mb-4 text-xl font-semibold text-white/90">Your Habits</h2>

                <div className="space-y-4">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit._id}
                            _id={habit._id}
                            title={habit.title}
                            color={habit.color}
                            logs={habit.logs || []}
                            onDone={toggleLog}
                            onDelete={deleteHabit}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
