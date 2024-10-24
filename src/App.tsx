import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { UIContextProvider } from './contexts/UI';
import { PageContextProvider } from '@contexts/Page';
import { CMSContextProvider } from '@contexts/CMS';

// Components
import Header from './components/Header/Header';
import OffCanvas from '@components/OffCanvas/OffCanvas';
import ModalManager from '@components/ModalManager/ModalManager';
import Footer from '@components/Footer/Footer';
import SiteContainer from '@components/SiteContainer/SiteContainer';

// Config
import navbar from '@config/navbar';

function App() {
  return (
    <Router>
      <UIContextProvider>
        <CMSContextProvider>
          <PageContextProvider>
            <ModalManager />
            <OffCanvas />
              <SiteContainer>
                <Header />
                <Routes>
                  {
                    navbar.map((item, index) => (
                      <Route key={`Route-${index}`} path={item.target} element={item.component} />
                    ))
                  }
                </Routes>
                <Footer />
              </SiteContainer>
            </PageContextProvider>
          </CMSContextProvider>
      </UIContextProvider>
    </Router>
  )
}

export default App
