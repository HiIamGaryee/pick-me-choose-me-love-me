#!/bin/bash

# SoulMatch Smart Contract Deployment Script
# This script will guide you through deploying your EntropyConsumer contract

echo "🚀 SoulMatch Smart Contract Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from your project root directory"
    echo "   Expected to find package.json in current directory"
    exit 1
fi

echo "✅ Found package.json - we're in the right directory"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "   Please create a .env file with your API keys first"
    echo "   See DEPLOYMENT_GUIDE.txt for details"
    exit 1
fi

echo "✅ Found .env file"
echo ""

# Check if required environment variables are set
echo "🔍 Checking environment variables..."

if ! grep -q "REACT_APP_INFURA_API_KEY=" .env || grep -q "your_actual_infura_api_key" .env; then
    echo "❌ Error: REACT_APP_INFURA_API_KEY not set in .env"
    echo "   Please update your .env file with actual API keys"
    exit 1
fi

if ! grep -q "PRIVATE_KEY=" .env || grep -q "your_actual_private_key_here" .env; then
    echo "❌ Error: PRIVATE_KEY not set in .env"
    echo "   Please update your .env file with your actual private key"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Compile contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to compile contracts"
    exit 1
fi
echo "✅ Contracts compiled successfully"
echo ""

# Check if Pyth Entropy addresses are updated
echo "🔍 Checking Pyth Entropy configuration..."
if grep -q "0x8c5C7C5C7C5C7C5C7C5C7C5C7C5C7C5C7C5C7C5C" scripts/deploy.js; then
    echo "⚠️  Warning: Pyth Entropy addresses still have placeholder values"
    echo "   Please update scripts/deploy.js with actual Pyth Entropy addresses"
    echo "   Visit: https://docs.pyth.network/entropy"
    echo ""
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled. Please update the addresses first."
        exit 1
    fi
fi

# Deploy to Sepolia
echo "🚀 Deploying to Sepolia testnet..."
echo "   This may take a few minutes..."
echo ""

npx hardhat run scripts/deploy.js --network sepolia
if [ $? -ne 0 ]; then
    echo "❌ Error: Deployment failed"
    echo "   Check your configuration and try again"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""

# Extract contract address from deployment output
echo "📋 Next steps:"
echo "1. Copy the deployed contract address from the output above"
echo "2. Update your .env file:"
echo "   REACT_APP_ENTROPY_CONSUMER_ADDRESS=0xYourDeployedAddress"
echo "3. Restart your development server: npm start"
echo "4. Test the integration in your app"
echo ""

echo "🔍 To verify deployment:"
echo "1. Visit https://sepolia.etherscan.io/"
echo "2. Search for your contract address"
echo "3. Verify the contract is deployed and verified"
echo ""

echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.txt"
echo ""
echo "✨ Happy coding!"
