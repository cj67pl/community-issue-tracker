import BarChartCard from "../../common/BarChartCard.jsx";

const statusData = [
    { label: "Open", value: 16, color: "bg-blue-700" },
    { label: "In Progress", value: 8, color: "bg-purple-500" },
    { label: "Resolved", value: 14, color: "bg-emerald-700" },
    { label: "Closed", value: 10, color: "bg-neutral-500" },
];

function IssuesByStatus() {
    return <BarChartCard title="Issues by Status" data={statusData} />;
}

export default IssuesByStatus;