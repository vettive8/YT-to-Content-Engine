
import React, { useState } from 'react';
import { AppLanguage, JobState } from '../types';
import { generateTranscriptionSimulation, generateContentPack } from '../services/geminiService';
import TranscriptDisplay from './TranscriptDisplay';
import ContentPackDisplay from './ContentPackDisplay';

const TranscriptionDashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [diarization, setDiarization] = useState(false);
  const [job, setJob] = useState<JobState | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const newJob: JobState = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      language,
      diarization,
      status: 'processing',
      progress: 0,
    };
    setJob(newJob);

    try {
      // Simulate progress
      const progressSteps = [10, 30, 60, 85];
      for (const p of progressSteps) {
        setJob(prev => prev ? { ...prev, progress: p } : null);
        await new Promise(r => setTimeout(r, 800));
      }

      // Step 1: Transcription
      const transcript = await generateTranscriptionSimulation(url, language, diarization);
      setJob(prev => prev ? { ...prev, progress: 95, result: transcript } : null);

      // Step 2: Content Pack
      const content = await generateContentPack(transcript);
      setJob(prev => prev ? { ...prev, status: 'completed', progress: 100, contentPack: content } : null);
    } catch (err: any) {
      setJob(prev => prev ? { ...prev, status: 'error', error: err.message || 'Unknown error occurred' } : null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">New Transcription Job</h2>
        <p className="text-gray-500 mb-6">Enter a YouTube URL and choose your output preferences.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={job?.status === 'processing'}
              />
            </div>
            
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Language</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                value={language}
                onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                disabled={job?.status === 'processing'}
              >
                <option value="en">English (US/UK)</option>
                <option value="pl">Polish (Polski)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition cursor-pointer"
                checked={diarization}
                onChange={(e) => setDiarization(e.target.checked)}
                disabled={job?.status === 'processing'}
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition font-medium">
                Enable Speaker Diarization (Podcasts)
              </span>
            </label>

            <button
              type="submit"
              disabled={job?.status === 'processing' || !url}
              className={`px-8 py-2 rounded-lg font-bold text-white transition shadow-lg ${
                job?.status === 'processing' || !url
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
              }`}
            >
              {job?.status === 'processing' ? 'Processing...' : 'Start Transcription'}
            </button>
          </div>
        </form>
      </div>

      {job && (
        <div className="space-y-8">
          {job.status === 'processing' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Video Content</h3>
              <p className="text-gray-500 mb-6">We're downloading audio and running ASR pipeline. This may take a moment...</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm font-medium text-indigo-600">{job.progress}% complete</p>
            </div>
          )}

          {job.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
              <h3 className="text-lg font-bold mb-1">Job Failed</h3>
              <p>{job.error}</p>
              <button 
                onClick={() => setJob(null)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {job.status === 'completed' && job.result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow space-y-8">
                  <TranscriptDisplay result={job.result} />
                  {job.contentPack && <ContentPackDisplay pack={job.contentPack} language={job.language} />}
                </div>
                
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                    <h3 className="font-bold text-gray-900 mb-4">Job Info</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-gray-500 block">ID</span>
                        <span className="font-mono text-xs">{job.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Language</span>
                        <span className="capitalize">{job.language === 'en' ? 'English' : 'Polish'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Diarization</span>
                        <span>{job.diarization ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => window.location.reload()}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
                        >
                          Clear Results
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranscriptionDashboard;
