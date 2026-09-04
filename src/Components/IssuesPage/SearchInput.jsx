import { Search } from "lucide-react";

function SearchInput({ placeholder = "Search", value, onChange }) {
    return (
        <div
            className="
        flex h-12 w-full items-center gap-2
        rounded-lg border border-slate-200 bg-white px-5
        shadow-sm transition
        focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/20
      "
        >
            <Search size={20} className="text-gray-400 shrink-0" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400/60"
            />
        </div>
    );
}

export default SearchInput;