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
            enum: ['programming', 'language', 'fitness', 'reading', 'health', 'other'],
        },

        importance: {
            type: String,
            enum: ['A', 'B', 'C', 'D'],
            default: 'C',
            required: true,
            index: true,
        },

        color: {
            type: String,
            default: '#3b82f6',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Habit || mongoose.model('Habit', habitSchema);
