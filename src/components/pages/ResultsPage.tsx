import { useMemo, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch, CategoryKey} from '@/search-state';

import { DEFAULT_FACETS } from '@/search-state'; // <-- add this import
import { ChevronDown, X } from 'lucide-react';

// keep only the ones we still use
import { Tag as TagIcon, Globe2 } from "lucide-react";

// Topic SVGs
import biodiversity from "../../assets/biodiversity.svg";
import chemicals from "../../assets/chemicals.svg";
import climate from "../../assets/climate.svg";
import governance from "../../assets/governance.svg";
import agriculture from "../../assets/agriculture.svg";
import oceans from "../../assets/oceans.svg";

// topic → badge color classes
const TOPIC_STYLES: Record<string, string> = {
    "Biological Diversity": "bg-green-600 ",
    "Chemicals and Waste": "bg-red-600",
    "Marine and Freshwater": "bg-blue-800",
    "Climate and Atmosphere": "bg-sky-500",
    "Land and Agriculture": "bg-orange-500",
    "Environmental Governance": "bg-green-800",
};
const TOPIC_COLORS: Record<string, string> = {
    "Biological Diversity": "#65a30d",  // lime-600
    "Chemicals and Waste": "#ea580c",   // orange-600
    "Marine and Freshwater": "#0369a1", // sky-700
    "Climate and Atmosphere": "#3b82f6",// blue-500
    "Land and Agriculture": "#b45309",  // amber-700
    "Environmental Governance": "#334155", // slate-700
};


const TOPIC_IMAGES: Record<string, any> = {
    "Biological Diversity": biodiversity,
    "Chemicals and Waste": chemicals,
    "Marine and Freshwater": oceans,
    "Climate and Atmosphere": climate,
    "Land and Agriculture": agriculture,
    "Environmental Governance": governance,
};

// short language labels (show these on buttons)
const LANG_SHORT: Record<string, string> = {
    english: "EN",
    en: "EN",
    french: "FR",
    fr: "FR",
    spanish: "ES",
    es: "ES",
    arabic: "AR",
    ar: "AR",
    russian: "RU",
    ru: "RU",
    chinese: "ZH",
    zh: "ZH",
};

function Pill({
                  children,
                  className = "",
              }: {
    children?: React.ReactNode;
    className?: string;
}) {
    // Convert to string if it's a primitive, then trim to check if it's effectively empty
    const content =
        typeof children === "string" ? children.trim() : children;

    // Don't render if no visible content
    if (
        content === "" ||
        content === null ||
        content === undefined ||
        content === false
    ) {
        return null;
    }

    return (
        <span
            className={`
        inline-flex items-center justify-center
        rounded-md border border-sky-200
        bg-gray-100 px-2.5 py-1
        text-md 
        ${className}
      `}
            style={{ backgroundColor: TOPIC_COLORS[children] }}>
      {children}
    </span>
    );
}


type ResultRow = {
    id: string;
    title: string;
    summary: string;
    year: number;
    category: CategoryKey;
    topics: string[];
    regions: string[];
    documentTypes: string[];
    leoThesaurus: string[];
};

