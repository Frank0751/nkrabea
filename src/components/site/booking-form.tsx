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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ENGAGEMENT_TYPES = [
  { value: "performance", label: "Live performance" },
  { value: "workshop", label: "Workshop" },
  { value: "residency", label: "Residency" },
  { value: "festival", label: "Festival" },
  { value: "corporate", label: "Corporate event" },
];

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

export function BookingForm() {
  const [loading, setLoading] = React.useState(false);
  const [eventType, setEventType] = React.useState("performance");
  const [errors, setErrors] = React.useState<Errors>({});

  function validate(values: {
    name: string;
    email: string;
    message: string;
  }): Errors {
    const next: Errors = {};
    if (!values.name.trim()) {
      next.name = "Please tell us your name.";
    }
    if (!values.email.trim()) {
      next.email = "Email is required so we can reply.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      next.message = "Tell us a little about your event.";
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: String(data.get("phone") ?? ""),
          eventType,
          date: String(data.get("date") ?? ""),
          message: values.message,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Request failed");
      }
      toast.success(json.message);
      form.reset();
      setEventType("performance");
      setErrors({});
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not send request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            name="name"
            id="bk-name"
            required
            placeholder="Ama Mensah"
            error={errors.name}
          />
          <Field
            label="Email"
            name="email"
            id="bk-email"
            type="email"
            required
            placeholder="you@org.com"
            error={errors.email}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Phone (optional)"
            name="phone"
            id="bk-phone"
            placeholder="+233 ..."
          />
          <Field
            label="Preferred date"
            name="date"
            id="bk-date"
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bk-eventType">Engagement type</Label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger id="bk-eventType" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {ENGAGEMENT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bk-message">
            Tell us about your event
            <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>
          </Label>
          <Textarea
            id="bk-message"
            name="message"
            required
            rows={5}
            placeholder="Venue, audience size, what you would like the ensemble to present..."
            aria-invalid={!!errors.message}
            aria-required="true"
          />
          {errors.message && (
            <p role="alert" className="text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Request booking"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  id,
  type = "text",
  required = false,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>
        )}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-required={required ? "true" : undefined}
      />
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
