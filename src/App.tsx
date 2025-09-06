import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PageContent } from './components/PageContent/PageContent';
import { CharactersList } from './components/pages/CharacterList/CharacterList';
import { CharacterPage } from './components/pages/CharacterPage/CharacterPage';

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
              path='/character'
              element={<CharacterPage />}
            />
          </Routes>
        </BrowserRouter>
      </PageContent>

      <Footer text={textFooter} />
    </>
  );
}

export default App;
