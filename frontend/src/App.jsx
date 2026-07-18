import { Routes, Route } from 'react-router';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import Navbar from './components/Navbar';
// import { toast } from 'react-hot-toast';

const App = () => {
  return (
    // <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    <div data-theme="business" class="min-h-screen absolute inset-0 -z-10 h-full w-full items-center px-5  [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#26f_100%)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App