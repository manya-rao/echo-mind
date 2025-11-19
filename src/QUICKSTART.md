# 🚀 EchoMind Quick Start Guide

Get up and running with EchoMind in under 5 minutes!

## Prerequisites

Make sure you have one of these installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended for faster performance)

## Installation Steps

### 1️⃣ Install Dependencies

Choose your package manager:

**Using npm:**
```bash
npm install
```

**Using bun (faster):**
```bash
bun install
```

**Using yarn:**
```bash
yarn install
```

### 2️⃣ Start Development Server

**Using npm:**
```bash
npm run dev
```

**Using bun:**
```bash
bun dev
```

**Using yarn:**
```bash
yarn dev
```

### 3️⃣ Open in Browser

The app will automatically open, or navigate to:
```
http://localhost:5173
```

## First Run

### What You'll See

1. **Homepage** with:
   - EchoMind logo and header
   - Animated neuron particles
   - Text input area
   - "Generate Visualization" button

2. **Try It Out**:
   - Type any text (e.g., "I love this amazing technology!")
   - Click "Generate Visualization"
   - Watch the neuron firing animation
   - Explore your neural network visualization

## Project Structure Quick Reference

```
EchoMind/
│
├── App.tsx                     ← Main app logic
├── components/
│   ├── HomePage.tsx           ← Landing page
│   ├── VisualizationPage.tsx ← Results page
│   ├── NeuralNetwork.tsx     ← Canvas visualization
│   └── NeuronLoader.tsx      ← Loading animation
│
├── styles/
│   └── globals.css           ← All animations & styles
│
├── README.md                  ← Full documentation
├── API_DOCUMENTATION.md       ← Backend API details
└── QUICKSTART.md             ← This file
```

## Testing Examples

### Example 1: Positive Text
```
"I absolutely love this amazing new technology! It's fantastic and brings me so much joy."
```
**Expected**: Green sentiment, keywords like "love", "amazing", "fantastic"

### Example 2: Negative Text
```
"This terrible software is full of problems and issues. It's awful and frustrating."
```
**Expected**: Red sentiment, keywords like "terrible", "problems", "awful"

### Example 3: Neutral Text
```
"The meeting will take place tomorrow at 3pm in the conference room on the second floor."
```
**Expected**: Purple/blue sentiment, keywords like "meeting", "tomorrow", "conference"

### Example 4: Technical Text
```
"Machine learning algorithms process vast amounts of data to identify patterns and make predictions."
```
**Expected**: Neutral sentiment, keywords like "machine", "learning", "algorithms", "data"

## Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Troubleshooting
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Or with bun
rm -rf node_modules
rm bun.lockb
bun install
```

## Key Features to Try

✅ **Enter Different Types of Text**
- Short phrases vs. long paragraphs
- Emotional vs. factual content
- Different languages (English works best)

✅ **Explore Visualizations**
- Watch neurons move and pulse
- Observe connection animations
- Notice sentiment-based colors

✅ **Use Regenerate**
- Click "Regenerate" to see new neural patterns
- Same keywords, different network structure

✅ **Test Responsiveness**
- Try on mobile device
- Resize browser window
- Check tablet view

## What Makes EchoMind Special?

🎨 **No Backend Required**
- Everything runs in your browser
- No API keys needed
- Instant processing

🚀 **Fast & Smooth**
- Canvas-based rendering
- Optimized animations
- Responsive design

🧠 **Smart NLP**
- Keyword extraction
- Sentiment analysis
- Neural metrics

🌟 **Beautiful UI**
- Glass morphism
- Neon accents
- Smooth transitions

## Next Steps

1. **Read Full Documentation**: Check out [README.md](./README.md)
2. **Explore API Details**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. **Customize**: Modify colors, animations, or add features
4. **Deploy**: Build and deploy to Vercel, Netlify, or any static host

## Building for Production

### Create Production Build
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

### Deploy

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

**GitHub Pages, Cloudflare Pages, etc.:**
- Upload the `dist` folder after building

## Customization Quick Tips

### Change Neuron Count Range
In `App.tsx`, line ~45:
```typescript
const neurons = Math.floor(Math.random() * 51) + 20; // Change these numbers
```

### Adjust Animation Speed
In `NeuralNetwork.tsx`, line ~28:
```typescript
vx: (Math.random() - 0.5) * 0.5, // Increase multiplier for faster movement
```

### Modify Color Scheme
In `NeuralNetwork.tsx`, lines ~80-95:
```typescript
const colorSchemes = {
  positive: { neuron: '#10b981', ... },  // Change colors here
  negative: { neuron: '#ef4444', ... },
  neutral: { neuron: '#8b5cf6', ... }
};
```

### Change Number of Keywords
In `App.tsx`, line ~110:
```typescript
.slice(0, 8) // Change to show more/fewer keywords
```

## Performance Tips

✅ **For Best Performance:**
- Use Chrome, Firefox, or Edge
- Close unnecessary browser tabs
- Use a device with GPU acceleration
- Avoid too many simultaneous animations

⚡ **If You Experience Lag:**
- Reduce neuron count in code
- Decrease connection count
- Simplify animations in CSS

## Getting Help

📚 **Documentation:**
- [README.md](./README.md) - Full documentation
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API details

🐛 **Common Issues:**
- **Canvas not rendering**: Check browser compatibility
- **Slow performance**: Try modern browser or reduce neurons
- **Styles not loading**: Clear cache and restart dev server

## Success Checklist

- [ ] Dependencies installed
- [ ] Dev server running
- [ ] App opens in browser
- [ ] Can enter text
- [ ] Visualization generates
- [ ] Neuron animation works
- [ ] Can navigate back to home
- [ ] Regenerate button works

## You're Ready! 🎉

Your EchoMind installation is complete. Start by entering some text and watching your thoughts transform into beautiful neural visualizations!

**Happy visualizing! 🧠✨**

---

**Need more help?** Check the full [README.md](./README.md) for detailed documentation.
