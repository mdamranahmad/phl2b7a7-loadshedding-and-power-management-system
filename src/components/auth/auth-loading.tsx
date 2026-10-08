import { Spinner } from "@/components/ui/spinner";

const AuthLoading = ({
  label = "Checking your session",
}: {
  label?: string;
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <Spinner className="size-6" />
      <p className="text-sm text-muted-foreground">{label}...</p>
    </div>
  );
};

export default AuthLoading;
