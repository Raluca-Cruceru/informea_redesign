import image_b3317a67a82acceac61c19bd7a0014d2781165eb from 'figma:asset/b3317a67a82acceac61c19bd7a0014d2781165eb.png';
import { Search, Menu, GraduationCap, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useEffect, useRef, useState, ReactNode } from 'react';
// @ts-ignore
import grad from "../assets/graduation-cap.svg";

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

/* ---------------------------------------------
   Shared submenu shell + constant width
----------------------------------------------*/
const POPOVER_WIDTH_PX = 650; // single source of truth for all dropdown widths
const PANEL_SHELL =
    'rounded-xl border border-white/20 bg-white text-gray-900 shadow-xl transition-all duration-150';
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h4 className="inline-block bg-white px-2 py-0.5 rounded-sm font-semibold text-gray-900 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            {children}
        </h4>
    );
}

/* ---------------------------------------------
   Align-to-first-item utility hook
----------------------------------------------*/
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
            if (!w || !a) {
                setOffset(0);
                return;
            }
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

    // { id: 'structure', label: 'Structure and leadership', page: 'about-structure' },
    { id: 'contactshub', label: 'MEAs Contacts Hub', page: 'contacts-hub' },
    { id: 'contactus', label: 'Contact Us', page: '-' },

    { id: 'getinvolved', label: 'Get Involved', page: '-' },

    // { id: 'structure', label: 'Structure and leadership', page: 'about-structure' },
    // { id: 'cpr', label: 'Committee of Permanent Representatives', page: 'about-cpr' },
    // { id: 'unea', label: 'UN Environment Assembly', page: 'about-unea' },
    // { id: 'funding', label: 'Funding and partnerships', page: 'about-funding' },
    // { id: 'policies', label: 'Policies and strategies', page: 'about-policies' },
    // { id: 'evaluation', label: 'Evaluation Office', page: 'about-evaluation' },
    // { id: 'secretariats', label: 'Secretariats and Conventions', page: 'about-secretariats' },
    // { id: 'contact', label: 'Contact Us', page: 'contact' },
];

const PARTIES_LINKS = [
    { id: 'parties',           label: 'All Parties',            page: 'parties' },
    { id: 'bytreaty',  label: 'Browse by Treaty',       page: '-' },
];


const RESOURCES_LINKS = [
    { id: 'goals', label: 'Global Goals', page: 'global-goals' },
    // { id: 'meacontacts', label: 'MEA Contacts Hub', page: 'meacontacts' },


    { id: 'publications', label: 'Laws and Cases', page: 'resources-publications' },




    { id: 'glossary', label: 'Glossary', page: 'resources-glossary' },
    { id: 'toolkit', label: 'Negotiators Toolkit', page: 'toolkit' },
    { id: 'dashboards', label: 'Documents and Literature', page: 'resources-tools' },
    { id: 'elearning', label: 'E-learning courses', page: 'resources-elearning' },

    { id: 'unct', label: 'UNCT Dashboard', page: 'resources-unct' },



    // Youth explainers
];

/* ---------------------------------------------
   MEAs Mega Menu (nested columns)
----------------------------------------------*/

type TreeNode = { id: string; label: string; children?: TreeNode[] };

const MEA_TREE: TreeNode[] = [
    {
        id: 'chemicals',
        label: 'Chemicals & Waste',
        children: [
            {
                id: 'global',
                label: 'Global treaties',
                children: [
                    { id: 'basel', label: 'Basel Convention' },
                    { id: 'stockholm', label: 'Stockholm Convention' },
                    { id: 'rotterdam', label: 'Rotterdam Convention' },
                    { id: 'prtr', label: 'Kyiv Protocol on PRTRs' },
                    { id: 'minamata', label: 'Minamata Convention on Mercury' },
                ],
            },
            {
                id: 'regional',
                label: 'Regional treaties',
                children: [
                    { id: 'barcelona', label: 'Barcelona Convention' },
                    { id: 'dumping', label: 'Dumping Protocol' },
                ],
            },
        ],
    },
    { id: 'biodiversity', label: 'Biological Diversity', children: [] },
    { id: 'climate', label: 'Climate & Atmosphere', children: [] },
    { id: 'envgov', label: 'Environmental Governance', children: [] },
    { id: 'land', label: 'Land & Agriculture', children: [] },
    { id: 'marine', label: 'Marine & Freshwater', children: [] },

    // Region buckets (can add children later)
    { id: 'africa', label: 'Africa', children: [] },
    { id: 'asia-pacific', label: 'Asia and the Pacific', children: [] },
    { id: 'europe', label: 'Europe', children: [] },
    { id: 'lac', label: 'Latin America and the Caribbean', children: [] },
    { id: 'global', label: 'Global treaties', children: [] },
];

