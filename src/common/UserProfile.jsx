import { capitalizeFirstLetter, getInitials } from "../utils/stringHelpers.js";

function UserProfile({ initials, name, role, variant, hideDetailsOnMobile = false }) {
    const variants = {
        compact: {
            container: `
                gap-3 rounded-4xl p-1 lg:pr-2
                border border-slate-200
                cursor-pointer
                active:bg-teal-700
                active:text-white
            `,
            avatar: `
                rounded-3xl p-2
                bg-teal-700 text-white
                text-sm font-bold
            `,
            name: "font-semibold text-sm",
            role: "font-thin text-[11px] text-olive-400",
        },

        large: {
            container: `
                gap-4
            `,
            avatar: `
                rounded-full p-4
                bg-teal-700 text-white
                text-xl font-bold
            `,
            name: "font-bold text-lg",
            role: "font-normal text-sm text-olive-400",
        },
    };

    const styles = variants[variant];



    return (
        <div className={`flex items-center ${styles.container}`}>
            <div className={`shrink-0 ${styles.avatar}`}>{initials || getInitials(name)}</div>

            {/* hideDetailsOnMobile is opt-in: pages that always want the name/role
          visible (e.g. a profile page) just don't pass this prop. Only the
          compact header usage needs it collapsed on small screens. */}
            <div className={`flex-col ${hideDetailsOnMobile ? "hidden lg:flex" : "flex"}`}>
                <span className={styles.name}>{name}</span>
                <span className={styles.role}>{capitalizeFirstLetter(role)}</span>
            </div>
        </div>
    );
}

export default UserProfile;