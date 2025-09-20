// ====================================
// 📁 FILE: ConnectWalletScreen.tsx
// 🎯 PURPOSE: This is the first screen users see when they visit the app
// 💡 WHAT IT DOES: Shows a big "Connect Wallet" button and welcome message
// 🔧 FOR BEGINNERS: This is like the "front door" of our app where users start
// ====================================

import React from 'react';
import { Wallet } from 'lucide-react';

// Props are like settings we can pass to this component
interface ConnectWalletScreenProps {
          onConnectClick: () => void; // Function that gets called when user clicks "Connect Wallet"
}

// This is the main component that shows the connect wallet screen
const ConnectWalletScreen: React.FC<ConnectWalletScreenProps> = ({ onConnectClick }) => {
          return (
                    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                              {/* Top-right wallet connect button for logged-in state */}
                              <div className="absolute top-4 right-4">
                                        <button
                                                  onClick={onConnectClick}
                                                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                                  <Wallet className="w-4 h-4" />
                                                  <span>Connect Wallet</span>
                                        </button>
                              </div>

                              {/* Main connect wallet card - This is the big card in the center */}
                              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-slate-700/50 shadow-2xl">
                                        <div className="text-center space-y-6">
                                                  {/* Wallet icon - The purple wallet icon at the top */}
                                                  <div className="flex justify-center">
                                                            <div className="bg-purple-600/20 p-4 rounded-2xl">
                                                                      <Wallet className="w-8 h-8 text-purple-400" />
                                                            </div>
                                                  </div>

                                                  {/* Title and description - The main text */}
                                                  <div className="space-y-3">
                                                            <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
                                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                                      Please connect your wallet to access the fUSD Protocol dashboard and manage your digital assets.
                                                            </p>
                                                  </div>

                                                  {/* Connect button - The main purple button users click */}
                                                  <button
                                                            onClick={onConnectClick}
                                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                                  >
                                                            <Wallet className="w-5 h-5" />
                                                            <span>Connect Wallet</span>
                                                  </button>

                                                  {/* Supported wallets info - Small text at the bottom */}
                                                  <p className="text-xs text-slate-500">
                                                            Supported wallets: MetaMask, Rabby, Leap, and Social logins
                                                  </p>
                                        </div>
                              </div>
                    </div>
          );
};

export default ConnectWalletScreen;