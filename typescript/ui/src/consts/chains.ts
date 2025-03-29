import { ChainMap, ChainMetadata } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';


// A map of chain names to ChainMetadata
// Chains can be defined here, in chains.json, or in c  hains.yaml
// Chains already in the SDK need not be included here unless you want to override some fields
// Schema here: https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/metadata/chainMetadataTypes.ts
export const chains: ChainMap<ChainMetadata & { mailbox?: Address }> = {
  // Add Coffee Chain configuration
  coffeechain: {
    protocol: ProtocolType.Ethereum,
    chainId: 2910,
    domainId: 2910,
    name: 'coffeechain',
    displayName: 'Coffee Chain',
    nativeToken: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [{ http: 'http://13.54.168.253:8547' }],
    blocks: {
      confirmations: 1,
      reorgPeriod: 1,
      estimateBlockTime: 10,
    },
    logoURI: '/logos/logo.png',
  },
};
