import SearchBar from "./SearchBar.jsx";
import NotificationButton from "./NotificationButton.jsx";
import UserProfile from "./UserProfile.jsx";
import MobileMenuButton from "./MobileMenuButton.jsx";

function Topbar({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
            <div className="flex items-center">
                <MobileMenuButton onClick={onMenuClick} />
                <SearchBar />
            </div>

            <div className="flex items-center gap-5 ms-auto">
                <NotificationButton />
                <UserProfile />
            </div>
        </header>
    );
}

export default Topbar;