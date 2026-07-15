import { Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
}

const ComingSoon = ({ title = "This section" }: ComingSoonProps) => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-12 flex flex-col items-center justify-center text-center gap-3 min-h-[320px]">
      <div className="flex items-center justify-center size-14 rounded-full bg-muted">
        <Construction className="size-7 text-secondary-color" />
      </div>
      <h2 className="text-lg font-semibold text-base-color">{title} is coming soon</h2>
      <p className="text-sm text-secondbase-color max-w-md">
        This page is currently under construction. Content and functionality will be added here soon.
      </p>
    </div>
  );
};

export default ComingSoon;
