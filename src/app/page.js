import BlockchainData from "@/components/BlockchainData";
import WalletConnectCard from "@/components/WallectConnectCard";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-10 flex  flex-col justify-center items-center">
        <WalletConnectCard />
        <BlockchainData />
      </div>
    </>
  );
}
