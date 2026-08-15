/**
 * ==========================================================================
 * NEXTZENIFY TECHNOLOGIES - MAIN CONTROLLER (MAIN.JS)
 * Pure Vanilla JavaScript (ES6+) - Global UI, Navigation, Loader, Cursor
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPreloader();
  initStickyNavbar();
  initMobileNav();
  initCustomCursor();
  initBackToTop();
  highlightActiveNavLink();
  initPageTransitions();
  initCodeBoxCycler();
});

/**
 * 1. Global Page Preloader
 */
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  };

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 400);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 400);
    });
  }

  // Safety fallback if load event is delayed
  setTimeout(hidePreloader, 2000);
}

/**
 * 2. Sticky Navbar Blur & Shadow on Scroll
 */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 3. Mobile Navigation Drawer & Hamburger Toggle
 */
function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close, #mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileOverlay) return;

  const toggleMenu = () => {
    const isOpen = !mobileOverlay.classList.contains('open');
    if (hamburger) hamburger.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (hamburger) hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  const closeMenu = () => {
    if (hamburger) hamburger.classList.remove('active');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside of links/content
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      closeMenu();
    }
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 4. Desktop Modern Custom Cursor (Dot & Smooth Trailing Halo)
 */
function initCustomCursor() {
  // Check if device supports fine hover pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  document.body.classList.add('has-custom-cursor');

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth lerp trailing loop for the ring
  const renderCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Expand ring when hovering interactive elements
  const hoverTargets = 'a, button, input, textarea, select, .project-card, .service-card, .team-card, .filter-btn, .faq-header';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('hovered');
    }
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/**
 * 5. Floating Back-to-Top Button
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 6. Automatically Highlight Current Page in Navigation
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 7. Fast Smooth Page Transitions
 */
function initPageTransitions() {
  const curtain = document.createElement('div');
  curtain.className = 'page-transition-curtain';
  document.body.appendChild(curtain);

  const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Don't transition if same page
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      if (href === currentPath) return;

      e.preventDefault();
      curtain.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });
}

/**
 * 8. Dynamic Multi-Language Hero Code Cycler (10-Second Interval)
 */
