function FormField({ label, hint, children }) {
    return (
        <div>
            <div className="mb-2 flex items-baseline gap-2">
                <label className="text-sm font-bold text-gray-900">{label}</label>
                {hint && <span className="text-xs text-neutral-400">{hint}</span>}
            </div>
            {children}
        </div>
    );
}

export default FormField;
