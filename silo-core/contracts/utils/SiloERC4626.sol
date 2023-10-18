// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.21;

import {ISilo} from "../interfaces/ISilo.sol";
import {IShareToken} from "../interfaces/IShareToken.sol";

abstract contract SiloERC4626 is ISilo {
    function approve(address _spender, uint256 _amount) external returns (bool) {
        IShareToken(_getShareToken()).forwardApprove(msg.sender, _spender, _amount);
        return true;
    }

    function transfer(address _to, uint256 _amount) external returns (bool) {
        IShareToken(_getShareToken()).forwardTransfer(msg.sender, _to, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool) {
        IShareToken(_getShareToken()).forwardTransferFrom(msg.sender, _from, _to, _amount);
        return true;
    }

    function decimals() external view virtual returns (uint8) {
        return IShareToken(_getShareToken()).decimals();
    }

    function name() external view virtual returns (string memory) {
        return IShareToken(_getShareToken()).name();
    }

    function symbol() external view virtual returns (string memory) {
        return IShareToken(_getShareToken()).symbol();
    }

    function allowance(address _owner, address _spender) external view returns (uint256) {
        return IShareToken(_getShareToken()).allowance(_owner, _spender);
    }

    function balanceOf(address _account) external view returns (uint256) {
        return IShareToken(_getShareToken()).balanceOf(_account);
    }

    function totalSupply() external view returns (uint256) {
        return IShareToken(_getShareToken()).totalSupply();
    }

    function _getShareToken() internal view virtual returns (address collateralShareToken);
}
