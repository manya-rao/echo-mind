import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { EnhancedVisualizationPage as VisualizationPage } from './components/EnhancedVisualizationPage';
import { NeuronLoader } from './components/NeuronLoader';

export interface AnalysisResult {
  neurons: number;
  connections: number;
  sentiment: string;
  keywords: string[];
  text: string;
  complexity: number;
  readability: number;
  topics: string[];
  wordCount: number;
  avgWordLength: number;
  uniqueWords: number;
  emotionalIntensity: number;
}

export type VisualizationMode = 'force' | 'circular' | 'grid' | 'constellation';
export type ColorTheme = 'neural' | 'ocean' | 'sunset' | 'forest' | 'cosmic';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'visualization'>('home');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  const handleGenerateVisualization = async (text: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Process text using our enhanced NLP engine
    const result = await processText(text);
    
    setAnalysisResult(result);
    setHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10
    setIsLoading(false);
    setCurrentPage('visualization');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleRegenerate = async () => {
    if (analysisResult) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Regenerate with different random values
      const result = await processText(analysisResult.text);
      setAnalysisResult(result);
      setIsLoading(false);
    }
  };

  const handleLoadFromHistory = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentPage('visualization');
  };

  if (isLoading) {
    return <NeuronLoader />;
  }

  return (
    <>
      {currentPage === 'home' && (
        <HomePage 
          onGenerateVisualization={handleGenerateVisualization}
          history={history}
          onLoadFromHistory={handleLoadFromHistory}
        />
      )}
      {currentPage === 'visualization' && analysisResult && (
        <VisualizationPage
          result={analysisResult}
          onBackToHome={handleBackToHome}
          onRegenerate={handleRegenerate}
        />
      )}
    </>
  );
}

// Enhanced NLP Processing Engine
async function processText(text: string): Promise<AnalysisResult> {
  // Extract keywords
  const keywords = extractKeywords(text);
  
  // Determine sentiment
  const sentiment = analyzeSentiment(text);
  
  // Generate neuron and connection counts
  const neurons = Math.floor(Math.random() * 51) + 20; // 20-70
  const connections = Math.floor(Math.random() * 131) + 70; // 70-200
  
  // Calculate complexity score (0-100)
  const complexity = calculateComplexity(text);
  
  // Calculate readability (0-100, higher = easier to read)
  const readability = calculateReadability(text);
  
  // Extract topics
  const topics = extractTopics(text, keywords);
  
  // Word statistics
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / wordCount || 0;
  const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
  
  // Emotional intensity (0-100)
  const emotionalIntensity = calculateEmotionalIntensity(text);
  
  return {
    neurons,
    connections,
    sentiment,
    keywords,
    text,
    complexity: Math.round(complexity),
    readability: Math.round(readability),
    topics,
    wordCount,
    avgWordLength: Math.round(avgWordLength * 10) / 10,
    uniqueWords,
    emotionalIntensity: Math.round(emotionalIntensity)
  };
}

// Calculate text complexity based on various factors
function calculateComplexity(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Average word length
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length || 0;
  
  // Average sentence length
  const avgSentenceLength = words.length / sentences.length || 0;
  
  // Unique word ratio
  const uniqueRatio = new Set(words.map(w => w.toLowerCase())).size / words.length || 0;
  
  // Complexity score (normalized to 0-100)
  const complexity = (
    (Math.min(avgWordLength, 12) / 12) * 30 +
    (Math.min(avgSentenceLength, 30) / 30) * 40 +
    uniqueRatio * 30
  );
  
  return complexity;
}

// Calculate readability score
function calculateReadability(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (words.length === 0 || sentences.length === 0) return 50;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  
  // Simple readability formula (inverted complexity)
  // Shorter sentences and words = higher readability
  const readability = 100 - (
    (Math.min(avgWordsPerSentence, 30) / 30) * 50 +
    (Math.min(avgWordLength, 12) / 12) * 50
  );
  
  return Math.max(0, Math.min(100, readability));
}

// Extract main topics from text
function extractTopics(text: string, keywords: string[]): string[] {
  const topics: string[] = [];
  
  // Topic categories with keywords
  const topicMap: Record<string, string[]> = {
    'Technology': ['technology', 'software', 'computer', 'digital', 'innovation', 'data', 'algorithm', 'system'],
    'Business': ['business', 'company', 'market', 'sales', 'customer', 'revenue', 'growth', 'strategy'],
    'Science': ['research', 'study', 'analysis', 'science', 'experiment', 'theory', 'hypothesis', 'discovery'],
    'Health': ['health', 'medical', 'wellness', 'fitness', 'exercise', 'nutrition', 'mental', 'physical'],
    'Education': ['learning', 'education', 'student', 'teaching', 'knowledge', 'school', 'university', 'course'],
    'Creative': ['creative', 'design', 'artistic', 'writing', 'music', 'visual', 'imagination', 'expression'],
    'Social': ['social', 'people', 'community', 'relationship', 'communication', 'interaction', 'society'],
    'Emotional': ['feel', 'emotion', 'happy', 'sad', 'love', 'hate', 'joy', 'anger', 'fear', 'hope']
  };
  
  const lowerText = text.toLowerCase();
  
  for (const [topic, topicKeywords] of Object.entries(topicMap)) {
    const matchCount = topicKeywords.filter(kw => 
      lowerText.includes(kw) || keywords.some(k => k.includes(kw))
    ).length;
    
    if (matchCount >= 2) {
      topics.push(topic);
    }
  }
  
  return topics.length > 0 ? topics : ['General'];
}

// Calculate emotional intensity
function calculateEmotionalIntensity(text: string): number {
  const lowerText = text.toLowerCase();
  
  const strongEmotionalWords = [
    'love', 'hate', 'amazing', 'terrible', 'wonderful', 'awful',
    'fantastic', 'horrible', 'incredible', 'devastating', 'brilliant',
    'catastrophic', 'phenomenal', 'disastrous', 'magnificent', 'dreadful',
    'excellent', 'atrocious', 'outstanding', 'appalling', 'superb', 'abysmal'
  ];
  
  const exclamationCount = (text.match(/!/g) || []).length;
  const capsWords = (text.match(/\b[A-Z]{2,}\b/g) || []).length;
  
  let intensity = 0;
  
  // Check for strong emotional words
  strongEmotionalWords.forEach(word => {
    if (lowerText.includes(word)) intensity += 10;
  });
  
  // Add intensity for exclamation marks
  intensity += exclamationCount * 5;
  
  // Add intensity for caps
  intensity += capsWords * 8;
  
  return Math.min(100, intensity);
}

// Simple keyword extraction
function extractKeywords(text: string): string[] {
  // Common stop words to filter out
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
    'when', 'where', 'why', 'how', 'from', 'by', 'as', 'into', 'through'
  ]);
  
  // Clean and tokenize
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Count word frequency
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });
  
  // Get top keywords
  const sortedKeywords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
  
  return sortedKeywords.length > 0 ? sortedKeywords : ['text', 'analysis', 'processing'];
}

// Simple sentiment analysis
function analyzeSentiment(text: string): string {
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
    'happy', 'joy', 'love', 'beautiful', 'best', 'brilliant', 'awesome',
    'positive', 'perfect', 'success', 'win', 'victory', 'benefit', 'advantage'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'sad',
    'angry', 'negative', 'poor', 'fail', 'failure', 'loss', 'problem',
    'issue', 'wrong', 'difficult', 'hard', 'pain', 'suffer'
  ];
  
  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) positiveScore += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) negativeScore += matches.length;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
}