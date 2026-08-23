import { Mail, Phone, Clock } from "lucide-react";

const contactRows = [
    { icon: Mail, label: "Email", value: "support@tugon.edu.ph" },
    { icon: Phone, label: "Phone", value: "(082) 555-0142" },
    { icon: Clock, label: "Support Hours", value: "Mon–Fri, 7:00 AM – 5:00 PM" },
];

function ContactSupport() {
    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Contact Support</h3>
            </div>

            <div className="px-6">
                {contactRows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-b-0"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                            <row.icon size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-neutral-400">{row.label}</p>
                            <p className="text-sm font-semibold text-gray-900">{row.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 pt-4">
                <button className="w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white hover:bg-teal-800">
                    Send a Message
                </button>
            </div>
        </div>
    );
}

export default ContactSupport;