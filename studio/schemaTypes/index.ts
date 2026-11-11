import { objectTypes } from "./objects";
import { blockTypes } from "./blocks";
import { pageTypes } from "./pages";
import { documentTypes } from "./documents";

export const schemaTypes = [...objectTypes, ...blockTypes, ...pageTypes, ...documentTypes];
