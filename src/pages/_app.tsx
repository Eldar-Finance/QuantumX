import "../styles/globals.css";

import { Provider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";

import store from "redux/store";
import customTheme from "theme/chakra";

import { Space_Grotesk } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Space_Grotesk({ subsets: ["latin"] });

const QuantumXApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={customTheme}>
        <style jsx global>{`
          html,
          body {
            font-family: ${inter.style.fontFamily} !important;
          }
        `}</style>
        <MetaHead />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default QuantumXApp;
