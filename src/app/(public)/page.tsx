import {
    BarChart3,
    CalendarClock,
    CreditCard,
    HardHat,
    MapPin,
    RadioTower,
    ShieldCheck,
    Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Load Shedding & Power Management System | Plan Around Power Cuts",
    description:
        "Check your area's load-shedding schedule, recharge prepaid meter tokens with bKash, report outages and track technician dispatch — all in one place.",
    openGraph: {
        title: "Load Shedding & Power Management System",
        description:
            "Schedules, tokens, outage reporting and power management for everyone.",
        type: "website",
    },
};

const features = [
    {
        icon: CalendarClock,
        title: "Live Load-Shedding Schedule",
        description:
            "See exactly when power goes out in your area, hour by hour, so you can plan work, study and rest around it.",
    },
    {
        icon: CreditCard,
        title: "bKash Token Recharge",
        description:
            "Buy prepaid meter tokens instantly with bKash and pay for unpaid tokens — success and cancel flows included.",
    },
    {
        icon: RadioTower,
        title: "One-Tap Outage Reporting",
        description:
            "Report a blackout with severity, location and start time. Track the ticket until it is resolved.",
    },
    {
        icon: HardHat,
        title: "Technician Dispatch",
        description:
            "Substation managers assign the right technician to each approved outage report for faster field resolution.",
    },
    {
        icon: ShieldCheck,
        title: "Role-Based Operations",
        description:
            "Customers, technicians, zonal managers and substation managers each get a dashboard built for their job.",
    },
    {
        icon: BarChart3,
        title: "Analytics & Insights",
        description:
            "Revenue, tokens, outage backlogs and technician capacity — measured with live charts on every dashboard.",
    },
];

const steps = [
    {
        title: "Check your schedule",
        description:
            "Log in as a customer and view the load-shedding schedule published for your area.",
    },
    {
        title: "Recharge or report",
        description:
            "Top up your prepaid meter with bKash, or report an outage the moment power goes down.",
    },
    {
        title: "Track the fix",
        description:
            "Managers approve and dispatch technicians; you follow the ticket until the lights come back.",
    },
];

const roles = [
    {
        icon: Zap,
        title: "Customers",
        description:
            "View schedules, buy tokens with bKash and report outages from home.",
    },
    {
        icon: HardHat,
        title: "Technicians",
        description:
            "Pick up assignments in the field and mark tickets resolved on the go.",
    },
    {
        icon: MapPin,
        title: "Managers",
        description:
            "Zonal and substation managers approve, schedule and dispatch with live analytics.",
    },
];

const Home = () => {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden border-b bg-linear-to-b from-primary/10 to-background">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
                    <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Zap className="size-3.5 text-primary" aria-hidden />
                        Real-time power management for the whole grid
                    </span>
                    <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
                        Plan your day around{" "}
                        <span className="text-primary">load shedding</span>, not
                        surprises
                    </h1>
                    <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                        Check your area&apos;s schedule, recharge prepaid meter
                        tokens with bKash, report outages and watch technicians
                        get dispatched — from one dashboard.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Button
                            size="lg"
                            nativeButton={false}
                            render={<Link href="/login">Get Started</Link>}
                        />
                        <Button
                            size="lg"
                            variant="outline"
                            nativeButton={false}
                            render={
                                <Link href="/services">Explore Features</Link>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Everything power management, one system
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        From the customer&apos;s meter to the substation control
                        room — built for real grid operations.
                    </p>
                </div>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md"
                        >
                            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
                                <feature.icon className="size-5" aria-hidden />
                            </div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="mt-1.5 text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="border-t bg-muted/40">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h2 className="text-center text-3xl font-bold tracking-tight">
                        How it works
                    </h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="relative rounded-2xl border bg-background p-6"
                            >
                                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {index + 1}
                                </span>
                                <h3 className="mt-4 font-semibold">
                                    {step.title}
                                </h3>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roles */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <h2 className="text-center text-3xl font-bold tracking-tight">
                    Built for every role in the network
                </h2>
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {roles.map((role) => (
                        <div
                            key={role.title}
                            className="flex flex-col items-start gap-3 rounded-2xl border p-6"
                        >
                            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                                <role.icon className="size-5" aria-hidden />
                            </div>
                            <h3 className="font-semibold">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {role.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="border-t bg-primary text-primary-foreground">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-14 text-center">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Ready to take control of your power?
                    </h2>
                    <p className="max-w-xl text-primary-foreground/80">
                        Use the one-click demo login and explore any role in
                        seconds.
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        nativeButton={false}
                        render={<Link href="/login">Try the Demo Login →</Link>}
                    />
                </div>
            </section>
        </>
    );
};

export default Home;
