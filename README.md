# 🏴‍☠️ Pirate Bay — On-Chain Swap Interface

**Pirate Bay** is an on-chain token swap interface built on Arbitrum, powered by the Squid Router (https://www.squidrouter.com/).

---

## 🧭 Key Features
- On-chain swaps via Squid Router (e.g., ETH → USDT)
- Balance and approval checks for ERC-20 tokens
- Wallet integration using RainbowKit and Wagmi
- Reactive state management with Zustand
- Data optimization and caching with TanStack Query

---

## 🛠 Technologies
- React + TypeScript — for the frontend interface
- RainbowKit + Wagmi — for wallet connections
- @0xsquid/sdk — for on-chain swapping
- Zustand — for global state management
- TanStack Query — for caching and data fetching optimization
- Vite — for project bundling

---

## 🔧 Installation and Running

1. Clone the repository
   git clone https://github.com/fillvinno/Pirate-Bay.git
   cd Pirate-Bay

2. Install dependencies
   npm install

3. Get your integratorId from the Squid Dashboard (https://squidrouter.typeform.com/integrator-id)
   Replace the integratorId in squid.ts with your own

4. Run in development mode
   npm run dev

   Open http://localhost:5173 in your browser.

5. Build the project
   npm run build

   The built files will be in the dist/ folder.

---

## 🧪 Usage

- Connect your wallet via RainbowKit (MetaMask, WalletConnect, etc.)
- Select tokens to swap
- Enter the amount to swap
- Click Approve if tokens are not yet approved for the router
- Click Swap to execute the transaction
