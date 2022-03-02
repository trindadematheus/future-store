import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { useToast } from "@chakra-ui/react";

interface WalletProviderProps {
  children: React.ReactNode;
}

interface WalletContextProps {
  account: AccountDetails | null;
  connectWallet(): void;
  disconnectWallet(): void;
}

const WalletContext = createContext<WalletContextProps | null>(null);

interface AccountDetails {
  provider: any;
  address: string;
  signer: ethers.providers.JsonRpcSigner;
  web3Provider: ethers.providers.Web3Provider;
  network: ethers.providers.Network;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  const toast = useToast();

  useEffect(() => {
    const web3Data = new Web3Modal({
      cacheProvider: true,
    });

    setWeb3Modal(web3Data);
  }, []);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  async function connectWallet() {
    const provider = await web3Modal?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const network = await web3Provider.getNetwork();

    setAccount({
      provider,
      web3Provider,
      signer,
      address,
      network,
    });

    toast({
      title: "wallet connected",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  async function disconnectWallet() {
    await web3Modal?.clearCachedProvider();

    if (
      account?.provider?.disconnect &&
      typeof account?.provider.disconnect === "function"
    ) {
      await account.provider.disconnect();
    }

    setAccount(null);

    toast({
      title: "wallet disconnected",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextProps {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
}
