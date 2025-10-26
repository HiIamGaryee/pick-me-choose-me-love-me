// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@pythnetwork/entropy-sdk-solidity/PythEntropy.sol";

contract EntropyConsumer {
    IPythEntropy public entropy;
    uint64 public lastRandom;
    uint256 public randomRequestId;
    bool public hasRandomNumber;
    
    // Events
    event RandomRequested(uint256 requestId);
    event RandomReceived(uint64 randomness, uint256 requestId);
    event RandomDateSelected(uint256 planIndex, address planOwner, uint256 requestId);

    constructor(address entropyAddress) {
        entropy = IPythEntropy(entropyAddress);
    }

    function requestRandom() external {
        randomRequestId = entropy.requestRandom();
        hasRandomNumber = false;
        emit RandomRequested(randomRequestId);
    }

    function consumeRandom(uint64 randomness) external {
        require(msg.sender == address(entropy), "only entropy");
        lastRandom = randomness;
        hasRandomNumber = true;
        emit RandomReceived(randomness, randomRequestId);
    }

    // Generate a random number within a range (for selecting date plans)
    function getRandomInRange(uint256 max) external view returns (uint256) {
        require(hasRandomNumber, "No random number available");
        require(max > 0, "Max must be greater than 0");
        return uint256(lastRandom) % max;
    }

    // Simulate selecting a random date plan (this would be called by frontend)
    function selectRandomDatePlan(
        address[] memory planOwners,
        uint256[] memory planIds
    ) external returns (uint256 selectedIndex) {
        require(hasRandomNumber, "No random number available");
        require(planOwners.length == planIds.length, "Arrays length mismatch");
        require(planOwners.length > 0, "No plans available");
        
        selectedIndex = uint256(lastRandom) % planOwners.length;
        
        emit RandomDateSelected(
            selectedIndex,
            planOwners[selectedIndex],
            randomRequestId
        );
        
        return selectedIndex;
    }

    // Reset random number after use
    function resetRandom() external {
        hasRandomNumber = false;
        lastRandom = 0;
    }
}
