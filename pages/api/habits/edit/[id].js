import connectDB from '@/lib/connectDB';
import Habit from '@/models/Habit';

export default async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    // GET single habit
    if (req.method === 'GET') {
        try {
            const habit = await Habit.findById(id);

            if (!habit) {
                return res.status(404).json({
                    success: false,
                    message: 'Habit not found',
                });
            }

            return res.status(200).json({
                success: true,
                habit,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    }

    // UPDATE habit
    if (req.method === 'PUT') {
        try {
            const habit = await Habit.findById(id);

            if (!habit) {
                return res.status(404).json({
                    success: false,
                    message: 'Habit not found',
                });
            }

            const { title, description, category, importance, color } = req.body;

            habit.title = title ?? habit.title;
            habit.description = description ?? habit.description;
            habit.category = category ?? habit.category;
            habit.importance = importance ?? habit.importance;
            habit.color = color ?? habit.color;

            const updated = await habit.save();

            return res.status(200).json({
                success: true,
                habit: updated,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    }

    return res.status(405).json({
        success: false,
        message: 'Method not allowed',
    });
}
