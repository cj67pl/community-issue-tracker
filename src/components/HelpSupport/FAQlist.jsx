import { useState } from "react";
import FAQItem from "./FAQItem.jsx";
import { faqData } from "../faqData.js";

function FAQList() {
    // Index of the currently open question, -1 = none open.
    // Only one open at a time is the classic "accordion" behavior.
    const [openIndex, setOpenIndex] = useState(0);

    function handleToggle(index) {
        setOpenIndex((current) => (current === index ? -1 : index));
    }

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
            </div>

            <div className="py-3">
                {faqData.map((item, index) => (
                    <FAQItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default FAQList;