import { HashZero } from "@ethersproject/constants";
import { bytes32ToAddress } from "@hyperlane-xyz/utils";

import { Hyperlane7683__factory } from "../../../typechain/factories/hyperlane7683/contracts/Hyperlane7683__factory.js";
import { Hyperlane7683Rule } from "../filler.js";
import { chainIdsToName } from "../../../config/index.js";
import { metadata } from "../config/index.js";

const UNKNOWN = HashZero;

export function intentNotFilled(): Hyperlane7683Rule {
  return async (parsedArgs, context) => {
    try {
      const destinationSettler = bytes32ToAddress(
        parsedArgs.resolvedOrder.fillInstructions[0].destinationSettler,
      );
      const destinationChainId =
        parsedArgs.resolvedOrder.fillInstructions[0].destinationChainId.toString();
      const destinationChainName = chainIdsToName[destinationChainId];
      
      // Log the details for debugging
      console.log(`Intent check for ${parsedArgs.orderId}:`);
      console.log(`Destination Chain: ${destinationChainName} (${destinationChainId})`);
      console.log(`Destination Settler from order: ${destinationSettler}`);
      
      // Find the correct router address for the destination chain from metadata
      const metadataRouter = metadata.intentSources.find(
        source => source.chainName === destinationChainName
      );
      
      if (!metadataRouter) {
        return { 
          error: `No router configuration found for chain ${destinationChainName}`, 
          success: false 
        };
      }
      
      console.log(`Router from metadata: ${metadataRouter.address}`);
      
      // If there's a mismatch, we should use the correct router from metadata
      const routerToUse = metadataRouter.address;
      
      const filler = await context.multiProvider.getSigner(destinationChainId);
      const destination = Hyperlane7683__factory.connect(
        routerToUse,
        filler,
      );

      const orderStatus = await destination.orderStatus(parsedArgs.orderId);
      console.log(`Order status: ${orderStatus}`);

      if (orderStatus !== UNKNOWN) {
        return { error: "Intent already filled", success: false };
      }
      
      return { data: "Intent not yet filled", success: true };
    } catch (error: unknown) {
      console.error("Error in intentNotFilled rule:", error);
      return { 
        error: `Failed to check intent status: ${error instanceof Error ? error.message : String(error)}`, 
        success: false 
      };
    }
  };
}