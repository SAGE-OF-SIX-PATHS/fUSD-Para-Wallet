// version 4

import { useState } from "react";
import {
  useAccount,
  useModal,
  useWallet,
  useSignMessage,
  Wallet,
} from "@getpara/react-sdk";
import { Header } from "./components/layout/Header";
import { StatusAlert } from "./components/ui/StatusAlert";
import { ConnectWalletCard } from "./components/ui/ConnectWalletCard";
import { SignMessageForm } from "./components/ui/SignMessageForm";
import { SignatureDisplay } from "./components/ui/SignatureDisplay";

// Import the smart Dashboard controller, not the raw UI screen
import Dashboard from "./components/ui/Dashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function Home() {
  const [message, setMessage] = useState("Hello Para!");
  const { openModal } = useModal();
  const account = useAccount();
  const isConnected = !!account.data;

  const { data: wallet } = useWallet();
  const signMessageHook = useSignMessage();
  const navigate = useNavigate();

  const address = wallet?.address ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !wallet?.id) return;

    await signMessageHook.signMessage({
      walletId: wallet.id,
      messageBase64: btoa(message),
    });

    navigate("/dashboard");
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    if (signMessageHook.data) signMessageHook.reset();
  };

  const status = {
    show:
      signMessageHook.isPending ||
      !!signMessageHook.error ||
      !!signMessageHook.data,
    type: signMessageHook.isPending
      ? ("info" as const)
      : signMessageHook.error
        ? ("error" as const)
        : ("success" as const),
    message: signMessageHook.isPending
      ? "Signing message..."
      : signMessageHook.error
        ? signMessageHook.error.message ||
        "Failed to sign message. Please try again."
        : "Message signed successfully!",
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Para Custom Auth Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sign messages with your Para wallet using email, phone, or social
            authentication. This demonstrates Para’s web-sdk with native React
            components.
          </p>
        </div>

        {!isConnected ? (
          <div data-testid="not-logged-in">
            <ConnectWalletCard onConnect={openModal} />
          </div>
        ) : (
          <div className="max-w-xl mx-auto" data-testid="wallet-connected">
            <div className="mb-8 rounded border border-gray-200">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">
                  Connected Wallet
                </h3>
              </div>
              <div className="px-6 py-3">
                <p className="text-sm text-gray-500">Address</p>
                <p
                  className="text-lg font-medium text-gray-900 font-mono"
                  data-testid="wallet-address"
                >
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : ""}
                </p>
              </div>
            </div>

            <StatusAlert
              show={status.show}
              type={status.type}
              message={status.message}
            />

            <SignMessageForm
              message={message}
              isLoading={signMessageHook.isPending}
              onMessageChange={handleMessageChange}
              onSubmit={handleSubmit}
            />

            {signMessageHook.data &&
              "signature" in signMessageHook.data && (
                <SignatureDisplay
                  signature={signMessageHook.data.signature}
                />
              )}
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Use Dashboard (smart) not DashboardScreen */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}










// // version 3, the dynamic one
// import { useState, useEffect } from "react";
// import {
//   useAccount,
//   useModal,
//   useWallet,
//   useSignMessage,
//   Wallet,
// } from "@getpara/react-sdk";
// import { Header } from "./components/layout/Header";
// import { StatusAlert } from "./components/ui/StatusAlert";
// import { ConnectWalletCard } from "./components/ui/ConnectWalletCard";
// import { SignMessageForm } from "./components/ui/SignMessageForm";
// import { SignatureDisplay } from "./components/ui/SignatureDisplay";
// import DashboardScreen from "./components/ui/DashboardScreen";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate,
// } from "react-router-dom";
// import type {
//   WalletState,
//   ProtocolStats,
//   ChartDataPoint,
// } from "./components/ui/types";

// // 🔹 Extend Wallet type to allow balances (fix)
// interface WalletWithBalances extends Omit<Wallet, "signer"> {
//   balances?: {
//     eth?: string;
//     fusd?: string;
//     [key: string]: string | undefined;
//   };
// }

// // 🔹 Example: fetch protocol stats (replace with real contract calls later)
// async function fetchProtocolStats(address: string): Promise<ProtocolStats> {
//   // You’ll swap this with an API call or contract read
//   return {
//     tvlLocked: "1.2M",
//     totalSupply: "500k",
//     burnedTokens: "10k",
//     contractHealth: "Healthy",
//   };
// }

// function Home() {
//   const [message, setMessage] = useState("Hello Para!");
//   const { openModal } = useModal();
//   const account = useAccount();
//   const isConnected = !!account.data;

//   const { data: wallet } = useWallet();
//   const signMessageHook = useSignMessage();
//   const navigate = useNavigate();

//   const address = wallet?.address ?? "";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isConnected || !wallet?.id) return;

//     await signMessageHook.signMessage({
//       walletId: wallet.id,
//       messageBase64: btoa(message),
//     });

//     navigate("/dashboard");
//   };

//   const handleMessageChange = (value: string) => {
//     setMessage(value);
//     if (signMessageHook.data) signMessageHook.reset();
//   };

//   const status = {
//     show:
//       signMessageHook.isPending ||
//       !!signMessageHook.error ||
//       !!signMessageHook.data,
//     type: signMessageHook.isPending
//       ? ("info" as const)
//       : signMessageHook.error
//         ? ("error" as const)
//         : ("success" as const),
//     message: signMessageHook.isPending
//       ? "Signing message..."
//       : signMessageHook.error
//         ? signMessageHook.error.message ||
//         "Failed to sign message. Please try again."
//         : "Message signed successfully!",
//   };

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold tracking-tight mb-4">
//             Para Custom Auth Demo
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Sign messages with your Para wallet using email, phone, or social
//             authentication. This demonstrates Para’s web-sdk with native React
//             components.
//           </p>
//         </div>

//         {!isConnected ? (
//           <div data-testid="not-logged-in">
//             <ConnectWalletCard onConnect={openModal} />
//           </div>
//         ) : (
//           <div className="max-w-xl mx-auto" data-testid="wallet-connected">
//             <div className="mb-8 rounded border border-gray-200">
//               <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Connected Wallet
//                 </h3>
//               </div>
//               <div className="px-6 py-3">
//                 <p className="text-sm text-gray-500">Address</p>
//                 <p
//                   className="text-lg font-medium text-gray-900 font-mono"
//                   data-testid="wallet-address"
//                 >
//                   {address
//                     ? `${address.slice(0, 6)}...${address.slice(-4)}`
//                     : ""}
//                 </p>
//               </div>
//             </div>

//             <StatusAlert
//               show={status.show}
//               type={status.type}
//               message={status.message}
//             />

//             <SignMessageForm
//               message={message}
//               isLoading={signMessageHook.isPending}
//               onMessageChange={handleMessageChange}
//               onSubmit={handleSubmit}
//             />

//             {signMessageHook.data &&
//               "signature" in signMessageHook.data && (
//                 <SignatureDisplay
//                   signature={signMessageHook.data.signature}
//                 />
//               )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default function App() {
//   const { data: wallet } = useWallet();
//   const extendedWallet = wallet as WalletWithBalances | undefined;
//   const address = extendedWallet?.address ?? "";

//   const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
//     tvlLocked: "0",
//     totalSupply: "0",
//     burnedTokens: "0",
//     contractHealth: "Unknown",
//   });

//   // 🔹 load stats whenever address changes
//   useEffect(() => {
//     if (address) {
//       fetchProtocolStats(address).then(setProtocolStats);
//     }
//   }, [address]);

//   // 🔹 fake chart (replace with live data source)
//   const chartData: ChartDataPoint[] = [
//     { date: "Mon", value: 100 },
//     { date: "Tue", value: 120 },
//     { date: "Wed", value: 90 },
//     { date: "Thu", value: 140 },
//     { date: "Fri", value: 110 },
//   ];

//   const walletState: WalletState = {
//     address,
//     balanceETH: extendedWallet?.balances?.eth ?? "0.00",
//     balanceFUSD: extendedWallet?.balances?.fusd ?? "0.00",
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/dashboard"
//           element={
//             <DashboardScreen
//               walletState={walletState}
//               protocolStats={protocolStats}
//               chartData={chartData}
//               onMintTokens={(amount: string) =>
//                 console.log("Mint from chain:", amount)
//               }
//               onBurnTokens={(amount: string) =>
//                 console.log("Burn from chain:", amount)
//               }
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }







