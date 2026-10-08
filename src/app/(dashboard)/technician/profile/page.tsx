import type { Metadata } from "next";
import ProfilePage from "@/components/modules/account/profile-page";

export const metadata: Metadata = {
  title: "Technician Profile",
  description: "View your technician profile details.",
};

export default function TechnicianProfilePage() {
  return <ProfilePage />;
}
