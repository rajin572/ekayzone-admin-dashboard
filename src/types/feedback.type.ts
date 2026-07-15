import { IMeta } from "./common.type";

export type FeedbackMood = "Loves it" | "Happy" | "Neutral" | "Frustrated" | "Angry";

export interface IFeedback {
  _id: string;
  displayId: string;
  userName: string;
  mood: FeedbackMood;
  feedback: string;
  date: string;
}

export interface IGetFeedbackResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IFeedback[];
    meta: IMeta;
  };
}
