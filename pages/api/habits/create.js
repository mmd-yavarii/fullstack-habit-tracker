import connectDB from '@/lib/connectDB';
import Habit from '@/models/Habit';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const { title, description, category, importance, color } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title and category are required',
            });
        }

        const habit = await Habit.create({
            title,
            description,
            category,
            importance,
            color,
        });

        return res.status(201).json({
            success: true,
            message: 'Habit created successfully',
            data: habit,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
