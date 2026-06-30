import HabitCard from '@/components/HabitCard';
import GroupPrgChart from '@/components/groupPrgChart';

const habits = [
    {
        _id: 1123123,
        title: 'React Study',
        category: 'programming',
        duration: '60 minutes',
        color: '#3b82f6',
        logs: [
            // ---- OLD (April - outside 30 days) ----
            { date: '2026-04-25', isCompleted: true, value: 2 },
            { date: '2026-04-26', isCompleted: false, value: 0 },
            { date: '2026-04-27', isCompleted: true, value: 3 },
            { date: '2026-04-28', isCompleted: true, value: 2 },
            { date: '2026-04-29', isCompleted: false, value: 0 },
            { date: '2026-04-30', isCompleted: true, value: 3 },

            // ---- MAIN (May) ----
            { date: '2026-05-03', isCompleted: false, value: 0 },
            { date: '2026-05-04', isCompleted: true, value: 3 },
            { date: '2026-05-05', isCompleted: true, value: 2 },
            { date: '2026-05-06', isCompleted: false, value: 0 },
            { date: '2026-05-07', isCompleted: true, value: 4 },
            { date: '2026-05-08', isCompleted: true, value: 3 },
            { date: '2026-05-09', isCompleted: false, value: 0 },
            { date: '2026-05-10', isCompleted: true, value: 3 },
            { date: '2026-05-11', isCompleted: false, value: 0 },
            { date: '2026-05-12', isCompleted: true, value: 4 },
            { date: '2026-05-13', isCompleted: true, value: 3 },
            { date: '2026-05-14', isCompleted: true, value: 4 },
            { date: '2026-05-15', isCompleted: false, value: 0 },
            { date: '2026-05-16', isCompleted: true, value: 2 },
            { date: '2026-05-17', isCompleted: false, value: 0 },
            { date: '2026-05-18', isCompleted: true, value: 4 },
            { date: '2026-05-19', isCompleted: true, value: 3 },
            { date: '2026-05-20', isCompleted: false, value: 0 },
            { date: '2026-05-21', isCompleted: true, value: 4 },
            { date: '2026-05-22', isCompleted: true, value: 5 },
            { date: '2026-05-23', isCompleted: false, value: 0 },
            { date: '2026-05-24', isCompleted: true, value: 3 },
            { date: '2026-05-25', isCompleted: true, value: 2 },
            { date: '2026-05-26', isCompleted: false, value: 0 },
            { date: '2026-05-27', isCompleted: true, value: 4 },
            { date: '2026-05-28', isCompleted: true, value: 3 },
            { date: '2026-05-29', isCompleted: false, value: 0 },
            { date: '2026-05-30', isCompleted: true, value: 4 },
            { date: '2026-05-31', isCompleted: true, value: 3 },

            // ---- NEW (June - inside last 30 days) ----
            { date: '2026-06-01', isCompleted: true, value: 4 },
            { date: '2026-06-02', isCompleted: false, value: 0 },
            { date: '2026-06-03', isCompleted: true, value: 3 },
            { date: '2026-06-04', isCompleted: true, value: 4 },
            { date: '2026-06-05', isCompleted: false, value: 0 },
            { date: '2026-06-06', isCompleted: true, value: 3 },
            { date: '2026-06-07', isCompleted: true, value: 4 },
            { date: '2026-06-08', isCompleted: false, value: 0 },
            { date: '2026-06-09', isCompleted: true, value: 5 },
            { date: '2026-06-10', isCompleted: true, value: 4 },
        ],
    },

    {
        _id: 11231233,
        title: 'Workout',
        category: 'fitness',
        duration: '45 minutes',
        color: '#c52279',
        logs: [
            { date: '2026-04-25', isCompleted: true, value: 2 },
            { date: '2026-04-26', isCompleted: false, value: 0 },
            { date: '2026-04-27', isCompleted: true, value: 3 },
            { date: '2026-04-28', isCompleted: true, value: 2 },
            { date: '2026-04-29', isCompleted: false, value: 0 },
            { date: '2026-04-30', isCompleted: true, value: 3 },

            // May (shortened in your style for readability but still mixed)
            { date: '2026-05-03', isCompleted: true, value: 2 },
            { date: '2026-05-04', isCompleted: true, value: 3 },
            { date: '2026-05-05', isCompleted: false, value: 0 },
            { date: '2026-05-06', isCompleted: true, value: 2 },
            { date: '2026-05-07', isCompleted: false, value: 0 },
            { date: '2026-05-08', isCompleted: true, value: 3 },
            { date: '2026-05-09', isCompleted: true, value: 3 },
            { date: '2026-05-10', isCompleted: false, value: 0 },
            { date: '2026-05-11', isCompleted: true, value: 4 },
            { date: '2026-05-12', isCompleted: false, value: 0 },
            { date: '2026-05-13', isCompleted: true, value: 3 },
            { date: '2026-05-14', isCompleted: true, value: 4 },
            { date: '2026-05-15', isCompleted: true, value: 5 },
            { date: '2026-05-16', isCompleted: false, value: 0 },
            { date: '2026-05-17', isCompleted: true, value: 3 },
            { date: '2026-05-18', isCompleted: true, value: 4 },
            { date: '2026-05-19', isCompleted: false, value: 0 },
            { date: '2026-05-20', isCompleted: true, value: 3 },
            { date: '2026-05-21', isCompleted: true, value: 4 },
            { date: '2026-05-22', isCompleted: false, value: 0 },
            { date: '2026-05-23', isCompleted: true, value: 5 },
            { date: '2026-05-24', isCompleted: true, value: 4 },
            { date: '2026-05-25', isCompleted: false, value: 0 },
            { date: '2026-05-26', isCompleted: true, value: 4 },
            { date: '2026-05-27', isCompleted: true, value: 5 },
            { date: '2026-05-28', isCompleted: false, value: 0 },
            { date: '2026-05-29', isCompleted: true, value: 3 },
            { date: '2026-05-30', isCompleted: true, value: 4 },
            { date: '2026-05-31', isCompleted: true, value: 5 },

            // June
            { date: '2026-06-01', isCompleted: true, value: 4 },
            { date: '2026-06-02', isCompleted: false, value: 0 },
            { date: '2026-06-03', isCompleted: true, value: 4 },
            { date: '2026-06-04', isCompleted: true, value: 5 },
            { date: '2026-06-05', isCompleted: false, value: 0 },
            { date: '2026-06-06', isCompleted: true, value: 4 },
            { date: '2026-06-07', isCompleted: true, value: 5 },
        ],
    },

    {
        _id: 342434,
        title: 'English',
        category: 'language',
        duration: '30 minutes',
        color: '#f59e0b',
        logs: [
            { date: '2026-04-25', isCompleted: true, value: 1 },
            { date: '2026-04-26', isCompleted: false, value: 0 },
            { date: '2026-04-27', isCompleted: true, value: 2 },
            { date: '2026-04-28', isCompleted: true, value: 1 },
            { date: '2026-04-29', isCompleted: false, value: 0 },
            { date: '2026-04-30', isCompleted: true, value: 2 },

            // May
            { date: '2026-05-03', isCompleted: false, value: 0 },
            { date: '2026-05-04', isCompleted: true, value: 1 },
            { date: '2026-05-05', isCompleted: true, value: 2 },
            { date: '2026-05-06', isCompleted: false, value: 0 },
            { date: '2026-05-07', isCompleted: true, value: 2 },
            { date: '2026-05-08', isCompleted: true, value: 3 },
            { date: '2026-05-09', isCompleted: false, value: 0 },
            { date: '2026-05-10', isCompleted: true, value: 2 },
            { date: '2026-05-11', isCompleted: true, value: 3 },
            { date: '2026-05-12', isCompleted: false, value: 0 },
            { date: '2026-05-13', isCompleted: true, value: 2 },
            { date: '2026-05-14', isCompleted: true, value: 3 },
            { date: '2026-05-15', isCompleted: false, value: 0 },
            { date: '2026-05-16', isCompleted: true, value: 2 },
            { date: '2026-05-17', isCompleted: true, value: 3 },
            { date: '2026-05-18', isCompleted: false, value: 0 },
            { date: '2026-05-19', isCompleted: true, value: 2 },
            { date: '2026-05-20', isCompleted: true, value: 3 },
            { date: '2026-05-21', isCompleted: false, value: 0 },
            { date: '2026-05-22', isCompleted: true, value: 3 },
            { date: '2026-05-23', isCompleted: true, value: 4 },
            { date: '2026-05-24', isCompleted: false, value: 0 },
            { date: '2026-05-25', isCompleted: true, value: 3 },
            { date: '2026-05-26', isCompleted: true, value: 3 },
            { date: '2026-05-27', isCompleted: false, value: 0 },
            { date: '2026-05-28', isCompleted: true, value: 4 },
            { date: '2026-05-29', isCompleted: true, value: 3 },
            { date: '2026-05-30', isCompleted: false, value: 0 },
            { date: '2026-05-31', isCompleted: true, value: 4 },

            // June
            { date: '2026-06-01', isCompleted: true, value: 4 },
            { date: '2026-06-02', isCompleted: true, value: 3 },
            { date: '2026-06-03', isCompleted: false, value: 0 },
            { date: '2026-06-04', isCompleted: true, value: 4 },
            { date: '2026-06-05', isCompleted: true, value: 3 },
        ],
    },
];

export default function Home() {
    return (
        <main className="min-h-screen px-4 text-white">
            {/* Header */}
            <header className="pt-20 pb-6">
                <h1 className="text-4xl font-bold tracking-tight">HabitFlow</h1>

                <p className="mt-2 text-slate-400">Build consistency every day</p>
            </header>

            {/* Chart */}
            <section className="mt-6">
                <GroupPrgChart habits={habits} />
            </section>

            {/* Habits */}
            <section className="mt-10 pb-32">
                <h2 className="mb-4 text-xl font-semibold text-white/90">Today's Habits</h2>

                <div className="space-y-4">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit._id}
                            logs={habit.logs}
                            color={habit.color}
                            title={habit.title}
                            duration={habit.duration}
                            _id={habit._id}
                            onDone={() => console.log('done', habit.title)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