type LeftItem = { id: string; label: ReactNode };

const TOPIC_CATEGORIES: LeftItem[] = [
    { id: 'biodiversity', label: <>Treaties in <em>Biological diversity</em></> },
    { id: 'chemicals', label: <>Treaties in <em>Chemicals and Waste</em></> },
    { id: 'climate', label: <>Treaties in <em>Climate and Atmosphere</em></> },
    { id: 'envgov', label: <>Treaties in <em>Environmental Governance</em></> },
    { id: 'land', label: <>Treaties in <em>Land and Agriculture</em></> },
    { id: 'marine', label: <>Treaties in <em>Marine and Freshwater</em></> },
];

const REGIONAL_CATEGORIES: LeftItem[] = [
    { id: 'africa', label: <>Treaties in <em>AFRICA</em></> },
    { id: 'asia-pacific', label: <>Treaties in <em>ASIA AND THE PACIFIC</em></> },
    { id: 'europe', label: <>Treaties in <em>EUROPE</em></> },
    { id: 'lac', label: <>Treaties in <em>LATIN AMERICA AND THE CARIBBEAN</em></> },
    { id: 'global', label: <><em>GLOBAL</em> treaties</> },
];

/* ---------------------------------------------
   Link sets to match screenshot headings
----------------------------------------------*/
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

const LEVEL_LINKS: NavLink[] = [
    { id: 'global', label: 'Global' },
    { id: 'regional', label: 'Regional' },
];

/* ---------------------------------------------
   Parties data (mock list – swap with real list)
----------------------------------------------*/
const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
];

