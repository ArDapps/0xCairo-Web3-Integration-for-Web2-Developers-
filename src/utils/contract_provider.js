import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants/contract_address";
import contract_abi from "./constants/contract_abi";

export const contractProvider = async (signer) => {
  // Check if providerOrSigner is a provider (has getSigner method), otherwise treat it as signer
  const rpc = "https://sepolia.infura.io/v3/2DAWGvVXOCNIC399kGfZ64Wwcpc";

  const provider = new ethers.JsonRpcProvider(rpc);

  // Create the contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract_abi,
    signer ? signer : provider
  );

  console.log(contract, "contract instance");

  try {
    // Attempt to fetch the data from the contract
  
    return { contract }; // Return the contract and data
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return { error: error.message }; // Return the error message
  }
};
