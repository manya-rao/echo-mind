import { useState } from 'react';
import { Brain, Sparkles, History, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import type { AnalysisResult } from '../App';

interface HomePageProps {
  onGenerateVisualization: (text: string) => void;
  history: AnalysisResult[];
  onLoadFromHistory: (result: AnalysisResult) => void;
}

export function HomePage({ onGenerateVisualization, history, onLoadFromHistory }: HomePageProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onGenerateVisualization(text);
    }
  };

  // Real-time preview stats
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const charCount = text.length;
  const estimatedTime = Math.max(1, Math.ceil(wordCount / 50));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="neuron-particle neuron-particle-1"></div>
        <div className="neuron-particle neuron-particle-2"></div>
        <div className="neuron-particle neuron-particle-3"></div>
        <div className="neuron-particle neuron-particle-4"></div>
        <div className="neuron-particle neuron-particle-5"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Input Column */}
            <div className="lg:col-span-2">
              {/* Logo and Header */}
              <div className="text-center mb-8 md:mb-12 animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="relative">
                    <Brain className="w-12 h-12 md:w-16 md:h-16 text-purple-400 animate-glow" />
                    <div className="absolute inset-0 bg-purple-500/50 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    EchoMind
                  </h1>
                </div>
                <p className="text-purple-300/80 text-base md:text-lg max-w-2xl mx-auto">
                  AI Thought-to-Visualization Engine
                </p>
                <p className="text-purple-400/60 mt-2 text-sm md:text-base">
                  Transform your thoughts into neural semantic patterns
                </p>
              </div>

              {/* Main Input Card */}
              <div className="glass-card rounded-3xl p-6 md:p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10 animate-slide-up">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-purple-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Enter your thoughts
                    </label>
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type anything... your ideas, dreams, or musings. Watch as we transform your words into a living neural network..."
                      className="min-h-[200px] bg-slate-900/50 border-purple-500/30 text-purple-100 placeholder:text-purple-400/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none rounded-2xl"
                    />
                  </div>

                  {/* Real-time Stats */}
                  {text && (
                    <div className="flex flex-wrap gap-3 text-sm">
                      <Badge variant="outline" className="bg-purple-900/30 border-purple-500/30 text-purple-300">
                        {wordCount} words
                      </Badge>
                      <Badge variant="outline" className="bg-blue-900/30 border-blue-500/30 text-blue-300">
                        {charCount} characters
                      </Badge>
                      <Badge variant="outline" className="bg-pink-900/30 border-pink-500/30 text-pink-300">
                        ~{estimatedTime}s to analyze
                      </Badge>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!text.trim()}
                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-2xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Brain className="w-5 h-5 group-hover:animate-pulse" />
                      Generate Visualization
                    </span>
                  </Button>
                </form>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {['Neural Mapping', 'Sentiment Analysis', 'Topic Detection', 'Real-time Stats', 'Multiple Themes', 'Export Options'].map((feature, i) => (
                  <div
                    key={feature}
                    className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* History & Stats Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent History */}
              {history.length > 0 && (
                <Card className="glass-card border-purple-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <History className="w-5 h-5 text-purple-400" />
                    <h3 className="text-purple-300">Recent Analyses</h3>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {history.slice(0, 5).map((item, i) => (
                      <button
                        key={i}
                        onClick={() => onLoadFromHistory(item)}
                        className="w-full text-left p-3 rounded-xl bg-slate-900/50 border border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-900/70 transition-all group"
                      >
                        <p className="text-purple-200 text-sm line-clamp-2 mb-2">
                          {item.text}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs ${
                            item.sentiment === 'positive' ? 'bg-green-900/30 text-green-300 border-green-500/30' :
                            item.sentiment === 'negative' ? 'bg-red-900/30 text-red-300 border-red-500/30' :
                            'bg-blue-900/30 text-blue-300 border-blue-500/30'
                          }`}>
                            {item.sentiment}
                          </Badge>
                          <span className="text-xs text-purple-400">{item.wordCount} words</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Quick Stats Card */}
              <Card className="glass-card border-purple-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h3 className="text-purple-300">Capabilities</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Keyword Extraction</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Sentiment Analysis</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Topic Detection</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Complexity Score</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Readability Index</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Emotional Intensity</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Active</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-purple-400/50 text-sm">
            <p>Powered by advanced neural semantic analysis with 8+ metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}