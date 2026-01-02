import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CharacterPage, NotFoundPage } from '@/pages';
import {
  ErrorBoundary,
  Footer,
  Header,
  PageContent
} from '@/shared/components';

import './App.css';
import { CharactersProvider } from './shared/contexts';
import { CharactersPage } from './pages/CharactersPage/CharactersPage';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />

        <PageContent>
          <BrowserRouter basename='/rick_and_morty-solo'>
            <Routes>
              <Route
                path='/'
                element={
                  <CharactersProvider>
                    <CharactersPage />
                  </CharactersProvider>
                }
              />
              <Route
                path='/character/:id'
                element={<CharacterPage />}
              />
              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </Routes>
          </BrowserRouter>
        </PageContent>

        <Toaster position='bottom-right' />

        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default App;
