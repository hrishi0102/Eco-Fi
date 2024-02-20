import { Container, Flex, Heading, Link } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

const NavBar = () => {
  return (
    <Container maxW={"1200px"} py={4}>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Heading>Eco-Fi</Heading>
        <Flex>
          <Link href={"/"} mx={2}>
            Stake
          </Link>
          <Link href={"/donate"} mx={2}>
            Donate
          </Link>
        </Flex>
        <ConnectWallet />
      </Flex>
    </Container>
  );
};

export default NavBar;
