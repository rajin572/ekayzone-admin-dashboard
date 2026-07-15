import { Users, User, SquareUser, Euro, type LucideIcon } from "lucide-react";
import { IOverviewStats } from "@/types";

interface OverviewStatCardsProps {
  stats: IOverviewStats;
}

interface StatCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

const OverviewStatCards = ({ stats }: OverviewStatCardsProps) => {
  const cards: StatCard[] = [
    { label: "Total Users", value: `${stats.totalUsers}`, icon: Users },
    { label: "Active Today", value: `${stats.activeToday}`, icon: User },
    { label: "Total Subscribers", value: `${stats.totalSubscribers}`, icon: SquareUser },
    { label: "Total Videos", value: `€${stats.totalVideos}`, icon: Euro },
    { label: "Total Listings", value: `${stats.totalListings}`, icon: Users },
    { label: "Overall Revenue", value: `${stats.overallRevenue}`, icon: User },
    { label: "Active Campaigns", value: `${stats.activeCampaigns}`, icon: SquareUser },
    { label: "Open Tickets", value: `${stats.openTickets}`, icon: Euro },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm lg:text-lg text-highlight font-semibold">{label}</p>
            <Icon className="size-6 text-base-color shrink-0" strokeWidth={1.75} />
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-base-color mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewStatCards;
