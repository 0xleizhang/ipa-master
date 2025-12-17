import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { assessPronunciation } from '../services/geminiService';
import { IPASymbol, AssessmentResult } from '../types';

interface PronunciationTesterProps {
  symbol: IPASymbol;
  apiKey: string;
}

const PronunciationTester: React.FC<PronunciationTesterProps> = ({ symbol, apiKey }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!apiKey) {
        setError('Please configure your Gemini API Key in the settings (top right) to use this feature.');
        return;
    }

    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleAnalysis(audioBlob);
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setError('Could not access microphone. Please allow permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAnalysis = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    try {
      // Convert Blob to Base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Remove "data:audio/webm;base64," prefix
        const base64Data = base64String.split(',')[1];
        
        const assessment = await assessPronunciation(
          base64Data, 
          symbol.symbol, 
          symbol.exampleWord,
          apiKey
        );
        setResult(assessment);
        setIsAnalyzing(false);
      };
    } catch (err) {
      console.error(err);
      setError('Failed to process audio.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Mic size={20} className="text-indigo-600" />
        AI Pronunciation Check
      </h3>
      
      <p className="text-slate-600 mb-4 text-sm">
        Click record and say the word <strong className="text-indigo-700">"{symbol.exampleWord}"</strong>. 
        Focus on the <span className="font-serif font-bold bg-white px-2 py-0.5 rounded border border-slate-200">/{symbol.symbol}/</span> sound.
      </p>

      {!apiKey && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2 text-sm text-yellow-800">
            <Settings size={16} className="mt-0.5 shrink-0" />
            <p>API Key is missing. Click the settings icon in the main menu to add your Gemini API Key.</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isAnalyzing}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              isAnalyzing 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Mic size={20} />
                Start Recording
              </>
            )}
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse"
          >
            <Square size={20} fill="currentColor" />
            Stop Recording
          </button>
        )}

        {error && (
            <div className="text-red-500 text-sm flex items-center gap-1 mt-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}

        {result && (
          <div className={`w-full mt-4 p-4 rounded-lg border ${result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-2xl font-bold ${result.isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                {result.score}/100
              </span>
              {result.isCorrect ? (
                <div className="flex items-center gap-1 text-green-700 text-sm font-bold uppercase">
                  <CheckCircle2 size={18} /> Excellent
                </div>
              ) : (
                <div className="flex items-center gap-1 text-orange-700 text-sm font-bold uppercase">
                   Needs Improvement
                </div>
              )}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-semibold">Feedback:</span> {result.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PronunciationTester;
