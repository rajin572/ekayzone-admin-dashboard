import { FeedbackMood } from "@/types";

export const moodEmoji: Record<FeedbackMood, string> = {
  "Loves it": "🤩",
  Happy: "😊",
  Neutral: "😐",
  Frustrated: "😕",
  Angry: "😡",
};

export const MOOD_OPTIONS: { label: string; value: string }[] = [
  { label: "All Moods", value: "all" },
  { label: "Loves it", value: "Loves it" },
  { label: "Happy", value: "Happy" },
  { label: "Neutral", value: "Neutral" },
  { label: "Frustrated", value: "Frustrated" },
  { label: "Angry", value: "Angry" },
];
