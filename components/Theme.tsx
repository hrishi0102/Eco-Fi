import { Container, Flex, Heading, Link } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define light and dark theme configurations
const lightThemeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const darkThemeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme with both light and dark themes
const theme = extendTheme({
  config: lightThemeConfig,
  styles: {
    global: {
      // Global styles for light and dark themes
    },
  },
  // Other theme customizations
});

export { lightThemeConfig, darkThemeConfig };
export default theme;
