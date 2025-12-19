
import React from 'react';
import { TranscriptionResult } from '../types';
import { exportToTXT, exportToSRT, exportToVTT, downloadFile } from '../utils/exportUtils';

interface Props {
  result: TranscriptionResult;
}

const TranscriptDisplay: React.FC<Props> = ({ result }) => {
  const handleDownload = (format: 'txt' | 'srt' | 'vtt' | 'json') => {
    const filename = `${result.title.replace(/\s+/g, '_').toLowerCase()}.${format}`;
    switch (format) {
      case 'txt':
        downloadFile(exportToTXT(result), filename, 'text/plain');
        break;
      case 'srt':
        downloadFile(exportToSRT(result), filename, 'text/plain');
        break;
      case 'vtt':
        downloadFile(exportToVTT(result), filename, 'text/vtt');
        break;
      case 'json':
        downloadFile(JSON.stringify(result, null, 2), filename, 'application/json');
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.fullText);
    alert('Full transcript copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{result.title}</h2>
          <p className="text-sm text-gray-500">Full Transcription Excerpt</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={copyToClipboard}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition border border-gray-200"
          >
            Copy
          </button>
          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />
          <button 
            onClick={() => handleDownload('txt')}
            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-indigo-100"
          >
            TXT
          </button>
          <button 
            onClick={() => handleDownload('srt')}
            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-indigo-100"
          >
            SRT
          </button>
          <button 
            onClick={() => handleDownload('vtt')}
            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-indigo-100"
          >
            VTT
          </button>
          <button 
            onClick={() => handleDownload('json')}
            className="px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-indigo-100"
          >
            JSON
          </button>
        </div>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto space-y-6 bg-gray-50/30">
        {result.segments.map((segment, index) => (
          <div key={index} className="flex gap-4 group">
            <div className="w-24 shrink-0 pt-1">
              <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-indigo-500 transition">
                {segment.start} - {segment.end}
              </span>
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                {segment.speaker}
              </p>
              <p className="text-gray-800 leading-relaxed text-sm">
                {segment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptDisplay;