// //version 3, the dynamic one
// import { useState, useEffect } from "react";
// import {
//   useAccount,
//   useModal,
//   useWallet,
//   useSignMessage,
// } from "@getpara/react-sdk";
// import { Header } from "./components/layout/Header";
// import { StatusAlert } from "./components/ui/StatusAlert";
// import { ConnectWalletCard } from "./components/ui/ConnectWalletCard";
// import { SignMessageForm } from "./components/ui/SignMessageForm";
// import { SignatureDisplay } from "./components/ui/SignatureDisplay";
// import DashboardScreen from "./components/ui/DashboardScreen";

// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import type { WalletState, ProtocolStats, ChartDataPoint } from "./components/ui/types";

// // 🔹 Example: fetch protocol stats (replace with real contract calls later)
// async function fetchProtocolStats(address: string): Promise<ProtocolStats> {
//   // You’ll swap this with an API call or contract read
//   return {
//     tvlLocked: "1.2M",
//     totalSupply: "500k",
//     burnedTokens: "10k",
//     contractHealth: "Healthy",
//   };
// }

// function Home() {
//   const [message, setMessage] = useState("Hello Para!");
//   const { openModal } = useModal();
//   const account = useAccount();
//   const isConnected = !!account.data;

//   const { data: wallet } = useWallet();
//   const signMessageHook = useSignMessage();
//   const navigate = useNavigate();

