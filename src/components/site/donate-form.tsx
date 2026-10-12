"use client";

import * as React from "react";
import { toast } from "sonner";
import { CreditCard, Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PAYSTACK_PUBLIC_KEY,
  PAYSTACK_TEST_MODE,
  DONATION_CURRENCY,
  PRESET_AMOUNTS,
  DEFAULT_AMOUNT,
  MIN_AMOUNT,
  MAX_AMOUNT,
  toPesewas,
  formatCedis,
  newReference,
} from "@/lib/paystack";
import { ORG, PROGRAMMES } from "@/lib/content";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Where a gift can go: anywhere, or one of the programmes raising funds. */
const DESIGNATIONS = [
  { value: "general", label: "Where it is needed most" },
  ...PROGRAMMES.filter((p) => p.status === "fundraising").map((p) => ({
    value: p.id,
    label: p.name,
  })),
];

type Status = "idle" | "opening" | "open" | "done";

type Receipt = {
  reference: string;
  amount: number;
  firstName: string;
};

/**
 * The online donation form. See src/lib/paystack.ts for why only the public
 * key is used and why there is no server-side verification.
 *
 * The Paystack library is imported when a donor presses Donate, not with the
 * page. Every other visitor downloads none of it, and the library touches
 * document as soon as it loads, so it must never run on the server.
 */