const MOCK: ResultRow[] = [
    {
        id: "r1",
        title: "Report of the Meeting – MED POL Focal Points",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2025,
        category: "decision-texts",
        topics: ["Marine and Freshwater", "Chemicals and Waste"],
        regions: ["Europe", "Global"],
        documentTypes: ["Decision"],
        leoThesaurus: ["Conventions"],
    },
    {
        id: "r2",
        title: "Operational Guidelines for Sustainable Agriculture",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2023,
        category: "documents",
        topics: ["Land and Agriculture", "Biological Diversity"],
        regions: ["Africa", "Asia and the Pacific"],
        documentTypes: ["Guideline"],
        leoThesaurus: ["Soft law"],
    },
    {
        id: "r3",
        title: "National Action Plan on Climate Adaptation – Chile",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2022,
        category: "national-reports",
        topics: ["Climate and Atmosphere"],
        regions: ["Latin America and the Caribbean"],
        documentTypes: ["National report"],
        leoThesaurus: ["National reports"],
    },
    {
        id: "r4",
        title: "DECISION OF THE MEETING - Fifteenth Meeting of the Contracting Parties to the Convention for the Protection of the Marine Environment and the Coastal Region of the Mediterranean and its Protocols; Guidelines for the Determination of Liability and Compensation for Damage resulting from Pollution of the Marine Environment in the Mediterranean Sea Area",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2021,
        category: "decision-texts",
        topics: ["Marine and Freshwater", "Chemicals and Waste"],
        regions: ["Asia and the Pacific"],
        documentTypes: ["Decision"],
        leoThesaurus: ["COPs"],
    },
    {
        id: "r5",
        title: "Court ruling: People vs. OceanDump Inc.",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2019,
        category: "court-decisions",
        topics: ["Environmental Governance", "Marine and Freshwater"],
        regions: ["North America"],
        documentTypes: ["Court decision"],
        leoThesaurus: ["Cases"],
    },
    {
        id: "r6",
        title: "Assessment of Forest Biodiversity Loss – Congo Basin",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2020,
        category: "literature",
        topics: ["Biological Diversity", "Land and Agriculture"],
        regions: ["Africa"],
        documentTypes: ["Assessment"],
        leoThesaurus: ["Documents and Literature"],
    },
    {
        id: "r7",
        title: "UNEP Communication Strategy for Hazardous Waste",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2024,
        category: "documents",
        topics: ["Chemicals and Waste"],
        regions: ["Global"],
        documentTypes: ["Communication"],
        leoThesaurus: ["Conventions"],
    },
    {
        id: "r8",
        title: "Agreement on Arctic Marine Ecosystems",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2018,
        category: "treaty-texts",
        topics: ["Marine and Freshwater", "Biological Diversity"],
        regions: ["Polar: Arctic"],
        documentTypes: ["Agreement"],
        leoThesaurus: ["Treaties"],
    },
    {
        id: "r9",
        title: "Decision V/24: Transboundary Hazardous Wastes",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 1999,
        category: "decision-texts",
        topics: ["Chemicals and Waste", "Climate and Atmosphere"],
        regions: ["Global"],
        documentTypes: ["Decision"],
        leoThesaurus: ["Legislation"],
    },
    {
        id: "r10",
        title: "Climate Co-benefits of Waste Reduction",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2021,
        category: "literature",
        topics: ["Climate and Atmosphere", "Chemicals and Waste"],
        regions: ["Global"],
        documentTypes: ["Literature"],
        leoThesaurus: ["Documents and Literature"],
    },
    {
        id: "r11",
        title: "Sustainable Land Use Planning Toolkit",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2017,
        category: "documents",
        topics: ["Land and Agriculture", "Biological Diversity"],
        regions: ["Europe", "Asia and the Pacific"],
        documentTypes: ["Toolkit"],
        leoThesaurus: ["Guidelines"],
    },
    {
        id: "r12",
        title: "Factsheet: Global Mercury Partnership",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2023,
        category: "documents",
        topics: ["Chemicals and Waste", "Environmental Governance"],
        regions: ["Global"],
        documentTypes: ["Factsheet"],
        leoThesaurus: ["Partnership Programme"],
    },
    {
        id: "r13",
        title: "National Implementation Report – India",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2024,
        category: "national-reports",
        topics: ["Chemicals and Waste", "Environmental Governance"],
        regions: ["Asia and the Pacific"],
        documentTypes: ["National report"],
        leoThesaurus: ["National reports"],
    },
    {
        id: "r14",
        title: "Concept Note: Climate Resilient Agriculture",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2025,
        category: "documents",
        topics: ["Land and Agriculture", "Climate and Atmosphere"],
        regions: ["Africa"],
        documentTypes: ["Concept note"],
        leoThesaurus: ["Documents and Literature"],
    },
    {
        id: "r15",
        title: "Law on Biodiversity Conservation – Peru",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2015,
        category: "legislation",
        topics: ["Biological Diversity"],
        regions: ["Latin America and the Caribbean"],
        documentTypes: ["Law"],
        leoThesaurus: ["Legislation"],
    },
    {
        id: "r16",
        title: "Decision on Atmospheric Monitoring",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2020,
        category: "decision-texts",
        topics: ["Climate and Atmosphere"],
        regions: ["West Asia", "Europe"],
        documentTypes: ["Decision"],
        leoThesaurus: ["COPs"],
    },
    {
        id: "r17",
        title: "Regional Workshop on Marine Governance",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2021,
        category: "events",
        topics: ["Marine and Freshwater", "Environmental Governance"],
        regions: ["West Asia"],
        documentTypes: ["Meeting report"],
        leoThesaurus: ["Conventions"],
    },
    {
        id: "r18",
        title: "National Waste Legislation – Japan",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2019,
        category: "legislation",
        topics: ["Chemicals and Waste"],
        regions: ["Asia and the Pacific"],
        documentTypes: ["Law"],
        leoThesaurus: ["Legislation"],
    },
    {
        id: "r19",
        title: "UNEP Declaration on Environmental Justice",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2022,
        category: "declarations",
        topics: ["Environmental Governance"],
        regions: ["Global"],
        documentTypes: ["Declaration"],
        leoThesaurus: ["Declarations"],
    },
    {
        id: "r20",
        title: "Policy Brief: Ocean Plastics and Circular Economy",
        summary:
            "Glossary term(s): Conventions, Environmental conservation, Reporting, Implementation, Marine ecosystems, Soft law, Appendices, Monitoring, Pollution, Climate change",
        year: 2025,
        category: "documents",
        topics: ["Marine and Freshwater", "Chemicals and Waste"],
        regions: ["Global"],
        documentTypes: ["Policy brief"],
        leoThesaurus: ["Documents and Literature"],
    },
];



