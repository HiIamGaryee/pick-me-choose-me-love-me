const hre = require("hardhat");

async function main() {
  console.log("Deploying EntropyConsumer contract...");

  // Pyth Entropy contract addresses for different networks
  // TODO: Get actual addresses from https://docs.pyth.network/entropy
  const entropyAddresses = {
    sepolia: "0x0000000000000000000000000000000000000000", // TODO: Replace with actual Sepolia address
    mainnet: "0x0000000000000000000000000000000000000000", // TODO: Replace with actual Mainnet address
  };

  const network = hre.network.name;
  const entropyAddress = entropyAddresses[network];

  if (!entropyAddress) {
    throw new Error(`No Pyth Entropy address found for network: ${network}`);
  }

  console.log(`Using Pyth Entropy address: ${entropyAddress} on ${network}`);

  // Deploy the contract
  const EntropyConsumer = await hre.ethers.getContractFactory(
    "EntropyConsumer"
  );
  const entropyConsumer = await EntropyConsumer.deploy(entropyAddress);

  await entropyConsumer.waitForDeployment();

  const contractAddress = await entropyConsumer.getAddress();
  console.log(`EntropyConsumer deployed to: ${contractAddress}`);

  // Verify the contract (optional)
  if (network !== "localhost") {
    console.log("Waiting for block confirmations...");
    await entropyConsumer.deploymentTransaction().wait(6);

    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [entropyAddress],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  console.log("\n=== Deployment Summary ===");
  console.log(`Network: ${network}`);
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Pyth Entropy Address: ${entropyAddress}`);
  console.log("\nAdd this to your .env file:");
  console.log(`REACT_APP_ENTROPY_CONSUMER_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
