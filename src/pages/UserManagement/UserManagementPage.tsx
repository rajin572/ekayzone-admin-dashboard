import { useState } from "react";
import { Eye } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import RecentUserDetailModal from "@/Components/Dashboard/Overview/RecentUserDetailModal";
import { IPlatformUser } from "@/types";
// import { useGetUsersQuery, useSuspendUserMutation } from "@/redux/features/user/userApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real user list API data once the endpoint exists.
const DUMMY_USERS: IPlatformUser[] = [
  { _id: "1", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "2", displayId: "2345", fullName: "Thomas De Smet", email: "220thomas.desmet@mail.be", gender: "Male", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "thomasds", joinDate: "2023-04-02", followers: 820, following: 145, activeCampaigns: 6 },
  { _id: "3", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "4", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "5", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "6", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "7", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "8", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "9", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "10", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "11", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "12", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
  { _id: "13", displayId: "2345", fullName: "Nina Collin", email: "ninacollin@example.com", gender: "Female", phone: "+32473256842", age: 32, plan: "Free", status: "Active", username: "i'mnina", joinDate: "2023-06-15", followers: 1000, following: 100, activeCampaigns: 10 },
];

const TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "all" },
  { label: "Free", value: "Free" },
  { label: "Premium", value: "Premium" },
  { label: "Pro", value: "Pro" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Suspended", value: "Suspended" },
  { label: "Banned", value: "Banned" },
];

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const UserManagementPage = () => {
  const [, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 13;

  const [selectedUser, setSelectedUser] = useState<IPlatformUser | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);

  // const { data } = useGetUsersQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     type: typeFilter === "all" ? undefined : typeFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const users = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const users = DUMMY_USERS;
  const total = 250;

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
    <PageWraper
      title="User Management"
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <ReuseSearchInput
            className="min-w-64"
            placeholder="Search..."
            setSearch={setSearch}
            setPage={setCurrentPage}
          />
          <ReuseFilterSelect
            options={TYPE_OPTIONS}
            value={typeFilter}
            onChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
            placeholder="Type"
            triggerClassName="rounded-full"
          />
          <ReuseFilterSelect
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            placeholder="Status"
            triggerClassName="rounded-full"
          />
        </div>
      }
    >
      <ReusableTable
        data={users}
        columns={columns}
        scroll={false}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        total={total}
      />

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
    </PageWraper>
  );
};

export default UserManagementPage;
