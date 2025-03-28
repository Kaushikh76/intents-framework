import { ChainMap, ChainMetadata } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';

export const chains: ChainMap<ChainMetadata & { mailbox?: Address }> = {
  coffeechain: {
    protocol: ProtocolType.Ethereum,
    chainId: 2910,
    domainId: 2910,
    name: 'coffeechain',
    displayName: 'Coffee Chain',
    nativeToken: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [
      { 
        http: 'http://13.54.168.253:8547',
        pagination: {
          maxBlockRange: 1000, 
        },
        retry: {
          maxRequests: 5,
          baseRetryMs: 1000,
        },
      }
    ],
    blockExplorers: [],
    blocks: {
      confirmations: 1,
      reorgPeriod: 1,
      estimateBlockTime: 10,
    },
    logoURI: '/logo.svg',
  },
  
  // Add overrides for other chains too
  arbitrumsepolia: {
    chainId: 421614,
    domainId: 421614,
    name: 'arbitrumsepolia',
    protocol: ProtocolType.Ethereum,
    rpcUrls: [
      {
        http: 'https://sepolia-rollup.arbitrum.io/rpc',
        timeout: 30000,
        pagination: {
          maxBlockRange: 1000,
        },
        retry: {
          maxRequests: 5,
          baseRetryMs: 1000,
        },
      },
      {
        http: 'https://arbitrum-sepolia.publicnode.com',
        timeout: 30000,
      },
    ],
  },
  
  basesepolia: {
    chainId: 84532,
    domainId: 84532,
    name: 'basesepolia',
    protocol: ProtocolType.Ethereum,
    rpcUrls: [
      {
        http: 'https://sepolia.base.org',
        timeout: 30000,
        pagination: {
          maxBlockRange: 1000,
        },
        retry: {
          maxRequests: 5,
          baseRetryMs: 1000,
        },
      },
      {
        http: 'https://base-sepolia.publicnode.com',
        timeout: 30000,
      },
    ],
  },
  
  sepolia: {
    chainId: 11155111,
    domainId: 11155111,
    name: 'sepolia',
    protocol: ProtocolType.Ethereum,
    rpcUrls: [
      {
        http: 'https://ethereum-sepolia.publicnode.com',
        timeout: 30000,
        pagination: {
          maxBlockRange: 1000,
        },
        retry: {
          maxRequests: 5,
          baseRetryMs: 1000,
        },
      },
      {
        http: 'https://sepolia.gateway.tenderly.co',
        timeout: 30000,
      },
    ],
  },
  
  optimismsepolia: {
    chainId: 11155420,
    domainId: 11155420, 
    name: 'optimismsepolia',
    protocol: ProtocolType.Ethereum,
    rpcUrls: [
      {
        http: 'https://sepolia.optimism.io',
        timeout: 30000,
        pagination: {
          maxBlockRange: 1000,
        },
        retry: {
          maxRequests: 5,
          baseRetryMs: 1000,
        },
      },
      {
        http: 'https://optimism-sepolia.publicnode.com',
        timeout: 30000,
      },
    ],
  },
};