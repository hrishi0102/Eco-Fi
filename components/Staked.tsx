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
  Stack, // Import Stack component
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
    <Flex justifyContent="center">
      {nft && (
        <Box className={styles.stakecontainer} p={5} border="2px solid #ccc" borderRadius="lg">
          <Flex flexDirection="column" alignItems="center" textAlign="center">
            <Box>
              <MediaRenderer
                src={nft.metadata.image}
                height="100%"
                width="100%"
              />
              <Text fontSize="2xl" fontWeight="bold">
                {nft.metadata.name}
              </Text>
              <Text fontSize="medium" fontWeight="bold">
                Staked: {ethers.utils.formatUnits(claimableRewards[0], 0)}
              </Text>
            </Box>
            <Box mt={5}>
              <Text fontSize="medium" fontWeight="bold">
                Claimable $ECO:{" "}
              </Text>
              <Text my={"5px"}>
                {ethers.utils.formatUnits(claimableRewards[1], 18)}
              </Text>
              <Stack direction="column" spacing={4}> {/* Use Stack component */}
                <Web3Button
                  contractAddress={STAKING_ADDRESS}
                  action={(contract) =>
                    contract.call("claimRewards", [props.tokenId])
                  }
                >
                  Claim $ECO
                </Web3Button>
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
            </Box>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
