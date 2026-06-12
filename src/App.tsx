import { BrowserRouter, Route, Routes } from 'react-router';
import FloatingRouteNav from '@/components/FloatingRouteNav';
import CoverLetter from '@/pages/CoverLetter';
import JobRadar from '@/pages/JobRadar';
import NotFound from '@/pages/NotFound';
import Portfolio from '@/pages/Portfolio';
import Resume from '@/pages/Resume';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/job-radar" element={<JobRadar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingRouteNav />
    </BrowserRouter>
  );
}

export default App;