function initCodeBoxCycler() {
  const codeBox = document.getElementById('hero-code-box');
  const codeBlock = document.getElementById('dynamic-code-block');
  const filenameEl = document.getElementById('terminal-filename');
  const progressBar = document.getElementById('code-progress-bar');
  const tabs = document.querySelectorAll('.code-tab');
  const copyBtn = document.getElementById('code-copy-btn');

  if (!codeBox || !codeBlock) return;

  const codeSnippets = [
    {
      lang: "Next.js",
      file: "app/api/stream/route.ts",
      raw: `// Next.js 15 Server-Sent Edge Stream
import { NextRequest, NextResponse } from 'next/server';
import { NextZenifyAI } from '@nextzenify/sdk';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const stream = await NextZenifyAI.streamInference({
    model: 'zenify-ultra-v4',
    input: prompt,
    latencyTargetMs: 12
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}`,
      code: `<code><span class="code-comment">// Next.js 15 Server-Sent Edge Stream</span>
<span class="code-keyword">import</span> { <span class="code-func">NextRequest</span>, <span class="code-func">NextResponse</span> } <span class="code-keyword">from</span> <span class="code-string">'next/server'</span>;
<span class="code-keyword">import</span> { <span class="code-func">NextZenifyAI</span> } <span class="code-keyword">from</span> <span class="code-string">'@nextzenify/sdk'</span>;

<span class="code-keyword">export const</span> <span class="code-prop">runtime</span> = <span class="code-string">'edge'</span>;

<span class="code-keyword">export async function</span> <span class="code-func">POST</span>(req: <span class="code-func">NextRequest</span>) {
  <span class="code-keyword">const</span> { prompt } = <span class="code-keyword">await</span> req.<span class="code-func">json</span>();
  <span class="code-keyword">const</span> stream = <span class="code-keyword">await</span> <span class="code-func">NextZenifyAI</span>.<span class="code-func">streamInference</span>({
    <span class="code-prop">model</span>: <span class="code-string">'zenify-ultra-v4'</span>,
    <span class="code-prop">input</span>: prompt,
    <span class="code-prop">latencyTargetMs</span>: <span class="code-number">12</span>
  });

  <span class="code-keyword">return new</span> <span class="code-func">Response</span>(stream, {
    <span class="code-prop">headers</span>: { <span class="code-string">'Content-Type'</span>: <span class="code-string">'text/event-stream'</span> }
  });
}</code>`
    },
    {
      lang: "React",
      file: "useNextZenify.tsx",
      raw: `// Reactive Real-Time SaaS Hook
import { useState, useEffect } from 'react';
import { connectCluster } from '@nextzenify/client';

export function useZenifySync(clusterId: string) {
  const [state, setState] = useState({ synced: false, fps: 120 });

  useEffect(() => {
    const channel = connectCluster(clusterId);
    channel.on('telemetry', data => setState(data));
    return () => channel.disconnect();
  }, [clusterId]);

  return { state, status: 'optimal' };
}`,
      code: `<code><span class="code-comment">// Reactive Real-Time SaaS Hook</span>
<span class="code-keyword">import</span> { <span class="code-func">useState</span>, <span class="code-func">useEffect</span> } <span class="code-keyword">from</span> <span class="code-string">'react'</span>;
<span class="code-keyword">import</span> { <span class="code-func">connectCluster</span> } <span class="code-keyword">from</span> <span class="code-string">'@nextzenify/client'</span>;

<span class="code-keyword">export function</span> <span class="code-func">useZenifySync</span>(clusterId: <span class="code-func">string</span>) {
  <span class="code-keyword">const</span> [state, setState] = <span class="code-func">useState</span>({ <span class="code-prop">synced</span>: <span class="code-keyword">false</span>, <span class="code-prop">fps</span>: <span class="code-number">120</span> });

  <span class="code-func">useEffect</span>(() => {
    <span class="code-keyword">const</span> channel = <span class="code-func">connectCluster</span>(clusterId);
    channel.<span class="code-func">on</span>(<span class="code-string">'telemetry'</span>, data => setState(data));
    <span class="code-keyword">return</span> () => channel.<span class="code-func">disconnect</span>();
  }, [clusterId]);

  <span class="code-keyword">return</span> { state, <span class="code-prop">status</span>: <span class="code-string">'optimal'</span> };
}</code>`
    },
    {
      lang: "JavaScript",
      file: "nextzenify-core.js",
      raw: `// High-Concurrency ES6+ Engine
import { WorkerPool, MemoryVault } from 'nextzenify';

class CorePipeline {
  #pool = new WorkerPool({ concurrency: 16 });
  #vault = new MemoryVault({ encrypt: true });

  async processTransactions(batch) {
    const verified = await this.#pool.map(batch, async tx => {
      const hash = await this.#vault.sign(tx);
      return { ...tx, hash, status: 'verified' };
    });
    return verified;
  }
}`,
      code: `<code><span class="code-comment">// High-Concurrency ES6+ Engine</span>
<span class="code-keyword">import</span> { <span class="code-func">WorkerPool</span>, <span class="code-func">MemoryVault</span> } <span class="code-keyword">from</span> <span class="code-string">'nextzenify'</span>;

<span class="code-keyword">class</span> <span class="code-func">CorePipeline</span> {
  #pool = <span class="code-keyword">new</span> <span class="code-func">WorkerPool</span>({ <span class="code-prop">concurrency</span>: <span class="code-number">16</span> });
  #vault = <span class="code-keyword">new</span> <span class="code-func">MemoryVault</span>({ <span class="code-prop">encrypt</span>: <span class="code-keyword">true</span> });

  <span class="code-keyword">async</span> <span class="code-func">processTransactions</span>(batch) {
    <span class="code-keyword">const</span> verified = <span class="code-keyword">await</span> <span class="code-keyword">this</span>.#pool.<span class="code-func">map</span>(batch, <span class="code-func">async</span> tx => {
      <span class="code-keyword">const</span> hash = <span class="code-keyword">await</span> <span class="code-keyword">this</span>.#vault.<span class="code-func">sign</span>(tx);
      <span class="code-keyword">return</span> { ...tx, hash, <span class="code-prop">status</span>: <span class="code-string">'verified'</span> };
    });
    <span class="code-keyword">return</span> verified;
  }
}</code>`
    },
    {
      lang: "Node.js",
      file: "server.js",
      raw: `// Distributed Node.js Microservice
const express = require('express');
const { createGateway } = require('@nextzenify/gateway');

const app = express();
const gateway = createGateway({
  rateLimitPerSec: 50000,
  circuitBreaker: true
});

app.use(gateway.middleware());
app.get('/api/health', (req, res) => {
  res.json({ status: '200 OK', nodes: 64 });
});
app.listen(8080);`,
      code: `<code><span class="code-comment">// Distributed Node.js Microservice</span>
<span class="code-keyword">const</span> express = <span class="code-func">require</span>(<span class="code-string">'express'</span>);
<span class="code-keyword">const</span> { <span class="code-func">createGateway</span> } = <span class="code-func">require</span>(<span class="code-string">'@nextzenify/gateway'</span>);

<span class="code-keyword">const</span> app = <span class="code-func">express</span>();
<span class="code-keyword">const</span> gateway = <span class="code-func">createGateway</span>({
  <span class="code-prop">rateLimitPerSec</span>: <span class="code-number">50000</span>,
  <span class="code-prop">circuitBreaker</span>: <span class="code-keyword">true</span>
});

app.<span class="code-func">use</span>(gateway.<span class="code-func">middleware</span>());
app.<span class="code-func">get</span>(<span class="code-string">'/api/health'</span>, (req, res) => {
  res.<span class="code-func">json</span>({ <span class="code-prop">status</span>: <span class="code-string">'200 OK'</span>, <span class="code-prop">nodes</span>: <span class="code-number">64</span> });
});
app.<span class="code-func">listen</span>(<span class="code-number">8080</span>);</code>`
    },
    {
      lang: "Python AI",
      file: "ai_orchestrator.py",
      raw: `# NextZenify Autonomous AI Agent
from nextzenify.ai import NeuralCluster, VectorStore
import asyncio

async def deploy_agent(intent: str) -> dict:
    cluster = NeuralCluster(model="zenify-gemini-3")
    memory = VectorStore(dimension=1536)
    
    context = await memory.query_hybrid(intent, top_k=5)
    decision = await cluster.reason(intent, context)
    return {"status": "executed", "result": decision}`,
      code: `<code><span class="code-comment"># NextZenify Autonomous AI Agent</span>
<span class="code-keyword">from</span> nextzenify.ai <span class="code-keyword">import</span> <span class="code-func">NeuralCluster</span>, <span class="code-func">VectorStore</span>
<span class="code-keyword">import</span> asyncio

<span class="code-keyword">async def</span> <span class="code-func">deploy_agent</span>(intent: <span class="code-func">str</span>) -> <span class="code-func">dict</span>:
    cluster = <span class="code-func">NeuralCluster</span>(model=<span class="code-string">"zenify-gemini-3"</span>)
    memory = <span class="code-func">VectorStore</span>(dimension=<span class="code-number">1536</span>)
    
    context = <span class="code-keyword">await</span> memory.<span class="code-func">query_hybrid</span>(intent, top_k=<span class="code-number">5</span>)
    decision = <span class="code-keyword">await</span> cluster.<span class="code-func">reason</span>(intent, context)
    <span class="code-keyword">return</span> {<span class="code-string">"status"</span>: <span class="code-string">"executed"</span>, <span class="code-string">"result"</span>: decision}</code>`
    }
  ];

  let currentIndex = 0;
  const cycleDurationMs = 10000; // 10 seconds per snippet
  const tickIntervalMs = 50;
  let elapsedMs = 0;
  let isPaused = false;
  let timerId = null;

  const renderSnippet = (index, animated = true) => {
    const item = codeSnippets[index];
    if (!item) return;

    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    if (animated) {
      codeBlock.classList.add('fade-out');
      setTimeout(() => {
        if (filenameEl) filenameEl.textContent = item.file;
        codeBlock.innerHTML = item.code;
        codeBlock.classList.remove('fade-out');
      }, 150);
    } else {
      if (filenameEl) filenameEl.textContent = item.file;
      codeBlock.innerHTML = item.code;
    }
  };

  const startTimer = () => {
    if (timerId) clearInterval(timerId);

    timerId = setInterval(() => {
      if (!isPaused) {
        elapsedMs += tickIntervalMs;
        const progressPercent = Math.min((elapsedMs / cycleDurationMs) * 100, 100);

        if (progressBar) {
          progressBar.style.width = `${progressPercent}%`;
        }

        if (elapsedMs >= cycleDurationMs) {
          elapsedMs = 0;
          currentIndex = (currentIndex + 1) % codeSnippets.length;
          renderSnippet(currentIndex, true);
        }
      }
    }, tickIntervalMs);
  };

  // Tab button click events
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      currentIndex = i;
      elapsedMs = 0;
      if (progressBar) progressBar.style.width = '0%';
      renderSnippet(currentIndex, true);
    });
  });

  // Pause cycle on mouse hover
  codeBox.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  codeBox.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  // Copy Code to Clipboard button
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const currentSnippet = codeSnippets[currentIndex];
      if (!currentSnippet) return;

      try {
        await navigator.clipboard.writeText(currentSnippet.raw);
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  }

  // Initial setup
  renderSnippet(0, false);
  startTimer();
}

