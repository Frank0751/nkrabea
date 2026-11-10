import { objectTypes } from "./objects";
import { pageTypes } from "./pages";
import { documentTypes } from "./documents";

export const schemaTypes = [...objectTypes, ...pageTypes, ...documentTypes];
