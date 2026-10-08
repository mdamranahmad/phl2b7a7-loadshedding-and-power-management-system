"use client";

import { useForm } from "@tanstack/react-form";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { contactZSchema, type IContactFormValues } from "@/validation";

const SUPPORT_EMAIL = "lspms.support@gmail.com";

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    } satisfies IContactFormValues,
    validators: { onSubmit: contactZSchema },
    onSubmit: ({ value }) => {
      const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
        `[Website] ${value.subject}`,
      )}&body=${encodeURIComponent(
        `${value.message}\n\n—\n${value.name}\n${value.email}`,
      )}`;
      // No backend contact endpoint exists — hand the message to the
      // visitor's email client, addressed to support.
      window.location.href = mailto;
      toast.add({
        title: "Opening your email app",
        description: `Your message is ready to send to ${SUPPORT_EMAIL}`,
        type: "success",
      });
    },
  });

  const renderField = (
    name: keyof IContactFormValues,
    label: string,
    input: React.ReactNode,
  ) => (
    <form.Field name={name}>
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {input}
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    </form.Field>
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="rounded-2xl border bg-card p-6"
    >
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderField(
            "name",
            "Your Name",
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Jane Doe"
              value={form.state.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.target.value)
              }
            />,
          )}
          {renderField(
            "email",
            "Email",
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.state.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.target.value)
              }
            />,
          )}
        </div>
        {renderField(
          "subject",
          "Subject",
          <Input
            id="subject"
            name="subject"
            placeholder="Schedule question for area01"
            value={form.state.values.subject}
            onChange={(event) =>
              form.setFieldValue("subject", event.target.value)
            }
          />,
        )}
        {renderField(
          "message",
          "Message",
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="How can we help?"
            value={form.state.values.message}
            onChange={(event) =>
              form.setFieldValue("message", event.target.value)
            }
          />,
        )}
        <Button
          type="submit"
          disabled={form.state.isSubmitting}
          className="w-full sm:w-auto"
        >
          {form.state.isSubmitting ? (
            <Spinner>Sending...</Spinner>
          ) : (
            <>
              <Send className="size-4" />
              Send Message
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ContactForm;
