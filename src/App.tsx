import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { UIContextProvider } from './contexts/UI';
import { PageContextProvider } from '@contexts/Page';

// Components
import Header from './components/Header/Header';
import OffCanvas from '@components/OffCanvas/OffCanvas';

// Pages
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';

function App() {
  return (
    <Router>
      <UIContextProvider>
        <PageContextProvider>
          <OffCanvas />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
          </Routes>
          </PageContextProvider>
      </UIContextProvider>
    </Router>
  )
}

export default App
