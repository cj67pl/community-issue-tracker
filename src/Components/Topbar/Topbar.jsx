import SearchBar from "./SearchBar.jsx";
import NotificationButton from "./NotificationButton.jsx";
import UserProfile from "../../common/UserProfile.jsx";
import MobileMenuButton from "./MobileMenuButton.jsx";

function Topbar({ onMenuClick, currentUserName, currentRole }) {
    // console.log("TopbarName", currentUserName);
    // console.log("TopbarRole", currentRole);

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
            <div className="flex items-center">
                <MobileMenuButton onClick={onMenuClick} />
                <SearchBar />
            </div>

            <div className="flex items-center gap-3 sm:gap-5 ms-auto">
                <NotificationButton />
                <UserProfile
                    name={currentUserName}
                    
                    role={currentRole}
                    variant="compact"
                    hideDetailsOnMobile
                />
            </div>
        </header>
    );
}

export default Topbar;