import type { Metadata } from "next";
import ProfilePage from "@/components/modules/account/profile-page";

export const metadata: Metadata = {
    title: "Profile & Settings",
    description: "View your account and profile details.",
};

export default function SharedProfileRoute() {
    return (
        <div className="p-10">
            <ProfilePage />
        </div>
    );
}
