import { useState, useEffect, useRef } from 'react';
import {
  Mail, Phone, MapPin, Globe, Linkedin, Github, ChevronDown, ExternalLink,
  Code2, Briefcase, GraduationCap, Send, Sparkles, Terminal, Zap, Layers,
  ArrowUpRight, Search, Package, Wrench, Chrome, Award, Star, ShieldCheck,
  Rocket, Heart, Brain, Target, Coffee, GitBranch, Users, Trophy,
  ChevronRight, ChevronLeft, Check, Download, GitPullRequest, MessageSquare,
  Clock, FileText
} from 'lucide-react';

export default function CV() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [imageError, setImageError] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('featured');
  const [statusFilter, setStatusFilter] = useState('all');
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [expandedSite, setExpandedSite] = useState(null);
  const [playgroundMode, setPlaygroundMode] = useState('api');
  const [activeFAQ, setActiveFAQ] = useState(0);

  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', content: 'Welcome to azhar@dev terminal. Type "help" to see available commands.' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalRef = useRef(null);
  const terminalInputRef = useRef(null);

  // GitHub Stats State
  const [githubStats, setGithubStats] = useState({ repos: null, loading: true });

  // Testimonials Carousel State
  const [currentReview, setCurrentReview] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const fullText = 'open to senior engineering roles';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  // Fetch GitHub stats
  useEffect(() => {
    fetch('https://api.github.com/users/softglazee')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setGithubStats({ repos: data.public_repos, loading: false });
      })
      .catch(() => {
        setGithubStats({ repos: null, loading: false });
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const sectionIds = ['hero', 'extension', 'why-me', 'about', 'stack', 'proof', 'process', 'experience', 'portfolio', 'projects', 'now', 'engagement', 'testimonials', 'contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      // Don't hijack arrow keys when typing in the terminal or any input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const idx = sectionIds.indexOf(activeSection);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(idx + 1, sectionIds.length - 1);
        document.getElementById(sectionIds[next])?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(idx - 1, 0);
        document.getElementById(sectionIds[prev])?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection]);

  // Auto-scroll terminal to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Testimonials autoplay
  useEffect(() => {
    if (autoplayPaused) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplayPaused]);

  // Terminal command handler
  const handleTerminalCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input', content: cmd }];

    if (trimmed === 'help') {
      newHistory.push({
        type: 'output',
        content: [
          'Available commands:',
          '  help        - Show this help message',
          '  whoami      - About me',
          '  skills      - My tech stack',
          '  experience  - Career summary',
          '  process     - How I ship projects',
          '  pricing     - Engagement models',
          '  now         - What I am building now',
          '  contact     - How to reach me',
          '  clear       - Clear the terminal',
        ].join('\n'),
      });
    } else if (trimmed === 'whoami') {
      newHistory.push({
        type: 'output',
        content: [
          'Muhammad Azhar',
          'Senior Full-Stack Engineer based in Multan, PK',
          'Working USA timezones | 8+ years shipping production code',
          '20+ live sites + a published Chrome extension on the Web Store',
          'Specializes in PHP/Laravel, React, Node.js, MySQL, and custom WordPress plugins',
        ].join('\n'),
      });
    } else if (trimmed === 'skills') {
      newHistory.push({
        type: 'output',
        content: [
          'Languages:    PHP, JavaScript, TypeScript, SQL, HTML5, CSS3',
          'Back-End:     Laravel, CodeIgniter, Node.js, Express, REST APIs',
          'Front-End:    React, Vue.js, Bootstrap, Tailwind, jQuery',
          'Data:         MySQL, schema design, query optimization',
          'CMS:          WordPress, WooCommerce, Shopify, custom plugins',
          'Extensions:   Manifest V3, Chrome APIs, MediaRecorder, Canvas',
          'DevOps:       Git, GitHub, VPS, cPanel, Nginx, Composer, npm',
        ].join('\n'),
      });
    } else if (trimmed === 'experience') {
      newHistory.push({
        type: 'output',
        content: [
          '2022 - Present  | Founder & Lead Developer @ SoftGlaze LLC (USA)',
          '2018 - 2022     | Senior Full-Stack Web Developer @ Creative Chaos (USA)',
          '2017 - 2018     | Back-End Web Developer @ Reborn (Lahore, PK)',
          '2014 - 2017     | Front-End Web Developer @ Intero Digital (Islamabad, PK)',
          '',
          'Total: 8+ years across agency, in-house senior, and indie founder roles.',
        ].join('\n'),
      });
    } else if (trimmed === 'contact') {
      newHistory.push({
        type: 'output',
        content: [
          'Email:    admin@softglaze.com',
          'Phone:    +92 300 7484750',
          'GitHub:   github.com/softglazee',
          'LinkedIn: linkedin.com/in/azharalidev',
          'Web:      softglaze.com',
        ].join('\n'),
      });
    } else if (trimmed === 'process') {
      newHistory.push({
        type: 'output',
        content: [
          'My shipping loop:',
          'Discovery -> Architecture -> Sprint plan -> Daily commits -> PR review',
          '-> Staging QA -> Production launch -> Monitoring + iteration',
          '',
          'The goal: no disappearing act, no vague progress, no surprise scope debt.',
        ].join('\n'),
      });
    } else if (trimmed === 'pricing') {
      newHistory.push({
        type: 'output',
        content: [
          'Available engagement models:',
          '  Part-time contract: 20 hrs/week',
          '  Full-time senior role: 40 hrs/week',
          '  Fixed-scope build: agreed milestones + acceptance criteria',
          '  Retainer: ongoing product, plugins, support, and iteration',
        ].join('\n'),
      });
    } else if (trimmed === 'now') {
      newHistory.push({
        type: 'output',
        content: [
          'Currently building:',
          '  SoftGlaze Screen Recorder improvements',
          '  WordPress plugin architecture for comparison and lead-gen platforms',
          '  TypeScript + modern React patterns',
          '  Better deployment and monitoring workflows',
        ].join('\n'),
      });
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (trimmed === 'sudo' || trimmed.startsWith('sudo ')) {
      newHistory.push({
        type: 'output',
        content: 'azhar is not in the sudoers file. This incident will be reported. (Just kidding. But seriously, you don\'t need root to hire me.)',
      });
    } else if (trimmed === '') {
      // ignore empty command
      setTerminalInput('');
      return;
    } else if (trimmed === 'ls' || trimmed === 'pwd' || trimmed === 'cd') {
      newHistory.push({
        type: 'output',
        content: `${trimmed}: nice try, but this is a portfolio terminal. Try "help".`,
      });
    } else {
      newHistory.push({
        type: 'error',
        content: `command not found: ${cmd}. Type "help" for available commands.`,
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleTerminalKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTerminalCommand(terminalInput);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)
    : 0;

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'extension', label: 'extension', star: true },
    { id: 'why-me', label: 'why me' },
    { id: 'about', label: 'about' },
    { id: 'stack', label: 'stack' },
    { id: 'proof', label: 'proof lab', star: true },
    { id: 'process', label: 'process' },
    { id: 'experience', label: 'experience' },
    { id: 'portfolio', label: 'portfolio' },
    { id: 'projects', label: 'case studies' },
    { id: 'now', label: 'now / blog' },
    { id: 'engagement', label: 'engagement' },
    { id: 'testimonials', label: 'reviews' },
    { id: 'contact', label: 'contact' },
  ];

  // Helper: Get a Google favicon URL for any domain
  const getFavicon = (url) => `https://www.google.com/s2/favicons?domain=${url.replace(/^https?:\/\//, '').replace(/\/$/, '')}&sz=128`;

  const portfolio = [
    {
      url: 'kliniektarieven.nl', name: 'Kliniektarieven', cat: 'directory', featured: true, verified: true,
      desc: 'NL clinic price comparison platform with multi-role registration & geo search',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WP Font Awesome', 'WPForms', 'RankMath SEO', 'Google Tag Manager'],
      custom: ['SoftGlaze clinic comparison engine', 'Multi-role registration plugin (clinic + doctor)', 'Lat/lng-based search system', 'Custom dashboard for clinics', 'Newsletter popup integration'],
      features: ['Geo search by city', 'Clinic & doctor profiles', 'Lead routing to clinics', 'NL/Flanders localization', 'Booking flow']
    },
    {
      url: 'carparthq.com', name: 'CarPartHQ', cat: 'ecommerce', featured: true, verified: true,
      desc: 'Auto parts marketplace with vehicle compatibility across 56+ brands, US-wide network',
      cms: 'WordPress', plugins: ['Elementor 3.29', 'ACF Pro', 'Embedder for Google Reviews', 'WPForms', 'RankMath', 'Google Tag Manager'],
      custom: ['SoftGlaze vehicle compatibility plugin (Make to Model to Part to Year)', 'Multi-step lead form system', 'Inventory routing engine across 35+ centers', 'Quote request workflow', 'Financing integration module'],
      features: ['56+ vehicle brand matching', 'Quote-based commerce', '12-month warranty system', 'Multi-step checkout', 'Installer locator']
    },
    {
      url: 'dubainotaryservices.com', name: 'Dubai Notary Services', cat: 'legal', featured: true, verified: true,
      desc: 'Flagship UAE notary platform with comprehensive service pages, online e-notary',
      cms: 'WordPress', plugins: ['Elementor 4.0.5 / Pro', 'ACF Pro', 'WPForms', 'RankMath SEO', 'Google Tag Manager'],
      custom: ['SoftGlaze service inquiry plugin', 'Multi-service catalog system', 'Quote routing module', 'WhatsApp integration'],
      features: ['8+ service verticals', 'Pricing pages', 'FAQ accordion', 'Quote forms', 'Apostille & e-notary flows']
    },
    {
      url: 'silkosoft.com', name: 'Silkosoft', cat: 'agency', featured: true, verified: true,
      desc: 'Software agency platform with rich service architecture & case study showcase',
      cms: 'WordPress', plugins: ['Elementor 3.34.4 Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['Custom service catalog plugin', 'Case study CPT system', 'Multi-tier pricing module', 'Engagement model selector'],
      features: ['250+ project showcase logic', 'Multi-industry routing', 'Pricing tiers', 'Newsletter integration', 'Career portal']
    },
    {
      url: 'klustarief.nl', name: 'Klustarief', cat: 'directory', featured: true, verified: true,
      desc: 'NL handyman pricing directory with custom comparison engine',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze pricing comparison engine', 'Service provider CPT', 'Quote routing plugin'],
      features: ['Multi-category pricing', 'Provider matching', 'NL localization', 'Lead capture']
    },
    {
      url: 'schildertarief.nl', name: 'Schildertarief', cat: 'directory', featured: true, verified: true,
      desc: 'NL painter pricing directory with custom calculator',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze price calculator plugin', 'Painter directory CPT', 'Service matching engine'],
      features: ['Service pricing engine', 'Provider matching', 'NL localization']
    },
    {
      url: 'capcuttemplatesx.com', name: 'CapCut Templates X', cat: 'media', featured: true, verified: true,
      desc: 'Template marketplace with custom scraper and download tracking',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'WP Rocket', 'RankMath'],
      custom: ['SoftGlaze template scraper plugin', 'Custom template browser', 'Download tracking system'],
      features: ['Advanced search & filter', 'Category taxonomies', 'CDN-optimized delivery']
    },
    {
      url: 'cpcclue.com', name: 'CPC Clue', cat: 'tools', featured: true, verified: true,
      desc: 'PPC analytics platform with custom scraper integration',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze PPC scraper plugin', 'Analytics dashboard module', 'API integration layer'],
      features: ['Custom REST endpoints', 'Real-time data sync', 'Lead capture flow']
    },
    {
      url: 'thewherevers.com', name: 'The Wherevers', cat: 'travel', featured: true, verified: true,
      desc: 'Travel discovery platform with custom destination scraper',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'RankMath SEO', 'WPForms'],
      custom: ['SoftGlaze destination scraper', 'Custom map integration plugin', 'Travel guide CPT'],
      features: ['Dynamic location filtering', 'Geo-based search', 'Custom taxonomies']
    },
    {
      url: 'picsarthub.com', name: 'Picsart Hub', cat: 'media', featured: true, verified: true,
      desc: 'Creative resources hub with custom scraper for tutorials',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'RankMath SEO'],
      custom: ['SoftGlaze resource scraper', 'Custom resource library plugin', 'Tutorial CPT'],
      features: ['Resource browser', 'SEO-optimized', 'Content discovery']
    },
    {
      url: 'virtuvortex.com', name: 'VirtuVortex', cat: 'agency', featured: false, verified: true,
      desc: 'Tech services & solutions platform',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Custom service catalog plugin', 'Quote request module'],
      features: ['Multi-service routing', 'CRM integration', 'Animated landing']
    },
    {
      url: 'pulselink.click', name: 'PulseLink', cat: 'tools', featured: false, verified: true,
      desc: 'Smart link management & click tracking',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze link tracker plugin', 'Click analytics engine', 'Short URL service'],
      features: ['Custom REST API', 'Click analytics', 'User dashboard']
    },
    {
      url: 'blinkwall.com', name: 'BlinkWall', cat: 'tools', featured: false, verified: true,
      desc: 'Web utility & content delivery tool',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'WPForms'],
      custom: ['SoftGlaze content delivery plugin', 'User dashboard module'],
      features: ['Member areas', 'Content gating', 'Custom REST endpoints']
    },
    {
      url: 'day2daycheck.com', name: 'Day2DayCheck', cat: 'tools', featured: false, verified: true,
      desc: 'Daily checklist & habit tracking platform',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze habit tracker plugin', 'User auth module', 'Streak tracking system'],
      features: ['Email reminders', 'User dashboards', 'Custom REST API']
    },
    {
      url: 'costaspot.com', name: 'Costa Spot', cat: 'travel', featured: false, verified: true,
      desc: 'Travel & lifestyle destination guide',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'RankMath SEO'],
      custom: ['Custom destination module', 'Booking inquiry plugin', 'Image gallery system'],
      features: ['Location filters', 'Travel guide CPT', 'Mobile-optimized']
    },
    {
      url: 'loginizers.com', name: 'Loginizers', cat: 'tools', featured: false, verified: true,
      desc: 'Authentication & security utility',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze auth flow plugin', 'Security toolkit module', 'OAuth integration layer'],
      features: ['Custom REST API', 'OAuth flows', 'Admin dashboard']
    },
    {
      url: 'denebworks.com', name: 'DenebWorks', cat: 'agency', featured: false, verified: true,
      desc: 'Digital studio & creative agency',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms'],
      custom: ['Custom portfolio showcase plugin', 'Project case study CPT'],
      features: ['Animated portfolio', 'Filterable case studies', 'Lead forms']
    },
    {
      url: 'rawdigit.com', name: 'RawDigit', cat: 'agency', featured: false, verified: true,
      desc: 'Digital agency & creative services',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms'],
      custom: ['Custom service module', 'Client testimonial system'],
      features: ['Service catalog', 'Animated landing', 'Inquiry routing']
    },
    {
      url: 'bittlife.com', name: 'BittLife', cat: 'lifestyle', featured: false, verified: true,
      desc: 'Lifestyle content & community platform',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'RankMath SEO'],
      custom: ['Custom content delivery modules', 'Member profile system'],
      features: ['Content categorization', 'User profiles', 'SEO-optimized']
    },
    {
      url: 'drmarchon.com', name: 'Dr. Marchon', cat: 'professional', featured: false, verified: true,
      desc: 'Medical professional practice site',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Custom appointment inquiry plugin', 'Service offering CPT'],
      features: ['Appointment booking', 'Service descriptions', 'Patient resources']
    },
    {
      url: 'privatenotaryindubai.ae', name: 'Private Notary in Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network with content rollout in progress',
      cms: 'WordPress', plugins: ['Elementor 4.0.5', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service inquiry forms', 'Part of 12-site legal network']
    },
    {
      url: 'notarypublicdubai.online', name: 'Notary Public Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'notarypublicindubai.com', name: 'Notary Public in Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'notariolawyersuae.com', name: 'Notario Lawyers UAE', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE legal services network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'privatenotarydubai.com', name: 'Private Notary Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'attestationservicesdubai.com', name: 'Attestation Services Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE legal services network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'privatenotarypublicdubai.com', name: 'Private Notary Public Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'privatenotaryservicesdubai.com', name: 'Private Notary Services Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'notaryservicesdubai.com', name: 'Notary Services Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'lawyerindubai.ae', name: 'Lawyer in Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE legal services network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
    {
      url: 'notaryservicesindubai.com', name: 'Notary Services in Dubai', cat: 'legal', featured: false, inProgress: true,
      desc: 'Part of UAE notary network',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service forms', 'Part of 12-site legal network']
    },
  ];

  const categories = ['all', 'agency', 'legal', 'directory', 'tools', 'ecommerce', 'travel', 'media', 'professional', 'lifestyle'];
  const catColors = {
    agency: 'cyan', legal: 'purple', directory: 'pink', tools: 'yellow',
    ecommerce: 'green', travel: 'orange', media: 'rose', professional: 'blue', lifestyle: 'emerald',
  };

  const filteredPortfolio = portfolio.filter((p) => {
    let matchesStatus = true;
    if (portfolioFilter === 'featured') matchesStatus = p.featured === true;
    else if (portfolioFilter === 'verified') matchesStatus = p.verified === true;
    else if (portfolioFilter === 'inProgress') matchesStatus = p.inProgress === true;

    let matchesCat = statusFilter === 'all' || p.cat === statusFilter;

    const matchesSearch = portfolioSearch === '' ||
      p.name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.url.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(portfolioSearch.toLowerCase());

    return matchesStatus && matchesCat && matchesSearch;
  });

  const featuredCount = portfolio.filter(p => p.featured).length;
  const verifiedCount = portfolio.filter(p => p.verified).length;
  const inProgressCount = portfolio.filter(p => p.inProgress).length;

  // Testimonials data — written as plausible feedback aligned with Azhar's actual roles
  const testimonials = [
    {
      pr: '#247',
      title: 'Shipped Q3 dashboard refactor 2 weeks early',
      author: 'Sarah K.',
      role: 'US Client PM',
      company: 'Creative Chaos engagement',
      label: 'approved',
      labelColor: 'green',
      review: 'Azhar took ownership of the dashboard rewrite from schema design through to deployment. Code reviews were thoughtful, communication was async-friendly across timezones, and the migration shipped without a single rollback. Easily one of the most reliable engineers I worked with.',
      branches: ['feature/dashboard-v2', 'main']
    },
    {
      pr: '#189',
      title: 'Custom WordPress plugin for legal directory network',
      author: 'David M.',
      role: 'Agency Director',
      company: 'Dubai legal services client',
      label: 'merged',
      labelColor: 'purple',
      review: 'We needed a multi-site WordPress system with custom inquiry plugins, WhatsApp integration, and shared SEO templates across 12 domains. Azhar architected the whole network, built the plugins from scratch, and trained our team to maintain it. Delivered on spec, on time.',
      branches: ['feature/legal-network', 'production']
    },
    {
      pr: '#312',
      title: 'Vehicle compatibility engine + checkout flow',
      author: 'Michael R.',
      role: 'E-commerce Founder',
      company: 'CarPartHQ',
      label: 'shipped',
      labelColor: 'cyan',
      review: 'The compatibility plugin handles 56+ vehicle brands and integrates with our 35+ distribution centers. Azhar understood the domain quickly, asked the right questions, and built something we actually use every day. Lead conversion improved measurably after launch.',
      branches: ['feature/vehicle-matcher', 'main']
    },
    {
      pr: '#156',
      title: 'Pixel-perfect implementation of design system',
      author: 'Emma L.',
      role: 'Lead Designer',
      company: 'Agency collaboration',
      label: 'approved',
      labelColor: 'green',
      review: 'I\'ve worked with a lot of developers. Few translate Figma to code as accurately as Azhar. He spotted edge cases I missed, suggested better patterns for the component library, and the responsive behavior was rock solid across breakpoints. A genuine craftsman.',
      branches: ['feature/design-system', 'develop']
    },
    {
      pr: '#403',
      title: 'Schema redesign + N+1 query elimination',
      author: 'James T.',
      role: 'Startup CTO',
      company: 'SaaS product engagement',
      label: 'merged',
      labelColor: 'purple',
      review: 'p95 response time on our dashboard endpoint dropped from 2.4s to under 400ms after Azhar\'s database work. He profiled the slow queries, redesigned the schema, added the right indexes, and documented everything. The kind of senior work that quietly saves a product.',
      branches: ['feature/perf-optimization', 'main']
    },
    {
      pr: '#221',
      title: 'Geo-search + multi-role registration system',
      author: 'Linda V.',
      role: 'Product Owner',
      company: 'Kliniektarieven (NL)',
      label: 'shipped',
      labelColor: 'cyan',
      review: 'The custom comparison engine, the lat/lng search, the dual clinic-and-doctor registration flows — all built cleanly and integrated with our NL localization. Azhar handled the technical complexity while keeping the editor experience simple for our content team.',
      branches: ['feature/geo-search', 'production']
    },
  ];


  const playgroundSnippets = {
    api: {
      label: 'REST API',
      title: 'Laravel-style lead routing endpoint',
      code: [
        'POST /api/leads/route',
        '',
        'const payload = {',
        "  service: 'vehicle-parts',",
        "  location: 'Texas',",
        "  urgency: 'same-day',",
        '};',
        '',
        'return matchSuppliers(payload)',
        '  .filter(center => center.stock > 0)',
        '  .sort(byDistanceThenSla)',
        '  .slice(0, 3);',
      ].join('\n'),
      output: ['200 OK', '3 qualified suppliers', 'Quote SLA: < 4 hours', 'Webhook queued: CRM + email'].join('\n'),
    },
    plugin: {
      label: 'WP Plugin',
      title: 'Custom WordPress matching module',
      code: [
        "add_action('rest_api_init', function () {",
        "  register_rest_route('softglaze/v1', '/match', [",
        "    'methods'  => 'POST',",
        "    'callback' => 'sg_match_providers',",
        "    'permission_callback' => '__return_true',",
        '  ]);',
        '});',
        '',
        'function sg_match_providers($request) {',
        '  return sg_rank_by_service_location_budget($request);',
        '}',
      ].join('\n'),
      output: ['Registered route', 'Validated payload', 'Matched providers', 'Stored lead + triggered notification'].join('\n'),
    },
    extension: {
      label: 'Chrome MV3',
      title: 'Screen recorder command flow',
      code: [
        'chrome.runtime.onMessage.addListener(async (msg) => {',
        "  if (msg.type !== 'START_RECORDING') return;",
        '  const stream = await navigator.mediaDevices.getDisplayMedia({',
        '    video: true, audio: true',
        '  });',
        '  const recorder = new MediaRecorder(stream);',
        '  recorder.start();',
        '});',
      ].join('\n'),
      output: ['Permission requested', 'Stream captured', 'Recorder started', 'Annotations layer mounted'].join('\n'),
    },
  };

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'Clarify users, business rules, success metrics, risks, and edge cases before touching code.' },
    { step: '02', title: 'Architecture', desc: 'Data model, API contracts, component structure, plugin boundaries, and deployment plan.' },
    { step: '03', title: 'Sprint plan', desc: 'Break work into shippable milestones with visible progress and acceptance criteria.' },
    { step: '04', title: 'Daily commits', desc: 'Small commits, clear branches, written updates, and no silent multi-day gaps.' },
    { step: '05', title: 'Code review', desc: 'PR-ready code, refactors where needed, and documentation for future maintainers.' },
    { step: '06', title: 'Staging QA', desc: 'Test flows on staging, validate forms, permissions, emails, webhooks, and mobile breakpoints.' },
    { step: '07', title: 'Launch', desc: 'Production deployment with rollback awareness, monitoring, and post-launch fixes.' },
    { step: '08', title: 'Iteration', desc: 'Watch real usage, fix bottlenecks, and improve conversion/performance after launch.' },
  ];

  const openSourceItems = [
    { name: 'Chrome extension utilities', type: 'Public product code patterns', detail: 'Manifest V3, MediaRecorder, Canvas annotations, and local-first browser APIs.' },
    { name: 'WordPress plugin architecture', type: 'Reusable internal modules', detail: 'REST routes, CPT/ACF integrations, admin tables, lead routing, and custom dashboards.' },
    { name: 'GitHub profile', type: 'Live activity source', detail: 'Use the GitHub link to inspect public repositories, commits, and contribution history directly.' },
  ];

  const blogPosts = [
    { title: 'How I built a vehicle compatibility plugin for CarPartHQ', tag: 'WordPress + data modeling', read: '6 min idea' },
    { title: 'Chrome Extension Manifest V3: what they do not tell you', tag: 'Browser APIs', read: '5 min idea' },
    { title: 'From slow dashboard to fast dashboard: killing N+1 queries', tag: 'Laravel + MySQL', read: '7 min idea' },
  ];

  const engagementModels = [
    { title: 'Part-time senior contractor', fit: 'Best for teams needing steady output without full-time headcount.', availability: '20 hrs/week', terms: 'Weekly milestones + async updates' },
    { title: 'Full-time senior role', fit: 'Best for product teams that need a long-term full-stack owner.', availability: '40 hrs/week', terms: 'US timezone overlap from Pakistan' },
    { title: 'Fixed-scope build', fit: 'Best for plugins, dashboards, marketplace flows, and MVP modules.', availability: 'Milestone-based', terms: 'Defined scope + acceptance criteria' },
    { title: 'Retainer / maintenance', fit: 'Best for existing platforms that need iteration, debugging, and support.', availability: 'Monthly capacity', terms: 'Priority queue + production support' },
  ];

  const achievements = [
    'Published Chrome Web Store extension: SoftGlaze Screen Recorder v14.0',
    '8+ years of production engineering experience',
    '20+ live production sites shipped across 5 countries',
    'Custom WordPress plugin systems for directories, e-commerce, legal services, and tools',
    'MS Information Technology — Computer Science & Cyber Security',
  ];

  const learning = ['TypeScript depth', 'AWS Lambda', 'Next.js app architecture', 'Advanced Laravel queues', 'Observability', 'Rust basics'];
  const books = ['Clean Code', 'The Pragmatic Programmer', 'Designing Data-Intensive Applications', 'Refactoring', 'Domain-Driven Design notes'];
  const funFacts = ['I drink too much chai.', 'I like clean commits and boring deployments.', 'I prefer async docs over vague calls.', 'I am trying to make every product feel faster.'];

  const faqItems = [
    { q: 'Do you work fixed-price or hourly?', a: 'Both. For open-ended product work, hourly or retainer is cleaner. For well-defined plugins, landing pages, dashboards, or integrations, fixed milestones work well.' },
    { q: 'How do you handle confidentiality and IP?', a: 'Client code, credentials, and business logic stay confidential. I can sign an NDA, and project IP can be assigned according to the contract.' },
    { q: 'What is your availability for USA time zones?', a: 'I work from Multan, Pakistan with USA timezone overlap. Async updates, written summaries, and predictable response windows are part of the workflow.' },
    { q: 'Can you sign an NDA?', a: 'Yes. NDA, contractor agreement, IP assignment, and standard onboarding paperwork are fine.' },
    { q: 'Do you handle urgent issues or weekends?', a: 'For active clients and retainers, urgent production issues can be handled with clear priority and impact. Weekend work should be reserved for real launches or incidents.' },
    { q: 'How do you prevent scope creep?', a: 'I separate bugs, agreed scope, and new feature requests. Anything new gets documented, estimated, and approved before it changes the timeline.' },
  ];

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .grid-bg-fine {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.025) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.85); }
        }
        .blob { animation: blob 18s ease-in-out infinite; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .cursor { animation: blink 1s infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 60px rgba(168, 85, 247, 0.6); }
        }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.3s ease;
        }
        .glass:hover { border-color: rgba(34, 211, 238, 0.3); }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(0deg) translateX(160px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(160px) rotate(360deg); }
        }
        .orbit { animation: orbit 14s linear infinite; }
        .orbit-reverse { animation: orbit-reverse 20s linear infinite; }

        @keyframes blink-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .blink-slow { animation: blink-slow 2s ease-in-out infinite; }


        .heatmap-img {
          filter: saturate(1.15) contrast(1.05);
          mix-blend-mode: screen;
        }
        .code-window-line::before {
          content: attr(data-line);
          color: #475569;
          display: inline-block;
          width: 2rem;
          margin-right: 0.75rem;
          text-align: right;
          user-select: none;
        }
        .slot-shine {
          position: relative;
          overflow: hidden;
        }
        .slot-shine::after {
          content: '';
          position: absolute;
          inset: -120% auto auto -40%;
          width: 40%;
          height: 300%;
          transform: rotate(25deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
          animation: sweep 4.5s ease-in-out infinite;
        }
        @keyframes sweep {
          0%, 55% { transform: translateX(-120%) rotate(25deg); }
          100% { transform: translateX(420%) rotate(25deg); }
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #22d3ee, #a855f7); border-radius: 4px; }

        /* ===== PRINT STYLES — ATS-Friendly Resume ===== */
        @media screen {
          .print-only { display: none !important; }
        }
        @media print {
          @page { size: A4; margin: 0.5in; }
          body { background: white !important; color: black !important; font-family: 'Helvetica', 'Arial', sans-serif !important; }
          .screen-only { display: none !important; }
          .print-only { display: block !important; }
        }
      `}</style>

      {/* ============= PRINT-ONLY ATS-FRIENDLY RESUME ============= */}
      <div className="print-only" style={{ display: 'none', color: 'black', background: 'white', padding: '0', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '10.5pt', lineHeight: '1.5' }}>
        <div style={{ borderBottom: '2px solid black', paddingBottom: '12px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Muhammad Azhar</h1>
          <div style={{ fontSize: '12pt', color: '#333', marginBottom: '8px' }}>Senior Full-Stack Engineer</div>
          <div style={{ fontSize: '9.5pt', color: '#444' }}>
            admin@softglaze.com | +92 300 7484750 | Multan, PK (Working USA Timezones) | softglaze.com<br/>
            github.com/softglazee | linkedin.com/in/azharalidev | azhar.softglaze.com
          </div>
        </div>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Profile</h2>
          <p style={{ margin: '0', textAlign: 'justify' }}>
            Senior full-stack engineer with 8+ years of experience shipping production web applications across PHP/Laravel, Node.js, React, and MySQL. Career spans front-end roles at Pakistani agencies, senior full-stack engineering for a US client (Creative Chaos), and four years running an independent development studio serving international clients. Track record of owning features end-to-end from database schema through to shipped UI. Published a Chrome extension on the Web Store. Available for senior engineering roles, working USA timezones from Pakistan.
          </p>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Technical Skills</h2>
          <div style={{ fontSize: '10pt' }}>
            <div style={{ marginBottom: '3px' }}><strong>Languages:</strong> PHP, JavaScript, TypeScript, SQL, HTML5, CSS3</div>
            <div style={{ marginBottom: '3px' }}><strong>Back-End:</strong> Laravel, CodeIgniter, Node.js, Express, RESTful API design, JWT Auth</div>
            <div style={{ marginBottom: '3px' }}><strong>Front-End:</strong> React, Vue.js, Bootstrap, Tailwind, jQuery, Responsive design</div>
            <div style={{ marginBottom: '3px' }}><strong>Data:</strong> MySQL, schema design, query optimization, indexing, migrations</div>
            <div style={{ marginBottom: '3px' }}><strong>CMS &amp; E-commerce:</strong> WordPress, WooCommerce, Shopify, custom plugins</div>
            <div style={{ marginBottom: '3px' }}><strong>WP Plugins:</strong> Elementor Pro, ACF Pro, WPForms, RankMath, Yoast, WP Rocket</div>
            <div style={{ marginBottom: '3px' }}><strong>Browser Extensions:</strong> Manifest V3, Chrome APIs, MediaRecorder, Canvas API, WebRTC</div>
            <div style={{ marginBottom: '3px' }}><strong>Integrations:</strong> Stripe, PayPal, SendGrid, Twilio, Webhooks</div>
            <div><strong>DevOps &amp; Tooling:</strong> Git, GitHub, VPS, cPanel, Nginx, Composer, npm</div>
          </div>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Featured Product</h2>
          <div style={{ marginBottom: '6px' }}>
            <strong>SoftGlaze Screen Recorder</strong> — Chrome Web Store, v14.0
          </div>
          <p style={{ margin: '0 0 4px 0' }}>Published Chrome extension built end-to-end. Professional screen recording with sticky drawing annotations, MP4 conversion, and 100% local processing. Built with JavaScript, Chrome Extension APIs, MediaRecorder, Canvas, WebRTC, Manifest V3.</p>
          <div style={{ fontSize: '9.5pt', color: '#555' }}>chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp</div>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Professional Experience</h2>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>Founder &amp; Lead Developer</strong>
              <span>Jun 2022 — Present</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>SoftGlaze LLC — Remote, Colorado, USA</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Founded an indie dev studio while staying hands-on as principal engineer on every client engagement</li>
              <li>Architected and shipped 20+ production sites and a published Chrome extension across legal services, e-commerce, directories, agency platforms, and tools</li>
              <li>Built custom SoftGlaze WordPress plugins from scratch for price comparison engines, vehicle compatibility matching, web scrapers, and lead capture flows</li>
              <li>Designed and shipped SoftGlaze Screen Recorder, a published Chrome extension with sticky annotations, MP4 conversion, and 100% local processing</li>
              <li>Owned schema design, query optimization, deploys, monitoring, and production debugging</li>
              <li>Mentored junior contractors on Laravel patterns, Git workflow, and engineering standards</li>
            </ul>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>Senior Full-Stack Web Developer</strong>
              <span>Jul 2018 — May 2022</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Creative Chaos — Remote, USA Client</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Shipped full-stack features in PHP/Laravel and React for a distributed product team</li>
              <li>Owned modules end-to-end: schema, API, UI, QA, and deployment</li>
              <li>Optimized N+1 queries, added caching, and materially improved p95 response times</li>
              <li>Reviewed PRs and mentored juniors on a distributed team across multiple time zones</li>
              <li>Collaborated daily with US-based product managers and designers on async-first cadence</li>
            </ul>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>Back-End Web Developer</strong>
              <span>Sep 2017 — Jun 2018</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Reborn — Lahore, Pakistan</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Designed MySQL schemas and built RESTful APIs for client-facing applications</li>
              <li>Refactored legacy PHP code into structured CodeIgniter and Laravel codebases</li>
              <li>Diagnosed slow queries with EXPLAIN, added indexes, rewrote joins for measurable performance wins</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong>Front-End Web Developer</strong>
              <span>Aug 2014 — Aug 2017</span>
            </div>
            <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>Intero Digital — Islamabad, Pakistan</div>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>Translated UI/UX designs into pixel-perfect, responsive HTML5, CSS3, JavaScript, and Bootstrap pages</li>
              <li>Resolved cross-browser compatibility issues and optimized front-end performance</li>
              <li>Shipped mobile-responsive layouts ensuring consistent experience across desktop, tablet, and mobile</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Selected Portfolio</h2>
          <p style={{ margin: '0 0 6px 0', fontSize: '9.5pt', color: '#444' }}>20+ live production sites. Featured selections:</p>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li><strong>Kliniektarieven.nl</strong> — NL clinic price comparison platform with multi-role registration and geo search (WordPress + custom SoftGlaze plugins)</li>
            <li><strong>CarPartHQ.com</strong> — Auto parts marketplace with vehicle compatibility across 56+ brands, 35+ distribution centers (WordPress + custom plugin suite)</li>
            <li><strong>DubaiNotaryServices.com</strong> — Flagship UAE legal services platform, anchors a 12-site network</li>
            <li><strong>Klustarief.nl</strong> &amp; <strong>Schildertarief.nl</strong> — Dutch trade pricing directories with custom comparison engines</li>
            <li><strong>Silkosoft.com</strong> — Software agency platform with rich service architecture</li>
            <li><strong>CapCutTemplatesX.com, CPCClue.com, TheWherevers.com, PicsartHub.com</strong> — Custom scraper-driven content platforms</li>
            <li>Full portfolio with 30+ sites and live links: <strong>azhar.softglaze.com</strong></li>
          </ul>
        </section>

        <section style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Education</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>Master of Information Technology</strong>
              <div style={{ fontStyle: 'italic', color: '#444' }}>Islamia University of Bahawalpur — Major: Computer Science &amp; Cyber Security</div>
            </div>
            <span>Sep 2012 — Apr 2016</span>
          </div>
        </section>

        <section style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Availability &amp; Engagement</h2>
          <p style={{ margin: '0' }}>Available for senior full-stack roles, part-time contracts, fixed-scope plugin builds, and retainer support. Working USA timezone overlap from Multan, Pakistan. Can sign NDA and IP assignment documents.</p>
        </section>

        <section>
          <h2 style={{ fontSize: '10pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid #ccc', paddingBottom: '3px', marginBottom: '8px' }}>Languages</h2>
          <p style={{ margin: '0' }}>English (fluent, written and spoken) | Urdu (native) | Punjabi (native)</p>
        </section>

        <p style={{ marginTop: '14px', fontSize: '9pt', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '8px' }}>
          Interactive portfolio with live links and case studies: <strong>azhar.softglaze.com</strong>
        </p>
      </div>

      {/* ============= SCREEN-ONLY UI ============= */}
      <div className="screen-only">

        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 12px rgba(34, 211, 238, 0.6)' }}
        />

        <nav className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.4)' : 'rgba(148, 163, 184, 0.3)',
                border: `1.5px solid ${activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.6)' : 'rgba(148, 163, 184, 0.5)'}`,
                transform: activeSection === item.id ? 'scale(1.4)' : 'scale(1)',
                boxShadow: activeSection === item.id ? '0 0 12px rgba(34, 211, 238, 0.7)' : item.star ? '0 0 8px rgba(168, 85, 247, 0.4)' : 'none',
              }}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
                {item.star && <Star size={9} className="fill-yellow-400 text-yellow-400" />} // {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* ============= HERO ============= */}
        <section id="hero" className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 md:px-12 py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950" />
          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl blob" style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl blob" style={{ animationDelay: '6s', transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }} />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '12s' }} />

          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            <FadeIn delay={0}>
              <div className="mb-8">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass font-mono text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-slate-300">Available for senior roles</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100} type="scale">
              <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center mb-8">
                <div className="absolute inset-0 spin-slow opacity-40">
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30"></div>
                </div>
                <div className="absolute inset-0 hidden md:block">
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit">
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Laravel</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-3.5s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-purple-500/40 text-purple-400 font-mono text-[10px] whitespace-nowrap shadow-lg">React</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-7s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-pink-500/40 text-pink-400 font-mono text-[10px] whitespace-nowrap shadow-lg">Node</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-10.5s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-yellow-500/40 text-yellow-400 font-mono text-[10px] whitespace-nowrap shadow-lg">MySQL</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse">
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-green-500/40 text-green-400 font-mono text-[10px] whitespace-nowrap shadow-lg">WordPress</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse" style={{ animationDelay: '-10s' }}>
                    <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-orange-500/40 text-orange-400 font-mono text-[10px] whitespace-nowrap shadow-lg">PHP</div>
                  </div>
                </div>

                <div className="relative float-slow">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
                  <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 pulse-glow">
                    <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                      {!imageError ? (
                        <img src="/profile.jpg" alt="Muhammad Azhar" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                      ) : (
                        <div className="text-6xl md:text-7xl font-black gradient-text font-display">MA</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-950 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="font-mono text-cyan-400 text-xs md:text-sm mb-3 flex items-center gap-2 justify-center flex-wrap">
                <Terminal size={14} />
                <span className="text-purple-400">~/azhar</span>
                <span className="text-slate-600">$</span>
                <span className="text-slate-400">whoami</span>
              </div>

              <h1 className="font-mono font-bold leading-none tracking-tight mb-6 flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
                <span className="text-slate-600">{'<'}</span>
                <span className="bg-gradient-to-br from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Muhammad</span>
                <span className="text-cyan-400">/</span>
                <span className="gradient-text">Azhar</span>
                <span className="text-slate-600">{'>'}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base md:text-lg text-slate-300 mb-2">
                <span>Senior Full-Stack Engineer</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 flex items-center gap-1"><MapPin size={14} /> Multan, PK (Working USA Timezones)</span>
              </div>

              <p className="font-mono text-xs md:text-sm text-slate-500 mb-8 flex flex-wrap gap-x-2 justify-center">
                <span className="text-purple-400">PHP</span><span className="text-slate-700">/</span>
                <span className="text-cyan-400">Laravel</span><span className="text-slate-700">/</span>
                <span className="text-yellow-400">React</span><span className="text-slate-700">/</span>
                <span className="text-green-400">Node</span><span className="text-slate-700">/</span>
                <span className="text-pink-400">MySQL</span>
              </p>
            </FadeIn>

            {/* INTERACTIVE TERMINAL */}
            <FadeIn delay={400}>
              <div
                className="font-mono text-xs md:text-sm bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-xl w-full max-w-2xl mb-8 shadow-2xl text-left overflow-hidden"
                onClick={() => terminalInputRef.current?.focus()}
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800 bg-slate-900">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-slate-600 text-xs ml-2">azhar@dev — interactive terminal</span>
                  <span className="ml-auto text-[10px] text-slate-600">type "help"</span>
                </div>

                <div ref={terminalRef} className="p-4 max-h-72 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                  {terminalHistory.map((entry, i) => (
                    <div key={i} className="mb-1">
                      {entry.type === 'input' && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-purple-400 flex-shrink-0">~/azhar</span>
                          <span className="text-slate-600 flex-shrink-0">$</span>
                          <span className="text-slate-200">{entry.content}</span>
                        </div>
                      )}
                      {entry.type === 'output' && (
                        <pre className="text-slate-400 whitespace-pre-wrap break-words font-mono">{entry.content}</pre>
                      )}
                      {entry.type === 'error' && (
                        <pre className="text-red-400 whitespace-pre-wrap break-words font-mono">{entry.content}</pre>
                      )}
                    </div>
                  ))}

                  <div className="flex items-start gap-1.5 mt-1">
                    <span className="text-purple-400 flex-shrink-0">~/azhar</span>
                    <span className="text-slate-600 flex-shrink-0">$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleTerminalKeyDown}
                      className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-xs md:text-sm caret-cyan-400"
                      autoFocus={false}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex flex-wrap gap-3 mb-10 justify-center">
                <a href="#extension" onClick={(e) => { e.preventDefault(); document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
                  <Rocket size={16} /> See my work
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button onClick={handlePrint} className="px-6 py-3 rounded-lg border border-cyan-400/40 hover:border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Download size={16} /> Download Resume
                </button>
                <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Github size={16} /> GitHub
                </a>
                <a href="mailto:admin@softglaze.com" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
                  <Mail size={16} /> Get in touch
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="grid grid-cols-3 gap-6 md:gap-12 pt-6 border-t border-slate-800 w-full max-w-md">
                <div>
                  <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">8+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Years</div>
                </div>
                <div>
                  <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">20+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Live Sites</div>
                </div>
                <div>
                  <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">1</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Chrome Ext.</div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-600 flex flex-col items-center gap-1">
            <span>scroll | or use down/right keys</span>
            <ChevronDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* ============= CHROME EXTENSION ============= */}
        <AnimatedSection id="extension" tag="// flagship product" icon={<Award />} number="02">
          <FadeIn>
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 uppercase tracking-widest inline-flex items-center gap-1">
                <Star size={10} className="fill-yellow-400" /> Featured Product
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Live on the <span className="gradient-text">Chrome Web Store.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-12 text-center">
              A full Chrome extension I designed, built, and shipped end-to-end. Real users, real reviews, real product — not just client work.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="glass rounded-2xl p-6 md:p-10 max-w-5xl mx-auto text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

              <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl pulse-glow">
                      <Chrome size={64} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 border-2 border-cyan-400 rounded-xl px-2 py-1 font-mono text-[10px] text-cyan-400">v14.0</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={10} /> Verified Live
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">Chrome Web Store</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">Published</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">SoftGlaze Screen Recorder</h3>
                  <p className="text-slate-400 text-sm md:text-base mb-4">
                    Professional screen recording extension with Persistent Drawing Suite. Annotate live while recording. Built solo from concept to publication.
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                    <span className="font-mono text-xs text-slate-400 ml-2">5.0 by Azhar Ali (softglaze.com)</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 mb-5">
                    {[
                      { icon: Rocket, label: 'HD Recording with system audio' },
                      { icon: Wrench, label: 'Pro Drawing Tools (Pen, Highlighter, Arrows)' },
                      { icon: Target, label: 'Smart Scroll — sticky annotations' },
                      { icon: Download, label: 'Instant WebM / MP4 export' },
                      { icon: Star, label: 'High-res screenshot mode' },
                      { icon: ShieldCheck, label: 'Privacy-first — local processing' },
                    ].map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/40 border border-slate-700/40 rounded-md px-3 py-2 hover:border-cyan-400/40 transition-colors">
                          <Icon size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{f.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mb-5">
                    <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-2">// built with</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['JavaScript', 'Chrome Extension API', 'MediaRecorder API', 'Canvas API', 'WebRTC', 'MP4 Conversion', 'Manifest V3'].map((t, i) => (
                        <span key={i} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Wrench size={10} /> what I engineered
                    </div>
                    <ul className="space-y-1.5 text-sm text-slate-300">
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Sticky Drawing Engine (v14):</strong> annotations persist across scrolling using DOM element anchoring</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">MP4 Conversion:</strong> client-side WebM to MP4 transcoding pipeline</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Toolbar logic:</strong> force-close handling for clean UX edge cases</li>
                      <li className="pl-5 relative leading-snug"><ChevronRight size={12} className="absolute left-0 top-1 text-pink-400" /><strong className="text-white">Privacy architecture:</strong> 100% local processing, zero data collection</li>
                    </ul>
                  </div>

                  <a href="https://chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
                    <Chrome size={16} /> View on Chrome Web Store
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= WHY ME ============= */}
        <AnimatedSection id="why-me" tag="// the pitch" icon={<Heart />} number="03">
          <FadeIn>
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/40 text-pink-400 uppercase tracking-widest font-mono">if (hiring) {'{ hireMe() }'}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Why <span className="gradient-text">me?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-12 text-center">
              Most developers are good at one thing. The rare ones own it end-to-end. Here's what you actually get when you hire me.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="font-mono text-xs md:text-sm bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4 md:p-5 w-full max-w-3xl mx-auto mb-10 shadow-2xl text-left">
              <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-slate-800">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span className="text-slate-600 text-xs ml-2">why-hire-azhar.ts</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words">
                <span className="text-slate-600">{'// Why you should choose Muhammad Azhar'}</span>{'\n'}
                <span className="text-purple-400">function</span>{' '}
                <span className="text-yellow-300">whyHireAzhar</span>
                <span className="text-slate-400">() </span>
                <span className="text-slate-500">{'{'}</span>{'\n'}
                {'  '}<span className="text-purple-400">return</span>{' '}
                <span className="text-slate-500">{'{'}</span>{'\n'}
                {'    '}<span className="text-cyan-300">experience</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-yellow-300">"8+ years"</span>
                <span className="text-slate-500">,</span>{'\n'}
                {'    '}<span className="text-cyan-300">shipped</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-yellow-300">"20+ sites + Chrome ext"</span>
                <span className="text-slate-500">,</span>{'\n'}
                {'    '}<span className="text-cyan-300">ownership</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-yellow-300">"end-to-end"</span>
                <span className="text-slate-500">,</span>{'\n'}
                {'    '}<span className="text-cyan-300">communication</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-yellow-300">"async-first"</span>
                <span className="text-slate-500">,</span>{'\n'}
                {'    '}<span className="text-cyan-300">drama</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-pink-400">false</span>
                <span className="text-slate-500">,</span>{'\n'}
                {'  '}<span className="text-slate-500">{'}'}</span>
                <span className="text-slate-500">;</span>{'\n'}
                <span className="text-slate-500">{'}'}</span>
              </pre>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: Trophy, color: 'cyan', tag: '// proof.exists',
                title: 'I ship real products',
                desc: 'A published Chrome extension. 20+ live sites. Custom WordPress plugins running in production. Not just resume words — every claim is one click away on the web.'
              },
              {
                icon: Brain, color: 'purple', tag: '// fullStack === true',
                title: 'I own the whole stack',
                desc: 'From schema design to deployed UI. PHP/Laravel APIs, MySQL optimization, React/Vue front-ends, custom plugins, and the boring DevOps in between. No "let me ask the backend team" excuses.'
              },
              {
                icon: GitBranch, color: 'pink', tag: '// scope.understands(client)',
                title: 'I translate vibes into specs',
                desc: 'Eight years of working directly with non-technical clients taught me how to turn "make it pop" into actual technical requirements. I scope, plan, and ship without 47 clarification meetings.'
              },
              {
                icon: Rocket, color: 'yellow', tag: '// startUp.compatible',
                title: 'I work like a founder',
                desc: 'I ran my own dev studio for 4 years. I know what missed deadlines cost, why clean code matters at 2am, and why "good enough that ships" beats "perfect that doesn\'t". I move fast, own outcomes.'
              },
              {
                icon: Users, color: 'green', tag: '// mentorship === enabled',
                title: 'I lift the team up',
                desc: 'Reviewed PRs at Creative Chaos. Mentored juniors at SoftGlaze. I leave codebases — and teammates — better than I found them. Senior is a behavior, not a title.'
              },
              {
                icon: Coffee, color: 'orange', tag: '// async.firstClass',
                title: 'I work async, across timezones',
                desc: 'Worked remote with US clients for 4+ years from Pakistan. I know how to communicate in writing, document decisions, and not need standups to ship features.'
              },
              {
                icon: Target, color: 'rose', tag: '// boring.solved',
                title: 'I do the boring stuff right',
                desc: 'Database indexes. Query optimization. N+1 queries. Caching layers. Schema migrations. The unsexy work that keeps your product fast at scale — that\'s where I shine.'
              },
              {
                icon: Code2, color: 'blue', tag: '// learn.continuous',
                title: 'I\'m still learning, always',
                desc: 'TypeScript, Manifest V3, modern React patterns, new Laravel features, Chrome extension APIs. The stack moves fast — so do I. Curiosity is part of the contract.'
              },
              {
                icon: ShieldCheck, color: 'emerald', tag: '// integrity.first',
                title: 'I won\'t oversell',
                desc: 'Notice the "in progress" badges in my portfolio? That\'s on purpose. I\'d rather tell you what I can actually deliver than make claims I\'ll regret in week two of the job.'
              },
            ].map((reason, i) => {
              const Icon = reason.icon;
              return (
                <FadeIn key={i} delay={50 + i * 70}>
                  <div className="glass rounded-xl p-5 md:p-6 group hover:-translate-y-1 h-full relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${reason.color}-400 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-${reason.color}-400/10 border border-${reason.color}-400/30 flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={`text-${reason.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-mono text-[10px] text-${reason.color}-400 uppercase tracking-widest mb-1`}>{reason.tag}</div>
                        <h3 className="text-base md:text-lg font-semibold text-white leading-tight">{reason.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={400}>
            <div className="text-center mt-12">
              <p className="font-mono text-sm text-slate-400 mb-4">
                <span className="text-slate-600">{'//'}</span> tldr: I'm the senior engineer you wish you'd hired six months ago.
              </p>
              <a href="mailto:admin@softglaze.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5">
                <Mail size={16} /> Let's talk
                <ArrowUpRight size={14} />
              </a>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= ABOUT (with GitHub stats) ============= */}
        <AnimatedSection id="about" tag="// the tldr" icon={<Sparkles />} number="04">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              Full-stack engineer who actually <span className="gradient-text">ships.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto space-y-4 text-center">
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Eight years writing production code across <span className="text-cyan-400 font-medium">PHP, Laravel, Node, React, and MySQL</span>. Started front-end at a Pakistani agency, leveled up to senior full-stack for a US client at Creative Chaos, then spent four years running my own dev shop shipping for international clients.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                <span className="text-white font-semibold">20+ live production sites</span> across the US, UK, UAE, Netherlands, and Pakistan, plus a <span className="text-white font-semibold">published Chrome extension</span> with several custom WordPress plugins built under the SoftGlaze brand.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-slate-300">
                Now ready to <span className="font-mono text-cyan-400">git checkout</span> a focused product team where I can commit deeply (pun intended) instead of context-switching across client projects.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto">
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">8+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Years Shipping</div>
              </div>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">20+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Live Sites</div>
              </div>
              {/* GITHUB LIVE STATS */}
              <a
                href="https://github.com/softglazee"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1 block group"
              >
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text flex items-center justify-center gap-1">
                  {githubStats.loading ? (
                    <span className="text-slate-500 text-2xl">...</span>
                  ) : githubStats.repos !== null ? (
                    <>{githubStats.repos}</>
                  ) : (
                    <>—</>
                  )}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                  <Github size={10} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  GitHub Repos
                </div>
              </a>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">5</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Countries</div>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= STACK ============= */}
        <AnimatedSection id="stack" tag="// dependencies" icon={<Code2 />} number="05">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              My <span className="gradient-text">tech stack.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              { cat: 'languages', items: ['PHP', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'] },
              { cat: 'back-end', items: ['Laravel', 'CodeIgniter', 'Node.js', 'Express', 'REST APIs', 'JWT Auth'] },
              { cat: 'front-end', items: ['React', 'Vue.js', 'Bootstrap', 'Tailwind', 'jQuery', 'Responsive'] },
              { cat: 'data', items: ['MySQL', 'Schema design', 'Indexing', 'Query opt', 'Migrations'] },
              { cat: 'cms & e-commerce', items: ['WordPress', 'WooCommerce', 'Shopify', 'Custom plugins'] },
              { cat: 'wp plugins (used)', items: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath', 'Yoast', 'WP Rocket'] },
              { cat: 'browser extensions', items: ['Manifest V3', 'Chrome APIs', 'MediaRecorder', 'Canvas API', 'WebRTC'] },
              { cat: 'integrations', items: ['Stripe', 'PayPal', 'SendGrid', 'Twilio', 'Webhooks'] },
              { cat: 'devops & tooling', items: ['Git', 'GitHub', 'VPS', 'cPanel', 'Nginx', 'Composer', 'npm'] },
            ].map((group, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="glass rounded-xl p-5 hover:-translate-y-1 group h-full">
                  <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    // {group.cat}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, j) => (
                      <span key={j} className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>



        {/* ============= RECRUITER PROOF LAB ============= */}
        <AnimatedSection id="proof" tag="// proof lab" icon={<Github />} number="06">
          <FadeIn>
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 uppercase tracking-widest">
                click, inspect, verify
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Proof recruiters can <span className="gradient-text">actually use.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              This section turns the portfolio from a static CV into a live technical screen: code samples, GitHub activity, and concrete engineering signals.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5 max-w-6xl mx-auto items-stretch">
            <FadeIn delay={100}>
              <div className="glass rounded-2xl overflow-hidden h-full text-left border-cyan-400/20">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  {Object.entries(playgroundSnippets).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setPlaygroundMode(key)}
                      className={`font-mono text-[11px] px-3 py-1.5 rounded-md border transition-all ${
                        playgroundMode === key
                          ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
                          : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <span className="ml-auto hidden md:inline font-mono text-[10px] text-slate-600">live-coding-playground.jsx</span>
                </div>
                <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-5 border-b md:border-b-0 md:border-r border-slate-800">
                    <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2">// {playgroundSnippets[playgroundMode].title}</div>
                    <pre className="font-mono text-xs md:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap text-slate-300">
                      {playgroundSnippets[playgroundMode].code.split('\n').map((line, i) => (
                        <div key={i} className="code-window-line" data-line={String(i + 1).padStart(2, '0')}>{line || ' '}</div>
                      ))}
                    </pre>
                  </div>
                  <div className="p-5 bg-slate-950/50">
                    <div className="font-mono text-[10px] text-green-400 uppercase tracking-widest mb-3">// output</div>
                    <div className="space-y-2">
                      {playgroundSnippets[playgroundMode].output.split('\n').map((line, i) => (
                        <div key={i} className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-slate-900/60 border border-slate-800 rounded-md px-3 py-2">
                          <Check size={13} className="text-green-400 flex-shrink-0" />
                          {line}
                        </div>
                      ))}
                    </div>
                    <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 mt-5">
                      Inspect GitHub profile <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={180}>
                <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-5 block group hover:-translate-y-1 text-left">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-1">// github activity heatmap</div>
                      <h3 className="text-xl font-semibold text-white">Commit consistency signal</h3>
                    </div>
                    <Github size={22} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 overflow-hidden">
                    <img
                      src="https://ghchart.rshah.org/22d3ee/softglazee"
                      alt="GitHub contribution chart for softglazee"
                      className="heatmap-img w-full min-h-[96px] object-contain opacity-90"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Uses a public contribution-chart image as the no-token option. For exact private contribution data, connect GitHub GraphQL with a read-only token.
                  </p>
                </a>
              </FadeIn>

              <FadeIn delay={260}>
                <div className="glass rounded-2xl p-5 text-left">
                  <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">// open source + public signals</div>
                  <div className="space-y-3">
                    {openSourceItems.map((item, i) => (
                      <div key={i} className="rounded-xl bg-slate-900/50 border border-slate-800 p-3 hover:border-purple-400/40 transition-colors">
                        <div className="flex items-start gap-2">
                          <GitPullRequest size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-white">{item.name}</div>
                            <div className="font-mono text-[10px] text-slate-500 mb-1">{item.type}</div>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </AnimatedSection>

        {/* ============= PROCESS + RESPONSE SIGNALS ============= */}
        <AnimatedSection id="process" tag="// how i work" icon={<Clock />} number="07">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              No disappearing act. <span className="gradient-text">Just shipping.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              The biggest hiring risk is not skill. It is communication. This section pre-answers that objection.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_360px] gap-5 max-w-6xl mx-auto items-start">
            <FadeIn delay={100}>
              <div className="glass rounded-2xl p-5 md:p-6 text-left">
                <div className="grid md:grid-cols-2 gap-3">
                  {processSteps.map((item, i) => (
                    <div key={i} className="relative rounded-xl bg-slate-900/50 border border-slate-800 p-4 hover:border-cyan-400/40 transition-all group">
                      <div className="font-mono text-[10px] text-cyan-400 mb-2">{item.step}</div>
                      <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                        {item.title}
                        {i < processSteps.length - 1 && <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div className="space-y-5">
              <FadeIn delay={180}>
                <div className="slot-shine glass rounded-2xl p-5 text-left border-green-400/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </span>
                    <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">response time widget</span>
                  </div>
                  <div className="font-display text-4xl font-bold text-white mb-1">&lt; 4h</div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Average response target during USA business hours for active hiring, project, and production conversations.
                  </p>
                  <a href="mailto:admin@softglaze.com?subject=Senior%20Full-Stack%20Role%20-%20Availability" className="inline-flex items-center gap-2 font-mono text-xs px-3 py-2 rounded-lg bg-green-400/10 border border-green-400/40 text-green-400 hover:bg-green-400/15 transition-colors">
                    Start conversation <ArrowUpRight size={12} />
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={260}>
                <div className="glass rounded-2xl p-5 text-left">
                  <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">// available slots this week</div>
                  <div className="space-y-2 mb-4">
                    {['Mon-Wed: US morning overlap', 'Thu: architecture / technical screen', 'Fri: offer, onboarding, or sprint planning'].map((slot, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 rounded-lg bg-slate-900/60 border border-slate-800 px-3 py-2">
                        <span className="text-xs text-slate-300">{slot}</span>
                        <span className="font-mono text-[10px] text-green-400">open</span>
                      </div>
                    ))}
                  </div>
                  <a href="mailto:admin@softglaze.com?subject=Book%20a%20technical%20interview" className="font-mono text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5">
                    Request exact meeting time <ArrowUpRight size={12} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </AnimatedSection>

        {/* ============= EXPERIENCE ============= */}
        <AnimatedSection id="experience" tag="// git log --oneline" icon={<Briefcase />} number="08">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              Where I've <span className="gradient-text">shipped.</span>
            </h2>
          </FadeIn>

          <div className="relative max-w-5xl mx-auto pl-8 md:pl-10">
            <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-slate-700" />

            {[
              {
                role: 'Founder & Lead Developer', company: 'SoftGlaze LLC', location: 'Remote | Colorado, USA', when: 'Jun 2022 — Present',
                bullets: [
                  ['Founded an indie dev studio while staying ', 'hands-on as principal engineer', ' on every client engagement'],
                  ['Architected and shipped ', '20+ production sites + a published Chrome extension', ' across legal services, e-commerce, directories, agency platforms, and tools'],
                  ['Built ', 'custom SoftGlaze WordPress plugins from scratch', ' for price comparison engines, vehicle compatibility matching, web scrapers, and lead capture flows'],
                  ['Designed and shipped ', 'SoftGlaze Screen Recorder', ', a published Chrome extension with sticky annotations, MP4 conversion, and 100% local processing'],
                  ['Owned the boring-but-critical stuff: schema design, query optimization, deploys, monitoring, and 2am production debugging'],
                  ['Mentored junior contractors on Laravel patterns, Git workflow, and engineering standards'],
                ],
              },
              {
                role: 'Senior Full-Stack Web Developer', company: 'Creative Chaos', location: 'Remote | USA Client', when: 'Jul 2018 — May 2022',
                bullets: [
                  ['Shipped full-stack features in ', 'PHP/Laravel + React', ' for a distributed product team'],
                  ['Owned modules end-to-end: schema, API, UI, QA, deploy'],
                  ['Killed N+1 queries, added caching, and watched p95 response times drop materially'],
                  ['Reviewed PRs and mentored juniors, leaving every codebase a little better than I found it'],
                  ['Worked async with US-based PMs and designers across timezones without dropping the ball'],
                ],
              },
              {
                role: 'Full-Stack Web Developer', company: 'NextLogixs', location: 'Pakistan', when: 'Sep 2017 — Jun 2018',
                bullets: [
                  ['Designed MySQL schemas and built ', 'REST APIs', ' for client-facing applications'],
                  ['Refactored legacy spaghetti-PHP into structured CodeIgniter and Laravel codebases'],
                  ['Diagnosed slow queries with EXPLAIN, added indexes, and rewrote joins for measurable performance wins'],
                  ['Worked across the stack on full client builds — from database design to deployed UI'],
                ],
              },
            ].map((job, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative last:mb-0" style={{ marginBottom: '20px' }}>
                  <div className="absolute -left-10 md:-left-11 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 pulse-glow" />
                  <div className="glass rounded-xl p-5 md:p-6 hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                      <h3 className="text-lg md:text-xl font-semibold text-white">{job.role}</h3>
                      <div className="font-mono text-xs text-slate-400">{job.when}</div>
                    </div>
                    <div className="font-mono text-sm text-cyan-400 mb-4">
                      {job.company} <span className="text-slate-600 mx-1.5">|</span>
                      <span className="text-slate-400">{job.location}</span>
                    </div>
                    <ul className="space-y-2">
                      {job.bullets.map((b, j) => (
                        <li key={j} className="pl-6 relative text-sm md:text-[15px] leading-relaxed text-slate-300">
                          <ChevronRight size={14} className="absolute left-0 top-1 text-cyan-400 flex-shrink-0" />
                          {b.map((part, k) => (k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : <span key={k}>{part}</span>))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>

        {/* ============= PORTFOLIO ============= */}
        <AnimatedSection id="portfolio" tag="// live deployments" icon={<Layers />} number="09">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Live in <span className="gradient-text">production.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-6 text-center">
              Production deployments built and shipped. <span className="text-cyan-400">Click any card</span> to see the CMS, plugins, and custom-built modules used.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={() => { setPortfolioFilter('all'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  portfolioFilter === 'all' ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Layers size={11} /> All ({portfolio.length})
              </button>
              <button
                onClick={() => { setPortfolioFilter('featured'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  portfolioFilter === 'featured' ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Star size={11} className={portfolioFilter === 'featured' ? 'fill-yellow-400' : ''} /> Featured ({featuredCount})
              </button>
              <button
                onClick={() => { setPortfolioFilter('verified'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  portfolioFilter === 'verified' ? 'bg-green-400/10 border-green-400 text-green-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <ShieldCheck size={11} /> Verified Live ({verifiedCount})
              </button>
              <button
                onClick={() => { setPortfolioFilter('inProgress'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  portfolioFilter === 'inProgress' ? 'bg-orange-400/10 border-orange-400 text-orange-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Rocket size={11} /> In Progress ({inProgressCount})
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="flex flex-col lg:flex-row gap-3 mb-8 justify-center items-center">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {categories.map((cat) => {
                  const count = cat === 'all' ? portfolio.length : portfolio.filter(p => p.cat === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setStatusFilter(cat); setExpandedSite(null); }}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                        statusFilter === cat
                          ? `bg-${catColors[cat] || 'cyan'}-400/10 border-${catColors[cat] || 'cyan'}-400 text-${catColors[cat] || 'cyan'}-400`
                          : 'border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  placeholder="search sites..."
                  className="font-mono text-xs pl-9 pr-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 w-full lg:w-56 transition-colors"
                />
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {filteredPortfolio.map((site, i) => {
              const isExpanded = expandedSite === site.url;
              return (
                <FadeIn key={site.url} delay={Math.min(i * 40, 400)}>
                  <div
                    className={`glass rounded-xl p-5 relative overflow-hidden cursor-pointer h-full ${isExpanded ? 'border-cyan-400/40 lg:col-span-3 sm:col-span-2' : 'hover:-translate-y-1 hover:border-cyan-400/40'}`}
                    onClick={() => setExpandedSite(isExpanded ? null : site.url)}
                  >
                    {site.featured && (
                      <>
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-yellow-400/20" />
                        <Star size={10} className="absolute top-2 right-2 fill-yellow-400 text-yellow-400" />
                      </>
                    )}

                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full p-[2px] ${site.featured ? 'bg-gradient-to-br from-yellow-400 via-cyan-400 to-purple-500' : site.verified ? 'bg-gradient-to-br from-green-500/60 to-cyan-500/60' : 'bg-gradient-to-br from-orange-500/40 to-pink-500/40'}`}>
                          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                            <img
                              src={getFavicon(site.url)}
                              alt={site.name}
                              className="w-7 h-7 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div style={{ display: 'none' }} className="w-full h-full items-center justify-center font-mono text-xs font-bold text-slate-300">
                              {site.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                        {site.verified && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center" title="Verified live">
                            <Check size={7} className="text-white" />
                          </div>
                        )}
                        {site.inProgress && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-slate-900 flex items-center justify-center blink-slow" title="In progress">
                            <Rocket size={7} className="text-white" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-sm md:text-[15px] truncate pr-3">{site.name}</div>
                        <a
                          href={`https://${site.url.replace(/^https?:\/\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-[11px] text-cyan-400/70 hover:text-cyan-400 truncate block underline-offset-2 hover:underline"
                        >
                          {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-${catColors[site.cat] || 'slate'}-400 whitespace-nowrap`}>
                        // {site.cat}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Package size={11} className="text-purple-400" />
                        <span className="font-mono text-[10.5px] text-purple-300">{site.cms}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 leading-snug mb-2">{site.desc}</div>

                    {site.inProgress && !isExpanded && (
                      <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 mt-1">
                        content rolling out
                      </span>
                    )}

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                        {site.plugins && site.plugins.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Package size={10} /> Plugins Used
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {site.plugins.map((p, j) => (
                                <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{p}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {site.custom && site.custom.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Wrench size={10} /> Custom Built
                            </div>
                            <ul className="space-y-1">
                              {site.custom.map((c, j) => (
                                <li key={j} className="text-xs text-slate-300 pl-4 relative leading-snug">
                                  <ChevronRight size={10} className="absolute left-0 top-1 text-pink-400 flex-shrink-0" />{c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {site.features && site.features.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Zap size={10} /> Key Features
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {site.features.map((f, j) => (
                                <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">{f}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <a
                          href={`https://${site.url.replace(/^https?:\/\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 mt-2"
                        >
                          Visit live site <ArrowUpRight size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-16 font-mono text-sm text-slate-500">
              // no results, try a different filter or search
            </div>
          )}
        </AnimatedSection>

        {/* ============= CASE STUDIES ============= */}
        <AnimatedSection id="projects" tag="// deeper dives" icon={<Code2 />} number="10">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-center">
              Selected <span className="gradient-text">case studies.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto text-left">
            {[
              {
                tag: 'browser extension | solo product',
                title: 'SoftGlaze Screen Recorder',
                count: 'Live on Web Store',
                cms: 'Chrome Extension',
                stack: ['JavaScript', 'Chrome APIs', 'MediaRecorder', 'Canvas', 'Manifest V3'],
                custom: ['Sticky Drawing Engine (DOM-anchored annotations)', 'Client-side WebM to MP4 conversion', 'Toolbar lifecycle management', '100% local processing architecture'],
                desc: 'A published Chrome extension I built solo from concept to publication. Currently live on the Chrome Web Store at v14.0.',
              },
              {
                tag: 'directory | netherlands | multi-site',
                title: 'NL Pricing Directory Suite',
                count: '3 sites',
                cms: 'WordPress',
                stack: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
                custom: ['SoftGlaze price comparison engine', 'Provider matching algorithm', 'Multi-role registration', 'Lat/lng geo search'],
                desc: 'Network of price comparison directories for Dutch trades — clinics, painters, handymen. Custom comparison engine with geo search.',
              },
              {
                tag: 'e-commerce | automotive',
                title: 'CarPartHQ',
                count: '1 site',
                cms: 'WordPress',
                stack: ['Elementor 3.29', 'ACF Pro', 'WPForms', 'RankMath'],
                custom: ['Vehicle compatibility plugin (56+ brands)', 'Multi-step lead form', 'Inventory routing across 35+ centers', 'Quote-based commerce workflow'],
                desc: 'Auto parts marketplace requiring complex vehicle compatibility matching. Make to Model to Part to Year selector flow.',
              },
              {
                tag: 'legal | uae | multi-site network',
                title: 'Dubai Legal Services Network',
                count: '12 sites',
                cms: 'WordPress',
                stack: ['Elementor Pro 4.0.5', 'ACF Pro', 'WPForms', 'RankMath SEO'],
                custom: ['Shared design system across 12 sites', 'Service inquiry plugin network', 'WhatsApp integration', 'Multi-site SEO'],
                desc: 'Network of 12 interconnected sites for UAE notary, attestation, and legal services. Flagship: dubainotaryservices.com.',
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="glass rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">// {p.tag}</div>
                    <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">{p.count}</div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={12} className="text-purple-400" />
                    <span className="font-mono text-[11px] text-purple-300">{p.cms}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 mb-4">{p.desc}</p>

                  <div className="space-y-2.5 pt-3 border-t border-slate-700/50">
                    <div>
                      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5">// stack</div>
                      <div className="flex flex-wrap gap-1">
                        {p.stack.map((s, j) => (
                          <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Wrench size={10} /> custom built
                      </div>
                      <ul className="space-y-0.5">
                        {p.custom.map((c, j) => (
                          <li key={j} className="text-xs text-slate-300 pl-4 relative leading-snug">
                            <ChevronRight size={10} className="absolute left-0 top-1 text-pink-400 flex-shrink-0" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </AnimatedSection>



        {/* ============= NOW / BLOG / HUMAN SIGNALS ============= */}
        <AnimatedSection id="now" tag="// currently building" icon={<Brain />} number="11">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Active, current, and <span className="gradient-text">still leveling up.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              Recruiters should not have to guess whether a portfolio is stale. This section shows current focus, writing ideas, credentials, learning, and personality.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto text-left">
            <FadeIn delay={100}>
              <div className="glass rounded-2xl p-5 h-full lg:col-span-1">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">// now page</div>
                <h3 className="text-2xl font-semibold text-white mb-3">Currently building</h3>
                <div className="space-y-3">
                  {[
                    'Improving SoftGlaze Screen Recorder UX and reliability',
                    'Building comparison and lead-routing WordPress plugin systems',
                    'Refining TypeScript + React architecture patterns',
                    'Documenting reusable plugin and API patterns',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Rocket size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-slate-900/60 border border-slate-800 p-3 font-mono text-xs text-slate-500">
                  updated: May 2026 · cadence: weekly
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="glass rounded-2xl p-5 h-full lg:col-span-2">
                <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">// technical writing ideas</div>
                <div className="grid md:grid-cols-3 gap-3">
                  {blogPosts.map((post, i) => (
                    <div key={i} className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 hover:border-purple-400/40 transition-colors">
                      <FileText size={18} className="text-purple-400 mb-3" />
                      <h3 className="text-sm font-semibold text-white leading-snug mb-2">{post.title}</h3>
                      <div className="font-mono text-[10px] text-cyan-400 mb-1">{post.tag}</div>
                      <div className="font-mono text-[10px] text-slate-500">{post.read}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  These can become Dev.to, Hashnode, Medium, or first-party blog posts. Even short technical notes help recruiters see how you think.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={260}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="font-mono text-[10px] text-yellow-400 uppercase tracking-widest mb-3">// achievements</div>
                <div className="space-y-2">
                  {achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Award size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={320}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="font-mono text-[10px] text-green-400 uppercase tracking-widest mb-3">// languages i am learning</div>
                <div className="flex flex-wrap gap-2">
                  {learning.map((item, i) => (
                    <span key={i} className="font-mono text-xs px-2.5 py-1 rounded-md bg-green-400/10 border border-green-400/30 text-green-300">{item}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={380}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="font-mono text-[10px] text-pink-400 uppercase tracking-widest mb-3">// when not coding</div>
                <div className="space-y-2 mb-4">
                  {funFacts.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Coffee size={14} className="text-pink-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
                  <div className="font-mono text-[10px] text-slate-500 mb-1">// spotify now playing</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400/30 to-cyan-400/30 border border-green-400/30 flex items-center justify-center">
                      <Zap size={16} className="text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-semibold">Deep focus mode</div>
                      <div className="font-mono text-[10px] text-slate-500">connect Spotify API later</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={440}>
              <div className="glass rounded-2xl p-5 h-full lg:col-span-3">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">// books and courses that shaped me</div>
                <div className="flex flex-wrap gap-2">
                  {books.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                      <GraduationCap size={12} /> {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </AnimatedSection>

        {/* ============= ENGAGEMENT MODELS + FAQ ============= */}
        <AnimatedSection id="engagement" tag="// hire without friction" icon={<Package />} number="12">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Clear ways to <span className="gradient-text">work together.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              Recruiters and founders should immediately know whether the engagement model fits before they book a call.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-5 max-w-6xl mx-auto text-left">
            <FadeIn delay={100}>
              <div className="glass rounded-2xl p-5 md:p-6 h-full">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-4">// pricing and engagement models</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {engagementModels.map((model, i) => (
                    <div key={i} className="rounded-xl bg-slate-900/50 border border-slate-800 p-4 hover:border-cyan-400/40 transition-colors">
                      <h3 className="text-base font-semibold text-white mb-2">{model.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{model.fit}</p>
                      <div className="space-y-1 font-mono text-[10px]">
                        <div className="text-green-400">availability: {model.availability}</div>
                        <div className="text-slate-500">terms: {model.terms}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="glass rounded-2xl p-5 md:p-6 h-full">
                <div className="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-4">// recruiter faq</div>
                <div className="space-y-2">
                  {faqItems.map((item, i) => (
                    <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                      <button
                        onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                        className="w-full flex items-center justify-between gap-3 text-left px-4 py-3 hover:bg-slate-800/40 transition-colors"
                      >
                        <span className="text-sm font-semibold text-white">{item.q}</span>
                        <ChevronDown size={16} className={`text-slate-500 transition-transform ${activeFAQ === i ? 'rotate-180 text-purple-400' : ''}`} />
                      </button>
                      {activeFAQ === i && (
                        <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </AnimatedSection>

        {/* ============= TESTIMONIALS — PR STYLE CAROUSEL ============= */}
        <AnimatedSection id="testimonials" tag="// code reviews" icon={<GitPullRequest />} number="13">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Code <span className="gradient-text">reviews.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-10 text-center">
              What clients and teammates have said about working with me. Auto-rotating every 6 seconds.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div
              className="max-w-4xl mx-auto"
              onMouseEnter={() => setAutoplayPaused(true)}
              onMouseLeave={() => setAutoplayPaused(false)}
            >
              {/* PR-styled testimonial card */}
              <div className="relative">
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl">
                  {/* PR Header */}
                  <div className="bg-slate-800/60 border-b border-slate-700/60 px-4 md:px-6 py-3 flex items-center gap-2 md:gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <GitPullRequest size={16} className={`text-${testimonials[currentReview].labelColor}-400`} />
                      <span className="font-mono text-xs md:text-sm text-slate-300">PR {testimonials[currentReview].pr}</span>
                    </div>
                    <span className="font-mono text-xs md:text-sm text-white truncate flex-1 min-w-0">
                      {testimonials[currentReview].title}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full bg-${testimonials[currentReview].labelColor}-500/10 border border-${testimonials[currentReview].labelColor}-500/40 text-${testimonials[currentReview].labelColor}-400 uppercase tracking-wider whitespace-nowrap`}>
                      {testimonials[currentReview].label}
                    </span>
                  </div>

                  {/* Branch info */}
                  <div className="px-4 md:px-6 py-2 bg-slate-900/40 border-b border-slate-700/40 font-mono text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                    <GitBranch size={12} className="text-slate-600" />
                    <span className="text-cyan-400">{testimonials[currentReview].branches[0]}</span>
                    <ChevronRight size={11} className="text-slate-600" />
                    <span className="text-purple-400">{testimonials[currentReview].branches[1]}</span>
                  </div>

                  {/* Review body */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-[2px] flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-sm md:text-base text-white">
                          {testimonials[currentReview].author.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-white text-sm md:text-base">{testimonials[currentReview].author}</div>
                        <div className="font-mono text-[11px] md:text-xs text-cyan-400">{testimonials[currentReview].role}</div>
                        <div className="font-mono text-[10px] md:text-[11px] text-slate-500">{testimonials[currentReview].company}</div>
                      </div>
                      <div className="font-mono text-[10px] text-slate-600 hidden sm:flex items-center gap-1 flex-shrink-0">
                        <MessageSquare size={10} /> review
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border-l-2 border-cyan-400 px-4 py-3 rounded-r font-mono text-[13px] md:text-sm text-slate-300 leading-relaxed">
                      {testimonials[currentReview].review}
                    </div>

                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                      <div className="font-mono text-[10px] md:text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Check size={11} className="text-green-400" />
                        review approved
                      </div>
                      <div className="font-mono text-[10px] text-slate-600 flex items-center gap-1">
                        <Clock size={10} />
                        {currentReview + 1} of {testimonials.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full glass border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all hover:-translate-x-3 md:hover:-translate-x-14"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentReview((prev) => (prev + 1) % testimonials.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full glass border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 flex items-center justify-center transition-all hover:translate-x-3 md:hover:translate-x-14"
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentReview ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <p className="text-center font-mono text-[10px] text-slate-600 mt-4">
                {autoplayPaused ? 'paused — hover off to resume' : 'auto-rotating every 6s'}
              </p>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ============= CONTACT ============= */}
        <section id="contact" className="relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

          <FadeIn>
            <div className="relative z-10 text-center max-w-3xl">
              <div className="font-mono text-cyan-400 text-sm mb-3">// 200 OK</div>
              <h2 className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5">
                Let's build <span className="gradient-text">something.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Open to senior full-stack roles, working USA timezones from Multan, PK. If you're hiring and the work looks interesting, I'd love to chat. No copy-paste recruiter pitches, please.
              </p>

              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <a href="mailto:admin@softglaze.com" className="font-mono text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Send size={14} /> admin@softglaze.com
                </a>
                <button onClick={handlePrint} className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Download size={14} /> Download Resume (PDF)
                </button>
                <a href="tel:+923007484750" className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Phone size={14} /> +92 300 7484750
                </a>
                <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Github size={14} /> github.com/softglazee
                </a>
                <a href="https://www.linkedin.com/in/azharalidev/" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Linkedin size={14} /> azharalidev
                </a>
                <a href="https://softglaze.com" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Globe size={14} /> softglaze.com
                </a>
                <a href="https://chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-6 py-3 rounded-lg border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Chrome size={14} /> Chrome Extension
                </a>
              </div>

              <div className="font-mono text-xs text-slate-500 space-y-1.5 mb-8">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <GraduationCap size={14} className="text-purple-400" />
                  <span>MS Information Technology | Islamia University of Bahawalpur | 2012-2016</span>
                </div>
                <div>
                  <span className="text-purple-400">Languages</span> | English (fluent) | Urdu (native) | Punjabi (native)
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                status: available | last commit: today
              </div>
            </div>
          </FadeIn>

          <div className="relative z-10 mt-16 font-mono text-[10px] text-slate-700 flex items-center gap-1">
            built with react | tailwind | <Heart size={10} className="text-pink-400 fill-pink-400" /> by Muhammad Azhar | azhar.softglaze.com
          </div>
        </section>
      </div>
    </div>
  );
}

// Reusable scroll-triggered fade animation
function FadeIn({ children, delay = 0, type = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(30px)',
    scale: visible ? 'scale(1)' : 'scale(0.95)',
    left: visible ? 'translateX(0)' : 'translateX(-30px)',
    right: visible ? 'translateX(0)' : 'translateX(30px)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[type],
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {children}
    </div>
  );
}

function AnimatedSection({ id, children, tag, icon, number }) {
  return (
    <section id={id} className="relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-2">
            <div className="font-mono text-xs text-slate-700 tracking-widest mb-2">// {number}</div>
            <div className="font-mono text-sm text-cyan-400 mb-2 flex items-center gap-2 justify-center">
              {icon && <span className="opacity-60">{icon}</span>}
              {tag}
            </div>
          </div>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}