const REGIONS_LEFT = [
    'Global',
    'Europe',
    'Asia and the Pacific',
    'Africa',
    'Latin America and the Caribbean',
    'Polar: Arctic',
    'West Asia',
    'North America',
];

const COUNTRIES = [ 'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', ];


const SOURCES = ['FAOLEX', 'ECOLEX/ELIS', 'InforMEA', 'Sabin Center'];

const TEXT_TYPES = [
    'Agreement',
    'Bilateral',
    'Constitution',
    'International court',
    'Legislation',
    'Miscellaneous',
    'Multilateral',
    'National - higher court',
    'Others',
];

const TOPICS = [
    'Biological Diversity',
    'Chemicals and Waste',
    'Climate and Atmosphere',
    'Environmental Governance',
    'Land and Agriculture',
    'Marine and Freshwater',
];

const DOC_TYPES = [
    'Assessment',
    'Communication',
    'Concept note',
    'COP/MOP decision and recommendations',
    'Factsheet',
];

const LEO = [
    'National reports',
    'Conventions',
    'Implementation & Compliance Committee',
    'COPs',
    'Financing and budget',
];

const SORT_OPTIONS = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'oldest', label: 'Least Recent' },
    { id: 'relevance', label: 'Relevance' },
];

// put near top of ResultsPage.tsx
const CATEGORY_BUCKETS: {
    label: string;
    picks: CategoryKey[]; // first is default when clicked
}[] = [
    { label: 'All Categories', picks: ['all'] },
    { label: 'Treaties', picks: ['treaty-texts', 'decision-texts'] },
    { label: 'National Submissions', picks: ['national-plans', 'national-reports'] },
    { label: 'Law and Cases', picks: ['legislation', 'court-decisions'] },
    { label: 'Documents and Literature', picks: ['documents', 'literature'] },
    { label: 'News and events', picks: ['news', 'events'] },
    { label: 'Goals and Declarations', picks: ['goals', 'declarations'] },
];

