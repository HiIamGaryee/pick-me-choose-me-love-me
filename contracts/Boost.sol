// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Boost is ReentrancyGuard, Ownable {
    IERC20 public PYUSD;
    
    // Boost types and pricing
    enum BoostType {
        PROFILE_FEATURED,    // Featured profile boost
        DATE_PLAN_BOOST,     // Boost specific date plan
        MATCH_PRIORITY,      // Priority matching
        PROFILE_VERIFIED     // Profile verification badge
    }
    
    struct BoostInfo {
        uint256 price;      // Price in PYUSD (with decimals)
        uint256 duration;    // Duration in seconds
        bool active;         // Whether this boost type is active
    }
    
    struct UserBoost {
        BoostType boostType;
        uint256 startTime;
        uint256 endTime;
        bool active;
    }
    
    // Mapping from boost type to boost info
    mapping(BoostType => BoostInfo) public boostTypes;
    
    // Mapping from user to their active boosts
    mapping(address => UserBoost[]) public userBoosts;
    
    // Mapping from user to boost count (for tracking)
    mapping(address => uint256) public userBoostCount;
    
    // Events
    event BoostPurchased(
        address indexed user,
        BoostType indexed boostType,
        uint256 amount,
        uint256 startTime,
        uint256 endTime
    );
    
    event BoostActivated(
        address indexed user,
        BoostType indexed boostType,
        uint256 boostId
    );
    
    event BoostDeactivated(
        address indexed user,
        BoostType indexed boostType,
        uint256 boostId
    );
    
    event BoostTypeUpdated(
        BoostType indexed boostType,
        uint256 newPrice,
        uint256 newDuration,
        bool active
    );
    
    constructor(address _pyusdAddress) {
        PYUSD = IERC20(_pyusdAddress);
        
        // Initialize boost types with default pricing
        // Prices are in PYUSD with 6 decimals (1 PYUSD = 1,000,000 units)
        boostTypes[BoostType.PROFILE_FEATURED] = BoostInfo({
            price: 1000000,    // 1 PYUSD
            duration: 7 days,  // 7 days
            active: true
        });
        
        boostTypes[BoostType.DATE_PLAN_BOOST] = BoostInfo({
            price: 500000,     // 0.5 PYUSD
            duration: 3 days,   // 3 days
            active: true
        });
        
        boostTypes[BoostType.MATCH_PRIORITY] = BoostInfo({
            price: 2000000,    // 2 PYUSD
            duration: 30 days, // 30 days
            active: true
        });
        
        boostTypes[BoostType.PROFILE_VERIFIED] = BoostInfo({
            price: 5000000,    // 5 PYUSD
            duration: 365 days, // 1 year
            active: true
        });
    }
    
    /**
     * @dev Purchase a boost
     * @param boostType The type of boost to purchase
     */
    function buyBoost(BoostType boostType) external nonReentrant {
        require(boostTypes[boostType].active, "Boost type not active");
        
        BoostInfo memory boostInfo = boostTypes[boostType];
        
        // Transfer PYUSD from user to contract
        require(
            PYUSD.transferFrom(msg.sender, address(this), boostInfo.price),
            "PYUSD transfer failed"
        );
        
        // Calculate boost duration
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + boostInfo.duration;
        
        // Create new boost for user
        UserBoost memory newBoost = UserBoost({
            boostType: boostType,
            startTime: startTime,
            endTime: endTime,
            active: true
        });
        
        userBoosts[msg.sender].push(newBoost);
        userBoostCount[msg.sender]++;
        
        emit BoostPurchased(
            msg.sender,
            boostType,
            boostInfo.price,
            startTime,
            endTime
        );
    }
    
    /**
     * @dev Check if user has active boost of specific type
     * @param user The user address
     * @param boostType The boost type to check
     * @return hasActiveBoost Whether user has active boost
     * @return boostId The ID of the active boost (if any)
     */
    function hasActiveBoost(address user, BoostType boostType) 
        external 
        view 
        returns (bool hasActiveBoost, uint256 boostId) 
    {
        UserBoost[] memory boosts = userBoosts[user];
        
        for (uint256 i = 0; i < boosts.length; i++) {
            if (boosts[i].boostType == boostType && 
                boosts[i].active && 
                block.timestamp <= boosts[i].endTime) {
                return (true, i);
            }
        }
        
        return (false, 0);
    }
    
    /**
     * @dev Get all active boosts for a user
     * @param user The user address
     * @return activeBoosts Array of active boost info
     */
    function getActiveBoosts(address user) 
        external 
        view 
        returns (UserBoost[] memory activeBoosts) 
    {
        UserBoost[] memory allBoosts = userBoosts[user];
        uint256 activeCount = 0;
        
        // Count active boosts
        for (uint256 i = 0; i < allBoosts.length; i++) {
            if (allBoosts[i].active && block.timestamp <= allBoosts[i].endTime) {
                activeCount++;
            }
        }
        
        // Create array of active boosts
        activeBoosts = new UserBoost[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allBoosts.length; i++) {
            if (allBoosts[i].active && block.timestamp <= allBoosts[i].endTime) {
                activeBoosts[index] = allBoosts[i];
                index++;
            }
        }
        
        return activeBoosts;
    }
    
    /**
     * @dev Deactivate expired boosts (can be called by anyone)
     * @param user The user address
     */
    function deactivateExpiredBoosts(address user) external {
        UserBoost[] storage boosts = userBoosts[user];
        
        for (uint256 i = 0; i < boosts.length; i++) {
            if (boosts[i].active && block.timestamp > boosts[i].endTime) {
                boosts[i].active = false;
                emit BoostDeactivated(user, boosts[i].boostType, i);
            }
        }
    }
    
    /**
     * @dev Update boost type pricing (owner only)
     * @param boostType The boost type to update
     * @param newPrice New price in PYUSD
     * @param newDuration New duration in seconds
     * @param active Whether this boost type is active
     */
    function updateBoostType(
        BoostType boostType,
        uint256 newPrice,
        uint256 newDuration,
        bool active
    ) external onlyOwner {
        boostTypes[boostType] = BoostInfo({
            price: newPrice,
            duration: newDuration,
            active: active
        });
        
        emit BoostTypeUpdated(boostType, newPrice, newDuration, active);
    }
    
    /**
     * @dev Withdraw PYUSD from contract (owner only)
     * @param amount Amount to withdraw
     */
    function withdrawPYUSD(uint256 amount) external onlyOwner {
        require(
            PYUSD.transfer(owner(), amount),
            "PYUSD transfer failed"
        );
    }
    
    /**
     * @dev Get boost type info
     * @param boostType The boost type
     * @return price Price in PYUSD
     * @return duration Duration in seconds
     * @return active Whether active
     */
    function getBoostTypeInfo(BoostType boostType) 
        external 
        view 
        returns (uint256 price, uint256 duration, bool active) 
    {
        BoostInfo memory info = boostTypes[boostType];
        return (info.price, info.duration, info.active);
    }
    
    /**
     * @dev Get user's boost count
     * @param user The user address
     * @return count Total number of boosts purchased
     */
    function getUserBoostCount(address user) external view returns (uint256 count) {
        return userBoostCount[user];
    }
    
    /**
     * @dev Get contract PYUSD balance
     * @return balance Contract's PYUSD balance
     */
    function getContractBalance() external view returns (uint256 balance) {
        return PYUSD.balanceOf(address(this));
    }
}
