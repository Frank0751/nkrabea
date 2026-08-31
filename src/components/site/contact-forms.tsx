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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ContactForms() {
  return (
    <Tabs defaultValue="booking" className="w-full">
      <TabsList
        className="grid w-full grid-cols-3"
        aria-label="Choose what to send us"
      >
        <TabsTrigger value="booking">Booking</TabsTrigger>
        <TabsTrigger value="message">Message</TabsTrigger>
        <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
      </TabsList>

      <TabsContent value="booking" className="mt-6">
        <BookingForm />
      </TabsContent>
      <TabsContent value="message" className="mt-6">
        <MessageForm />
      </TabsContent>
      <TabsContent value="newsletter" className="mt-6">
        <NewsletterForm />
      </TabsContent>
    </Tabs>
  );
}

function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      {children}
    </div>
  );
}

function BookingForm() {
  const [loading, setLoading] = React.useState(false);
  const [eventType, setEventType] = React.useState("performance");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          eventType,
          date: data.get("date"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Request failed");
      }
      toast.success(json.message);
      form.reset();
      setEventType("performance");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not send request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormShell>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required placeholder="Ama Mensah" />
          <Field label="Email" name="email" type="email" required placeholder="you@org.com" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone (optional)" name="phone" placeholder="+233 ..." />
          <Field label="Preferred date" name="date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventType">Engagement type</Label>
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger id="eventType" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Live performance</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="residency">Residency</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
              <SelectItem value="corporate">Corporate event</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-message">
            Tell us about your event
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          </Label>
          <Textarea
            id="b-message"
            name="message"
            required
            rows={4}
            placeholder="Venue, audience size, what you would like the ensemble to present..."
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Request booking"}
        </Button>
      </form>
    </FormShell>
  );
}

function MessageForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject") || "General Enquiry",
          message: data.get("message"),
          intent: "general",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Request failed");
      }
      toast.success(json.message);
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not send message."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormShell>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required placeholder="Your name" />
          <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <Field label="Subject" name="subject" placeholder="General Enquiry" />
        <div className="space-y-2">
          <Label htmlFor="c-message">
            Message
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          </Label>
          <Textarea
            id="c-message"
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Send message"}
        </Button>
      </form>
    </FormShell>
  );
}

function NewsletterForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Subscription failed");
      }
      toast.success(json.message);
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not subscribe."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormShell>
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Stay close to the rhythm
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Show announcements, workshop dates and heritage notes. No noise, a
          few times a year.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Name (optional)" name="name" placeholder="Your name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </FormShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-required={required}
      />
    </div>
  );
}
