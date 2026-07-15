import { useState } from "react";
import { Users, User, SquareUser, Euro, type LucideIcon } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import { IRevenueStats, ITransaction } from "@/types";
// import { useGetRevenueStatsQuery, useGetTransactionsQuery } from "@/redux/features/revenue/revenueApi";

// TODO: replace with real revenue-stats API data once the endpoint exists.
const DUMMY_STATS: IRevenueStats = {
  monthlyRevenue: 12223,
  subscriptionRevenue: 45670,
  promotionsRevenue: 11222,
  overallRevenue: 12334778,
};

// TODO: replace with real transactions API data once the endpoint exists.
const DUMMY_TRANSACTIONS: ITransaction[] = Array.from({ length: 13 }, (_, i) => ({
  _id: `${i + 1}`,
  displayId: "2345",
  user: "Jason Durham",
  amount: 700,
  type: "Subscription",
  method: "Card",
  status: "Completed",
  transactionId: "TNX78777665ee4",
  date: "4/4/26",
}));

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

const RevenuePage = () => {
  const [, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 13;

  // const { data: statsData } = useGetRevenueStatsQuery();
  // const stats = statsData?.data ?? DUMMY_STATS;
  const stats = DUMMY_STATS;

  // const { data } = useGetTransactionsQuery(
  //   { page: currentPage, limit, searchParams: search.length > 0 ? search : undefined },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const transactions = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const transactions = DUMMY_TRANSACTIONS;
  const total = 250;

  const statCards: StatCard[] = [
    { label: "Monthly Revenue", value: `$${stats.monthlyRevenue}`, icon: Users },
    { label: "Revenue from Subscription", value: `$${stats.subscriptionRevenue}`, icon: User },
    { label: "Revenue from Promotions", value: `$${stats.promotionsRevenue}`, icon: SquareUser },
    { label: "Overall Revenue", value: `€${stats.overallRevenue}`, icon: Euro },
  ];

  const columns: Column<ITransaction>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "User", accessorKey: "user", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Amount",
      accessorKey: "amount",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>${value}</span>,
    },
    { header: "Type", accessorKey: "type", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Method", accessorKey: "method", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Status", accessorKey: "status", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Transaction ID", accessorKey: "transactionId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Date", accessorKey: "date", headerClassName: headerCls, cellClassName: cellCls },
  ];

  return (
    <PageWraper title="Revenue">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm lg:text-lg text-highlight font-semibold">{label}</p>
              <Icon className="size-6 text-base-color shrink-0" strokeWidth={1.75} />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-base-color mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base lg:text-lg font-bold text-base-color">Transactions</h2>
        <ReuseSearchInput
          className="min-w-56"
          placeholder="Search..."
          setSearch={setSearch}
          setPage={setCurrentPage}
        />
      </div>

      <ReusableTable
        data={transactions}
        columns={columns}
        scroll={false}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        total={total}
      />
    </PageWraper>
  );
};

export default RevenuePage;
