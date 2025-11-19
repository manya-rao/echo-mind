# 📥 EchoMind Installation & Setup Guide

Complete installation instructions for developers, designers, and technical users.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Development Setup](#development-setup)
4. [Production Build](#production-build)
5. [Deployment Options](#deployment-options)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **Node.js**: v18.0.0 or higher
- **RAM**: 4GB minimum
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended
- **Node.js**: v20.0.0 or higher (or Bun v1.0+)
- **RAM**: 8GB or more
- **SSD**: For faster build times
- **Modern GPU**: For smooth Canvas animations

---

## Installation Methods

### Method 1: Using npm (Standard)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Method 2: Using Bun (Recommended - Faster)

```bash
# Install Bun first (if not installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build
```

### Method 3: Using Yarn

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Method 4: Using pnpm

```bash
# Install pnpm first (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

---

## Development Setup

### Step-by-Step Guide

#### 1. Clone or Download Project

If you have Git:
```bash
git clone <repository-url>
cd echomind
```

Or download and extract the ZIP file.

#### 2. Install Dependencies

Choose your preferred package manager:

```bash
npm install
# or
bun install
# or
yarn install
# or
pnpm install
```

**Expected Output:**
```
added 250 packages in 15s
```

#### 3. Start Development Server

```bash
npm run dev
# or
bun dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 4. Open in Browser

Navigate to: `http://localhost:5173`

You should see the EchoMind homepage with:
- Animated neuron particles
- EchoMind logo
- Text input area
- Generate Visualization button

---

## Production Build

### Building the Application

```bash
npm run build
# or
bun run build
```

**What This Does:**
- Compiles TypeScript to JavaScript
- Bundles all components and dependencies
- Optimizes and minifies code
- Processes CSS with Tailwind
- Generates static files in `dist/` folder

**Expected Output:**
```
vite v5.x.x building for production...
✓ xxx modules transformed.
dist/index.html                   x.xx kB
dist/assets/index-xxxxx.js       xxx.xx kB │ gzip: xx.xx kB
dist/assets/index-xxxxx.css       xx.xx kB │ gzip: x.xx kB
✓ built in x.xxs
```

### Preview Production Build

Before deploying, test the production build locally:

```bash
npm run preview
# or
bun run preview
```

Navigate to: `http://localhost:4173`

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**Deploy:**
```bash
vercel
```

**Follow the prompts:**
- Set up and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N`
- Project name: `echomind` (or your choice)
- Directory: `./`
- Override settings: `N`

**Result:** Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

**Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

**Build and Deploy:**
```bash
npm run build
netlify deploy --prod
```

**Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`

**Result:** Your app will be live at `https://your-site.netlify.app`

### Option 3: GitHub Pages

**Install gh-pages:**
```bash
npm install -g gh-pages
```

**Add to package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

**Deploy:**
```bash
npm run deploy
```

**Result:** Your app will be live at `https://yourusername.github.io/echomind`

### Option 4: Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub repository
4. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

### Option 5: Self-Hosted (VPS/Cloud)

**Using nginx:**

```bash
# Build the app
npm run build

# Copy dist folder to your server
scp -r dist/* user@your-server:/var/www/echomind/

# Configure nginx
sudo nano /etc/nginx/sites-available/echomind
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name echomind.yourdomain.com;
    root /var/www/echomind;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Troubleshooting

### Common Issues

#### Issue: "Cannot find module"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json  # or bun.lockb or yarn.lock
npm install
```

#### Issue: "Port 5173 is already in use"

**Solution:**
```bash
# Kill the process using the port
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 3000
```

#### Issue: Canvas not rendering

**Solution:**
- Update your browser to the latest version
- Try a different browser (Chrome recommended)
- Check browser console for errors
- Ensure hardware acceleration is enabled in browser settings

#### Issue: Slow performance

**Solutions:**
1. Use a modern browser (Chrome, Firefox, Edge)
2. Close other browser tabs
3. Reduce neuron count in code:
   ```typescript
   // In App.tsx
   const neurons = Math.floor(Math.random() * 31) + 15; // Reduced range
   ```
4. Disable some animations in CSS

#### Issue: Styles not loading

**Solution:**
```bash
# Clear cache and rebuild
npm run build
rm -rf dist
npm run dev
```

#### Issue: "Module not found: Can't resolve 'lucide-react'"

**Solution:**
```bash
npm install lucide-react
# or
bun add lucide-react
```

---

## Advanced Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_APP_NAME=EchoMind
VITE_API_URL=http://localhost:3000/api

# Production
# VITE_API_URL=https://api.echomind.com
```

**Usage in code:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Custom Port

**Modify package.json:**
```json
{
  "scripts": {
    "dev": "vite --port 3000"
  }
}
```

Or use CLI:
```bash
npm run dev -- --port 3000
```

### Custom Build Configuration

**Create vite.config.ts:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Change output directory
    sourcemap: true,   // Enable source maps
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true,  // Expose to network
  },
});
```

### Enable HTTPS in Development

```bash
npm run dev -- --https
```

Or install mkcert and configure:
```bash
# Install mkcert
brew install mkcert  # macOS
# or download from https://github.com/FiloSottile/mkcert

# Create certificates
mkcert -install
mkcert localhost

# Update vite.config.ts
{
  server: {
    https: {
      key: './localhost-key.pem',
      cert: './localhost.pem'
    }
  }
}
```

### Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
docker build -t echomind .
docker run -p 80:80 echomind
```

---

## Verification Checklist

After installation, verify everything works:

- [ ] ✅ Dependencies installed without errors
- [ ] ✅ Development server starts
- [ ] ✅ App opens in browser at localhost:5173
- [ ] ✅ Homepage loads with animations
- [ ] ✅ Can enter text in input field
- [ ] ✅ Generate button is clickable
- [ ] ✅ Loader animation appears
- [ ] ✅ Visualization page displays
- [ ] ✅ Neural network animates smoothly
- [ ] ✅ Stats cards show correct data
- [ ] ✅ Keywords display properly
- [ ] ✅ Sentiment shows with correct color
- [ ] ✅ Back button returns to home
- [ ] ✅ Regenerate button works
- [ ] ✅ Mobile responsive (test on phone or resize browser)
- [ ] ✅ Production build completes successfully

---

## Package Dependencies

### Core Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "lucide-react": "latest"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.x",
  "vite": "^5.x",
  "typescript": "^5.x",
  "tailwindcss": "^4.x"
}
```

### Included UI Components (Shadcn/UI)
- Badge
- Button
- Card
- Textarea
- Plus 30+ other components ready to use

---

## Performance Benchmarks

### Development Build
- **Initial Load**: ~1-2 seconds
- **Hot Reload**: ~50-200ms
- **Bundle Size**: ~300KB (gzipped)

### Production Build
- **Build Time**: ~10-30 seconds
- **Initial Load**: ~500ms-1s
- **Bundle Size**: ~150KB (gzipped, minified)
- **Lighthouse Score**: 95-100

---

## Support & Resources

### Documentation
- **README.md** - Complete documentation
- **API_DOCUMENTATION.md** - Backend API details
- **QUICKSTART.md** - 5-minute setup guide
- **This File** - Full installation guide

### Technologies Used
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/UI](https://ui.shadcn.com/) - Components
- [Lucide Icons](https://lucide.dev/) - Icons

---

## Success! 🎉

You've successfully installed EchoMind! 

**Next Steps:**
1. Try the quick examples in [QUICKSTART.md](./QUICKSTART.md)
2. Read the full documentation in [README.md](./README.md)
3. Explore the API in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
4. Customize and make it your own!

**Happy coding! 🧠✨**
