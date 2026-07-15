import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import TicketDetailSheet from "@/Components/Dashboard/Support/TicketDetailSheet";
import { ISupportTicket, TicketPriority, TicketStatus } from "@/types";
// import { useGetTicketsQuery } from "@/redux/features/support/supportApi";

const TICKET_HISTORY = [
  { ticketCode: "TKT 982", subject: "Can't upload video", status: "Open" as TicketStatus },
  { ticketCode: "TKT 982", subject: "Can't upload video", status: "Resolved" as TicketStatus },
  { ticketCode: "TKT 983", subject: "Unable to access settings", status: "Resolved" as TicketStatus },
];

const MESSAGES: ISupportTicket["messages"] = [
  { _id: "1", sender: "user", text: "omg, this is amazing" },
  { _id: "2", sender: "user", text: "perfect! ✅" },
  { _id: "3", sender: "user", text: "Wow, this is really epic" },
  { _id: "4", sender: "admin", text: "How are you?" },
];

const PRIORITY_STATUS_PATTERN: [TicketPriority, TicketStatus][] = [
  ["High", "Open"],
  ["Normal", "Open"],
  ["Urgent", "Open"],
  ["High", "Open"],
  ["High", "Open"],
  ["High", "Open"],
  ["High", "Open"],
  ["High", "Resolved"],
  ["High", "Resolved"],
  ["High", "Resolved"],
  ["High", "Resolved"],
  ["High", "Resolved"],
  ["High", "Resolved"],
];

// TODO: replace with real support-tickets API data once the endpoint exists.
const DUMMY_TICKETS: ISupportTicket[] = PRIORITY_STATUS_PATTERN.map(([priority, status], i) => ({
  _id: `${i + 1}`,
  ticketCode: "TKT-0001",
  userName: "Nina Collin",
  userHandle: "i'mnina",
  subject: "Cannot upload video",
  priority,
  status,
  createdDate: "April 26, 2025",
  joinDate: "2023-06-15",
  subscription: "Pro",
  totalTickets: 3,
  messages: MESSAGES,
  ticketHistory: TICKET_HISTORY,
}));

const PRIORITY_OPTIONS: FilterOption[] = [
  { label: "All Priority", value: "all" },
  { label: "Urgent", value: "Urgent" },
  { label: "High", value: "High" },
  { label: "Normal", value: "Normal" },
  { label: "Low", value: "Low" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Open", value: "Open" },
  { label: "Resolved", value: "Resolved" },
];

const priorityColor: Record<TicketPriority, string> = {
  Urgent: "text-error",
  High: "text-warning",
  Normal: "text-base-color",
  Low: "text-highlight",
};

const statusColor: Record<TicketStatus, string> = {
  Open: "text-blue-600",
  Resolved: "text-success",
};

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const SupportPage = () => {
  const [, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 13;

  const [selectedTicket, setSelectedTicket] = useState<ISupportTicket | null>(null);

  // const { data } = useGetTicketsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     priority: priorityFilter === "all" ? undefined : priorityFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const tickets = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const tickets = DUMMY_TICKETS;
  const total = 250;

  const columns: Column<ISupportTicket>[] = [
    { header: "ID", accessorKey: "ticketCode", headerClassName: headerCls, cellClassName: cellCls },
    { header: "User Name", accessorKey: "userName", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Subject", accessorKey: "subject", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Priority",
      accessorKey: "priority",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: TicketPriority) => <span className={`font-medium ${priorityColor[value]}`}>{value}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: TicketStatus) => <span className={`font-medium ${statusColor[value]}`}>{value}</span>,
    },
    { header: "Created", accessorKey: "createdDate", headerClassName: headerCls, cellClassName: cellCls },
  ];

  return (
    <PageWraper title="Support">
      <div className="flex flex-wrap items-center gap-3">
        <ReuseSearchInput
          className="min-w-56"
          placeholder="Search..."
          setSearch={setSearch}
          setPage={setCurrentPage}
        />
        <ReuseFilterSelect
          options={PRIORITY_OPTIONS}
          value={priorityFilter}
          onChange={(value) => {
            setPriorityFilter(value);
            setCurrentPage(1);
          }}
          placeholder="Priority"
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
        data={tickets}
        columns={columns}
        scroll={false}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        total={total}
        onRowClick={(row) => setSelectedTicket(row)}
      />

      <TicketDetailSheet
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
      />
    </PageWraper>
  );
};

export default SupportPage;
