import React from 'react';
import './App.css';

//@shopify/polaris Component
import { Page, AppProvider } from '@shopify/polaris'

//@shopify/polaris StyleSheet
import '@shopify/polaris/styles.css'

//Custom Imports
import { SettingsForm } from './SettingsForm'

function App() {
  return (
    <AppProvider i18n={{}}>
      <Page
        title="Setting"
      >
        <SettingsForm />
      </Page>
    </AppProvider>
  );
}

export default App;
