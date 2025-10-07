// src/config/cosmosChains.ts
// ✅ Full Cosmos chain definitions for Para/Keplr compatibility
// Each export is strongly typed as ChainInfo.

import type { ChainInfo } from "@keplr-wallet/types";

// Cosmos Hub
export const cosmoshub: ChainInfo = {
          chainId: "cosmoshub-4",
          chainName: "Cosmos Hub",
          rpc: "https://rpc.cosmoshub.strange.love",
          rest: "https://api.cosmoshub.strange.love",
          bip44: { coinType: 118 },
          bech32Config: {
                    bech32PrefixAccAddr: "cosmos",
                    bech32PrefixAccPub: "cosmospub",
                    bech32PrefixValAddr: "cosmosvaloper",
                    bech32PrefixValPub: "cosmosvaloperpub",
                    bech32PrefixConsAddr: "cosmosvalcons",
                    bech32PrefixConsPub: "cosmosvalconspub",
          },
          currencies: [
                    {
                              coinDenom: "ATOM",
                              coinMinimalDenom: "uatom",
                              coinDecimals: 6,
                              coinGeckoId: "cosmos",
                    },
          ],
          feeCurrencies: [
                    {
                              coinDenom: "ATOM",
                              coinMinimalDenom: "uatom",
                              coinDecimals: 6,
                              coinGeckoId: "cosmos",
                    },
          ],
          stakeCurrency: {
                    coinDenom: "ATOM",
                    coinMinimalDenom: "uatom",
                    coinDecimals: 6,
                    coinGeckoId: "cosmos",
          },
          features: ["stargate", "ibc-transfer", "cosmwasm"],
};

// Osmosis
export const osmosis: ChainInfo = {
          chainId: "osmosis-1",
          chainName: "Osmosis",
          rpc: "https://rpc.osmosis.zone",
          rest: "https://lcd.osmosis.zone",
          bip44: { coinType: 118 },
          bech32Config: {
                    bech32PrefixAccAddr: "osmo",
                    bech32PrefixAccPub: "osmopub",
                    bech32PrefixValAddr: "osmovaloper",
                    bech32PrefixValPub: "osmovaloperpub",
                    bech32PrefixConsAddr: "osmovalcons",
                    bech32PrefixConsPub: "osmovalconspub",
          },
          currencies: [
                    {
                              coinDenom: "OSMO",
                              coinMinimalDenom: "uosmo",
                              coinDecimals: 6,
                              coinGeckoId: "osmosis",
                    },
          ],
          feeCurrencies: [
                    {
                              coinDenom: "OSMO",
                              coinMinimalDenom: "uosmo",
                              coinDecimals: 6,
                              coinGeckoId: "osmosis",
                    },
          ],
          stakeCurrency: {
                    coinDenom: "OSMO",
                    coinMinimalDenom: "uosmo",
                    coinDecimals: 6,
                    coinGeckoId: "osmosis",
          },
          features: ["stargate", "ibc-transfer", "cosmwasm"],
};

// Noble (placeholder values for testing – update with actual registry data)
export const noble: ChainInfo = {
          chainId: "noble-1",
          chainName: "Noble",
          rpc: "https://rpc.mainnet.noble.strange.love",
          rest: "https://api.mainnet.noble.strange.love",
          bip44: { coinType: 118 },
          bech32Config: {
                    bech32PrefixAccAddr: "noble",
                    bech32PrefixAccPub: "noblepub",
                    bech32PrefixValAddr: "noblevaloper",
                    bech32PrefixValPub: "noblevaloperpub",
                    bech32PrefixConsAddr: "noblevalcons",
                    bech32PrefixConsPub: "noblevalconspub",
          },
          currencies: [
                    {
                              coinDenom: "USDC",
                              coinMinimalDenom: "uusdc",
                              coinDecimals: 6,
                              coinGeckoId: "usd-coin",
                    },
          ],
          feeCurrencies: [
                    {
                              coinDenom: "USDC",
                              coinMinimalDenom: "uusdc",
                              coinDecimals: 6,
                              coinGeckoId: "usd-coin",
                    },
          ],
          stakeCurrency: {
                    coinDenom: "USDC",
                    coinMinimalDenom: "uusdc",
                    coinDecimals: 6,
                    coinGeckoId: "usd-coin",
          },
          features: ["stargate", "ibc-transfer"],
};

















// // src/config/cosmosChains.ts I added this file

// export const cosmoshub = {
//           chainId: "cosmoshub-4",
//           chainName: "Cosmos Hub",
//           rpc: "https://rpc.cosmoshub.strange.love",
//           rest: "https://api.cosmoshub.strange.love",
// };

// export const osmosis = {
//           chainId: "osmosis-1",
//           chainName: "Osmosis",
//           rpc: "https://rpc.osmosis.zone",
//           rest: "https://lcd.osmosis.zone",
// };

// export const noble = {
//           chainId: "noble-1",
//           chainName: "Noble",
//           rpc: "https://rpc.mainnet.noble.strange.love",
//           rest: "https://api.mainnet.noble.strange.love",
// };
