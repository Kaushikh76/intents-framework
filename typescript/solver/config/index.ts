import dotenvFlow from "dotenv-flow";
import z from "zod";
import allowBlockListsGlobal from "./allowBlockLists.js";
import { chainIds, chainNames, chainIdsToName } from "./chains.js";  // Changed from local definition
import { ConfigSchema } from "./types.js";

dotenvFlow.config();

const LOG_FORMAT = process.env.LOG_FORMAT;
const LOG_LEVEL = process.env.LOG_LEVEL;
const MNEMONIC = process.env.MNEMONIC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export { LOG_FORMAT, LOG_LEVEL, MNEMONIC, PRIVATE_KEY };

type GenericAllowBlockListItem = z.infer<typeof ConfigSchema>;

export type GenericAllowBlockLists = {
  allowList: GenericAllowBlockListItem[];
  blockList: GenericAllowBlockListItem[];
};

type Item = {
  [Key in keyof GenericAllowBlockListItem]: string;
};

const matches = (item: GenericAllowBlockListItem, data: Item): boolean => {
  return Object.entries(item)
    .filter(([, value]) => value !== "*")
    .every(([key, value]) => {
      if (Array.isArray(value)) {
        value = value.map((value) => value.toLowerCase());
      } else {
        value = value.toLowerCase();
      }

      return value.includes(data[key].toLowerCase());
    });
};

export function isAllowedIntent(
  allowBlockLists: GenericAllowBlockLists,
  transaction: Item,
): boolean {
  // Check blockList first
  const consolidatedBlockList = [
    ...allowBlockListsGlobal.blockList,
    ...allowBlockLists.blockList,
  ];
  const isBlocked = consolidatedBlockList.some((blockItem) =>
    matches(blockItem, transaction),
  );

  if (isBlocked) return false;

  // Check allowList
  const consolidatedAllowList = [
    ...allowBlockListsGlobal.allowList,
    ...allowBlockLists.allowList,
  ];
  const isAllowed =
    !consolidatedAllowList.length ||
    consolidatedAllowList.some((allowItem) => matches(allowItem, transaction));

  return isAllowed;
}

// Removed the chain metadata extraction code since it's now in chains.ts
export { chainIds, chainIdsToName, chainNames };