import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BrainCircuit, Braces, Menu, ScanEye, X,
} from 'lucide-react';
import {
  SiGithub, SiGit, SiJavascript, SiMysql, SiPhp, SiPython, SiReact, SiTensorflow,
} from 'react-icons/si';
import './index.css';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Project Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const featured = [
  {
    number: '01',
    title: 'EEG Motor Imagery & Concentration Classification',
    category: 'AI RESEARCH / DEEP LEARNING',
    description: 'A PKM-funded research project exploring EEG motor imagery and concentration classification using signal processing and deep learning approaches including DWT, Multi-Scale CNN, and Vision Transformer.',
    tags: ['Python', 'DWT', 'Multi-Scale CNN', 'Vision Transformer', 'Deep Learning', 'Signal Processing'],
    visual: 'eeg',
    foot: 'PKM RESEARCH · EEG · DEEP LEARNING',
    detail: 'Research collaboration spanning EEG data processing, model development, evaluation, teamwork, and presentation.',
  },
  {
    number: '02',
    title: 'Banana Ripeness Classification',
    category: 'COMPUTER VISION / DEEP LEARNING',
    description: 'CNN-based image classification system designed to classify banana ripeness into four categories: green, semi-ripe, ripe, and overripe.',
    tags: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Computer Vision'],
    visual: 'banana',
    foot: 'GREEN · SEMI-RIPE · RIPE · OVERRIPE',
    detail: 'Model performance: 95.12% test accuracy.',
  },
  {
    number: '03',
    title: 'Archive Management System',
    category: 'SOFTWARE ENGINEERING / BACKEND',
    description: 'A web-based archive management system featuring authentication, role-based access control, employee management, archive classification, storage management, audit logs, and reporting.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'PDO', 'RBAC'],
    visual: 'archive',
    foot: 'WEB SYSTEM · DATABASE · RBAC',
    detail: 'Designed around archive classification and storage workflows with audit logs and reporting.',
  },
];

const moreProjects = [
  {
    number: '01',
    title: 'Spare Parts Inventory Management System',
    category: 'Software Engineering',
    description: 'Inventory management system covering stock, transactions, reporting, system requirements, and database design.',
    tags: 'Software Design · Database · Inventory · System Analysis',
  },
  {
    number: '02',
    title: 'Android Digital Clock',
    category: 'Android Development',
    description: 'A minimalist fullscreen digital clock application designed to transform Android phones and tablets into clean desk or room clock displays.',
    tags: 'Kotlin · Jetpack Compose · Android Studio',
  },
  {
    number: '03',
    title: 'OBS Countdown Timer',
    category: 'Web Utility',
    description: 'A clean keyboard-controlled fullscreen countdown timer designed to replace a camera feed through OBS Virtual Camera during meetings, presentations, livestreams, classes, and online events.',
    tags: 'HTML · CSS · JavaScript · OBS',
  },
];

