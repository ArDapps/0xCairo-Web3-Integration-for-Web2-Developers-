import { ethers } from "ethers";

import { contractProvider } from "./contract_provider";

/**
 * General function to interact with smart contract functions
 * @param {string} functionName - The name of the contract function to call
 * @param {Array} params - Array of parameters to pass to the contract function
 * @param {Object} providerOrSigner - Provider or Signer to interact with the contract
 * @returns {Object} The data returned by the contract function or an error
 */
export const interactWithContract = async (functionName, params = []) => {
  try {
    const { contract } = await contractProvider();

    // Dynamically call the contract function with parameters
    const result = await contract[functionName](...params);
    console.log(result, "result");

    return { data: result };
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    return { error: error.message };
  }
};
