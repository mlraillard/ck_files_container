import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

//ReactDOM.render(<App/>, document.getElementById("root"));

const mode = process.env.mode === "dark" ? "dark" : "light";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme={ mode }>
      <App />
    </MantineProvider>
  </React.StrictMode>
);