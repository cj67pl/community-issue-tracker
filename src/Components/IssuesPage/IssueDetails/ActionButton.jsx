
function ActionButton({ name, textCol, bg, icon: Icon, hover }) {
    return (
        <button
            className={`
                flex items-center justify-center gap-2
                rounded-md text-sm font-semibold 
                h-10 px-5 border border-neutral-500/40
                cursor-pointer
                ${textCol}
                ${bg}
                ${hover}
                `}
        >
            {<Icon size={15}/>}
            <span className="hidden sm:inline">{name}</span>
        </button>
    )
}

export default ActionButton;