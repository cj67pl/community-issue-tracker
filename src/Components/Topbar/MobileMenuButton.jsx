import { Menu } from "lucide-react";

function MobileMenuButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="mr-3 rounded-lg p-2 text-neutral-600 hover:bg-green-50 lg:hidden"
        >
            <Menu size={20} />
        </button>
    );
}

export default MobileMenuButton;