//   const address = wallet?.address ?? "";

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isConnected || !wallet?.id) return;

//     await signMessageHook.signMessage({
//       walletId: wallet.id,
//       messageBase64: btoa(message),
//     });

//     navigate("/dashboard");
//   };

//   const handleMessageChange = (value: string) => {
//     setMessage(value);
//     if (signMessageHook.data) signMessageHook.reset();
//   };

//   const status = {
//     show:
//       signMessageHook.isPending ||
//       !!signMessageHook.error ||
//       !!signMessageHook.data,
//     type: signMessageHook.isPending
//       ? ("info" as const)
//       : signMessageHook.error
//         ? ("error" as const)
//         : ("success" as const),
//     message: signMessageHook.isPending
//       ? "Signing message..."
//       : signMessageHook.error
//         ? signMessageHook.error.message ||
//         "Failed to sign message. Please try again."
//         : "Message signed successfully!",
//   };

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold tracking-tight mb-4">
//             Para Custom Auth Demo
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Sign messages with your Para wallet using email, phone, or social
//             authentication. This demonstrates Para’s web-sdk with native React
//             components.
//           </p>
//         </div>

//         {!isConnected ? (
//           <div data-testid="not-logged-in">
//             <ConnectWalletCard onConnect={openModal} />
//           </div>
//         ) : (
//           <div className="max-w-xl mx-auto" data-testid="wallet-connected">
//             <div className="mb-8 rounded border border-gray-200">
//               <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Connected Wallet
//                 </h3>
//               </div>
//               <div className="px-6 py-3">
//                 <p className="text-sm text-gray-500">Address</p>
//                 <p
//                   className="text-lg font-medium text-gray-900 font-mono"
//                   data-testid="wallet-address"
//                 >
//                   {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
//                 </p>
//               </div>
//             </div>

//             <StatusAlert
//               show={status.show}
//               type={status.type}
//               message={status.message}
//             />

//             <SignMessageForm
//               message={message}
//               isLoading={signMessageHook.isPending}
//               onMessageChange={handleMessageChange}
//               onSubmit={handleSubmit}
//             />

//             {signMessageHook.data &&
//               "signature" in signMessageHook.data && (
//                 <SignatureDisplay
//                   signature={signMessageHook.data.signature}
//                 />
//               )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default function App() {
//   const { data: wallet } = useWallet();
//   const address = wallet?.address ?? "";

//   const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
//     tvlLocked: "0",
//     totalSupply: "0",
//     burnedTokens: "0",
//     contractHealth: "Unknown",
//   });

