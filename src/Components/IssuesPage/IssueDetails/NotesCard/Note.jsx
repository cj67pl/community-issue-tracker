function Note({ initials, userName, note, postDate }) {
    return (
        <div className="rounded-xl border border-stone-200 bg-[#F8F6F1] p-4">
            <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700/10 text-xs font-semibold text-emerald-800">
                    {initials}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <h5 className="font-semibold text-gray-900">{userName}</h5>
                        <span className="shrink-0 text-xs text-gray-400">{postDate}</span>
                    </div>

                    {/* highlighted = a soft green wash behind the text, like the
              top note in the screenshot — meant for the newest/latest note */}
                    <p
                        className={`mt-1 text-sm text-gray-700`}
                    >
                        {note}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Note;