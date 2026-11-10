import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure, SINGLETON_TYPES } from "./structure";

/**
 * The Nkrabea website Studio. Built only from features in Sanity's Free plan,
 * so nothing here stops working when the Growth trial ends. On Free, only the
 * Administrator role can edit: invite editors as Administrators.
 */
export default defineConfig({
  name: "default",
  title: "Nkrabea Website",
  projectId: "31l59nsi",
  dataset: "production",

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
    // Pages and settings cannot be created from "New document".
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Pages and settings can be published or reverted, never deleted or duplicated.
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? "")
          )
        : actions,
  },
});
