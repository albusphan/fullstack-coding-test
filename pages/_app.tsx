import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "hooks/useAuth";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
