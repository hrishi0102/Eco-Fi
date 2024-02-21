import { Container, Flex, Heading, Link, Button, Box, IconButton, Image} from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1500px"} py={4}>
      <Flex direction={"row"} justifyContent={"space-between"}  textAlign="center">
      <Box mb={2}>
      <Image h={2}
       borderRadius="full"
       src="../images/logo.png" h={90} mb={2}/>
      </Box>
        <Flex  alignItems="center">
        <Button as="a" href={"/"} variant="ghost" mr={2} ml={2}>
            Stake
          </Button>
          <Button as="a" href={"/donate"} variant="ghost" mr={2} >
            Donate
          </Button>
          <IconButton ml={2}
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} // Use MoonIcon for light mode and SunIcon for dark mode
            onClick={toggleColorMode}
          />
        </Flex>
        <ConnectWallet />
      </Flex>
    </Container>
  );
};

export default NavBar;
