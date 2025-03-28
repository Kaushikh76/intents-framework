import { chainMetadata } from "./chainMetadata.js";

const { chainIds, chainNames, chainIdsToName } = Object.entries(
  chainMetadata,
).reduce<{
  chainNames: Array<string>;
  chainIds: { [key: string]: number };
  chainIdsToName: { [key: string]: string };
}>(
  (acc, [key, value]) => {
    acc.chainNames.push(key);
    acc.chainIds[key] = Number(value.chainId);
    acc.chainIdsToName[value.chainId.toString()] = key;
    return acc;
  },
  { chainNames: [], chainIds: {}, chainIdsToName: {} },
);

export { chainIds, chainIdsToName, chainNames };