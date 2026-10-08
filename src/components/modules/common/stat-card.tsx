import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface IStatCardProps {
  label: string;
  value: ReactNode;
  description?: string;
  icon?: LucideIcon;
}

const StatCard = ({
  label,
  value,
  description,
  icon: Icon,
}: IStatCardProps) => {
  return (
    <Card size="sm">
      <CardContent className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
            <Icon className="size-5" aria-hidden />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
