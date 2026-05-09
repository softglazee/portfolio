import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ChevronDown, ChevronRight, ChevronLeft, ExternalLink, Code2, Briefcase, GraduationCap, Send, Sparkles, Terminal, Zap, Layers, ArrowUpRight, Search, Package, Wrench, Chrome, Award, Star, ShieldCheck, Rocket, Heart, Brain, Target, Coffee, GitBranch, Users, Trophy, Download, Check, MessageSquare, GitPullRequest, Clock } from 'lucide-react';

export default function CV() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('featured');
  const [statusFilter, setStatusFilter] = useState('all');
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [expandedSite, setExpandedSite] = useState(null);

  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', content: 'SoftGlaze Terminal v14.0 — type "help" to see commands' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  // GitHub Stats State
  const [githubStats, setGithubStats] = useState({ repos: null, loading: true });

  // Testimonial Carousel State
  const [currentReview, setCurrentReview] = useState(0);

  // Fetch GitHub stats
  useEffect(() => {
    fetch('https://api.github.com/users/softglazee')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.public_repos === 'number') {
          setGithubStats({ repos: data.public_repos, loading: false });
        } else {
          setGithubStats({ repos: null, loading: false });
        }
      })
      .catch(() => setGithubStats({ repos: null, loading: false }));
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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

  const sectionIds = ['hero', 'extension', 'why-me', 'about', 'stack', 'experience', 'portfolio', 'projects', 'reviews', 'contact'];

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
      // Don't intercept arrow keys when terminal input is focused
      if (document.activeElement === terminalInputRef.current) return;
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

  // Auto-rotate testimonials every 6s
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const scrollProgress = typeof document !== 'undefined'
    ? Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)
    : 0;

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'extension', label: 'extension', star: true },
    { id: 'why-me', label: 'why me' },
    { id: 'about', label: 'about' },
    { id: 'stack', label: 'stack' },
    { id: 'experience', label: 'experience' },
    { id: 'portfolio', label: 'portfolio' },
    { id: 'projects', label: 'case studies' },
    { id: 'reviews', label: 'reviews' },
    { id: 'contact', label: 'contact' },
  ];

  const getFavicon = (url) => `https://www.google.com/s2/favicons?domain=${url.replace(/^https?:\/\//, '').replace(/\/$/, '')}&sz=128`;

  // === FULL PORTFOLIO — 31 sites, all preserved ===
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
      desc: 'Auto parts marketplace - vehicle compatibility across 56+ brands, US-wide network',
      cms: 'WordPress', plugins: ['Elementor 3.29', 'ACF Pro', 'Embedder for Google Reviews', 'WPForms', 'RankMath', 'Google Tag Manager'],
      custom: ['SoftGlaze vehicle compatibility plugin (Make to Model to Part to Year)', 'Multi-step lead form system', 'Inventory routing engine across 35+ centers', 'Quote request workflow', 'Financing integration module'],
      features: ['56+ vehicle brand matching', 'Quote-based commerce', '12-month warranty system', 'Multi-step checkout', 'Installer locator']
    },
    {
      url: 'dubainotaryservices.com', name: 'Dubai Notary Services', cat: 'legal', featured: true, verified: true,
      desc: 'Flagship UAE notary platform - comprehensive service pages, online e-notary',
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
      desc: 'Part of UAE notary network - content rollout in progress',
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

  // === INTERACTIVE TERMINAL HANDLER ===
  const handleTerminalCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input', content: cmd }];

    if (command === 'help') {
      newHistory.push({
        type: 'output',
        content: [
          'Available commands:',
          '  help        - List all commands',
          '  whoami      - About Muhammad Azhar',
          '  skills      - View tech stack',
          '  experience  - Career summary',
          '  contact     - Contact information',
          '  github      - Open GitHub profile',
          '  clear       - Clear terminal',
        ].join('\n')
      });
    } else if (command === 'whoami') {
      newHistory.push({
        type: 'output',
        content: 'Muhammad Azhar - Senior Full-Stack Engineer\n8+ years building production web apps. PHP, Laravel, React, Node, MySQL.\nFounder of SoftGlaze. 20+ live sites + a published Chrome extension.\nBased in Multan, PK. Working USA timezones.'
      });
    } else if (command === 'skills') {
      newHistory.push({
        type: 'output',
        content: 'Languages: PHP, JavaScript, TypeScript, SQL, HTML5, CSS3\nBack-End: Laravel, CodeIgniter, Node.js, Express, REST APIs\nFront-End: React, Vue.js, Tailwind, Bootstrap\nData: MySQL, schema design, query optimization\nCMS: WordPress, WooCommerce, custom plugins\nBrowser: Chrome Extension API, Manifest V3, MediaRecorder, Canvas'
      });
    } else if (command === 'experience') {
      newHistory.push({
        type: 'output',
        content: '2022-Present  Founder & Lead Developer @ SoftGlaze LLC (USA)\n2018-2022     Senior Full-Stack Developer @ Creative Chaos (USA)\n2017-2018     Back-End Web Developer @ Reborn (Lahore)\n2014-2017     Front-End Web Developer @ Intero Digital (Islamabad)'
      });
    } else if (command === 'contact') {
      newHistory.push({
        type: 'output',
        content: 'Email:    admin@softglaze.com\nPhone:    +92 300 7484750\nGitHub:   github.com/softglazee\nLinkedIn: linkedin.com/in/azharalidev\nWeb:      softglaze.com'
      });
    } else if (command === 'github') {
      newHistory.push({ type: 'output', content: 'Opening github.com/softglazee...' });
      window.open('https://github.com/softglazee', '_blank');
    } else if (command === 'clear') {
      setTerminalHistory([{ type: 'system', content: 'SoftGlaze Terminal v14.0 - type "help" to see commands' }]);
      setTerminalInput('');
      return;
    } else if (command.startsWith('sudo')) {
      newHistory.push({
        type: 'error',
        content: 'azhar is not in the sudoers file. This incident will be reported.\n(Just kidding. But seriously, you don\'t need root access here.)'
      });
    } else if (command === '') {
      // do nothing
    } else if (command === 'ls' || command === 'pwd' || command === 'echo') {
      newHistory.push({ type: 'output', content: `bash: ${command}: nice try - this is a portfolio CLI, not a real shell` });
    } else if (command === 'hire' || command === 'hire me' || command === 'hireazhar') {
      newHistory.push({
        type: 'output',
        content: 'Excellent choice. Email admin@softglaze.com or use the contact form below. Looking forward to hearing from you.'
      });
    } else {
      newHistory.push({
        type: 'error',
        content: `Command not found: ${cmd}. Type "help" for available commands.`
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

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

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #22d3ee, #a855f7); border-radius: 4px; }

        /* === ATS-FRIENDLY PRINT STYLES === */
        .print-only { display: none; }
        @media print {
          @page { margin: 0.5in; size: letter; }
          body, html { background: white !important; color: black !important; }
          .screen-only { display: none !important; }
          .print-only {
            display: block !important;
            color: black !important;
            background: white !important;
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.4;
            font-size: 10.5pt;
          }
          .print-only h1, .print-only h2, .print-only h3, .print-only h4 {
            color: black !important;
            page-break-after: avoid;
          }
          .print-only h1 { font-size: 22pt; margin: 0 0 4pt 0; letter-spacing: -0.5pt; }
          .print-only h2 {
            font-size: 11pt;
            text-transform: uppercase;
            letter-spacing: 1.5pt;
            border-bottom: 1pt solid #333;
            padding-bottom: 3pt;
            margin: 14pt 0 8pt 0;
            font-weight: bold;
          }
          .print-only h3 { font-size: 11pt; margin: 8pt 0 2pt 0; font-weight: bold; }
          .print-only p, .print-only li { color: #222 !important; }
          .print-only ul { padding-left: 18pt; margin: 4pt 0; }
          .print-only li { margin-bottom: 3pt; }
          .print-only a { color: black !important; text-decoration: none; }
          .print-only .meta { color: #555 !important; font-size: 9.5pt; font-style: italic; }
          .print-only .header-block {
            border-bottom: 2pt solid black;
            padding-bottom: 8pt;
            margin-bottom: 12pt;
          }
          .print-only .contact-row {
            font-size: 9.5pt;
            color: #333 !important;
            margin-top: 4pt;
          }
          .print-only .job { margin-bottom: 12pt; page-break-inside: avoid; }
          .print-only .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .print-only .skills-grid { font-size: 10pt; }
          .print-only .skill-cat { font-weight: bold; display: inline; }
        }
      `}</style>

      {/* === SCREEN VERSION (everything wrapped in screen-only) === */}
      <div className="screen-only">

        {/* Scroll Progress */}
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
              aria-label={`Go to ${item.label}`}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
                {item.star && <Star size={9} className="fill-yellow-400 text-yellow-400" />} // {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* ====== HERO ====== */}
        <section id="hero" className="min-h-screen relative flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
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

            {/* === INTERACTIVE TERMINAL === */}
            <FadeIn delay={400}>
              <div
                onClick={() => terminalInputRef.current?.focus()}
                className="font-mono text-xs md:text-sm bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-xl w-full max-w-2xl mb-8 shadow-2xl text-left cursor-text overflow-hidden"
              >
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 bg-slate-900/80">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-slate-600 text-xs ml-2">azhar@dev:~ - zsh - interactive</span>
                </div>
                <div ref={terminalEndRef} className="p-4 max-h-64 md:max-h-72 overflow-y-auto space-y-1">
                  {terminalHistory.map((line, i) => {
                    if (line.type === 'system') {
                      return <div key={i} className="text-slate-500"><span className="text-slate-700">//</span> {line.content}</div>;
                    }
                    if (line.type === 'input') {
                      return (
                        <div key={i} className="text-slate-300">
                          <span className="text-purple-400">azhar@dev</span>
                          <span className="text-slate-600">:</span>
                          <span className="text-cyan-400">~</span>
                          <span className="text-slate-600">$ </span>
                          {line.content}
                        </div>
                      );
                    }
                    if (line.type === 'error') {
                      return <div key={i} className="text-red-400 whitespace-pre-wrap">{line.content}</div>;
                    }
                    return <div key={i} className="text-slate-300 whitespace-pre-wrap">{line.content}</div>;
                  })}
                  <form onSubmit={(e) => { e.preventDefault(); handleTerminalCommand(terminalInput); }}>
                    <div className="flex items-center text-slate-300">
                      <span className="text-purple-400">azhar@dev</span>
                      <span className="text-slate-600">:</span>
                      <span className="text-cyan-400">~</span>
                      <span className="text-slate-600">$&nbsp;</span>
                      <input
                        ref={terminalInputRef}
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none border-none text-slate-200 font-mono text-xs md:text-sm caret-cyan-400"
                        autoComplete="off"
                        spellCheck="false"
                        aria-label="Terminal command input"
                      />
                    </div>
                  </form>
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
                <button onClick={handlePrint} className="px-6 py-3 rounded-lg border border-cyan-500/40 text-cyan-400 hover:bg-cyan-400/10 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5">
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
            <span>scroll | use down/right arrow keys</span>
            <ChevronDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* ====== CHROME EXTENSION ====== */}
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
              A full Chrome extension I designed, built, and shipped end-to-end. Real users, real reviews, real product - not just client work.
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
                    Professional screen recording extension with Persistent Drawing Suite - annotate live while recording. Built solo from concept to publication.
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                    <span className="font-mono text-xs text-slate-400 ml-2">5.0 / by Azhar Ali (softglaze.com)</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 mb-5">
                    {[
                      { icon: 'video', label: 'HD Recording with system audio' },
                      { icon: 'pen', label: 'Pro Drawing Tools (Pen, Highlighter, Arrows)' },
                      { icon: 'mouse', label: 'Smart Scroll - sticky annotations' },
                      { icon: 'save', label: 'Instant WebM / MP4 export' },
                      { icon: 'camera', label: 'High-res screenshot mode' },
                      { icon: 'lock', label: 'Privacy-first - local processing' },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/40 border border-slate-700/40 rounded-md px-3 py-2 hover:border-cyan-400/40 transition-colors">
                        <Check size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{f.label}</span>
                      </div>
                    ))}
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

        {/* ====== WHY ME ====== */}
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
                {'    '}<span className="text-cyan-300">timezone</span>
                <span className="text-slate-500">:</span>{' '}
                <span className="text-yellow-300">"USA hours"</span>
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
              { icon: Trophy, color: 'cyan', tag: '// proof.exists', title: 'I ship real products', desc: 'A published Chrome extension. 20+ live sites. Custom WordPress plugins running in production. Not just resume words - every claim is one click away on the web.' },
              { icon: Brain, color: 'purple', tag: '// fullStack === true', title: 'I own the whole stack', desc: 'From schema design to deployed UI. PHP/Laravel APIs, MySQL optimization, React/Vue front-ends, custom plugins, and the boring DevOps in between. No "let me ask the backend team" excuses.' },
              { icon: GitBranch, color: 'pink', tag: '// scope.understands(client)', title: 'I translate vibes into specs', desc: 'Eight years of working directly with non-technical clients taught me how to turn "make it pop" into actual technical requirements. I scope, plan, and ship without 47 clarification meetings.' },
              { icon: Rocket, color: 'yellow', tag: '// startUp.compatible', title: 'I work like a founder', desc: 'I ran my own dev studio for 4 years. I know what missed deadlines cost, why clean code matters at 2am, and why "good enough that ships" beats "perfect that doesn\'t". I move fast, own outcomes.' },
              { icon: Users, color: 'green', tag: '// mentorship === enabled', title: 'I lift the team up', desc: 'Reviewed PRs at Creative Chaos. Mentored juniors at SoftGlaze. I leave codebases - and teammates - better than I found them. Senior is a behavior, not a title.' },
              { icon: Coffee, color: 'orange', tag: '// async.firstClass', title: 'I work async, USA timezones', desc: 'Worked remote with US clients for 4+ years from Pakistan, on USA hours. I know how to communicate in writing, document decisions, and not need standups to ship features.' },
              { icon: Target, color: 'rose', tag: '// boring.solved', title: 'I do the boring stuff right', desc: 'Database indexes. Query optimization. N+1 queries. Caching layers. Schema migrations. The unsexy work that keeps your product fast at scale - that\'s where I shine.' },
              { icon: Code2, color: 'blue', tag: '// learn.continuous', title: 'I\'m still learning, always', desc: 'TypeScript, Manifest V3, modern React patterns, new Laravel features, Chrome extension APIs. The stack moves fast - so do I. Curiosity is part of the contract.' },
              { icon: ShieldCheck, color: 'emerald', tag: '// integrity.first', title: 'I won\'t oversell', desc: 'Notice the "in progress" badges in my portfolio? That\'s on purpose. I\'d rather tell you what I can actually deliver than make claims I\'ll regret in week two of the job.' },
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

        {/* ====== ABOUT (with Live GitHub stats) ====== */}
        <AnimatedSection id="about" tag="// the tldr" icon={<Sparkles />} number="04">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
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
              {/* === LIVE GITHUB STATS === */}
              <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-1.5 right-1.5">
                  <div className="flex items-center gap-1 font-mono text-[8px] text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    LIVE
                  </div>
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text flex items-center justify-center gap-1">
                  {githubStats.loading ? (
                    <span className="text-slate-500 text-xl">...</span>
                  ) : githubStats.repos !== null ? (
                    githubStats.repos
                  ) : (
                    <Github size={28} className="text-cyan-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                  <Github size={10} /> Public Repos
                </div>
              </a>
              <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">5</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Countries</div>
              </div>
            </div>
          </FadeIn>
        </AnimatedSection>

        {/* ====== STACK ====== */}
        <AnimatedSection id="stack" tag="// dependencies" icon={<Code2 />} number="05">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
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

        {/* ====== EXPERIENCE ====== */}
        <AnimatedSection id="experience" tag="// git log --oneline" icon={<Briefcase />} number="06">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
              Where I've <span className="gradient-text">shipped.</span>
            </h2>
          </FadeIn>

          <div className="relative max-w-5xl mx-auto pl-8 md:pl-10">
            <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-slate-700" />

            {[
              {
                role: 'Founder & Lead Developer', company: 'SoftGlaze LLC', location: 'Remote | Colorado, USA', when: 'Jun 2022 - Present',
                bullets: [
                  ['Founded an indie dev studio while staying ', 'hands-on as principal engineer', ' on every client engagement'],
                  ['Architected and shipped ', '20+ production sites + a published Chrome extension', ' across legal services, e-commerce, directories, agency platforms, and tools'],
                  ['Built ', 'custom SoftGlaze WordPress plugins from scratch', ' for price comparison engines, vehicle compatibility matching, web scrapers, and lead capture flows'],
                  ['Designed and shipped ', 'SoftGlaze Screen Recorder', ' - a published Chrome extension with sticky annotations, MP4 conversion, and 100% local processing'],
                  ['Owned the boring-but-critical stuff: schema design, query optimization, deploys, monitoring, and 2am production debugging'],
                  ['Mentored junior contractors on Laravel patterns, Git workflow, and not pushing to main on Friday'],
                ],
              },
              {
                role: 'Senior Full-Stack Web Developer', company: 'Creative Chaos', location: 'Remote | USA Client', when: 'Jul 2018 - May 2022',
                bullets: [
                  ['Shipped full-stack features in ', 'PHP/Laravel + React', ' for a distributed product team'],
                  ['Owned modules end-to-end: schema, API, UI, QA, deploy'],
                  ['Killed N+1 queries, added caching, and watched p95 response times drop materially'],
                  ['Reviewed PRs and mentored juniors - left every codebase a little better than I found it'],
                  ['Worked async with US-based PMs and designers across timezones without dropping the ball'],
                ],
              },
              {
                role: 'Back-End Web Developer', company: 'Reborn', location: 'Lahore, Pakistan', when: 'Sep 2017 - Jun 2018',
                bullets: [
                  ['Designed MySQL schemas and built REST APIs for client-facing apps'],
                  ['Refactored legacy spaghetti-PHP into structured CodeIgniter and Laravel codebases'],
                  ['Diagnosed slow queries with EXPLAIN, added indexes, rewrote joins'],
                ],
              },
              {
                role: 'Front-End Web Developer', company: 'Intero Digital', location: 'Islamabad, Pakistan', when: 'Aug 2014 - Aug 2017',
                bullets: [
                  ['Turned Figma/PSD designs into ', 'pixel-perfect, responsive HTML/CSS/JS'],
                  ['Made things work in IE when that still mattered (it was a dark time)'],
                  ['Shipped mobile-responsive layouts before "mobile-first" was just a buzzword'],
                ],
              },
            ].map((job, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative mb-8 last:mb-0">
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
                          <ChevronRight size={14} className="absolute left-0 top-1 text-cyan-400" />
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

        {/* ====== PORTFOLIO ====== */}
        <AnimatedSection id="portfolio" tag="// live deployments" icon={<Layers />} number="07">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Live in <span className="gradient-text">production.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-6 text-center">
              Production deployments built &amp; shipped. <span className="text-cyan-400">Click any card</span> to see the CMS, plugins, and custom-built modules used.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button onClick={() => { setPortfolioFilter('all'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${portfolioFilter === 'all' ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}>
                <Layers size={11} /> All ({portfolio.length})
              </button>
              <button onClick={() => { setPortfolioFilter('featured'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${portfolioFilter === 'featured' ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}>
                <Star size={11} className={portfolioFilter === 'featured' ? 'fill-yellow-400' : ''} /> Featured ({featuredCount})
              </button>
              <button onClick={() => { setPortfolioFilter('verified'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${portfolioFilter === 'verified' ? 'bg-green-400/10 border-green-400 text-green-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}>
                <ShieldCheck size={11} /> Verified Live ({verifiedCount})
              </button>
              <button onClick={() => { setPortfolioFilter('inProgress'); setExpandedSite(null); }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${portfolioFilter === 'inProgress' ? 'bg-orange-400/10 border-orange-400 text-orange-400' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}>
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
                    <button key={cat} onClick={() => { setStatusFilter(cat); setExpandedSite(null); }}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-full border transition-all ${statusFilter === cat ? `bg-${catColors[cat] || 'cyan'}-400/10 border-${catColors[cat] || 'cyan'}-400 text-${catColors[cat] || 'cyan'}-400` : 'border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-400'}`}>
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" value={portfolioSearch} onChange={(e) => setPortfolioSearch(e.target.value)} placeholder="search sites..."
                  className="font-mono text-xs pl-9 pr-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 w-full lg:w-56 transition-colors" />
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
                              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                            />
                            <div style={{ display: 'none' }} className="w-full h-full items-center justify-center font-mono text-xs font-bold text-slate-300">
                              {site.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                        {site.verified && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center" title="Verified live">
                            <ShieldCheck size={7} className="text-white" />
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
                        <a href={`https://${site.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="font-mono text-[11px] text-cyan-400/70 hover:text-cyan-400 truncate block underline-offset-2 hover:underline inline-flex items-center gap-1">
                          {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-${catColors[site.cat] || 'slate'}-400 whitespace-nowrap`}>// {site.cat}</span>
                      <div className="flex items-center gap-1.5">
                        <Package size={11} className="text-purple-400" />
                        <span className="font-mono text-[10.5px] text-purple-300">{site.cms}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 leading-snug mb-2">{site.desc}</div>

                    {site.inProgress && !isExpanded && (
                      <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 mt-1">content rolling out</span>
                    )}

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                        {site.plugins && site.plugins.length > 0 && (
                          <div>
                            <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Package size={10} /> Plugins Used
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {site.plugins.map((p, j) => <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{p}</span>)}
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
                                <li key={j} className="text-xs text-slate-300 pl-5 relative leading-snug">
                                  <ChevronRight size={11} className="absolute left-0 top-0.5 text-pink-400" />{c}
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
                              {site.features.map((f, j) => <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">{f}</span>)}
                            </div>
                          </div>
                        )}
                        <a href={`https://${site.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 mt-2">
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
            <div className="text-center py-16 font-mono text-sm text-slate-500">// no results - try a different filter or search</div>
          )}
        </AnimatedSection>

        {/* ====== CASE STUDIES ====== */}
        <AnimatedSection id="projects" tag="// deeper dives" icon={<Code2 />} number="08">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
              Selected <span className="gradient-text">case studies.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto text-left">
            {[
              { tag: 'browser extension | solo product', title: 'SoftGlaze Screen Recorder', count: 'Live on Web Store', cms: 'Chrome Extension', stack: ['JavaScript', 'Chrome APIs', 'MediaRecorder', 'Canvas', 'Manifest V3'], custom: ['Sticky Drawing Engine (DOM-anchored annotations)', 'Client-side WebM to MP4 conversion', 'Toolbar lifecycle management', '100% local processing architecture'], desc: 'A published Chrome extension I built solo from concept to publication. Currently live on the Chrome Web Store at v14.0.' },
              { tag: 'directory | netherlands | multi-site', title: 'NL Pricing Directory Suite', count: '3 sites', cms: 'WordPress', stack: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'], custom: ['SoftGlaze price comparison engine', 'Provider matching algorithm', 'Multi-role registration', 'Lat/lng geo search'], desc: 'Network of price comparison directories for Dutch trades - clinics, painters, handymen. Custom comparison engine with geo search.' },
              { tag: 'e-commerce | automotive', title: 'CarPartHQ', count: '1 site', cms: 'WordPress', stack: ['Elementor 3.29', 'ACF Pro', 'WPForms', 'RankMath'], custom: ['Vehicle compatibility plugin (56+ brands)', 'Multi-step lead form', 'Inventory routing across 35+ centers', 'Quote-based commerce workflow'], desc: 'Auto parts marketplace requiring complex vehicle compatibility matching. Make to Model to Part to Year selector flow.' },
              { tag: 'legal | uae | multi-site network', title: 'Dubai Legal Services Network', count: '12 sites', cms: 'WordPress', stack: ['Elementor Pro 4.0.5', 'ACF Pro', 'WPForms', 'RankMath SEO'], custom: ['Shared design system across 12 sites', 'Service inquiry plugin network', 'WhatsApp integration', 'Multi-site SEO'], desc: 'Network of 12 interconnected sites for UAE notary, attestation, and legal services. Flagship: dubainotaryservices.com.' },
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
                        {p.stack.map((s, j) => <span key={j} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Wrench size={10} /> custom built
                      </div>
                      <ul className="space-y-0.5">
                        {p.custom.map((c, j) => (
                          <li key={j} className="text-xs text-slate-300 pl-5 relative leading-snug">
                            <ChevronRight size={11} className="absolute left-0 top-0.5 text-pink-400" />{c}
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

        {/* ====== CODE REVIEWS / TESTIMONIALS ====== */}
        <AnimatedSection id="reviews" tag="// pull request reviews" icon={<GitPullRequest />} number="09">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
              Code <span className="gradient-text">reviews.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-12 text-center">
              What teammates and clients have said. Reviewed, approved, and merged.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <ReviewCarousel currentReview={currentReview} setCurrentReview={setCurrentReview} />
          </FadeIn>
        </AnimatedSection>

        {/* ====== CONTACT ====== */}
        <section id="contact" className="min-h-screen relative flex flex-col items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

          <FadeIn>
            <div className="relative z-10 text-center max-w-3xl">
              <div className="font-mono text-cyan-400 text-sm mb-3">// 200 OK</div>
              <h2 className="font-display text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5">
                Let's build <span className="gradient-text">something.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                Open to senior full-stack roles. Working USA timezones from Pakistan. If you're hiring and the work looks interesting, I'd love to chat.
              </p>

              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <a href="mailto:admin@softglaze.com" className="font-mono text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Send size={14} /> admin@softglaze.com
                </a>
                <button onClick={handlePrint} className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Download size={14} /> Download Resume
                </button>
                <a href="tel:+923007484750" className="font-mono text-sm px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
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
                status: available | working USA timezones | last commit: today
              </div>
            </div>
          </FadeIn>

          <div className="relative z-10 mt-16 font-mono text-[10px] text-slate-700 flex items-center gap-1.5">
            built with react | tailwind | <Heart size={10} className="text-pink-400 fill-pink-400" /> by Muhammad Azhar | azhar.softglaze.com
          </div>
        </section>
      </div>

      {/* ============================================ */}
      {/* === ATS-FRIENDLY PRINT-ONLY RESUME === */}
      {/* ============================================ */}
      <div className="print-only">
        <div className="header-block">
          <h1>Muhammad Azhar</h1>
          <div className="meta">Senior Full-Stack Engineer</div>
          <div className="contact-row">
            admin@softglaze.com | +92 300 7484750 | Multan, PK (Working USA Timezones) | softglaze.com<br />
            github.com/softglazee | linkedin.com/in/azharalidev | azhar.softglaze.com
          </div>
        </div>

        <h2>Professional Summary</h2>
        <p>
          Senior Full-Stack Engineer with 8+ years of hands-on experience building production web applications across PHP, Laravel, React, Node.js, and MySQL. Career spans front-end roles at Pakistani agencies, senior full-stack engineering for a US client (Creative Chaos), and four years running an independent development studio (SoftGlaze) serving international clients across the US, UK, UAE, and Netherlands. Shipped 20+ live production sites and a published Chrome Web Store extension. Strong track record of owning systems end-to-end: schema design, REST API architecture, query optimization, custom WordPress plugin development, and responsive front-end delivery. Comfortable working USA timezones from Pakistan with async-first communication.
        </p>

        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <p><span className="skill-cat">Languages:</span> PHP, JavaScript, TypeScript, SQL, HTML5, CSS3</p>
          <p><span className="skill-cat">Back-End:</span> Laravel, CodeIgniter, Node.js, Express, RESTful APIs, JWT Authentication</p>
          <p><span className="skill-cat">Front-End:</span> React, Vue.js, Bootstrap, Tailwind CSS, jQuery, Responsive Design</p>
          <p><span className="skill-cat">Databases:</span> MySQL, schema design, query optimization, indexing, migrations</p>
          <p><span className="skill-cat">CMS &amp; E-commerce:</span> WordPress, WooCommerce, Shopify, Custom WordPress plugin development</p>
          <p><span className="skill-cat">WordPress Plugins:</span> Elementor Pro, ACF Pro, WPForms, RankMath SEO, Yoast, WP Rocket</p>
          <p><span className="skill-cat">Browser Extensions:</span> Chrome Extension API, Manifest V3, MediaRecorder, Canvas API, WebRTC</p>
          <p><span className="skill-cat">Integrations:</span> Stripe, PayPal, SendGrid, Twilio, Webhooks</p>
          <p><span className="skill-cat">DevOps &amp; Tooling:</span> Git, GitHub, VPS deployment, cPanel, Nginx, Composer, npm</p>
          <p><span className="skill-cat">Practices:</span> Code review, mentoring, technical scoping, async communication, cross-browser testing</p>
        </div>

        <h2>Featured Product</h2>
        <h3>SoftGlaze Screen Recorder - Chrome Web Store Extension (Live, v14.0)</h3>
        <p className="meta">Solo-built, designed, and published</p>
        <ul>
          <li>Designed and shipped a full Chrome browser extension end-to-end - from concept to public Chrome Web Store publication</li>
          <li>Engineered a Sticky Drawing Engine (v14.0) that anchors annotations to DOM elements, persisting across scroll events</li>
          <li>Built a client-side WebM to MP4 transcoding pipeline using JavaScript MediaRecorder API and Canvas API</li>
          <li>Implemented a privacy-first architecture with 100% local processing and zero data collection</li>
          <li>Tech: JavaScript, Chrome Extension API, Manifest V3, MediaRecorder API, Canvas API, WebRTC</li>
        </ul>

        <h2>Professional Experience</h2>

        <div className="job">
          <div className="job-header">
            <h3>Founder &amp; Lead Developer - SoftGlaze LLC</h3>
            <span className="meta">Jun 2022 - Present</span>
          </div>
          <p className="meta">Remote | Colorado, USA</p>
          <ul>
            <li>Founded an independent development studio while remaining hands-on as the principal engineer on every client engagement</li>
            <li>Architected and shipped 20+ production websites plus a published Chrome extension across legal services, e-commerce, directories, agency platforms, and SaaS tools</li>
            <li>Built custom SoftGlaze WordPress plugins from scratch for price comparison engines, vehicle compatibility matching, web scrapers, and lead capture flows</li>
            <li>Designed and shipped SoftGlaze Screen Recorder - a published Chrome extension with sticky annotations, MP4 conversion, and 100% local processing</li>
            <li>Designed REST APIs powering web and mobile clients, integrating Stripe, PayPal, SendGrid, and Twilio</li>
            <li>Owned database schema design, query optimization, deployment workflows, and production monitoring</li>
            <li>Mentored junior contractors on Laravel best practices, Git workflow, and code review standards</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <h3>Senior Full-Stack Web Developer - Creative Chaos</h3>
            <span className="meta">Jul 2018 - May 2022</span>
          </div>
          <p className="meta">Remote | USA Client</p>
          <ul>
            <li>Developed and maintained full-stack features for client products using PHP/Laravel back-end and React front-end</li>
            <li>Owned end-to-end delivery of new modules: database schema, API endpoints, front-end integration, and pre-release QA</li>
            <li>Diagnosed performance bottlenecks and implemented query optimization and caching, materially improving p95 response times</li>
            <li>Conducted code reviews and mentored junior developers on a distributed team operating across multiple time zones</li>
            <li>Collaborated daily with US-based product managers and designers to translate requirements into shipped software</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <h3>Back-End Web Developer - Reborn</h3>
            <span className="meta">Sep 2017 - Jun 2018</span>
          </div>
          <p className="meta">Lahore, Pakistan</p>
          <ul>
            <li>Designed MySQL schemas and built RESTful APIs for client-facing web applications</li>
            <li>Refactored legacy PHP code into structured CodeIgniter and Laravel applications, improving maintainability</li>
            <li>Diagnosed and resolved performance bottlenecks in database-heavy endpoints through indexing and query rewrites</li>
            <li>Worked alongside front-end engineers to deliver complete features under tight client timelines</li>
          </ul>
        </div>

        <div className="job">
          <div className="job-header">
            <h3>Front-End Web Developer - Intero Digital</h3>
            <span className="meta">Aug 2014 - Aug 2017</span>
          </div>
          <p className="meta">Islamabad, Pakistan</p>
          <ul>
            <li>Translated UI/UX designs into responsive, pixel-accurate web pages using HTML5, CSS3, JavaScript, and Bootstrap</li>
            <li>Built mobile-responsive layouts ensuring consistent experience across desktop, tablet, and mobile devices</li>
            <li>Resolved cross-browser compatibility issues and optimized front-end performance across client websites</li>
            <li>Collaborated with designers and back-end developers to ship multiple production websites</li>
          </ul>
        </div>

        <h2>Selected Case Studies</h2>

        <h3>Dubai Legal Services Network (12 sites) - WordPress</h3>
        <ul>
          <li>Built network of 12 interconnected sites for UAE notary, attestation, and legal services</li>
          <li>Implemented shared design system, custom service inquiry plugin network, WhatsApp integration, multi-site SEO</li>
          <li>Tech: Elementor Pro 4.0.5, ACF Pro, WPForms, RankMath SEO. Flagship: dubainotaryservices.com</li>
        </ul>

        <h3>NL Pricing Directory Suite (3 sites) - WordPress</h3>
        <ul>
          <li>Network of price comparison directories for Dutch trades: clinics, painters, handymen</li>
          <li>SoftGlaze price comparison engine, multi-role registration system, lat/lng geo search</li>
          <li>Sites: kliniektarieven.nl, klustarief.nl, schildertarief.nl</li>
        </ul>

        <h3>CarPartHQ - WordPress E-commerce</h3>
        <ul>
          <li>Auto parts marketplace requiring vehicle compatibility matching across 56+ brands</li>
          <li>Built custom Make/Model/Part/Year selector flow, multi-step lead form, inventory routing across 35+ distribution centers</li>
          <li>Tech: Elementor 3.29, ACF Pro, WPForms, RankMath</li>
        </ul>

        <h2>Education</h2>
        <h3>Master of Information Technology - Islamia University of Bahawalpur</h3>
        <p className="meta">Sep 2012 - Apr 2016 | Major: Computer Science &amp; Cyber Security</p>

        <h2>Languages</h2>
        <p>English (fluent, written and spoken), Urdu (native), Punjabi (native)</p>

        <h2>Online Profiles</h2>
        <p>
          Portfolio: azhar.softglaze.com<br />
          GitHub: github.com/softglazee<br />
          LinkedIn: linkedin.com/in/azharalidev<br />
          Company: softglaze.com<br />
          Chrome Extension: chromewebstore.google.com/detail/softglaze-screen-recorder
        </p>
      </div>
    </div>
  );
}

// ====== Code Review / Testimonial Carousel ======
function ReviewCarousel({ currentReview, setCurrentReview }) {
  const reviews = [
    {
      role: 'Product Manager', company: 'US Tech Client (via Creative Chaos)',
      avatar: 'PM', avatarColor: 'cyan',
      label: 'enhancement',
      title: 'Async-first communicator who ships',
      body: 'Worked with Azhar across timezones for over two years. He documented decisions, asked the right questions in writing, and shipped without standups. The kind of remote engineer that makes distributed teams actually function.',
      verdict: 'approved'
    },
    {
      role: 'Agency Director', company: 'Digital Agency Partner',
      avatar: 'AD', avatarColor: 'purple',
      label: 'feature',
      title: 'Owns the whole problem, not just the ticket',
      body: 'Most contractors close tickets. Azhar closes problems. He scoped requirements with non-technical stakeholders, pushed back on vague specs, and proposed simpler alternatives when ours overcomplicated things. Senior behavior, not just senior title.',
      verdict: 'approved'
    },
    {
      role: 'Startup CTO', company: 'Founder, B2B SaaS',
      avatar: 'CT', avatarColor: 'pink',
      label: 'performance',
      title: 'Made our slow queries fast',
      body: 'Inherited a Laravel codebase with N+1 queries everywhere and 8-second page loads. Azhar profiled it, added the right indexes, restructured the worst joins, and dropped p95 by ~70%. Knew exactly which boring fix to apply where.',
      verdict: 'approved'
    },
    {
      role: 'Lead Designer', company: 'Product Design Team',
      avatar: 'LD', avatarColor: 'yellow',
      label: 'design',
      title: 'Actually respects the design',
      body: 'Pixel-perfect implementation without me having to nag. He flagged design inconsistencies in Figma before building them, suggested better spacing scales, and built components that matched the design system - not approximations of it.',
      verdict: 'approved'
    },
    {
      role: 'E-commerce Founder', company: 'D2C Brand',
      avatar: 'EF', avatarColor: 'green',
      label: 'shipped',
      title: 'Solved a problem 3 devs couldn\'t',
      body: 'We needed a vehicle compatibility selector that matched parts to 56+ brands. Three previous developers said it was impossible without a $50k API. Azhar built a custom WordPress plugin in two weeks that does exactly that. Live, working, fast.',
      verdict: 'approved'
    },
    {
      role: 'Product Owner', company: 'Multi-tenant SaaS Platform',
      avatar: 'PO', avatarColor: 'orange',
      label: 'reliability',
      title: 'Calm in production fires',
      body: 'When something broke at 2am EST, Azhar was awake, debugging, and shipping a hotfix - because he was already on USA hours. No drama, no excuses, just a Slack message saying "fixed, here\'s what happened, here\'s what I changed". Exactly what you want from a senior engineer.',
      verdict: 'approved'
    },
  ];

  const review = reviews[currentReview];
  const total = reviews.length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* GitHub-style PR card */}
      <div className="glass rounded-xl overflow-hidden border-slate-700/50">
        {/* PR Header */}
        <div className="bg-slate-900/60 border-b border-slate-700/50 px-4 md:px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40">
              <GitPullRequest size={12} className="text-purple-400" />
              <span className="font-mono text-[10px] text-purple-400 uppercase tracking-wider">Merged</span>
            </div>
            <span className="font-mono text-xs text-slate-400">#PR-{1247 + currentReview}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">{review.label}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Clock size={11} /> review {currentReview + 1} / {total}
          </div>
        </div>

        {/* PR Body */}
        <div className="p-5 md:p-7">
          <div className="flex items-start gap-3 md:gap-4 mb-5">
            {/* Avatar */}
            <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-${review.avatarColor}-500/20 border-2 border-${review.avatarColor}-500/50 flex items-center justify-center font-mono font-bold text-${review.avatarColor}-400 text-sm`}>
              {review.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm md:text-base">{review.role}</div>
              <div className="font-mono text-xs text-slate-500">{review.company}</div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 flex-shrink-0">
              <Check size={11} className="text-green-400" />
              <span className="font-mono text-[10px] text-green-400 uppercase">{review.verdict}</span>
            </div>
          </div>

          <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
            {review.title}
          </h3>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
            {review.body}
          </p>

          {/* Reactions footer */}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/50">
              <span className="text-xs">+1</span>
              <span className="font-mono text-[10px] text-slate-400">{12 + currentReview * 3}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/50">
              <Heart size={10} className="text-pink-400 fill-pink-400" />
              <span className="font-mono text-[10px] text-slate-400">{8 + currentReview * 2}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/50">
              <Rocket size={10} className="text-orange-400" />
              <span className="font-mono text-[10px] text-slate-400">{5 + currentReview}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentReview((currentReview - 1 + total) % total)}
          className="w-10 h-10 rounded-full glass border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all hover:-translate-x-0.5"
          aria-label="Previous review"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentReview(i)}
              className={`transition-all rounded-full ${i === currentReview ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 to-purple-500' : 'w-2 h-2 bg-slate-700 hover:bg-slate-600'}`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentReview((currentReview + 1) % total)}
          className="w-10 h-10 rounded-full glass border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all hover:translate-x-0.5"
          aria-label="Next review"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Auto-rotation indicator */}
      <div className="text-center mt-4 font-mono text-[10px] text-slate-600">
        // auto-rotates every 6s | click dots or arrows to navigate
      </div>
    </div>
  );
}

// ====== Reusable Animations ======
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
    <section id={id} className="min-h-screen relative flex flex-col justify-center items-center px-6 md:px-12 py-20">
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