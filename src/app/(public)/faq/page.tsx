import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | Load Shedding & Power Management System",
  description:
    "Answers about load-shedding schedules, bKash meter token recharges, outage tickets and role dashboards.",
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Schedules, tokens, outage reports and demo access — explained.",
  },
};

const faqs = [
  {
    question: "How is the load-shedding schedule generated?",
    answer:
      "A substation manager enters the substation capacity and allocated load in kW, plus a schedule duration and outage slot length. The system splits the window into slots and publishes a batch of per-area schedules. Published batches appear on every customer's schedule page.",
  },
  {
    question: "How do I recharge my prepaid meter?",
    answer:
      "Open My Tokens, choose a recharge amount and continue to bKash hosted checkout. After payment you are redirected back with a success, failure or cancel status, and the purchased token number appears in your token list.",
  },
  {
    question: "What happens if a payment is cancelled?",
    answer:
      "If you cancel or a bKash payment fails, the token stays UNPAID. You can retry from the token list — the unpaid token's Pay button restarts checkout for the same token.",
  },
  {
    question: "How do I use a token number on my meter?",
    answer:
      "Each token number is formatted as XXXX-XXXX-XXXX-XXXX-XXXX. Enter it into your prepaid meter after recharging, or redeem it from the Recharge Token form in My Tokens.",
  },
  {
    question: "How does an outage report get resolved?",
    answer:
      "Your report starts as PENDING. A zonal manager approves it, a substation manager assigns an available technician, and the technician marks the assignment resolved once the fault is fixed. You can follow every step by ticket number.",
  },
  {
    question: "Can I report an outage for an area with no power at all?",
    answer:
      "Yes — pick TOTAL_BLACKOUT as the severity, add the address and the time power went out. Include as much detail as possible so dispatch can prioritize.",
  },
  {
    question: "How do the demo login buttons work?",
    answer:
      "The login page has one-click demo buttons for Customer, Technician, Zonal Manager and Substation Manager. Each authenticates a real demo account and drops you straight into that role's dashboard.",
  },
  {
    question: "How do I become a technician?",
    answer:
      "Open Apply as a Technician from the login page, complete the multi-step application with your resume, verify the OTP sent to your email, and wait for a manager to approve your application.",
  },
];

const FAQ = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-muted-foreground">
          Everything about schedules, tokens, outage tickets and demo access.
        </p>
      </div>

      <Accordion className="mt-10">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
