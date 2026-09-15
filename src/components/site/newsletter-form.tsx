"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormUnavailable, Honeypot } from "./form-guard";
import { FORMS_ENABLED, HONEYPOT_FIELD, submitToWeb3Forms } from "@/lib/web3forms";
import { ORG } from "@/lib/content";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = React.useState(false);
  const formId = React.useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();
    if (!email) {
      toast.error("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const result = await submitToWeb3Forms(
        {
          subject: `Newsletter signup: ${email}`,
          email,
          Request: "Please add this address to the updates list.",
          [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD) ? "true" : "",
        },
        ORG.email
      );
      if (!result.ok) throw new Error(result.error);

      toast.success(
        "You are signed up. We will write when a programme opens or completes."
      );
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not sign you up."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 sm:flex-row ${FORMS_ENABLED ? "" : "sm:flex-wrap"}`}
      noValidate
    >
      {!FORMS_ENABLED && (
        <div className="basis-full">
          <FormUnavailable />
        </div>
      )}
      <Honeypot />
      <div className="flex-1">
        <Label htmlFor={`${formId}-email`} className="sr-only">
          Email address
        </Label>
        <Input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={compact ? "" : "h-11"}
        />
      </div>
      <Button
        type="submit"
        disabled={loading || !FORMS_ENABLED}
        size={compact ? "default" : "lg"}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
