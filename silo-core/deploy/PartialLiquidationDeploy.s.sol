// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.28;

import {CommonDeploy} from "./_CommonDeploy.sol";
import {SiloCoreContracts} from "silo-core/common/SiloCoreContracts.sol";

import {
    PartialLiquidation,
    IPartialLiquidation
} from "silo-core/contracts/utils/hook-receivers/liquidation/PartialLiquidation.sol";

/**
    FOUNDRY_PROFILE=core \
        forge script silo-core/deploy/PartialLiquidationDeploy.s.sol:PartialLiquidationDeploy \
        --ffi --broadcast --rpc-url http://127.0.0.1:8545 --verify

    code verification:

    FOUNDRY_PROFILE=core forge verify-contract 0x4c8fc0691699710524D904B1d8DE4cFB216189D6 \
    silo-core/contracts/utils/hook-receivers/liquidation/PartialLiquidation.sol:PartialLiquidation \
    --compiler-version 0.8.28 \
    --rpc-url $RPC_ARBITRUM \
    --watch
 */
contract PartialLiquidationDeploy is CommonDeploy {
    function run() public returns (IPartialLiquidation liquidationModule) {
        uint256 deployerPrivateKey = uint256(vm.envBytes32("PRIVATE_KEY"));

        vm.startBroadcast(deployerPrivateKey);

        liquidationModule = IPartialLiquidation(address(new PartialLiquidation()));

        vm.stopBroadcast();

        _registerDeployment(address(liquidationModule), SiloCoreContracts.PARTIAL_LIQUIDATION);
    }
}
