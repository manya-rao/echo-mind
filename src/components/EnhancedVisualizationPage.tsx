import { useState, useRef } from 'react';
import { ArrowLeft, RefreshCw, Brain, Network, Heart, Download, Maximize2, Palette, Grid3x3, Circle, Zap, Sparkles, BookOpen, BarChart3, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { NeuralNetwork } from './NeuralNetwork';
import type { AnalysisResult, VisualizationMode, ColorTheme } from '../App';

interface VisualizationPageProps {
  result: AnalysisResult;
  onBackToHome: () => void;
  onRegenerate: () => void;
}

export function EnhancedVisualizationPage({ result, onBackToHome, onRegenerate }: VisualizationPageProps) {
  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>('force');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('neural');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

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

  const handleExport = () => {
    // Implementation note: This would capture the canvas and download as image
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'echomind-visualization.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const visualizationModes = [
    { id: 'force' as VisualizationMode, icon: Network, label: 'Force-Directed' },
    { id: 'circular' as VisualizationMode, icon: Circle, label: 'Circular' },
    { id: 'grid' as VisualizationMode, icon: Grid3x3, label: 'Grid' },
    { id: 'constellation' as VisualizationMode, icon: Sparkles, label: 'Constellation' },
  ];

  const colorThemes = [
    { id: 'neural' as ColorTheme, label: 'Neural Purple', color: 'bg-purple-500' },
    { id: 'ocean' as ColorTheme, label: 'Ocean Blue', color: 'bg-blue-500' },
    { id: 'sunset' as ColorTheme, label: 'Sunset Orange', color: 'bg-orange-500' },
    { id: 'forest' as ColorTheme, label: 'Forest Green', color: 'bg-green-500' },
    { id: 'cosmic' as ColorTheme, label: 'Cosmic Pink', color: 'bg-pink-500' },
  ];

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
        <div className="p-4 bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20 flex justify-between items-center">
          <h2 className="text-purple-300">Neural Network Visualization</h2>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm" className="text-purple-300 border-purple-500/30">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={toggleFullscreen} variant="outline" size="sm" className="text-purple-300 border-purple-500/30">
              Exit Fullscreen
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <NeuralNetwork
            neuronCount={result.neurons}
            connectionCount={result.connections}
            sentiment={result.sentiment}
            mode={visualizationMode}
            theme={colorTheme}
          />
        </div>
      </div>
    );
  }

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
          <div className="flex gap-2">
            <Button
              onClick={handleExport}
              variant="outline"
              className="bg-purple-900/30 text-purple-300 border-purple-500/30 hover:bg-purple-900/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={onRegenerate}
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Stats */}
          <div className="xl:col-span-1 space-y-4">
            {/* Primary Stats */}
            <Card className="glass-card border-purple-500/20 p-6 animate-slide-in-left">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-purple-400 text-sm mb-1">Neural Nodes</p>
                  <h3 className="text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {result.neurons}
                  </h3>
                </div>
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-400 text-sm mb-1">Connections</p>
                  <h3 className="text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {result.connections}
                  </h3>
                </div>
                <Network className="w-7 h-7 text-blue-400" />
              </div>
            </Card>

            {/* Sentiment Card */}
            <Card className="glass-card border-purple-500/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-purple-400" />
                <p className="text-purple-400 text-sm">Sentiment Analysis</p>
              </div>
              <h3 className={`text-2xl bg-gradient-to-r ${sentimentColors[result.sentiment as keyof typeof sentimentColors]} bg-clip-text text-transparent capitalize mb-2`}>
                {result.sentiment} {sentimentIcons[result.sentiment as keyof typeof sentimentIcons]}
              </h3>
              <div className="flex items-center gap-2 mt-3">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-purple-300">Intensity: {result.emotionalIntensity}%</span>
              </div>
              <Progress value={result.emotionalIntensity} className="mt-2 h-2" />
            </Card>

            {/* Advanced Metrics */}
            <Card className="glass-card border-purple-500/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <h3 className="text-purple-300">Advanced Metrics</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-300">Complexity</span>
                    <span className="text-purple-200">{result.complexity}%</span>
                  </div>
                  <Progress value={result.complexity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-300">Readability</span>
                    <span className="text-purple-200">{result.readability}%</span>
                  </div>
                  <Progress value={result.readability} className="h-2 bg-slate-800" />
                </div>
              </div>
            </Card>

            {/* Word Statistics */}
            <Card className="glass-card border-purple-500/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-green-400" />
                <h3 className="text-purple-300">Word Statistics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-400 text-xs mb-1">Total Words</p>
                  <p className="text-purple-200">{result.wordCount}</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Unique Words</p>
                  <p className="text-purple-200">{result.uniqueWords}</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Avg Length</p>
                  <p className="text-purple-200">{result.avgWordLength}</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Diversity</p>
                  <p className="text-purple-200">{Math.round((result.uniqueWords / result.wordCount) * 100)}%</p>
                </div>
              </div>
            </Card>

            {/* Topics */}
            <Card className="glass-card border-purple-500/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="text-purple-300">Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.topics.map((topic, i) => (
                  <Badge
                    key={i}
                    className="bg-gradient-to-r from-orange-600/30 to-yellow-600/30 border border-orange-500/30 text-orange-200"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Keywords */}
            <Card className="glass-card border-purple-500/20 p-6">
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
          </div>

          {/* Right Column - Visualization */}
          <div className="xl:col-span-3">
            <Card className="glass-card border-purple-500/20 p-4 md:p-6 animate-slide-in-right">
              {/* Controls */}
              <div className="mb-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl text-purple-300 mb-1">Neural Network Map</h2>
                    <p className="text-purple-400/60 text-sm">Interactive visualization of semantic patterns</p>
                  </div>
                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    size="sm"
                    className="bg-purple-900/30 text-purple-300 border-purple-500/30"
                  >
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Fullscreen
                  </Button>
                </div>

                {/* Visualization Mode Selector */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-300">Visualization Mode</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {visualizationModes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setVisualizationMode(mode.id)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          visualizationMode === mode.id
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-900/50 border-purple-500/30 text-purple-300 hover:border-purple-400/50'
                        }`}
                      >
                        <mode.icon className="w-4 h-4 inline mr-2" />
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Theme Selector */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-300">Color Theme</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setColorTheme(theme.id)}
                        className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                          colorTheme === theme.id
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-900/50 border-purple-500/30 text-purple-300 hover:border-purple-400/50'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${theme.color}`}></div>
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Network Visualization */}
              <div ref={canvasRef} className="bg-slate-950/50 rounded-2xl border border-purple-500/20 overflow-hidden">
                <NeuralNetwork
                  neuronCount={result.neurons}
                  connectionCount={result.connections}
                  sentiment={result.sentiment}
                  mode={visualizationMode}
                  theme={colorTheme}
                />
              </div>

              {/* Input Text Card */}
              <Card className="glass-card border-purple-500/20 p-6 mt-6">
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
