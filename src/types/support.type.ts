import { IMeta } from "./common.type";

export type TicketPriority = "Urgent" | "High" | "Normal" | "Low";
export type TicketStatus = "Open" | "Resolved";

export interface ITicketMessage {
  _id: string;
  sender: "user" | "admin";
  text: string;
}

export interface ITicketHistoryItem {
  ticketCode: string;
  subject: string;
  status: TicketStatus;
}

export interface ISupportTicket {
  _id: string;
  ticketCode: string;
  userName: string;
  userHandle: string;
  userAvatar?: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdDate: string;
  joinDate: string;
  subscription: string;
  totalTickets: number;
  messages: ITicketMessage[];
  ticketHistory: ITicketHistoryItem[];
}

export interface IGetTicketsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ISupportTicket[];
    meta: IMeta;
  };
}

export interface IGetTicketDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ISupportTicket;
}
