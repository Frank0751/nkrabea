import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "31l59nsi", dataset: "production" },
  // Hosted free by Sanity at https://nkrabea.sanity.studio
  studioHost: "nkrabea",
  // Bug fixes and new Studio features arrive without a redeploy.
  deployment: { appId: "jg9n6sqhauzbcwtx9zi0t4jc", autoUpdates: true },
});
