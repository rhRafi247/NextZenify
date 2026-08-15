/**
 * ==========================================================================
 * NEXTZENIFY TECHNOLOGIES - PROJECTS MODULE (PROJECTS.JS)
 * Portfolio Category Filtering, Transitions, Interactive Modal Details
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initProjectModal();
});

/**
 * 1. Project Category Filtering with Smooth CSS Transitions
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 2. Interactive Project Detail Modal
 */
const projectData = {
  'project-1': {
    title: 'CloudScale SaaS Cloud Platform',
    category: 'Software / Cloud',
    image: 'images/projects/project-1.svg',
    description: 'An enterprise-tier multi-tenant cloud orchestration platform providing automated cluster provisioning, real-time telemetry monitoring, and microsecond latency routing across hybrid cloud environments.',
    techs: ['Node.js', 'Go', 'Kubernetes', 'GraphQL', 'Docker', 'AWS'],
    stats: [
      { label: 'Cloud Uptime', value: '99.99%' },
      { label: 'Active Clusters', value: '1,420+' },
      { label: 'Throughput', value: '4.8 GB/s' }
    ],
    client: 'Global FinTech Consortium',
    year: '2025'
  },
  'project-2': {
    title: 'NexPay Fintech Mobile & Web Gateway',
    category: 'Web / Fintech',
    image: 'images/projects/project-2.svg',
    description: 'A PCI-DSS Level 1 certified payment orchestrator enabling seamless fiat-to-digital settlements, real-time fraud mitigation, and zero-latency global payouts across 140+ countries.',
    techs: ['TypeScript', 'React', 'Python', 'PostgreSQL', 'Redis', 'Stripe API'],
    stats: [
      { label: 'Transaction Speed', value: '120ms' },
      { label: 'Fraud Detection', value: '99.98%' },
      { label: 'Annual Volume', value: '$840M+' }
    ],
    client: 'NexPay Global Ltd',
    year: '2025'
  },
  'project-3': {
    title: 'Apex AI Neural Analytics Suite',
    category: 'Software / AI',
    image: 'images/projects/project-3.svg',
    description: 'A state-of-the-art predictive analytics platform leveraging deep neural networks and real-time streaming pipelines to predict supply chain disruptions before they manifest.',
    techs: ['Python', 'PyTorch', 'FastAPI', 'Apache Kafka', 'Next.js', 'CUDA'],
    stats: [
      { label: 'Inference Latency', value: '14ms' },
      { label: 'Prediction Accuracy', value: '98.6%' },
      { label: 'Tokens Processed', value: '1.2M/s' }
    ],
    client: 'Apex Global Logistics',
    year: '2026'
  },
  'project-4': {
    title: 'MediSync Telehealth & Diagnostics',
    category: 'Web / HealthTech',
    image: 'images/projects/project-4.svg',
    description: 'HIPAA-compliant telemedicine portal offering encrypted HD video consultations, automated EHR synchronization, and smart wearable biometric telemetry visualization.',
    techs: ['WebRTC', 'Vue.js', 'Node.js', 'MongoDB', 'Docker', 'FHIR API'],
    stats: [
      { label: 'HIPAA Standard', value: '100% Valid' },
      { label: 'Active Patients', value: '250,000+' },
      { label: 'Consultation Rating', value: '4.98 / 5' }
    ],
    client: 'MediSync Health Alliance',
    year: '2025'
  },
  'project-5': {
    title: 'Velocity High-Performance E-Commerce',
    category: 'E-commerce',
    image: 'images/projects/project-5.svg',
    description: 'Headless e-commerce infrastructure built for extreme flash-sale traffic spikes, supporting sub-second page loads, real-time inventory locking, and unified multi-warehouse fulfillment.',
    techs: ['Shopify Plus', 'Next.js', 'GraphQL', 'Algolia', 'Tailwind', 'Stripe'],
    stats: [
      { label: 'Conversion Lift', value: '+42.8%' },
      { label: 'Page Load Speed', value: '0.42s' },
      { label: 'Peak Capacity', value: '100k QPS' }
    ],
    client: 'Velocity Apparel Global',
    year: '2025'
  },
  'project-6': {
    title: 'CyberShield SecOps & Threat Intelligence',
    category: 'Software / Security',
    image: 'images/projects/project-6.svg',
    description: 'Automated cybersecurity threat hunting and SIEM dashboard with AI-driven attack signature analysis, distributed honeypot sensors, and instant containment protocols.',
    techs: ['Rust', 'Python', 'ElasticSearch', 'Kibana', 'Go', 'ZeroTrust'],
    stats: [
      { label: 'Attacks Blocked', value: '4.2M/day' },
      { label: 'False Positives', value: '< 0.01%' },
      { label: 'Mean Time to Detect', value: '1.2s' }
    ],
    client: 'CyberShield Defense Corp',
    year: '2026'
  },
  'project-7': {
    title: 'NovaFlow Enterprise Workflow CRM',
    category: 'Software / SaaS',
    image: 'images/projects/project-7.svg',
    description: 'An all-in-one customizable enterprise operating system with visual flow builders, multi-channel lead tracking, team workload automation, and SLA monitoring.',
    techs: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'AWS'],
    stats: [
      { label: 'Time Saved / Week', value: '18 hrs' },
      { label: 'Workflow Runs', value: '5M+/mo' },
      { label: 'Team Adoption', value: '99.4%' }
    ],
    client: 'NovaFlow International',
    year: '2025'
  },
  'project-8': {
    title: 'LuxeBrand 3D Luxury Shopping Portal',
    category: 'UI/UX / E-commerce',
    image: 'images/projects/project-8.svg',
    description: 'An immersive WebGL 3D product customizer allowing luxury jewelry buyers to inspect diamond clarity, customize metals in 4K resolution, and try on products via augmented reality.',
    techs: ['Three.js', 'WebGL', 'GSAP', 'HTML5 Canvas', 'Tailwind', 'Blender'],
    stats: [
      { label: 'Frame Rate', value: '60 FPS 4K' },
      { label: 'User Engagement', value: '4.5 mins' },
      { label: 'Return Rate Drop', value: '-35%' }
    ],
    client: 'LuxeBrand Haute Joaillerie',
    year: '2026'
  },
  'project-9': {
    title: 'OmniCart Multi-Vendor Marketplace',
    category: 'E-commerce / Web',
    image: 'images/projects/project-9.svg',
    description: 'A global multi-seller marketplace platform featuring localized multi-currency checkouts, vendor commission split engines, automated tax computation, and global courier integrations.',
    techs: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe Connect', 'Docker', 'Redis'],
    stats: [
      { label: 'Active Sellers', value: '12,500+' },
      { label: 'Currencies', value: '135 Supported' },
      { label: 'GMV Processed', value: '$180M+' }
    ],
    client: 'OmniCart Global Network',
    year: '2025'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');
  const viewBtns = document.querySelectorAll('.btn-view-project');

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    // Fill modal fields
    const modalImg = modalOverlay.querySelector('.modal-project-img');
    const modalCat = modalOverlay.querySelector('.modal-project-cat');
    const modalTitle = modalOverlay.querySelector('.modal-project-title');
    const modalDesc = modalOverlay.querySelector('.modal-project-desc');
    const modalTechs = modalOverlay.querySelector('.modal-project-techs');
    const modalStats = modalOverlay.querySelector('.modal-project-stats');
    const modalClient = modalOverlay.querySelector('.modal-project-client');

    if (modalImg) modalImg.src = data.image;
    if (modalCat) modalCat.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalClient) modalClient.textContent = `${data.client} (${data.year})`;

    if (modalTechs) {
      modalTechs.innerHTML = data.techs
        .map(t => `<span class="tech-tag">${t}</span>`)
        .join('');
    }

    if (modalStats) {
      modalStats.innerHTML = data.stats
        .map(s => `
          <div class="stat-card" style="padding: 16px;">
            <h4 style="color: var(--accent-cyan); font-size: 1.4rem;">${s.value}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted);">${s.label}</p>
          </div>
        `)
        .join('');
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}
