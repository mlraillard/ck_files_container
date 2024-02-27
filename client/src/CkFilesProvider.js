import React from 'react';
import { MantineProvider } from '@mantine/core';

import App from "./App"
import { useStore } from './store'

// const mode = process.env.mode === "dark" ? "dark" : "light";

export default function CkFilesProvider() {
    const settings = useStore(state => state.settings)
    const mode = settings.darkTheme === "true" ? "dark" : "light";

    return (
        <MantineProvider theme={{
            colorScheme: mode,
          //         colors: {
          //   brand: ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
          // },
          // primaryColor: 'brand', 
          }} withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
    );
  }