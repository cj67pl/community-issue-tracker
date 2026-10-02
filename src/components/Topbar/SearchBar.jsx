import { Search } from "lucide-react";

function SearchBar() {
    return (
        <div
            className="
        flex h-8 w-72
        items-center
        rounded-lg
        border border-slate-200
        transition
        focus-within:border-green-700
        focus-within:ring-2
        focus-within:ring-green-700/20
      "
        >
            <input
                type="text"
                placeholder="Search for Issues"
                className="
          h-full w-full
          bg-transparent
          px-3
          text-xs
          outline-none
          placeholder:text-slate-400/60
        "
            />
            <button
                type="button"
                className="
          flex h-full
          items-center justify-center
          border-l border-slate-200
          px-3
          text-green-800
          transition-colors
          hover:bg-green-50
          hover:rounded-r-lg
          active:bg-teal-700
          active:text-white
          active:rounded-r-lg
        "
            >
                <Search size={20} />
            </button>
        </div>
    );
}

export default SearchBar;