"use client";

import * as React from "react";
import { ORG, PROGRAMMES, SOCIALS, type Programme, type Social } from "@/lib/content";

/**
 * The editable content that client components need: the organisation's
 * contact details and the programme list (for the donation and partnership
 * forms). The root layout fills it from Sanity on the server; the default is
 * content.ts, so a component rendered outside the provider still works.
 *
 * Only the fields client components actually use travel to the browser.
 */
export type ClientContent = {
  org: typeof ORG;
  programmes: Pick<Programme, "id" | "name" | "status">[];
  socials: Social[];
};

const SiteContentContext = React.createContext<ClientContent>({
  org: ORG,
  programmes: PROGRAMMES.map(({ id, name, status }) => ({ id, name, status })),
  socials: SOCIALS,
});

export function SiteContentProvider({
  value,
  children,
}: {
  value: ClientContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useOrg() {
  return React.useContext(SiteContentContext).org;
}

export function useSocials() {
  return React.useContext(SiteContentContext).socials;
}

export function useProgrammes() {
  return React.useContext(SiteContentContext).programmes;
}
