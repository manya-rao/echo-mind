import { useEffect, useRef } from 'react';

interface NeuralNetworkProps {
  neuronCount: number;
  connectionCount: number;
  sentiment: string;
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

export function NeuralNetwork({ neuronCount, connectionCount, sentiment }: NeuralNetworkProps) {
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

    // Initialize neurons
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;
    
    neuronsRef.current = Array.from({ length: neuronCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 2
    }));

    // Initialize connections
    connectionsRef.current = Array.from({ length: Math.min(connectionCount, neuronCount * 3) }, () => ({
      from: Math.floor(Math.random() * neuronCount),
      to: Math.floor(Math.random() * neuronCount),
      opacity: Math.random() * 0.5 + 0.1
    }));

    // Sentiment-based colors
    const colorSchemes = {
      positive: {
        neuron: '#10b981',
        connection: '#34d399',
        glow: 'rgba(16, 185, 129, 0.3)'
      },
      negative: {
        neuron: '#ef4444',
        connection: '#f87171',
        glow: 'rgba(239, 68, 68, 0.3)'
      },
      neutral: {
        neuron: '#8b5cf6',
        connection: '#a78bfa',
        glow: 'rgba(139, 92, 246, 0.3)'
      }
    };

    const colors = colorSchemes[sentiment as keyof typeof colorSchemes] || colorSchemes.neutral;

    // Animation loop
    let pulsePhase = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      pulsePhase += 0.02;

      // Update neuron positions
      neuronsRef.current.forEach((neuron) => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > height) neuron.vy *= -1;

        // Keep within bounds
        neuron.x = Math.max(0, Math.min(width, neuron.x));
        neuron.y = Math.max(0, Math.min(height, neuron.y));
      });

      // Draw connections
      connectionsRef.current.forEach((conn) => {
        const from = neuronsRef.current[conn.from];
        const to = neuronsRef.current[conn.to];
        
        if (!from || !to) return;

        // Animated opacity
        const animatedOpacity = conn.opacity * (0.5 + Math.sin(pulsePhase + conn.from) * 0.3);

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        
        // Gradient line
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
  }, [neuronCount, connectionCount, sentiment]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px] md:h-[500px] lg:h-[600px]"
      style={{ display: 'block' }}
    />
  );
}
