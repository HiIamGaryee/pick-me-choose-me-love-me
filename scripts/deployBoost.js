const hre = require("hardhat");

async function main() {
  console.log("Deploying Boost contract...");

  // PYUSD contract addresses for different networks
  // TODO: Get actual PYUSD addresses from official sources
  const pyusdAddresses = {
    sepolia: "0x0000000000000000000000000000000000000000", // TODO: Replace with actual Sepolia PYUSD address
    mainnet: "0x6c3ea9036406852006290770BEdFcAbC0a3f8f6c", // Official PYUSD mainnet address
  };

  const network = hre.network.name;
  const pyusdAddress = pyusdAddresses[network];

  if (!pyusdAddress) {
    throw new Error(`No PYUSD address found for network: ${network}`);
  }

  console.log(`Using PYUSD address: ${pyusdAddress} on ${network}`);

  // Deploy the contract
  const Boost = await hre.ethers.getContractFactory("Boost");
  const boost = await Boost.deploy(pyusdAddress);

  await boost.waitForDeployment();

  const contractAddress = await boost.getAddress();
  console.log(`Boost contract deployed to: ${contractAddress}`);

  // Verify the contract (optional)
  if (network !== "localhost") {
    console.log("Waiting for block confirmations...");
    await boost.deploymentTransaction().wait(6);

    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [pyusdAddress],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }

  // Display boost pricing information
  console.log("\n=== Boost Pricing Information ===");
  console.log("Profile Featured: 1 PYUSD for 7 days");
  console.log("Date Plan Boost: 0.5 PYUSD for 3 days");
  console.log("Match Priority: 2 PYUSD for 30 days");
  console.log("Profile Verified: 5 PYUSD for 1 year");

  console.log("\n=== Deployment Summary ===");
  console.log(`Network: ${network}`);
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`PYUSD Address: ${pyusdAddress}`);
  console.log("\nAdd this to your .env file:");
  console.log(`REACT_APP_BOOST_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`REACT_APP_PYUSD_ADDRESS=${pyusdAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
