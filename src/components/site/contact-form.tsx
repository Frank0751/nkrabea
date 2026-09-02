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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: label,
          intent,
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Request failed");

      toast.success(json.message);
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
        disabled={loading}
        className="mt-6 w-full sm:w-auto"
      >
        {loading ? "Sending..." : "Send message"}
        {!loading && <Send className="ml-2 h-4 w-4" aria-hidden="true" />}
      </Button>
    </form>
  );
}
