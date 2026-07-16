import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReusablePagination from "@/Components/ui/CustomUi/ReusablePagination";
import { notificationMeta, DUMMY_NOTIFICATIONS } from "@/Components/Shared/notificationMeta";
// import { useGetNotificationsQuery } from "@/redux/features/notification/notificationApi";

const NotificationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetNotificationsQuery({ page: currentPage, limit }, { refetchOnMountOrArgChange: true });
  // const notifications = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const notifications = DUMMY_NOTIFICATIONS;
  const total = 47;

  return (
    <PageWraper title="Notifications">
      <div className="bg-primary-color rounded-lg border border-base-color/10 divide-y divide-border">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-highlight text-sm">No notifications yet.</div>
        ) : (
          notifications.map((n) => {
            const meta = notificationMeta[n.type];
            const Icon = meta.icon;
            return (
              <div key={n._id} className="flex gap-3 px-5 py-4">
                <div className={`size-10 rounded-full ${meta.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`size-5 ${meta.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-base-color leading-snug">{n.title}</p>
                  <p className="text-sm text-highlight mt-0.5 leading-snug">{n.body}</p>
                  <p className="text-xs text-highlight mt-1.5">{n.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-2">
        <ReusablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} total={total} />
      </div>
    </PageWraper>
  );
};

export default NotificationsPage;
