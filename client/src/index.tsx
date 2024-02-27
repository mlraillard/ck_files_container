import React from 'react';
import ReactDOM from 'react-dom';
import CkFilesProvider from './CkFilesProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//const settings = useStore(state => state.settings)
root.render(
  <React.StrictMode>
    <CkFilesProvider />
  </React.StrictMode>
);