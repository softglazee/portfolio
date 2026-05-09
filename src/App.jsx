import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ChevronDown, ExternalLink, Code2, Briefcase, GraduationCap, Send, Sparkles, Terminal, Zap, Layers, ArrowUpRight, Search, Package, Wrench, Chrome, Award, Star, ShieldCheck, Rocket, Heart, Brain, Target, Coffee, GitBranch, Users, Trophy } from 'lucide-react';

export default function CV() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [imageError, setImageError] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('featured');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'featured' | 'verified' | 'inProgress'
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [expandedSite, setExpandedSite] = useState(null);

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

  const sectionIds = ['hero', 'extension', 'why-me', 'about', 'stack', 'experience', 'portfolio', 'projects', 'contact'];

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
    { id: 'contact', label: 'contact' },
  ];

  // Helper: Get a Google favicon URL for any domain (always live)
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
      desc: 'Auto parts marketplace — vehicle compatibility across 56+ brands, US-wide network',
      cms: 'WordPress', plugins: ['Elementor 3.29', 'ACF Pro', 'Embedder for Google Reviews', 'WPForms', 'RankMath', 'Google Tag Manager'],
      custom: ['SoftGlaze vehicle compatibility plugin (Make → Model → Part → Year)', 'Multi-step lead form system', 'Inventory routing engine across 35+ centers', 'Quote request workflow', 'Financing integration module'],
      features: ['56+ vehicle brand matching', 'Quote-based commerce', '12-month warranty system', 'Multi-step checkout', 'Installer locator']
    },
    {
      url: 'dubainotaryservices.com', name: 'Dubai Notary Services', cat: 'legal', featured: true, verified: true,
      desc: 'Flagship UAE notary platform — comprehensive service pages, online e-notary',
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
      desc: 'Part of UAE notary network — content rollout in progress',
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
    // Status filter (featured/verified/inProgress)
    let matchesStatus = true;
    if (portfolioFilter === 'featured') matchesStatus = p.featured === true;
    else if (portfolioFilter === 'verified') matchesStatus = p.verified === true;
    else if (portfolioFilter === 'inProgress') matchesStatus = p.inProgress === true;

    // Category filter
    let matchesCat = statusFilter === 'all' || p.cat === statusFilter;

    const matchesSearch = portfolioSearch === '' ||
      p.name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.url.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(portfolioSearch.toLowerCase());

    return matchesStatus && matchesCat && matchesSearch;
  });

  // Counts
  const featuredCount = portfolio.filter(p => p.featured).length;
  const verifiedCount = portfolio.filter(p => p.verified).length;
  const inProgressCount = portfolio.filter(p => p.inProgress).length;

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
      `}</style>

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

      {/* ====== HERO ====== */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl blob" style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl blob" style={{ animationDelay: '6s', transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl blob" style={{ animationDelay: '12s' }} />

        <FadeIn>
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
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 flex items-center gap-1"><MapPin size={14} /> Multan, PK</span>
              </div>

              <p className="font-mono text-xs md:text-sm text-slate-500 mb-8 flex flex-wrap gap-x-2 justify-center">
                <span className="text-purple-400">PHP</span><span className="text-slate-700">/</span>
                <span className="text-cyan-400">Laravel</span><span className="text-slate-700">/</span>
                <span className="text-yellow-400">React</span><span className="text-slate-700">/</span>
                <span className="text-green-400">Node</span><span className="text-slate-700">/</span>
                <span className="text-pink-400">MySQL</span>
              </p>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="font-mono text-xs md:text-sm bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4 md:p-5 w-full max-w-2xl mb-8 shadow-2xl text-left">
                <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-slate-800">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-slate-600 text-xs ml-2">— azhar@dev — zsh</span>
                </div>
                <div className="text-slate-500"><span className="text-slate-700">{'//'}</span> 8 years shipping production code</div>
                <div className="text-slate-500"><span className="text-slate-700">{'//'}</span> 20+ live sites + Chrome extension</div>
                <div className="text-slate-500"><span className="text-slate-700">{'//'}</span> currently refactoring my career</div>
                <div className="mt-2">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-300">status</span>{' '}
                  <span className="text-slate-500">=</span>{' '}
                  <span className="text-yellow-300">"{typedText}"</span>
                  <span className="cursor inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"></span>
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
        </FadeIn>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-600 flex flex-col items-center gap-1">
          <span>scroll · or use ↓ → keys</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ====== CHROME EXTENSION ====== */}
      <AnimatedSection id="extension" tag="// flagship product" icon={<Award />} number="02">
        <FadeIn>
          <div className="text-center mb-3">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 uppercase tracking-widest">★ Featured Product</span>
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
                  Professional screen recording extension with Persistent Drawing Suite — annotate live while recording. Built solo from concept to publication.
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  <span className="font-mono text-xs text-slate-400 ml-2">5.0 / by Azhar Ali (softglaze.com)</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {[
                    { emoji: '🎥', label: 'HD Recording with system audio' },
                    { emoji: '✏️', label: 'Pro Drawing Tools (Pen, Highlighter, Arrows)' },
                    { emoji: '🖱️', label: 'Smart Scroll — sticky annotations' },
                    { emoji: '💾', label: 'Instant WebM / MP4 export' },
                    { emoji: '📸', label: 'High-res screenshot mode' },
                    { emoji: '🔒', label: 'Privacy-first — local processing' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/40 border border-slate-700/40 rounded-md px-3 py-2 hover:border-cyan-400/40 transition-colors">
                      <span className="text-base">{f.emoji}</span>
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
                    <li className="pl-4 relative leading-snug"><span className="absolute left-0 text-pink-400">▸</span><strong className="text-white">Sticky Drawing Engine (v14):</strong> annotations persist across scrolling using DOM element anchoring</li>
                    <li className="pl-4 relative leading-snug"><span className="absolute left-0 text-pink-400">▸</span><strong className="text-white">MP4 Conversion:</strong> client-side WebM → MP4 transcoding pipeline</li>
                    <li className="pl-4 relative leading-snug"><span className="absolute left-0 text-pink-400">▸</span><strong className="text-white">Toolbar logic:</strong> force-close handling for clean UX edge cases</li>
                    <li className="pl-4 relative leading-snug"><span className="absolute left-0 text-pink-400">▸</span><strong className="text-white">Privacy architecture:</strong> 100% local processing, zero data collection</li>
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

      {/* ====== WHY ME — NEW SECTION ====== */}
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

        {/* Code-style "return statement" intro */}
        <FadeIn delay={150}>
          <div className="font-mono text-xs md:text-sm bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4 md:p-5 w-full max-w-3xl mx-auto mb-10 shadow-2xl text-left">
            <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="text-slate-600 text-xs ml-2">— why-hire-azhar.ts</span>
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

        {/* Reasons grid */}
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

        {/* Closing CTA */}
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

      {/* ====== ABOUT ====== */}
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
            {[
              { num: '8+', label: 'Years Shipping' },
              { num: '20+', label: 'Live Sites' },
              { num: '1', label: 'Chrome Extension' },
              { num: '5', label: 'Countries' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">{s.num}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
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
              role: 'Founder & Lead Developer', company: 'SoftGlaze LLC', location: 'Remote · Colorado, USA', when: 'Jun 2022 — Present',
              bullets: [
                ['Founded an indie dev studio while staying ', 'hands-on as principal engineer', ' on every client engagement'],
                ['Architected and shipped ', '20+ production sites + a published Chrome extension', ' across legal services, e-commerce, directories, agency platforms, and tools'],
                ['Built ', 'custom SoftGlaze WordPress plugins from scratch', ' for price comparison engines, vehicle compatibility matching, web scrapers, and lead capture flows'],
                ['Designed and shipped ', 'SoftGlaze Screen Recorder', ' — a published Chrome extension with sticky annotations, MP4 conversion, and 100% local processing'],
                ['Owned the boring-but-critical stuff: schema design, query optimization, deploys, monitoring, and 2am production debugging'],
                ['Mentored junior contractors on Laravel patterns, Git workflow, and not pushing to main on Friday'],
              ],
            },
            {
              role: 'Senior Full-Stack Web Developer', company: 'Creative Chaos', location: 'Remote · USA Client', when: 'Jul 2018 — May 2022',
              bullets: [
                ['Shipped full-stack features in ', 'PHP/Laravel + React', ' for a distributed product team'],
                ['Owned modules end-to-end: schema → API → UI → QA → deploy'],
                ['Killed N+1 queries, added caching, and watched p95 response times drop materially'],
                ['Reviewed PRs and mentored juniors — left every codebase a little better than I found it'],
                ['Worked async with US-based PMs and designers across timezones without dropping the ball'],
              ],
            },
            {
              role: 'Back-End Web Developer', company: 'Reborn', location: 'Lahore, Pakistan', when: 'Sep 2017 — Jun 2018',
              bullets: [
                ['Designed MySQL schemas and built REST APIs for client-facing apps'],
                ['Refactored legacy spaghetti-PHP into structured CodeIgniter and Laravel codebases'],
                ['Diagnosed slow queries with EXPLAIN, added indexes, rewrote joins'],
              ],
            },
            {
              role: 'Front-End Web Developer', company: 'Intero Digital', location: 'Islamabad, Pakistan', when: 'Aug 2014 — Aug 2017',
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
                    {job.company} <span className="text-slate-600 mx-1.5">·</span>
                    <span className="text-slate-400">{job.location}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="pl-5 relative text-sm md:text-[15px] leading-relaxed text-slate-300">
                        <span className="absolute left-0 text-cyan-400">▸</span>
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

      {/* ====== PORTFOLIO with Logos & Working Status Filters ====== */}
      <AnimatedSection id="portfolio" tag="// live deployments" icon={<Layers />} number="07">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
            Live in <span className="gradient-text">production.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-6 text-center">
            Production deployments built &amp; shipped. <span className="text-cyan-400">Click any card</span> to see the CMS, plugins, and custom-built modules used.
          </p>
        </FadeIn>

        {/* CLICKABLE Status filter pills */}
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

        {/* Category filter */}
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
                    {/* CIRCULAR LOGO */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full p-[2px] ${site.featured ? 'bg-gradient-to-br from-yellow-400 via-cyan-400 to-purple-500' : site.verified ? 'bg-gradient-to-br from-green-500/60 to-cyan-500/60' : 'bg-gradient-to-br from-orange-500/40 to-pink-500/40'}`}>
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                          <img
                            src={getFavicon(site.url)}
                            alt={site.name}
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div style={{ display: 'none' }} className="w-full h-full items-center justify-center font-mono text-xs font-bold text-slate-300">
                            {site.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      {/* Status indicator dot on logo */}
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
                      <a
                        href={`https://${site.url.replace(/^https?:\/\//, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[11px] text-cyan-400/70 hover:text-cyan-400 truncate block underline-offset-2 hover:underline"
                      >
                        {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
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
                              <li key={j} className="text-xs text-slate-300 pl-3 relative leading-snug">
                                <span className="absolute left-0 text-pink-400">▸</span>{c}
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
            // no results — try a different filter or search
          </div>
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
            {
              tag: 'browser extension · solo product',
              title: 'SoftGlaze Screen Recorder',
              count: 'Live on Web Store',
              cms: 'Chrome Extension',
              stack: ['JavaScript', 'Chrome APIs', 'MediaRecorder', 'Canvas', 'Manifest V3'],
              custom: ['Sticky Drawing Engine (DOM-anchored annotations)', 'Client-side WebM → MP4 conversion', 'Toolbar lifecycle management', '100% local processing architecture'],
              desc: 'A published Chrome extension I built solo from concept to publication. Currently live on the Chrome Web Store at v14.0.',
            },
            {
              tag: 'directory · netherlands · multi-site',
              title: 'NL Pricing Directory Suite',
              count: '3 sites',
              cms: 'WordPress',
              stack: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
              custom: ['SoftGlaze price comparison engine', 'Provider matching algorithm', 'Multi-role registration', 'Lat/lng geo search'],
              desc: 'Network of price comparison directories for Dutch trades — clinics, painters, handymen. Custom comparison engine with geo search.',
            },
            {
              tag: 'e-commerce · automotive',
              title: 'CarPartHQ',
              count: '1 site',
              cms: 'WordPress',
              stack: ['Elementor 3.29', 'ACF Pro', 'WPForms', 'RankMath'],
              custom: ['Vehicle compatibility plugin (56+ brands)', 'Multi-step lead form', 'Inventory routing across 35+ centers', 'Quote-based commerce workflow'],
              desc: 'Auto parts marketplace requiring complex vehicle compatibility matching. Make → Model → Part → Year selector flow.',
            },
            {
              tag: 'legal · uae · multi-site network',
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
                        <li key={j} className="text-xs text-slate-300 pl-3 relative leading-snug">
                          <span className="absolute left-0 text-pink-400">▸</span>{c}
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
              Open to senior full-stack roles. If you're hiring and the work looks interesting, I'd love to chat. No copy-paste recruiter pitches, please.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <a href="mailto:admin@softglaze.com" className="font-mono text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                <Send size={14} /> admin@softglaze.com
              </a>
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
                <span>MS Information Technology · Islamia University of Bahawalpur · 2012–2016</span>
              </div>
              <div>
                <span className="text-purple-400">Languages</span> · English (fluent) · Urdu (native) · Punjabi (native)
              </div>
            </div>

            <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              status: available · last commit: today
            </div>
          </div>
        </FadeIn>

        <div className="relative z-10 mt-16 font-mono text-[10px] text-slate-700">
          built with react · tailwind · ❤️ by Muhammad Azhar · azhar.softglaze.com
        </div>
      </section>
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
