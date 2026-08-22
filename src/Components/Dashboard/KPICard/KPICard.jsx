function KPICard({ card }) {
    const Icon = card.icon; // must be capitalized to render as a component: <Icon />

    return (
        <div
            className="
                    flex flex-col
                    border 
                    border-slate-200
                    bg-white
                    p-4
                    rounded-xl
                    shadow-sm
                    shrink-0
                    "
        >
            <div className="flex items-center gap-4 font-bold text-neutral-500">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-md ${card.background}`}
                >
                    <Icon className={card.color} size={20} />
                </div>

                {card.name}
            </div>
            <p className="text-4xl font-bold my-3 self-center ">38</p>
            <span className="text-gray-400 self-center">{card.statsDescription}</span>
        </div>
    );
}

export default KPICard;