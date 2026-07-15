import { Button } from "@/Components/ui/button";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getAvatar } from "@/utils/getAvatar";
import { getImageUrl } from "@/helpers/config/envConfig";
import { IPlatformUser } from "@/types";

interface RecentUserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: IPlatformUser | null;
  onSuspend: (user: IPlatformUser) => void;
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-sm text-highlight">{label}</span>
    <span className="text-sm font-semibold text-base-color">{value}</span>
  </div>
);

const RecentUserDetailModal = ({ open, onClose, user, onSuspend }: RecentUserDetailModalProps) => {
  const avatarSrc = user?.avatar ? `${getImageUrl()}${user.avatar}` : undefined;

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="User Details"
      maxWidth="sm:max-w-md"
    >
      {user && (
        <div className="flex flex-col">
          <div className="flex flex-col items-start gap-3 pb-5">
            <Avatar className="size-20">
              <AvatarImage src={avatarSrc} alt={user.fullName} />
              <AvatarFallback className="bg-secondbase-color text-base-color font-semibold text-lg">
                {getAvatar(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold text-base-color leading-tight">{user.fullName}</p>
              <p className="text-sm text-highlight mt-0.5">@{user.username}</p>
            </div>
          </div>

          <div className="border-t border-border divide-y divide-border">
            <InfoRow label="Join Date" value={user.joinDate} />
            <InfoRow label="Followers" value={user.followers.toLocaleString()} />
            <InfoRow label="Following" value={user.following.toLocaleString()} />
            <InfoRow label="Active campaigns" value={user.activeCampaigns} />
          </div>

          <div className="border-t border-border pt-5 mt-1">
            <Button
              className="bg-error hover:bg-error/90 text-white"
              onClick={() => onSuspend(user)}
            >
              Suspend User
            </Button>
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default RecentUserDetailModal;
