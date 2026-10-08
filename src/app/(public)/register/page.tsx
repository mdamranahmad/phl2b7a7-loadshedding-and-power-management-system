import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/form/register-form";

export const metadata: Metadata = {
    title: "Create Account",
    description:
        "Register for the Load Shedding & Power Management System and start buying prepaid electricity tokens online.",
};

export default function RegisterPage() {
    return (
        <div className="space-y-6 flex flex-1 justify-center mt-5">
            <div>
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Create account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Register with your meter number to manage tokens and
                        outages.
                    </p>
                </div>
                <RegisterForm />
                <p className="text-center text-sm text-muted-foreground">
                    Want to join as a technician instead?{" "}
                    <Link
                        href="/apply-as-technician"
                        className="text-primary hover:underline"
                    >
                        Apply as technician
                    </Link>
                </p>
            </div>
        </div>
    );
}
