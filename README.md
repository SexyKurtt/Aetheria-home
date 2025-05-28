# Personal Portfolio Website

A modern, responsive personal portfolio website with animated features, multiple themes, and interactive elements.

## ✨ Features

### 🎨 Design & Themes
- **Clean, minimal design** with completely blank background
- **Multi-theme support** with smooth transitions:
  - **Light Theme** - Clean and professional
  - **Dark Theme** - Easy on the eyes
  - **Pink Theme** - Hidden easter egg theme (unlock with "pembe")
- **Two-column centered layout** for optimal content organization
- **Fully responsive design** optimized for desktop, tablet, and mobile
- **Modern typography** using Inter font family

### 🖼️ Profile Section (Left Side)
- **Animated profile image** with flowing blue border animation
  - Smooth gradient rotation effect (2.5-second cycle)
  - Perfect circular containment for any image
  - Interactive hover effects and click animations
  - Automatic fallback to icon if image unavailable
- **Name section** with animated underline
- **Social media icons** grid layout with enhanced touch targets:
  - GitHub, LinkedIn, Instagram, Twitter
  - YouTube, Spotify, Facebook
  - Improved accessibility and mobile-friendly sizing

### 📝 Content Section (Right Side)
- **About Me section** with smooth fade-in animations
- **Readable typography** with proper spacing and contrast
- **Responsive text sizing** for all screen sizes

### 🚀 Navigation & Pages
- **Fixed navigation bar** with blur effect and theme toggle
- **Mobile hamburger menu** with smooth animations
- **Three main pages**:
  - **Home** - Personal profile and about section
  - **Projects** - Interactive project showcase grid
  - **API Docs** - Expandable API documentation cards

### 📱 Mobile Optimization
- **Touch-friendly interface** with 44px minimum touch targets
- **Optimized breakpoints** for tablets (768px) and phones (480px)
- **Improved spacing and typography** for small screens
- **Enhanced mobile navigation** with better accessibility
- **Responsive grid layouts** that adapt to screen size

### 🎯 Interactive Features
- **Theme toggle button** in navigation with animated icons
- **Expandable API cards** that don't affect neighboring elements
- **Project cards** with hover overlays and click-to-open functionality
- **Smooth scrolling** and micro-interactions throughout
- **Keyboard navigation support** for accessibility

### 🥚 Hidden Easter Eggs
- **Pink Theme Easter Egg**:
  - **Secret pink theme** unlocked by typing "pembe" (Turkish for pink)
  - **Hidden input field** accessible via Ctrl+Shift+P or clicking bottom-right
  - **Sparkle animation** when theme is unlocked
  - **Persistent unlock status** saved in localStorage
  - **Special pink heart icon** appears in theme toggle when unlocked

- **Snake Game Easter Egg**:
  - **Secret Snake game** activated by typing "yılan" (Turkish for snake)
  - **Full-featured game** with HTML5 Canvas and smooth animations
  - **Multiple control options**: Arrow keys, WASD, touch/swipe on mobile
  - **Victory condition**: Reach exactly 15 points for "HEHEHEHE" message
  - **Score tracking** with persistent high score storage
  - **Responsive design** that works on desktop and mobile
  - **Theme integration** - game adapts to current theme colors

### 🛠️ Technical Features
- **CSS Grid/Flexbox** for modern, stable layouts
- **CSS Custom Properties** for comprehensive theming system
- **localStorage** for theme and easter egg persistence
- **Intersection Observer API** for scroll-based animations
- **Comprehensive accessibility** features:
  - ARIA labels and roles
  - Keyboard navigation support
  - Focus management
  - Reduced motion support
  - High contrast mode compatibility
- **Performance optimizations** for all devices
- **Cross-browser compatibility** with fallbacks

## File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript interactions
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling and animations
- **JavaScript (ES6+)** - Interactive features
- **Font Awesome** - Social media icons
- **Google Fonts** - Inter typography

## 🎮 How to Use

### Theme Switching
- **Click the theme toggle** in the top-right navigation
- **Cycle through themes**: Light → Dark → Pink (if unlocked) → Light
- **Themes persist** across page visits and browser sessions

### Easter Eggs
**Pink Theme:**
- **Method 1**: Type "pembe" in the hidden input field (bottom-right corner)
- **Method 2**: Press `Ctrl+Shift+P` to focus the hidden input, then type "pembe"
- **Unlock effect**: Sparkle animation and pink theme activation
- **Persistent**: Once unlocked, pink theme remains available

**Snake Game:**
- **Activation**: Type "yılan" in the hidden input field
- **Controls**: Arrow keys, WASD, or swipe gestures on mobile
- **Goal**: Reach 15 points to see the special "HEHEHEHE" victory message
- **Features**: Score tracking, high score persistence, pause/restart functionality
- **Return**: Use "Return to Portfolio" button or browser back button

### Mobile Navigation
- **Hamburger menu** appears on screens smaller than 768px
- **Touch-optimized** with larger touch targets
- **Smooth animations** for menu open/close

### API Documentation
- **Click any API card** to expand and view endpoints
- **Cards expand independently** without affecting others
- **Keyboard support**: Enter/Space to expand, ESC to collapse all

### Projects Page
- **Click project cards** to open websites in new tabs
- **Hover effects** show "View Project" overlay
- **Responsive grid** adapts to screen size

## 🛠️ Customization

### Changing Themes
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-blue: #0066cc;
    --secondary-blue: #004499;
    --accent-blue: #3399ff;
    /* Light theme colors */
}

[data-theme="dark"] {
    --text-primary: #ffffff;
    --background: #121212;
    /* Dark theme overrides */
}
```

### Updating Content
1. **Profile Image**: Replace `images.jpg` with your photo
2. **Name**: Edit `<h1 class="name">` in `index.html`
3. **About Me**: Update content in `.about-content` paragraphs
4. **Social Links**: Modify `href` attributes in social icons
5. **Projects**: Update project cards in `projects.html`
6. **API Docs**: Modify API information in `api-docs.html`

### Animation Customization
```css
/* Profile border animation speed */
.animated-border {
    animation: gradientFlow 2.5s ease-in-out infinite;
}

/* Theme transition speed */
:root {
    --transition: all 0.3s ease;
}
```

### Adding New Themes
1. **Add CSS variables** for the new theme
2. **Update theme cycling logic** in `script.js`
3. **Add theme icon** if desired

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Optimized for Core Web Vitals
- Reduced motion support for accessibility
- Efficient CSS animations using transform and opacity
- Minimal JavaScript for enhanced performance

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Customize the content and styling as needed
4. Deploy to your preferred hosting platform

## Future Enhancements

- Add project showcase section
- Implement dark/light theme toggle
- Add contact form functionality
- Include skills and experience sections
- Add blog integration
- Implement smooth page transitions

## License

This project is open source and available under the MIT License.
