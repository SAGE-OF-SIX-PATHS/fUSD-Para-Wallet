// ====================================
// 📁 FILE: WalletSelectModal.tsx
// 🎯 PURPOSE: Popup to select wallet (your custom UI)
// 🔧 WIRED: Uses Para SDK modal under-the-hood (stable hooks, SDK v1.18.1)
// ====================================

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { WalletType } from "./types";
import { useModal, useAccount, useWallet } from "@getpara/react-sdk";

interface WalletSelectModalProps {
    onWalletSelect?: (walletType: WalletType) => void;
    onClose: () => void;
}

const WalletSelectModal: React.FC<WalletSelectModalProps> = ({
    onWalletSelect,
    onClose,
}) => {
    // Para hooks
    const { openModal } = useModal();
    const account = useAccount(); // ✅ returns UseQueryResult
    const { data: wallet } = useWallet(); // available if you want wallet?.address later

    // Local UI state
    const [isOpeningParaModal, setIsOpeningParaModal] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastChoice, setLastChoice] = useState<WalletType | null>(null);

    // Close modal automatically when connected
    useEffect(() => {
        if (isOpeningParaModal && account.data?.isConnected) {
            if (lastChoice && onWalletSelect) onWalletSelect(lastChoice);
            setIsOpeningParaModal(false);
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account.data?.isConnected]);

    const handleWalletConnect = async (walletType: WalletType) => {
        setLastChoice(walletType);
        setError(null);
        setIsOpeningParaModal(true);
        try {
            // Open Para's official connect modal
            await openModal();
        } catch (e: unknown) {
            setIsOpeningParaModal(false);
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error("Unknown error while connecting"));
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md border border-slate-700/50 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Connect a Wallet</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Wallet options */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => handleWalletConnect("MetaMask")}
                        className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-orange-500/30"
                    >
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            🦊
                        </div>
                        <span className="font-medium">Connect MetaMask</span>
                    </button>

                    <button
                        onClick={() => handleWalletConnect("Rabby")}
                        className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-blue-500/30"
                    >
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="font-medium">Connect Rabby</span>
                    </button>

                    <button
                        onClick={() => handleWalletConnect("Leap")}
                        className="w-full bg-slate-700/50 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-slate-600/30 hover:border-green-500/30"
                    >
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="font-medium">Connect Leap</span>
                    </button>
                </div>

                {/* Socials */}
                <div className="space-y-3">
                    <p className="text-center text-sm text-slate-400">
                        OR CONNECT WITH SOCIALS
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => handleWalletConnect("Google")}
                            className="flex-1 bg-slate-700/50 hover:bg-slate-700 p-4 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-600/30"
                        >
                            <div className="text-2xl">G</div>
                        </button>
                        <button
                            onClick={() => handleWalletConnect("Apple")}
                            className="flex-1 bg-slate-700/50 hover:bg-slate-700 p-4 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-600/30"
                        >
                            <div className="text-2xl">🍎</div>
                        </button>
                    </div>
                </div>

                {/* Status / Errors */}
                {isOpeningParaModal && (
                    <p className="text-sm text-center text-slate-400 mt-4">
                        Opening Para Wallet…
                    </p>
                )}
                {error && (
                    <p className="text-sm text-center text-red-500 mt-4">
                        Error: {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WalletSelectModal;
