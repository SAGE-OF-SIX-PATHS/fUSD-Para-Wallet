// ====================================
// 📁 FILE: types.ts
// 🎯 PURPOSE: This file contains all the TypeScript types and interfaces
// 💡 WHAT IT DOES: Defines the shape of data we use throughout the app
// 🔧 FOR BEGINNERS: Think of this as a blueprint that tells TypeScript what our data should look like
// 🚨 IMPORTANT: These are TYPE definitions, not regular JavaScript code
// ====================================

// This describes what information we store about a connected wallet
export interface WalletState {
          connected: boolean;      // Is the wallet connected? true/false
          address: string | null;  // The wallet address (like 0x1234...) or null if not connected
          provider: string | null; // Which wallet provider (MetaMask, Rabby, etc.) or null
}

// This describes the statistics we show about the fUSD protocol
export interface ProtocolStats {
          tvlLocked: string;      // Total Value Locked in the protocol (like "$719,463.25")
          totalSupply: string;    // Total fUSD tokens in circulation (like "$30,411.15")
          burnedTokens: string;   // Amount of fUSD tokens that have been burned/destroyed
          contractHealth: string; // Health status of the smart contract (like "Healthy")
}

// This describes each point on our market chart
export interface ChartDataPoint {
          date: string;  // Time period (like "W1", "W2" for weeks)
          value: number; // The value at that time period
}

// This describes which screen/page the user is currently viewing
export type ViewType = 'connect' | 'wallet-select' | 'dashboard';

// This describes the different types of wallets users can connect
export type WalletType = 'MetaMask' | 'Rabby' | 'Leap' | 'Google' | 'Apple';