import { Home, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <SearchX className="size-9 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-2xl font-bold tracking-tight">
          This page could not be found.
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <Button render={<Link href="/">Back to Home</Link>}>
        <Home className="size-4" />
      </Button>
    </div>
  );
}
