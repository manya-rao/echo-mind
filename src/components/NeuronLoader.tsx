import { Brain } from 'lucide-react';

export function NeuronLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <div className="relative inline-block">
            <Brain className="w-20 h-20 md:w-24 md:h-24 text-purple-400 animate-pulse-glow" />
            
            {/* Firing neurons animation */}
            <div className="absolute inset-0">
              <div className="neuron-fire neuron-fire-1"></div>
              <div className="neuron-fire neuron-fire-2"></div>
              <div className="neuron-fire neuron-fire-3"></div>
              <div className="neuron-fire neuron-fire-4"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse">
          Processing Neural Patterns
        </h2>
        
        {/* Loading Steps */}
        <div className="space-y-2 text-purple-300/70 text-sm md:text-base">
          <p className="loading-step loading-step-1">Analyzing semantic structure...</p>
          <p className="loading-step loading-step-2">Extracting keywords...</p>
          <p className="loading-step loading-step-3">Mapping neural connections...</p>
          <p className="loading-step loading-step-4">Building visualization...</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 md:w-80 mx-auto">
          <div className="h-1 bg-purple-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-progress rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
