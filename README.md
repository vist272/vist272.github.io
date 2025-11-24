# VIST272 Portfolio

A modern, responsive portfolio site for visual computing students at Texas A&M.

## 🚀 Live Demo

Visit the live site: `https://[your-username].github.io/vist272`

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all screen sizes
- **Fast**: Lightweight HTML & CSS, no build process required
- **SEO-Friendly**: Proper meta tags and semantic HTML

## 🛠️ Technologies

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Google Fonts (Space Grotesk, Manrope)

## 📦 Getting Started

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/[your-username]/vist272.git
   cd vist272
   ```

2. Open with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8080
   
   # Or using Node.js
   npx serve
   ```

3. Visit `http://localhost:8080` in your browser

### Deployment to GitHub Pages

1. **Create a new repository** on GitHub named `vist272` (or any name you prefer)

2. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VIST272 Portfolio"
   ```

3. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/[your-username]/vist272.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

5. **Automatic deployment**:
   - The GitHub Action will automatically deploy your site
   - Check the **Actions** tab to see the deployment progress
   - Once complete (usually 1-3 minutes), your site will be live at:
     `https://[your-username].github.io/vist272`

## 🎨 Customization

### Update Your Information

Edit `index.html` to replace placeholder content:
- Line 32: Your name
- Line 33-34: Your bio
- Lines 58-76: Project cards with your work
- Line 124: Your email
- Line 125: Your GitHub profile
- Line 141: Your name in footer

### Modify Styling

Edit `styles.css` to customize:
- Color scheme (CSS custom properties at the top)
- Typography
- Layout and spacing
- Animations

## 📁 Project Structure

```
vist272/
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
├── index.html          # Main HTML file
├── styles.css          # All styling
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 📝 License

Feel free to use this template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

---

Built for VIST272 at Texas A&M University