function CategoryBar() {
    const { state, setState } = useSearch();

    const isActive = (bucket: typeof CATEGORY_BUCKETS[number]) =>
        bucket.picks.includes(state.category);

    const setBucket = (bucket: typeof CATEGORY_BUCKETS[number]) =>
        setState({ ...state, category: bucket.picks[0] });

    return (
        <div className="w-full bg-slate-50/90 backdrop-blur supports-[backdrop-filter]:bg-slate-50/60  py-0 rounded-md">
            <div className="flex items-center gap-2">
                {/* Fixed label (does NOT scroll) */}
                <span className="shrink-0 text-lg text-gray-600 whitespace-nowrap mr-1 pl-0">
                    Browse by category:
                 </span>

                {/* Scrollable buttons area */}
                <div className="overflow-x-auto no-scrollbar flex-1">
                    <div className="inline-flex items-center gap-2 min-w-max" >
                        {CATEGORY_BUCKETS.map((b) => (
                            <button
                                key={b.label}
                                onClick={() => setBucket(b)}
                                className={[
                                    "whitespace-nowrap rounded-xl px-3 py-2 text-md transition-colors",
                                    isActive(b)
                                        ? "bg-white border border-blue-500 text-blue-700 font-semibold shadow-sm"
                                        : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                                ].join(" ")}
                            >
                                {b.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function MultiDropdown({
                           label,
                           options,
                           values,
                           onChange,
                           placeholder = "Select…",
                           single = false,
                           className = "",
                       }: {
    label: string;
    options: string[];
    values: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    single?: boolean;
    className?: string;
}) {
    const [search, setSearch] = useState("");
    const [openUp, setOpenUp] = useState(false);          // ⬆️ whether dropdown opens upward
    const [panelMaxH, setPanelMaxH] = useState<number>(); // maximum height for the panel

    const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const summaryRef = useRef<HTMLElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    // toggle selection
    const toggleVal = (v: string) => {
        if (single) {
            onChange(values.includes(v) ? [] : [v]);
            // close dropdown on single-select
            const d = detailsRef.current;
            if (d) d.open = false;
        } else {
            const set = new Set(values);
            set.has(v) ? set.delete(v) : set.add(v);
            onChange(Array.from(set));
        }
    };

    const summaryText = values.length === 0 ? placeholder : values.join(", ");

    const filteredOptions = useMemo(() => {
        if (!search.trim()) return options;
        const q = search.toLowerCase();
        return options.filter((o) => o.toLowerCase().includes(q));
    }, [search, options]);

    // --- compute space & decide direction ---
    const measureAndPlace = () => {
        const sum = summaryRef.current;
        const pan = panelRef.current;
        if (!sum || !pan) return;

        const triggerRect = sum.getBoundingClientRect();
        const prev = {
            position: pan.style.position,
            visibility: pan.style.visibility,
            display: pan.style.display,
            maxHeight: pan.style.maxHeight,
        };
        pan.style.position = "absolute";
        pan.style.visibility = "hidden";
        pan.style.display = "block";
        pan.style.maxHeight = "unset";
        const menuRect = pan.getBoundingClientRect();

        const viewportH = window.innerHeight;
        const gap = 8;

        const spaceBelow = Math.max(0, viewportH - triggerRect.bottom - gap);
        const spaceAbove = Math.max(0, triggerRect.top - gap);
        const need = Math.min(menuRect.height, viewportH - gap * 2);

        // decide open direction
        let openUpNext = false;
        if (spaceBelow < need && spaceAbove >= need) openUpNext = true;
        else if (spaceBelow >= need) openUpNext = false;
        else openUpNext = spaceAbove > spaceBelow;

        const maxH = openUpNext ? spaceAbove : spaceBelow;

        setOpenUp(openUpNext);
        setPanelMaxH(maxH);

        // restore original styles
        pan.style.position = prev.position;
        pan.style.visibility = prev.visibility;
        pan.style.display = prev.display;
        pan.style.maxHeight = prev.maxHeight;
    };

    const onToggle = () => {
        const d = detailsRef.current;
        if (d?.open) requestAnimationFrame(measureAndPlace);
    };

    // re-measure on resize/scroll while open
    useEffect(() => {
        const d = detailsRef.current;
        if (!d?.open) return;
        const handler = () => measureAndPlace();
        window.addEventListener("resize", handler, { passive: true });
        window.addEventListener("scroll", handler, { passive: true });
        const ro = new ResizeObserver(handler);
        if (panelRef.current) ro.observe(panelRef.current);
        return () => {
            window.removeEventListener("resize", handler);
            window.removeEventListener("scroll", handler);
            ro.disconnect();
        };
    }, [detailsRef.current?.open]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`w-full space-y-1 ${className}`}>
            <label className="block text-md font-semibold pb-3">{label}</label>

            <details ref={detailsRef} className="group relative pb-3" onToggle={onToggle}>
                {/* Trigger */}
                <summary
                    ref={summaryRef as any}
                    className="
            list-none select-none flex items-center justify-between
            w-full h-9 p-4 rounded-md
            bg-white border border-slate-300
            text-l text-slate-800 cursor-pointer
            hover:border-slate-400
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
          "
                >
                    <span className="truncate">{summaryText}</span>
                    <svg
                        className="w-4 h-4 ml-2 shrink-0 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"/>
                    </svg>
                </summary>

                {/* Dropdown panel */}
                <div
                    ref={panelRef}
                    className="
            absolute z-20 w-full rounded-md border border-slate-200 bg-white shadow-lg
            overflow-auto
          "
                    style={
                        openUp
                            ? { bottom: "100%", marginBottom: 8, maxHeight: panelMaxH ? `${panelMaxH}px` : undefined }
                            : { top: "100%", marginTop: 8, maxHeight: panelMaxH ? `${panelMaxH}px` : undefined }
                    }
                >
                    {/* Search */}
                    <div className="sticky top-0 bg-white p-0">
                        <input
                            type="text"
                            placeholder="Filter..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                w-full h-7 text-md px-2 border border-slate-300
                focus:outline-none focus:ring-1 focus:ring-blue-400
              "
                        />
                    </div>

                    {/* Options */}
                    <div className="p-2 grid gap-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => {
                                const checked = values.includes(opt);
                                return (
                                    <label
                                        key={opt}
                                        className="flex items-center gap-2 rounded-md px-2 py-1 text-l cursor-pointer hover:bg-slate-50"
                                    >
                                        <input
                                            type={single ? "radio" : "checkbox"}
                                            className="h-4 w-4 rounded border-slate-300"
                                            checked={checked}
                                            onChange={() => toggleVal(opt)}
                                        />
                                        <span className={checked ? "font-medium text-blue-700" : ""}>{opt}</span>
                                    </label>
                                );
                            })
                        ) : (
                            <div className="text-xs text-slate-500 italic px-2 py-3 text-center">No matches</div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-2 py-1.5 border-t bg-slate-50 sticky bottom-0">
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                onChange([]);
                            }}
                            className="text-sm text-slate-600 hover:text-slate-800"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                const root = e.currentTarget.closest("details") as HTMLDetailsElement | null;
                                if (root) root.open = false;
                            }}
                            className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </details>
        </div>
    );
}





