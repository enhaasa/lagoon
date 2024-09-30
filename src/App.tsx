import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { UIContextProvider } from './contexts/UI';
import { PageContextProvider } from '@contexts/Page';

// Components
import Header from './components/Header/Header';
import OffCanvas from '@components/OffCanvas/OffCanvas';
import ModalManager from '@components/ModalManager/ModalManager';

// Config
import navbar from '@config/navbar';

function App() {
  return (
    <Router>
      <UIContextProvider>
        <PageContextProvider>
          <ModalManager />
          <OffCanvas />
          <Header />
          <Routes>
            {
              navbar.map((item, index) => (
                <Route key={`Route-${index}`} path={item.target} element={item.component} />
              ))
            }
          </Routes>
          </PageContextProvider>
      </UIContextProvider>
    </Router>
  )
}

export default App
