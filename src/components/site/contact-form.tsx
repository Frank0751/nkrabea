"use client";

import * as React from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormUnavailable, Honeypot } from "./form-guard";
import { FORMS_ENABLED, HONEYPOT_FIELD, submitToWeb3Forms } from "@/lib/web3forms";
import { ORG } from "@/lib/content";

const INTENTS = [
  { value: "general", label: "General enquiry" },
  { value: "partnership", label: "Partnership or funding" },
  { value: "programme", label: "A programme" },
  { value: "volunteer", label: "Volunteering" },
  { value: "media", label: "Media and press" },
];

export function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [intent, setIntent] = React.useState("general");
  const formId = React.useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const label =
      INTENTS.find((i) => i.value === intent)?.label ?? "General enquiry";

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      toast.error("Name, email and message are required.");
      setLoading(false);
      return;
    }

    try {
      const result = await submitToWeb3Forms(
        {
          subject: `Website contact: ${label} from ${name}`,
          email,
          Name: name,
          About: label,
          Message: message,
          [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD) ? "true" : "",
        },
        ORG.email
      );
      if (!result.ok) throw new Error(result.error);

      toast.success(
        "Your message has been sent. We aim to respond within three working days."
      );
      form.reset();
      setIntent("general");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <FormUnavailable />
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${formId}-name`}>
            Your name <span className="text-emphasis">*</span>
          </Label>
          <Input
            id={`${formId}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`}>
            Email <span className="text-emphasis">*</span>
          </Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor={`${formId}-intent`}>What is this about?</Label>
        <Select value={intent} onValueChange={setIntent}>
          <SelectTrigger id={`${formId}-intent`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INTENTS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor={`${formId}-message`}>
          Message <span className="text-emphasis">*</span>
        </Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          placeholder="How can we help?"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading || !FORMS_ENABLED}
        className="mt-6 w-full sm:w-auto"
      >
        {loading ? "Sending..." : "Send message"}
        {!loading && <Send className="ml-2 h-4 w-4" aria-hidden="true" />}
      </Button>
    </form>
  );
}
