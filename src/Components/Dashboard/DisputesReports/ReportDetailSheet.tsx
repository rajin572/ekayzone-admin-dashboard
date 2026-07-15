import { useState } from "react";
import ReusableSheet from "@/Components/ui/CustomUi/ReuseableSheet";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { getAvatar } from "@/utils/getAvatar";
import { IReport, ReportStatus } from "@/types";
// import { useDismissReportMutation, useWarnCreatorMutation, useRemoveContentMutation, useSuspendReportedAccountMutation } from "@/redux/features/disputesReports/disputesReportsApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface ReportDetailSheetProps {
  open: boolean;
  onClose: () => void;
  report: IReport | null;
}

const statusTheme: Record<ReportStatus, "warning" | "success" | "error"> = {
  Pending: "warning",
  Resolved: "success",
  Dismissed: "error",
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold text-highlight uppercase tracking-wide">{children}</p>
);

const ReportDetailSheet = ({ open, onClose, report }: ReportDetailSheetProps) => {
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);

  // const [dismissReport] = useDismissReportMutation();
  const handleDismiss = async (_report: IReport) => {
    // await tryCatchWrapper(dismissReport, { params: { id: _report._id } }, { toastLoadingMessage: "Dismissing report..." });
    onClose();
  };

  // const [warnCreator] = useWarnCreatorMutation();
  const handleWarnCreator = async (_report: IReport) => {
    // await tryCatchWrapper(warnCreator, { params: { id: _report._id } }, { toastLoadingMessage: "Warning creator..." });
    onClose();
  };

  // const [removeContent] = useRemoveContentMutation();
  const handleRemoveContent = async (_report: IReport) => {
    // await tryCatchWrapper(removeContent, { params: { id: _report._id } }, { toastLoadingMessage: "Removing content..." });
    onClose();
  };

  // const [suspendReportedAccount] = useSuspendReportedAccountMutation();
  const handleConfirmSuspend = async (_report: IReport, _reason?: string) => {
    // const res = await tryCatchWrapper(
    //   suspendReportedAccount,
    //   { params: { id: _report._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Suspending account..." }
    // );
    // if (res?.success) { setIsSuspendConfirmOpen(false); onClose(); }
    setIsSuspendConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <ReusableSheet
        open={open}
        onOpenChange={(v) => !v && onClose()}
        title={
          report ? (
            <div className="flex items-center gap-2">
              <span>Report #{report.displayId}</span>
              <Tag theme={statusTheme[report.status]}>{report.status}</Tag>
            </div>
          ) : (
            ""
          )
        }
        titleClassName="text-base-color"
        description={report?.timeAgoLabel}
        footer={
          report && (
            <div className="w-full space-y-3">
              <SectionLabel>Actions</SectionLabel>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => handleDismiss(report)}>
                  Dismiss
                </Button>
                <Button variant="outline" className="border-warning text-warning" onClick={() => handleWarnCreator(report)}>
                  Warn Creator
                </Button>
                <Button variant="outline" className="border-error text-error" onClick={() => handleRemoveContent(report)}>
                  Remove Content
                </Button>
                <Button
                  className="bg-error hover:bg-error/90 text-white"
                  onClick={() => setIsSuspendConfirmOpen(true)}
                >
                  Suspend Account
                </Button>
              </div>
            </div>
          )
        }
      >
        {report && (
          <div className="space-y-5">
            <div className="space-y-2">
              <SectionLabel>Reported Item</SectionLabel>
              <div className="flex items-center gap-3 border-t border-border pt-3">
                <div className="size-12 rounded-md bg-secondbase-color shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-base-color">{report.reportedItem}</p>
                  {report.listedBy && (
                    <p className="text-xs text-highlight mt-0.5">listed by {report.listedBy}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <SectionLabel>Report Details</SectionLabel>
              <p className="text-sm text-base-color">
                <span className="font-medium">Reason:</span> {report.reportedReason}
              </p>
              <p className="text-sm text-base-color">
                <span className="font-medium">Details:</span> {report.reportedDetails}
              </p>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <SectionLabel>Reported by ({report.reportedBy.length} users)</SectionLabel>
              <div className="space-y-3">
                {report.reportedBy.map((reporter) => (
                  <div key={reporter.handle} className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-secondbase-color text-base-color text-xs font-semibold">
                        {getAvatar(reporter.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-base-color leading-tight">{reporter.name}</p>
                      <p className="text-xs text-highlight leading-tight">@{reporter.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ReusableSheet>

      <ConfirmModal<IReport>
        open={isSuspendConfirmOpen}
        onCancel={() => setIsSuspendConfirmOpen(false)}
        currentRecord={report}
        onConfirm={handleConfirmSuspend}
        title="Suspend Account"
        description={`Temporarily suspend ${report?.reportedUser}'s account from the platform`}
        confirmText="Suspend Account"
        cancelText="Cancel"
        variant="danger"
        withReason
        reasonLabel="Reason for Suspension"
        reasonRequired
      />
    </>
  );
};

export default ReportDetailSheet;
