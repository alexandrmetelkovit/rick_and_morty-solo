import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header, PageContent } from './components';
import { CharacterPage, CharactersList } from './pages';

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
