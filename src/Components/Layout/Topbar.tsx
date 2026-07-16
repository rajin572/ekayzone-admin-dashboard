import { SidebarTrigger } from '../ui/sidebar';
import { useRef, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationMeta, DUMMY_NOTIFICATIONS } from '../Shared/notificationMeta';

const PREVIEW_COUNT = 3;

const Topbar = () => {
    const navigate = useNavigate();
    const [notifOpen, setNotifOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const notifications = DUMMY_NOTIFICATIONS.slice(0, PREVIEW_COUNT);

    const openNotif = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setNotifOpen(true);
    };
    const scheduleClose = () => {
        closeTimer.current = setTimeout(() => setNotifOpen(false), 150);
    };

    return (
        <div className="flex items-center justify-between w-full z-50 px-2">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
            </div>

            <div
                className="relative"
                onMouseEnter={openNotif}
                onMouseLeave={scheduleClose}
            >
                <button
                    type="button"
                    className="relative p-1 rounded-full bg-white border border-border shadow-sm hover:bg-muted transition-colors cursor-pointer"
                >
                    <Bell className="size-5 text-base-color" />
                    <span className="absolute -top-1.5 -right-2 size-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                        {DUMMY_NOTIFICATIONS.length}
                    </span>
                </button>

                {notifOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 sm:w-80 bg-popover text-popover-foreground rounded-md border border-border shadow-md z-50">
                        <div className="px-4 py-3">
                            <p className="font-bold text-base-color text-lg">Notifications</p>
                            <p className="text-xs text-highlight">{DUMMY_NOTIFICATIONS.length} unread</p>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="max-h-[30vh] overflow-y-auto">
                            {notifications.map((n) => {
                                const meta = notificationMeta[n.type];
                                const Icon = meta.icon;
                                return (
                                    <div key={n._id} className="flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                                        <div className={`size-8 rounded-full ${meta.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                                            <Icon className={`size-4 ${meta.iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-base-color leading-snug">{n.title}</p>
                                            <p className="text-xs text-highlight mt-0.5 leading-snug">{n.body}</p>
                                            <p className="text-[10px] text-highlight mt-1">{n.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="h-px bg-border" />
                        <button
                            type="button"
                            onClick={() => {
                                setNotifOpen(false);
                                navigate("/admin/notifications");
                            }}
                            className="w-full py-2.5 text-sm font-medium text-secondary-color hover:bg-muted/50 transition-colors cursor-pointer rounded-b-md"
                        >
                            Show more
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
