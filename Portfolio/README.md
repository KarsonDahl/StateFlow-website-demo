# Karson Dahl Portfolio

Interactive portfolio website built with React and Vite, featuring custom animations, particle effects, and a unique tree cursor.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser

3. **Build for production:**
   ```bash
   npm run build
   ```
   
   The built site will be in the `dist/` folder

## 🌐 Deploy to Vercel (Recommended)

1. Push this code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New Project" and select your repository

4. Vercel auto-detects Vite — just click "Deploy"

5. Your site will be live at `https://your-project.vercel.app` in ~30 seconds

### Custom Domain (Optional)
- In Vercel dashboard → Settings → Domains
- Add your custom domain (requires DNS configuration)

## 🌐 Deploy to Netlify

1. Push code to GitHub

2. Go to [netlify.com](https://netlify.com) and sign in

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repo

5. Build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

6. Click "Deploy"

## 📁 Project Structure

```
.
├── index.html          # Entry HTML file
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   └── Portfolio.jsx   # Main portfolio component
└── dist/               # Production build (after npm run build)
```

## ✨ Features

- **Custom Tree Cursor:** Green SVG tree with trailing glow ring
- **Particle Background:** Noise-driven pseudorandom particle drift
- **3D Tilt Cards:** Mouse-reactive perspective tilt on project/about cards
- **Magnetic Buttons:** Pull toward cursor on hover
- **Leaf Burst:** Click anywhere for animated leaf particles
- **Expandable Timeline:** Click experience items to expand details
- **Smooth Animations:** Scroll-triggered fade-ins, bouncy skill tags

## 🛠️ Tech Stack

- React 18
- Vite 5
- Pure CSS animations (no external libraries)
- Custom canvas particle system
- Value noise for organic motion

---

Built by Karson Dahl | [LinkedIn](https://www.linkedin.com/in/karson-dahl-luswe/) | [GitHub](https://github.com/KarsonDahl)
