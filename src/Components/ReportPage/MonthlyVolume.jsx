import BarChartCard from "../../common/BarChartCard.jsx";

const monthlyData = [
    { label: "April", value: 9, color: "bg-teal-700" },
    { label: "May", value: 12, color: "bg-teal-700" },
    { label: "June", value: 8, color: "bg-teal-700" },
    { label: "July", value: 7, color: "bg-teal-700" },
    { label: "August", value: 14, color: "bg-teal-700" },
];

function MonthlyVolume() {
    return <BarChartCard title="Monthly Volume" data={monthlyData} />;

}

export default MonthlyVolume