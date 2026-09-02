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
import { PROGRAMMES } from "@/lib/content";

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

    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          organisation: data.get("organisation"),
          partnerType,
          programme: programme === "any" ? "" : programme,
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Request failed");

      toast.success(json.message);
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
        disabled={loading}
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