// --- small helpers -----------------------------------------------------------
const toSet = (arr: string[]) => new Set(arr ?? []);
const toggleInSet = (s: Set<string>, v: string) => (s.has(v) ? (s.delete(v), s) : (s.add(v), s));

// simple accordion section using <details>
function FacetSection({
                          title,
                          defaultOpen = false,
                          children,
                      }: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    return (
        <details className="group border-b border-slate-200 pb-2" open={defaultOpen}>
            <summary className="flex items-center justify-between py-3 cursor-pointer select-none">
                <span className="text-md font-semibold text-slate-800">{title}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="pb-2">{children}</div>
        </details>
    );
}

function CheckRow({
                      label,
                      checked,
                      count,
                      onChange,
                  }: {
    label: string;
    checked: boolean;
    count?: number | string;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-3 py-1.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
            <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={checked}
                onChange={onChange}
            />
            <span className="flex-1 text-sm">{label}</span>
            {typeof count !== "undefined" && (
                <span className="text-xs text-slate-500 tabular-nums">{count}</span>
            )}
        </label>
    );
}

function RadioRow({
                      label,
                      checked,
                      onChange,
                  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-3 py-1.5 px-1 rounded hover:bg-slate-50 cursor-pointer">
            <input
                type="radio"
                name={`radio-${label}`}
                className="h-4 w-4 border-slate-300"
                checked={checked}
                onChange={onChange}
            />
            <span className="text-md">{label}</span>
        </label>
    );
}

