import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ChevronDown, ExternalLink, Code2, Briefcase, GraduationCap, Send, Sparkles, Terminal, Zap, Layers, ArrowUpRight, Search, Package, Wrench, Chrome, Award, Star, ShieldCheck, Rocket, Heart, X, Check, Cpu, GitBranch, Coffee, Clock, Globe2, Download, MessageSquare, GitPullRequest, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CV() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [imageError, setImageError] = useState(false);
  const [portfolioCatFilter, setPortfolioCatFilter] = useState('all');
  const [portfolioStatusFilter, setPortfolioStatusFilter] = useState('featured');
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [expandedSite, setExpandedSite] = useState(null);
  const [githubStats, setGithubStats] = useState(null);

  // Terminal State
  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState([
    { cmd: 'whoami', out: 'Muhammad Azhar - Senior Full-Stack Engineer' }
  ]);
  const termEndRef = useRef(null);

  // Review Slider State
  const [currentReview, setCurrentReview] = useState(0);

  const fullText = 'open to senior engineering roles';

  // Fetch GitHub Stats
  useEffect(() => {
    fetch('https://api.github.com/users/softglazee')
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) setGithubStats(data);
      })
      .catch(() => {});
  }, []);

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

  // Auto-slide Reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const sectionIds = ['hero', 'extension', 'about', 'why', 'stack', 'experience', 'portfolio', 'projects', 'reviews', 'contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2 }
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
    { id: 'about', label: 'about' },
    { id: 'why', label: 'why me?' },
    { id: 'stack', label: 'stack' },
    { id: 'experience', label: 'experience' },
    { id: 'portfolio', label: 'portfolio' },
    { id: 'projects', label: 'case studies' },
    { id: 'reviews', label: 'code reviews' },
    { id: 'contact', label: 'contact' },
  ];

  // Terminal Logic
  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.trim().toLowerCase();
      let out = '';
      
      if (cmd === '') return;
      if (cmd === 'clear') {
        setTermHistory([]);
        setTermInput('');
        return;
      }
      if (cmd === 'help') out = 'Available commands: whoami, skills, experience, contact, sudo rm -rf /';
      else if (cmd === 'whoami') out = 'Muhammad Azhar - Senior Full-Stack Engineer working USA Hours.';
      else if (cmd === 'skills') out = 'PHP, Laravel, React, Node.js, MySQL, WordPress, Chrome Extensions.';
      else if (cmd === 'experience') out = '8+ years shipping prod code. 20+ live sites. 1 Chrome Extension.';
      else if (cmd === 'contact') out = 'Email: admin@softglaze.com | Phone: +92 300 7484750';
      else if (cmd === 'sudo rm -rf /') out = 'Nice try. But I sanitized my inputs. ;)';
      else out = `Command not found: ${cmd}. Type 'help' for available commands.`;

      setTermHistory([...termHistory, { cmd: termInput, out }]);
      setTermInput('');
      setTimeout(() => termEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const getLogoUrl = (url) => {
    const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const reviews = [
    { author: 'US Client PM', handle: '@creative-chaos', text: 'Azhar does not just write code; he understands the business logic behind it. He owned the entire backend refactor while overlapping seamlessly with our US hours. Zero dropped balls.' },
    { author: 'Agency Director', handle: '@softglaze-client', text: 'We threw an incredibly complex vehicle compatibility system at him. He engineered a custom DB architecture that cut our load times by 70%.' },
    { author: 'CTO', handle: '@tech-startup', text: 'Finding a senior developer who actually ships on time and communicates perfectly async is rare. Azhar delivered our MVP 2 weeks ahead of schedule.' },
    { author: 'Lead Designer', handle: '@dubai-network', text: 'Azhar translated our complex Figma files into pixel-perfect React components. His attention to detail on the frontend is just as strong as his backend architecture.' },
    { author: 'E-commerce Founder', handle: '@carparthq', text: 'The custom routing engine he built for our 35+ distribution centers was a game-changer. He is a true full-stack engineer who solves hard problems.' },
    { author: 'Product Owner', handle: '@nl-directories', text: 'Azhar built our entire pricing comparison engine from scratch. His ability to take vague requirements and turn them into robust features is unmatched.' }
  ];

  const portfolio = [
    {
      url: 'kliniektarieven.nl', name: 'Kliniektarieven', cat: 'directory', featured: true, verified: true,
      desc: 'NL clinic price comparison platform with multi-role registration & geo search',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WP Font Awesome', 'WPForms', 'RankMath SEO', 'Google Tag Manager'],
      custom: ['SoftGlaze clinic comparison engine', 'Multi-role registration plugin (clinic + doctor)', 'Lat/lng-based search system', 'Custom dashboard for clinics', 'Newsletter popup integration'],
      features: ['Geo search by city', 'Clinic & doctor profiles', 'Lead routing to clinics', 'NL/Flanders localization', 'Booking flow'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      url: 'carparthq.com', name: 'CarPartHQ', cat: 'ecommerce', featured: true, verified: true,
      desc: 'Auto parts marketplace vehicle compatibility across 56+ brands, US-wide network',
      cms: 'WordPress', plugins: ['Elementor 3.29', 'ACF Pro', 'Embedder for Google Reviews', 'WPForms', 'RankMath', 'Google Tag Manager'],
      custom: ['SoftGlaze vehicle compatibility plugin (Make - Model - Part - Year)', 'Multi-step lead form system', 'Inventory routing engine across 35+ centers', 'Quote request workflow', 'Financing integration module'],
      features: ['56+ vehicle brand matching', 'Quote-based commerce', '12-month warranty system', 'Multi-step checkout', 'Installer locator'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      url: 'dubainotaryservices.com', name: 'Dubai Notary Services', cat: 'legal', featured: true, verified: true,
      desc: 'Flagship UAE notary platform comprehensive service pages, online e-notary',
      cms: 'WordPress', plugins: ['Elementor 4.0.5 / Pro', 'ACF Pro', 'WPForms', 'RankMath SEO', 'Google Tag Manager'],
      custom: ['SoftGlaze service inquiry plugin', 'Multi-service catalog system', 'Quote routing module', 'WhatsApp integration'],
      features: ['8+ service verticals', 'Pricing pages', 'FAQ accordion', 'Quote forms', 'Apostille & e-notary flows'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      url: 'silkosoft.com', name: 'Silkosoft', cat: 'agency', featured: true, verified: true,
      desc: 'Software agency platform with rich service architecture & case study showcase',
      cms: 'WordPress', plugins: ['Elementor 3.34.4 Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['Custom service catalog plugin', 'Case study CPT system', 'Multi-tier pricing module', 'Engagement model selector'],
      features: ['250+ project showcase logic', 'Multi-industry routing', 'Pricing tiers', 'Newsletter integration', 'Career portal'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      url: 'klustarief.nl', name: 'Klustarief', cat: 'directory', featured: true, verified: true,
      desc: 'NL handyman pricing directory with custom comparison engine',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze pricing comparison engine', 'Service provider CPT', 'Quote routing plugin'],
      features: ['Multi-category pricing', 'Provider matching', 'NL localization', 'Lead capture'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      url: 'schildertarief.nl', name: 'Schildertarief', cat: 'directory', featured: true, verified: true,
      desc: 'NL painter pricing directory with custom calculator',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze price calculator plugin', 'Painter directory CPT', 'Service matching engine'],
      features: ['Service pricing engine', 'Provider matching', 'NL localization'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      url: 'capcuttemplatesx.com', name: 'CapCut Templates X', cat: 'media', featured: true, verified: true,
      desc: 'Template marketplace with custom scraper and download tracking',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'WP Rocket', 'RankMath'],
      custom: ['SoftGlaze template scraper plugin', 'Custom template browser', 'Download tracking system'],
      features: ['Advanced search & filter', 'Category taxonomies', 'CDN-optimized delivery'],
      color: 'from-rose-500 to-pink-500'
    },
    {
      url: 'cpcclue.com', name: 'CPC Clue', cat: 'tools', featured: true, verified: true,
      desc: 'PPC analytics platform with custom scraper integration',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
      custom: ['SoftGlaze PPC scraper plugin', 'Analytics dashboard module', 'API integration layer'],
      features: ['Custom REST endpoints', 'Real-time data sync', 'Lead capture flow'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      url: 'thewherevers.com', name: 'The Wherevers', cat: 'travel', featured: true, verified: true,
      desc: 'Travel discovery platform with custom destination scraper',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'RankMath SEO', 'WPForms'],
      custom: ['SoftGlaze destination scraper', 'Custom map integration plugin', 'Travel guide CPT'],
      features: ['Dynamic location filtering', 'Geo-based search', 'Custom taxonomies'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      url: 'picsarthub.com', name: 'Picsart Hub', cat: 'media', featured: true, verified: true,
      desc: 'Creative resources hub with custom scraper for tutorials',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'RankMath SEO'],
      custom: ['SoftGlaze resource scraper', 'Custom resource library plugin', 'Tutorial CPT'],
      features: ['Resource browser', 'SEO-optimized', 'Content discovery'],
      color: 'from-fuchsia-500 to-purple-500'
    },
    { url: 'virtuvortex.com', name: 'VirtuVortex', cat: 'agency', featured: false, verified: true,
      desc: 'Tech services & solutions platform',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Custom service catalog plugin', 'Quote request module'],
      features: ['Multi-service routing', 'CRM integration', 'Animated landing'],
      color: 'from-violet-500 to-purple-500'
    },
    { url: 'pulselink.click', name: 'PulseLink', cat: 'tools', featured: false, verified: true,
      desc: 'Smart link management & click tracking',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze link tracker plugin', 'Click analytics engine', 'Short URL service'],
      features: ['Custom REST API', 'Click analytics', 'User dashboard'],
      color: 'from-pink-500 to-fuchsia-500'
    },
    { url: 'blinkwall.com', name: 'BlinkWall', cat: 'tools', featured: false, verified: true,
      desc: 'Web utility & content delivery tool',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'WPForms'],
      custom: ['SoftGlaze content delivery plugin', 'User dashboard module'],
      features: ['Member areas', 'Content gating', 'Custom REST endpoints'],
      color: 'from-amber-500 to-yellow-500'
    },
    { url: 'day2daycheck.com', name: 'Day2DayCheck', cat: 'tools', featured: false, verified: true,
      desc: 'Daily checklist & habit tracking platform',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze habit tracker plugin', 'User auth module', 'Streak tracking system'],
      features: ['Email reminders', 'User dashboards', 'Custom REST API'],
      color: 'from-emerald-500 to-green-500'
    },
    { url: 'costaspot.com', name: 'Costa Spot', cat: 'travel', featured: false, verified: true,
      desc: 'Travel & lifestyle destination guide',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'RankMath SEO'],
      custom: ['Custom destination module', 'Booking inquiry plugin', 'Image gallery system'],
      features: ['Location filters', 'Travel guide CPT', 'Mobile-optimized'],
      color: 'from-orange-500 to-red-500'
    },
    { url: 'loginizers.com', name: 'Loginizers', cat: 'tools', featured: false, verified: true,
      desc: 'Authentication & security utility',
      cms: 'WordPress', plugins: ['ACF Pro', 'WPForms'],
      custom: ['SoftGlaze auth flow plugin', 'Security toolkit module', 'OAuth integration layer'],
      features: ['Custom REST API', 'OAuth flows', 'Admin dashboard'],
      color: 'from-slate-500 to-gray-500'
    },
    { url: 'denebworks.com', name: 'DenebWorks', cat: 'agency', featured: false, verified: true,
      desc: 'Digital studio & creative agency',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms'],
      custom: ['Custom portfolio showcase plugin', 'Project case study CPT'],
      features: ['Animated portfolio', 'Filterable case studies', 'Lead forms'],
      color: 'from-indigo-500 to-blue-500'
    },
    { url: 'rawdigit.com', name: 'RawDigit', cat: 'agency', featured: false, verified: true,
      desc: 'Digital agency & creative services',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms'],
      custom: ['Custom service module', 'Client testimonial system'],
      features: ['Service catalog', 'Animated landing', 'Inquiry routing'],
      color: 'from-cyan-500 to-teal-500'
    },
    { url: 'bittlife.com', name: 'BittLife', cat: 'lifestyle', featured: false, verified: true,
      desc: 'Lifestyle content & community platform',
      cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'RankMath SEO'],
      custom: ['Custom content delivery modules', 'Member profile system'],
      features: ['Content categorization', 'User profiles', 'SEO-optimized'],
      color: 'from-emerald-500 to-teal-500'
    },
    { url: 'drmarchon.com', name: 'Dr. Marchon', cat: 'professional', featured: false, verified: true,
      desc: 'Medical professional practice site',
      cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Custom appointment inquiry plugin', 'Service offering CPT'],
      features: ['Appointment booking', 'Service descriptions', 'Patient resources'],
      color: 'from-blue-500 to-cyan-500'
    },
    // In progress sites
    ...[
      'privatenotaryindubai.ae', 'notarypublicdubai.online', 'notarypublicindubai.com',
      'notariolawyersuae.com', 'privatenotarydubai.com', 'attestationservicesdubai.com',
      'privatenotarypublicdubai.com', 'privatenotaryservicesdubai.com', 'notaryservicesdubai.com',
      'lawyerindubai.ae', 'notaryservicesindubai.com'
    ].map((url) => ({
      url,
      name: url.replace('.ae', '').replace('.online', '').replace('.com', '')
        .split(/(?=[A-Z])/).join(' ')
        .replace(/^\w/, c => c.toUpperCase())
        .replace(/dubai/gi, 'Dubai').replace(/uae/gi, 'UAE').replace(/notary/gi, 'Notary')
        .replace(/public/gi, 'Public').replace(/private/gi, 'Private').replace(/services/gi, 'Services')
        .replace(/lawyer/gi, 'Lawyer').replace(/attestation/gi, 'Attestation')
        .replace(/notario/gi, 'Notario').replace(/in /gi, 'in '),
      cat: 'legal', featured: false, verified: false, inProgress: true,
      desc: 'Part of UAE legal services network content rolling out',
      cms: 'WordPress', plugins: ['Elementor 4.0.5', 'ACF Pro', 'WPForms', 'RankMath'],
      custom: ['Network template system', 'Service inquiry module'],
      features: ['UAE-targeted SEO', 'Service inquiry forms', 'Part of 12-site legal network'],
      color: 'from-purple-500 to-violet-500'
    }))
  ];

  const categories = ['all', 'agency', 'legal', 'directory', 'tools', 'ecommerce', 'travel', 'media', 'professional', 'lifestyle'];
  const statusFilters = [
    { id: 'all', label: 'All', icon: Layers, color: 'cyan' },
    { id: 'featured', label: 'Featured', icon: Star, color: 'yellow' },
    { id: 'verified', label: 'Verified Live', icon: ShieldCheck, color: 'green' },
    { id: 'inprogress', label: 'In Progress', icon: Rocket, color: 'orange' },
  ];

  const catColors = {
    agency: 'cyan', legal: 'purple', directory: 'pink', tools: 'yellow',
    ecommerce: 'green', travel: 'orange', media: 'rose', professional: 'blue', lifestyle: 'emerald',
  };

  const filteredPortfolio = portfolio.filter((p) => {
    let matchesStatus = true;
    if (portfolioStatusFilter === 'featured') matchesStatus = p.featured === true;
    else if (portfolioStatusFilter === 'verified') matchesStatus = p.verified === true && !p.inProgress;
    else if (portfolioStatusFilter === 'inprogress') matchesStatus = p.inProgress === true;

    const matchesCat = portfolioCatFilter === 'all' || p.cat === portfolioCatFilter;
    const matchesSearch = portfolioSearch === '' ||
      p.name.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.url.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(portfolioSearch.toLowerCase());
    return matchesStatus && matchesCat && matchesSearch;
  });

  return (
    <>
    {/* ===== PRINT STYLES FOR PDF GENERATION ===== */}
    <style>{`
      @media print {
        @page { margin: 15mm; size: auto; }
        body { background: white !important; color: black !important; font-family: 'Inter', sans-serif !important; -webkit-print-color-adjust: exact; }
        .print-hidden { display: none !important; }
        .print-show { display: block !important; }
        .pdf-header { border-bottom: 2px solid #334155; padding-bottom: 16px; margin-bottom: 24px; }
        .pdf-name { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .pdf-title { font-size: 16px; font-weight: 600; color: #0284c7; margin-bottom: 8px; font-family: monospace; }
        .pdf-contact { font-size: 12px; color: #475569; display: flex; gap: 12px; margin-bottom: 4px; flex-wrap: wrap; }
        .pdf-section { margin-bottom: 24px; }
        .pdf-h2 { font-size: 18px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
        .pdf-job { margin-bottom: 16px; page-break-inside: avoid; }
        .pdf-job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .pdf-job-title { font-weight: 700; font-size: 15px; color: #1e293b; }
        .pdf-job-date { font-size: 12px; color: #64748b; font-family: monospace; }
        .pdf-job-company { font-size: 13px; font-weight: 600; color: #0284c7; margin-bottom: 8px; }
        .pdf-bullet { font-size: 13px; color: #334155; margin-bottom: 4px; padding-left: 12px; position: relative; line-height: 1.5; }
        .pdf-bullet::before { content: '-'; position: absolute; left: 0; color: #94a3b8; }
        .pdf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pdf-pill { display: inline-block; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin: 0 4px 4px 0; color: #334155; font-family: monospace; }
      }
      @media screen {
        .print-show { display: none !important; }
      }
    `}</style>

    {/* ===== HIDDEN ATS-FRIENDLY PDF RESUME ===== */}
    <div className="print-show bg-white min-h-screen p-8 max-w-4xl mx-auto">
      <div className="pdf-header">
        <div className="pdf-name">Muhammad Azhar</div>
        <div className="pdf-title">Senior Full-Stack Engineer</div>
        <div className="pdf-contact">
          <span>admin@softglaze.com</span> | 
          <span>+92 300 7484750</span> | 
          <span>Multan, PK (Working US Hours)</span> |
          <span>github.com/softglazee</span>
        </div>
        <div className="text-sm text-slate-600 mt-2">
          8+ years shipping production code across PHP, Laravel, Node, React, and MySQL. Shipped 20+ live sites globally and a published Chrome Extension. Working overlap with USA Timezones.
        </div>
      </div>

      <div className="pdf-section">
        <div className="pdf-h2">Technical Skills</div>
        <div>
          <span className="font-semibold text-sm mr-2">Languages & Frameworks:</span>
          {['PHP', 'Laravel', 'React', 'Node.js', 'JavaScript/ES6+', 'SQL', 'HTML5/CSS3', 'Tailwind'].map(s => <span key={s} className="pdf-pill">{s}</span>)}
        </div>
        <div className="mt-1">
          <span className="font-semibold text-sm mr-2">Tools & Architecture:</span>
          {['MySQL', 'REST APIs', 'Chrome Extension API', 'WordPress', 'Git', 'AWS VPS'].map(s => <span key={s} className="pdf-pill">{s}</span>)}
        </div>
      </div>

      <div className="pdf-section">
        <div className="pdf-h2">Professional Experience</div>
        <div className="pdf-job">
          <div className="pdf-job-header">
            <div className="pdf-job-title">Founder & Lead Developer</div>
            <div className="pdf-job-date">Jun 2022 - Present</div>
          </div>
          <div className="pdf-job-company">SoftGlaze LLC | Remote (US/Global Clients)</div>
          <div className="pdf-bullet">Architected and shipped 20+ production sites across legal services, e-commerce, and directories.</div>
          <div className="pdf-bullet">Built custom WordPress plugins from scratch for price comparison engines and vehicle compatibility matching.</div>
          <div className="pdf-bullet">Designed and shipped SoftGlaze Screen Recorder Chrome extension with DOM-anchored annotations.</div>
        </div>

        <div className="pdf-job">
          <div className="pdf-job-header">
            <div className="pdf-job-title">Senior Full-Stack Web Developer</div>
            <div className="pdf-job-date">Jul 2018 - May 2022</div>
          </div>
          <div className="pdf-job-company">Creative Chaos | Remote (US Client)</div>
          <div className="pdf-bullet">Shipped full-stack features in PHP/Laravel + React for a distributed product team.</div>
          <div className="pdf-bullet">Owned modules end-to-end: database schema design, REST API creation, UI integration, and deployment.</div>
          <div className="pdf-bullet">Optimized database performance by resolving N+1 queries and implementing caching layers.</div>
        </div>

        <div className="pdf-job">
          <div className="pdf-job-header">
            <div className="pdf-job-title">Back-End Web Developer</div>
            <div className="pdf-job-date">Sep 2017 - Jun 2018</div>
          </div>
          <div className="pdf-job-company">Reborn | Lahore, PK</div>
          <div className="pdf-bullet">Refactored legacy PHP codebases into structured CodeIgniter and Laravel applications.</div>
          <div className="pdf-bullet">Diagnosed slow queries with EXPLAIN, added indexes, and rewrote joins to decrease endpoint response times.</div>
        </div>

        <div className="pdf-job">
          <div className="pdf-job-header">
            <div className="pdf-job-title">Front-End Web Developer</div>
            <div className="pdf-job-date">Aug 2014 - Aug 2017</div>
          </div>
          <div className="pdf-job-company">Intero Digital | Islamabad, PK</div>
          <div className="pdf-bullet">Turned Figma/PSD designs into pixel-perfect, responsive HTML/CSS/JS.</div>
          <div className="pdf-bullet">Shipped mobile-responsive layouts before mobile-first was an industry standard.</div>
        </div>
      </div>

      <div className="pdf-section">
        <div className="pdf-h2">Selected Case Studies</div>
        <div className="pdf-grid">
          <div>
            <div className="font-semibold text-sm">SoftGlaze Screen Recorder</div>
            <div className="text-xs text-slate-600 mb-1">Stack: JavaScript, Chrome APIs, Manifest V3</div>
            <div className="pdf-bullet">Built a solo product with sticky drawing engine and 100% local processing.</div>
          </div>
          <div>
            <div className="font-semibold text-sm">CarPartHQ (Auto E-commerce)</div>
            <div className="text-xs text-slate-600 mb-1">Stack: WordPress, Custom PHP Plugin</div>
            <div className="pdf-bullet">Engineered vehicle compatibility matching across 56 brands and inventory routing.</div>
          </div>
        </div>
      </div>
    </div>


    {/* ===== MAIN WEB APP ===== */}
    <div className="print-hidden bg-slate-950 text-slate-200 min-h-screen overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .grid-bg { background-image: linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px); background-size: 50px 50px; }
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(40px, -60px) scale(1.15); } 66% { transform: translate(-30px, 30px) scale(0.85); } }
        .blob { animation: blob 18s ease-in-out infinite; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.4); } 50% { box-shadow: 0 0 60px rgba(168, 85, 247, 0.6); } }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .gradient-text { background: linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glass { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(148, 163, 184, 0.1); transition: all 0.3s ease; }
        .glass:hover { border-color: rgba(34, 211, 238, 0.3); }
        @keyframes orbit { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes orbit-reverse { from { transform: rotate(0deg) translateX(160px) rotate(0deg); } to { transform: rotate(-360deg) translateX(160px) rotate(360deg); } }
        .orbit { animation: orbit 14s linear infinite; }
        .orbit-reverse { animation: orbit-reverse 20s linear infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .animate-scaleIn { animation: scaleIn 0.8s ease forwards; opacity: 0; }
        ::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #22d3ee, #a855f7); border-radius: 4px; }
      `}</style>

      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress}%`, boxShadow: '0 0 12px rgba(34, 211, 238, 0.6)' }} />

      <nav className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })} className="group relative w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.4)' : 'rgba(148, 163, 184, 0.3)',
              border: `1.5px solid ${activeSection === item.id ? '#22d3ee' : item.star ? 'rgba(168, 85, 247, 0.6)' : 'rgba(148, 163, 184, 0.5)'}`,
              transform: activeSection === item.id ? 'scale(1.4)' : 'scale(1)',
              boxShadow: activeSection === item.id ? '0 0 12px rgba(34, 211, 238, 0.7)' : item.star ? '0 0 8px rgba(168, 85, 247, 0.4)' : 'none',
            }}>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
              {item.star && <Star size={9} className="text-yellow-400 fill-yellow-400 mr-1" />} {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ====== HERO ====== */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 md:px-12 py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl blob" style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-10 sm:mt-0">
          <div className="mb-6 sm:mb-8 animate-fadeUp">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass font-mono text-[10px] sm:text-xs">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>
              <span className="text-slate-300">Available for senior roles</span>
            </div>
          </div>

          <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center mb-8 animate-scaleIn">
            <div className="absolute inset-0 spin-slow opacity-40"><div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30"></div></div>
            <div className="absolute inset-0 hidden md:block">
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit"><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] shadow-lg">Laravel</div></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-3.5s' }}><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-purple-500/40 text-purple-400 font-mono text-[10px] shadow-lg">React</div></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse"><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-green-500/40 text-green-400 font-mono text-[10px] shadow-lg">Node.js</div></div>
            </div>

            <div className="relative float-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 pulse-glow">
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  {!imageError ? (
                    <img src="/profile.jpg" alt="Muhammad Azhar" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                  ) : (
                    <div className="text-5xl sm:text-6xl font-black gradient-text font-display">MA</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-mono font-bold leading-none tracking-tight mb-6 flex flex-wrap items-center justify-center gap-x-2 text-2xl sm:text-4xl md:text-6xl animate-fadeUp">
            <span className="text-slate-600">&lt;</span>
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Muhammad</span>
            <span className="text-cyan-400">/</span>
            <span className="gradient-text">Azhar</span>
            <span className="text-slate-600">&gt;</span>
          </h1>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-lg text-slate-300 mb-8 animate-fadeUp">
            <span>Senior Full-Stack Engineer</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-400 flex items-center gap-1 font-semibold text-cyan-400"><MapPin size={16} /> Multan, PK (Working USA Time)</span>
          </div>

          {/* Interactive Terminal */}
          <div className="font-mono text-xs sm:text-sm bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-xl p-3 sm:p-4 w-full max-w-2xl mb-8 shadow-2xl text-left animate-fadeUp">
            <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-slate-800">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></span>
              <span className="text-slate-600 text-[10px] sm:text-xs ml-2">azhar@dev - try typing help</span>
            </div>
            
            <div className="max-h-32 sm:max-h-40 overflow-y-auto space-y-2 mb-2 custom-scrollbar pr-2">
              {termHistory.map((t, i) => (
                <div key={i} className="break-words">
                  <div className="flex items-center gap-2 flex-wrap"><span className="text-green-400">&gt;</span><span className="text-cyan-400">~</span><span className="text-white">{t.cmd}</span></div>
                  <div className="text-slate-400 pl-4 sm:pl-6">{t.out}</div>
                </div>
              ))}
              <div ref={termEndRef} />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400">&gt;</span><span className="text-cyan-400">~</span>
              <input 
                type="text" 
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={handleTerminalSubmit}
                className="bg-transparent border-none outline-none text-white w-full font-mono placeholder-slate-700"
                placeholder="type command..."
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 justify-center w-full sm:w-auto animate-fadeUp">
            <a href="#extension" onClick={(e) => { e.preventDefault(); document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
              <Rocket size={16} /> See my work
            </a>
            <button onClick={() => window.print()} className="px-6 py-3 rounded-lg border border-cyan-400/40 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-cyan-400/10">
              <Download size={16} /> Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* ====== ABOUT & GITHUB STATS ====== */}
      <AnimatedSection id="about" tag="// the tldr" icon={<Sparkles />} number="02">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Full-stack engineer who actually <span className="gradient-text">ships.</span>
        </h2>

        <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto space-y-4 text-center mb-8">
          <p className="text-base md:text-lg leading-relaxed text-slate-300">
            Eight years writing production code across <span className="text-cyan-400 font-medium">PHP, Laravel, Node, React, and MySQL</span>. Started front-end at a Pakistani agency, leveled up to senior full-stack for a US client at Creative Chaos, then spent four years running my own dev shop shipping for international clients.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-slate-300">
            <span className="text-white font-semibold">20+ live production sites</span> across the US, UK, UAE, Netherlands, and Pakistan, plus a <span className="text-white font-semibold">published Chrome extension</span> with several custom WordPress plugins built under the SoftGlaze brand.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-slate-300">
            Comfortable working <span className="text-white font-semibold">USA Timezones</span>. Ready to drop into a focused product team where I can commit deeply instead of context-switching across client projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
            <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">8+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Years Shipping</div>
          </div>
          <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
            <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">20+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Live Sites</div>
          </div>
          <div className="glass rounded-xl p-4 text-center hover:border-cyan-400/40 transition-all hover:-translate-y-1">
            <div className="font-mono text-3xl md:text-4xl font-bold gradient-text">
              {githubStats ? githubStats.public_repos : '...'}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Public Repos</div>
          </div>
          <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 text-center hover:border-purple-400/40 transition-all hover:-translate-y-1 group flex flex-col justify-center items-center">
            <Github size={32} className="text-slate-400 group-hover:text-purple-400 mb-2 transition-colors" />
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 group-hover:text-purple-300">View GitHub</div>
          </a>
        </div>
      </AnimatedSection>

      {/* ====== CHROME EXTENSION (100% RESTORED) ====== */}
      <AnimatedSection id="extension" tag="// flagship product" icon={<Award />} number="03">
        <div className="text-center mb-3">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 uppercase tracking-widest"><Star size={10} className="inline mr-1 text-yellow-400 fill-yellow-400" />Featured Product</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
          Live on the <span className="gradient-text">Chrome Web Store.</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12 text-center px-4">
          A full Chrome extension I designed, built, and shipped end-to-end. Real users, real reviews, real product - not just client work.
        </p>

        <div className="glass rounded-2xl p-6 md:p-10 max-w-5xl mx-auto text-left relative overflow-hidden w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl pulse-glow">
                  <Chrome size={48} className="text-white sm:w-16 sm:h-16" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-slate-900 border-2 border-cyan-400 rounded-xl px-2 py-1 font-mono text-[10px] text-cyan-400">v14.0</div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={10} /> Verified Live
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">Chrome Web Store</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">Published</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">SoftGlaze Screen Recorder</h3>
              <p className="text-slate-400 text-[13px] sm:text-sm md:text-base mb-4 leading-relaxed">
                Professional screen recording extension with Persistent Drawing Suite - annotate live while recording. Built solo from concept to publication.
              </p>

              <div className="flex items-center gap-1 mb-5 flex-wrap">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-slate-400 ml-1 sm:ml-2">5.0 / by Azhar Ali (softglaze.com)</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 mb-6">
                {[
                  { emoji: '🎥', label: 'HD Recording with system audio' },
                  { emoji: '✏️', label: 'Pro Drawing Tools (Pen, Highlighter, Arrows)' },
                  { emoji: '🖱️', label: 'Smart Scroll - sticky annotations' },
                  { emoji: '💾', label: 'Instant WebM / MP4 export' },
                  { emoji: '📸', label: 'High-res screenshot mode' },
                  { emoji: '🔒', label: 'Privacy-first - local processing' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-slate-300 bg-slate-900/40 border border-slate-700/40 rounded-md px-3 py-2 hover:border-cyan-400/40 transition-colors">
                    <span className="text-base flex-shrink-0">{f.emoji}</span>
                    <span className="leading-snug pt-0.5">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-2.5">// built with</div>
                <div className="flex flex-wrap gap-1.5">
                  {['JavaScript', 'Chrome Extension API', 'MediaRecorder API', 'Canvas API', 'WebRTC', 'MP4 Conversion', 'Manifest V3'].map((t, i) => (
                    <span key={i} className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-default">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Wrench size={10} /> what I engineered
                </div>
                <ul className="space-y-2 text-[13px] sm:text-sm text-slate-300">
                  <li className="pl-4 relative leading-relaxed"><span className="absolute left-0 text-pink-400">&gt;</span><strong className="text-white font-semibold">Sticky Drawing Engine (v14):</strong> annotations persist across scrolling using DOM element anchoring</li>
                  <li className="pl-4 relative leading-relaxed"><span className="absolute left-0 text-pink-400">&gt;</span><strong className="text-white font-semibold">MP4 Conversion:</strong> client-side WebM to MP4 transcoding pipeline</li>
                  <li className="pl-4 relative leading-relaxed"><span className="absolute left-0 text-pink-400">&gt;</span><strong className="text-white font-semibold">Toolbar logic:</strong> force-close handling for clean UX edge cases</li>
                  <li className="pl-4 relative leading-relaxed"><span className="absolute left-0 text-pink-400">&gt;</span><strong className="text-white font-semibold">Privacy architecture:</strong> 100% local processing, zero data collection</li>
                </ul>
              </div>

              <a href="https://chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                <Chrome size={16} /> View on Chrome Web Store
                <ArrowUpRight size={14} className="hidden sm:block" />
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ====== WHY ME ====== */}
      <AnimatedSection id="why" tag="// hire(me) === true" icon={<Heart />} number="04">
        <div className="text-center mb-3">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 uppercase tracking-widest">// the pitch</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
          Why <span className="gradient-text">hire me?</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12 text-center">
          The honest version. No buzzwords, no fluff - just what you actually get.
        </p>

        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto mb-10">
          <div className="glass rounded-xl p-5 md:p-6 relative">
            <div className="font-mono text-xs text-red-400 mb-4 flex items-center gap-2">
              <X size={14} /> typical_dev.json
            </div>
            <ul className="space-y-3 font-mono text-[11px] sm:text-xs md:text-sm">
              {[
                'specializes in 1 framework, runs from others',
                'hands off to "the backend team" when stuck',
                'ghosts on weekends, even when prod is down',
                'writes code, doesn\'t read other people\'s',
                'asks for specs before lifting a finger',
                'never shipped a real product - only tickets',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400">
                  <X size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-5 md:p-6 relative overflow-hidden border border-cyan-400/30">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
            <div className="font-mono text-xs text-green-400 mb-4 flex items-center gap-2">
              <Check size={14} /> azhar.json
            </div>
            <ul className="space-y-3 font-mono text-[11px] sm:text-xs md:text-sm">
              {[
                'full-stack: PHP / Laravel / React / Node - not just "I know JS"',
                'owns systems end-to-end: schema > API > UI > deploy',
                'available async across timezones - I\'ve worked US client hours for years',
                'reviews PRs, mentors juniors, leaves codebases better than I found them',
                'translates client vibes into actual specs and ships',
                'shipped 20+ sites + a Chrome extension. proven, not theoretical',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-200">
                  <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {[
            {
              icon: Rocket,
              title: 'I actually ship.',
              code: 'git push origin main',
              desc: '20+ production sites. 1 Chrome extension on the Web Store. Real users hitting real endpoints.',
              color: 'cyan'
            },
            {
              icon: Cpu,
              title: 'I own systems end-to-end.',
              code: 'schema > api > ui > deploy',
              desc: 'Database design, REST APIs, UI components, deployment pipelines, production debugging at 2am.',
              color: 'purple'
            },
            {
              icon: GitBranch,
              title: 'I write code others can read.',
              code: 'left.codebase > found.codebase',
              desc: 'PR reviews, mentoring, refactoring spaghetti into structure. Leaving teams better off.',
              color: 'pink'
            },
            {
              icon: Globe2,
              title: 'I work across timezones.',
              code: 'await respondAsync()',
              desc: '4+ years working with US clients while based in Pakistan. Communication is my strong suit.',
              color: 'green'
            },
            {
              icon: Wrench,
              title: 'I build my own tools.',
              code: 'new SoftGlazePlugin()',
              desc: 'Custom WordPress plugins from scratch - scrapers, comparison engines, payment routing.',
              color: 'yellow'
            },
            {
              icon: Coffee,
              title: 'I am in this for the long run.',
              code: 'commit --signoff',
              desc: 'Done with agency context-switching. I am looking for one team to commit to deeply.',
              color: 'orange'
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="glass rounded-xl p-5 hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${card.color}-400 to-${card.color}-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                <div className={`w-10 h-10 rounded-lg bg-${card.color}-500/10 border border-${card.color}-500/30 flex items-center justify-center mb-4`}>
                  <Icon size={18} className={`text-${card.color}-400`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-1">{card.title}</h3>
                <div className="font-mono text-[10px] text-slate-500 mb-3"><span className="text-slate-700">$ </span>{card.code}</div>
                <p className="text-[13px] sm:text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* ====== STACK ====== */}
      <AnimatedSection id="stack" tag="// dependencies" icon={<Code2 />} number="05">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          My <span className="gradient-text">tech stack.</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
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
            <div key={i} className="glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 group">
              <div className="font-mono text-[10px] sm:text-xs text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                // {group.cat}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item, j) => (
                  <span key={j} className="font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====== EXPERIENCE ====== */}
      <AnimatedSection id="experience" tag="// git log" icon={<Briefcase />} number="06">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Where I've <span className="gradient-text">shipped.</span>
        </h2>
        <div className="relative max-w-5xl mx-auto pl-6 md:pl-10">
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-slate-700" />
          {[
            {
              role: 'Founder & Lead Developer', company: 'SoftGlaze LLC', location: 'Remote (US Clients)', when: 'Jun 2022 - Present',
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
              role: 'Senior Full-Stack Web Developer', company: 'Creative Chaos', location: 'Remote (US Client)', when: 'Jul 2018 - May 2022',
              bullets: [
                ['Shipped full-stack features in ', 'PHP/Laravel + React', ' for a distributed product team'],
                ['Owned modules end-to-end: schema > API > UI > QA > deploy'],
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
                ['Diagnosed slow queries with EXPLAIN, added indexes, rewrote joins - measurable wins on hot endpoints'],
              ],
            },
            {
              role: 'Front-End Web Developer', company: 'Intero Digital', location: 'Islamabad, Pakistan', when: 'Aug 2014 - Aug 2017',
              bullets: [
                ['Turned Figma/PSD designs into ', 'pixel-perfect, responsive HTML/CSS/JS'],
                ['Made things work in IE when that still mattered (it was a dark time)'],
                ['Shipped mobile-responsive layouts before mobile-first was just a buzzword on every job spec'],
              ],
            },
          ].map((job, i) => (
            <div key={i} className="relative mb-8 last:mb-0">
              <div className="absolute -left-8 md:-left-11 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 pulse-glow" />
              <div className="glass rounded-xl p-5 md:p-6 hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{job.role}</h3>
                  <div className="font-mono text-[10px] sm:text-xs text-slate-400">{job.when}</div>
                </div>
                <div className="font-mono text-[11px] sm:text-sm text-cyan-400 mb-4">{job.company} <span className="text-slate-600 mx-1">|</span> <span className="text-slate-400">{job.location}</span></div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="pl-4 sm:pl-5 relative text-[13px] sm:text-[15px] leading-relaxed text-slate-300">
                      <span className="absolute left-0 text-cyan-400">&gt;</span>
                      {b.map((part, k) => (k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : <span key={k}>{part}</span>))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====== PORTFOLIO with FILTERS, BADGES, and LOGOS ====== */}
      <AnimatedSection id="portfolio" tag="// live deployments" icon={<Layers />} number="07">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
          Live in <span className="gradient-text">production.</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto mb-8 text-center px-4">
          Production deployments built &amp; shipped. <span className="text-cyan-400">Click any card</span> to see the CMS, plugins, and custom-built modules used.
        </p>

        {/* STATUS FILTERS */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
          {statusFilters.map((sf) => {
            const Icon = sf.icon;
            const count = sf.id === 'all' ? portfolio.length :
                          sf.id === 'featured' ? portfolio.filter(p => p.featured).length :
                          sf.id === 'verified' ? portfolio.filter(p => p.verified && !p.inProgress).length :
                          portfolio.filter(p => p.inProgress).length;
            const isActive = portfolioStatusFilter === sf.id;
            return (
              <button
                key={sf.id}
                onClick={() => setPortfolioStatusFilter(sf.id)}
                className={`font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                  isActive
                    ? `bg-${sf.color}-400/10 border-${sf.color}-400 text-${sf.color}-400`
                    : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon size={12} className={isActive && sf.id === 'featured' ? 'text-yellow-400 fill-yellow-400' : ''} />
                {sf.label} ({count})
              </button>
            );
          })}
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-col lg:flex-row gap-3 mb-8 justify-center items-center px-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const count = cat === 'all' ? portfolio.length : portfolio.filter(p => p.cat === cat).length;
              const isActive = portfolioCatFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setPortfolioCatFilter(cat)}
                  className={`font-mono text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                    isActive
                      ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
                      : 'border-slate-700/60 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
          <div className="relative w-full sm:w-auto px-4 sm:px-0">
            <Search size={14} className="absolute left-6 sm:left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={portfolioSearch}
              onChange={(e) => setPortfolioSearch(e.target.value)}
              placeholder="search sites..."
              className="font-mono text-xs pl-9 pr-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 w-full lg:w-56 transition-colors"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left w-full max-w-7xl mx-auto px-4 sm:px-0">
          {filteredPortfolio.map((site, i) => {
            const isExpanded = expandedSite === site.url;
            return (
              <div
                key={site.url}
                className={`glass rounded-xl p-4 sm:p-5 relative overflow-hidden cursor-pointer ${isExpanded ? 'border-cyan-400/40 lg:col-span-3 sm:col-span-2' : 'hover:-translate-y-1 hover:border-cyan-400/40'}`}
                onClick={() => setExpandedSite(isExpanded ? null : site.url)}
              >
                {site.featured && (
                  <>
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-yellow-400/20" />
                    <Star size={10} className="absolute top-2 right-2 text-yellow-400 fill-yellow-400" />
                  </>
                )}

                {/* HEADER WITH CIRCLED LOGO */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 relative">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${site.color || 'from-cyan-500 to-purple-500'} p-[2px]`}>
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                        <img
                          src={getLogoUrl(site.url)}
                          alt={site.name}
                          className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center font-mono font-bold text-white text-[10px] sm:text-xs">
                          {getInitials(site.name)}
                        </div>
                      </div>
                    </div>
                    {site.verified && !site.inProgress && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-950 border-2 border-slate-950 flex items-center justify-center">
                        <ShieldCheck size={8} className="text-green-400 sm:w-2.5 sm:h-2.5" />
                      </div>
                    )}
                    {site.inProgress && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-950 border-2 border-slate-950 flex items-center justify-center">
                        <Rocket size={8} className="text-orange-400 sm:w-2.5 sm:h-2.5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pr-3">
                    <div className="font-semibold text-white text-[13px] sm:text-sm md:text-base truncate">
                      {site.name}
                    </div>
                    <a
                      href={`https://${site.url.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-cyan-400/70 hover:text-cyan-400 truncate block underline-offset-2 hover:underline"
                    >
                      {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className={`font-mono text-[8px] sm:text-[9px] md:text-[10px] px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-${catColors[site.cat] || 'slate'}-400`}>
                    // {site.cat}
                  </span>
                  {site.inProgress && (
                    <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400">
                      content rolling out
                    </span>
                  )}
                </div>

                <div className="text-[11px] sm:text-xs text-slate-400 leading-snug mb-3 line-clamp-2 sm:line-clamp-none">{site.desc}</div>

                <div className="flex items-center gap-1.5 mb-2">
                  <Package size={12} className="text-purple-400" />
                  <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-purple-300">{site.cms}</span>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                    {site.plugins && site.plugins.length > 0 && (
                      <div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Package size={10} /> Plugins Used
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {site.plugins.map((p, j) => (
                            <span key={j} className="font-mono text-[8px] sm:text-[9px] md:text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {site.custom && site.custom.length > 0 && (
                      <div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Wrench size={10} /> Custom Built
                        </div>
                        <ul className="space-y-1">
                          {site.custom.map((c, j) => (
                            <li key={j} className="text-[10px] sm:text-[11px] md:text-xs text-slate-300 pl-3 relative leading-snug">
                              <span className="absolute left-0 text-pink-400">&gt;</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {site.features && site.features.length > 0 && (
                      <div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-yellow-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Zap size={10} /> Key Features
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {site.features.map((f, j) => (
                            <span key={j} className="font-mono text-[8px] sm:text-[9px] md:text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={`https://${site.url.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] md:text-xs text-cyan-400 hover:text-cyan-300 mt-2"
                    >
                      Visit live site <ArrowUpRight size={12} />
                    </a>
                  </div>
                )}

                {!isExpanded && (
                  <div className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-slate-500 mt-1">
                    Click to see plugins &amp; custom build details
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* ====== CASE STUDIES ====== */}
      <AnimatedSection id="projects" tag="// deeper dives" icon={<Code2 />} number="08">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Selected <span className="gradient-text">case studies.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto text-left px-4 sm:px-0">
          {[
            {
              tag: 'browser extension | solo product',
              title: 'SoftGlaze Screen Recorder',
              count: 'Live on Web Store',
              cms: 'Chrome Extension',
              stack: ['JavaScript', 'Chrome APIs', 'MediaRecorder', 'Canvas', 'Manifest V3'],
              custom: ['Sticky Drawing Engine (DOM-anchored annotations)', 'Client-side WebM to MP4 conversion', 'Toolbar lifecycle management', '100% local processing architecture'],
              desc: 'A published Chrome extension I built solo from concept to publication. Currently live on the Chrome Web Store at v14.0 with 5-star ratings.',
            },
            {
              tag: 'directory | netherlands | multi-site',
              title: 'NL Pricing Directory Suite',
              count: '3 sites',
              cms: 'WordPress',
              stack: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'],
              custom: ['SoftGlaze price comparison engine', 'Provider matching algorithm', 'Multi-role registration (clinic + doctor)', 'Lat/lng geo search'],
              desc: 'Network of price comparison directories for Dutch trades - clinics, painters, handymen. Custom comparison engine with geo search and NL/Flanders localization.',
            },
            {
              tag: 'e-commerce | automotive',
              title: 'CarPartHQ',
              count: '1 site',
              cms: 'WordPress',
              stack: ['Elementor 3.29', 'ACF Pro', 'WPForms', 'RankMath'],
              custom: ['Vehicle compatibility plugin (56+ brands)', 'Multi-step lead form system', 'Inventory routing across 35+ centers', 'Quote-based commerce workflow'],
              desc: 'Auto parts marketplace requiring complex vehicle compatibility matching. Custom-built selector flow (Make > Model > Part > Year), 35+ distribution center routing.',
            },
            {
              tag: 'legal | uae | multi-site network',
              title: 'Dubai Legal Services Network',
              count: '12 sites',
              cms: 'WordPress',
              stack: ['Elementor Pro 4.0.5', 'ACF Pro', 'WPForms', 'RankMath SEO'],
              custom: ['Shared design system across 12 sites', 'Service inquiry plugin network', 'WhatsApp integration module', 'Multi-site SEO localization'],
              desc: 'Network of 12 interconnected sites for UAE notary, attestation, and legal services. Shared template system with custom inquiry plugins.',
            },
          ].map((p, i) => (
            <div key={i} className="glass rounded-xl p-5 sm:p-6 relative overflow-hidden group hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3">
                <div className="font-mono text-[9px] sm:text-[10px] text-purple-400 uppercase tracking-widest">// {p.tag}</div>
                <div className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 whitespace-nowrap">{p.count}</div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{p.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Package size={12} className="text-purple-400" />
                <span className="font-mono text-[10px] sm:text-[11px] text-purple-300">{p.cms}</span>
              </div>
              <p className="text-[13px] sm:text-sm leading-relaxed text-slate-300 mb-4">{p.desc}</p>

              <div className="space-y-2.5 pt-3 border-t border-slate-700/50">
                <div>
                  <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider mb-1.5">// stack</div>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((s, j) => (
                      <span key={j} className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/60 text-slate-300">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-pink-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Wrench size={10} /> custom built
                  </div>
                  <ul className="space-y-0.5">
                    {p.custom.map((c, j) => (
                      <li key={j} className="text-[11px] sm:text-xs text-slate-300 pl-3 relative leading-snug">
                        <span className="absolute left-0 text-pink-400">&gt;</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====== CODE REVIEWS (Testimonials Slider) ====== */}
      <AnimatedSection id="reviews" tag="// pull requests" icon={<GitPullRequest />} number="09">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Code <span className="gradient-text">Reviews.</span>
        </h2>
        <div className="max-w-4xl mx-auto relative px-8 md:px-16 w-full">
          
          {/* Controls */}
          <button 
            onClick={() => setCurrentReview(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors z-10"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <button 
            onClick={() => setCurrentReview(prev => (prev + 1) % reviews.length)}
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors z-10"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Slider Container */}
          <div className="glass rounded-xl p-6 sm:p-8 md:p-12 relative border border-slate-700/50 min-h-[220px] sm:min-h-[250px] flex flex-col justify-center transition-all duration-500 overflow-hidden mx-auto w-full max-w-[95%]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-base sm:text-lg flex-shrink-0">
                {reviews[currentReview].author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-base sm:text-lg truncate">{reviews[currentReview].author}</div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-500 flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <span className="truncate">{reviews[currentReview].handle}</span>
                  <span className="text-green-400 bg-green-400/10 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">approved these changes</span>
                </div>
              </div>
            </div>
            <div className="text-slate-300 text-[13px] sm:text-base md:text-lg italic leading-relaxed">
              "{reviews[currentReview].text}"
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentReview(idx)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${idx === currentReview ? 'bg-cyan-400 scale-125' : 'bg-slate-700'}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </AnimatedSection>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="min-h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-3xl w-full">
          <div className="font-mono text-cyan-400 text-xs sm:text-sm mb-3">// 200 OK</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5">
            Let's build <span className="gradient-text">something.</span>
          </h2>
          <p className="text-[13px] sm:text-base md:text-lg text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto px-4">
            Open to senior full-stack roles. If you're hiring and the work looks interesting, I'd love to chat. No copy-paste recruiter pitches, please.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8 sm:mb-10 w-full sm:w-auto px-4 sm:px-0">
            <a href="mailto:admin@softglaze.com" className="font-mono text-xs sm:text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Send size={14} /> admin@softglaze.com
            </a>
            <button onClick={() => window.print()} className="font-mono text-xs sm:text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Download size={14} /> Download PDF
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10 px-2 sm:px-0">
            <a href="tel:+923007484750" className="font-mono text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 sm:gap-2">
              <Phone size={14} className="w-3 h-3 sm:w-4 sm:h-4" /> +92 300 7484750
            </a>
            <a href="https://github.com/softglazee" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 sm:gap-2">
              <Github size={14} className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/azharalidev/" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 sm:gap-2">
              <Linkedin size={14} className="w-3 h-3 sm:w-4 sm:h-4" /> LinkedIn
            </a>
            <a href="https://softglaze.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 sm:gap-2">
              <Globe size={14} className="w-3 h-3 sm:w-4 sm:h-4" /> softglaze.com
            </a>
          </div>

          <div className="font-mono text-[10px] sm:text-[11px] md:text-xs text-slate-500 space-y-2 mb-8 px-4">
            <div className="flex items-center justify-center gap-2 flex-wrap text-center">
              <GraduationCap size={14} className="text-purple-400 hidden sm:block" />
              <span>MS Information Technology - Islamia University of Bahawalpur - 2012-2016</span>
            </div>
            <div>
              <span className="text-purple-400">Languages</span> - English (fluent) - Urdu (native) - Punjabi (native)
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] md:text-xs text-slate-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-800 bg-slate-900/40">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            status: available - last commit: today
          </div>
        </div>

        <div className="relative z-10 mt-12 sm:mt-16 font-mono text-[8px] sm:text-[9px] md:text-[10px] text-slate-700 text-center px-4 w-full">
          built with react | tailwind | by Muhammad Azhar | azhar.softglaze.com
        </div>
      </section>
    </div>
    </>
  );
}

function AnimatedSection({ id, children, tag, icon, number }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-16 sm:py-20"
    >
      <div className="w-full max-w-7xl mx-auto" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <div className="text-center mb-4 sm:mb-2">
          <div className="font-mono text-[9px] sm:text-[10px] md:text-xs text-slate-700 tracking-widest mb-2">// {number}</div>
          <div className="font-mono text-[11px] sm:text-xs md:text-sm text-cyan-400 mb-2 flex items-center gap-1.5 sm:gap-2 justify-center">
            {icon && <span className="opacity-60 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">{icon}</span>}
            <span className="whitespace-nowrap">{tag}</span>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}