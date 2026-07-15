import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { IFeedback } from "@/types";
import { moodEmoji } from "./moodOptions";

interface FeedbackDetailModalProps {
  open: boolean;
  onClose: () => void;
  feedback: IFeedback | null;
}

const DetailField = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-sm text-base-color/70 font-bold">{label}</p>
    <div className="text-base text-base-color mt-1">{value}</div>
  </div>
);

const FeedbackDetailModal = ({ open, onClose, feedback }: FeedbackDetailModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Feedback Details"
      maxWidth="sm:max-w-md"
    >
      {feedback && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <DetailField label="User" value={<span className="font-medium">{feedback.userName}</span>} />
            <DetailField
              label="Mood"
              value={
                <span className="flex items-center gap-1.5 font-medium">
                  <span>{moodEmoji[feedback.mood]}</span>
                  {feedback.mood}
                </span>
              }
            />
          </div>
          <DetailField label="Feedback" value={<p className="leading-relaxed">{feedback.feedback}</p>} />
          <DetailField label="Date" value={feedback.date} />
        </div>
      )}
    </ReusableModal>
  );
};

export default FeedbackDetailModal;
