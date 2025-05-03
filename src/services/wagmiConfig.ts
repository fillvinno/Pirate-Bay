import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {arbitrum} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: 'Pirate Bay',
  projectId: 'c613d584d82aa937a1226b6b507d3818',
  chains: [arbitrum],
});