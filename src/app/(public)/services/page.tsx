import {
  BarChart3,
  CalendarClock,
  CreditCard,
  FileCheck2,
  HardHat,
  RadioTower,
  Settings2,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Features | Load Shedding & Power Management System",
  description:
    "Load-shedding schedules, bKash meter token recharge, outage reporting, technician dispatch, substation scheduling and analytics — every feature of the platform.",
  openGraph: {
    title: "Services & Features | Load Shedding & Power Management System",
    description:
      "Everything the platform does for customers, technicians and grid managers.",
  },
};

const services = [
  {
    icon: CalendarClock,
    title: "Load-Shedding Schedules",
    description:
      "Published schedule batches turn into hour-by-hour slots per area. Customers always know when power goes out, and managers publish or cancel batches in one click.",
    audience: "Customers & Managers",
  },
  {
    icon: CreditCard,
    title: "bKash Token Payments",
    description:
      "Recharge prepaid meters through bKash hosted checkout. Unpaid tokens can be settled later, and success, failure and cancel redirects are handled end to end.",
    audience: "Customers",
  },
  {
    icon: RadioTower,
    title: "Outage Reporting",
    description:
      "Report blackouts with severity, address and start time. Every report becomes a tracked ticket flowing through pending → approved → assigned → resolved.",
    audience: "Customers & Managers",
  },
  {
    icon: HardHat,
    title: "Technician Dispatch",
    description:
      "Substation managers assign approved or reopened tickets to available technicians; technicians resolve assignments from the field and free themselves up.",
    audience: "Technicians & Managers",
  },
  {
    icon: Settings2,
    title: "Substation Power Allocation",
    description:
      "Set substation capacity and allocated load in kW, then generate balanced outage schedules from the ratio between them.",
    audience: "Substation Managers",
  },
  {
    icon: FileCheck2,
    title: "Technician Applications",
    description:
      "Aspiring technicians upload a resume and credentials; managers review, approve or reject with a reason before they can receive work.",
    audience: "Technicians & Managers",
  },
  {
    icon: Users,
    title: "Role-Based Dashboards",
    description:
      "Customer, technician, zonal manager and substation manager dashboards are route- and UI-guarded so everyone only sees their own tools.",
    audience: "Everyone",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description:
      "Revenue, token counts, outage backlogs, resolution rates and technician capacity — charted from real API data on every manager dashboard.",
    audience: "Managers & Technicians",
  },
  {
    icon: Zap,
    title: "Zone-Wide Visibility",
    description:
      "Zonal managers oversee every substation batch and outage report in their zone, approving customer reports before dispatch.",
    audience: "Zonal Managers",
  },
];

const Services = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Services & Features
        </h1>
        <p className="mt-3 text-muted-foreground">
          A complete toolkit for surviving and managing load shedding — from the
          customer&apos;s meter to the control room.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex flex-col rounded-2xl border bg-card p-6"
          >
            <div className="mb-4 inline-flex w-fit rounded-xl bg-primary/10 p-2.5 text-primary">
              <service.icon className="size-5" aria-hidden />
            </div>
            <h2 className="font-semibold">{service.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {service.description}
            </p>
            <p className="mt-4 text-xs font-medium text-primary">
              For: {service.audience}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Services;
