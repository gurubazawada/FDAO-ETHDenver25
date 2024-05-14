// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

import {ISiloConfig} from "silo-core/contracts/interfaces/ISiloConfig.sol";

contract SiloConfigMock is Test {
    address public immutable ADDRESS;

    constructor(address _siloConfig) {
        ADDRESS = _siloConfig == address(0) ? makeAddr("SiloConfigMock") : _siloConfig;
    }

    function getFeesWithAssetMock(
        address _silo,
        uint256 _daoFee,
        uint256 _deployerFee,
        uint256 _flashloanFee,
        address _asset
    ) external {
        bytes memory data = abi.encodeWithSelector(ISiloConfig.getFeesWithAsset.selector, _silo);

        vm.mockCall(ADDRESS, data, abi.encode(_daoFee, _deployerFee, _flashloanFee, _asset));
        vm.expectCall(ADDRESS, data);
    }

    function getConfigMock(
        address _silo,
        ISiloConfig.ConfigData memory _configData
    ) external {
        bytes memory data = abi.encodeWithSelector(ISiloConfig.getConfig.selector, _silo);

        vm.mockCall(ADDRESS, data, abi.encode(_configData));
        vm.expectCall(ADDRESS, data);
    }

    function getSilosMock(
        address _silo0,
        address _silo1
    ) external {
        bytes memory data = abi.encodeWithSelector(ISiloConfig.getSilos.selector);

        vm.mockCall(ADDRESS, data, abi.encode(_silo0, _silo1));
        vm.expectCall(ADDRESS, data);
    }
}
