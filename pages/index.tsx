import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  useContractRead,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import {
  Container,
  Heading,
  Flex,
  Text,
  Spinner,
  SimpleGrid,
  Card,
  Box,
} from "@chakra-ui/react";
import {
  ANGEL_ADDRESS,
  DONATION_ADDRESS,
  STAKING_ADDRESS,
  WELLCOIN_ADDRESS,
} from "../const/addresses";
import { ClaimAngel } from "../components/ClaimAngel";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract: angelContract } = useContract(ANGEL_ADDRESS);
  const { contract: rewardContract } = useContract(WELLCOIN_ADDRESS);
  const { contract: donationContract } = useContract(DONATION_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: ownedAngels, isLoading: loadingOwnedAngels } = useOwnedNFTs(
    angelContract,
    address
  );

  const { data: ownedDonations, isLoading: loadingOwnedDonations } =
    useOwnedNFTs(donationContract, address);

  const { data: stakedDonations } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  if (!address) {
    return (
      <Container>
        <Flex direction={"column"} h={"100vh"} justifyContent={"center"}>
          <Heading my={"40px"}>Eco-Fi</Heading>
          <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
            EcoFI merges DeFi with environmental stewardship, allowing users to
            stake NFTs for ERC-20 rewards, driving tangible sustainability
            through every transaction.
          </Text>
          <ConnectWallet />
        </Flex>
      </Container>
    );
  }

  if (loadingOwnedAngels) {
    <Container maxW={"1200px"}>
      <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Spinner />
      </Flex>
    </Container>;
  }

  if (ownedAngels?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimAngel />
      </Container>
    );
  }

  return (
    <Container maxWidth={"1200px"}>
      <SimpleGrid column={2} spacing={10}>
        <Card>
          <SimpleGrid column={2} spacing={10}>
            <Box>
              {ownedAngels?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer
                    src={nft.metadata.image}
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </Box>
            <Box>
              <Text fontSize={"small"} fontWeight={"bold"}>
                $ECO Balance:{" "}
              </Text>
            </Box>
          </SimpleGrid>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