const skills = [
  { name: 'Python', proficiency: 85, color: '#3776ab', icon: <SiPython aria-hidden="true" /> },
  { name: 'PHP', proficiency: 82, color: '#777bb4', icon: <SiPhp aria-hidden="true" /> },
  { name: 'JavaScript', proficiency: 78, color: '#f7df1e', icon: <SiJavascript aria-hidden="true" /> },
  { name: 'React', proficiency: 75, color: '#61dafb', icon: <SiReact aria-hidden="true" /> },
  { name: 'MySQL', proficiency: 85, color: '#4479a1', icon: <SiMysql aria-hidden="true" /> },
  { name: 'Software Engineering', proficiency: 85, color: '#ff6824', icon: <Braces aria-hidden="true" /> },
  { name: 'Machine Learning', proficiency: 80, color: '#ff6824', icon: <BrainCircuit aria-hidden="true" /> },
  { name: 'Computer Vision', proficiency: 82, color: '#ff6824', icon: <ScanEye aria-hidden="true" /> },
  { name: 'TensorFlow', proficiency: 80, color: '#ff6f00', icon: <SiTensorflow aria-hidden="true" /> },
  { name: 'Git & GitHub', proficiency: 85, color: '#f05032', icon: <span className="skill-brand-pair"><SiGit aria-hidden="true" /><SiGithub aria-hidden="true" /></span> },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [introCount, setIntroCount] = useState(0);
  const [openDetails, setOpenDetails] = useState<string[]>([]);
  const [cursor, setCursor] = useState({ x: -100, y: -100, mode: '' });
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [isDraggingProjects, setIsDraggingProjects] = useState(false);
  const workStageRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);
  const dragState = useRef<{ pointerId: number; startX: number; startScrollLeft: number } | null>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const cursorRaf = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const description = 'Portfolio of Muhammad Hanif Hibatulloh, a Computer Science student focused on Software Engineering, Backend Development, AI, Machine Learning, Computer Vision, and intelligent software systems.';
    document.title = 'Muhammad Hanif Hibatulloh | Software Engineer & AI/ML';
    const setMeta = (key: string, content: string, property = false) => {
      const selector = property ? `meta[property="${key}"]` : `meta[name="${key}"]`;
      let meta = document.head.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', key);
        else meta.name = key;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta('description', description);
    setMeta('og:title', document.title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialHash = window.location.hash.slice(1);
    if (reducedMotion.current || initialHash) {
      setIntroDone(true);
      if (initialHash) {
        requestAnimationFrame(() => {
          document.getElementById(initialHash)?.scrollIntoView({ behavior: 'auto' });
        });
      }
      return;
    }
    let count = 0;
    const countTimer = window.setInterval(() => {
      count += 25;
      setIntroCount(Math.min(count, 100));
      if (count >= 100) window.clearInterval(countTimer);
    }, 300);
    const introTimer = window.setTimeout(() => setIntroDone(true), 1500);
    return () => {
      window.clearInterval(countTimer);
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealNodes.forEach((node) => observer.observe(node));

    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-32% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 20);
      const timeline = document.querySelector('.timeline');
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const amount = Math.min(1, Math.max(0, (window.innerHeight * .82 - rect.top) / (rect.height + window.innerHeight * .25)));
        setTimelineProgress(amount * 100);
        const center = window.innerHeight * .57;
        let closest: HTMLElement | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;
        timeline.querySelectorAll<HTMLElement>('.timeline-item').forEach((item) => {
          const itemRect = item.getBoundingClientRect();
          const distance = Math.abs((itemRect.top + itemRect.height / 2) - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = item;
          }
        });
        timeline.querySelectorAll('.timeline-item').forEach((item) => item.classList.toggle('active', item === closest));
      }
      if (!reducedMotion.current && window.innerWidth > 700) {
        const y = Math.min(12, window.scrollY * .018);
        if (portraitRef.current) portraitRef.current.style.transform = `translate3d(0,${9 + y}px,0)`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (window.matchMedia('(hover: none)').matches || reducedMotion.current) return;
      if (cursorRaf.current) cancelAnimationFrame(cursorRaf.current);
      cursorRaf.current = requestAnimationFrame(() => setCursor((prev) => ({ ...prev, x: event.clientX, y: event.clientY })));
      if (window.innerWidth > 700) {
        const x = (event.clientX / window.innerWidth - .5) * 10;
        const y = (event.clientY / window.innerHeight - .5) * 10;
        if (portraitRef.current) portraitRef.current.style.marginLeft = `${x * .45}px`;
        if (discRef.current) discRef.current.style.transform = `translate3d(${-x}px,${-y}px,0)`;
      }
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const project = target?.closest('.project-visual');
      setCursor((prev) => ({ ...prev, mode: project ? 'viewing' : (target?.closest('a,button') ? 'hovering' : '') }));
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerover', onPointerOver);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      if (cursorRaf.current) cancelAnimationFrame(cursorRaf.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion.current ? 'auto' : 'smooth', block: 'start' });
  };
  const toggleDetail = (number: string) => {
    setOpenDetails((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  };
  const setCurrentProject = (index: number) => {
    activeProjectRef.current = index;
    setActiveProject(index);
  };
  const updateActiveProject = () => {
    const stage = workStageRef.current;
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('.project-card'));
    const center = stage.getBoundingClientRect().left + stage.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs((rect.left + rect.width / 2) - center);
      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });
    setCurrentProject(nearestIndex);
  };
  const moveFeatured = (direction: number) => {
    const stage = workStageRef.current;
    if (!stage) return;
    const cards = stage.querySelectorAll<HTMLElement>('.project-card');
    const next = Math.min(cards.length - 1, Math.max(0, activeProjectRef.current + direction));
    const stageLeft = stage.getBoundingClientRect().left + stage.clientLeft;
    const targetLeft = stage.scrollLeft + cards[next].getBoundingClientRect().left - stageLeft;
    stage.scrollTo({ left: targetLeft, behavior: reducedMotion.current ? 'auto' : 'smooth' });
  };
  const handleProjectPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if ((event.target as HTMLElement).closest('button, a')) return;
    const stage = event.currentTarget;
    dragState.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: stage.scrollLeft };
    stage.setPointerCapture(event.pointerId);
    setIsDraggingProjects(true);
  };
  const handleProjectPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };
  const handleProjectPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return;
    dragState.current = null;
    setIsDraggingProjects(false);
  };

  return (
    <>
      <div className={`intro-screen${introDone ? ' done' : ''}`} aria-hidden={introDone}>
        <div className="intro-inner">
          <div className="intro-count">{String(introCount).padStart(2, '0')}</div>
          <h1 className="intro-name"><span>MUHAMMAD</span><span>HANIF</span><span>HIBATULLOH</span></h1>
          <div className="intro-line" />
        </div>
      </div>
      <div className={`cursor-dot ${cursor.mode}`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="scroll-progress" style={{ '--progress': `${progress}%` } as CSSProperties} aria-hidden="true">
        <span /><i className="progress-label">{String(Math.round(progress)).padStart(2, '0')}%</i>
      </div>
      <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
        <nav className="nav-inner" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }} aria-label="Hanif home">HANIF<b>.</b></a>
          <div className="nav-links">
            {navItems.map((item) => <a key={item.id} className={`nav-link${active === item.id ? ' active' : ''}`} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); goTo(item.id); }}>{item.label}</a>)}
          </div>
          <a className="nav-cta" href="mailto:hanifhibatulloh86@gmail.com">LET'S TALK <ArrowUpRight size={13} /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </nav>
      </header>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {navItems.map((item, index) => <a key={item.id} href={`#${item.id}`} tabIndex={menuOpen ? 0 : -1} onClick={(event) => { event.preventDefault(); goTo(item.id); }}><small>0{index + 1}</small>{item.label}</a>)}
        <a href="mailto:hanifhibatulloh86@gmail.com" tabIndex={menuOpen ? 0 : -1}><small>+</small>Let's talk</a>
      </div>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-name">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow intro">HELLO, I'M</div>
              <h1 className="hero-name display" id="hero-name"><span>MUHAMMAD</span><span>HANIF</span><span className="surname">HIBATULLOH</span></h1>
              <h2 className="hero-headline">I BUILD <em>SOFTWARE</em> &amp;<br /><em>INTELLIGENT</em> SYSTEMS.</h2>
              <div className="hero-subtitle">Software Engineering × AI / Machine Learning</div>
              <p className="hero-desc">Computer Science student focused on building practical software, backend systems, machine learning solutions, and intelligent applications.</p>
              <div className="hero-actions">
                <a className="button-primary" href="#work" onClick={(event) => { event.preventDefault(); goTo('work'); }}>VIEW MY WORK <ArrowRight size={14} /></a>
                <a className="button-outline" href="mailto:hanifhibatulloh86@gmail.com">LET'S TALK <ArrowUpRight size={14} /></a>
                <a className="cv-link" href="mailto:hanifhibatulloh86@gmail.com?subject=Request%20for%20CV">REQUEST CV <ArrowDown size={12} /></a>
              </div>
            </div>
            <div className="hero-art" aria-label="Portrait of Muhammad Hanif Hibatulloh">
              <div className="portrait-disc" ref={discRef} />
              <div className="art-cross" />
              <img className="hero-portrait" ref={portraitRef} src="/images/hanif-portrait.png" alt="Muhammad Hanif Hibatulloh wearing a dark suit" fetchPriority="high" />
              <span className="portrait-index">SOFTWARE ENGINEERING × AI</span>
              <span className="portrait-caption">01 — COMPUTER SCIENCE</span>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-meta"><span>ENGINEERING / INTELLIGENCE</span><span>INDONESIA · AVAILABLE FOR OPPORTUNITIES</span></div>
            <div className="highlights">
              <div className="highlight"><strong>AI RESEARCH</strong><span>EEG · Deep Learning</span></div>
              <div className="highlight"><strong className="accent">95.12%</strong><span>CNN Test Accuracy</span></div>
              <div className="highlight"><strong>SOFTWARE ENGINEERING</strong><span>Web Systems &amp; Database</span></div>
              <div className="highlight"><strong className="accent">3.49 / 4.00</strong><span>GPA</span></div>
            </div>
          </div>
          <div className="scroll-cue">SCROLL TO EXPLORE</div>
        </section>

        <section className="section about-section" id="about">
          <div className="wrap about-grid">
            <div className="reveal from-left">
              <div className="eyebrow">01 / ABOUT</div>
              <h2 className="about-title">ABOUT<span>ME.</span></h2>
            </div>
            <div className="about-copy reveal from-right">
              <p>I'm <strong>Muhammad Hanif Hibatulloh</strong>, a Computer Science student at Universitas Jenderal Achmad Yani with a strong interest in Software Engineering, Backend Development, Artificial Intelligence, Machine Learning, and Computer Vision.</p>
              <p>I enjoy transforming ideas and real-world problems into practical software solutions—from designing databases and backend systems to developing machine learning and computer vision models.</p>
              <p>My approach begins with understanding the problem, designing an appropriate solution, implementing it carefully, evaluating the results, and continuously improving the system.</p>
              <p>Beyond technology, I also have experience in research collaboration, leadership, teamwork, communication, and creative production.</p>
              <div className="about-note"><span>HOW I WORK</span><span>PROBLEM → SYSTEM → ITERATION</span></div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Software engineering, AI, machine learning, computer vision">
          <div className="marquee-row"><div className="marquee-track">
            {[0, 1].map((copy) => <span className="marquee-text" key={copy}>SOFTWARE ENGINEERING <b>·</b> AI <b>·</b> MACHINE LEARNING <b>·</b> COMPUTER VISION <b>·</b>&nbsp;</span>)}
          </div></div>
          <div className="marquee-row"><div className="marquee-track reverse">
            {[0, 1].map((copy) => <span className="marquee-text" key={copy}>BUILDING PRACTICAL SYSTEMS <b>·</b> RESEARCH <b>·</b> INTELLIGENT SOFTWARE <b>·</b>&nbsp;</span>)}
          </div></div>
        </div>

        <section className="work-section" id="work">
          <div className="wrap work-head reveal">
            <div><div className="eyebrow">02 / SELECTED WORK</div><h2 className="section-title">SELECTED<br /><span>WORK.</span></h2></div>
            <p>A collection of software, AI, research, and engineering projects.</p>
          </div>
          <div
            className={`work-stage${isDraggingProjects ? ' is-dragging' : ''}`}
            ref={workStageRef}
            role="region"
            aria-label="Featured projects carousel"
            tabIndex={0}
            onScroll={updateActiveProject}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') { event.preventDefault(); moveFeatured(1); }
              if (event.key === 'ArrowLeft') { event.preventDefault(); moveFeatured(-1); }
            }}
            onPointerDown={handleProjectPointerDown}
            onPointerMove={handleProjectPointerMove}
            onPointerUp={handleProjectPointerEnd}
            onPointerCancel={handleProjectPointerEnd}
            onLostPointerCapture={handleProjectPointerEnd}
          >
            <div className="work-track">
              {featured.map((project) => {
                const isOpen = openDetails.includes(project.number);
                return <article className="project-card" key={project.number} data-testid={`card-featured-${project.number}`}>
                  <div className={`project-visual ${project.visual}`} aria-label={`${project.title} project visualization`} role="img">
                    <span className="visual-label">{project.visual === 'eeg' ? 'SIGNAL / ANALYSIS' : project.visual === 'banana' ? 'CLASSIFICATION / 04 CLASSES' : 'ARCHIVE / ADMIN DASHBOARD'}</span>
                    <span className="visual-code">PROJECT_{project.number}</span>
                    {project.visual === 'eeg' && <div className="eeg-art"><div className="wave" /><div className="wave" /><div className="wave" /><div className="eeg-scale"><span>EEG CHANNELS</span><span>TIME SERIES</span></div></div>}
                    {project.visual === 'banana' && <div className="banana-art"><div className="banana-cell">GREEN</div><div className="banana-cell">SEMI-RIPE</div><div className="banana-cell">RIPE</div><div className="banana-cell">OVERRIPE</div><div className="banana-shape" /></div>}
                    {project.visual === 'archive' && <div className="archive-art"><div className="dash-top">ARCHIVE MANAGEMENT / OVERVIEW</div><div className="dash-body"><div className="dash-side" /><div className="dash-content"><div className="dash-stat"><span>FILES</span><span>STORAGE</span><span>USERS</span></div><div className="dash-line" /><div className="dash-row" /><div className="dash-row" /><div className="dash-row" /><div className="dash-row" /></div></div></div>}
                  </div>
                  <div className="project-copy">
                    <div className="project-topline"><span className="project-num">{project.number} / 03</span><span className="project-type">{project.category}</span></div>
                    <div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>{isOpen && <div className="detail-note">{project.detail}</div>}</div>
                    <div className="project-footer"><small>{project.foot}</small><button className="project-detail" type="button" onClick={() => toggleDetail(project.number)} aria-expanded={isOpen} data-testid={`button-project-details-${project.number}`}>{isOpen ? 'CLOSE DETAILS' : project.number === '01' ? 'PROJECT DETAILS' : 'VIEW PROJECT'} <ArrowUpRight size={12} /></button></div>
                    {project.number === '02' && <div className="project-stat">95.12% <small>TEST ACCURACY</small></div>}
                  </div>
                </article>;
              })}
            </div>
          </div>
          <div className="work-controls wrap">
            <span className="work-hint">{isDraggingProjects ? 'RELEASE TO VIEW PROJECT' : 'DRAG, SWIPE, OR USE ARROWS'}</span>
            <div className="work-pagination" aria-live="polite" aria-atomic="true">
              <span>0{activeProject + 1}</span>
              <span className="work-meter" aria-hidden="true"><i style={{ width: `${((activeProject + 1) / featured.length) * 100}%` }} /></span>
              <span>0{featured.length}</span>
            </div>
            <button className="arrow-control" type="button" aria-label="Show previous project" disabled={activeProject === 0} onClick={() => moveFeatured(-1)}><ArrowLeft size={17} /></button>
            <button className="arrow-control" type="button" aria-label="Show next project" disabled={activeProject === featured.length - 1} onClick={() => moveFeatured(1)}><ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="section more-section">
          <div className="wrap">
            <div className="more-heading reveal"><div><div className="eyebrow">A FEW MORE</div><h2 className="section-title">MORE <span>EXPERIMENTS.</span></h2></div></div>
            <div className="more-list">
              {moreProjects.map((project) => {
                const detailId = `more-${project.number}`;
                const isOpen = openDetails.includes(detailId);
                return <article className="more-row reveal" key={project.number} data-testid={`card-experiment-${project.number}`}>
                <span className="more-number">{project.number}</span>
                <div><h3>{project.title}</h3><p>{project.description}</p>{isOpen && <p className="more-detail-note">TECHNOLOGY / {project.tags}</p>}</div>
                <span className="more-category">{project.category}<br /><span className="muted">{project.tags}</span></span>
                <button className="more-arrow-button" type="button" aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${project.title}`} aria-expanded={isOpen} onClick={() => toggleDetail(detailId)} data-testid={`button-experiment-details-${project.number}`}><ArrowUpRight className="more-arrow" size={17} aria-hidden="true" /></button>
              </article>;
              })}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="wrap">
            <div className="skills-top reveal">
              <div><div className="eyebrow">03 / SKILLS &amp; EXPERTISE</div><h2 className="section-title">MY<br /><span>SKILLS.</span></h2></div>
              <p>Core technologies and focus areas, with the proficiency percentages you provided.</p>
            </div>
            <div className="skills-grid reveal">
              {skills.map((skill) => <article className="skill-card" key={skill.name}>
                <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
                <div className="skill-content">
                  <div className="skill-card-heading"><h3>{skill.name}</h3><strong>{skill.proficiency}%</strong></div>
                  <div className="skill-track" role="progressbar" aria-label={`${skill.name} proficiency`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.proficiency}>
                    <span style={{ width: `${skill.proficiency}%` }} />
                  </div>
                </div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section beyond" id="experience">
          <div className="wrap">
            <div className="beyond-head reveal"><div><div className="eyebrow">04 / PROJECT EXPERIENCE</div><h2 className="section-title">PROJECT<br /><span>EXPERIENCE.</span></h2></div><p>Research, software projects, leadership, and creative work that have shaped the way I build.</p></div>
            <div className="timeline">
              <div className="timeline-line"><span style={{ height: `${timelineProgress}%` }} /></div>
              <article className="timeline-item active"><span className="timeline-number">01</span><div><h3>EEG Research Collaboration</h3><p>PKM research collaboration involving EEG, data processing, model development, evaluation, teamwork, and presentation.</p></div><div className="timeline-side">AI RESEARCH<br />EEG · DEEP LEARNING</div></article>
              <article className="timeline-item"><span className="timeline-number">02</span><div><h3>Leadership &amp; Teamwork</h3><p>Experience in pesantren leadership, responsibility, communication, and coordination.</p></div><div className="timeline-side">PEOPLE &amp; RESPONSIBILITY<br />TEAMWORK · COORDINATION</div></article>
              <article className="timeline-item"><span className="timeline-number">03</span><div><h3>DHOLAL — Short Horror Film</h3><p>Creative production project involving concept development, scriptwriting, camera operation, and production coordination.</p></div><div className="timeline-side">CREATIVE PRODUCTION<span className="film-tags">CONCEPT · SCRIPT · CAMERA · COORDINATION</span></div></article>
            </div>
          </div>
        </section>

        <section className="section education" id="education">
          <div className="wrap education-grid">
            <div className="reveal from-left">
              <div className="eyebrow">05 / EDUCATION</div>
              <h2 className="edu-title">UNIVERSITAS<br /><span>JENDERAL</span><br />ACHMAD YANI</h2>
              <div className="edu-degree">Bachelor of Computer Science</div>
              <div className="edu-date">2024 — PRESENT</div>
              <div className="focus-list">{['Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Backend Development', 'Computer Vision'].map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div className="gpa-panel reveal from-right"><div className="gpa-label">ACADEMIC PERFORMANCE</div><div className="gpa">3.49<small> / 4.00</small></div><div className="gpa-caption">Grade Point Average</div></div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <div className="eyebrow">06 / MAKE SOMETHING MATTER</div>
            <h2 className="contact-title">LET'S BUILD<br /><span>SOMETHING</span><br />MEANINGFUL.</h2>
            <p className="contact-intro">I'm open to opportunities, collaborations, research projects, and software development projects.</p>
            <div className="contact-links">
              <a className="contact-link" href="mailto:hanifhibatulloh86@gmail.com"><span><strong>EMAIL ME</strong><small>hanifhibatulloh86@gmail.com</small></span><ArrowUpRight size={20} /></a>
              <a className="contact-link" href="https://www.linkedin.com/in/muhammad-hanif-hibatulloh" target="_blank" rel="noreferrer"><span><strong>LINKEDIN</strong><small>Professional profile</small></span><ArrowUpRight size={20} /></a>
              <a className="contact-link" href="https://github.com/hanifhibatulloh-dev" target="_blank" rel="noreferrer"><span><strong>GITHUB</strong><small>Code &amp; projects</small></span><ArrowUpRight size={20} /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-name">MUHAMMAD HANIF HIBATULLOH<span>Software Engineering × AI / Machine Learning</span></div>
          <span>© 2026 MUHAMMAD HANIF HIBATULLOH</span>
          <a className="back-top" href="#home" onClick={(event) => { event.preventDefault(); goTo('home'); }}>BACK TO TOP <ArrowUp size={13} /></a>
        </div>
      </footer>
    </>
  );
}

export default App;