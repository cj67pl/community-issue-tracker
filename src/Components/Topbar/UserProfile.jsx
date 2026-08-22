function UserProfile({ initials = "TC", name = "Tom Cookerist", role = "Coordinator" }) {
    return (
        <div
            className="
        flex group items-center gap-3 rounded-4xl p-1 lg:pr-2 border border-slate-200
        active:bg-teal-700
        active:text-white
        cursor-pointer
        
      "
        >
            <div
                className="
          rounded-3xl p-2 bg-teal-700 text-white font-bold
          group-active:bg-white
          group-active:text-green-700
        "
            >
                {initials}
            </div>
            <div className="hidden flex-col px-1 lg:flex ">
                <span className="font-semibold">{name}</span>
                <span className="font-thin text-[11px] text-olive-400">{role}</span>
            </div>
        </div>
    );
}

export default UserProfile;