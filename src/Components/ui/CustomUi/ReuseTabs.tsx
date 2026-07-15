import { cn } from "@/lib/utils";

export interface ReuseTabOption {
  label: string;
  value: string;
  badge?: number;
}

interface ReuseTabsProps {
  options: ReuseTabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** "default" = grouped grey pill container; "solid" = independent pills, brand-green when active */
  variant?: "default" | "solid";
}

const ReuseTabs: React.FC<ReuseTabsProps> = ({ options, value, onChange, className, variant = "default" }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        variant === "default" && "rounded-full bg-background-color p-1",
        variant === "solid" && "gap-2",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
            variant === "default" &&
              (value === option.value
                ? "bg-primary-color text-base-color shadow-sm"
                : "text-secondbase-color hover:text-base-color"),
            variant === "solid" &&
              (value === option.value
                ? "bg-secondary-color text-white"
                : "bg-white border border-border text-base-color hover:bg-muted")
          )}
        >
          {option.label}
          {typeof option.badge === "number" && option.badge > 0 && (
            <span className="flex items-center justify-center size-4 rounded-full bg-red-500 text-white text-[10px] font-semibold">
              {option.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ReuseTabs;
