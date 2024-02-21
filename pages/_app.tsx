import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import NavBar from "../components/NavBar";
import theme from "../components/theme";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={PolygonZkevmTestnet}
    >
      <ChakraProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
