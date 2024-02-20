import {
  MediaRenderer,
  Web3Button,
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

interface StakedProps {
  tokenId: number;
}

export const Staked = (props: StakedProps) => {
  const address = useAddress();
  const { contract: donationContract } = useContract(DONATION_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: nft } = useNFT(donationContract, props.tokenId);

  const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [props.tokenId, address]
  );

  return (
    <Box>
      {nft && (
        <Card className={styles.stakecontainer} p={5}>
          <Flex>
            <Box>
              <MediaRenderer
                src={nft.metadata.image}
                height="80%"
                width="80%"
              />
            </Box>
            <Stack spacing={1}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {nft.metadata.name}
              </Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Staked: {ethers.utils.formatUnits(claimableRewards[0], 0)}
              </Text>
              <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) =>
                  contract.call("withdraw", [props.tokenId, 1])
                }
                className={styles.unstakebutton}
              >
                Unstake
              </Web3Button>
            </Stack>
          </Flex>
          <Box mt={5}>
            <Text>Claimable $ECO: </Text>
            <Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={(contract) =>
                contract.call("claimRewards", [props.tokenId])
              }
            >
              {" "}
              Claim $ECO{" "}
            </Web3Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};
