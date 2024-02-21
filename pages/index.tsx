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
  Skeleton,
} from "@chakra-ui/react";
import {
  ANGEL_ADDRESS,
  DONATION_ADDRESS,
  STAKING_ADDRESS,
  WELLCOIN_ADDRESS,
} from "../const/addresses";
import { ClaimAngel } from "../components/ClaimAngel";
import { Donated } from "../components/Donated";
import { Staked } from "../components/Staked";
import { BigNumber, ethers } from "ethers";

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
        <Flex direction={"column"} h={"100vh"} justifyContent={"flex-start"} alignItems={"center"} paddingTop={"20vh"}>
          <Heading as="h1" size="2xl" textAlign="center" mb={4}>
            Welcome to Eco-Fi
          </Heading>
          <Text mt={4} mb={8} fontSize="xl" fontWeight="semibold" lineHeight="short" textAlign="center">
            Mint your NFT for free and explore our shop filled with NFTs representing real-world objects aligned with UN Sustainable Development Goals. Every purchase contributes to positive impact projects. Stake your NFTs to earn ERC-20 rewards and increase your impact score!
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
      <SimpleGrid columns={2} spacing={10}>
        <Card p={5}>
          <SimpleGrid columns={2} spacing={10}>
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
              <Text fontSize={"medium"} fontWeight={"bold"}>
                $ECO Balance:{" "}
              </Text>
              {rewardBalance && (
                <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
              )}
            </Box>
          </SimpleGrid>
        </Card>
        <Card p={5}>
          <Heading> Donations :</Heading>
          <Skeleton isLoaded={!loadingOwnedDonations}>
            <Donated nft={ownedDonations} />
          </Skeleton>
        </Card>
      </SimpleGrid>
      <Card p={5} my={10}>
        <Heading mb={"30px"}>Staked Donations: </Heading>
        <SimpleGrid columns={3} spacing={10}>
          {stakedDonations &&
            stakedDonations[0].map((nft: BigNumber) => (
              <Staked key={nft.toNumber()} tokenId={nft.toNumber()} />
            ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default Home;
