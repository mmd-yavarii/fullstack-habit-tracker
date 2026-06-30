import { useMemo } from 'react';

{
    /* <Heatmap
    cellCount={30}
    cellSize={10}
    gap={3}
    values={[
        { date: '2026-06-01', isCompleted: true, value: 1 },
        { date: '2026-06-02', isCompleted: false, value: 0 },
        { date: '2026-06-03', isCompleted: true, value: 3 },
        { date: '2026-06-04', isCompleted: true, value: 5 },
        { date: '2026-06-05', isCompleted: false, value: 0 },
    ]}
    colors={{
        empty: '#ffffff17',
        base: '#22c55e',
    }}
/>; */
}

export default function Heatmap({
    values = [],
    cellCount = 30,
    cellSize = 14,
    gap = 2,
    colors = {
        empty: '#1f2937',
        base: '#22c55e',
    },
}) {
    const map = useMemo(() => {
        const m = new Map();

        values.forEach((v) => {
            m.set(v.date, {
                isCompleted: v.isCompleted,
                value: v.value || 0,
            });
        });

        return m;
    }, [values]);

    const cells = useMemo(() => {
        const result = [];

        const dataArray = values.slice(-cellCount);
        // فقط آخرین N دیتا (اگر بیشتر بود truncate می‌کند)

        for (let i = 0; i < cellCount; i++) {
            const item = dataArray[i];

            if (!item) {
                result.push({
                    key: `empty-${i}`,
                    isCompleted: false,
                    value: 0,
                });
                continue;
            }

            result.push({
                key: item.date || i,
                isCompleted: item.isCompleted,
                value: item.value || 0,
            });
        }

        return result;
    }, [values, cellCount]);

    const getColor = (cell) => {
        // ❌ اگر کامل نشده → خیلی کم‌رنگ
        if (!cell.isCompleted) {
            return colors.empty;
        }

        // ✅ اگر کامل شده → شدت بر اساس value
        const intensity = Math.min(cell.value, 5);

        const opacityMap = {
            1: 0.3,
            2: 0.5,
            3: 0.7,
            4: 0.85,
            5: 1,
        };

        return `${colors.base}${Math.round((opacityMap[intensity] || 0.3) * 255).toString(16)}`;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap,
            }}
        >
            {cells.map((c, i) => (
                <div
                    key={c.key}
                    title={`${c.isCompleted ? 'Done' : 'Not done'} - value: ${c.value}`}
                    style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 4,
                        backgroundColor: getColor(c),
                        transition: 'all 0.2s',
                    }}
                />
            ))}
        </div>
    );
}