/**
 * 10. Modern Dark / Light Mode Theme Switching Engine
 */
function initThemeToggle() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('nextzenify-theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  // Resolve initial theme
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  setTheme(initialTheme, false);

  // Attach click listener to all theme buttons across desktop navbar and mobile drawer
  const toggleButtons = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle-btn, .theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme, true);
    });
  });

  // OS theme change listener (if not manually overridden)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('nextzenify-theme')) {
        setTheme(e.matches ? 'light' : 'dark', false);
      }
    });
  }
}

function setTheme(theme, save = true) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (save) {
    localStorage.setItem('nextzenify-theme', theme);
  }

  // Switch Brand Logo dynamically for active theme
  const navLogos = document.querySelectorAll('.nav-brand img');
  navLogos.forEach(img => {
    img.src = theme === 'light' ? 'images/logo/logo-light.svg' : 'images/logo/logo.svg';
  });

  // Update mobile drawer button label if present
  const mobileLabel = document.querySelector('.mobile-theme-btn .theme-label');
  if (mobileLabel) {
    mobileLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  // Update button titles and ARIA labels
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    const targetMode = theme === 'dark' ? 'Light' : 'Dark';
    btn.setAttribute('aria-label', `Switch to ${targetMode} Mode`);
    btn.setAttribute('title', `Switch to ${targetMode} Mode`);
  });
}

