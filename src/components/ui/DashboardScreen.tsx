// ====================================
// 📁 FILE: DashboardScreen.tsx
// 🎯 PURPOSE: This is the main dashboard where users can mint/burn tokens and see stats
// 💡 WHAT IT DOES: Shows charts, statistics, and mint/burn buttons after wallet is connected
// 🔧 FOR BEGINNERS: This is like the "control panel" where users do the actual token operations
// ====================================

import { useState } from "react";

import { TrendingUp, Activity, Shield } from 'lucide-react';
import type { WalletState, ProtocolStats, ChartDataPoint } from './types';

// Props are the settings we pass to this component
interface DashboardScreenProps {
          walletState: WalletState;           // Information about the connected wallet
          protocolStats: ProtocolStats;       // Statistics about the fUSD protocol
          chartData: ChartDataPoint[];        // Data points for the market chart
          onMintTokens: (amount: string) => void;  // Function to call when user wants to mint tokens
          onBurnTokens: (amount: string) => void;  // Function to call when user wants to burn tokens
}

// This is the main dashboard component that shows everything after wallet connection
const DashboardScreen: React.FC<DashboardScreenProps> = ({
          walletState,
          protocolStats,
          chartData,
          onMintTokens,
          onBurnTokens
}:any) => {
          // State to track what the user types in the input boxes
          const [mintAmount, setMintAmount] = useState('');
          const [burnAmount, setBurnAmount] = useState('');

          return (
                    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                              {/* Header - Top part with logo and wallet info */}
                              <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center space-x-2">
                                                  <div className="text-2xl">💎</div>
                                        </div>

                                        {/* Connected wallet info - TODO: Display real wallet balance */}
                                        <div className="flex items-center space-x-4">
                                                  <div className="text-right">
                                                            <div className="text-white text-sm">Balance: 2.45k</div>
                                                            <div className="text-slate-400 text-xs">ETH: 1.234 Ξ</div>
                                                            <div className="text-slate-400 text-xs">fUSD: 0.42</div>
                                                  </div>
                                                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                            <span className="text-sm font-medium">
                                                                      {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                                                            </span>
                                                  </div>
                                        </div>
                              </div>

                              {/* Main title - The big "fUSD Protocol" heading */}
                              <div className="text-center mb-8">
                                        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                                                  fUSD Protocol
                                        </h1>
                                        <p className="text-slate-400">Manage your digital assets with ease</p>
                              </div>

                              <div className="max-w-6xl mx-auto space-y-6">
                                        {/* Stats and Chart Row - The top section with chart and statistics */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                  {/* Market Overview Chart - TODO: Integrate real chart data */}
                                                  <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                                            <div className="flex items-center justify-between mb-6">
                                                                      <div>
                                                                                <h3 className="text-lg font-semibold text-white mb-1">Market Overview</h3>
                                                                                <p className="text-slate-400 text-sm">Total supply and price trends</p>
                                                                      </div>
                                                                      <div className="flex space-x-2">
                                                                                {/* TODO: Add time range selectors for real-time data */}
                                                                                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs">Total Supply</button>
                                                                                <button className="bg-slate-600 text-slate-300 px-3 py-1 rounded-lg text-xs">Volume</button>
                                                                      </div>
                                                            </div>

                                                            {/* Simple chart visualization - TODO: Replace with real charting library */}
                                                            <div className="h-40 relative">
                                                                      <svg viewBox="0 0 400 160" className="w-full h-full">
                                                                                <defs>
                                                                                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                                                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                                                                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                                                                          </linearGradient>
                                                                                </defs>
                                                                                <polyline
                                                                                          fill="none"
                                                                                          stroke="#3B82F6"
                                                                                          strokeWidth="2"
                                                                                          points="20,140 80,120 140,100 200,110 260,80 320,60 380,40"
                                                                                />
                                                                                <polygon
                                                                                          fill="url(#chartGradient)"
                                                                                          points="20,140 80,120 140,100 200,110 260,80 320,60 380,40 380,160 20,160"
                                                                                />
                                                                      </svg>
                                                                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                                                                                {chartData.map((point: ChartDataPoint, idx: number) => (
                                                                                          <span key={idx}>{point.date}</span>
                                                                                ))}

                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Current Statistics - TODO: Connect to real-time protocol data */}
                                                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                                            <h3 className="text-lg font-semibold text-white mb-4">Current Statistics</h3>

                                                            {/* Stats circle visualization - The colorful donut chart */}
                                                            <div className="flex justify-center mb-6">
                                                                      <div className="relative w-32 h-32">
                                                                                <svg className="w-full h-full transform -rotate-90">
                                                                                          <circle cx="64" cy="64" r="56" fill="none" stroke="#374151" strokeWidth="8" />
                                                                                          <circle cx="64" cy="64" r="56" fill="none" stroke="#3B82F6" strokeWidth="8"
                                                                                                    strokeDasharray={`${2 * Math.PI * 56 * 0.7} ${2 * Math.PI * 56}`}
                                                                                                    className="transition-all duration-1000" />
                                                                                          <circle cx="64" cy="64" r="48" fill="none" stroke="#10B981" strokeWidth="4"
                                                                                                    strokeDasharray={`${2 * Math.PI * 48 * 0.5} ${2 * Math.PI * 48}`}
                                                                                                    className="transition-all duration-1000" />
                                                                                          <circle cx="64" cy="64" r="40" fill="none" stroke="#F59E0B" strokeWidth="4"
                                                                                                    strokeDasharray={`${2 * Math.PI * 40 * 0.3} ${2 * Math.PI * 40}`}
                                                                                                    className="transition-all duration-1000" />
                                                                                </svg>
                                                                      </div>
                                                            </div>

                                                            {/* Stats list - The text showing different statistics */}
                                                            <div className="space-y-3">
                                                                      <div className="flex items-center justify-between">
                                                                                <div className="flex items-center space-x-2">
                                                                                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                                                          <span className="text-slate-300 text-sm">TVL Collateral (70%)</span>
                                                                                </div>
                                                                                <span className="text-white font-medium">{protocolStats.tvlLocked}</span>
                                                                      </div>

                                                                      <div className="flex items-center justify-between">
                                                                                <div className="flex items-center space-x-2">
                                                                                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                                                          <span className="text-slate-300 text-sm">Total fUSD Supply (52%)</span>
                                                                                </div>
                                                                                <span className="text-white font-medium">{protocolStats.totalSupply}</span>
                                                                      </div>

                                                                      <div className="flex items-center justify-between">
                                                                                <div className="flex items-center space-x-2">
                                                                                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                                                          <span className="text-slate-300 text-sm">Burned fUSD (1%)</span>
                                                                                </div>
                                                                                <span className="text-white font-medium">{protocolStats.burnedTokens}</span>
                                                                      </div>

                                                                      <div className="flex items-center justify-between">
                                                                                <div className="flex items-center space-x-2">
                                                                                          <Shield className="w-3 h-3 text-green-500" />
                                                                                          <span className="text-slate-300 text-sm">Contract Health</span>
                                                                                </div>
                                                                                <span className="text-green-400 font-medium">{protocolStats.contractHealth}</span>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Mint and Burn Controls - The bottom section with the action buttons */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  {/* Mint fUSD Section - TODO: Connect to smart contract mint function */}
                                                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                                            <div className="space-y-4">
                                                                      <div className="flex items-center space-x-2 mb-4">
                                                                                <TrendingUp className="w-5 h-5 text-green-500" />
                                                                                <h3 className="text-lg font-semibold text-white">Mint fUSD</h3>
                                                                      </div>
                                                                      <p className="text-slate-400 text-sm mb-4">
                                                                                Deposit ETH collateral to mint fresh fUSD tokens
                                                                      </p>

                                                                      {/* Input amount - Where user types how much to mint */}
                                                                      <div className="space-y-2">
                                                                                <label className="text-slate-300 text-sm">Amount</label>
                                                                                <input
                                                                                          type="number"
                                                                                          value={mintAmount}
                                                                                          onChange={(e) => setMintAmount(e.target.value)}
                                                                                          placeholder="3.45566"
                                                                                          className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-green-500 transition-colors"
                                                                                />
                                                                      </div>

                                                                      {/* Mint button - TODO: Add loading states and transaction feedback */}
                                                                      <button
                                                                                onClick={() => onMintTokens(mintAmount)}
                                                                                disabled={!mintAmount || parseFloat(mintAmount) <= 0}
                                                                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                                                                      >
                                                                                Mint Tokens
                                                                      </button>
                                                            </div>
                                                  </div>

                                                  {/* Burn fUSD Section - TODO: Connect to smart contract burn function */}
                                                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                                            <div className="space-y-4">
                                                                      <div className="flex items-center space-x-2 mb-4">
                                                                                <Activity className="w-5 h-5 text-red-500" />
                                                                                <h3 className="text-lg font-semibold text-white">Burn fUSD</h3>
                                                                      </div>
                                                                      <p className="text-slate-400 text-sm mb-4">
                                                                                Destroy fUSD tokens to withdraw your ETH collateral
                                                                      </p>

                                                                      {/* Input amount - Where user types how much to burn */}
                                                                      <div className="space-y-2">
                                                                                <label className="text-slate-300 text-sm">Amount</label>
                                                                                <input
                                                                                          type="number"
                                                                                          value={burnAmount}
                                                                                          onChange={(e) => setBurnAmount(e.target.value)}
                                                                                          placeholder="0"
                                                                                          className="w-full bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                                                                                />
                                                                      </div>

                                                                      {/* Burn button - TODO: Add loading states and transaction feedback */}
                                                                      <button
                                                                                onClick={() => onBurnTokens(burnAmount)}
                                                                                disabled={!burnAmount || parseFloat(burnAmount) <= 0}
                                                                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                                                                      >
                                                                                Burn Tokens
                                                                      </button>
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Footer - The small text at the bottom */}
                                        <div className="text-center py-6">
                                                  <p className="text-slate-500 text-sm">
                                                            Powered by <span className="text-purple-400 font-semibold">🚀 Fluent</span>
                                                  </p>
                                        </div>
                              </div>
                    </div>
          );
};

export default DashboardScreen;