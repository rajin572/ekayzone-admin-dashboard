import { useState } from "react";
import { Eye } from "lucide-react";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import YearOption from "@/Components/ui/CustomUi/ReuseYearSelect";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import OverviewStatCards from "@/Components/Dashboard/Overview/OverviewStatCards";
import UserOverviewAreaChart from "@/Components/Charts/UserOverviewAreaChart";
import EarningOverviewBarChart from "@/Components/Charts/EarningOverviewBarChart";
import RecentUserDetailModal from "@/Components/Dashboard/Overview/RecentUserDetailModal";
import { IOverviewData, IPlatformUser } from "@/types";
// import { useGetDashboardOverviewQuery, useGetEarningOverviewQuery } from "@/redux/features/dashboard/dashboardApi";
// import { useSuspendUserMutation } from "@/redux/features/user/userApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real dashboard-overview API data once the endpoint exists.
const DUMMY_OVERVIEW: IOverviewData = {
  stats: {
    totalUsers: 12223,
    activeToday: 4567,
    totalSubscribers: 1222,
    totalVideos: 12334,
    totalListings: 12223,
    overallRevenue: 4567,
    activeCampaigns: 1222,
    openTickets: 24,
  },
  userOverview: [
    { month: "Jan", users: 600 },
    { month: "Feb", users: 590 },
    { month: "Mar", users: 615 },
    { month: "Apr", users: 640 },
    { month: "May", users: 620 },
    { month: "Jun", users: 665 },
    { month: "Jul", users: 645 },
    { month: "Aug", users: 700 },
    { month: "Sep", users: 720 },
    { month: "Oct", users: 705 },
    { month: "Nov", users: 760 },
    { month: "Dec", users: 800 },
  ],
  earningOverview: [
    { month: "Jan", earnings: 700 },
    { month: "Feb", earnings: 850 },
    { month: "Mar", earnings: 840 },
    { month: "Apr", earnings: 550 },
    { month: "May", earnings: 560 },
    { month: "Jun", earnings: 720 },
    { month: "Jul", earnings: 540 },
    { month: "Aug", earnings: 820 },
    { month: "Sep", earnings: 830 },
    { month: "Oct", earnings: 840 },
    { month: "Nov", earnings: 820 },
    { month: "Dec", earnings: 690 },
  ],
  recentUsers: [
    { _id: "1", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
    { _id: "2", displayId: "2345", fullName: "Thomas De Smet", email: "220thomas.desmet@mail.be", gender: "Male", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "thomasds", joinDate: "2023-04-02", followers: 820, following: 145, activeCampaigns: 6 },
    { _id: "3", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
    { _id: "4", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
    { _id: "5", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
    { _id: "6", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
    { _id: "7", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  ],
};

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const OverviewPage = () => {
  const currentYear = new Date().getFullYear();
  const [earningYear, setEarningYear] = useState(currentYear);
  console.log("Earning Year:", earningYear)
  const [selectedUser, setSelectedUser] = useState<IPlatformUser | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);

  // const { data } = useGetDashboardOverviewQuery();
  // const overview = data?.data;
  const overview = DUMMY_OVERVIEW;

  // The year selector refetches only the earning chart once the endpoint exists:
  // const { data: earningData } = useGetEarningOverviewQuery({ year: earningYear });
  // const earningOverview = earningData?.data ?? overview.earningOverview;
  const earningOverview = overview.earningOverview;

  const handleSuspendClick = (user: IPlatformUser) => {
    setSelectedUser(user);
    setIsDetailOpen(false);
    setIsSuspendConfirmOpen(true);
  };

  // const [suspendUser] = useSuspendUserMutation();
  const handleConfirmSuspend = async (_user: IPlatformUser, _reason?: string) => {
    // const res = await tryCatchWrapper(
    //   suspendUser,
    //   { params: { id: _user._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Suspending user..." }
    // );
    // if (res?.success) setIsSuspendConfirmOpen(false);
    setIsSuspendConfirmOpen(false);
  };

  const columns: Column<IPlatformUser>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Full Name", accessorKey: "fullName", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Email", accessorKey: "email", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Gender", accessorKey: "gender", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Phone Number", accessorKey: "phone", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Age", accessorKey: "age", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Plan", accessorKey: "plan", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Status", accessorKey: "status", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Action",
      accessorKey: "_id",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (_, row) => (
        <button
          type="button"
          onClick={() => {
            setSelectedUser(row);
            setIsDetailOpen(true);
          }}
          className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
          aria-label={`View ${row.fullName}`}
        >
          <Eye className="size-5 text-base-color" />
        </button>
      ),
    },
  ];

  return (
    <section className="p-6 md:p-8 space-y-6">
      <OverviewStatCards stats={overview.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-sm">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color mb-4">User Overview</h2>
          <UserOverviewAreaChart data={overview.userOverview} />
        </div>

        <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color">Earning Overview</h2>
            <YearOption currentYear={currentYear} setThisYear={(y) => setEarningYear(Number(y))} />
          </div>
          <EarningOverviewBarChart data={earningOverview} />
        </div>
      </div>

      <div>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-color mb-4">Recent Users</h2>
        <ReusableTable data={overview.recentUsers} columns={columns} scroll={false} />
      </div>

      <RecentUserDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        user={selectedUser}
        onSuspend={handleSuspendClick}
      />

      <ConfirmModal<IPlatformUser>
        open={isSuspendConfirmOpen}
        onCancel={() => setIsSuspendConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmSuspend}
        title="Suspend User"
        description={`Temporarily suspend ${selectedUser?.fullName} from the platform`}
        confirmText="Suspend User"
        cancelText="Cancel"
        variant="warning"
        withReason
        reasonLabel="Reason for Suspension"
        reasonRequired
      />
    </section>
  );
};

export default OverviewPage;
