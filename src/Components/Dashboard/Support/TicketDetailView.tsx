import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { getAvatar } from "@/utils/getAvatar";
import { ISupportTicket, TicketPriority, TicketStatus } from "@/types";
// import { useUpdateTicketPriorityMutation, useUpdateTicketStatusMutation, useSendTicketReplyMutation } from "@/redux/features/support/supportApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface TicketDetailViewProps {
  ticket: ISupportTicket;
  onStatusChange: (status: TicketStatus) => void;
}

const PRIORITY_OPTIONS: FilterOption[] = [
  { label: "Urgent", value: "Urgent" },
  { label: "High", value: "High" },
  { label: "Normal", value: "Normal" },
  { label: "Low", value: "Low" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "Open", value: "Open" },
  { label: "Resolved", value: "Resolved" },
];

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-sm text-highlight">{label}</span>
    <span className="text-sm font-semibold text-base-color">{value}</span>
  </div>
);

const TicketDetailView = ({ ticket, onStatusChange }: TicketDetailViewProps) => {
  const [priority, setPriority] = useState<TicketPriority>(ticket.priority);
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [message, setMessage] = useState("");

  // const [updateTicketPriority] = useUpdateTicketPriorityMutation();
  const handlePriorityChange = (value: string) => {
    setPriority(value as TicketPriority);
    // tryCatchWrapper(updateTicketPriority, { params: { id: ticket._id }, body: { priority: value } }, { showToast: false });
  };

  // const [updateTicketStatus] = useUpdateTicketStatusMutation();
  const handleStatusChange = (value: string) => {
    setStatus(value as TicketStatus);
    onStatusChange(value as TicketStatus);
    // tryCatchWrapper(updateTicketStatus, { params: { id: ticket._id }, body: { status: value } }, { showToast: false });
  };

  // const [sendTicketReply] = useSendTicketReplyMutation();
  const handleSendReply = async () => {
    if (!message.trim()) return;
    // await tryCatchWrapper(sendTicketReply, { params: { id: ticket._id }, body: { text: message } }, { showToast: false });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full gap-5">
      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <ReuseFilterSelect options={PRIORITY_OPTIONS} value={priority} onChange={handlePriorityChange} triggerClassName="rounded-full" />
        <ReuseFilterSelect options={STATUS_OPTIONS} value={status} onChange={handleStatusChange} triggerClassName="rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 flex-1 min-h-0">
        <div className="bg-primary-color border border-base-color/10 rounded-lg flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {ticket.messages.map((msg) => (
              <div key={msg._id} className={cn("flex items-end gap-2", msg.sender === "admin" && "justify-end")}>
                {msg.sender === "user" && (
                  <Avatar className="size-7 shrink-0">
                    <AvatarImage src={ticket.userAvatar} alt={ticket.userName} />
                    <AvatarFallback className="bg-secondbase-color text-base-color text-xs font-semibold">
                      {getAvatar(ticket.userName)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 text-sm max-w-xs",
                    msg.sender === "admin" ? "bg-secondary-color text-white" : "bg-muted text-base-color"
                  )}
                >
                  {msg.text}
                </div>
                {msg.sender === "admin" && (
                  <Avatar className="size-7 shrink-0">
                    <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">eK</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-base-color/10 p-3 space-y-2">
            <Textarea
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none border-base-color/20 shadow-none min-h-16"
            />
            <div className="flex items-center justify-between">
              <Button type="button" variant="ghost" size="sm" className="text-highlight">
                <Paperclip className="size-4" />
                Send Attachment
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={handleSendReply}>
                <Send className="size-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-5 overflow-y-auto">
          <div className="flex flex-col items-center text-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src={ticket.userAvatar} alt={ticket.userName} />
              <AvatarFallback className="bg-secondbase-color text-base-color font-semibold">
                {getAvatar(ticket.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-base-color">{ticket.userName}</p>
              <p className="text-sm text-highlight">@{ticket.userHandle}</p>
            </div>
          </div>

          <div className="divide-y divide-border border-t border-b border-border">
            <InfoRow label="Join Date" value={ticket.joinDate} />
            <InfoRow label="Subscription" value={ticket.subscription} />
            <InfoRow label="Total Tickets" value={ticket.totalTickets} />
          </div>

          <div>
            <p className="text-sm font-bold text-base-color mb-3">Ticket History</p>
            <div className="space-y-3">
              {ticket.ticketHistory.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <span className="text-base-color font-medium">{item.ticketCode}</span>
                    <span className="text-highlight ml-2 truncate">{item.subject}</span>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase shrink-0",
                      item.status === "Open" ? "text-blue-600" : "text-success"
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailView;
