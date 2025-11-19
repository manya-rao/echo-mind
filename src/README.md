# 🧠 EchoMind – AI Thought-to-Visualization Engine

A stunning web application that transforms your thoughts into beautiful neural network visualizations. Built with React, TypeScript, and Canvas-based animations.

![EchoMind](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80)

## ✨ Features

### Core Functionality
- **Text Analysis Engine**: Advanced NLP processing with keyword extraction and sentiment analysis
- **Neural Network Visualization**: Real-time animated network graphs with neurons and connections
- **Sentiment Detection**: Analyzes text for positive, negative, or neutral sentiment
- **Keyword Extraction**: Intelligently extracts the most relevant keywords from your input

### Visual Design
- 🌟 **Glowing Neuron Theme**: Beautiful purple/blue gradient backgrounds with animated particles
- 🎨 **Glass Morphism**: Modern frosted glass card effects
- ⚡ **Smooth Animations**: Fluid transitions and loading states
- 🌙 **Dark Mode**: Eye-friendly dark theme throughout
- 📱 **Fully Responsive**: Perfect experience on mobile, tablet, and desktop

### User Experience
- 🔥 **Neuron Firing Loader**: Beautiful loading animation that mimics neural activity
- 🔄 **Regenerate**: Generate new visualizations with different neural patterns
- 🎯 **Interactive Network**: Animated neurons and connections that pulse and move
- 💫 **Neon Accents**: Vibrant color highlights for key information

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Canvas API** - High-performance network visualization
- **Lucide React** - Beautiful icon library
- **Shadcn/UI** - Premium component library

### Processing
- **Client-side NLP** - No backend required for fast processing
- **Sentiment Analysis** - Advanced text emotion detection
- **Keyword Extraction** - Smart content analysis

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- Modern web browser

### Quick Start

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 How to Use

### Step 1: Enter Your Text
On the homepage, type any text into the input box. This can be:
- Your thoughts and ideas
- A quote or passage
- Any text you want to analyze
- Creative writing or poetry

### Step 2: Generate Visualization
Click the "Generate Visualization" button. You'll see:
- A beautiful neuron firing animation while processing
- Text being analyzed for keywords and sentiment
- Neural network being constructed

### Step 3: Explore Results
The visualization page shows:
- **Neural Nodes**: Number of neurons detected (20-70)
- **Connections**: Number of synaptic links (70-200)
- **Sentiment**: Emotional tone (positive/negative/neutral)
- **Keywords**: Key concepts extracted from your text
- **Network Graph**: Animated visualization with moving neurons and connections

### Step 4: Regenerate (Optional)
Click "Regenerate" to create a new visualization with different random parameters while keeping the same analysis.

## 🏗️ Project Structure

```
/
├── App.tsx                      # Main application with routing logic
├── components/
│   ├── HomePage.tsx            # Landing page with text input
│   ├── VisualizationPage.tsx  # Results and network visualization
│   ├── NeuralNetwork.tsx      # Canvas-based network animation
│   ├── NeuronLoader.tsx       # Loading animation component
│   └── ui/                    # Shadcn/UI components
├── styles/
│   └── globals.css            # Global styles and animations
└── README.md                   # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple (#8b5cf6) - Neural activity
- **Secondary**: Blue (#3b82f6) - Connections
- **Accent**: Pink (#ec4899) - Highlights
- **Background**: Dark slate gradients

### Animations
- **Float**: Particle background movement
- **Fire**: Neuron firing effect
- **Pulse**: Glowing elements
- **Slide**: Page transitions
- **Fade**: Element appearances

### Sentiment Colors
- **Positive**: Green gradient (#10b981 → #34d399)
- **Negative**: Red gradient (#ef4444 → #f87171)
- **Neutral**: Purple gradient (#8b5cf6 → #a78bfa)

## 🧮 How It Works

### NLP Processing
The application uses a sophisticated client-side processing engine:

1. **Keyword Extraction**
   - Tokenizes input text
   - Removes common stop words (the, a, an, etc.)
   - Counts word frequency
   - Returns top 8 most relevant keywords

2. **Sentiment Analysis**
   - Scans for positive words (good, great, excellent, etc.)
   - Scans for negative words (bad, terrible, awful, etc.)
   - Calculates sentiment scores
   - Determines overall emotional tone

3. **Neural Metrics**
   - Generates random neuron count (20-70)
   - Generates random connection count (70-200)
   - Simulates neural network complexity

### Visualization Algorithm
The network visualization uses Canvas API:

1. **Initialization**
   - Creates neurons with random positions
   - Assigns random velocities
   - Establishes connections between neurons

2. **Animation Loop**
   - Updates neuron positions
   - Handles edge bouncing
   - Draws connection lines with gradients
   - Renders neurons with pulsing glow effects

3. **Effects**
   - Sentiment-based color schemes
   - Animated opacity for connections
   - Pulsing radius for neurons
   - Smooth gradient rendering

## 🔧 Customization

### Adjust Neuron Count Range
In `App.tsx`, modify the `processText` function:
```typescript
const neurons = Math.floor(Math.random() * 51) + 20; // Change range here
```

### Change Color Schemes
In `NeuralNetwork.tsx`, update the `colorSchemes` object:
```typescript
const colorSchemes = {
  positive: {
    neuron: '#your-color',
    connection: '#your-color',
    glow: 'rgba(...)'
  },
  // ... other sentiments
};
```

### Modify Animation Speed
In `NeuralNetwork.tsx`, adjust the velocity:
```typescript
vx: (Math.random() - 0.5) * 0.5, // Change multiplier for speed
```

### Add More Keywords
In `App.tsx`, change the keyword limit:
```typescript
.slice(0, 8) // Change number of keywords returned
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Adjusted spacing
- **Desktop**: > 1024px - Full two-column layout

## 🎭 Component API

### AnalysisResult Interface
```typescript
interface AnalysisResult {
  neurons: number;        // Neuron count (20-70)
  connections: number;    // Connection count (70-200)
  sentiment: string;      // 'positive' | 'negative' | 'neutral'
  keywords: string[];     // Extracted keywords
  text: string;          // Original input text
}
```

## 🐛 Troubleshooting

### Issue: Visualization not animating
- **Solution**: Ensure browser supports Canvas API
- Check browser console for errors

### Issue: Slow performance
- **Solution**: Try reducing neuron count
- Close other browser tabs
- Use a modern browser (Chrome, Firefox, Safari, Edge)

### Issue: Styles not loading
- **Solution**: Clear browser cache
- Restart development server
- Check that globals.css is imported

## 🌟 Future Enhancements

Potential features for future versions:
- Export visualization as image/video
- Save and share visualizations
- More NLP analysis metrics
- Custom color theme picker
- 3D network visualization
- Multiple visualization styles
- Real AI integration (GPT, etc.)
- Animation speed controls

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Credits

- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Framework**: [React](https://react.dev/)

## 💡 Tips

- Try different types of text to see varying keyword patterns
- Longer text tends to produce more interesting visualizations
- Emotionally charged text shows clearer sentiment results
- The network animation responds to your sentiment analysis

---

**Built with ❤️ by the EchoMind Team**

Transform your thoughts into neural art! 🧠✨
