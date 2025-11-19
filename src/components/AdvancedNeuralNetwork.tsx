import { useEffect, useRef } from 'react';
import type { VisualizationMode, ColorTheme } from '../App';

interface NeuralNetworkProps {
  neuronCount: number;
  connectionCount: number;
  sentiment: string;
  mode?: VisualizationMode;
  theme?: ColorTheme;
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX?: number;
  targetY?: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

export function AdvancedNeuralNetwork({ 
  neuronCount, 
  connectionCount, 
  sentiment, 
  mode = 'force',
  theme = 'neural' 
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    
    // Initialize neurons based on visualization mode
    neuronsRef.current = initializeNeurons(neuronCount, width, height, mode);

    // Initialize connections
    connectionsRef.current = Array.from({ length: Math.min(connectionCount, neuronCount * 3) }, () => ({
      from: Math.floor(Math.random() * neuronCount),
      to: Math.floor(Math.random() * neuronCount),
      opacity: Math.random() * 0.5 + 0.1
    }));

    // Get color scheme
    const colors = getColorScheme(theme, sentiment);

    // Animation loop
    let pulsePhase = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      pulsePhase += 0.02;

      // Update neuron positions based on mode
      updateNeuronPositions(neuronsRef.current, mode, width, height, pulsePhase);

      // Draw connections
      connectionsRef.current.forEach((conn) => {
        const from = neuronsRef.current[conn.from];
        const to = neuronsRef.current[conn.to];
        
        if (!from || !to) return;

        const animatedOpacity = conn.opacity * (0.5 + Math.sin(pulsePhase + conn.from) * 0.3);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, colors.connection + Math.floor(animatedOpacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, colors.connection + '00');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw neurons
      neuronsRef.current.forEach((neuron, i) => {
        const pulse = Math.sin(pulsePhase + i * 0.1) * 0.3 + 1;
        const currentRadius = neuron.radius * pulse;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, currentRadius * 3
        );
        glowGradient.addColorStop(0, colors.glow);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Neuron core
        const coreGradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, currentRadius
        );
        coreGradient.addColorStop(0, '#ffffff');
        coreGradient.addColorStop(0.3, colors.neuron);
        coreGradient.addColorStop(1, colors.neuron + '99');
        
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [neuronCount, connectionCount, sentiment, mode, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
      style={{ display: 'block' }}
    />
  );
}

// Initialize neurons based on visualization mode
function initializeNeurons(count: number, width: number, height: number, mode: VisualizationMode): Neuron[] {
  const neurons: Neuron[] = [];
  
  switch (mode) {
    case 'circular': {
      // Arrange neurons in concentric circles
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = maxRadius * (0.5 + Math.random() * 0.5);
        neurons.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          radius: Math.random() * 3 + 2
        });
      }
      break;
    }
    
    case 'grid': {
      // Arrange neurons in a grid pattern
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const cellWidth = width / (cols + 1);
      const cellHeight = height / (rows + 1);
      
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        neurons.push({
          x: (col + 1) * cellWidth + (Math.random() - 0.5) * cellWidth * 0.3,
          y: (row + 1) * cellHeight + (Math.random() - 0.5) * cellHeight * 0.3,
          vx: 0,
          vy: 0,
          radius: Math.random() * 3 + 2
        });
      }
      break;
    }
    
    case 'constellation': {
      // Arrange neurons in clusters like constellations
      const clusters = Math.floor(count / 10) + 2;
      const clusterCenters = Array.from({ length: clusters }, () => ({
        x: Math.random() * width,
        y: Math.random() * height
      }));
      
      for (let i = 0; i < count; i++) {
        const cluster = clusterCenters[i % clusters];
        const offset = Math.random() * 100;
        const angle = Math.random() * Math.PI * 2;
        neurons.push({
          x: cluster.x + Math.cos(angle) * offset,
          y: cluster.y + Math.sin(angle) * offset,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 3 + 2
        });
      }
      break;
    }
    
    case 'force':
    default: {
      // Random force-directed layout
      for (let i = 0; i < count; i++) {
        neurons.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2
        });
      }
      break;
    }
  }
  
  return neurons;
}

// Update neuron positions based on visualization mode
function updateNeuronPositions(neurons: Neuron[], mode: VisualizationMode, width: number, height: number, phase: number) {
  neurons.forEach((neuron, i) => {
    if (mode === 'force' || mode === 'constellation') {
      // Moving particles for force and constellation modes
      neuron.x += neuron.vx;
      neuron.y += neuron.vy;

      // Bounce off edges
      if (neuron.x < 0 || neuron.x > width) neuron.vx *= -1;
      if (neuron.y < 0 || neuron.y > height) neuron.vy *= -1;

      // Keep within bounds
      neuron.x = Math.max(0, Math.min(width, neuron.x));
      neuron.y = Math.max(0, Math.min(height, neuron.y));
    } else {
      // Slight wobble for circular and grid modes
      const wobble = Math.sin(phase + i) * 2;
      neuron.x += Math.cos(phase + i) * wobble * 0.1;
      neuron.y += Math.sin(phase + i * 1.3) * wobble * 0.1;
    }
  });
}

// Get color scheme based on theme and sentiment
function getColorScheme(theme: ColorTheme, sentiment: string) {
  const themeColors = {
    neural: {
      positive: { neuron: '#10b981', connection: '#34d399', glow: 'rgba(16, 185, 129, 0.3)' },
      negative: { neuron: '#ef4444', connection: '#f87171', glow: 'rgba(239, 68, 68, 0.3)' },
      neutral: { neuron: '#8b5cf6', connection: '#a78bfa', glow: 'rgba(139, 92, 246, 0.3)' }
    },
    ocean: {
      positive: { neuron: '#06b6d4', connection: '#22d3ee', glow: 'rgba(6, 182, 212, 0.3)' },
      negative: { neuron: '#0ea5e9', connection: '#38bdf8', glow: 'rgba(14, 165, 233, 0.3)' },
      neutral: { neuron: '#3b82f6', connection: '#60a5fa', glow: 'rgba(59, 130, 246, 0.3)' }
    },
    sunset: {
      positive: { neuron: '#f59e0b', connection: '#fbbf24', glow: 'rgba(245, 158, 11, 0.3)' },
      negative: { neuron: '#dc2626', connection: '#ef4444', glow: 'rgba(220, 38, 38, 0.3)' },
      neutral: { neuron: '#f97316', connection: '#fb923c', glow: 'rgba(249, 115, 22, 0.3)' }
    },
    forest: {
      positive: { neuron: '#10b981', connection: '#34d399', glow: 'rgba(16, 185, 129, 0.3)' },
      negative: { neuron: '#059669', connection: '#10b981', glow: 'rgba(5, 150, 105, 0.3)' },
      neutral: { neuron: '#14b8a6', connection: '#2dd4bf', glow: 'rgba(20, 184, 166, 0.3)' }
    },
    cosmic: {
      positive: { neuron: '#ec4899', connection: '#f472b6', glow: 'rgba(236, 72, 153, 0.3)' },
      negative: { neuron: '#db2777', connection: '#ec4899', glow: 'rgba(219, 39, 119, 0.3)' },
      neutral: { neuron: '#a855f7', connection: '#c084fc', glow: 'rgba(168, 85, 247, 0.3)' }
    }
  };

  const themeScheme = themeColors[theme] || themeColors.neural;
  return themeScheme[sentiment as keyof typeof themeScheme] || themeScheme.neutral;
}