const UN_REGIONAL_GROUPS: NavLink[] = [
    { id: 'african', label: 'African States' },
    { id: 'asia-pacific', label: 'Asia-Pacific States' },
    { id: 'eastern-european', label: 'Eastern European States' },
    { id: 'lac', label: 'Latin American and Caribbean States' },
    { id: 'western-european', label: 'Western European and other States' },

];

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

    const openMenu = () => {
        if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
        setOpen(true);
    };
    const scheduleClose = (delay = 220) => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            setOpen(false);
            hideTimerRef.current = null;
        }, delay);
    };

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as Node;
            if (!rootRef.current?.contains(t)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [open]);

    // align to first item if you’re using it elsewhere
    const measAlignOffset = useLeftOffsetToAnchor(
        rootRef as React.RefObject<HTMLElement | null>,
        anchorRef,
        open
    );

    return (
        <div
            ref={rootRef}
            className="relative"
            onPointerEnter={openMenu}
            onPointerLeave={() => scheduleClose(260)}
        >
            {/* Trigger: click goes to MEAs page */}
            <button
                type="button"
                onClick={() => onSelect?.('meas')}
                className={`transition-colors font-medium flex items-center gap-1 ${open ? 'text-cyan-200' : 'hover:text-cyan-200'} cursor-pointer`}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="meas-menu"
            >
                <h3 className="text-xl">Treaties</h3>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {/* Panel – keep your POPOVER_WIDTH_PX */}
            <div
                id="meas-menu"
                className={`absolute p-2 left-0 top-full mt-2 z-50 ${PANEL_SHELL}
    ${open ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                style={{ width: 650, left: -measAlignOffset }}
                onPointerEnter={() => { if (hideTimerRef.current) { window.clearTimeout(hideTimerRef.current); hideTimerRef.current = null; } }}
                onPointerLeave={() => scheduleClose(220)}

            >
                <div className="flex" >
                    {/* LEFT rail */}
                    <div className="bg-gray-100 p-4 border-r border-gray-200 rounded-md" style={{width:"210px"}}>


                        {/* Faux select like screenshot */}
                        <div className="relative mb-6 pt-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search treaty..."
                                    className="pl-8 h-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                                />
                            </div>
                            {/*<ChevronDown className="w-5 h-5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />*/}
                        </div>

                        <p style={{fontWeight:"bold"}}>Recent Searches</p>


                    </div>

                    {/* RIGHT content — three evenly spaced columns */}
                    <div className="grid md:grid-cols-2 gap-6 px-8 py-4 text-l items-start content-start text-left" >
                            {/* By Topic */}
                            <div className="self-start flex flex-col text-left" >
                                <p style={{fontWeight:"bold", marginBottom:"6px"}}>Browse Treaties by Topic</p>
                                <ul >
                                    {[
                                        { id: 'biodiversity', label: 'Biological diversity' },
                                        { id: 'chemicals', label: 'Chemicals and Waste' },
                                        { id: 'climate', label: 'Climate and Atmosphere' },
                                        { id: 'envgov', label: 'Environmental Governance' },
                                        { id: 'land', label: 'Land and Agriculture' },
                                        { id: 'marine', label: 'Marine and Freshwater' },
                                    ].map((n) => (
                                        <li key={n.id}>
                                            <button
                                                type="button"
                                                onClick={() => onSelect?.(n.id)}
                                                className="text-blue-700 hover:text-blue-800 hover:underline  leading-6 cursor-pointer text-left"
                                                style={{paddingTop:"5px"}}
                                            >
                                                {n.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* By Region */}
                            <div className="self-start flex flex-col text-left">
                                <p style={{fontWeight:"bold",  marginBottom:"6px"}}>Browse Treaties by Region</p>
                                <ul className=" " >
                                    {[
                                        { id: 'africa', label: 'Africa' },
                                        { id: 'asia-pacific', label: 'Asia and the Pacific' },
                                        { id: 'europe', label: 'Europe' },
                                        { id: 'lac', label: 'Latin America and the Caribbean' },
                                        { id: 'global', label: 'Global Treaties' }
                                    ].map((n) => (
                                        <li key={n.id}>
                                            <button
                                                type="button"
                                                onClick={() => onSelect?.(n.id)}
                                                className="text-blue-700 hover:text-blue-800 hover:underline leading-6 cursor-pointer text-left"
                                                style={{paddingTop:"5px"}}
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




/* ---------------------------------------------
   Header with About + MEAs menus
----------------------------------------------*/

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [highlightSearch, setHighlightSearch] = useState(false);

    // ✅ Parties submenu state (INSIDE the component)
    const [partiesOpen, setPartiesOpen] = useState(false);
    const partiesHideTimerRef = useRef<number | null>(null);
    const scheduleCloseParties = (delay = 220) => {
        if (partiesHideTimerRef.current) window.clearTimeout(partiesHideTimerRef.current);
        partiesHideTimerRef.current = window.setTimeout(() => {
            setPartiesOpen(false);
            partiesHideTimerRef.current = null;
        }, delay);
    };
    // Parties submenu (mirror About)
    const partiesBtnRef = useRef<HTMLButtonElement | null>(null);
    const partiesMenuRef = useRef<HTMLDivElement | null>(null);
    const partiesWrapperRef = useRef<HTMLDivElement | null>(null);

    const openParties = () => {
        if (partiesHideTimerRef.current) {
            window.clearTimeout(partiesHideTimerRef.current);
            partiesHideTimerRef.current = null;
        }
        setPartiesOpen(true);
    };

    const cancelScheduledCloseParties = () => {
        if (partiesHideTimerRef.current) {
            window.clearTimeout(partiesHideTimerRef.current);
            partiesHideTimerRef.current = null;
        }
    };

// Close Parties when clicking outside (same as About)
    useEffect(() => {
        if (!partiesOpen) return;
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as Node;
            const inside =
                partiesMenuRef.current?.contains(t) ||
                partiesBtnRef.current?.contains(t) ||
                partiesWrapperRef.current?.contains(t);
            if (!inside) setPartiesOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [partiesOpen]);


    // About submenu state
    const [aboutOpen, setAboutOpen] = useState(false);
    const aboutBtnRef = useRef<HTMLButtonElement | null>(null);
    const aboutMenuRef = useRef<HTMLDivElement | null>(null);
    const aboutWrapperRef = useRef<HTMLDivElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);

    const openAbout = () => {
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        setAboutOpen(true);
    };
    const scheduleCloseAbout = (delay = 220) => {
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            setAboutOpen(false);
            hideTimerRef.current = null;
        }, delay);
    };
    const cancelScheduledClose = () => {
        if (hideTimerRef.current) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    // outside click (About)
    useEffect(() => {
        if (!aboutOpen) return;
        const onDocClick = (e: MouseEvent) => {
            const t = e.target as Node;
            const insideMenu = aboutMenuRef.current?.contains(t);
            const insideBtn = aboutBtnRef.current?.contains(t);
            const insideWrap = aboutWrapperRef.current?.contains(t);
            if (!insideMenu && !insideBtn && !insideWrap) {
                setAboutOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [aboutOpen]);

    const handleSearchClick = () => {
        if (currentPage === 'home' ) {
            setHighlightSearch(true);
            setTimeout(() => setHighlightSearch(false), 1500);
        } else {
            setShowSearch((s) => !s);
        }
    };

    // Resources submenu state
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const resourcesBtnRef = useRef<HTMLButtonElement | null>(null);
    const resourcesMenuRef = useRef<HTMLDivElement | null>(null);
    const resourcesWrapperRef = useRef<HTMLDivElement | null>(null);
    const resourcesHideTimerRef = useRef<number | null>(null);

    const openResources = () => {
        if (resourcesHideTimerRef.current) {
            window.clearTimeout(resourcesHideTimerRef.current);
            resourcesHideTimerRef.current = null;
        }
        setResourcesOpen(true);
    };
    const scheduleCloseResources = (delay = 220) => {
        if (resourcesHideTimerRef.current) window.clearTimeout(resourcesHideTimerRef.current);
        resourcesHideTimerRef.current = window.setTimeout(() => {
            setResourcesOpen(false);
            resourcesHideTimerRef.current = null;
        }, delay);
    };
    const cancelScheduledCloseResources = () => {
        if (resourcesHideTimerRef.current) {
            window.clearTimeout(resourcesHideTimerRef.current);
            resourcesHideTimerRef.current = null;
        }
    };

    // Close Resources when clicking outside
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

    // --- Align all dropdowns to the first item (About) ---
    const aboutAlignOffset = useLeftOffsetToAnchor(
        aboutWrapperRef as React.RefObject<HTMLElement | null>,
        aboutWrapperRef as React.RefObject<HTMLElement | null>,
        aboutOpen
    ); // 0 for About
    const resourcesAlignOffset = useLeftOffsetToAnchor(
        resourcesWrapperRef as React.RefObject<HTMLElement | null>,
        aboutWrapperRef as React.RefObject<HTMLElement | null>,
        resourcesOpen
    );

    return (
        <header className="text-white shadow-lg" style={{  backgroundColor: 'var(--header-bg, rgb(0, 85, 137))',
            paddingLeft: '100px',
            paddingRight: '100px',
            boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.85)'}}>
            {/*'var(--header-bg, rgb(10,143,198))'*/}
            <div >
                {/* Top Navigation */}
                <div className="flex items-center justify-between py-4 border-b border-white">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
                            <div className="flex items-center space-x-2">
                                <img src={image_b3317a67a82acceac61c19bd7a0014d2781165eb} alt="UN Logo" className="w-auto h-10" />
                                <h1 className="text-3xl font-serif" style={{ fontFamily: 'Times New Roman, serif', fontSize:"27px" }}>
                                    InforMEA
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        {/* Right-side navigation */}
                        <nav className="hidden lg:flex items-center space-x-8 mr-6">
                            {/* ABOUT menu */}
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
                                    aria-haspopup="menu"
                                    aria-expanded={aboutOpen}
                                    aria-controls="about-submenu"
                                >

                                    <h3 className="text-xl">About</h3>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-150 ${aboutOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Submenu panel (3-column grid of items) */}
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
                                    {/*<ul className="grid md-grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 p-6">*/}
                                    <ul className="grid gap-x-8 gap-y-2 p-6">

                                    {ABOUT_LINKS.map((item) => (
                                            <li key={item.id} className="min-w-0">
                                                <button
                                                    type="button"
                                                    role="menuitem"
                                                    onClick={() => {
                                                        setCurrentPage(item.page);
                                                        setAboutOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-[16px] leading-snug transition-colors hover:bg-gray-100 hover:text-cyan-700 focus:bg-cyan-100 focus:outline-none"
                                                >
                                                    <span className="block truncate">{item.label}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* MEAs mega menu (nested) */}
                            <MEAsMenu
                                anchorRef={aboutWrapperRef as React.RefObject<HTMLElement | null>}
                                onSelect={(id) => setCurrentPage(id)}
                            />

                            {/* PARTIES menu (same shell/width/spacing as About) */}
                            <div
                                ref={partiesWrapperRef}
                                className="relative"
                                onMouseEnter={openParties}
                                onMouseLeave={() => scheduleCloseParties(260)}
                            >
                                <button
                                    ref={partiesBtnRef}
                                    type="button"
                                    onClick={() => setCurrentPage('parties')}
                                    onFocus={openParties}
                                    className={`transition-colors font-medium flex items-center gap-1 cursor-pointer
      ${partiesOpen || currentPage === 'parties' ? 'text-cyan-200' : 'hover:text-cyan-200'}`}
                                    aria-haspopup="menu"
                                    aria-expanded={partiesOpen}
                                    aria-controls="parties-submenu"
                                >
                                    <h3 className="text-xl">Parties</h3>
                                    {/*<ChevronDown*/}
                                    {/*    className={`w-4 h-4 transition-transform duration-150 ${partiesOpen ? 'rotate-180' : ''}`}*/}
                                    {/*    aria-hidden="true"*/}
                                    {/*/>*/}
                                </button>

      {/*                          <div*/}
      {/*                              id="parties-submenu"*/}
      {/*                              ref={partiesMenuRef}*/}
      {/*                              className={`absolute left-0 top-full mt-2 z-50 ${PANEL_SHELL}*/}
      {/*${partiesOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto'*/}
      {/*                                  : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}*/}
      {/*                              role="menu"*/}
      {/*                              onPointerEnter={cancelScheduledCloseParties}*/}
      {/*                              onPointerLeave={() => scheduleCloseParties(220)}*/}
      {/*                              style={{ width: 300, left: -aboutAlignOffset }}*/}
      {/*                          >*/}
      {/*                              <ul className="grid gap-x-8 gap-y-2 p-6">*/}
      {/*                                  {PARTIES_LINKS.map((item) => (*/}
      {/*                                      <li key={item.id} className="min-w-0">*/}
      {/*                                          <button*/}
      {/*                                              type="button"*/}
      {/*                                              role="menuitem"*/}
      {/*                                              onClick={() => {*/}
      {/*                                                  setCurrentPage(item.page);*/}
      {/*                                                  setPartiesOpen(false);*/}
      {/*                                              }}*/}
      {/*                                              className="w-full text-left px-3 py-2 rounded-md text-[16px] leading-snug*/}
      {/*                 transition-colors hover:bg-gray-100 hover:text-cyan-700*/}
      {/*                 focus:bg-cyan-100 focus:outline-none"*/}
      {/*                                          >*/}
      {/*                                              <span className="block truncate">{item.label}</span>*/}
      {/*                                          </button>*/}
      {/*                                      </li>*/}
      {/*                                  ))}*/}
      {/*                                  <li className={"p-2"}><div className="flex-1 relative bg-gray-100 p-2 border-r border-gray-200 rounded-md" >*/}
      {/*                                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />*/}
      {/*                                      <Input*/}
      {/*                                          placeholder="Search Party..."*/}
      {/*                                          className="pl-8 h-8 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"*/}
      {/*                                      />*/}
      {/*                                  </div></li>*/}
      {/*                              </ul>*/}


      {/*                          </div>*/}
                            </div>



                            {/* KNOWLEDGE BASE submenu (3-column grid of items) */}
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
                                    aria-haspopup="menu"
                                    aria-expanded={resourcesOpen}
                                    aria-controls="resources-submenu"
                                >
                                    <h3 className="text-xl">Knowledge Base</h3>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-150 ${resourcesOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
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
                                    <ul className="grid md-grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 p-6">
                                        {RESOURCES_LINKS.map((item) => (
                                            <li key={item.id} className="min-w-0">
                                                <button
                                                    type="button"
                                                    role="menuitem"
                                                    onClick={() => {
                                                        setCurrentPage(item.page);
                                                        setResourcesOpen(false);
                                                    }}
                                                    className=" text-left px-3 py-2 rounded-md text-[15px] leading-snug hover:bg-gray-100 hover:text-cyan-700 focus:bg-cyan-100 focus:outline-none"
                                                >
                                                    {item.label}
                                                </button>
                                            </li>
                                        ))}
                                        {/*<li>*/}
                                        {/*    <button*/}
                                        {/*        type="button"*/}
                                        {/*        role="menuitem"*/}
                                        {/*        onClick={() => {*/}
                                        {/*            // setCurrentPage(item.page);*/}
                                        {/*            setResourcesOpen(false);*/}
                                        {/*        }}*/}
                                        {/*        className="w-full text-left px-3 py-2 rounded-md text-[15px] leading-snug hover:bg-gray-100 hover:text-cyan-700 focus:bg-cyan-100 focus:outline-none rounded "*/}
                                        {/*        style={{backgroundColor: '#90D5FF'}}*/}
                                        {/*    >*/}
                                        {/*        <p className={"font-semibold "}>Resources for Youth</p>*/}
                                        {/*    </button>*/}
                                        {/*</li>*/}
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <Badge variant="secondary" className="bg-gray-600 text-black font-bold hover:bg-gray-500 flex items-center text-m cursor-pointer h-7"
                        style={{backgroundColor:"#fc3", color: 'black', fontSize: '11px', marginRight:"12px"}}>
                            <img src={grad} alt="grad-cap" className="w-auto h-5" />

                            FREE ONLINE COURSES
                        </Badge>

                        {/* Search toggle button */}
                        {currentPage !== 'home' && (
                            <Button variant="ghost" size="sm" className="text-white hover:text-cyan-200 cursor-pointer" onClick={handleSearchClick} style ={{marginRight:"5px"}}>
                            <Search className="w-4 h-4" />
                        </Button>
                            )}

                        <Button variant="ghost" size="sm" className="text-white hover:text-cyan-200 hover:bg-cyan-400 cursor-pointer text-l" style ={{marginRight:"5px", fontSize:"15px", fontFamily: ' Arial, Helvetica, sans-serif' }}>
                            EN
                        </Button>
                        <Button variant="ghost" size="sm" className="lg:hidden">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>

                </div>
                {/* News line */}
                {/*<div className="bg-yellow-300 text-black rounded text-sm py-1 px-4 border-t border-b border-yellow-400 overflow-hidden" style={{backgroundColor:"#fc3", color:"black"}}>*/}
                {/*    <div className="max-w-[1400px] mx-auto flex items-center">*/}
                {/*        <span className="font-semibold mr-2">Latest:</span>*/}
                {/*        <marquee behavior="scroll" direction="left" scrollamount="4">*/}
                {/*            <a*/}
                {/*                href="#"*/}
                {/*                onClick={(e) => {*/}
                {/*                    e.preventDefault();*/}
                {/*                    setCurrentPage('global-goals');*/}
                {/*                }}*/}
                {/*                className="underline hover:text-cyan-700 cursor-pointer"*/}
                {/*            >*/}
                {/*                We have launched a new section on <strong>Global Goals and MEA Strategic Plans-Mapping Linkages</strong>.*/}
                {/*                Click here to visit. ➜*/}
                {/*            </a>*/}
                {/*        </marquee>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Hero Section - visible on home page or when search toggled */}
                {(currentPage === 'home'  || showSearch) && (
                    <div className={`py-8 text-center rounded-lg ${highlightSearch ? 'animate-pulse bg-yellow-100' : ''}`}>
                        <h3 className="text-3xl md:text-2xl mb-8 max-w-5xl mx-auto">
                            The United Nations Portal on Multilateral Environmental Agreements
                        </h3>

                        {/* Search Bar */}
                        <div className="max-w-3xl mx-auto flex gap-3 mb-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder="Search treaties, parties, cases..."
                                    className="pl-10 h-12 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                                />
                            </div>

                            {/*<Select defaultValue="all">*/}
                            {/*    <SelectTrigger className="w-48 h-12 bg-white/90 border-0 text-gray-900" data-size="lg">*/}
                            {/*        <SelectValue />*/}
                            {/*    </SelectTrigger>*/}
                            {/*    <SelectContent>*/}
                            {/*        <SelectItem value="all">All Categories</SelectItem>*/}
                            {/*        <SelectItem value="treaties">Treaties</SelectItem>*/}
                            {/*        <SelectItem value="parties">Parties</SelectItem>*/}
                            {/*        <SelectItem value="cases">Cases</SelectItem>*/}
                            {/*    </SelectContent>*/}
                            {/*</Select>*/}

                            <Select defaultValue="all">
                                <SelectTrigger className="w-64 h-12 bg-white/90 border-0 text-gray-900" data-size="lg">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent className="max-h-[28rem] px-6 py-4" style={{ width: "340px" }}>
                                    {/* TREATIES */}
                                    <SelectItem
                                        value="_hdr_treaties"
                                        className="text-lg tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mb-1"
                                    >
                                        TREATIES
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="treaty-texts" className="text-md h-auto p-0">Treaty texts</SelectItem>
                                        <SelectItem value="decision-texts" className="text-md h-auto p-0">Decision texts</SelectItem>
                                    </div>

                                    {/* NATIONAL SUBMISSIONS */}
                                    <SelectItem
                                        value="_hdr_national"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        NATIONAL SUBMISSIONS
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="national-plans" className="text-md h-auto p-0">National Plans</SelectItem>
                                        <SelectItem value="national-reports" className="text-md h-auto p-0">National Reports</SelectItem>
                                    </div>

                                    {/* LAW AND CASES */}
                                    <SelectItem
                                        value="_hdr_law"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        LAW AND CASES
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="legislation" className="text-md h-auto p-0">Legislation</SelectItem>
                                        <SelectItem value="court-decisions" className="text-md h-auto p-0">Court Decisions</SelectItem>
                                    </div>

                                    {/* DOCUMENTS AND LITERATURE */}
                                    <SelectItem
                                        value="_hdr_docs"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        DOCUMENTS AND LITERATURE
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="documents" className="text-md h-auto p-0">Documents</SelectItem>
                                        <SelectItem value="literature" className="text-md h-auto p-0">Literature</SelectItem>
                                    </div>

                                    {/* NEWS AND EVENTS */}
                                    <SelectItem
                                        value="_hdr_news"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        NEWS AND EVENTS
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="news" className="text-md h-auto p-0">News</SelectItem>
                                        <SelectItem value="events" className="text-md h-auto p-0">Events</SelectItem>
                                    </div>

                                    {/* GOALS AND DECLARATIONS */}
                                    <SelectItem
                                        value="_hdr_goals"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        GOALS AND DECLARATIONS
                                    </SelectItem>
                                    <div className="flex items-center justify-between border-b pt-1 pb-3">
                                        <SelectItem value="goals" className="text-md h-auto p-0">Goals</SelectItem>
                                        <SelectItem value="declarations" className="text-md h-auto p-0">Declarations</SelectItem>
                                    </div>

                                    {/* CONTACTS HUB */}
                                    <SelectItem
                                        value="_hdr_contacts"
                                        className="text-md tracking-wide text-gray-600 font-semibold cursor-default h-auto p-0 mt-2 mb-1"
                                    >
                                        CONTACTS HUB
                                    </SelectItem>

                                    {/* ALL CATEGORIES */}
                                    <div className="mt-4">
                                        <SelectItem value="all" className="text-md h-auto  py-2">
                                            All Categories
                                        </SelectItem>
                                    </div>
                                </SelectContent>
                            </Select>




                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
