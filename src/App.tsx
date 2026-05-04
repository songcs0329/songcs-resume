import { BrowserRouter, Route, Routes } from 'react-router';
import FloatingRouteNav from '@/components/FloatingRouteNav';
import CoverLetter from '@/pages/CoverLetter';
import NotFound from '@/pages/NotFound';
import Resume from '@/pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingRouteNav />
    </BrowserRouter>
  );
}

export default App;
