import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({

  config: {
    initialColorMode: "dark",
    // useSystemColorMode: true
  },

  colors: {
    gray: {
      "950": "#0f111a",
      "930": "#131621",
      "910": "#1c2136",
      // "900": "#0F0F0F",
      // "850": "#181B23",
      // "800": "#1F2029",
      // "750": "#242426",
      // "700": "#353646",
      // "600": "#4B4D63",
      // "550": "#5A5A5A",
      // "500": "#616480",
      // "400": "#797D9A",
      // "300": "#9699B0",
      // "200": "#B3B5C6",
      // "100": "#D1D2DC",
      // "50": "#EEEEF2",
    },
    grayAlpha: {
      "950": "rgba(15, 17, 26, 0.75)",
      "500": "rgba(33, 36, 51, 0.75)",
      "700": "rgba(33, 36, 51, 0.85)",
    },
    orange: {
      "500": "#FFA200"
    },
    customPink: {
      "500": "#FF3456"
    },
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.100', 'gray.950')(props),
        // color: 'gray.50'
      }
    })
  }
})