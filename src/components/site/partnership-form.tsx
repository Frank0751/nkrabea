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
import { PROGRAMMES, ORG } from "@/lib/content";
import { FormUnavailable, Honeypot } from "./form-guard";
import { FORMS_ENABLED, HONEYPOT_FIELD, submitToWeb3Forms } from "@/lib/web3forms";

const PARTNER_TYPES = [
  { value: "corporate", label: "Corporate sponsor" },
  { value: "grant", label: "Grant funder or foundation" },
  { value: "government", label: "Government or institutional partner" },
  { value: "in-kind", label: "In-kind support" },
  { value: "individual", label: "Individual supporter" },
];

export function PartnershipForm() {
  const [loading, setLoading] = React.useState(false);
  const [partnerType, setPartnerType] = React.useState("corporate");
  const [programme, setProgramme] = React.useState("any");
  const formId = React.useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const typeLabel =
      PARTNER_TYPES.find((t) => t.value === partnerType)?.label ?? partnerType;
    const programmeName =
      programme === "any"
        ? "No preference yet"
        : (PROGRAMMES.find((p) => p.id === programme)?.name ?? programme);

    if (!name || !email || !message) {
      toast.error("Name, email and message are required.");
      setLoading(false);
      return;
    }

    try {
      const result = await submitToWeb3Forms(
        {
          subject: `Partnership enquiry from ${organisation || name}`,
          email,
          Name: name,
          Organisation: organisation || "Not given",
          Phone: phone || "Not given",
          "Partnership type": typeLabel,
          "Programme of interest": programmeName,
          Message: message,
          [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD) ? "true" : "",
        },
        ORG.email
      );
      if (!result.ok) throw new Error(result.error);

      toast.success(
        "Thank you. Your enquiry has reached the Executive Director, who will respond directly."
      );
      form.reset();
      setPartnerType("corporate");
      setProgramme("any");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not send your enquiry. Please try again."
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
            Your name <Req />
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
          <Label htmlFor={`${formId}-org`}>Organisation</Label>
          <Input
            id={`${formId}-org`}
            name="organisation"
            autoComplete="organization"
            placeholder="Company, foundation or ministry"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`}>
            Email <Req />
          </Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@organisation.org"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-phone`}>Phone</Label>
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+233 ..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-type`}>How would you work with us?</Label>
          <Select value={partnerType} onValueChange={setPartnerType}>
            <SelectTrigger id={`${formId}-type`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PARTNER_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-programme`}>Programme of interest</Label>
          <Select value={programme} onValueChange={setProgramme}>
            <SelectTrigger id={`${formId}-programme`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">No preference yet</SelectItem>
              {PROGRAMMES.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor={`${formId}-message`}>
          What would you like to discuss? <Req />
        </Label>
        <Textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="Tell us about your organisation and what you are looking to support."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading || !FORMS_ENABLED}
        className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
      >
        {loading ? "Sending..." : "Send enquiry"}
        {!loading && <Send className="ml-2 h-4 w-4" aria-hidden="true" />}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Your enquiry goes to the Executive Director. We aim to respond within
        three working days.
      </p>
    </form>
  );
}

function Req() {
  return (
    <span className="text-emphasis" aria-hidden="true">
      *
    </span>
  );
}
