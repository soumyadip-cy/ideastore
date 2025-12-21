import { Routes, Route } from 'react-router';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import Navbar from './components/Navbar';
// import { toast } from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme="forest" class="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#042_100%)]">
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