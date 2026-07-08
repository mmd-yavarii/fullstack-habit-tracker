'use client';

import { TextField, MenuItem, Button, Stack, Box } from '@mui/material';

import { categories, habitColors } from '@/helper/helper';

const importanceOptions = [
    {
        value: 'A',
        label: 'خیلی مهم',
    },
    {
        value: 'B',
        label: 'مهم',
    },
    {
        value: 'C',
        label: 'معمولی',
    },
    {
        value: 'D',
        label: 'کم اهمیت',
    },
];

export default function AddNewHabitPage({ form, setForm, onSubmit }) {
    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={3}>
                <TextField
                    name="title"
                    label="نام عادت"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="مثلا مطالعه روزانه"
                    required
                    fullWidth
                />

                <TextField
                    name="description"
                    label="توضیحات"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="توضیح کوتاه درباره این عادت"
                    multiline
                    rows={4}
                    fullWidth
                />

                <TextField select name="category" label="دسته‌بندی" value={form.category} onChange={handleChange} required fullWidth>
                    {categories.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField select name="importance" label="اهمیت" value={form.importance} onChange={handleChange} fullWidth>
                    {importanceOptions.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField select name="color" label="رنگ عادت" value={form.color} onChange={handleChange} fullWidth>
                    {habitColors.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        backgroundColor: item.value,
                                    }}
                                />

                                {item.label}
                            </Box>
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit" variant="contained" size="large">
                    ایجاد عادت
                </Button>
            </Stack>
        </Box>
    );
}
