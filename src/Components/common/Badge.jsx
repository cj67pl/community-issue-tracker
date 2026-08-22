function Badge({ label, styles, size = "sm" }) {
    const sizes = {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    };

    return (
        <span
            className={`
        inline-block shrink-0 whitespace-nowrap
        rounded-full font-semibold
        ${sizes[size]}
        ${styles}
      `}
        >
            {label}
        </span>
    );
}

export default Badge;