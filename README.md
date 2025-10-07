# Developer Integration Guide

## Overview

This guide provides practical examples for integrating fUSD into your application. Whether you're building a frontend interface, smart contract, or bot, this document covers the essential patterns and code snippets you need.

## Quick Start

### Essential Information

**Network**: Fluent Testnet  
**Chain ID**: 20994  
**RPC**: `https://rpc.testnet.fluent.xyz/`

**Key Contracts** (Testnet):
```javascript
const CONTRACTS = {
  fUSD: "0x7A9ab9D0E2ca7472d1339F082F79F2F712F8Ebc9",
  deskController: "0xE2B00878fA4A06E5cAB555df3BBAD39c5eDFD2c8",
  controllerRegistry: "0xFf3e256ae44Ac6f9908762a489Bb526d920523b7",
  oracle: "0xE532Fa9ED4a6401595318724099e014F9F37db52"
};
```

### 5-Minute Setup

# fUSD-Para-Wallet

## Setup

1. **Clone the repository**

```bash
git clone git@github.com:SAGE-OF-SIX-PATHS/fUSD-Para-Wallet.git
cd fUSD-Para-Wallet
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Install Solana wallet adapter (if missing)**

```bash
pnpm add @solana/wallet-adapter-base
# or
npm install @solana/wallet-adapter-base
```

4. **Start the development server**

```bash
npm run dev
# or
pnpm dev
```

---

## Troubleshooting

If you see an error like:

```
[vite] Pre-transform error: Failed to resolve import "@solana/wallet-adapter-base" from "src/context/ParaProvider.tsx"
```

It means the `@solana/wallet-adapter-base` package is missing. Installing it as shown above should fix the issue.


## Smart Contract Integration

### Direct Solidity Integration

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDeskController {
    function mint() external payable;
    function burn(uint256 fusdAmount) external;
    function getMintQuote(uint256 ethAmount) external view returns (uint256);
    function getBurnQuote(uint256 fusdAmount) external view returns (uint256);
    function getEthUsd() external view returns (uint256);
}

contract MyDeFiApp {
    IERC20 constant FUSD = IERC20(0x7A9ab9D0E2ca7472d1339F082F79F2F712F8Ebc9);
    IDeskController constant DESK = IDeskController(0xE2B00878fA4A06E5cAB555df3BBAD39c5eDFD2c8);
    
    function mintFUSD() external payable {
        // Get quote first (optional)
        uint256 expectedFUSD = DESK.getMintQuote(msg.value);
        
        // Mint fUSD with ETH
        DESK.mint{value: msg.value}();
        
        // fUSD is now in this contract's balance
        uint256 received = FUSD.balanceOf(address(this));
    }
    
    function burnFUSD(uint256 amount) external {
        // Approve controller to burn tokens
        FUSD.approve(address(DESK), amount);
        
        // Burn fUSD to receive ETH
        DESK.burn(amount);
        
        // ETH is now in this contract's balance
    }
}
```

### Gas Estimation

```solidity
// Typical gas costs on Fluent testnet
function estimateGas() external view returns (uint256, uint256) {
    // Mint: ~80,000 gas
    // Burn: ~90,000 gas
    return (80000, 90000);
}
```

## Frontend Integration

### Using Ethers.js v6

