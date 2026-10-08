import type { Metadata } from "next";
import AllocateKwForm from "@/components/modules/substation/allocate-kw-form";

export const metadata: Metadata = {
  title: "Allocate kW",
  description: "Set your substation capacity and allocated load.",
};

export default function AllocatePage() {
  return <AllocateKwForm />;
}
