import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CharacterPage, CharactersList } from '@/pages';
import { Footer, Header, PageContent } from '@/shared/components';

import './App.css';

function App() {
  const textFooter = 'Made with love AlexanderMetelkov';

  return (
    <>
      <Header />

      <PageContent>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<CharactersList />}
            />
            <Route
              path='character/:id'
              element={<CharacterPage />}
            />
          </Routes>
        </BrowserRouter>
      </PageContent>

      <Toaster position='bottom-right' />

      <Footer text={textFooter} />
    </>
  );
}

export default App;
