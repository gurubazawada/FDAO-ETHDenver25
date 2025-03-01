const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy ContestFactory using ethers v6 style.
  const ContestFactory = await hre.ethers.getContractFactory("ContestFactory");
  const contestFactory = await ContestFactory.deploy();
  await contestFactory.waitForDeployment();
  console.log("ContestFactory deployed to:", contestFactory.target);

  // 2. Create a sample contest using the factory.
  // Contest parameters:
  // - Title: "Image Classification Challenge"
  // - Dataset Link: "https://example.com/dataset1"
  // - Description: "Build a model to classify images of cats and dogs."
  // - Deadline: Unix timestamp for December 31, 2025 (UTC)
  // - Stake Required: 100 tokens (with 18 decimals)
  const title = "Image Classification Challenge";
  const datasetLink = "https://example.com/dataset1";
  const description = "Build a model to classify images of cats and dogs.";
  
  // Convert the deadline to BigInt.
  const deadline = BigInt(Math.floor(new Date("2025-12-31T00:00:00Z").getTime() / 1000));
  // ethers.parseUnits returns a bigint in ethers v6.
  const stakeRequired = hre.ethers.parseUnits("100", 18);

  console.log("Creating a sample contest via ContestFactory...");
  const tx = await contestFactory.createContest(
    title,
    datasetLink,
    description,
    deadline,
    stakeRequired
  );
  await tx.wait();
  console.log("Contest created successfully.");

  // Retrieve the newly created contest address from the factory's contests array.
  const contestsCount = await contestFactory.getContestsCount();
  // Using BigInt arithmetic for index (ethers v6 returns numbers as bigint).
  const contestIndex = contestsCount - 1n;
  const contestAddress = await contestFactory.contests(contestIndex);
  console.log("Sample Contest deployed at address:", contestAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
