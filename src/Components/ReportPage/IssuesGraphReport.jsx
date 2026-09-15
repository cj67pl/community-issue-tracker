import { useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const dateRangeOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
    { value: "this_month", label: "This month" },
    { value: "last_month", label: "Last month" },
    { value: "this_year", label: "This year" },
];

const barColors = [
    "#E0F7F5", "#C2EEEA", "#A0E0DA", "#7DD1C8", "#5CC1B5",
    "#3DAFA1", "#2A9D91", "#1F8A7E", "#16766C", "#0F766E",
    "#0B5D57", "#073F3A",
];

const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// --- Mock data generators. Replace with real API calls keyed by range. ---

function mockCountFor(seed) {
    const x = Math.sin(seed * 999) * 10000;
    return Math.floor((x - Math.floor(x)) * 22) + 2;
}

function generateDailyData(numDays) {
    const data = [];
    const today = new Date();
    for (let i = numDays - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        data.push({
            name: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            count: mockCountFor(d.getTime()),
        });
    }
    return data;
}

function generateMonthRangeData(monthOffset) {
    const today = new Date();
    const target = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const daysInMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
        data.push({
            name: String(day),
            count: mockCountFor(target.getFullYear() * 100 + target.getMonth() * 31 + day),
        });
    }
    return data;
}

function generateYearData() {
    const year = new Date().getFullYear();
    return MONTH_LABELS.map((name, idx) => ({
        name,
        count: mockCountFor(year * 12 + idx),
    }));
}

function getDataForRange(range) {
    switch (range) {
        case "7":
            return generateDailyData(7);
        case "30":
            return generateDailyData(30);
        case "90":
            return generateDailyData(90);
        case "this_month":
            return generateMonthRangeData(0);
        case "last_month":
            return generateMonthRangeData(-1);
        case "this_year":
            return generateYearData();
        default:
            return generateDailyData(7);
    }
}

// --- Bar shape with rounded top + rotating teal fill ---

const ColoredBarWithRadius = (props) => {
    const { x, y, width, height, index } = props;
    const radius = 6;
    const fillColor = barColors[index % barColors.length];

    return (
        <path
            d={`
                M ${x},${y + radius}
                A ${radius},${radius} 0 0 1 ${x + radius},${y}
                L ${x + width - radius},${y}
                A ${radius},${radius} 0 0 1 ${x + width},${y + radius}
                L ${x + width},${y + height}
                L ${x},${y + height}
                Z
            `}
            fill={fillColor}
        />
    );
};

function IssuesGraphReport({dateRange}) {
    // const [dateRange, setDateRange] = useState("30");
    console.log(dateRange);
    

    const activeData = useMemo(() => getDataForRange(dateRange), [dateRange]);

    // Show roughly 10 labels max, regardless of range length
    const maxTicks = 10;
    const tickInterval =
        activeData.length > maxTicks
            ? Math.ceil(activeData.length / maxTicks)
            : 0;
    const isDense = activeData.length > maxTicks;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        Issue Trends
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Number of issues reported over time
                    </p>
                </div>

                {/* <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="
                        rounded-lg
                        border border-slate-200
                        bg-white
                        px-3 py-2
                        text-sm
                        text-slate-600
                        outline-none
                        cursor-pointer
                    "
                >
                    {dateRangeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select> */}
            </div>

            <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={activeData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: isDense ? 20 : 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            interval={tickInterval}
                            angle={isDense ? -35 : 0}
                            textAnchor={isDense ? "end" : "middle"}
                            height={isDense ? 45 : 30}
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            name="Issues reported"
                            shape={<ColoredBarWithRadius />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default IssuesGraphReport;