// ====================================
// 📁 FILE: types.ts
// 🎯 PURPOSE: Define reusable types for Dashboard and related components
// ====================================

// Wallet information
export interface WalletState {
          address: string; // Wallet address (e.g. "0x123...abcd")
          balanceETH?: string;       // optional formatted ETH balance (e.g. "1.234")
          balanceFUSD?: string;      // optional formatted fUSD balance (e.g. "42.0")
}

// Protocol statistics displayed on dashboard
export interface ProtocolStats {
          tvlLocked: string;      // Total value locked (e.g. "1.2M")
          totalSupply: string;    // Total fUSD supply (e.g. "500k")
          burnedTokens: string;   // Total burned tokens (e.g. "10k")
          contractHealth: string; // Protocol health status (e.g. "Healthy")
}

// Each data point for the chart
export interface ChartDataPoint {
          date: string;  // Label for the X-axis (e.g. "Mon")
          value: number; // Value for the Y-axis
}

// export interface WalletState {
//           address: string;
//           balanceETH?: string;
//           balanceFUSD?: string;
// }

export interface ProtocolStats {
          tvlLocked: string;
          totalSupply: string;
          burnedTokens: string;
          contractHealth: string;
}

export interface ChartDataPoint {
          date: string;
          value: number;
}
