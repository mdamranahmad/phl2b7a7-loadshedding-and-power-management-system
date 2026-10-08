"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ITablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageArray(
  totalPages: number,
  page: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  if (page >= totalPages - 3)
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
}

/** URL-backed pagination controls (page always reflected as `?page=n`). */
const TablePagination = ({
  page,
  totalPages,
  onPageChange,
}: ITablePaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(event) => {
              event.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {getPageArray(totalPages, page).map((entry) =>
          entry === "ellipsis" ? (
            <PaginationItem key="ellipsis">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={entry}>
              <PaginationLink
                isActive={entry === page}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(entry);
                }}
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={(event) => {
              event.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
