// ====================================
// 📁 FILE: src/ui/types.ts
// 🎯 PURPOSE: Centralized TypeScript type definitions used across the dashboard
// ====================================

// Wallet information (what the UI expects about a connected wallet)
export interface WalletState {
          /** wallet address (short or full) */
          address: string;
          /** formatted ETH balance (e.g. "1.234") */
          balanceETH?: string;
          /** formatted fUSD (or stablecoin) balance (e.g. "42.0") */
          balanceFUSD?: string;
}

// Protocol statistics displayed on the dashboard
export interface ProtocolStats {
          /** Total value locked (string formatted) */
          tvlLocked: string;
          /** Total circulating supply (string formatted) */
          totalSupply: string;
          /** Burned tokens (string formatted) */
          burnedTokens: string;
          /** Human-friendly health indicator */
          contractHealth: string;
          
}

// Each data point for the chart
export interface ChartDataPoint {
          date: string; // label for x-axis (e.g. "Mon")
          value: number; // numeric value for y-axis
}

// Standard return shape for a balance-fetching hook
export interface BalancesResult {
          eth: string; // formatted ETH string
          fusd: string; // formatted fUSD string
          loading: boolean;
          error?: string | null;
}

// Standard return shape for a protocol-stats hook
export interface ProtocolStatsResult {
          totalSupply: string;
          tvl: string;
          burnedTokens: string;
          health: string;
          loading: boolean;
          error?: string | null;
}

// Props used by the UI presentation component (DashboardScreen)
export interface DashboardScreenProps {
          walletState: WalletState;
          protocolStats: ProtocolStats;
          chartData: ChartDataPoint[];
          onMintTokens: (amount: string) => void | Promise<void>;
          onBurnTokens: (amount: string) => void | Promise<void>;
}

// A small, lightweight shape approximating the Para `ProfileBalance` object
// (used when calling useProfileBalance from the Para SDK). This is intentionally
// partial — add more fields if you need them in your UI.
export interface ProfileBalanceAsset {
          symbol: string;
          balance: string | number;
          value?: {
                    value: number;
                    currency: string;
          };
}

export interface ProfileBalanceWallet {
          address: string;
          assets: ProfileBalanceAsset[];
          value?: {
                    value: number;
                    currency: string;
          };
}

export interface ProfileBalance {
          value: {
                    value: number;
                    currency: string;
          };
          wallets: ProfileBalanceWallet[];
}

// Utility types you may find handy when interacting with ethers/v6 in a typed way
export type Maybe<T> = T | null | undefined;

// End of file





















// // ====================================
// // 📁 FILE: src/ui/types.ts
// // 🎯 PURPOSE: Centralized TypeScript type definitions used across the dashboard
// // ====================================

// // Wallet information (what the UI expects about a connected wallet)
// export interface WalletState {
//           /** wallet address (short or full) */
//           address: string;
//           /** formatted ETH balance (e.g. "1.234") */
//           balanceETH?: string;
//           /** formatted fUSD (or stablecoin) balance (e.g. "42.0") */
//           balanceFUSD?: string;
// }

// // Protocol statistics displayed on the dashboard
// export interface ProtocolStats {
//           /** Total value locked (string formatted) */
//           tvlLocked: string;
//           /** Total circulating supply (string formatted) */
//           totalSupply: string;
//           /** Burned tokens (string formatted) - canonical name */
//           burnedTokens: string;
//           /** Legacy / alternate name some callers may use */
//           burned?: string;
//           /** Human-friendly health indicator */
//           contractHealth: string;
// }

// // Each data point for the chart
// export interface ChartDataPoint {
//           date: string; // label for x-axis (e.g. "Mon")
//           value: number; // numeric value for y-axis
// }

// // Standard return shape for a balance-fetching hook
// export interface BalancesResult {
//           eth: string; // formatted ETH string
//           fusd: string; // formatted fUSD string
//           loading: boolean;
//           error?: string | null;
// }

// // Standard return shape for a protocol-stats hook
// export interface ProtocolStatsResult {
//           totalSupply: string;
//           tvl: string;
//           burnedTokens: string;
//           burned?: string; // alias
//           health: string;
//           loading: boolean;
//           error?: string | null;
// }

// // Props used by the UI presentation component (DashboardScreen)
// export interface DashboardScreenProps {
//           walletState: WalletState;
//           protocolStats: ProtocolStats;
//           chartData: ChartDataPoint[];
//           onMintTokens: (amount: string) => void | Promise<void>;
//           onBurnTokens: (amount: string) => void | Promise<void>;
// }

// // A small, lightweight shape approximating the Para `ProfileBalance` object
// // (used when calling useProfileBalance from the Para SDK). This is intentionally
// // partial — add more fields if you need them in your UI.
// export interface ProfileBalanceAsset {
//           symbol: string;
//           balance: string | number;
//           value?: {
//                     value: number;
//                     currency: string;
//           };
// }

// export interface ProfileBalanceWallet {
//           address: string;
//           assets: ProfileBalanceAsset[];
//           value?: {
//                     value: number;
//                     currency: string;
//           };
// }

// export interface ProfileBalance {
//           value: {
//                     value: number;
//                     currency: string;
//           };
//           wallets: ProfileBalanceWallet[];
// }

// // Utility types you may find handy when interacting with ethers/v6 in a typed way
// // (kept minimal to avoid coupling to a specific ethers import style)
// export type Maybe<T> = T | null | undefined;

// // End of file
















// // ====================================
// // 📁 FILE: types.ts
// // 🎯 PURPOSE: Define reusable types for Dashboard and related components
// // ====================================

// // Wallet information
// export interface WalletState {
//           address: string; // Wallet address (e.g. "0x123...abcd")
//           balanceETH?: string;       // optional formatted ETH balance (e.g. "1.234")
//           balanceFUSD?: string;      // optional formatted fUSD balance (e.g. "42.0")
// }

// // Protocol statistics displayed on dashboard
// export interface ProtocolStats {
//           tvlLocked: string;      // Total value locked (e.g. "1.2M")
//           totalSupply: string;    // Total fUSD supply (e.g. "500k")
//           burnedTokens: string;   // Total burned tokens (e.g. "10k")
//           contractHealth: string; // Protocol health status (e.g. "Healthy")
// }

// // Each data point for the chart
// export interface ChartDataPoint {
//           date: string;  // Label for the X-axis (e.g. "Mon")
//           value: number; // Value for the Y-axis
// }

// // export interface WalletState {
// //           address: string;
// //           balanceETH?: string;
// //           balanceFUSD?: string;
// // }

// export interface ProtocolStats {
//           tvlLocked: string;
//           totalSupply: string;
//           burnedTokens: string;
//           contractHealth: string;
// }

// export interface ChartDataPoint {
//           date: string;
//           value: number;
// }
