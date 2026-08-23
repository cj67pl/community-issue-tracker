import {PieChart, Pie, Sector, ResponsiveContainer} from "recharts";
import { FaChevronRight } from "react-icons/fa6";

const data = [
        { name: "Maintenance", value: 13, color: "#0f5c4c" },
        { name: "Internet / Tech", value: 9, color: "#4d9b7f" },
        { name: "Infrastructure", value: 7, color: "#c8792a" },
        { name: "Safety", value: 5, color: "#7c5cbf" },
        { name: "Other", value: 4, color: "#7fb3d5" },
    ];

const total = data.reduce((sum, d) => sum + d.value, 0);

function IssuesGraph() {
    

    return (
        <div className="w-full sm:min-w-xs max-w-2xl rounded-xl border border-gray-200 bg-white shadow-sm">
            
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Issues by Category</h3>
            </div>
    
            
            <div className="flex items-center gap-8 px-6 py-6 ">
                
                <div className="relative h-54 w-50 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="68%"
                                outerRadius="100%"
                                paddingAngle={1}
                                stroke="none"
                                
                                
                                shape={(props) => {
                                    const {index} = props;
                                    const entryColor = data[index]?.color || '#88884d8';
                                    return <Sector {...props} fill={entryColor} />;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
        
                    {/* Center text, absolutely positioned over the chart */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">{total}</span>
                        <span className="text-xs text-gray-400">Total</span>
                    </div>
                </div>
        
                {/* Legend */}
                <div className="flex-1 space-y-3">
                    {data.map((d) => (
                        <div key={d.name} className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between gap-1 ">
                            <div className="flex items-center gap-2  ">
                                <span
                                className="h-2.5 w-2.5 rounded-full "
                                style={{ backgroundColor: d.color }}
                                />
                            <span className="text-sm text-gray-700">{d.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                            {d.value} ({Math.round((d.value / total) * 100)}%)
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
        
                
                <div className="flex border-t border-slate-200 px-6 py-3 items-center">
                    <button className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline ">
                        View full report
                        <FaChevronRight className="w-2 h-2" />
                    </button>
                </div>
            </div>
    )
}

export default IssuesGraph;