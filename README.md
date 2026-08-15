# NextZenify Technologies — Modern Software & Technology Multi-Page Website

A **premium, modern, professional, and highly animated multi-page website** created for a technology and software engineering company. Built strictly using **pure HTML5, CSS3, and Vanilla JavaScript (ES6+)** with **zero JavaScript or CSS frameworks** (No React, Tailwind, Bootstrap, Vue, jQuery).

---

## 🌟 Key Features

* **Futuristic Dark Aesthetics**: Modern deep navy/slate backgrounds (`#080b14`), glassmorphism cards (`backdrop-filter: blur(16px)`), subtle neon cyan (`#00f2fe`), electric blue (`#3b82f6`), and vibrant purple (`#8b5cf6`) glowing accents.
* **Pure Vanilla JavaScript & CSS3**: 100% framework-free, lightweight, blazing fast, and zero runtime dependencies.
* **Continuous Background Animations**: Interactive HTML5 Canvas constellation network that repels on mouse movement and connects glowing nodes.
* **Scroll Reveal System**: High-performance `IntersectionObserver` scroll animations (`.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.reveal-blur`).
* **Animated Statistics Counters**: Numbers count up from 0 to their target value when scrolled into view.
* **Interactive 3D Card Tilt**: Mousemove calculations creating smooth perspective tilt effects on cards.
* **Dynamic Category Filtering**: Live instant filtering on the Portfolio/Projects page without page reloads.
* **Project Details Modal**: Interactive popup modal with project breakdown, tech stack badges, and performance metrics.
* **Live Frontend Form Validation**: Real-time feedback, email regex checks, and floating toast notifications.
* **Custom Desktop Cursor**: Glowing trailing halo effect that smoothly scales on clickable elements.
* **Sticky Glass Navbar**: Darkens and blurs dynamically upon scrolling, with a fully animated mobile navigation drawer.
* **Fully Responsive**: Mobile-first media queries tested for Desktop, Laptop, Tablet, and Mobile viewports.
* **SEO & Accessibility**: Complete Open Graph metadata, semantic HTML5, aria attributes, and keyboard accessibility.

---

## 📁 File Structure

```text
software-company/
│
├── index.html                # Home page (Hero, tech stack, statistics, testimonials, CTA)
├── about.html                # About page (Company journey, mission/vision, values, methodology)
├── services.html             # Services page (8 detailed service cards, engagement models, FAQ)
├── projects.html             # Projects portfolio (Interactive category filtering & modal)
├── team.html                 # Team page (Leadership cards, company culture, open positions)
├── contact.html              # Contact page (Interactive contact form with live validation)
│
├── css/
│   ├── style.css             # Design system, CSS variables, typography, layout, components
│   ├── animations.css        # Keyframes, continuous floating, and scroll reveal utilities
│   └── responsive.css        # Multi-device media queries and mobile drawer styles
│
├── js/
│   ├── main.js               # Preloader, sticky navbar, mobile menu, custom cursor, router
│   ├── animations.js         # Canvas particle network, IntersectionObserver, counters, 3D tilt
│   ├── projects.js           # Portfolio category filters & project modal popup
│   └── contact.js            # Live form validation, error states, and toast notifications
│
├── images/
│   ├── logo/
│   │   ├── logo.svg          # Brand vector logo with glowing icon
│   │   └── favicon.svg       # Square brand icon & favicon
│   ├── team/
│   │   ├── member-1.svg to member-6.svg # Executive & engineering team portraits
│   └── projects/
│       ├── project-1.svg to project-9.svg # Project UI mockups & architectural visuals
│
└── README.md                 # Complete documentation & customization guide
```

---

## 🚀 How to Run Locally

You can run the website using any standard local web server:

### Option 1: Using Python (Built-in)
```bash
# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Using Node.js / npx
```bash
npx -y serve .
```
Open the provided local URL (e.g. `http://localhost:3000`).

### Option 3: Direct File Opening / VS Code Live Server
* If you use VS Code, right-click `index.html` and select **"Open with Live Server"**.
* Or double click `index.html` directly in your file manager to open it in any modern browser.

---

## 🎨 How to Customize

### 1. Changing Company Name & Logo
* **Logo Image**: Replace `images/logo/logo.svg` and `images/logo/favicon.svg` with your company's logo.
* **Company Name in HTML**: Search for `NextZenify Technologies` or `NEXTZENIFY` across all HTML files and replace it with your company name.

### 2. Customizing Colors & Theme
All colors, gradients, and font tokens are defined in `css/style.css` under the `:root` pseudo-class:

```css
:root {
  /* Dark Futuristic Palette */
  --bg-primary: #080b14;
  --bg-secondary: #0d1224;

  /* Neon & Electric Brand Accents */
  --accent-cyan: #00f2fe;
  --accent-blue: #3b82f6;
  --accent-purple: #8b5cf6;

  /* Gradients */
  --grad-primary: linear-gradient(135deg, #00f2fe 0%, #3b82f6 50%, #8b5cf6 100%);
}
```
Simply edit these color hex values to alter the entire theme instantly across all 6 pages.

### 3. Replacing Project & Team Images
* **Projects**: Replace the SVG files inside `images/projects/` (`project-1.svg` to `project-9.svg`) with your own PNG/JPG/WebP screenshots, or update the `src` paths in `projects.html` and `index.html`.
* **Team Avatars**: Replace the SVG files in `images/team/` (`member-1.svg` to `member-6.svg`) with real team photos or avatars.
* **Modal Content**: Project modal data can be updated in `js/projects.js` under the `projectData` object.

### 4. Connecting the Contact Form to a Backend / Email Service
The frontend contact form includes full live validation in `js/contact.js`. To forward submissions to your inbox, you can integrate services like **Formspree**, **EmailJS**, or **Web3Forms**:

Example with Formspree:
```html
<!-- Inside contact.html -->
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Or connect a `fetch()` POST request in `js/contact.js` inside the `form.addEventListener('submit', ...)` handler.

---

## 💻 Browser Support

* Google Chrome (Latest)
* Mozilla Firefox (Latest)
* Apple Safari (Latest)
* Microsoft Edge (Latest)
* Opera & Brave (Latest)
* Mobile Safari & Chrome Android

---

## 📄 License

This project is open-source and customizable for commercial and personal use.
© 2026 NextZenify Technologies.
