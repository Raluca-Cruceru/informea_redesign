import image_b3317a67a82acceac61c19bd7a0014d2781165eb from 'figma:asset/b3317a67a82acceac61c19bd7a0014d2781165eb.png';
import { Search, Menu, GraduationCap, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useEffect, useRef, useState, ReactNode } from 'react';
// @ts-ignore
import grad from "../assets/graduation-cap.svg";
import { useSearch } from '@/search-state';

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const POPOVER_WIDTH_PX = 650;
const PANEL_SHELL =
    'rounded-xl border border-white/20 bg-white text-gray-900 shadow-xl transition-all duration-150';

function useLeftOffsetToAnchor(
    wrapperRef: React.RefObject<HTMLElement | null>,
    anchorRef: React.RefObject<HTMLElement | null>,
    active: boolean
) {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        if (!active) return;
        const calc = () => {
            const w = wrapperRef.current;
            const a = anchorRef.current;
            if (!w || !a) { setOffset(0); return; }
            const wRect = w.getBoundingClientRect();
            const aRect = a.getBoundingClientRect();
            setOffset(wRect.left - aRect.left);
        };
        calc();
        window.addEventListener('resize', calc);
        window.addEventListener('scroll', calc, true);
        return () => {
            window.removeEventListener('resize', calc);
            window.removeEventListener('scroll', calc, true);
        };
    }, [wrapperRef, anchorRef, active]);
    return offset;
}

const ABOUT_LINKS = [
    { id: 'about-us', label: 'About Us', page: 'about' },
    { id: 'events', label: 'News and Events', page: '-' },
    { id: 'contactshub', label: 'MEAs Contacts Hub', page: 'contacts-hub' },
    { id: 'contactus', label: 'Contact Us', page: '-' },
    { id: 'getinvolved', label: 'Get Involved', page: '-' },
];

const RESOURCES_LINKS = [
    { id: 'goals', label: 'Global Goals', page: 'global-goals' },
    { id: 'publications', label: 'Laws and Cases', page: 'resources-publications' },
    { id: 'glossary', label: 'Glossary', page: 'resources-glossary' },
    { id: 'toolkit', label: 'Negotiators Toolkit', page: 'toolkit' },
    { id: 'dashboards', label: 'Documents and Literature', page: 'resources-tools' },
    { id: 'elearning', label: 'E-learning Courses', page: 'elearning' },
    { id: 'unct', label: 'UNCT Dashboard', page: 'resources-unct' },

];

type NavLink = { id: string; label: string };

const TOPIC_LINKS: NavLink[] = [
    { id: 'biodiversity', label: 'Biological diversity' },
    { id: 'chemicals', label: 'Chemicals and Waste' },
    { id: 'climate', label: 'Climate and Atmosphere' },
    { id: 'envgov', label: 'Environmental Governance' },
    { id: 'land', label: 'Land and Agriculture' },
    { id: 'marine', label: 'Marine and Freshwater' },
];

const REGION_LINKS: NavLink[] = [
    { id: 'africa', label: 'Africa' },
    { id: 'asia-pacific', label: 'Asia and the Pacific' },
    { id: 'europe', label: 'Europe' },
    { id: 'lac', label: 'Latin America and the Caribbean' },
];

