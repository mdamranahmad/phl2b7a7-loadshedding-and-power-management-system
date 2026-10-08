import type { Metadata } from "next";
import GenerateScheduleWizard from "@/components/modules/substation/generate-schedule-wizard";

export const metadata: Metadata = {
  title: "Generate Schedule",
  description: "Create a new load-shedding schedule batch for your substation.",
};

export default function GenerateSchedulePage() {
  return <GenerateScheduleWizard />;
}
