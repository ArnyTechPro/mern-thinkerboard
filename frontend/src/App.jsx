import { Route, Routes } from 'react-router';
import { toast } from 'react-hot-toast';

import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <AnimatedBackground /> {/* dynamic glow here */}

      <button onClick={() => toast.success('Welcome to ThinkerBoard!')} className="btn btn-primary">Show Welcome Toast</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;