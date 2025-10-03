// src/lib/contract.ts
import { ethers } from "ethers";
import type { WalletWithSigner } from "@getpara/react-sdk";

// Replace with your actual deployed token address
const TOKEN_ADDRESS = "0xYourTokenAddressHere";

// Replace with your actual ABI
const TOKEN_ABI = [
          "function mint(address to, uint256 amount) public",
          "function burn(address from, uint256 amount) public",
];

export async function mintTokens(wallet: WalletWithSigner, amount: string) {
          if (!wallet?.signer) throw new Error("Wallet not connected with signer");

          const signer = wallet.signer as ethers.Signer;
          const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

          const tx = await contract.mint(wallet.address, ethers.parseUnits(amount, 18));
          return tx.wait();
}

export async function burnTokens(wallet: WalletWithSigner, amount: string) {
          if (!wallet?.signer) throw new Error("Wallet not connected with signer");

          const signer = wallet.signer as ethers.Signer;
          const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

          const tx = await contract.burn(wallet.address, ethers.parseUnits(amount, 18));
          return tx.wait();
}
