import {
  MediaRenderer,
  Web3Button,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { ANGEL_ADDRESS } from "../const/addresses";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";

export function ClaimAngel() {
  const { contract } = useContract(ANGEL_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);

  return (
    <Container maxW={"1200px"}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"50vh"}
      >
        <Heading>Join Eco-Fi to Donate</Heading>
        <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
          <MediaRenderer src={metadata?.image} height="300px" width="300px" />
        </Box>
        <Web3Button
          contractAddress={ANGEL_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Become a Member
        </Web3Button>
      </Flex>
    </Container>
  );
}