export function DonateForm() {
  const formId = React.useId();
  const [choice, setChoice] = React.useState(String(DEFAULT_AMOUNT));
  const [other, setOther] = React.useState("");
  const [designation, setDesignation] = React.useState("general");
  const [status, setStatus] = React.useState<Status>("idle");
  const [receipt, setReceipt] = React.useState<Receipt | null>(null);
  const thanksRef = React.useRef<HTMLHeadingElement>(null);

  const amount =
    choice === "other" ? Number(other.replace(/,/g, "").trim()) : Number(choice);
  // An empty "Other" box reads as 0, which fails the minimum on its own.
  const amountValid =
    Number.isFinite(amount) && amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  const busy = status === "opening" || status === "open";

  // Move focus to the thank-you, so keyboard and screen reader users land
  // on the confirmation rather than on a form that has disappeared.
  React.useEffect(() => {
    if (status === "done") thanksRef.current?.focus();
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!amountValid) {
      toast.error(
        amount > MAX_AMOUNT
          ? `For gifts above ${formatCedis(MAX_AMOUNT)}, please contact us and we will send bank details.`
          : `Please enter an amount of at least ${formatCedis(MIN_AMOUNT)}.`
      );
      return;
    }
    if (!EMAIL.test(email)) {
      toast.error(
        "Please enter a valid email address. Paystack needs it to process the payment."
      );
      return;
    }

    const [firstName = "", ...rest] = name.split(/\s+/).filter(Boolean);
    const designationLabel =
      DESIGNATIONS.find((d) => d.value === designation)?.label ??
      DESIGNATIONS[0].label;

    setStatus("opening");
    try {
      const { default: PaystackPop } = await import("@paystack/inline-js");
      const popup = new PaystackPop();
      let failed = false;
      popup.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: toPesewas(amount),
        currency: DONATION_CURRENCY,
        // Optional, but Paystack rejects the whole transaction if either key
        // is present with anything other than a string, so they are left
        // out entirely when the donor skips the name field.
        ...(firstName ? { firstName } : {}),
        ...(rest.length > 0 ? { lastName: rest.join(" ") } : {}),
        reference: newReference(),
        // custom_fields is what Paystack shows on the transaction in the
        // dashboard, so Nkrabea can see what each gift was for.
        metadata: {
          custom_fields: [
            {
              display_name: "Donation for",
              variable_name: "designation",
              value: designationLabel,
            },
            {
              display_name: "Donor name",
              variable_name: "donor_name",
              value: name || "Not given",
            },
            {
              display_name: "Given through",
              variable_name: "source",
              value: "Website, Get involved page",
            },
          ],
        },
        onLoad: () => setStatus("open"),
        onSuccess: (transaction) => {
          setReceipt({ reference: transaction.reference, amount, firstName });
          setStatus("done");
        },
        onCancel: () => {
          setStatus("idle");
          // Closing Paystack's frame after an error can also report a
          // cancel; the donor has already been told what happened.
          if (failed) return;
          toast("Payment cancelled. Nothing was charged.");
        },
        onError: (error) => {
          console.error("Donation: Paystack reported an error.", error);
          failed = true;
          setStatus("idle");
          // Paystack leaves its own error dialog over the whole page, above
          // everything including this message. Close it, so the donor sees
          // one explanation and a route that works.
          try {
            popup.cancelTransaction();
          } catch {
            // Already closed.
          }
          toast.error(
            `The payment form could not open (${error.message}). You can also give by MTN MoMo to ${ORG.momo}.`,
            { duration: 12000 }
          );
        },
      });
    } catch (err) {
      console.error("Donation: the Paystack checkout failed to start.", err);
      setStatus("idle");
      toast.error(
        `The payment form could not load. Check your connection, or give by MTN MoMo to ${ORG.momo}.`
      );
    }
  }

  if (status === "done" && receipt) {
    return (
      <div className="h-full rounded-2xl border-2 border-accent bg-card p-7 sm:p-9">
        <Heart className="h-7 w-7 text-emphasis" aria-hidden="true" />
        <h3
          ref={thanksRef}
          tabIndex={-1}
          className="mt-4 font-display text-sub text-foreground"
        >
          Thank you{receipt.firstName ? `, ${receipt.firstName}` : ""}.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Paystack has confirmed your gift of {formatCedis(receipt.amount)} to{" "}
          {ORG.name}.
        </p>
        <dl className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
          <dt className="label-mono text-muted-foreground">Your reference</dt>
          <dd className="mt-1.5 break-all font-mono text-sm text-foreground">
            {receipt.reference}
          </dd>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Quote it if you contact us about this gift.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setReceipt(null);
            setStatus("idle");
          }}
        >
          Make another gift
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={busy}
      className="h-full rounded-2xl border-2 border-accent bg-card p-7 sm:p-9"
    >
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-gold-ink" aria-hidden="true" />
        <h3 className="font-display text-lg text-foreground">Give online</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        By card or mobile money, through Paystack&apos;s secure checkout.
      </p>

      <fieldset className="mt-7">
        <legend className="text-sm font-medium text-foreground">
          Choose an amount
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {PRESET_AMOUNTS.map((value) => (
            <AmountChip
              key={value}
              name={`${formId}-amount`}
              value={String(value)}
              label={formatCedis(value)}
              checked={choice === String(value)}
              onSelect={setChoice}
            />
          ))}
          <AmountChip
            name={`${formId}-amount`}
            value="other"
            label="Other"
            checked={choice === "other"}
            onSelect={setChoice}
          />
        </div>

        {choice === "other" && (
          <div className="mt-4 space-y-2">
            <Label htmlFor={`${formId}-other`}>Amount in cedis</Label>
            <div className="relative">
              <span
                className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
                aria-hidden="true"
              >
                GHS
              </span>
              <Input
                id={`${formId}-other`}
                inputMode="decimal"
                autoComplete="off"
                placeholder="250"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="pl-12"
                aria-describedby={`${formId}-other-hint`}
              />
            </div>
            <p
              id={`${formId}-other-hint`}
              className="text-xs text-muted-foreground"
            >
              Between {formatCedis(MIN_AMOUNT)} and {formatCedis(MAX_AMOUNT)}.
              For larger gifts, contact us for bank details.
            </p>
          </div>
        )}
      </fieldset>

      <div className="mt-6 space-y-2">
        <Label htmlFor={`${formId}-for`}>Give to</Label>
        <Select value={designation} onValueChange={setDesignation}>
          <SelectTrigger id={`${formId}-for`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DESIGNATIONS.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${formId}-name`}>
            Your name{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder="So we can thank you"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`}>
            Email{" "}
            <span className="text-emphasis" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-describedby={`${formId}-email-hint`}
          />
          <p
            id={`${formId}-email-hint`}
            className="text-xs text-muted-foreground"
          >
            Paystack needs it to process the payment.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={busy}
        className="mt-7 w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {busy
          ? "Opening secure checkout..."
          : amountValid
            ? `Donate ${formatCedis(amount)}`
            : "Donate"}
        {!busy && <Heart className="ml-2 h-4 w-4" aria-hidden="true" />}
      </Button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>
          Payment is handled by Paystack. Your card or mobile money details go
          to Paystack, never to this website.
        </span>
      </p>

      {PAYSTACK_TEST_MODE && (
        <p className="mt-3 rounded-lg border border-dashed border-border bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          Test mode: this form is using a Paystack test key, so no real money
          is taken.
        </p>
      )}
    </form>
  );
}

/**
 * One suggested amount. A real radio input, visually hidden, inside a label
 * styled as the chip, so the group keeps native arrow-key behaviour and
 * screen readers hear "GHS 100, radio button, 2 of 5". The focus ring is
 * drawn on the label because the input itself is clipped.
 */
function AmountChip({
  name,
  value,
  label,
  checked,
  onSelect,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <label className="flex h-12 cursor-pointer items-center justify-center rounded-xl border border-border bg-background px-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 has-[:checked]:border-band has-[:checked]:bg-band has-[:checked]:text-band-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-current">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}
