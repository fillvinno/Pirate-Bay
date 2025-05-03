import MainPage from "./pages/MainPage.tsx";
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "./services/wagmiConfig.ts";

const queryClient = new QueryClient();

function App() {
  return (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <MainPage />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  );
}

export default App