//   // 🔹 load stats whenever address changes
//   useEffect(() => {
//     if (address) {
//       fetchProtocolStats(address).then(setProtocolStats);
//     }
//   }, [address]);

//   // 🔹 fake chart (replace with live data source)
//   const chartData: ChartDataPoint[] = [
//     { date: "Mon", value: 100 },
//     { date: "Tue", value: 120 },
//     { date: "Wed", value: 90 },
//     { date: "Thu", value: 140 },
//     { date: "Fri", value: 110 },
//   ];

//   const walletState: WalletState = {
//     address,
//     balanceETH: wallet?.balances?.eth ?? "0.00",
//     balanceFUSD: wallet?.balances?.fusd ?? "0.00",
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/dashboard"
//           element={
//             <DashboardScreen
//               walletState={walletState}
//               protocolStats={protocolStats}
//               chartData={chartData}
//               onMintTokens={(amount: string) =>
//                 console.log("Mint from chain:", amount)
//               }
//               onBurnTokens={(amount: string) =>
//                 console.log("Burn from chain:", amount)
//               }
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }



// version 2, the hardcoded code
// import { useState } from "react";
// import { useAccount, useModal, useWallet, useSignMessage } from "@getpara/react-sdk";
// import { Header } from "./components/layout/Header";
// import { StatusAlert } from "./components/ui/StatusAlert";
// import { ConnectWalletCard } from "./components/ui/ConnectWalletCard";
// import { SignMessageForm } from "./components/ui/SignMessageForm";
// import { SignatureDisplay } from "./components/ui/SignatureDisplay";
// import DashboardScreen from "./components/ui/DashboardScreen";

// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// // Wrapper component for Home page logic
// function Home() {
//   const [message, setMessage] = useState("Hello Para!");
//   const { openModal } = useModal();
//   const account = useAccount();
//   const isConnected = !!account.data; // true if account exists

//   const { data: wallet } = useWallet();
//   const signMessageHook = useSignMessage();
//   const navigate = useNavigate();

//   const address = wallet?.address;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isConnected || !wallet?.id) {
//       return;
//     }

//     // sign the message
//     await signMessageHook.signMessage({
//       walletId: wallet.id,
//       messageBase64: btoa(message),
//     });

//     // ✅ redirect to dashboard after signing
//     navigate("/dashboard");
//   };

//   const handleMessageChange = (value: string) => {
//     setMessage(value);
//     if (signMessageHook.data) {
//       signMessageHook.reset();
//     }
//   };

//   const status = {
//     show: signMessageHook.isPending || !!signMessageHook.error || !!signMessageHook.data,
//     type: signMessageHook.isPending
//       ? ("info" as const)
//       : signMessageHook.error
//         ? ("error" as const)
//         : ("success" as const),
//     message: signMessageHook.isPending
//       ? "Signing message..."
//       : signMessageHook.error
//         ? signMessageHook.error.message || "Failed to sign message. Please try again."
//         : "Message signed successfully!",
//   };

//   return (
//     <>
//       <Header />

//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold tracking-tight mb-4">Para Custom Auth Demo</h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Sign messages with your Para wallet using email, phone, or social authentication. This demonstrates using
//             Para's web-sdk with native React components and a unified authentication flow.
//           </p>
//         </div>

//         {!isConnected ? (
//           <div data-testid="not-logged-in">
//             <ConnectWalletCard onConnect={openModal} />
//           </div>
//         ) : (
//           <div
//             className="max-w-xl mx-auto"
//             data-testid="wallet-connected">
//             <div className="mb-8 rounded-none border border-gray-200">
//               <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900">Connected Wallet</h3>
//               </div>
//               <div className="px-6 py-3">
//                 <p className="text-sm text-gray-500">Address</p>
//                 <p
//                   className="text-lg font-medium text-gray-900 font-mono"
//                   data-testid="wallet-address">
//                   {address?.slice(0, 6)}...{address?.slice(-4)}
//                 </p>
//               </div>
//             </div>

//             <StatusAlert
//               show={status.show}
//               type={status.type}
//               message={status.message}
//             />

//             <SignMessageForm
//               message={message}
//               isLoading={signMessageHook.isPending}
//               onMessageChange={handleMessageChange}
//               onSubmit={handleSubmit}
//             />

