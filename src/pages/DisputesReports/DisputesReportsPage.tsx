import { useState } from "react";
import { Eye } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ReportDetailSheet from "@/Components/Dashboard/DisputesReports/ReportDetailSheet";
import { IReport, IReportStats, ReportStatus } from "@/types";
// import { useGetReportStatsQuery, useGetReportsQuery } from "@/redux/features/disputesReports/disputesReportsApi";

// TODO: replace with real report-stats API data once the endpoint exists.
const DUMMY_STATS: IReportStats = {
  pendingReports: 24,
  totalResolved: 245,
  avgResponseTimeHours: 2.4,
};

const REPORTED_BY = [
  { name: "Jhon Kerensky", handle: "jkerensky" },
  { name: "Lisa Wong", handle: "lisawong" },
  { name: "Raj Patel", handle: "rajpatel" },
  { name: "Sofia Martinez", handle: "sofiam" },
  { name: "Omar Al-Farsi", handle: "omaralfarsi" },
];

const CATEGORY_ITEM: [IReport["category"], string][] = [
  ["Service", "Hair Styling & Branding"],
  ["Product", "MSI Laptop"],
  ["User", "-"],
  ["Order Dispute", "Hair Styling & Branding"],
  ["Video", "Wireless Earbuds Unboxing"],
  ["Live Stream", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
  ["Service", "Hair Styling & Branding"],
];

// TODO: replace with real reports API data once the endpoint exists.
const DUMMY_REPORTS: IReport[] = CATEGORY_ITEM.map(([category, reportedItem], i) => ({
  _id: `${i + 1}`,
  displayId: "0001",
  reporter: "Jhon Hawk",
  reportedUser: "Emilia Kristy",
  category,
  reportedItem,
  listedBy: "Jhon McKenny",
  reportedReason: "Inappropriate",
  reportedDetails: "Lorem Ipsum",
  status: "Pending",
  date: "April 26, 2025",
  timeAgoLabel: "6h ago",
  reportedBy: REPORTED_BY,
}));

const CATEGORY_OPTIONS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Service", value: "Service" },
  { label: "Product", value: "Product" },
  { label: "User", value: "User" },
  { label: "Order Dispute", value: "Order Dispute" },
  { label: "Video", value: "Video" },
  { label: "Live Stream", value: "Live Stream" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Resolved", value: "Resolved" },
  { label: "Dismissed", value: "Dismissed" },
];

const statusColor: Record<ReportStatus, string> = {
  Pending: "text-warning",
  Resolved: "text-success",
  Dismissed: "text-error",
};

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const DisputesReportsPage = () => {
  const [, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 13;

  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // const { data: statsData } = useGetReportStatsQuery();
  // const stats = statsData?.data ?? DUMMY_STATS;
  const stats = DUMMY_STATS;

  // const { data } = useGetReportsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     category: categoryFilter === "all" ? undefined : categoryFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const reports = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const reports = DUMMY_REPORTS;
  const total = 250;

  const columns: Column<IReport>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Reporter", accessorKey: "reporter", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Reported User", accessorKey: "reportedUser", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Category", accessorKey: "category", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Reported Item", accessorKey: "reportedItem", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Reported Reason", accessorKey: "reportedReason", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Status",
      accessorKey: "status",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: ReportStatus) => <span className={`font-medium ${statusColor[value]}`}>{value}</span>,
    },
    { header: "Date", accessorKey: "date", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Action",
      accessorKey: "_id",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (_, row) => (
        <button
          type="button"
          onClick={() => {
            setSelectedReport(row);
            setIsDetailOpen(true);
          }}
          className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
          aria-label={`View report ${row.displayId}`}
        >
          <Eye className="size-5 text-base-color" />
        </button>
      ),
    },
  ];

  return (
    <PageWraper title="Disputes & Reports">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
          <p className="text-sm lg:text-lg text-highlight font-semibold">Pending Reports</p>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-2">{stats.pendingReports}</p>
        </div>
        <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
          <p className="text-sm lg:text-lg text-highlight font-semibold">Total Resolved</p>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-2">{stats.totalResolved}</p>
        </div>
        <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
          <p className="text-sm lg:text-lg text-highlight font-semibold">Avg Response Time</p>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-2">{stats.avgResponseTimeHours}h</p>
        </div>
      </div>

      <div>
        <h2 className="text-base lg:text-lg font-bold text-base-color mb-4">Reports</h2>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <ReuseSearchInput
            className="min-w-56"
            placeholder="Search..."
            setSearch={setSearch}
            setPage={setCurrentPage}
          />
          <ReuseFilterSelect
            options={CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
            placeholder="Category"
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

        <ReusableTable
          data={reports}
          columns={columns}
          scroll={false}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={total}
        />
      </div>

      <ReportDetailSheet open={isDetailOpen} onClose={() => setIsDetailOpen(false)} report={selectedReport} />
    </PageWraper>
  );
};

export default DisputesReportsPage;
