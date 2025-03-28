import { z } from "zod";

import { chainMetadata as defaultChainMetadata } from "@hyperlane-xyz/registry";

import type { ChainMap, ChainMetadata } from "@hyperlane-xyz/sdk";
import { ChainMetadataSchema } from "@hyperlane-xyz/sdk";

import { objMerge } from "@hyperlane-xyz/utils";

const customChainMetadata = {
  coffeechain: {
    name: "coffeechain",
    chainId: 2910,
    domainId: 2910,
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
  arbitrumsepolia: {
    // Override the default Arbitrum Sepolia configuration
    chainId: 421614,
    domainId: 421614,
    name: "arbitrumsepolia",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "https://arb-sepolia.g.alchemy.com/v2/md_4BdnpQJO6ZxK3OnqCFJozztmaW-iy", // Replace with your API key
        timeout: 30000, // 30 seconds timeout
        pagination: {
          maxBlockRange: 3000,
        },
      },
      // Add Infura or other providers as backup
      {
        http: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
        timeout: 30000,
      },
    ],
  },
  basesepolia: {
    chainId: 84532,
    domainId: 84532,
    name: "basesepolia",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "https://base-sepolia.g.alchemy.com/v2/md_4BdnpQJO6ZxK3OnqCFJozztmaW", // Replace with your API key
        timeout: 30000,
        pagination: {
          maxBlockRange: 3000,
        },
      },
      {
        http: "https://sepolia.base.org",
        timeout: 30000,
      },
      {
        http: "https://base-sepolia.blockpi.network/v1/rpc/public",
        timeout: 30000,
      },
    ],
  },
  sepolia: {
    chainId: 11155111,
    domainId: 11155111,
    name: "sepolia",
    protocol: "ethereum",
    rpcUrls: [
      {
        http: "https://eth-sepolia.g.alchemy.com/v2/md_4BdnpQJO6ZxK3OnqCFJozztmaW", // Replace with your API key
        timeout: 30000,
        pagination: {
          maxBlockRange: 3000,
        },
      },
      {
        http: "https://rpc.sepolia.org",
        timeout: 30000,
      },
      {
        http: "https://eth-sepolia.public.blastapi.io",
        timeout: 30000,
      },
      {
        http: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
        timeout: 30000,
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