```javascript
import { ethers } from 'ethers';

const CONTRACTS = {
  fUSD: "0x7A9ab9D0E2ca7472d1339F082F79F2F712F8Ebc9",
  deskController: "0xE2B00878fA4A06E5cAB555df3BBAD39c5eDFD2c8"
};

// Load ABIs from your build artifacts or public endpoint
function loadABI(contractName) {} // Implement based on your setup

const FUSD_ABI = loadABI('fUSD');
const DESK_ABI = loadABI('DeskController');

class FUSDIntegration {
  constructor(provider, signer) {
    this.fusd = new ethers.Contract(CONTRACTS.fUSD, FUSD_ABI, signer);
    this.desk = new ethers.Contract(CONTRACTS.deskController, DESK_ABI, signer);
  }

  // Get current ETH/USD price
  async getEthPrice() {
    return await this.desk.getEthUsd();
  }

  // Check if oracle is healthy before operations
  async isOracleHealthy() {
    return await this.desk.isOracleHealthy();
  }

  // Get fUSD balance
  async getFUSDBalance(address) {
    const balance = await this.fusd.balanceOf(address);
    return ethers.formatUnits(balance, 6); // fUSD has 6 decimals
  }

  // Get mint quote
  async getMintQuote(ethAmount) {
    const ethWei = ethers.parseEther(ethAmount.toString());
    const fusdAmount = await this.desk.getMintQuote(ethWei);
    return ethers.formatUnits(fusdAmount, 6);
  }

  // Mint fUSD
  async mintFUSD(ethAmount) {
    const ethWei = ethers.parseEther(ethAmount.toString());
    
    // Check oracle health
    if (!await this.isOracleHealthy()) {
      throw new Error("Oracle is not healthy");
    }
    
    try {
      const tx = await this.desk.mint({ value: ethWei });
      return await tx.wait();
    } catch (error) {
      throw this.parseError(error);
    }
  }

  // Burn fUSD
  async burnFUSD(fusdAmount) {
    const fusdWei = ethers.parseUnits(fusdAmount.toString(), 6);
    
    // Check and approve if needed
    const allowance = await this.fusd.allowance(
      await this.desk.signer.getAddress(),
      CONTRACTS.deskController
    );
    
    if (allowance < fusdWei) {
      const approveTx = await this.fusd.approve(CONTRACTS.deskController, fusdWei);
      await approveTx.wait();
    }
    
    try {
      const tx = await this.desk.burn(fusdWei);
      return await tx.wait();
    } catch (error) {
      throw this.parseError(error);
    }
  }

  // Error parsing helper
  parseError(error) {
    if (error.reason) return new Error(error.reason);
    if (error.message.includes("ActionTooSoon")) return new Error("Must wait 24 hours between actions");
    if (error.message.includes("InsufficientAmount")) return new Error("Amount too small (min 1 fUSD or 0.0001 ETH)");
    if (error.message.includes("OracleUnhealthy")) return new Error("Price oracle unavailable");
    if (error.message.includes("PriceMoveTooBig")) return new Error("Price moved too much, try again");
    return error;
  }
}
```

### Using Viem

```javascript
import { createPublicClient, createWalletClient, http, parseEther, formatUnits } from 'viem';
import { fluentTestnet } from 'viem/chains';

const CONTRACTS = {
  fUSD: "0x7A9ab9D0E2ca7472d1339F082F79F2F712F8Ebc9",
  deskController: "0xE2B00878fA4A06E5cAB555df3BBAD39c5eDFD2c8"
};

// Load ABIs from your build artifacts or public endpoint
function loadABI(contractName) {} // Implement based on your setup

const FUSD_ABI = loadABI('fUSD');
const DESK_ABI = loadABI('DeskController');

class FUSDViemIntegration {
  constructor(walletClient) {
    this.publicClient = createPublicClient({
      chain: fluentTestnet,
      transport: http()
    });
    this.walletClient = walletClient;
  }

  // Get ETH price from oracle
  async getEthPrice() {
    return await this.publicClient.readContract({
      address: CONTRACTS.deskController,
      abi: DESK_ABI,
      functionName: 'getEthUsd'
    });
  }

  // Get fUSD balance
  async getFUSDBalance(address) {
    const balance = await this.publicClient.readContract({
      address: CONTRACTS.fUSD,
      abi: FUSD_ABI,
      functionName: 'balanceOf',
      args: [address]
    });
    return formatUnits(balance, 6);
  }

  // Get mint quote
  async getMintQuote(ethAmount) {
    const ethWei = parseEther(ethAmount.toString());
    const fusdAmount = await this.publicClient.readContract({
      address: CONTRACTS.deskController,
      abi: DESK_ABI,
      functionName: 'getMintQuote',
      args: [ethWei]
    });
    return formatUnits(fusdAmount, 6);
  }

  // Mint fUSD
  async mintFUSD(ethAmount) {
    const ethWei = parseEther(ethAmount.toString());
    
    const hash = await this.walletClient.writeContract({
      address: CONTRACTS.deskController,
      abi: DESK_ABI,
      functionName: 'mint',
      value: ethWei
    });

    return await this.publicClient.waitForTransactionReceipt({ hash });
  }

  // Approve and burn fUSD
  async burnFUSD(fusdAmount) {
    const fusdWei = parseUnits(fusdAmount.toString(), 6);
    
    // Approve first
    const approveHash = await this.walletClient.writeContract({
      address: CONTRACTS.fUSD,
      abi: FUSD_ABI,
      functionName: 'approve',
      args: [CONTRACTS.deskController, fusdWei]
    });
    
    await this.publicClient.waitForTransactionReceipt({ hash: approveHash });

    // Then burn
    const burnHash = await this.walletClient.writeContract({
      address: CONTRACTS.deskController,
      abi: DESK_ABI,
      functionName: 'burn',
      args: [fusdWei]
    });

    return await this.publicClient.waitForTransactionReceipt({ hash: burnHash });
  }
}
```

