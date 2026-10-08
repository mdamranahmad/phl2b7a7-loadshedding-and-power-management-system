import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface IEmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

const EmptyState = ({
  title = "Nothing here yet",
  description = "No records match the current view.",
  icon: Icon = Inbox,
  action,
}: IEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
      <div className="rounded-2xl bg-muted p-4">
        <Icon className="size-7 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default EmptyState;
