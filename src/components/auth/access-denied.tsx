import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-full bg-red-200 p-4 dark:bg-red-950">
        <ShieldAlert className="size-8 text-red-700 dark:text-red-400" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">
        You Do Not Have Access To This Page!
      </h1>
      <p className="max-w-md text-muted-foreground">
        Your account role is not allowed to view this dashboard. Please switch
        to the correct demo account to continue.
      </p>
      <Link
        href="/"
        className="font-medium text-primary underline underline-offset-4"
      >
        Go back to home
      </Link>
    </div>
  );
};

export default AccessDenied;
