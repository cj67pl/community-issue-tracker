import { Shield, User } from "lucide-react";

const roles = [
    { value: "coordinator", label: "Coordinator", icon: Shield },
    { value: "reporter", label: "Reporter", icon: User },
];

function RoleToggle({ value, onChange }) {
    return (
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
            {roles.map((role) => {
                const isActive = value === role.value;
                return (
                    <button
                        key={role.value}
                        type="button"
                        onClick={() => onChange(role.value)}
                        className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors ${isActive
                                ? "bg-white text-teal-700 shadow-sm"
                                : "text-neutral-500 hover:text-neutral-700"
                            }`}
                    >
                        <role.icon size={16} />
                        {role.label}
                    </button>
                );
            })}
        </div>
    );
}

export default RoleToggle;