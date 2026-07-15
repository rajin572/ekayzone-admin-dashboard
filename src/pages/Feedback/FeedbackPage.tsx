import { useState } from "react";
import { Eye } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import FeedbackDetailModal from "@/Components/Dashboard/Feedback/FeedbackDetailModal";
import { moodEmoji, MOOD_OPTIONS } from "@/Components/Dashboard/Feedback/moodOptions";
import { IFeedback } from "@/types";
// import { useGetFeedbackQuery } from "@/redux/features/feedback/feedbackApi";

// TODO: replace with real feedback API data once the endpoint exists.
const DUMMY_FEEDBACK: IFeedback[] = Array.from({ length: 14 }, (_, i) => ({
  _id: `${i + 1}`,
  displayId: "2345",
  userName: "Nina Collin",
  mood: "Loves it",
  feedback: "The For You Feed is absolutely amazing. I love how personalized it feels!",
  date: "April 27, 2026",
}));

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const FeedbackPage = () => {
  const [, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 14;

  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // const { data } = useGetFeedbackQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     mood: moodFilter === "all" ? undefined : moodFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const feedbackList = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const feedbackList = DUMMY_FEEDBACK;
  const total = 250;

  const columns: Column<IFeedback>[] = [
    { header: "ID", accessorKey: "displayId", headerClassName: headerCls, cellClassName: cellCls },
    { header: "User Name", accessorKey: "userName", headerClassName: headerCls, cellClassName: cellCls },
    {
      header: "Mood",
      accessorKey: "mood",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: IFeedback["mood"]) => (
        <span className="flex items-center gap-1.5">
          <span>{moodEmoji[value]}</span>
          {value}
        </span>
      ),
    },
    {
      header: "Feedback",
      accessorKey: "feedback",
      headerClassName: headerCls,
      cellClassName: cellCls,
      render: (value: string) => <span className="truncate max-w-xs inline-block align-middle">{value}</span>,
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
            setSelectedFeedback(row);
            setIsDetailOpen(true);
          }}
          className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
          aria-label={`View feedback from ${row.userName}`}
        >
          <Eye className="size-5 text-base-color" />
        </button>
      ),
    },
  ];

  return (
    <PageWraper title="Feedback">
      <div className="flex flex-wrap items-center gap-3">
        <ReuseSearchInput
          className="min-w-56"
          placeholder="Search..."
          setSearch={setSearch}
          setPage={setCurrentPage}
        />
        <ReuseFilterSelect
          options={MOOD_OPTIONS}
          value={moodFilter}
          onChange={(value) => {
            setMoodFilter(value);
            setCurrentPage(1);
          }}
          placeholder="Mood"
          triggerClassName="rounded-full"
        />
      </div>

      <ReusableTable
        data={feedbackList}
        columns={columns}
        scroll={false}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        total={total}
      />

      <FeedbackDetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        feedback={selectedFeedback}
      />
    </PageWraper>
  );
};

export default FeedbackPage;
