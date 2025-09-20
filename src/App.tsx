// ====================================
// 📁 FILE: App.tsx
// 🎯 PURPOSE: This is the main file that controls the entire app
// 💡 WHAT IT DOES: Manages which screen to show and handles all the logic
// 🔧 FOR BEGINNERS: Think of this as the "brain" that coordinates everything
// ====================================

import React, { useState } from 'react';

// Import all our custom components (these are actual components)
import ConnectWalletScreen from './Components/ConnectWalletScreen';
import WalletSelectModal from './Components/WalletSelectModal';
import DashboardScreen from './Components/DashboardScreen';

// Import types using type-only import (these are just TypeScript blueprints)
import type { WalletState, ProtocolStats, ChartDataPoint, ViewType, WalletType } from './Components/types';

// This is the main App component that controls everything
const App: React.FC = () => {
  // State management for UI navigation - which screen should we show?
  const [currentView, setCurrentView] = useState<ViewType>('connect');

  // State for wallet connection info
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    provider: null
  });

  // Hardcoded data for v1 - TODO: Replace with real-time data integration
  const protocolStats: ProtocolStats = {
    tvlLocked: '$719,463.25',     // Total money locked in the protocol
    totalSupply: '$30,411.15',    // Total fUSD tokens that exist
    burnedTokens: '$0.00 0K',     // How many tokens have been destroyed
    contractHealth: 'Healthy'     // Is the smart contract working well?
  };

  // Market overview chart data - TODO: Integrate with real market data API
  const chartData: ChartDataPoint[] = [
    { date: 'W1', value: 240 },   // Week 1 data
    { date: 'W2', value: 280 },   // Week 2 data
    { date: 'W3', value: 320 },   // Week 3 data
    { date: 'W4', value: 300 },   // Week 4 data
    { date: 'W5', value: 380 },   // Week 5 data
    { date: 'W6', value: 420 },   // Week 6 data
    { date: 'W7', value: 450 }    // Week 7 data
  ];

  // Function to handle when user clicks "Connect Wallet"
  const handleConnectWallet = () => {
    setCurrentView('wallet-select'); // Show the wallet selection popup
  };

  // Function to handle when user selects a specific wallet
  const handleWalletSelect = async (walletType: WalletType) => {
    try {
      // TODO: Implement actual wallet connection logic
      // Example integration points:
      // - MetaMask: window.ethereum.request({ method: 'eth_requestAccounts' })
      // - Rabby: Similar to MetaMask but with rabby-specific provider
      // - Leap: Cosmos-based wallet integration
      // - Social logins: OAuth flows for Google/Apple

      console.log(`Connecting to ${walletType}...`);

      // Simulate wallet connection (replace this with real wallet connection)
      setWalletState({
        connected: true,
        address: '0x1234...5678', // TODO: Get real address from wallet
        provider: walletType
      });

      setCurrentView('dashboard'); // Show the main dashboard
    } catch (error) {
      console.error('Wallet connection failed:', error);
      // TODO: Add error handling UI (show error message to user)
    }
  };

  // Function to close the wallet selection popup
  const handleCloseWalletSelect = () => {
    setCurrentView('connect'); // Go back to the connect screen
  };

  // Smart contract interaction handlers
  const handleMintTokens = async (amount: string) => {
    try {
      // TODO: Integrate with smart contract
      // Example: contract.mint(amount, { from: walletState.address })
      console.log(`Minting ${amount} fUSD tokens...`);

      // Add transaction logic here:
      // 1. Validate input amount (is it a valid number?)
      // 2. Check user balance for collateral (do they have enough ETH?)
      // 3. Call smart contract mint function
      // 4. Update UI with transaction status (show loading spinner)
      // 5. Refresh protocol stats after successful mint

    } catch (error) {
      console.error('Minting failed:', error);
      // TODO: Add error handling UI (show error message to user)
    }
  };

  // Function to handle when user wants to burn/destroy tokens
  const handleBurnTokens = async (amount: string) => {
    try {
      // TODO: Integrate with smart contract
      // Example: contract.burn(amount, { from: walletState.address })
      console.log(`Burning ${amount} fUSD tokens...`);

      // Add transaction logic here:
      // 1. Validate input amount (is it a valid number?)
      // 2. Check user fUSD balance (do they have enough tokens to burn?)
      // 3. Call smart contract burn function
      // 4. Update UI with transaction status (show loading spinner)
      // 5. Refresh protocol stats after successful burn

    } catch (error) {
      console.error('Burning failed:', error);
      // TODO: Add error handling UI (show error message to user)
    }
  };

  // This decides which screen/component to show based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'connect':
        // Show the first screen with "Connect Wallet" button
        return <ConnectWalletScreen onConnectClick={handleConnectWallet} />;

      case 'wallet-select':
        // Show the popup with wallet options
        return (
          <WalletSelectModal
            onWalletSelect={handleWalletSelect}
            onClose={handleCloseWalletSelect}
          />
        );

      case 'dashboard':
        // Show the main dashboard with charts and mint/burn buttons
        return (
          <DashboardScreen
            walletState={walletState}
            protocolStats={protocolStats}
            chartData={chartData}
            onMintTokens={handleMintTokens}
            onBurnTokens={handleBurnTokens}
          />
        );

      default:
        // If something goes wrong, show the connect screen
        return <ConnectWalletScreen onConnectClick={handleConnectWallet} />;
    }
  };

  // This is what gets displayed on the webpage
  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
};

export default App;