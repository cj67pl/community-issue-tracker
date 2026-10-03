
import NotificationButton from "./NotificationButton.jsx";
import UserProfile from "../../common/UserProfile.jsx";
import MobileMenuButton from "./MobileMenuButton.jsx";
import { DEMO_MODE } from "../../api/api.js";

function Topbar({
    onMenuClick,
    currentUserName,
    currentRole,
    currentUserProfileColor,
    
}) {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
            <div className="flex items-center">
                <MobileMenuButton onClick={onMenuClick} />
            </div>

            <div className="flex items-center gap-3 sm:gap-5 ms-auto">
                {DEMO_MODE && (
                    <span
                        title="Some features are disabled in demo mode to protect the demo data."
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                    >
                        Demo Mode
                    </span>
                    
                )}
                <NotificationButton />

                <UserProfile
                    name={currentUserName}
                    profileColor={currentUserProfileColor}
                    role={currentRole}
                    variant="compact"
                    hideDetailsOnMobile
                />
            </div>
        </header>
    );
}

export default Topbar;