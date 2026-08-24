import { ChevronDown } from "lucide-react";

function FAQItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-slate-100 px-6 last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
                <span className="text-sm font-semibold text-gray-900">{question}</span>
                <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <p className="pb-4 text-sm leading-relaxed text-neutral-500">{answer}</p>
            )}
        </div>
    );
}

export default FAQItem;