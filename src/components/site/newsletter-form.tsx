"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = React.useState(false);
  const formId = React.useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
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
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Request failed");

      toast.success(json.message);
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
      className="flex flex-col gap-3 sm:flex-row"
      noValidate
    >
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
        disabled={loading}
        size={compact ? "default" : "lg"}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
