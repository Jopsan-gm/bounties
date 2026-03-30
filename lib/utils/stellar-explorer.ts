/**
 * Stellar Explorer Integration Utilities
 *
 * Provides URL generation for Stellar explorers to link transactions,
 * accounts, and contracts for transparency and verification.
 */

export type StellarNetwork = "mainnet" | "testnet";
export type ExplorerType = "transaction" | "account" | "contract";

export interface ExplorerConfig {
  name: string;
  baseUrl: string;
  paths: {
    transaction: string;
    account: string;
    contract: string;
  };
}

// Supported Stellar explorers
const EXPLORERS: Record<string, ExplorerConfig> = {
  "stellar.expert": {
    name: "Stellar Expert",
    baseUrl: "https://stellar.expert",
    paths: {
      transaction: "/explorer/public/tx/",
      account: "/explorer/public/account/",
      contract: "/explorer/public/contract/",
    },
  },
  "stellarchain.io": {
    name: "Stellar Chain",
    baseUrl: "https://stellarchain.io",
    paths: {
      transaction: "/tx/",
      account: "/account/",
      contract: "/contract/",
    },
  },
};

// Default network settings
const DEFAULT_NETWORK: StellarNetwork = "mainnet";
const DEFAULT_EXPLORER = "stellar.expert";

/**
 * Returns the configured Stellar network from environment variable.
 * @returns The network type (mainnet or testnet)
 */
export function getStellarNetwork(): StellarNetwork {
  // Use environment variable for network configuration
  const envNetwork = process.env.NEXT_PUBLIC_STELLAR_NETWORK as StellarNetwork;
  return envNetwork === "testnet" ? "testnet" : DEFAULT_NETWORK;
}

/**
 * Gets the appropriate base URL for the given network and explorer
 * @param explorer - The explorer name
 * @param network - The Stellar network
 * @returns The base URL for the explorer
 */
function getExplorerBaseUrl(explorer: string, network: StellarNetwork): string {
  const config = EXPLORERS[explorer] || EXPLORERS[DEFAULT_EXPLORER];

  // Handle different testnet URL patterns for different explorers
  if (network === "testnet") {
    if (explorer === "stellarchain.io") {
      return "https://testnet.stellarchain.io";
    }
  }

  return config.baseUrl;
}

/**
 * Gets the explorer paths adjusted for the network.
 * stellar.expert uses /explorer/testnet/ for testnet instead of /explorer/public/
 */
function getExplorerPaths(
  explorer: string,
  network: StellarNetwork,
): ExplorerConfig["paths"] {
  const config = EXPLORERS[explorer] || EXPLORERS[DEFAULT_EXPLORER];

  if (network === "testnet" && explorer === "stellar.expert") {
    return {
      transaction: "/explorer/testnet/tx/",
      account: "/explorer/testnet/account/",
      contract: "/explorer/testnet/contract/",
    };
  }

  return config.paths;
}

/**
 * Generates a Stellar explorer URL for a transaction
 * @param txHash - The transaction hash
 * @param network - The Stellar network (optional, will be detected if not provided)
 * @param explorer - The explorer to use (optional, defaults to stellar.expert)
 * @returns The full URL to the transaction page
 */
export function getTransactionUrl(
  txHash: string,
  network?: StellarNetwork,
  explorer: string = DEFAULT_EXPLORER,
): string {
  if (!txHash) {
    throw new Error("Transaction hash is required");
  }

  const detectedNetwork = network || getStellarNetwork();
  const paths = getExplorerPaths(explorer, detectedNetwork);
  const baseUrl = getExplorerBaseUrl(explorer, detectedNetwork);

  return `${baseUrl}${paths.transaction}${txHash}`;
}

/**
 * Generates a Stellar explorer URL for an account
 * @param address - The Stellar account address
 * @param network - The Stellar network (optional, will be detected if not provided)
 * @param explorer - The explorer to use (optional, defaults to stellar.expert)
 * @returns The full URL to the account page
 */
export function getAccountUrl(
  address: string,
  network?: StellarNetwork,
  explorer: string = DEFAULT_EXPLORER,
): string {
  if (!address) {
    throw new Error("Account address is required");
  }

  const detectedNetwork = network || getStellarNetwork();
  const paths = getExplorerPaths(explorer, detectedNetwork);
  const baseUrl = getExplorerBaseUrl(explorer, detectedNetwork);

  return `${baseUrl}${paths.account}${address}`;
}

/**
 * Generates a Stellar explorer URL for a contract
 * @param contractId - The Stellar contract ID
 * @param network - The Stellar network (optional, will be detected if not provided)
 * @param explorer - The explorer to use (optional, defaults to stellar.expert)
 * @returns The full URL to the contract page
 */
export function getContractUrl(
  contractId: string,
  network?: StellarNetwork,
  explorer: string = DEFAULT_EXPLORER,
): string {
  if (!contractId) {
    throw new Error("Contract ID is required");
  }

  const detectedNetwork = network || getStellarNetwork();
  const paths = getExplorerPaths(explorer, detectedNetwork);
  const baseUrl = getExplorerBaseUrl(explorer, detectedNetwork);

  return `${baseUrl}${paths.contract}${contractId}`;
}

/**
 * Gets a list of available explorers
 * @returns Array of available explorer names
 */
export function getAvailableExplorers(): string[] {
  return Object.keys(EXPLORERS);
}

/**
 * Gets the configuration for a specific explorer
 * @param explorer - The explorer name
 * @returns The explorer configuration
 */
export function getExplorerConfig(explorer: string): ExplorerConfig | null {
  return EXPLORERS[explorer] || null;
}

/**
 * Validates if a string is a valid Stellar address
 * @param address - The address to validate
 * @returns True if valid, false otherwise
 */
export function isValidStellarAddress(address: string): boolean {
  // Basic validation - Stellar addresses start with 'G' and are 56 characters long
  return /^G[A-Z2-7]{55}$/.test(address);
}

/**
 * Validates if a string is a valid Stellar transaction hash
 * @param hash - The hash to validate
 * @returns True if valid, false otherwise
 */
export function isValidStellarTxHash(hash: string): boolean {
  // Basic validation - Stellar transaction hashes are 64 character hex strings
  return /^[a-f0-9]{64}$/i.test(hash);
}

/**
 * Validates if a string is a valid Stellar contract ID
 * @param contractId - The contract ID to validate
 * @returns True if valid, false otherwise
 */
export function isValidStellarContractId(contractId: string): boolean {
  // Soroban contract IDs start with 'C' and are 56 characters long
  return /^C[A-Z2-7]{55}$/.test(contractId);
}
