# Pyth Entropy Integration for SoulMatch

This project integrates Pyth Entropy for verifiable on-chain randomness to power the "Today Soul Most Meet U" feature.

## 🚀 Quick Start

### 1. Get API Keys

#### WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID

#### Alchemy API Key

1. Go to [Alchemy](https://www.alchemy.com/)
2. Create a free account
3. Create a new app
4. Copy the API key

#### Infura API Key

1. Go to [Infura](https://infura.io/)
2. Create a free account
3. Create a new project
4. Copy the Project ID

### 2. Update Environment Variables

Update your `.env` file with the actual API keys:

```env
# Web3 Configuration
REACT_APP_WALLETCONNECT_PROJECT_ID=your_actual_walletconnect_project_id
REACT_APP_ALCHEMY_API_KEY=your_actual_alchemy_api_key
REACT_APP_INFURA_API_KEY=your_actual_infura_api_key

# Blockchain Network Configuration
REACT_APP_CHAIN_ID=11155111
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/your_actual_infura_api_key

# App Configuration
REACT_APP_APP_NAME=SoulMatch
REACT_APP_APP_DESCRIPTION=Web3 Dating Platform

# Smart Contract Addresses
REACT_APP_ENTROPY_CONSUMER_ADDRESS=0x0000000000000000000000000000000000000000

# Private Key for Deployment (DO NOT COMMIT TO GIT)
PRIVATE_KEY=your_private_key_here
```

### 3. Deploy Smart Contract

#### Get Pyth Entropy Contract Address

1. Visit [Pyth Entropy Documentation](https://docs.pyth.network/entropy)
2. Find the Sepolia testnet contract address
3. Update the `entropyAddresses` in `scripts/deploy.js`

#### Deploy to Sepolia

```bash
# Install dependencies
npm install

# Deploy contract
npx hardhat run scripts/deploy.js --network sepolia
```

#### Update Contract Address

After deployment, update your `.env` file with the deployed contract address:

```env
REACT_APP_ENTROPY_CONSUMER_ADDRESS=0xYourDeployedContractAddress
```

### 4. Start the Application

```bash
npm start
```

## 🔧 How It Works

### On-Chain Randomness Flow

1. **User Clicks Button**: "Today Soul Most Meet U" button is clicked
2. **Request Randomness**: If wallet is connected, request random number from Pyth Entropy
3. **Wait for Response**: Pyth provides verifiable randomness (takes ~3 seconds)
4. **Select Date Plan**: Use the on-chain random number to select a date plan
5. **Display Result**: Show the selected plan with Web3 verification

### Fallback System

- **Wallet Connected + Random Available**: Uses on-chain randomness
- **Wallet Connected + No Random**: Requests random, waits, then uses it
- **No Wallet**: Falls back to client-side Math.random()

## 📁 File Structure

```
├── contracts/
│   └── EntropyConsumer.sol          # Smart contract for randomness
├── scripts/
│   └── deploy.js                     # Deployment script
├── src/
│   ├── hooks/
│   │   └── useEntropyConsumer.tsx    # React hook for contract interaction
│   ├── pages/sales/
│   │   └── SalesHistoryPage.tsx      # Updated with Web3 integration
│   └── config/
│       └── web3Config.ts             # Web3 configuration
└── hardhat.config.js                 # Hardhat configuration
```

## 🎯 Features

### ✅ Implemented

- **Pyth Entropy Integration**: Verifiable on-chain randomness
- **Smart Contract**: EntropyConsumer contract for randomness
- **Web3 Hook**: useEntropyConsumer for easy contract interaction
- **Frontend Integration**: Updated SalesHistoryPage with Web3 features
- **Fallback System**: Graceful degradation when Web3 is unavailable
- **Loading States**: User feedback during randomness generation
- **Visual Indicators**: Shows Web3 status in UI

### 🔄 Smart Contract Functions

- `requestRandom()`: Request randomness from Pyth Entropy
- `consumeRandom(uint64)`: Receive randomness from Pyth
- `getRandomInRange(uint256)`: Get random number within range
- `selectRandomDatePlan(address[], uint256[])`: Select random date plan
- `resetRandom()`: Reset random number after use

## 🔒 Security Features

- **Verifiable Randomness**: Uses Pyth's decentralized randomness
- **No Manipulation**: Random numbers cannot be gamed or predicted
- **Transparent Process**: All randomness requests are on-chain
- **Fallback Protection**: Client-side random as backup

## 🚨 Important Notes

1. **Private Key Security**: Never commit your private key to git
2. **Testnet First**: Deploy to Sepolia testnet before mainnet
3. **Gas Costs**: Randomness requests cost gas fees
4. **Network Dependency**: Requires stable internet connection
5. **Wallet Required**: Full Web3 features require wallet connection

## 🐛 Troubleshooting

### Common Issues

1. **Contract Not Deployed**: Make sure to deploy and update `.env`
2. **Wallet Not Connected**: Connect wallet to access Web3 features
3. **Randomness Not Available**: Wait for Pyth to provide randomness
4. **Gas Fees**: Ensure wallet has enough ETH for transactions

### Debug Mode

Enable debug logging by adding to your `.env`:

```env
REACT_APP_DEBUG=true
```

## 📚 Resources

- [Pyth Entropy Documentation](https://docs.pyth.network/entropy)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Hardhat Documentation](https://hardhat.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
