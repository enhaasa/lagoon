import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { UIContextProvider } from './contexts/UI';
import { PageContextProvider } from '@contexts/Page';

// Components
import Header from './components/Header/Header';
import OffCanvas from '@components/OffCanvas/OffCanvas';

// Config
import navbar from '@config/navbar';

function App() {
  return (
    <Router>
      <UIContextProvider>
        <PageContextProvider>
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
