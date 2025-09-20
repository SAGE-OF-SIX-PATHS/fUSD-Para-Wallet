// ====================================
// 📁 FILE: WalletSelectModal.tsx  
// 🎯 PURPOSE: This is the popup that shows different wallet options
// 💡 WHAT IT DOES: Displays MetaMask, Rabby, Leap, and social login buttons
// 🔧 FOR BEGINNERS: This is like a menu that appears when you click "Connect Wallet"
// ====================================

import React from 'react';
import { X } from 'lucide-react';
import type { WalletType } from './types';

// Props are the settings we pass to this component
interface WalletSelectModalProps {
          onWalletSelect: (walletType: WalletType) => void; // Function called when user picks a wallet
          onClose: () => void; // Function called when user wants to close the popup
}

// This is the popup/modal component that shows wallet choices
const WalletSelectModal: React.FC<WalletSelectModalProps> = ({ onWalletSelect, onClose }) => {
          return (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                              <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md border border-slate-700/50 shadow-2xl">
                                        {/* Modal header - The top part with title and X button */}
                                        <div className="flex justify-between items-center mb-6">
                                                  <h3 className="text-xl font-bold text-white">Connect a Wallet</h3>
                                                  <button
                                                            onClick={onClose}
                                                            className="text-slate-400 hover:text-white transition-colors"
                                                  >
                                                            <X className="w-5 h-5" />
                                                  </button>
                                        </div>

                                        {/* Wallet options - The main wallet buttons */}
                                        <div className="space-y-3 mb-6">
                                                  {/* MetaMask - The orange fox wallet */}
                                                  <button
                                                            onClick={() => onWalletSelect('MetaMask')}
                                                            className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-orange-500/30"
                                                  >
                                                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                                      🦊
                                                            </div>
                                                            <span className="font-medium">Connect MetaMask</span>
                                                  </button>

                                                  {/* Rabby - The blue wallet */}
                                                  <button
                                                            onClick={() => onWalletSelect('Rabby')}
                                                            className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-blue-500/30"
                                                  >
                                                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                                                      <div className="w-4 h-4 bg-white rounded-full"></div>
                                                            </div>
                                                            <span className="font-medium">Connect Rabby</span>
                                                  </button>

                                                  {/* Leap - The green wallet */}
                                                  <button
                                                            onClick={() => onWalletSelect('Leap')}
                                                            className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-green-500/30"
                                                  >
                                                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                                      <div className="w-4 h-4 bg-white rounded-full"></div>
                                                            </div>
                                                            <span className="font-medium">Connect Leap</span>
                                                  </button>
                                        </div>

                                        {/* Social login section - Google and Apple buttons */}
                                        <div className="space-y-3">
                                                  <p className="text-center text-sm text-slate-400">OR CONNECT WITH SOCIALS</p>

                                                  <div className="flex space-x-3">
                                                            {/* Google - The G button */}
                                                            <button
                                                                      onClick={() => onWalletSelect('Google')}
                                                                      className="flex-1 bg-slate-700/50 hover:bg-slate-700 p-4 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-600/30"
                                                            >
                                                                      <div className="text-2xl">G</div>
                                                            </button>

                                                            {/* Apple - The apple button */}
                                                            <button
                                                                      onClick={() => onWalletSelect('Apple')}
                                                                      className="flex-1 bg-slate-700/50 hover:bg-slate-700 p-4 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-600/30"
                                                            >
                                                                      <div className="text-2xl">🍎</div>
                                                            </button>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
};

export default WalletSelectModal;