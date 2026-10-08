import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/form/contact-form";

export const metadata: Metadata = {
  title: "Contact | Load Shedding & Power Management System",
  description:
    "Get in touch with the Load Shedding & Power Management System team — support by email, phone and office hours.",
  openGraph: {
    title: "Contact the LSPMS team",
    description: "We usually respond within one business day.",
  },
};

const channels = [
  {
    icon: Mail,
    title: "Email",
    value: "lspms.support@gmail.com",
    description: "Best for account, payment or ticket questions.",
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "Sat – Thu, 9:00 AM – 6:00 PM",
    description: "Outage emergencies are handled around the clock.",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Dhaka, Bangladesh",
    description: "Grid operations centre for zones & substations.",
  },
];

const Contact = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about schedules, tokens or a ticket? Send a message and we
          usually respond within one business day.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="flex items-start gap-4 rounded-2xl border bg-card p-5"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                <channel.icon className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-medium">{channel.title}</p>
                <p className="font-semibold">{channel.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
