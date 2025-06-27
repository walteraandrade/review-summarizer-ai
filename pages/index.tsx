
import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import ResultsDisplay from '../components/ResultsDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import dynamic from 'next/dynamic';

const HistoryPanel = dynamic(() => import('../components/HistoryPanel'), { ssr: false });
import { analyzeTopic } from '../services/geminiService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AnalysisResult } from '../types';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<(AnalysisResult & { query: string }) | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [history, setHistory] = useLocalStorage<string[]>('searchHistory', []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const runAnalysis = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('Please enter a movie or album title.');
      return;
    }
    
    setIsLoading(true);
    setHasSearched(true);
    setError('');
    setResult(null);
    setQuery(topic); // Set query for display purposes
    if(isSidebarOpen) setIsSidebarOpen(false);

    try {
      const analysisResult = await analyzeTopic(topic);
      if (analysisResult && analysisResult.summary) {
        setResult({ ...analysisResult, query: topic });
        if (!history.includes(topic)) {
          setHistory([topic, ...history]);
        }
      } else {
        setError('Failed to get a valid response from the AI. The topic might be obscure or the request could not be fulfilled. Please try again.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [history, setHistory, isSidebarOpen]);

  const handleSearch = () => {
    runAnalysis(query);
  };
  
  const handleHistoryClick = (topic: string) => {
    setQuery(topic); // Set query in input box
    runAnalysis(topic);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <Head>
        <title>Review Summarizer AI</title>
        <meta name="description" content="AI-powered summaries and analysis for movies, music, books, and more." />
      </Head>
      <div className="min-h-screen text-foreground">
        <div className="lg:grid lg:grid-cols-[300px_1fr]">
          <HistoryPanel
            history={history}
            onHistoryClick={handleHistoryClick}
            onClearHistory={handleClearHistory}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex flex-col items-center p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="w-full max-w-3xl mx-auto">
              <Header onMenuClick={() => setIsSidebarOpen(true)} />
              <div className="mt-8">
                <SearchInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </div>
              <div className="mt-8 min-h-[400px] bg-card rounded-lg p-6 shadow-2xl border border-border backdrop-blur-sm">
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center h-full">
                    <LoadingSpinner />
                    <p className="mt-4 text-lg text-muted-foreground">Analyzing reviews...</p>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center h-full text-destructive-foreground">
                    <p className="text-lg text-center">{error}</p>
                  </div>
                ) : hasSearched && result ? (
                  <ResultsDisplay result={result} onInfluenceClick={runAnalysis} />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-lg text-muted-foreground">Enter a title above to see the review summary.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
