import { Bell } from "lucide-react";

function NotificationButton() {
    return (
        <button
            className="
        rounded-lg p-1 border border-slate-200
        hover:bg-green-50
        active:bg-teal-700
        active:text-white
        relative
      "
        >
            <Bell size={20} />
            <span className="absolute top-[3px] right-[4px] h-[7px] w-[7px] rounded-full bg-red-600 border-2 border-white" />
        </button>
    );
}

export default NotificationButton;