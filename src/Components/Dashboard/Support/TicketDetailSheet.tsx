import { useState } from "react";
import ReusableSheet from "@/Components/ui/CustomUi/ReuseableSheet";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import TicketDetailView from "./TicketDetailView";
import { ISupportTicket, TicketStatus } from "@/types";

interface TicketDetailSheetProps {
  open: boolean;
  onClose: () => void;
  ticket: ISupportTicket | null;
}

const TicketDetailSheet = ({ open, onClose, ticket }: TicketDetailSheetProps) => {
  const [status, setStatus] = useState<TicketStatus | null>(null);

  return (
    <ReusableSheet
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          setStatus(null);
        }
      }}
      title={
        ticket ? (
          <div className="flex items-center gap-2">
            <span>{ticket.ticketCode}</span>
            <Tag theme={(status ?? ticket.status) === "Open" ? "blue" : "success"}>{status ?? ticket.status}</Tag>
          </div>
        ) : (
          ""
        )
      }
      titleClassName="text-base-color"
      width="sm:max-w-4xl"
    >
      {ticket && <TicketDetailView ticket={ticket} onStatusChange={setStatus} />}
    </ReusableSheet>
  );
};

export default TicketDetailSheet;
