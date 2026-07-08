'use client';

import AddNewHabitPage from '@/components/templates/AddNewHabitPage';
import { useState } from 'react';

export default function NewHabitPage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        importance: 'C',
        color: '#3b82f6',
    });

    // add new habit handeler
    function handleSubmit(e) {
        e.preventDefault();

        console.log(form);
    }

    return <AddNewHabitPage form={form} setForm={setForm} onSubmit={handleSubmit} />;
}
