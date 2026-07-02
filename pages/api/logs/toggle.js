import connectDB from '@/lib/connectDB';
import Log from '@/models/Log';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed',
        });
    }

    try {
        await connectDB();

        const { habitId, date } = req.body;

        if (!habitId || !date) {
            return res.status(400).json({
                success: false,
                message: 'habitId and date are required',
            });
        }

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        // 1. check exists
        const existing = await Log.findOne({
            habitId,
            date: normalizedDate,
        });

        // 2. if exists → delete (toggle off)
        if (existing) {
            await Log.deleteOne({ _id: existing._id });

            return res.status(200).json({
                success: true,
                action: 'deleted',
            });
        }

        // 3. if not exists → create (toggle on)
        const newLog = await Log.create({
            habitId,
            date: normalizedDate,
            isCompleted: true,
        });

        return res.status(201).json({
            success: true,
            action: 'created',
            data: newLog,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
