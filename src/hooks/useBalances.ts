import { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";

import { getEthBalance, getFusdBalance } from "../lib/contract";

interface Balances {
          eth: string;
          fusd: string;
          loading: boolean;
          error: string | null;
}

// 👇 Change `ethers.providers.Provider` → `JsonRpcProvider`
export const useBalances = (provider: JsonRpcProvider | null, address?: string) => {
          const [balances, setBalances] = useState<Balances>({
                    eth: "0",
                    fusd: "0",
                    loading: true,
                    error: null,
          });

          useEffect(() => {
                    if (!provider || !address) return;

                    const fetchBalances = async () => {
                              try {
                                        setBalances(prev => ({ ...prev, loading: true }));
                                        const [eth, fusd] = await Promise.all([
                                                  getEthBalance(provider, address),
                                                  getFusdBalance(provider, address),
                                        ]);
                                        setBalances({ eth, fusd, loading: false, error: null });
                              } catch (err: any) {
                                        setBalances(prev => ({ ...prev, loading: false, error: err.message }));
                              }
                    };

                    fetchBalances();
          }, [provider, address]);

          return balances;
};
