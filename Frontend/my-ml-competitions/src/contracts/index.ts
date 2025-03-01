// src/contracts/index.ts
import { ethers } from "ethers";

// Replace these with your actual ABI JSON imports
import BenchmarkAbi from "../../../../my-hardhat-project/artifacts/contracts/Benchmark.sol/Benchmark.json";
import CredentialIssuerAbi from "../../../../my-hardhat-project/artifacts/contracts/CredentialIssuer.sol/CredentialIssuer.json";
import RewardsAbi from "../../../../my-hardhat-project/artifacts/contracts/Rewards.sol/Rewards.json";
import DataMarketAbi from "../../../../my-hardhat-project/artifacts/contracts/DataMarket.sol/DataMarket.json";
import CrossChainDataAbi from "../../../../my-hardhat-project/artifacts/contracts/CrossChainData.sol/CrossChainData.json";
import GovernanceAbi from "../../../../my-hardhat-project/artifacts/contracts/Governance.sol/Governance.json";
import DummyZKVerifierAbi from "../../../../my-hardhat-project/artifacts/contracts/DummyZKVerifier.sol/DummyZKVerifier.json";
import LockAbi from "../../../../my-hardhat-project/artifacts/contracts/Lock.sol/Lock.json";

// Replace with your real deployed addresses from Hardhat logs
export const contractAddresses = {
  DummyZKVerifier: "0x29Cab1B945b45fcD05b4c1E34B55978045058816",
  Rewards: "0x07Ac81F642A36839C535BC7786aDD6795443e342",
  CredentialIssuer: "0x9d54E1d84B6936430B6AF94D2A3F04457e7D37e0",
  Governance: "0xb5e72dD7a560986C89253ACe55b04F6288E3f0Ed",
  DataMarket: "0x83f7330E42987B636359a16e0C50813f014a35A5",
  CrossChainData: "0x4fCc8eBD9ba56b3b98B981ecceD1C667bB11B533",
  Lock: "0x5661F4a4a9045df74887Fe91D8DF08490f8f17C4",
  Benchmark: "0x6a0B0678D12c16f1CF05A43a2439b2fB1a0C01Ff",
};

export function getBenchmarkContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.Benchmark, BenchmarkAbi, signerOrProvider);
}

export function getCredentialIssuerContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.CredentialIssuer, CredentialIssuerAbi, signerOrProvider);
}

export function getRewardsContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.Rewards, RewardsAbi, signerOrProvider);
}

export function getDataMarketContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.DataMarket, DataMarketAbi, signerOrProvider);
}

export function getCrossChainDataContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.CrossChainData, CrossChainDataAbi, signerOrProvider);
}

export function getGovernanceContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.Governance, GovernanceAbi, signerOrProvider);
}

export function getDummyZKVerifierContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.DummyZKVerifier, DummyZKVerifierAbi, signerOrProvider);
}

export function getLockContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(contractAddresses.Lock, LockAbi, signerOrProvider);
}
