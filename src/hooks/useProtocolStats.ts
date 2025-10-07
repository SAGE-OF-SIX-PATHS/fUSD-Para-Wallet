import { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";

import { getTotalSupply, getTVL, getBurnedTokens, getContractHealth } from "../lib/contract";

interface ProtocolStats {
          totalSupply: string;
          tvl: string;
          burned: string;
          health: string;
          loading: boolean;
          error: string | null;
}

// 👇 Change `ethers.providers.Provider` → `JsonRpcProvider`
export const useProtocolStats = (provider: JsonRpcProvider | null) => {
          const [stats, setStats] = useState<ProtocolStats>({
                    totalSupply: "0",
                    tvl: "0",
                    burned: "0",
                    health: "0",
                    loading: true,
                    error: null,
          });

          useEffect(() => {
                    if (!provider) return;

                    const fetchStats = async () => {
                              try {
                                        setStats(prev => ({ ...prev, loading: true }));
                                        const [totalSupply, tvl, burned, health] = await Promise.all([
                                                  getTotalSupply(provider),
                                                  getTVL(provider),
                                                  getBurnedTokens(provider),
                                                  getContractHealth(provider),
                                        ]);
                                        setStats({ totalSupply, tvl, burned, health, loading: false, error: null });
                              } catch (err: any) {
                                        setStats(prev => ({ ...prev, loading: false, error: err.message }));
                              }
                    };

                    fetchStats();
          }, [provider]);

          return stats;
};
