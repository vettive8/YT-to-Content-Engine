
import React from 'react';
import TranscriptionDashboard from './components/TranscriptionDashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Transcribe<span className="text-indigo-600">Pro</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Dashboard</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">History</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Powered by</p>
                <p className="text-sm font-bold text-gray-900">Gemini 3 Pro</p>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Turn YouTube Podcasts into <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              High-Value Content Packs
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
            Professional transcription with speaker diarization for English and Polish. 
            Generate blogs, LinkedIn posts, and Twitter threads in seconds.
          </p>
        </div>

        <TranscriptionDashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© 2024 TranscribePro Engine. Built for power users and content creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
