// src/lib/contracts.ts (or wherever you put this file)

// ❌ Old
// import { ethers } from "ethers";

// ✅ New (ethers v6 style) — pick only what you use
import {
  JsonRpcProvider,
  Contract,
  formatEther,
} from "ethers";

// fUSD ERC20 ABI (simplified)
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

// Replace with your deployed contract addresses
const FUSD_TOKEN_ADDRESS = "0xYourFUSDTokenAddress";
const TREASURY_CONTRACT_ADDRESS = "0xYourTreasuryOrVaultAddress";

// ✅ Note the provider type is now JsonRpcProvider (ethers v6)
export const getEthBalance = async (
  provider: JsonRpcProvider,
  address: string
) => {
  const balance = await provider.getBalance(address);
  return formatEther(balance); // ✅ replaced ethers.utils.formatEther
};

export const getFusdBalance = async (
  provider: JsonRpcProvider,
  address: string
) => {
  const token = new Contract(FUSD_TOKEN_ADDRESS, ERC20_ABI, provider);
  const balance = await token.balanceOf(address);
  return formatEther(balance); // ✅ replaced ethers.utils.formatEther
};

// Example: protocol stats
export const getTotalSupply = async (provider: JsonRpcProvider) => {
  const token = new Contract(FUSD_TOKEN_ADDRESS, ERC20_ABI, provider);
  const supply = await token.totalSupply();
  return formatEther(supply); // ✅ replaced ethers.utils.formatEther
};

// 🔹 These should be adjusted to your protocol logic
export const getTVL = async (_provider: JsonRpcProvider) => {
  // Mock implementation → replace with actual contract call
  return "1000000"; // 1M fUSD locked
};

export const getBurnedTokens = async (_provider: JsonRpcProvider) => {
  // Mock implementation → replace with actual contract call
  return "50000"; // 50k fUSD burned
};

export const getContractHealth = async (_provider: JsonRpcProvider) => {
  // Mock implementation → replace with actual logic
  return "95"; // 95% healthy
};











// import { ethers } from "ethers";

// // fUSD ERC20 ABI (simplified)
// const ERC20_ABI = [
//           "function balanceOf(address owner) view returns (uint256)",
//           "function totalSupply() view returns (uint256)",
// ];

// // Replace with your deployed contract addresses
// const FUSD_TOKEN_ADDRESS = "0xYourFUSDTokenAddress";
// const TREASURY_CONTRACT_ADDRESS = "0xYourTreasuryOrVaultAddress";

// export const getEthBalance = async (
//           provider: ethers.providers.Provider,
//           address: string
// ) => {
//           const balance = await provider.getBalance(address);
//           return ethers.utils.formatEther(balance);
// };

// export const getFusdBalance = async (
//           provider: ethers.providers.Provider,
//           address: string
// ) => {
//           const token = new ethers.Contract(FUSD_TOKEN_ADDRESS, ERC20_ABI, provider);
//           const balance = await token.balanceOf(address);
//           return ethers.utils.formatEther(balance);
// };

// // Example: protocol stats
// export const getTotalSupply = async (provider: ethers.providers.Provider) => {
//           const token = new ethers.Contract(FUSD_TOKEN_ADDRESS, ERC20_ABI, provider);
//           const supply = await token.totalSupply();
//           return ethers.utils.formatEther(supply);
// };

// // 🔹 These should be adjusted to your protocol logic
// export const getTVL = async (provider: ethers.providers.Provider) => {
//           // Mock implementation → replace with actual contract call
//           return "1000000"; // 1M fUSD locked
// };

// export const getBurnedTokens = async (provider: ethers.providers.Provider) => {
//           // Mock implementation → replace with actual contract call
//           return "50000"; // 50k fUSD burned
// };

// export const getContractHealth = async (provider: ethers.providers.Provider) => {
//           // Mock implementation → replace with actual logic
//           return "95"; // 95% healthy
// };















// // // src/lib/contract.ts
// // import { ethers } from "ethers";
// // import type { WalletWithSigner } from "@getpara/react-sdk";

// // // Replace with your actual deployed token address
// // const TOKEN_ADDRESS = "0xYourTokenAddressHere";

// // // Replace with your actual ABI
// // const TOKEN_ABI = [
// //           "function mint(address to, uint256 amount) public",
// //           "function burn(address from, uint256 amount) public",
// // ];

// // export async function mintTokens(wallet: WalletWithSigner, amount: string) {
// //           if (!wallet?.signer) throw new Error("Wallet not connected with signer");

// //           const signer = wallet.signer as ethers.Signer;
// //           const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

// //           const tx = await contract.mint(wallet.address, ethers.parseUnits(amount, 18));
// //           return tx.wait();
// // }

// // export async function burnTokens(wallet: WalletWithSigner, amount: string) {
// //           if (!wallet?.signer) throw new Error("Wallet not connected with signer");

// //           const signer = wallet.signer as ethers.Signer;
// //           const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

// //           const tx = await contract.burn(wallet.address, ethers.parseUnits(amount, 18));
// //           return tx.wait();
// // }
