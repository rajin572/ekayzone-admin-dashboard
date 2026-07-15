import OverviewPage from "@/pages/Overview/Overview";
import UserManagementPage from "@/pages/UserManagement/UserManagementPage";
import MarketplacePage from "@/pages/Marketplace/MarketplacePage";
import RevenuePage from "@/pages/Revenue/RevenuePage";
import PromotionsPage from "@/pages/Promotions/PromotionsPage";
import CommunicationsPage from "@/pages/Communications/CommunicationsPage";
import CategoryPage from "@/pages/Category/CategoryPage";
import SupportPage from "@/pages/Support/SupportPage";
import DisputesReportsPage from "@/pages/DisputesReports/DisputesReportsPage";
import FeedbackPage from "@/pages/Feedback/FeedbackPage";
import ProfileSettingsPage from "@/pages/ProfileSettings/ProfileSettingsPage";

import {
  LayoutGrid,
  Users,
  Store,
  Wallet,
  BadgePercent,
  MessageSquare,
  Tags,
  LifeBuoy,
  Flag,
  MessageCircle,
  Settings,
} from "lucide-react";

export const adminRoutes = [
  {
    title: "",
    items: [
      {
        title: "Overview",
        url: "overview",
        icon: LayoutGrid,
        element: <OverviewPage />,
      },
      {
        title: "User Management",
        url: "user-management",
        icon: Users,
        element: <UserManagementPage />,
      },
      {
        title: "Marketplace",
        url: "marketplace",
        icon: Store,
        element: <MarketplacePage />,
      },
      {
        title: "Revenue",
        url: "revenue",
        icon: Wallet,
        element: <RevenuePage />,
      },
      {
        title: "Promotions",
        url: "promotions",
        icon: BadgePercent,
        element: <PromotionsPage />,
      },
      {
        title: "Communications",
        url: "communications",
        icon: MessageSquare,
        element: <CommunicationsPage />,
      },
      {
        title: "Category",
        url: "category",
        icon: Tags,
        element: <CategoryPage />,
      },
      {
        title: "Support",
        url: "support",
        icon: LifeBuoy,
        element: <SupportPage />,
      },
      {
        title: "Disputes & Reports",
        url: "disputes-reports",
        icon: Flag,
        element: <DisputesReportsPage />,
      },
      {
        title: "Feedback",
        url: "feedback",
        icon: MessageCircle,
        element: <FeedbackPage />,
      },
      {
        title: "Profile Settings",
        url: "profile-settings",
        icon: Settings,
        element: <ProfileSettingsPage />,
      },
    ],
  },
];
