import { failureReasons } from '@/helper/helper';
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
    {
        habitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit',
            required: true,
            index: true,
        },

        date: {
            type: Date,
            required: true,
            index: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        value: {
            type: Number,
            default: 0,
            min: 0,
        },

        // دلیل شکست برای امار گرفتن
        failureReason: {
            type: String,
            enum: failureReasons.map((item) => item.value),
            default: 'none',
        },

        // توضیحات دلیل شکست
        failureNote: {
            type: String,
            trim: true,
            maxlength: 300,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

logSchema.index({ habitId: 1, date: 1 }, { unique: true });

export default mongoose.models.Log || mongoose.model('Log', logSchema);
