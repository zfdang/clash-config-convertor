import React from 'react';
import Header from './components/Header';
import Converter from './components/Converter';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Header />
        <main>
          <Converter />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