function LeftFilters() {
    const { state, setState } = useSearch();

    // year range (keep your debounced write-back)
    const [min, setMin] = useState(state.facets.yearMin);
    const [max, setMax] = useState(state.facets.yearMax);

    useEffect(() => {
        const t = setTimeout(
            () => setState({ ...state, facets: { ...state.facets, yearMin: min, yearMax: max } }),
            200
        );
        return () => clearTimeout(t);
    }, [min, max]); // eslint-disable-line react-hooks/exhaustive-deps

    // ------- active chips ------------------------------------------------------
    type Chip = { key: string; label: string; remove: () => void };

    const chips: Chip[] = useMemo(() => {
        const c: Chip[] = [];

        const addMulti = (key: keyof typeof state.facets, labelPrefix: string) => {
            const vals = (state.facets[key] as string[]) || [];
            vals.forEach(v =>
                c.push({
                    key: `${String(key)}:${v}`,
                    label: v,
                    remove: () =>
                        setState({
                            ...state,
                            facets: { ...state.facets, [key]: vals.filter(x => x !== v) },
                        }),
                })
            );
        };

        // single-selects
        if (state.facets.relatedTreaties && state.facets.relatedTreaties !== "All related treaties") {
            c.push({
                key: "relatedTreaties",
                label: state.facets.relatedTreaties,
                remove: () => setState({ ...state, facets: { ...state.facets, relatedTreaties: "All related treaties" } }),
            });
        }
        if (state.facets.partiesScope && state.facets.partiesScope !== "All parties") {
            c.push({
                key: "partiesScope",
                label: state.facets.partiesScope,
                remove: () => setState({ ...state, facets: { ...state.facets, partiesScope: "All parties" } }),
            });
        }

        // multi-selects
        addMulti("regions", "Region");
        addMulti("textTypes", "Type");
        addMulti("topics", "Topic");
        addMulti("sources", "Source");
        addMulti("documentTypes", "Doc");
        addMulti("leoThesaurus", "LEO");
        addMulti("contactTypes", "Contact");

        // year chip (only if changed)
        if (state.facets.yearMin !== DEFAULT_FACETS.yearMin || state.facets.yearMax !== DEFAULT_FACETS.yearMax) {
            c.push({
                key: "years",
                label: `${state.facets.yearMin}–${state.facets.yearMax}`,
                remove: () =>
                    setState({ ...state, facets: { ...state.facets, yearMin: DEFAULT_FACETS.yearMin, yearMax: DEFAULT_FACETS.yearMax } }),
            });
        }
        return c;
    }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

    const clearAll = () =>
        setState({
            ...state,
            category: "all",
            facets: { ...DEFAULT_FACETS },
        });

    // convenience writers
    const writeMulti = (k: keyof typeof state.facets, next: string[]) =>
        setState({ ...state, facets: { ...state.facets, [k]: next } });

    const toggleMulti = (k: keyof typeof state.facets, v: string) => {
        const s = toSet((state.facets[k] as string[]) || []);
        const next = Array.from(toggleInSet(s, v));
        writeMulti(k, next);
    };

    return (
        <aside className="shrink-0 w-[280px] xl:w-[320px]" style={{minWidth:"180px", maxWidth:"250px"}}>
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <h2 className="text-xl font-semibold text-slate-700">Filters</h2>
                <button
                    className="text-sm text-slate-600 hover:text-slate-800 underline"
                    onClick={clearAll}
                >
                    Clear all
                </button>
            </div>

            {/* Active Filters */}
            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 pb-2">
                <div className="text-md font-semibold text-slate-600 mb-2">Active Filters</div>
                {chips.length === 0 ? (
                    <div className="inline-flex items-center rounded-full border px-2 py-1 text-sm text-slate-600 bg-white">
                        Type: All
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {chips.map(chip => (
                            <span
                                key={chip.key}
                                className="inline-flex items-center gap-1 rounded-full bg-white border px-2 py-1 text-sm"
                            >
                {chip.label}
                                <button
                                    aria-label={`Remove ${chip.label}`}
                                    className="hover:text-red-600"
                                    onClick={chip.remove}
                                >
                  <X className="text-xs" />
                </button>
              </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Sections (accordion) */}
            <div className="mt-6 space-y-2 text-md">
                {/* Related Treaties (single-select) */}
                <FacetSection title="Related Treaties" defaultOpen>
                    {["All related treaties","Basel Convention","Stockholm Convention","Rotterdam Convention","Bamako Convention"].map(v => (
                        <RadioRow
                            key={v}
                            label={v}
                            checked={(state.facets.relatedTreaties ?? "All related treaties") === v}
                            onChange={() => setState({ ...state, facets: { ...state.facets, relatedTreaties: v } })}
                        />
                    ))}
                </FacetSection>

                {/* Parties (single-select) */}
                <FacetSection title="Parties">
                    {COUNTRIES.map(v => (
                        <RadioRow
                            key={v}
                            label={v}
                            checked={(state.facets.partiesScope ?? "All parties") === v}
                            onChange={() => setState({ ...state, facets: { ...state.facets, partiesScope: v } })}
                        />
                    ))}
                </FacetSection>

                {/* Regions */}
                <FacetSection title="Regions">
                    <div className="max-h-56 overflow-auto pr-1">
                        {REGIONS_LEFT.map(v => (
                            <CheckRow
                                key={v}
                                label={v}
                                checked={(state.facets.regions || []).includes(v)}
                                onChange={() => toggleMulti("regions", v)}
                            />
                        ))}
                    </div>
                </FacetSection>

                {/* Type of Text */}
                <FacetSection title="Type of Text">
                    <div className="max-h-56 overflow-auto pr-1">
                        {TEXT_TYPES.map(v => (
                            <CheckRow
                                key={v}
                                label={v}
                                checked={(state.facets.textTypes || []).includes(v)}
                                onChange={() => toggleMulti("textTypes", v)}
                            />
                        ))}
                    </div>
                </FacetSection>

                {/* Topics */}
                <FacetSection title="Topics">
                    <div className="max-h-56 overflow-auto pr-1">
                        {TOPICS.map(v => (
                            <CheckRow
                                key={v}
                                label={v}
                                checked={(state.facets.topics || []).includes(v)}
                                onChange={() => toggleMulti("topics", v)}
                            />
                        ))}
                    </div>
                </FacetSection>

                {/* Sources */}
                <FacetSection title="Sources">
                    {SOURCES.map(v => (
                        <CheckRow
                            key={v}
                            label={v}
                            checked={(state.facets.sources || []).includes(v)}
                            onChange={() => toggleMulti("sources", v)}
                        />
                    ))}
                </FacetSection>

                {/* Year / Period */}
                <FacetSection title="Year / Period" defaultOpen>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={min}
                            onChange={(e) => setMin(Number(e.target.value))}
                            className="h-9 w-24"
                        />
                        <span className="text-xs text-slate-500">to</span>
                        <Input
                            type="number"
                            value={max}
                            onChange={(e) => setMax(Number(e.target.value))}
                            className="h-9 w-24"
                        />
                        <Button
                            variant="outline"
                            className="ml-auto h-9"
                            onClick={() => {
                                setMin(DEFAULT_FACETS.yearMin);
                                setMax(DEFAULT_FACETS.yearMax);
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </FacetSection>

                {/* Document Type */}
                <FacetSection title="Document Type">
                    {DOC_TYPES.map(v => (
                        <CheckRow
                            key={v}
                            label={v}
                            checked={(state.facets.documentTypes || []).includes(v)}
                            onChange={() => toggleMulti("documentTypes", v)}
                        />
                    ))}
                </FacetSection>

                {/* LEO Thesaurus */}
                <FacetSection title="LEO Thesaurus">
                    {LEO.map(v => (
                        <CheckRow
                            key={v}
                            label={v}
                            checked={(state.facets.leoThesaurus || []).includes(v)}
                            onChange={() => toggleMulti("leoThesaurus", v)}
                        />
                    ))}
                </FacetSection>

                {/* Contact Type (NFP) */}
                <FacetSection title="Contact Type (NFP)">
                    <div className="max-h-56 overflow-auto pr-1">
                        {[
                            "CBD Primary NFP",
                            "Cartagena Protocol Primary NFP",
                            "Nagoya Protocol Primary NFP",
                            "BCH NFP",
                            "Protected Areas NFP",
                            "CHM NFP",
                            "SBSTTA NFP",
                            "GSPC NFP",
                            "GTI NFP",
                            "CBD Secondary NFP",
                            "Traditional Knowledge NFP",
                            "Resource Mobilization NFP",
                            "CHM Informal Advisory Committee Member",
                        ].map(v => (
                            <CheckRow
                                key={v}
                                label={v}
                                checked={(state.facets.contactTypes || []).includes(v)}
                                onChange={() => toggleMulti("contactTypes", v)}
                            />
                        ))}
                    </div>
                </FacetSection>
            </div>


        </aside>
    );
}

function useFiltered() {
    const { state } = useSearch();
    return useMemo(() => {
        const q = state.q.trim().toLowerCase();
        return MOCK.filter(r => {
            const categoryOk = state.category === 'all' || r.category === state.category;
            const textOk = !q || r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
            const yearOk = r.year >= state.facets.yearMin && r.year <= state.facets.yearMax;
            const topicsOk = state.facets.topics.length === 0 || state.facets.topics.some(t => r.topics.includes(t));
            const regionsOk = state.facets.regions.length === 0 || state.facets.regions.some(g => r.regions.includes(g));
            const docOk = state.facets.documentTypes.length === 0 || state.facets.documentTypes.some(d => r.documentTypes.includes(d));
            const leoOk = state.facets.leoThesaurus.length === 0 || state.facets.leoThesaurus.some(l => r.leoThesaurus.includes(l));
            return categoryOk && textOk && yearOk && topicsOk && regionsOk && docOk && leoOk;
        });
    }, [state]);
}
function Card({ r }: { r: ResultRow }) {
    // mock downloads per language (replace with real links if you have them)
    // e.g. [{lang:'en', href:'/foo_en.pdf'}, ...]
    const downloads: { lang: string; href: string }[] = [
        { lang: "en", href: `/${r.id}_en.pdf` },
        { lang: "fr", href: `/${r.id}_fr.pdf` },
        { lang: "es", href: `/${r.id}_es.pdf` },
    ];

    // image strip for topics (top-right)
    const topicImgs = r.topics.map((t) => {
        const img = TOPIC_IMAGES[t];
        if (!img) return null;
        const src = (img as any).src ?? img; // supports Next or Vite
        return (
            <span key={t} title={t} className="inline-flex items-center justify-center h-7 w-7 rounded-md border bg-white/80 backdrop-blur">
            <img
                key={t}
                src={src}
                alt={t}
                title={t}
                className="h-8 w-8 object-contain"
            />
            </span>
        );
    });

    return (
        <article className="group relative overflow-hidden rounded-xl border bg-white p-4 hover:shadow-md transition-shadow">
            {/* topic symbol strip (top-right) */}
            <div className="absolute right-3 top-3 hidden gap-2 text-slate-500 md:flex">
                {topicImgs}
            </div>

            <div className="flex gap-8">
                {/* thumb */}
                <div className="shrink-0 rounded-md border bg-slate-50 grid place-items-center p-4" style={{minWidth:"100px", maxHeight:"100px"}}>
                    <Globe2 className="h-8 w-8 text-slate-400" />
                </div>

                {/* content */}
                <div className="min-w-0 flex-1">
                    {/* title */}
                    <h3 className="text-xl font-semibold leading-snug text-sky-800 hover:underline pb-4" style={{fontSize:"19px"}}>
                        {r.title}
                    </h3>

                    {/* pills row — order matches screenshot */}
                    <div className="mt-3 flex flex-wrap gap-2 pb-3">
                        {/* 1) document type (grey) */}
                        {(r.documentTypes ?? []).slice(0, 1).map((d) => (
                            <Pill key={d} className="bg-slate-200 text-slate-800" >{d}</Pill>
                        ))}

                        {/* 2) topics (colored) */}
                        {r.topics.map((t) => (
                            <Pill
                                key={t}

                                className={"text-white"}
                            >
                                {t}
                            </Pill>
                        ))}

                        {/* 3) region (grey) — show first region like screenshot */}
                        {r.regions?.[0] && (
                            <Pill className="bg-slate-200 text-slate-800">
                                {r.regions[0]}
                            </Pill>
                        )}

                        <div className="flex items-center gap-2 text-slate-700">
                            <TagIcon className="h-4 w-4 text-slate-500" />
                            <span className="text-md">Doc Type</span>
                        </div>
                    </div>



                    {/* summary (glossary terms in screenshot, using your summary) */}
                    <p className="mt-2 text-[12px] leading-relaxed  text-gray-600 pb-4">
                        {r.summary}
                    </p>

                    {/* downloads — buttons per language, short label */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[12px] text-sky-700">Download:</span>
                        {downloads.map(({ lang, href }) => (
                            <a
                                key={lang}
                                href={href}
                                className="inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                            >
                                {LANG_SHORT[lang.toLowerCase()] ?? lang.toUpperCase()}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* subtle divider like screenshot */}
            <div className="mt-4 h-px bg-slate-200/70" />
        </article>
    );
}

function SimplePager({
                         page,
                         total,
                         pageSize = 10,
                         onPageChange,
                     }: {
    page: number;
    total: number;
    pageSize?: number;
    onPageChange: (p: number) => void;
}) {
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    if (total <= pageSize) return null;

    const go = (p: number) => onPageChange(Math.min(Math.max(1, p), pageCount));

    return (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-100">
            <button
                onClick={() => go(page - 1)}
                disabled={page === 1}
                className="text-sm px-4 py-1.5 rounded-full text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
                ‹ Prev
            </button>

            <span className="text-sm text-slate-600">
        Page {page} of {pageCount}
      </span>

            <button
                onClick={() => go(page + 1)}
                disabled={page === pageCount}
                className="text-sm px-4 py-1.5 rounded-full text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
                Next ›
            </button>
        </div>
    );
}






export default function ResultsPage() {
    const { state, setState } = useSearch();
    const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'relevance'>('relevance');

    const results = useFiltered();
    // Apply sorting
    const sortedResults = useMemo(() => {
        const arr = [...results];
        if (sortBy === 'recent') {
            arr.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'oldest') {
            arr.sort((a, b) => a.year - b.year);
        } else {
            // relevance: simple text match weight (mocked for now)
            arr.sort((a, b) => {
                const q = state.q.toLowerCase();
                const aMatch = a.title.toLowerCase().includes(q) ? 1 : 0;
                const bMatch = b.title.toLowerCase().includes(q) ? 1 : 0;
                return bMatch - aMatch;
            });
        }
        return arr;
    }, [results, sortBy, state.q]);

    // --- pagination ---
    const PAGE_SIZE = 10;
    const [page, setPage] = useState(1);

    // reset to first page whenever the dataset changes
    useEffect(() => {
        setPage(1);
    }, [sortedResults.length]);

    const pageCount = Math.max(1, Math.ceil(sortedResults.length / PAGE_SIZE));
    const safePage = Math.min(page, pageCount);
    const pagedResults = useMemo(
        () => sortedResults.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
        [sortedResults, safePage]
    );
    const from = (safePage - 1) * PAGE_SIZE + 1;
    const to = Math.min(safePage * PAGE_SIZE, sortedResults.length);

    const handlePageChange = (p: number) => {
        setPage(p);
        // optional: scroll the list back to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <div className=" mx-auto py-2 space-y-6" style={{paddingLeft:"100px", paddingRight:"100px"}}>
            {/*<CategoryBar />*/}
            <div className="max-w-7xl mx-auto py-4  gap-12 flex">
                <LeftFilters />


                <div className={"w-full"}>


                    <div className="flex items-center justify-between pb-6" >

                        <p className="text-md text-gray-600">
                            Showing {from}-{to} of {sortedResults.length}
                        </p>

                        <div className="flex  items-center gap-2 text-md">
                            <span className="text-gray-600">Sort by:</span>
                            {SORT_OPTIONS.map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSortBy(opt.id as any)}
                                    className={[
                                        "transition-colors underline-offset-4",
                                        sortBy === opt.id
                                            ? "text-blue-700 font-semibold underline"
                                            : "text-gray-600 hover:text-blue-700 hover:underline"
                                    ].join(" ")}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className="grid gap-3 mt-2">
                        {pagedResults.length === 0 ? (
                            <div className="text-slate-600 text-sm py-8 text-center border rounded-lg bg-white">
                                No results match your filters.
                            </div>
                        ) : (
                            pagedResults.map(r => <Card key={r.id} r={r} />)
                        )}
                    </div>

                    <SimplePager
                        page={safePage}
                        total={sortedResults.length}
                        pageSize={PAGE_SIZE}
                        onPageChange={(p) => {
                            setPage(p);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    />

                </div>
            </div>
        </div>
    );
}

