import { ethers } from "ethers";
import { contractProvider } from "./contract_provider";

/**
 * General function to interact with contract functions that require ETH and parameters
 * @param {string} functionName - The name of the contract function to call (e.g., "changeData")
 * @param {Array} params - Array of parameters to pass to the contract function (e.g., [newValue])
 * @param {string} ethAmount - The amount of ETH to send with the transaction (in ether)
 * @param {Object} signer - The signer object to sign the transaction
 * @returns {Object} The transaction receipt or an error
 */
export const interactWithContractWithETH = async (
  functionName,
  params = [], // Dynamic params to be passed
  ethAmount = "0", // Default to 0 ETH if not provided
  signer
) => {
  try {
    // Get contract with the signer
    const { contract } = await contractProvider(signer);

    // Convert the ETH amount to wei (required for the transaction)
    const valueInWei = ethers.parseUnits(ethAmount, "ether");

    // Call the contract function dynamically with parameters and ETH
    const tx = await contract[functionName](...params, { value: valueInWei });

    // Wait for the transaction to be mined and return the receipt
    const receipt = await tx.wait();
    return { receipt };
  } catch (error) {
    console.error(
      `Error interacting with contract function "${functionName}":`,
      error
    );
    return { error: error.message };
  }
};
