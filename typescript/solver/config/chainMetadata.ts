import { z } from "zod";

import { chainMetadata as defaultChainMetadata } from "@hyperlane-xyz/registry";

import type { ChainMap, ChainMetadata } from "@hyperlane-xyz/sdk";
import { ChainMetadataSchema } from "@hyperlane-xyz/sdk";

import { objMerge } from "@hyperlane-xyz/utils";

const customChainMetadata = {
  coffeechain: {
    chainId: 2910,
    domainId: 2910,
    name: "coffeechain",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "http://13.54.168.253:8547",
        pagination: {
          maxBlockRange: 3000,
        },
      },
    ],
  },
};

const chainMetadata = objMerge<ChainMap<ChainMetadata>>(
  defaultChainMetadata,
  customChainMetadata,
  10,
  true,
);

z.record(z.string(), ChainMetadataSchema).parse(chainMetadata);

export { chainMetadata };
