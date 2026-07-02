import connectDB from '@/lib/connectDB';
import Habit from '@/models/Habit';
import Log from '@/models/Log';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const habits = await Habit.find().sort({ createdAt: -1 }).lean();

        const habitIds = habits.map((h) => h._id);

        const logs = await Log.find({
            habitId: { $in: habitIds },
        }).lean();

        const habitsWithLogs = habits.map((habit) => ({
            ...habit,
            logs: logs.filter((log) => log.habitId.toString() === habit._id.toString()),
        }));

        return res.status(200).json({
            success: true,
            data: habitsWithLogs,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
