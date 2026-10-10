import { BarChart3, Building2, Cpu, LineChart, Users, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | Load Shedding & Power Management System",
  description:
    "We build the software layer between power distributors and the people living with load shedding — transparent schedules, digital tokens and accountable outage response.",
  openGraph: {
    title: "About the Load Shedding & Power Management System",
    description:
      "The mission, the people and the technology behind the platform.",
  },
};

const values = [
  {
    icon: Zap,
    title: "Transparency",
    description:
      "Schedules, tickets and payments are visible to everyone who needs them — no phone calls, no guesswork.",
  },
  {
    icon: Users,
    title: "Accountability",
    description:
      "Every outage report carries a ticket number and a status, so nothing quietly disappears.",
  },
  {
    icon: LineChart,
    title: "Data over guesswork",
    description:
      "Managers allocate capacity and generate schedules from real numbers instead of hunches.",
  },
];

const stats = [
  { icon: Building2, label: "Zones & substations managed" },
  { icon: BarChart3, label: "Live analytics on every dashboard" },
  { icon: Cpu, label: "Cookie-based JWT auth with role guards" },
];

const About = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          About the system
        </h1>
        <p className="mt-4 text-muted-foreground">
          Load shedding is a daily reality across Bangladesh. Most people still
          find out when the power goes off — and find out again when it returns.
          We built this platform so customers, technicians and grid operators
          work from the same clock.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-2xl border bg-card p-6">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
              <value.icon className="size-5" aria-hidden />
            </div>
            <h2 className="font-semibold">{value.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-3xl border bg-muted/40 p-8 md:p-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">
            One platform, four roles
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Customers check schedules and recharge meters. Technicians close
            tickets in the field. Substation managers generate load-shedding
            batches and dispatch crews. Zonal managers approve reports across
            every substation in their zone. Each role is enforced at both the
            route level and the UI level.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center gap-2.5 rounded-xl bg-background px-4 py-3 text-sm"
              >
                <stat.icon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {stat.label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/services">See all features</Link>}
            />
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/login">Try the demo</Link>}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
