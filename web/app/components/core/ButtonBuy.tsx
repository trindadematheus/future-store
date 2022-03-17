import { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "remix";

import { smartChainWallet } from "~/constants/wallets";
import { MetaMaskLogo } from "./MetaMaskLogo";
import { useWallet } from "~/hooks/use-wallet";

export const productPrice = "0.000072";

interface ButtonBuyProps {
  productId: string;
}

export const ButtonBuy = ({ productId }: ButtonBuyProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account, connectWallet } = useWallet();

  const toast = useToast();
  const navigate = useNavigate();

  function handleConnectBuy() {
    if (account) {
      sendTransaction();
    } else {
      connectWallet();
    }
  }

  async function sendTransaction() {
    if (!account) return;

    const { signer, network } = account;

    if (network.chainId !== 56) {
      toast({
        title: "Error",
        description: "Only smart chain is available for buy",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    const tx = {
      to: smartChainWallet,
      value: ethers.utils.parseEther(productPrice),
    };

    setIsLoading(true);

    try {
      const transaction = await signer.sendTransaction(tx);
      await transaction.wait();

      navigate(`/products/${productId}/success`);
    } catch (err) {
      toast({
        title: "Error",
        description: JSON.stringify(err),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  }

  return (
    <>
      <Button
        w={"full"}
        mt={8}
        size={"lg"}
        py={"7"}
        colorScheme="cyan"
        isLoading={isLoading}
        leftIcon={<MetaMaskLogo width={20} height={20} />}
        onClick={handleConnectBuy}
      >
        {!account ? (
          "Connect wallet to buy"
        ) : (
          <>
            Buy {productPrice} ETH
            <Flex display={{ base: "none", sm: "flex" }} ml="4px">
              (~0,20USD)
            </Flex>
          </>
        )}
      </Button>
    </>
  );
};
