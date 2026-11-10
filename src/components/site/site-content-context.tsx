"use client";

import * as React from "react";
import { ORG, PROGRAMMES, type Programme } from "@/lib/content";

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
};

const SiteContentContext = React.createContext<ClientContent>({
  org: ORG,
  programmes: PROGRAMMES.map(({ id, name, status }) => ({ id, name, status })),
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

export function useProgrammes() {
  return React.useContext(SiteContentContext).programmes;
}
