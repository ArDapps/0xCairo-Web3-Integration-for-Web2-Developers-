'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks'

// 1. Get projectId at https://cloud.reown.com
const projectId = '911dd5c62b0c852a3ec5b2f35f6c195c'

// 2. Create a metadata object
const metadata = {
  name: '0x cairo',
  description: 'integration between web2 and web3',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}
const sepoliaNet = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.infura.io/v3/a338ecde471748a9a7bdddc5537fdafb",
};
// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, sepoliaNet],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit({children}) {
  return (
    children  // Ensure you have configured the <w3m-button> inside
  )
}
