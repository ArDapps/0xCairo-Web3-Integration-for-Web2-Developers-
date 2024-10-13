"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { qTestnet } from "@reown/appkit/networks";

import { opBNBTestnet } from "@reown/appkit/networks";
// 1. Get projectId at https://cloud.reown.com
const projectId = "6a70086d144b292fbddbdfd667d57d26";

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:3000",
  icons: ["https://avatars.mywebsite.com/"],
};

export const ethersAdapter = new EthersAdapter();

//momken tegeb error
const sepoliaNet = {
  chainId: 11155111,
  name: "sepoliaNet",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/a338ecde471748a9a7bdddc5537fdafb",
};
//##################################################################################

// 3. Create the AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  metadata,
  networks: [mainnet, sepolia, qTestnet, opBNBTestnet, sepoliaNet],
  projectId,
  features: {
    analytics: true,
  },
});

export function AppKit({ children }) {
  return <>{children}</>;
}
