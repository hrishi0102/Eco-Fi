import {
  MediaRenderer,
  NFT,
  Web3Button,
  useActiveClaimCondition,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { STAKING_ADDRESS, DONATION_ADDRESS } from "../const/addresses";
import Link from "next/link";
import {
  Text,
  Box,
  Button,
  Card,
  SimpleGrid,
  Stack,
  Flex,
} from "@chakra-ui/react";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract } = useContract(DONATION_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(
    contract,
    nft.metadata.id
  );

  return (
    <Card key={nft.metadata.id} overflow={"hidden"}>
      <MediaRenderer src={nft.metadata.image} height="100%" width="100%" />
      <Text fontSize={"2xl"} fontWeight={"bold"} my={5} textAlign={"center"}>
        {" "}
        {nft.metadata.name}
      </Text>
      <Text fontSize={"medium"} my={5} textAlign={"center"}>
        {" "}
        {nft.metadata.description}
      </Text>
      {!isLoading && data ? (
        <Text textAlign={"center"} my={5}>
          Cost : {ethers.utils.formatEther(data?.price)}
          {" " + data?.currencyMetadata.symbol}
        </Text>
      ) : (
        <Text>Loading...</Text>
      )}
      <Web3Button
        contractAddress={DONATION_ADDRESS}
        action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
      >
        Donate
      </Web3Button>
    </Card>
  );
}
