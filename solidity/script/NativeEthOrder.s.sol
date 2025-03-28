// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/console2.sol";

import { TypeCasts } from "@hyperlane-xyz/libs/TypeCasts.sol";

import { Hyperlane7683 } from "../src/Hyperlane7683.sol";
import { OrderData, OrderEncoder } from "../src/libs/OrderEncoder.sol";

import {
    OnchainCrossChainOrder
} from "../src/ERC7683/IERC7683.sol";

/// @dev Script for opening an order with native ETH
contract NativeEthOrder is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PK");

        vm.startBroadcast(deployerPrivateKey);

        address localRouter = vm.envAddress("ROUTER_ADDRESS");
        address sender = vm.envAddress("ORDER_SENDER");
        address recipient = vm.envAddress("ORDER_RECIPIENT");
        address inputToken = vm.envAddress("ITT_INPUT");  
        address outputToken = vm.envAddress("ITT_OUTPUT");  
        uint256 amountIn = vm.envUint("AMOUNT_IN");
        uint256 amountOut = vm.envUint("AMOUNT_OUT");
        uint256 senderNonce = vm.envUint("SENDER_NONCE");
        uint32 originDomain = Hyperlane7683(localRouter).localDomain();
        uint256 destinationDomain = vm.envUint("DESTINATION_DOMAIN");
        uint32 fillDeadline = type(uint32).max;

        // We don't need to approve for native ETH

        OrderData memory order = OrderData({
            sender: TypeCasts.addressToBytes32(sender),
            recipient: TypeCasts.addressToBytes32(recipient),
            inputToken: TypeCasts.addressToBytes32(inputToken),
            outputToken: TypeCasts.addressToBytes32(outputToken),
            amountIn: amountIn,
            amountOut: amountOut,
            senderNonce: senderNonce,
            originDomain: originDomain,
            destinationDomain: uint32(destinationDomain),
            destinationSettler: TypeCasts.addressToBytes32(localRouter),
            fillDeadline: fillDeadline,
            data: new bytes(0)
        });

        OnchainCrossChainOrder memory onchainOrder = OnchainCrossChainOrder({
            fillDeadline: fillDeadline,
            orderDataType: OrderEncoder.orderDataType(),
            orderData: OrderEncoder.encode(order)
        });

        // We need to send native ETH with the transaction
        Hyperlane7683(localRouter).open{value: amountIn}(onchainOrder);

        vm.stopBroadcast();
    }
}