//             {signMessageHook.data && "signature" in signMessageHook.data && (
//               <SignatureDisplay signature={signMessageHook.data.signature} />
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // ✅ Wrap Home + Dashboard in Router
// export default function App() {
//   const { data: wallet } = useWallet();

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/dashboard"
//           element={
//             <DashboardScreen
//               walletState={{ address: wallet?.address || "" }}
//               protocolStats={{
//                 tvlLocked: "1.2M",
//                 totalSupply: "500k",
//                 burnedTokens: "10k",
//                 contractHealth: "Healthy",
//               }}
//               chartData={[
//                 { date: "Mon", value: 100 },
//                 { date: "Tue", value: 120 },
//                 { date: "Wed", value: 90 },
//                 { date: "Thu", value: 140 },
//                 { date: "Fri", value: 110 },
//               ]}
//               onMintTokens={(amount: string) => console.log("Mint", amount)}
//               onBurnTokens={(amount:string) => console.log("Burn", amount)}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }




//verion 1 from the clone
// import { useState } from "react";
// import { useAccount, useModal, useWallet, useSignMessage } from "@getpara/react-sdk";
// import { Header } from "./components/layout/Header";
// import { StatusAlert } from "./components/ui/StatusAlert";
// import { ConnectWalletCard } from "./components/ui/ConnectWalletCard";
// import { SignMessageForm } from "./components/ui/SignMessageForm";
// import { SignatureDisplay } from "./components/ui/SignatureDisplay";
// import { DashboardScreen } from "./components/ui/DashboardScreen"

// export default function Home() {
//   const [message, setMessage] = useState("Hello Para!");
//   const { openModal } = useModal();
//   const { isConnected } = useAccount();
//   const { data: wallet } = useWallet();
//   const signMessageHook = useSignMessage();

//   const address = wallet?.address;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isConnected || !wallet?.id) {
//       return;
//     }

//     signMessageHook.signMessage({
//       walletId: wallet.id,
//       messageBase64: btoa(message),
//     });
//   };

//   const handleMessageChange = (value: string) => {
//     setMessage(value);
//     if (signMessageHook.data) {
//       signMessageHook.reset();
//     }
//   };

//   const status = {
//     show: signMessageHook.isPending || !!signMessageHook.error || !!signMessageHook.data,
//     type: signMessageHook.isPending
//       ? ("info" as const)
//       : signMessageHook.error
//       ? ("error" as const)
//       : ("success" as const),
//     message: signMessageHook.isPending
//       ? "Signing message..."
//       : signMessageHook.error
//       ? signMessageHook.error.message || "Failed to sign message. Please try again."
//       : "Message signed successfully!",
//   };

//   return (
//     <>
//       <Header />

//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold tracking-tight mb-4">Para Custom Auth Demo</h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Sign messages with your Para wallet using email, phone, or social authentication. This demonstrates using
//             Para's web-sdk with native React components and a unified authentication flow.
//           </p>
//         </div>

//         {!isConnected ? (
//           <div data-testid="not-logged-in">
//             <ConnectWalletCard onConnect={openModal} />
//           </div>
//         ) : (
//           <div
//             className="max-w-xl mx-auto"
//             data-testid="wallet-connected">
//             <div className="mb-8 rounded-none border border-gray-200">
//               <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
//                 <h3 className="text-sm font-medium text-gray-900">Connected Wallet</h3>
//               </div>
//               <div className="px-6 py-3">
//                 <p className="text-sm text-gray-500">Address</p>
//                 <p
//                   className="text-lg font-medium text-gray-900 font-mono"
//                   data-testid="wallet-address">
//                   {address?.slice(0, 6)}...{address?.slice(-4)}
//                 </p>
//               </div>
//             </div>

//             <StatusAlert
//               show={status.show}
//               type={status.type}
//               message={status.message}
//             />

//             <SignMessageForm
//               message={message}
//               isLoading={signMessageHook.isPending}
//               onMessageChange={handleMessageChange}
//               onSubmit={handleSubmit}
//             />

//             {signMessageHook.data && "signature" in signMessageHook.data && (
//               <SignatureDisplay signature={signMessageHook.data.signature} />
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
