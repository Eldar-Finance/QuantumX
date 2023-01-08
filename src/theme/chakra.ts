import {
  extendTheme,
  type ThemeComponents,
  type ThemeConfig
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const breakpoints = {
  xs: "0px",
  sm: "320px",
  movil: "375px",
  tablet: "520px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "1.5xl": "1400px",
  "2xl": "1600px",
  "3xl": "2000px",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const components: ThemeComponents = {
  Button: {
    variants: {
      solid: {
        bg: "main",
        color: "black.dark",
        borderRadius: "md",
        fontWeight: "500",
        fontSize: "inherit",
        fontFamily: "inherit",
        _hover: {
          bg: "main",
          opacity: "0.8",
          color:"black.dark"
        },
        _active: {
          bg: "main",
          opacity: "0.8",
        
        },
      },
      outline: {
        color:"main",
        _hover: {
          bg: "main",
          color:"black.dark"
        },
        _active: {
          bg: "main",
          color:"black.dark"
        },
      },
    },
    baseStyle: {
      fontWeight: "400",
      fontSize: "sm",
      borderRadius: "lg",
      px: "30px",
      height: "auto",
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 600,
      fontFamily: "inherit",
    },
    sizes: {
      xl: {
        fontSize: "2xl",
      },
    },
  },
 
};

const borderRadius = {
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "8px",
    md: "12px",
    lg: "15px",
    xl: "20px",
    "2xl": "30px",
    "3xl": "38px",
    "4xl": "46px",
    "5xl": "54px",
    "6xl": "62px",
    "7xl": "70px",
    full: "9999px",
  },
};

const fontSizes = {
  xs: "10px",
  sm: "12px",
  lsm:"14px",
  md: "16px",
  lg: "20px",
  xl: "22px",
  "2xl": "24px",
  "3xl": "34px",
  "4xl": "40px",
  "5xl": "44px",
  "6xl": "50px",
  "7xl": "60px",
  "8xl": "80px",
  "9xl": "100px",
};

const customTheme = extendTheme({
  config,
  components,
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        minHeight: "100vh",
        overflowX: "hidden",
        bg: mode("black.base", "black.base")(props),
        bgSize: "700px",
        backgroundPositionX: "150px",
        color: mode("white.light", "white.light")(props),
        fontSize: "md",
      },
      "*": {
        "&::-webkit-scrollbar": {
          width: 1.5,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: mode("light.baseLight", "dark.baseDark")(props),
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: mode("black.light", "white.light")(props),
          borderRadius: "15px",
        },
        "*::placeholder": {
          color: "#747A84",
        },
        scrollbarWidth: "auto",
        scrollbarColor: "light.baseLight dark.baseDark",
      },
    }),
  },

  colors: {
    black: {
      light: "#242526",
      base: "#151515",
      baseDark: "#1E1E1E",
      dark: "#000000",
      50: "rgba(0, 0, 0, 0.05)",
      100: "rgba(0, 0, 0, 0.1)",
      200: "rgba(0, 0, 0, 0.2)",
      300: "rgba(0, 0, 0, 0.3)",
      400: "rgba(0, 0, 0, 0.4)",
      500: "rgba(0, 0, 0, 0.5)",
      600: "rgba(0, 0, 0, 0.6)",
    },
  
    white: {
      light: "#fff",
      base: "#",
      dark: "#",
      50: "rgba(255, 255, 255, 0.05)",
      100: "rgba(255, 255, 255, 0.1)",
      200: "rgba(255, 255, 255, 0.2)",
      300: "rgba(255, 255, 255, 0.3)",
      400: "rgba(255, 255, 255, 0.4)",
      500: "rgba(255, 255, 255, 0.5)",
      600: "rgba(255, 255, 255, 0.6)",
    },
    
    secondary:"#232526",
    main: "#22F7DD",
    danger: "#A04C4C",
  },

  breakpoints,
  ...borderRadius,
  fontSizes,
});

export default customTheme;
