import { useContract, useNFTs } from "@thirdweb-dev/react";
import { DONATION_ADDRESS } from "../const/addresses";
import Link from "next/link";
import {
  Text,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import NFT from "../components/NFT";

export default function Donate() {
  const { contract } = useContract(DONATION_ADDRESS);
  const { data: nfts } = useNFTs(contract);

  return (
    <Container maxW={"1200PX"}>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </Flex>

      <Heading mt={"40px"}> Donate </Heading>
      <Text>
        Explore our selection of NFTs, each representing a tool for sustainable
        development.When you buy an NFT, a portion of the proceeds is directed
        to NGOs and organizations actively working to implement these tools in
        real-life projects. Your support directly contributes to the
        installation of trees, renewable energy infrastructure, clean water
        solutions, and more in communities in need.
      </Text>
      {!nfts ? (
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <SimpleGrid columns={3} spacing={10}>
          {nfts?.map((nftItem) => (
            <NFT key={nftItem.metadata.id} nft={nftItem} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
