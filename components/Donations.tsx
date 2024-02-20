import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { STAKING_ADDRESS, DONATION_ADDRESS } from "../const/addresses";
import Link from "next/link";
import { Text, Box, Button, Card, SimpleGrid, Stack } from "@chakra-ui/react";

type Props = {
  nft: NFT[] | undefined;
};

export function Donations({ nft }: Props) {
  const address = useAddress();
  const { contract: donationContract } = useContract(DONATION_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  if (nft?.length === 0) {
    return (
      <Box>
        <Text>No Donations made yet.</Text>
        <Link href="/donate">
          <Button>Donate Now!</Button>
        </Link>
      </Box>
    );
  }
  return <SimpleGrid columns={3} spacing={4}></SimpleGrid>;
}
