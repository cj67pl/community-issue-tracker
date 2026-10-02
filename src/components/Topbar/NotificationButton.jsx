import { useEffect, useRef, useState } from "react";
import {
    Bell,
    X,
    ClipboardList,
    CheckCircle,
    MessageSquare,
    AlertCircle,
} from "lucide-react";

import { apiRequest } from "../../api/api.js";

function NotificationButton() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const notificationRef = useRef(null);

    // const userID = JSON.parse(localStorage.getItem('user'))?.id;
    // console.log("USER ID: ", userID);
    

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setError("");

                const data = await apiRequest(`/notifications`);

                setNotifications(
                    Array.isArray(data) ? data : []
                );
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
                setError("Unable to load notifications.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();

        const interval = setInterval(fetchNotifications, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

   
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const unreadCount = notifications.filter(
        (notification) => !notification.is_read
    ).length;

    const filteredNotifications =
        filter === "unread"
            ? notifications.filter(
                (notification) => !notification.is_read
            )
            : notifications;

    const formatTime = (dateString) => {
        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en-PH", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    };


    const markAsRead = async (notificationId) => {
        try {
            await apiRequest(`/notifications/${notificationId}/read`, {
                method: "PATCH",
            });

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.notification_id === notificationId
                        ? { ...notification, is_read: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await apiRequest(`/notifications/read-all`, {
                method: "PATCH",
            });

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    is_read: true,
                }))
            );
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };
    return (
        <>
            <div className="relative" ref={notificationRef}>
               
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Notifications"
                    aria-expanded={isOpen}
                    className="
                        relative rounded-lg p-2
                        border border-slate-200
                        text-slate-600
                        hover:bg-green-50 hover:text-teal-700
                        transition-colors
                    "
                >
                    <Bell size={20} />

                    {unreadCount > 0 && (
                        <span
                            className="
                                absolute -top-1 -right-1
                                min-w-[18px] h-[18px]
                                px-1
                                flex items-center justify-center
                                rounded-full bg-red-600
                                text-white text-[10px] font-semibold
                                border-2 border-white
                            "
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </button>

               
                {isOpen && (
                    <div
                        className="
                            absolute right-0 top-full mt-2
                            w-[350px] max-w-[calc(100vw-2rem)]
                            bg-white border border-slate-200
                            rounded-xl shadow-lg z-50
                            overflow-hidden
                        "
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Notifications
                                </h3>

                                <p className="text-xs text-slate-400 mt-0.5">
                                    {unreadCount} unread
                                </p>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close notifications"
                                className="p-1 rounded-md text-slate-400 hover:bg-slate-100"
                            >
                                <X size={17} />
                            </button>
                        </div>

                        <div className="max-h-[360px] overflow-y-auto">
                            {loading ? (
                                <NotificationMessage>
                                    Loading notifications...
                                </NotificationMessage>
                            ) : error ? (
                                <NotificationMessage>
                                    {error}
                                </NotificationMessage>
                            ) : notifications.length === 0 ? (
                                <NotificationMessage>
                                    You're all caught up!
                                </NotificationMessage>
                            ) : (
                                notifications
                                    .slice(0, 5)
                                    .map((notification) => (
                                        <NotificationItem
                                            onRead={markAsRead}
                                            key={notification.notification_id}
                                            notification={notification}
                                            formatTime={formatTime}
                                        />
                                    ))
                            )}
                        </div>

                        <div className="border-t border-slate-100">
                            <button
                                onClick={() => {
                                    setShowAll(true);
                                    setIsOpen(false);
                                }}
                                className="
                                    w-full py-3 text-sm font-medium
                                    text-teal-700 hover:bg-green-50
                                    transition-colors
                                "
                            >
                                View all notifications
                            </button>
                        </div>
                    </div>
                )}
            </div>

            
            {showAll && (
                <NotificationModal
                    notifications={filteredNotifications}
                    loading={loading}
                    error={error}
                    filter={filter}
                    setFilter={setFilter}
                    formatTime={formatTime}
                    onRead={markAsRead}
                    onMarkAllAsRead={markAllAsRead}
                    onClose={() => setShowAll(false)}
                />
            )}
        </>
    );
}

function NotificationItem({ notification, formatTime, onRead }) {
    const isRead = notification.is_read;

    return (
        <div
            onClick={() => {
                if (!notification.is_read) {
                    onRead(notification.notification_id);
                }
            }}
            className={`
                w-full px-4 py-3 flex gap-3
                border-b border-slate-100
                cursor-pointer
                ${isRead
                    ? "bg-white"
                    : "bg-green-50/60"
                }
            `}
        >
            <div className="pt-1.5 w-2 shrink-0">
                {!isRead && (
                    <span className="block w-2 h-2 rounded-full bg-teal-600" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                    <NotificationIcon type={notification.type} />

                    <p className="text-sm font-medium text-slate-800">
                        {getNotificationTitle(notification.type)}
                    </p>
                </div>

                <p className="text-xs text-slate-500 mt-1 break-words">
                    {notification.message}
                </p>

                <p className="text-[11px] text-slate-400 mt-1">
                    {formatTime(notification.created_at)}
                </p>
            </div>
        </div>
    );
}

function NotificationIcon({ type }) {
    const iconClass = "text-teal-700 shrink-0 mt-0.5";

    switch (type) {
        case "issue_assigned":
            return <ClipboardList size={16} className={iconClass} />;

        case "issue_status_updated":
            return <ClipboardList size={16} className={iconClass} />;

        case "issue_resolved":
            return <CheckCircle size={16} className={iconClass} />;

        case "new_comment":
            return <MessageSquare size={16} className={iconClass} />;

        default:
            return <AlertCircle size={16} className={iconClass} />;
    }
}

function getNotificationTitle(type) {
    switch (type) {
        case "issue_assigned":
            return "Issue assigned to you";

        case "new_issue":
            return "New issue reported";

        case "issue_status_updated":
            return "Issue status updated";

        case "issue_resolved":
            return "Issue resolved";

        case "new_comment":
            return "New comment";

        default:
            return "Notification";
    }
}

function NotificationMessage({ children }) {
    return (
        <div className="px-4 py-8 text-center text-sm text-slate-500">
            {children}
        </div>
    );
}

function NotificationModal({
    notifications,
    loading,
    error,
    filter,
    setFilter,
    formatTime,
    onRead,
    onMarkAllAsRead,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <button
                aria-label="Close modal"
                className="absolute inset-0 bg-black/30 cursor-default"
                onClick={onClose}
            />

            <div
                className="
                    relative w-full max-w-lg
                    max-h-[80vh] bg-white
                    rounded-2xl shadow-xl
                    overflow-hidden flex flex-col
                "
            >
                
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Notifications
                        </h2>

                        <p className="text-xs text-slate-400 mt-0.5">
                            Your recent activity and updates
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onMarkAllAsRead}
                            className="
                                px-3 py-1.5 rounded-lg
                                text-xs font-medium
                                text-teal-700
                                hover:bg-green-50
                                transition-colors
                            "
                        >
                            Mark all as read
                        </button>

                        <button
                            onClick={onClose}
                            aria-label="Close notifications"
                            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"
                        >
                            <X size={19} />
                        </button>
                    </div>
                </div>

               
                <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
                    <button
                        onClick={() => setFilter("all")}
                        className={`
                            px-3 py-1.5 rounded-lg text-xs font-medium
                            ${filter === "all"
                                ? "bg-teal-700 text-white"
                                : "text-slate-500 hover:bg-slate-100"
                            }
                        `}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("unread")}
                        className={`
                            px-3 py-1.5 rounded-lg text-xs font-medium
                            ${filter === "unread"
                                ? "bg-teal-700 text-white"
                                : "text-slate-500 hover:bg-slate-100"
                            }
                        `}
                    >
                        Unread
                    </button>
                </div>

                {/* Notification List */}
                <div className="overflow-y-auto">
                    {loading ? (
                        <NotificationMessage>
                            Loading notifications...
                        </NotificationMessage>
                    ) : error ? (
                        <NotificationMessage>
                            {error}
                        </NotificationMessage>
                    ) : notifications.length === 0 ? (
                        <NotificationMessage>
                            No notifications to show.
                        </NotificationMessage>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.notification_id}
                                notification={notification}
                                formatTime={formatTime}
                                onRead={onRead}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificationButton;