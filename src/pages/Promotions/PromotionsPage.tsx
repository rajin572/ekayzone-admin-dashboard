import { useState } from "react";
import { Trash2, Video } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { IPromotion } from "@/types";
// import { useGetPromotionsQuery, useDeletePromotionMutation } from "@/redux/features/promotion/promotionApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real promotions API data once the endpoint exists.
const DUMMY_PROMOTIONS: IPromotion[] = Array.from({ length: 13 }, (_, i) => ({
  _id: `${i + 1}`,
  displayId: "2345",
  creator: "Alex Morgan",
  videoTitle: "How to make Coffee at Home",
  product: "Coffee Machine",
  goal: "More Views",
  budget: 50,
  spendPercentage: 32,
  reach: 12400,
  daysLeft: 5,
  status: "Active",
}));

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Paused", value: "Paused" },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
];

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const PromotionsPage = () => {
  const [, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 13;

  const [selectedPromotion, setSelectedPromotion] = useState<IPromotion | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // const { data } = useGetPromotionsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const promotions = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const promotions = DUMMY_PROMOTIONS;
  const total = 250;

  // const [deletePromotion] = useDeletePromotionMutation();
  const handleConfirmDelete = async (_promotion: IPromotion) => {
    // const res = await tryCatchWrapper(
    //   deletePromotion,
    //   { params: { id: _promotion._id } },
    //   { toastLoadingMessage: "Deleting promotion..." }
    // );
    // if (res?.success) setIsDeleteConfirmOpen(false);
    setIsDeleteConfirmOpen(false);
  };

  const columns: Column<IPromotion>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Creator", accessorKey: "creator", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Video",
      accessorKey: "videoTitle",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-secondbase-color flex items-center justify-center shrink-0">
            <Video className="size-4 text-highlight" />
          </div>
          <span className="truncate max-w-28 inline-block align-middle">{value}</span>
        </div>
      ),
    },
    { header: "Product", accessorKey: "product", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Goal", accessorKey: "goal", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Budget",
      accessorKey: "budget",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>${value}</span>,
    },
    {
      header: "Spend",
      accessorKey: "spendPercentage",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>{value}%</span>,
    },
    { header: "Reach", accessorKey: "reach", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Days Left",
      accessorKey: "daysLeft",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: number) => <span>{value}d</span>,
    },
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
            setSelectedPromotion(row);
            setIsDeleteConfirmOpen(true);
          }}
          className="p-2 rounded-lg bg-error hover:bg-error/90 transition-colors cursor-pointer"
          aria-label={`Delete ${row.videoTitle}`}
        >
          <Trash2 className="size-4 text-white" />
        </button>
      ),
    },
  ];

  return (
    <PageWraper
      title="Promotions"
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <ReuseSearchInput
            className="min-w-56"
            placeholder="Search..."
            setSearch={setSearch}
            setPage={setCurrentPage}
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
        data={promotions}
        columns={columns}
        scroll={false}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        total={total}
      />

      <ConfirmModal<IPromotion>
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        currentRecord={selectedPromotion}
        onConfirm={handleConfirmDelete}
        title="Delete Promotion"
        description={`Are you sure you want to delete "${selectedPromotion?.videoTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />
    </PageWraper>
  );
};

export default PromotionsPage;
