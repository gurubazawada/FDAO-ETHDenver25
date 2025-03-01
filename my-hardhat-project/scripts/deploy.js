// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy DummyZKVerifier
  const DummyZKVerifier = await hre.ethers.getContractFactory("DummyZKVerifier");
  const dummyZKVerifier = await DummyZKVerifier.deploy();
  await dummyZKVerifier.waitForDeployment();
  console.log("DummyZKVerifier deployed to:", dummyZKVerifier.target);

  // 2. Deploy Rewards contract: constructor(address _silo, address _owner)
  const Rewards = await hre.ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy(deployer.address, deployer.address);
  await rewards.waitForDeployment();
  console.log("Rewards deployed to:", rewards.target);

  // 3. Deploy CredentialIssuer (no constructor arguments)
  const CredentialIssuer = await hre.ethers.getContractFactory("CredentialIssuer");
  const credentialIssuer = await CredentialIssuer.deploy();
  await credentialIssuer.waitForDeployment();
  console.log("CredentialIssuer deployed to:", credentialIssuer.target);

  // 4. Deploy Governance (no constructor arguments)
  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.deploy();
  await governance.waitForDeployment();
  console.log("Governance deployed to:", governance.target);

  // 5. Deploy DataMarket: constructor(address _ethStorage)
  const DataMarket = await hre.ethers.getContractFactory("DataMarket");
  // Using deployer's address as a dummy for EthStorage; replace with actual EthStorage contract if available.
  const dataMarket = await DataMarket.deploy(deployer.address);
  await dataMarket.waitForDeployment();
  console.log("DataMarket deployed to:", dataMarket.target);

  // 6. Deploy CrossChainData: constructor(address _ccip, address _dataMarket)
  const CrossChainData = await hre.ethers.getContractFactory("CrossChainData");
  // Using deployer's address as dummy for CCIP
  const crossChainData = await CrossChainData.deploy(deployer.address, dataMarket.target);
  await crossChainData.waitForDeployment();
  console.log("CrossChainData deployed to:", crossChainData.target);

  // 7. Deploy Lock: constructor(uint _unlockTime) payable
  const currentTime = Math.floor(Date.now() / 1000);
  const unlockTime = currentTime + 3600; // unlock 1 hour from now
  const Lock = await hre.ethers.getContractFactory("Lock");
  // Deploy with 0.1 ether attached (using ethers.parseEther from ethers v6)
  const lock = await Lock.deploy(unlockTime, { value: hre.ethers.parseEther("0.1") });
  await lock.waitForDeployment();
  console.log("Lock deployed to:", lock.target);

  // 8. Deploy Benchmark: constructor(address _zkVerifier, address _rewardsContract)
  const Benchmark = await hre.ethers.getContractFactory("Benchmark");
  const benchmark = await Benchmark.deploy(dummyZKVerifier.target, rewards.target);
  await benchmark.waitForDeployment();
  console.log("Benchmark deployed to:", benchmark.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
