import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CharacterPage, CharactersList, NotFoundPage } from '@/pages';
import { Footer, Header, PageContent } from '@/shared/components';

import './App.css';

function App() {
  return (
    <>
      <Header />

      <PageContent>
        <BrowserRouter basename='/rick_and_morty-solo'>
          <Routes>
            <Route
              path='/'
              element={<CharactersList />}
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
    </>
  );
}

export default App;