/* ------------------------ MEAs desktop menu ------------------------ */
function MEAsMenu({
                      onSelect,
                      anchorRef,
                  }: {
    onSelect?: (id: string) => void;
    anchorRef: React.RefObject<HTMLElement | null>;
}) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);
    const openMenu = () => { if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } setOpen(true); };
    const scheduleClose = (delay = 220) => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => { setOpen(false); hideTimerRef.current = null; }, delay);
    };
    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => { const t = e.target as Node; if (!rootRef.current?.contains(t)) setOpen(false); };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [open]);
    const measAlignOffset = useLeftOffsetToAnchor(rootRef as React.RefObject<HTMLElement | null>, anchorRef, open);

    return (
        <div ref={rootRef} className="relative" onPointerEnter={openMenu} onPointerLeave={() => scheduleClose(260)}>
            <button
                type="button"
                onClick={() => onSelect?.('meas')}
                className={`transition-colors font-medium flex items-center gap-1 ${open ? 'text-cyan-200' : 'hover:text-cyan-200'} cursor-pointer`}
                aria-haspopup="menu" aria-expanded={open} aria-controls="meas-menu"
            >
                <h3 className="text-xl">Treaties</h3>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <div
                id="meas-menu"
                className={`absolute p-2 left-0 top-full mt-2 z-50 ${PANEL_SHELL}
        ${open ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                style={{ width: 650, left: -measAlignOffset }}
                onPointerEnter={() => { if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } }}
                onPointerLeave={() => scheduleClose(220)}
            >
                <div className="flex">
                    {/* LEFT rail kept for desktop; mobile uses a different drawer */}
                    <div className="bg-gray-100 p-4 border-r border-gray-200 rounded-md" style={{ width: "210px" }}>
                        <div className="relative mb-6 pt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input placeholder="Search treaty..." className="pl-8 h-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500" />
                            </div>
                        </div>
                        <p className="font-bold">Recent Searches</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 px-8 py-4 text-left">
                        <div className="self-start">
                            {/* fixed header font */}
                            <p className="text-[12px] uppercase tracking-wide text-gray-800 mb-2 font-bold">Browse Treaties by Topic</p>
                            <ul>
                                {TOPIC_LINKS.map((n) => (
                                    <li key={n.id}>
                                        {/* fixed item font */}
                                        <button
                                            type="button" onClick={() => onSelect?.(n.id)}
                                            className="leading-6 text-left pt-1 text-[15px] text-blue-700 hover:text-blue-800 hover:underline"
                                        >
                                            {n.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="self-start">
                            <p className="text-[12px] uppercase tracking-wide text-gray-800 mb-2 font-bold">Browse Treaties by Region</p>
                            <ul>
                                {REGION_LINKS.concat([{ id: 'global', label: 'Global Treaties' }]).map((n) => (
                                    <li key={n.id}>
                                        <button
                                            type="button" onClick={() => onSelect?.(n.id)}
                                            className="leading-6 text-left pt-1 text-[15px] text-blue-700 hover:text-blue-800 hover:underline"
                                        >
                                            {n.id === 'global' ? <strong>{n.label}</strong> : n.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------ Header ------------------------ */
export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [highlightSearch, setHighlightSearch] = useState(false);
    const { state, setState } = useSearch();
    const [lastSubmitted, setLastSubmitted] = useState('');
    const pending = state.q.trim() !== lastSubmitted.trim();

    const handleSubmit = () => {
        setLastSubmitted(state.q);          // mark current query as submitted
        setCurrentPage('results');          // navigate to results
    };

    // About dropdown state
    const [aboutOpen, setAboutOpen] = useState(false);
    const aboutBtnRef = useRef<HTMLButtonElement | null>(null);
    const aboutMenuRef = useRef<HTMLDivElement | null>(null);
    const aboutWrapperRef = useRef<HTMLDivElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);
    const openAbout = () => { if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } setAboutOpen(true); };
    const scheduleCloseAbout = (delay = 220) => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => { setAboutOpen(false); hideTimerRef.current = null; }, delay);
    };
    const cancelScheduledClose = () => { if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } };
    useEffect(() => {
        if (!aboutOpen) return;
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as Node;
            const insideMenu = aboutMenuRef.current?.contains(t);
            const insideBtn = aboutBtnRef.current?.contains(t);
            const insideWrap = aboutWrapperRef.current?.contains(t);
            if (!insideMenu && !insideBtn && !insideWrap) setAboutOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [aboutOpen]);

    const [resourcesOpen, setResourcesOpen] = useState(false);
    const resourcesBtnRef = useRef<HTMLButtonElement | null>(null);
    const resourcesMenuRef = useRef<HTMLDivElement | null>(null);
    const resourcesWrapperRef = useRef<HTMLDivElement | null>(null);
    const resourcesHideTimerRef = useRef<number | null>(null);
    const openResources = () => { if (resourcesHideTimerRef.current) { window.clearTimeout(resourcesHideTimerRef.current); resourcesHideTimerRef.current = null; } setResourcesOpen(true); };
    const scheduleCloseResources = (delay = 220) => {
        if (resourcesHideTimerRef.current) window.clearTimeout(resourcesHideTimerRef.current);
        resourcesHideTimerRef.current = window.setTimeout(() => { setResourcesOpen(false); resourcesHideTimerRef.current = null; }, delay);
    };
    const cancelScheduledCloseResources = () => { if (resourcesHideTimerRef.current) { window.clearTimeout(resourcesHideTimerRef.current); resourcesHideTimerRef.current = null; } };
    useEffect(() => {
        if (!resourcesOpen) return;
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as Node;
            const insideMenu = resourcesMenuRef.current?.contains(t);
            const insideBtn = resourcesBtnRef.current?.contains(t);
            const insideWrap = resourcesWrapperRef.current?.contains(t);
            if (!insideMenu && !insideBtn && !insideWrap) setResourcesOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [resourcesOpen]);

    const aboutAlignOffset = useLeftOffsetToAnchor(aboutWrapperRef as React.RefObject<HTMLElement | null>, aboutWrapperRef as React.RefObject<HTMLElement | null>, aboutOpen);
    const resourcesAlignOffset = useLeftOffsetToAnchor(resourcesWrapperRef as React.RefObject<HTMLElement | null>, aboutWrapperRef as React.RefObject<HTMLElement | null>, resourcesOpen);

    const handleSearchClick = () => {
        if (currentPage === 'home') {
            setHighlightSearch(true);
            setTimeout(() => setHighlightSearch(false), 1500);
        } else {
            setShowSearch((s) => !s);
        }
    };

    // Mobile burger state
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [mobileOpen]);
    const toggleSection = (id: string) => setOpenSection((p) => (p === id ? null : id));
    const go = (page: string) => { setCurrentPage(page); setMobileOpen(false); setOpenSection(null); };

    // lock scroll when drawer is open
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
    }, [mobileOpen]);

    // measure header height so the drawer sits exactly below it
    const headerRef = useRef<HTMLElement | null>(null);
    const [headerH, setHeaderH] = useState(64);
    useEffect(() => {
        if (!headerRef.current) return;
        const el = headerRef.current;
        const update = () => setHeaderH(el.getBoundingClientRect().height || 64);
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener('resize', update);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    // inside Header component, alongside mobileOpen/openSection state
    const [openTreatiesTopic, setOpenTreatiesTopic] = useState(false);
    const [openTreatiesRegion, setOpenTreatiesRegion] = useState(false);

// collapse inner dropdowns when Treaties is closed
    useEffect(() => {
        if (openSection !== 'treaties') {
            setOpenTreatiesTopic(false);
            setOpenTreatiesRegion(false);
        }
    }, [openSection]);


    return (
        <header
            ref={headerRef}
            className="text-white shadow-lg"
            style={{
                backgroundColor: 'var(--header-bg, rgb(0, 85, 137))',
                paddingLeft: '100px',
                paddingRight: '100px',
                boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.85)'
            }}
        >
            <div>
                {/* Top bar */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                            <div className="flex items-center space-x-2">
                                <img src={image_b3317a67a82acceac61c19bd7a0014d2781165eb} alt="UN Logo" className="w-auto h-10" />
                                <h1 className="text-3xl font-serif" style={{ fontFamily: 'Times New Roman, serif', fontSize: "27px" }}>
                                    InforMEA
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center space-x-8 mr-6">
                            {/* ABOUT */}
                            <div
                                ref={aboutWrapperRef}
                                className="relative"
                                onMouseEnter={openAbout}
                                onMouseLeave={() => scheduleCloseAbout(260)}
                            >
                                <button
                                    ref={aboutBtnRef}
                                    type="button"
                                    onClick={() => setCurrentPage('about')}
                                    onFocus={openAbout}
                                    className={`transition-colors font-medium flex items-center gap-1 cursor-pointer
                    ${aboutOpen || currentPage === 'about' ? 'text-cyan-200' : 'hover:text-cyan-200'}`}
                                    aria-haspopup="menu" aria-expanded={aboutOpen} aria-controls="about-submenu"
                                >
                                    <h3 className="text-xl">About</h3>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${aboutOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>

                                <div
                                    id="about-submenu"
                                    ref={aboutMenuRef}
                                    className={`absolute left-0 top-full mt-2 z-50 ${PANEL_SHELL}
                    ${aboutOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                                    role="menu"
                                    onPointerEnter={cancelScheduledClose}
                                    onPointerLeave={() => scheduleCloseAbout(220)}
                                    style={{ width: 200, left: -aboutAlignOffset }}
                                >
                                    <ul className="grid gap-y-2 p-6">
                                        {ABOUT_LINKS.map((item) => (
                                            <li key={item.id} className="min-w-0">
                                                <button
                                                    type="button" role="menuitem"
                                                    onClick={() => { setCurrentPage(item.page); setAboutOpen(false); }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-[16px] leading-snug hover:bg-gray-100 hover:text-cyan-700 focus:bg-cyan-100 focus:outline-none"
                                                >
                                                    <span className="block truncate">{item.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* MEAs */}
                            <MEAsMenu anchorRef={aboutWrapperRef as React.RefObject<HTMLElement | null>} onSelect={(id) => setCurrentPage(id)} />

                            {/* Parties */}
                            <button
                                type="button"
                                onClick={() => setCurrentPage('parties')}
                                className={`transition-colors font-medium flex items-center gap-1 cursor-pointer hover:text-cyan-200`}
                            >
                                <h3 className="text-xl">Parties</h3>
                            </button>

                            {/* Knowledge Base */}
                            <div
                                ref={resourcesWrapperRef}
                                className="relative"
                                onPointerEnter={openResources}
                                onPointerLeave={() => scheduleCloseResources(260)}
                            >
                                <button
                                    ref={resourcesBtnRef}
                                    type="button"
                                    onClick={() => setCurrentPage("resources")}
                                    className={`transition-colors font-medium flex items-center gap-1 cursor-pointer ${
                                        resourcesOpen || currentPage.startsWith('resources') ? 'text-cyan-200' : 'hover:text-cyan-200'
                                    }`}
                                    aria-haspopup="menu" aria-expanded={resourcesOpen} aria-controls="resources-submenu"
                                >
                                    <h3 className="text-xl">Knowledge Base</h3>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${resourcesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>

                                <div
                                    id="resources-submenu"
                                    ref={resourcesMenuRef}
                                    className={`absolute left-0 top-full mt-2 z-50 ${PANEL_SHELL}
                    ${resourcesOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                                    role="menu"
                                    onPointerEnter={cancelScheduledCloseResources}
                                    onPointerLeave={() => scheduleCloseResources(220)}
                                    style={{ width: POPOVER_WIDTH_PX, left: -resourcesAlignOffset }}
                                >
                                    <ul className="grid md:grid-cols-3 gap-2 p-6">
                                        {RESOURCES_LINKS.map((item) => (
                                            <li key={item.id} className="min-w-0">
                                                <button
                                                    type="button" role="menuitem"
                                                    onClick={() => { setCurrentPage(item.page); setResourcesOpen(false); }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-[15px] leading-snug hover:bg-gray-100 hover:text-cyan-700 focus:bg-cyan-100 focus:outline-none"
                                                >
                                                    {item.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        {/* FREE ONLINE COURSES — hidden on small screens */}
                        <Badge
                            variant="secondary"
                            className="hidden lg:flex bg-gray-600 text-black font-bold hover:bg-gray-500 items-center text-m cursor-pointer h-7"
                            style={{ backgroundColor: "#fc3", color: 'black', fontSize: '11px', marginRight: "12px" }}
                        >
                            <img src={grad} alt="grad-cap" className="w-auto h-5" />
                            FREE ONLINE COURSES
                        </Badge>

                        {/* Search toggle button */}
                        {currentPage !== 'home' && currentPage !== 'results' && (
                            <Button variant="ghost" size="sm" className="text-white hover:text-cyan-200 cursor-pointer" onClick={handleSearchClick} style={{ marginRight: "5px" }}>
                                <Search className="w-4 h-4" />
                            </Button>
                        )}

                        {/* EN — hidden on small screens (shown only on lg) */}
                        <Button variant="ghost" size="sm" className="hidden lg:inline-flex text-white hover:text-cyan-200 hover:bg-cyan-400 cursor-pointer text-l" style={{ marginRight: "5px", fontSize: "15px", fontFamily: ' Arial, Helvetica, sans-serif' }}>
                            EN
                        </Button>

                        {/* Burger (mobile trigger) */}
                        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
                <div
                    className="bg-[rgb(0,85,137)] text-white border-b"
                    style={{
                        borderColor: "rgba(255, 255, 255, 0.5)", // subtle 30% white
                        boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.25)",
                    }}
                >
                </div>

                {/* Hero Section */}
                {(currentPage === 'home' || showSearch || currentPage === 'results') && (
                    <div className={`py-8 text-center rounded-lg ${highlightSearch ? 'animate-pulse bg-yellow-100' : ''}`} style={{paddingTop:currentPage === 'results' ? "0px" :''}}>
                        <h3 className="text-3xl md:text-2xl mb-8 max-w-5xl mx-auto">
                            {currentPage !== 'results' && "The United Nations Portal on Multilateral Environmental Agreements"}
                        </h3>

                        <div className="max-w-3xl mx-auto flex gap-3 mb-2">
                            <div className="flex-1 relative">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    aria-label="Search"
                                    title={pending ? 'Click to search' : 'Search'}
                                    className={[
                                        "absolute left-2 top-1/2 -translate-y-1/2 text-gray-400",
                                        "ml-2 mr-2 px-1 h-7 rounded-sm",

                                        // neutral look (blends with the input)
                                        "bg-transparent text-slate-500 hover:text-slate-700",
                                        "transition-all duration-200 cursor-pointer",

                                        // default (visible on white)
                                        pending

                                            ? "outline outline-2 outline-amber-400/80 outline-offset-2 bg-amber-50/70 text-amber-900"
                                            : // ⚪ neutral state
                                            ""
                                    ].join(" ")}
                                >
                                <Search className="w-5 h-5"  />
                                </button>
                                <Input
                                    value={state.q}
                                    onChange={(e)=>setState({ ...state, q: e.target.value })}
                                    onKeyDown={(e)=>{ if (e.key === 'Enter') setCurrentPage('results'); }}
                                    placeholder="Search treaties, parties, cases..."
                                    className="pl-10 h-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500" />
                            </div>

                            {/* Search category select */}
                            <Select defaultValue="all"
                                    value={state.category}
                                    onValueChange={(v)=>{ setState({ ...state, category: v as any }); setCurrentPage('results'); }}>
                                <SelectTrigger className="w-64 h-12 bg-white/90 border-0 text-gray-900" data-size="lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[28rem] px-6 py-4" style={{ width: "340px" }}>
                                    <SelectItem value="_hdr_treaties" className="text-lg tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mb-1">TREATIES</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="treaty-texts" className="text-md h-auto p-0">Treaty texts</SelectItem>
                                        <SelectItem value="decision-texts" className="text-md h-auto p-0">Decision texts</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_national" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">NATIONAL SUBMISSIONS</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="national-plans" className="text-md h-auto p-0">National Plans</SelectItem>
                                        <SelectItem value="national-reports" className="text-md h-auto p-0">National Reports</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_law" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">LAW AND CASES</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="legislation" className="text-md h-auto p-0">Legislation</SelectItem>
                                        <SelectItem value="court-decisions" className="text-md h-auto p-0">Court Decisions</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_docs" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">DOCUMENTS AND LITERATURE</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="documents" className="text-md h-auto p-0">Documents</SelectItem>
                                        <SelectItem value="literature" className="text-md h-auto p-0">Literature</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_news" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">NEWS AND EVENTS</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="news" className="text-md h-auto p-0">News</SelectItem>
                                        <SelectItem value="events" className="text-md h-auto p-0">Events</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_goals" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">GOALS AND DECLARATIONS</SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="goals" className="text-md h-auto p-0">Goals</SelectItem>
                                        <SelectItem value="declarations" className="text-md h-auto p-0">Declarations</SelectItem>
                                    </div>
                                    <SelectItem value="_hdr_contacts" className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1">MEAs CONTACTS HUB</SelectItem>
                                    <div className="mt-4">
                                        <SelectItem value="all" className="text-md h-auto py-2">All Categories</SelectItem>
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </div>

            {/* ===== Mobile Menu (overlay, below header) ===== */}
            {mobileOpen && (
                <>
                    {/* Backdrop below header */}
                    <div
                        className="fixed inset-x-0 bottom-0 z-[9998] bg-black/45"
                        style={{ top: headerH }}
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer below header */}
                    <div
                        className="fixed inset-x-0 bottom-0 z-[9999] text-white overflow-y-auto"
                        style={{ top: headerH, backgroundColor: 'rgb(0,85,137)' }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <nav className="px-6 py-2 ">
                            {/* ABOUT */}
                            <button
                                type="button"
                                onClick={() => toggleSection('about')}
                                className="w-full flex items-center justify-between pt-4 pb-4 text-[15px] font-semibold uppercase tracking-wide"
                                aria-expanded={openSection === 'about'}
                            >
                                <span>About</span>
                                {openSection === 'about' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                            {openSection === 'about' && (
                                <ul className="pb-2">
                                    {ABOUT_LINKS.map((item) => (
                                        <li key={item.id} >
                                            <button onClick={() => go(item.page)} className="block w-full text-left py-2 px-3 text-sm">
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* TREATIES (parent, now with two inner dropdowns) */}
                            <button
                                type="button"
                                onClick={() => toggleSection('treaties')}
                                className={[
                                    "group w-full flex items-center justify-between pb-4  rounded-md",
                                    "text-[15px] font-semibold uppercase tracking-wide",
                                    "transition-colors duration-150",
                                    "hover:bg-white hover:text-[rgb(0,85,137)]",
                                    openSection === 'treaties' ? "" : ""
                                ].join(" ")}
                                aria-expanded={openSection === 'treaties'}
                            >
                                <span>Treaties</span>
                                {openSection === 'treaties'
                                    ? <ChevronDown className="w-5 h-5" />
                                    : <ChevronRight className="w-5 h-5" />
                                }
                            </button>

                            {openSection === 'treaties' && (
                                <div className="pb-1 mt-1">

                                    {/* Browse by Topic (dropdown) */}
                                    <button
                                        type="button"
                                        onClick={() => setOpenTreatiesTopic(v => !v)}
                                        className={[
                                            "group w-full flex items-center justify-between pb-4 px-3 rounded-md",
                                            "text-[11px] uppercase tracking-wide",
                                            "text-white/90",
                                            "transition-colors duration-150",
                                            "hover:bg-white hover:text-[rgb(0,85,137)]",
                                            openTreatiesTopic ? "" : ""
                                        ].join(" ")}
                                        aria-expanded={openTreatiesTopic}
                                        aria-controls="treaties-topic-list"
                                    >
                                        <span>Browse by Topic</span>
                                        {openTreatiesTopic ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>

                                    {openTreatiesTopic && (
                                        <ul id="treaties-topic-list" className="mb-2 mt-1">
                                            {TOPIC_LINKS.map((n) => (
                                                <li key={n.id}>
                                                    <button
                                                        onClick={() => go(n.id)}
                                                        className="block w-full text-left py-2 rounded text-sm transition-colors duration-150 hover:bg-white hover:text-[rgb(0,85,137)]"
                                                        style={{paddingLeft:"20px"}}
                                                    >
                                                        {n.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Browse by Region (dropdown) */}
                                    <button
                                        type="button"
                                        onClick={() => setOpenTreatiesRegion(v => !v)}
                                        className={[
                                            "group w-full flex items-center justify-between pb-4 px-3 rounded-md",
                                            "text-[11px] uppercase tracking-wide",
                                            "text-white/90",
                                            "transition-colors duration-150",
                                            "hover:bg-white hover:text-[rgb(0,85,137)]",
                                            openTreatiesRegion ? "" : ""
                                        ].join(" ")}
                                        aria-expanded={openTreatiesRegion}
                                        aria-controls="treaties-region-list"
                                    >
                                        <span>Browse by Region</span>
                                        {openTreatiesRegion ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>

                                    {openTreatiesRegion && (
                                        <ul id="treaties-region-list" className="mb-2 mt-1">
                                            {REGION_LINKS.concat([{ id: 'global', label: 'Global' }]).map((n) => (
                                                <li key={n.id}>
                                                    <button
                                                        onClick={() => go(n.id)}
                                                        className="block w-full text-left py-2 rounded text-sm "
                                                        style={{paddingLeft:"20px"}}
                                                    >
                                                        {n.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            )}


                            {/* PARTIES */}
                            <button
                                type="button"
                                onClick={() => go('parties')}
                                className="w-full flex items-center justify-between pb-4  pt-0 text-[15px] font-semibold uppercase tracking-wide"
                            >
                                <span>Parties</span>
                            </button>

                            {/* KNOWLEDGE BASE */}
                            <button
                                type="button"
                                onClick={() => toggleSection('resources')}
                                className="w-full flex items-center justify-between pb-4 text-[15px] font-semibold uppercase tracking-wide"
                                aria-expanded={openSection === 'resources'}
                            >
                                <span>Knowledge Base</span>
                                {openSection === 'resources' ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                            {openSection === 'resources' && (
                                <ul className="pb-2">
                                    {RESOURCES_LINKS.map((item) => (
                                        <li key={item.id}>
                                            <button onClick={() => go(item.page)} className="block w-full text-left py-2 px-3 text-sm">
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* EN at the end */}
                            <button
                                type="button"
                                onClick={() => { /* language picker hook here if needed */ }}
                                className="w-full flex items-center justify-between pt-2 text-[12px] font-semibold uppercase tracking-wide"
                            >
                                <span>EN</span>
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
}
