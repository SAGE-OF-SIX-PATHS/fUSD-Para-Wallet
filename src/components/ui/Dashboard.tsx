// ====================================
// 📁 FILE: Dashboard.tsx
// 🎯 PURPOSE: Smart-contract integration & data controller
// 💡 WHAT IT DOES: Fetches balances, stats, and provides mint/burn handlers
// ====================================

import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useAccount, useWallet } from "@getpara/react-sdk";

import DashboardScreen from "./DashboardScreen";
import type { WalletState, ProtocolStats, ChartDataPoint } from "./types";

// -----------------
// 📌 ABIs (simplified for ERC20 + DeskController)
// In production, import full ABIs from /abis folder
// -----------------
const ERC20_ABI = [
          "function balanceOf(address) view returns (uint256)",
          "function totalSupply() view returns (uint256)",
          "function approve(address spender, uint256 amount) returns (bool)"
];

const DESK_CONTROLLER_ABI = [
          "function mint(uint256 amount) payable",
          "function burn(uint256 amount)",
          "function getTVL() view returns (uint256)",
          "function getHealthFactor() view returns (uint256)"
];

// -----------------
// 📌 ENV Addresses
// -----------------
const FUSD_ADDRESS = import.meta.env.VITE_FUSD_ADDRESS as string;
const DESK_CONTROLLER_ADDRESS = import.meta.env.VITE_DESK_CONTROLLER_ADDRESS as string;
const RPC_URL = import.meta.env.VITE_RPC_URL as string;

// -----------------
// 📌 Main Component
// -----------------
const Dashboard: React.FC = () => {
          // useAccount returns a react-query result object. Read .data to determine connection.
          const account = useAccount();
          const isConnected = !!account.data;
          const { data: wallet } = useWallet();

          const [walletState, setWalletState] = useState<WalletState>({ address: "" });
          const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
                    tvlLocked: "0",
                    totalSupply: "0",
                    burnedTokens: "0",
                    contractHealth: "0"
          });
          const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

          const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
          const [signer, setSigner] = useState<ethers.Signer | null>(null);

          // -----------------
          // 🔹 Setup provider & signer
          // -----------------
          useEffect(() => {
                    if (!isConnected || !wallet?.address) return;

                    const setup = async () => {
                              const browserProvider = new ethers.BrowserProvider(window.ethereum);
                              const signer = await browserProvider.getSigner();

                              setProvider(browserProvider);
                              setSigner(signer);

                              setWalletState({ address: wallet.address });
                    };

                    setup();
          }, [isConnected, wallet]);

          // -----------------
          // 🔹 Fetch protocol stats
          // -----------------
          const fetchStats = useCallback(async () => {
                    if (!provider || !wallet?.address) return;

                    try {
                              const fUSD = new ethers.Contract(FUSD_ADDRESS, ERC20_ABI, provider);
                              const desk = new ethers.Contract(DESK_CONTROLLER_ADDRESS, DESK_CONTROLLER_ABI, provider);

                              // Wallet balances
                              const ethBalance = await provider.getBalance(wallet.address);
                              const fusdBalance = await fUSD.balanceOf(wallet.address);

                              // Protocol stats
                              const totalSupply = await fUSD.totalSupply();
                              const tvlLocked = await desk.getTVL();
                              const contractHealth = await desk.getHealthFactor();

                              setProtocolStats({
                                        tvlLocked: ethers.formatUnits(tvlLocked, 18),
                                        totalSupply: ethers.formatUnits(totalSupply, 18),
                                        burnedTokens: "0", // TODO: hook into contract burn event
                                        contractHealth: `${ethers.formatUnits(contractHealth, 18)} %`
                              });

                              // Dummy chart data (replace with oracle/graph)
                              setChartData([
                                        { date: "Mon", value: 120 },
                                        { date: "Tue", value: 140 },
                                        { date: "Wed", value: 110 },
                                        { date: "Thu", value: 160 },
                                        { date: "Fri", value: 180 }
                              ]);

                              // Update wallet state
                              setWalletState({
                                        address: wallet.address,
                                        balanceETH: ethers.formatEther(ethBalance),
                                        balanceFUSD: ethers.formatUnits(fusdBalance, 18)
                              });
                    } catch (err) {
                              console.error("Error fetching stats:", err);
                    }
          }, [provider, wallet]);

          useEffect(() => {
                    if (isConnected) {
                              fetchStats();
                    }
          }, [isConnected, fetchStats]);

          // -----------------
          // 🔹 Mint handler
          // -----------------
          const handleMintTokens = async (amount: string) => {
                    if (!signer) return;
                    try {
                              const desk = new ethers.Contract(DESK_CONTROLLER_ADDRESS, DESK_CONTROLLER_ABI, signer);
                              const tx = await desk.mint(ethers.parseUnits(amount, 18), {
                                        value: ethers.parseEther("0.01") // collateral placeholder
                              });
                              await tx.wait();
                              await fetchStats();
                    } catch (err) {
                              console.error("Mint error:", err);
                    }
          };

          // -----------------
          // 🔹 Burn handler
          // -----------------
          const handleBurnTokens = async (amount: string) => {
                    if (!signer) return;
                    try {
                              const fUSD = new ethers.Contract(FUSD_ADDRESS, ERC20_ABI, signer);
                              const desk = new ethers.Contract(DESK_CONTROLLER_ADDRESS, DESK_CONTROLLER_ABI, signer);

                              // Approve burn
                              const approveTx = await fUSD.approve(DESK_CONTROLLER_ADDRESS, ethers.parseUnits(amount, 18));
                              await approveTx.wait();

                              // Burn
                              const burnTx = await desk.burn(ethers.parseUnits(amount, 18));
                              await burnTx.wait();

                              await fetchStats();
                    } catch (err) {
                              console.error("Burn error:", err);
                    }
          };

          // -----------------
          // 🔹 Render
          // -----------------
          if (!isConnected) {
                    return (
                              <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
                                        <p>Please connect your wallet first.</p>
                              </div>
                    );
          }

          return (
                    <DashboardScreen
                              walletState={walletState}
                              protocolStats={protocolStats}
                              chartData={chartData}
                              onMintTokens={handleMintTokens}
                              onBurnTokens={handleBurnTokens}
                    />
          );
};

export default Dashboard;