### React Integration Example

```jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function FUSDMinter() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [fusdIntegration, setFusdIntegration] = useState(null);
  const [balance, setBalance] = useState('0');
  const [ethAmount, setEthAmount] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setSigner(signer);
      
      const integration = new FUSDIntegration(provider, signer);
      setFusdIntegration(integration);
      
      // Load balance
      const address = await signer.getAddress();
      const balance = await integration.getFUSDBalance(address);
      setBalance(balance);
    }
  };

  const updateQuote = async () => {
    if (fusdIntegration && ethAmount) {
      try {
        const quote = await fusdIntegration.getMintQuote(ethAmount);
        setQuote(quote);
      } catch (error) {
        setQuote('Error getting quote');
      }
    }
  };

  const mintFUSD = async () => {
    if (fusdIntegration && ethAmount) {
      try {
        await fusdIntegration.mintFUSD(ethAmount);
        // Refresh balance
        const address = await signer.getAddress();
        const newBalance = await fusdIntegration.getFUSDBalance(address);
        setBalance(newBalance);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <h2>fUSD Minter</h2>
      
      {!signer ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>fUSD Balance: {balance}</p>
          
          <input 
            type="number" 
            placeholder="ETH amount"
            value={ethAmount}
            onChange={(e) => {
              setEthAmount(e.target.value);
              updateQuote();
            }}
          />
          
          {quote && <p>Will receive: {quote} fUSD</p>}
          
          <button onClick={mintFUSD}>Mint fUSD</button>
        </div>
      )}
    </div>
  );
}

export default FUSDMinter;
```

## Developer Constraints & Limits

### Rate Limiting
- **Cooldown**: 24 hours between actions per address
- **Check**: Always validate `lastActionTime` before transactions

### Amount Limits
```javascript
const LIMITS = {
  minMint: 1, // 1 fUSD minimum
  minEth: 0.0001, // 0.0001 ETH minimum
  // Daily limits vary by controller configuration
};

// Check if amount meets minimums
function validateAmounts(ethAmount, fusdAmount) {
  if (ethAmount < LIMITS.minEth) throw new Error("Minimum 0.0001 ETH");
  if (fusdAmount < LIMITS.minMint) throw new Error("Minimum 1 fUSD");
}
```

### Oracle Health
Always check oracle status before price-sensitive operations:

```javascript
// Before any mint/burn operation
if (!await deskController.isOracleHealthy()) {
  throw new Error("Price oracle unavailable - try again later");
}
```

### Price Movement Protection
The system rejects transactions if price moves >5% between blocks:

