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

  // Typing Effect
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

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse Tracking for Blobs
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
      else if (cmd === 'whoami') out = 'Muhammad Azhar - Senior Full-Stack Engineer working US Hours.';
      else if (cmd === 'skills') out = 'PHP, Laravel, React, Node.js, MySQL, WordPress, Chrome Extensions.';
      else if (cmd === 'experience') out = '8+ years shipping prod code. 20+ live sites. 1 Chrome Extension.';
      else if (cmd === 'contact') out = 'Email: admin@softglaze.com | Phone: +92 300 7484750';
      else if (cmd === 'sudo rm -rf /') out = 'Nice try. But I sanitized my inputs. :)';
      else out = `Command not found: ${cmd}. Type 'help' for available commands.`;

      setTermHistory([...termHistory, { cmd: termInput, out }]);
      setTermInput('');
      setTimeout(() => termEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const getLogoUrl = (url) => `https://www.google.com/s2/favicons?domain=${url.replace(/^https?:\/\//, '').replace(/\/$/, '')}&sz=128`;
  const getInitials = (name) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const reviews = [
    { author: 'US Client PM', handle: '@creative-chaos', text: 'Azhar does not just write code; he understands the business logic behind it. He owned the entire backend refactor while overlapping seamlessly with our US hours. Zero dropped balls.' },
    { author: 'Agency Director', handle: '@softglaze-client', text: 'We threw an incredibly complex vehicle compatibility system at him. He engineered a custom DB architecture that cut our load times by 70%.' },
    { author: 'CTO', handle: '@tech-startup', text: 'Finding a senior developer who actually ships on time and communicates perfectly async is rare. Azhar delivered our MVP 2 weeks ahead of schedule.' },
    { author: 'Lead Designer', handle: '@dubai-network', text: 'Azhar translated our complex Figma files into pixel-perfect React components. His attention to detail on the frontend is just as strong as his backend architecture.' },
    { author: 'E-commerce Founder', handle: '@carparthq', text: 'The custom routing engine he built for our 35+ distribution centers was a game-changer. He is a true full-stack engineer who solves hard problems.' },
    { author: 'Product Owner', handle: '@nl-directories', text: 'Azhar built our entire pricing comparison engine from scratch. His ability to take vague requirements and turn them into robust features is unmatched.' }
  ];

  const portfolio = [
    { url: 'kliniektarieven.nl', name: 'Kliniektarieven', cat: 'directory', featured: true, verified: true, desc: 'NL clinic price comparison platform with multi-role registration & geo search', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms', 'RankMath SEO'], custom: ['SoftGlaze clinic comparison engine', 'Multi-role registration plugin', 'Lat/lng-based search system'], features: ['Geo search by city', 'Clinic & doctor profiles', 'Booking flow'], color: 'from-pink-500 to-rose-500' },
    { url: 'carparthq.com', name: 'CarPartHQ', cat: 'ecommerce', featured: true, verified: true, desc: 'Auto parts marketplace vehicle compatibility across 56+ brands, US-wide network', cms: 'WordPress', plugins: ['Elementor', 'ACF Pro', 'WPForms'], custom: ['Vehicle compatibility plugin', 'Inventory routing engine', 'Quote request workflow'], features: ['56+ vehicle brand matching', 'Quote-based commerce'], color: 'from-green-500 to-emerald-500' },
    { url: 'dubainotaryservices.com', name: 'Dubai Notary Services', cat: 'legal', featured: true, verified: true, desc: 'Flagship UAE notary platform comprehensive service pages, online e-notary', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro', 'WPForms'], custom: ['SoftGlaze service inquiry plugin', 'Multi-service catalog system'], features: ['8+ service verticals', 'Apostille & e-notary flows'], color: 'from-purple-500 to-violet-500' },
    { url: 'silkosoft.com', name: 'Silkosoft', cat: 'agency', featured: true, verified: true, desc: 'Software agency platform with rich service architecture & case study showcase', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro'], custom: ['Custom service catalog plugin', 'Case study CPT system'], features: ['250+ project showcase logic', 'Pricing tiers'], color: 'from-cyan-500 to-blue-500' },
    { url: 'klustarief.nl', name: 'Klustarief', cat: 'directory', featured: true, verified: true, desc: 'NL handyman pricing directory with custom comparison engine', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro'], custom: ['SoftGlaze pricing comparison engine'], features: ['Multi-category pricing'], color: 'from-orange-500 to-amber-500' },
    { url: 'schildertarief.nl', name: 'Schildertarief', cat: 'directory', featured: true, verified: true, desc: 'NL painter pricing directory with custom calculator', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro'], custom: ['SoftGlaze price calculator plugin'], features: ['Service pricing engine'], color: 'from-blue-500 to-indigo-500' },
    { url: 'capcuttemplatesx.com', name: 'CapCut Templates X', cat: 'media', featured: false, verified: true, desc: 'Template marketplace with custom scraper', cms: 'WordPress', plugins: ['Elementor', 'ACF Pro'], custom: ['SoftGlaze template scraper plugin'], features: ['Advanced search'], color: 'from-rose-500 to-pink-500' },
    { url: 'virtuvortex.com', name: 'VirtuVortex', cat: 'agency', featured: false, verified: true, desc: 'Tech services & solutions platform', cms: 'WordPress', plugins: ['Elementor Pro', 'ACF Pro'], custom: ['Custom service catalog'], features: ['Multi-service routing'], color: 'from-violet-500 to-purple-500' },
    { url: 'pulselink.click', name: 'PulseLink', cat: 'tools', featured: false, verified: true, desc: 'Smart link management & click tracking', cms: 'WordPress', plugins: ['ACF Pro'], custom: ['SoftGlaze link tracker plugin'], features: ['Click analytics'], color: 'from-pink-500 to-fuchsia-500' },
    { url: 'blinkwall.com', name: 'BlinkWall', cat: 'tools', featured: false, verified: true, desc: 'Web utility & content delivery tool', cms: 'WordPress', plugins: ['Elementor', 'ACF Pro'], custom: ['SoftGlaze content delivery plugin'], features: ['Member areas'], color: 'from-amber-500 to-yellow-500' }
  ];

  const categories = ['all', 'agency', 'legal', 'directory', 'tools', 'ecommerce', 'travel', 'media'];
  const statusFilters = [
    { id: 'all', label: 'All', icon: Layers, color: 'cyan' },
    { id: 'featured', label: 'Featured', icon: Star, color: 'yellow' },
    { id: 'verified', label: 'Verified Live', icon: ShieldCheck, color: 'green' }
  ];

  const catColors = { agency: 'cyan', legal: 'purple', directory: 'pink', tools: 'yellow', ecommerce: 'green', travel: 'orange', media: 'rose' };

  const filteredPortfolio = portfolio.filter((p) => {
    let matchesStatus = true;
    if (portfolioStatusFilter === 'featured') matchesStatus = p.featured === true;
    else if (portfolioStatusFilter === 'verified') matchesStatus = p.verified === true && !p.inProgress;
    const matchesCat = portfolioCatFilter === 'all' || p.cat === portfolioCatFilter;
    const matchesSearch = portfolioSearch === '' || p.name.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.url.toLowerCase().includes(portfolioSearch.toLowerCase());
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
      <section id="hero" className="min-h-screen relative flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl blob" style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }} />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 animate-fadeUp">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass font-mono text-xs">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>
              <span className="text-slate-300">Available for senior roles</span>
            </div>
          </div>

          <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex items-center justify-center mb-8 animate-scaleIn">
            <div className="absolute inset-0 spin-slow opacity-40"><div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30"></div></div>
            <div className="absolute inset-0 hidden md:block">
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit"><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] shadow-lg">Laravel</div></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit" style={{ animationDelay: '-3.5s' }}><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-purple-500/40 text-purple-400 font-mono text-[10px] shadow-lg">React</div></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 orbit-reverse"><div className="px-2 py-1 rounded-md bg-slate-900/90 border border-green-500/40 text-green-400 font-mono text-[10px] shadow-lg">Node.js</div></div>
            </div>

            <div className="relative float-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"></div>
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 pulse-glow">
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  {!imageError ? (
                    <img src="/profile.jpg" alt="Muhammad Azhar" className="w-full h-full object-cover" onError={() => setImageError(true)} />
                  ) : (
                    <div className="text-6xl font-black gradient-text font-display">MA</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-mono font-bold leading-none tracking-tight mb-6 flex flex-wrap items-center justify-center gap-x-2 text-3xl md:text-6xl animate-fadeUp">
            <span className="text-slate-600">&lt;</span>
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Muhammad</span>
            <span className="text-cyan-400">/</span>
            <span className="gradient-text">Azhar</span>
            <span className="text-slate-600">&gt;</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg text-slate-300 mb-8 animate-fadeUp">
            <span>Senior Full-Stack Engineer</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 flex items-center gap-1 font-semibold text-cyan-400"><MapPin size={16} /> Multan, PK (Working USA Time)</span>
          </div>

          {/* Interactive Terminal */}
          <div className="font-mono text-sm bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-xl p-4 w-full max-w-2xl mb-8 shadow-2xl text-left animate-fadeUp">
            <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="text-slate-600 text-xs ml-2">azhar@dev - try typing help</span>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
              {termHistory.map((t, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2"><span className="text-green-400">&gt;</span><span className="text-cyan-400">~</span><span className="text-white">{t.cmd}</span></div>
                  <div className="text-slate-400 pl-4">{t.out}</div>
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
                className="bg-transparent border-none outline-none text-white w-full font-mono"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 justify-center animate-fadeUp">
            <a href="#extension" onClick={(e) => { e.preventDefault(); document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
              <Rocket size={16} /> See my work
            </a>
            <button onClick={() => window.print()} className="px-6 py-3 rounded-lg border border-cyan-400/40 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 font-medium text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:bg-cyan-400/10">
              <Download size={16} /> Download Resume (PDF)
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

      {/* ====== CHROME EXTENSION ====== */}
      <AnimatedSection id="extension" tag="// flagship product" icon={<Award />} number="03">
        <div className="text-center mb-3">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 uppercase tracking-widest"><Star size={10} className="inline mr-1 text-yellow-400 fill-yellow-400" />Featured Product</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-3 text-center">
          Live on the <span className="gradient-text">Chrome Web Store.</span>
        </h2>
        
        <div className="glass rounded-2xl p-6 md:p-10 max-w-5xl mx-auto mt-12 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
          <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl pulse-glow">
                  <Chrome size={64} className="text-white" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">SoftGlaze Screen Recorder</h3>
              <p className="text-slate-400 text-sm md:text-base mb-4">
                Professional screen recording extension with Persistent Drawing Suite. Built solo from concept to publication. Includes DOM-anchored sticky annotations and client-side WebM to MP4 transcoding.
              </p>
              <a href="https://chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium text-sm hover:-translate-y-0.5">
                <Chrome size={16} /> View on Chrome Web Store
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ====== EXPERIENCE ====== */}
      <AnimatedSection id="experience" tag="// git log" icon={<Briefcase />} number="04">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Where I've <span className="gradient-text">shipped.</span>
        </h2>
        <div className="relative max-w-5xl mx-auto pl-8 md:pl-10">
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-slate-700" />
          {[
            { role: 'Founder & Lead Developer', company: 'SoftGlaze LLC', location: 'Remote (US Clients)', when: 'Jun 2022 - Present', bullets: ['Architected 20+ production sites across legal, e-commerce, and directory sectors.', 'Built custom SoftGlaze WordPress plugins for pricing engines and vehicle compatibility.', 'Designed and shipped a published Chrome extension with 100% local processing.'] },
            { role: 'Senior Full-Stack Developer', company: 'Creative Chaos', location: 'Remote (US Client)', when: 'Jul 2018 - May 2022', bullets: ['Shipped full-stack features in PHP/Laravel + React.', 'Owned modules end-to-end: schema to API to UI to deploy.', 'Killed N+1 queries, added caching, reducing p95 response times.'] },
            { role: 'Back-End Web Developer', company: 'Reborn', location: 'Lahore, PK', when: 'Sep 2017 - Jun 2018', bullets: ['Refactored legacy spaghetti-PHP into structured CodeIgniter/Laravel codebases.'] }
          ].map((job, i) => (
            <div key={i} className="relative mb-8 last:mb-0">
              <div className="absolute -left-10 md:-left-11 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 pulse-glow" />
              <div className="glass rounded-xl p-5 md:p-6 hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <div className="font-mono text-xs text-slate-400">{job.when}</div>
                </div>
                <div className="font-mono text-sm text-cyan-400 mb-4">{job.company} <span className="text-slate-600 mx-1">|</span> <span className="text-slate-400">{job.location}</span></div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="pl-5 relative text-sm leading-relaxed text-slate-300">
                      <span className="absolute left-0 text-cyan-400">&gt;</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ====== CODE REVIEWS (Testimonials Slider) ====== */}
      <AnimatedSection id="reviews" tag="// pull requests" icon={<GitPullRequest />} number="05">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-10 text-center">
          Code <span className="gradient-text">Reviews.</span>
        </h2>
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* Controls */}
          <button 
            onClick={() => setCurrentReview(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors z-10"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => setCurrentReview(prev => (prev + 1) % reviews.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 p-2 rounded-full bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-colors z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Container */}
          <div className="glass rounded-xl p-8 md:p-12 relative border border-slate-700/50 min-h-[250px] flex flex-col justify-center transition-all duration-500">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-lg">
                {reviews[currentReview].author[0]}
              </div>
              <div>
                <div className="font-semibold text-white text-lg">{reviews[currentReview].author}</div>
                <div className="font-mono text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                  {reviews[currentReview].handle} 
                  <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded">approved these changes</span>
                </div>
              </div>
            </div>
            <div className="text-slate-300 text-base md:text-lg italic leading-relaxed">
              &quot;{reviews[currentReview].text}&quot;
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentReview(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentReview ? 'bg-cyan-400 scale-125' : 'bg-slate-700'}`}
              />
            ))}
          </div>

        </div>
      </AnimatedSection>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="min-h-screen relative flex flex-col items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center max-w-3xl">
          <div className="font-mono text-cyan-400 text-sm mb-3">// 200 OK</div>
          <h2 className="font-display text-5xl md:text-7xl font-black leading-tight mb-5">
            Let's build <span className="gradient-text">something.</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10">Open to senior full-stack roles. No copy-paste recruiter pitches, please.</p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <a href="mailto:admin@softglaze.com" className="font-mono text-sm px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2">
              <Send size={14} /> admin@softglaze.com
            </a>
            <button onClick={() => window.print()} className="font-mono text-sm px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all hover:-translate-y-0.5 flex items-center gap-2">
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
        <div className="relative z-10 mt-16 font-mono text-[10px] text-slate-700">built with react | tailwind | by Muhammad Azhar</div>
      </section>
    </div>
    </>
  );
}

function AnimatedSection({ id, children, tag, icon, number }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className="min-h-screen relative flex flex-col justify-center items-center px-6 md:px-12 py-20">
      <div className="w-full max-w-7xl mx-auto" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
        <div className="text-center mb-2">
          <div className="font-mono text-xs text-slate-700 tracking-widest mb-2">// {number}</div>
          <div className="font-mono text-sm text-cyan-400 mb-2 flex items-center gap-2 justify-center">{icon && <span className="opacity-60">{icon}</span>}{tag}</div>
        </div>
        {children}
      </div>
    </section>
  );
}
