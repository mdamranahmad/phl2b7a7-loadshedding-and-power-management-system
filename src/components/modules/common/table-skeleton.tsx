import { skeletonKeys } from "@/components/modules/common/skeleton-keys";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ITableSkeletonProps {
  columns: number;
  rows?: number;
}

/** Row/cell skeleton used by `loading.tsx` route files. */
const TableSkeleton = ({ columns, rows = 5 }: ITableSkeletonProps) => {
  return (
    <div className="rounded-2xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {skeletonKeys(columns).map((key) => (
              <TableHead key={key}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonKeys(rows).map((rowKey) => (
            <TableRow key={rowKey}>
              {skeletonKeys(columns).map((cellKey) => (
                <TableCell key={cellKey}>
                  <Skeleton className="h-4 w-full min-w-16" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