```javascript
// Handle price movement errors
try {
  await mint();
} catch (error) {
  if (error.message.includes("PriceMoveTooBig")) {
    // Price moved too much - get new quote and retry
    const newQuote = await getMintQuote(amount);
    // Show user new quote and confirm
  }
}
```

## Error Handling

### Common Errors & Solutions

```javascript
const ERROR_HANDLERS = {
  "ActionTooSoon": () => "Must wait 24 hours between transactions",
  "InsufficientAmount": () => "Amount too small (min 1 fUSD or 0.0001 ETH)",
  "OracleUnhealthy": () => "Price feed unavailable, try again later",
  "PriceMoveTooBig": () => "Price moved too much, please refresh quote",
  "Paused": () => "System temporarily paused",
  "InsufficientBalance": () => "Insufficient fUSD balance",
  "InsufficientEth": () => "Insufficient ETH balance"
};

function handleError(error) {
  for (const [key, handler] of Object.entries(ERROR_HANDLERS)) {
    if (error.message.includes(key)) {
      return handler();
    }
  }
  return "Transaction failed: " + error.message;
}
```

### Retry Strategies

```javascript
async function withRetry(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (error.message.includes("PriceMoveTooBig") && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      throw error;
    }
  }
}

// Usage
await withRetry(() => mintFUSD(amount));
```

## Testing & Validation

### Get Testnet ETH
- [Fluent Testnet Faucet](https://testnet.gblend.xyz/)
- Minimum 0.01 ETH recommended for testing

### Integration Testing

```javascript
describe('fUSD Integration', () => {
  it('should mint and burn fUSD', async () => {
    const integration = new FUSDIntegration(provider, signer);
    
    // Test minting
    const initialBalance = await integration.getFUSDBalance(address);
    await integration.mintFUSD(0.001);
    const afterMint = await integration.getFUSDBalance(address);
    expect(Number(afterMint)).toBeGreaterThan(Number(initialBalance));
    
    // Test burning
    await integration.burnFUSD(1);
    const afterBurn = await integration.getFUSDBalance(address);
    expect(Number(afterBurn)).toBeLessThan(Number(afterMint));
  });
});
```

### Transaction Validation

```javascript
// Validate transaction success
function validateTransaction(receipt) {
  if (receipt.status !== 1) {
    throw new Error("Transaction failed");
  }
  
  // Check for expected events
  const mintEvent = receipt.logs.find(log => 
    log.topics[0] === ethers.id("Mint(address,uint256,uint256,uint256)")
  );
  
  if (!mintEvent) {
    throw new Error("No mint event found");
  }
  
  return true;
}
```

## Reference

### Key Functions

```solidity
// DeskController
function mint() external payable;
function burn(uint256 fusdAmount) external;
function getMintQuote(uint256 ethAmount) external view returns (uint256);
function getBurnQuote(uint256 fusdAmount) external view returns (uint256);
function getEthUsd() external view returns (uint256);
function isOracleHealthy() external view returns (bool);

// fUSD Token
function balanceOf(address account) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
```

### Events to Monitor

```solidity
event Mint(address indexed user, uint256 ethIn, uint256 fusdOut, uint256 ethPrice);
event Burn(address indexed user, uint256 fusdIn, uint256 ethOut, uint256 ethPrice);
```

### TypeScript Definitions

```typescript
export interface FUSDContracts {
  fUSD: string;
  deskController: string;
  controllerRegistry: string;
  oracle: string;
}

export interface MintQuote {
  ethAmount: string;
  fusdAmount: string;
  ethPrice: string;
  fee?: string;
}

export interface TransactionResult {
  hash: string;
  blockNumber: number;
  gasUsed: string;
  events: Array<{
    event: string;
    args: any[];
  }>;
}
```

### Contract Sources & ABIs

- [GitHub Repository](https://github.com/fluentlabs-xyz/fUSD-multi-controller)
- Full ABIs available in `out/` directory after compilation or on Fluentscan
- Interface definitions in `src/interfaces/`
