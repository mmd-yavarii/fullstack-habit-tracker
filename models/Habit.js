import { categories, habitColors } from '@/helper/helper';
import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 300,
            default: '',
        },

        category: {
            type: String,
            required: true,
            enum: categories.map((i) => i.value),
        },

        // حذف کردن عادت و ارشیو کردن ان برای گزارش گیری
        isArchived: {
            type: Boolean,
            default: false,
        },

        // // هدف هر روز عادت برای برسی رسیدن یا رد کردن
        // target: {
        //     value: Number,
        //     unit: {
        //         type: String,
        //         enum: ['minute', 'hour', 'liter', 'page', 'count'],
        //     },
        // },

        // // نوع انجام عادت مثلا نوشیدن اب مقدار است و درس خواندن زمان
        // targetType: {
        //     type: String,
        //     enum: ['boolean', 'duration', 'count'],
        //     default: 'boolean',
        // },

        importance: {
            type: String,
            enum: ['A', 'B', 'C', 'D'],
            default: 'C',
            required: true,
            index: true,
        },

        color: {
            type: String,
            enum: habitColors.map((i) => i.value),
            default: '#3b82f6',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Habit || mongoose.model('Habit', habitSchema);
