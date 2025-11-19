import { useEffect } from 'react';
import { ArrowLeft, RefreshCw, Brain, Network, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { AdvancedNeuralNetwork as NeuralNetwork } from './AdvancedNeuralNetwork';
import type { AnalysisResult } from '../App';

interface VisualizationPageProps {
  result: AnalysisResult;
  onBackToHome: () => void;
  onRegenerate: () => void;
}

export function VisualizationPage({ result, onBackToHome, onRegenerate }: VisualizationPageProps) {
  const sentimentColors = {
    positive: 'from-green-500 to-emerald-500',
    negative: 'from-red-500 to-rose-500',
    neutral: 'from-blue-500 to-cyan-500'
  };

  const sentimentIcons = {
    positive: '😊',
    negative: '😔',
    neutral: '😐'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <Button
              onClick={onBackToHome}
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Neural Visualization
              </h1>
            </div>
          </div>
          <Button
            onClick={onRegenerate}
            className="bg-purple-600 hover:bg-purple-500 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-4">
            {/* Neuron Count Card */}
            <Card className="glass-card border-purple-500/20 p-6 animate-slide-in-left">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-purple-400 text-sm mb-1">Neural Nodes</p>
                  <h3 className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {result.neurons}
                  </h3>
                  <p className="text-purple-300/60 text-xs">Active neurons detected</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>

            {/* Connection Count Card */}
            <Card className="glass-card border-blue-500/20 p-6 animate-slide-in-left" style={{ animationDelay: '100ms' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-400 text-sm mb-1">Connections</p>
                  <h3 className="text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {result.connections}
                  </h3>
                  <p className="text-blue-300/60 text-xs">Synaptic links formed</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Network className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            {/* Sentiment Card */}
            <Card className="glass-card border-purple-500/20 p-6 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-purple-400 text-sm mb-1">Sentiment</p>
                  <h3 className={`text-3xl bg-gradient-to-r ${sentimentColors[result.sentiment as keyof typeof sentimentColors]} bg-clip-text text-transparent mb-2 capitalize`}>
                    {result.sentiment} {sentimentIcons[result.sentiment as keyof typeof sentimentIcons]}
                  </h3>
                  <p className="text-purple-300/60 text-xs">Emotional valence</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${sentimentColors[result.sentiment as keyof typeof sentimentColors]} opacity-20 flex items-center justify-center`}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            {/* Keywords Card */}
            <Card className="glass-card border-purple-500/20 p-6 animate-slide-in-left" style={{ animationDelay: '300ms' }}>
              <p className="text-purple-400 text-sm mb-3">Key Concepts</p>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, i) => (
                  <Badge
                    key={i}
                    className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-purple-200 hover:from-purple-600/40 hover:to-blue-600/40 animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Input Text Card - Mobile */}
            <Card className="glass-card border-purple-500/20 p-6 lg:hidden">
              <p className="text-purple-400 text-sm mb-2">Your Input</p>
              <p className="text-purple-200/80 text-sm line-clamp-4">{result.text}</p>
            </Card>
          </div>

          {/* Right Column - Network Visualization */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-purple-500/20 p-4 md:p-6 animate-slide-in-right">
              <div className="mb-4">
                <h2 className="text-xl text-purple-300 mb-1">Neural Network Map</h2>
                <p className="text-purple-400/60 text-sm">Interactive visualization of semantic patterns</p>
              </div>
              
              {/* Network Visualization */}
              <div className="bg-slate-950/50 rounded-2xl border border-purple-500/20 overflow-hidden">
                <NeuralNetwork
                  neuronCount={result.neurons}
                  connectionCount={result.connections}
                  sentiment={result.sentiment}
                />
              </div>

              {/* Input Text Card - Desktop */}
              <Card className="hidden lg:block glass-card border-purple-500/20 p-6 mt-6">
                <p className="text-purple-400 text-sm mb-2">Your Input</p>
                <p className="text-purple-200/80 text-sm">{result.text}</p>
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}