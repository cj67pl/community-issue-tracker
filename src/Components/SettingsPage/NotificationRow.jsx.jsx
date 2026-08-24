import Toggle from "../../common/Toggle";

function NotificationRow({ title, description, checked, onChange }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0">
            <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-neutral-500">{description}</p>
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

export default NotificationRow;