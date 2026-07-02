import connectDB from '@/lib/connectDB';
import Habit from '@/models/Habit';

export default async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    if (req.method !== 'DELETE') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        const habit = await Habit.findById(id);

        if (!habit) {
            return res.status(404).json({
                success: false,
                message: 'Habit not found',
            });
        }

        await Habit.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Habit deleted successfully',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}
