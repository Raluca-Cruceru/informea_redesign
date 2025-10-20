import { useMemo, useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearch, CategoryKey} from '@/search-state';

import { DEFAULT_FACETS } from '@/search-state'; // <-- add this import
import { ChevronDown, X } from 'lucide-react';

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
    { id: 'r1', title: 'Sneak Preview – Basel Course', summary: 'Introductory module on Basel Convention basics.', year: 2025, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Conventions'] },
    { id: 'r2', title: 'Relaunch: Basel/Stockholm/Rotterdam courses', summary: 'Cross-convention e-learning relaunch.', year: 2024, category: 'news', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Communication'], leoThesaurus: ['Conventions'] },
    { id: 'r3', title: 'Strategic framework for Basel (2025–2031)', summary: 'Medium-term strategy framework.', year: 2025, category: 'decision-texts', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['COPs'] },
    { id: 'r4', title: 'Relations between Basel & Bamako Secretariats', summary: 'Cooperation mechanisms.', year: 2023, category: 'decision-texts', topics: ['Chemicals and Waste'], regions: ['Africa','Global'], documentTypes: ['Decision'], leoThesaurus: ['Conventions'] },
    { id: 'r5', title: 'Decision V/24: Transboundary Hazardous Wastes', summary: 'Controls on movement & disposal.', year: 1999, category: 'decision-texts', topics: ['Chemicals and Waste','Climate and Atmosphere'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Legislation'] },
    { id: 'r6', title: 'Basel Convention Partnership Programme', summary: 'International cooperation incl. e-waste.', year: 2020, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Partnership Programme'] },
    { id: 'r7', title: 'Logo of the Basel Convention', summary: 'Brand asset and usage guidance.', year: 2018, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Other'], leoThesaurus: ['Soft law'] },
    { id: 'r8', title: 'Court decision: ACME vs. Environmental Agency', summary: 'Illegal hazardous waste export.', year: 2016, category: 'court-decisions', topics: ['Environmental Governance','Chemicals and Waste'], regions: ['Europe'], documentTypes: ['Court decision'], leoThesaurus: ['Cases'] },
    { id: 'r9', title: 'National Report – Basel (Kenya)', summary: 'Latest implementation report.', year: 2022, category: 'national-reports', topics: ['Chemicals and Waste'], regions: ['Africa'], documentTypes: ['National report'], leoThesaurus: ['National reports'] },
    { id: 'r10', title: 'Climate co-benefits of waste reduction', summary: 'Peer-reviewed literature review.', year: 2021, category: 'literature', topics: ['Climate and Atmosphere','Chemicals and Waste'], regions: ['Global'], documentTypes: ['Literature'], leoThesaurus: ['Documents and Literature'] },
    { id: 'r11', title: 'Sneak Preview – Basel Course', summary: 'Introductory module on Basel Convention basics.', year: 2025, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Conventions'] },
    { id: 'r12', title: 'Relaunch: Basel/Stockholm/Rotterdam courses', summary: 'Cross-convention e-learning relaunch.', year: 2024, category: 'news', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Communication'], leoThesaurus: ['Conventions'] },
    { id: 'r13', title: 'Strategic framework for Basel (2025–2031)', summary: 'Medium-term strategy framework.', year: 2025, category: 'decision-texts', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['COPs'] },
    { id: 'r14', title: 'Relations between Basel & Bamako Secretariats', summary: 'Cooperation mechanisms.', year: 2023, category: 'decision-texts', topics: ['Chemicals and Waste'], regions: ['Africa','Global'], documentTypes: ['Decision'], leoThesaurus: ['Conventions'] },
    { id: 'r15', title: 'Decision V/24: Transboundary Hazardous Wastes', summary: 'Controls on movement & disposal.', year: 1999, category: 'decision-texts', topics: ['Chemicals and Waste','Climate and Atmosphere'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Legislation'] },
    { id: 'r16', title: 'Basel Convention Partnership Programme', summary: 'International cooperation incl. e-waste.', year: 2020, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Decision'], leoThesaurus: ['Partnership Programme'] },
    { id: 'r17', title: 'Logo of the Basel Convention', summary: 'Brand asset and usage guidance.', year: 2018, category: 'documents', topics: ['Chemicals and Waste'], regions: ['Global'], documentTypes: ['Other'], leoThesaurus: ['Soft law'] },
    { id: 'r18', title: 'Court decision: ACME vs. Environmental Agency', summary: 'Illegal hazardous waste export.', year: 2016, category: 'court-decisions', topics: ['Environmental Governance','Chemicals and Waste'], regions: ['Europe'], documentTypes: ['Court decision'], leoThesaurus: ['Cases'] },
    { id: 'r19', title: 'National Report – Basel (Kenya)', summary: 'Latest implementation report.', year: 2022, category: 'national-reports', topics: ['Chemicals and Waste'], regions: ['Africa'], documentTypes: ['National report'], leoThesaurus: ['National reports'] },
    { id: 'r20', title: 'Climate co-benefits of waste reduction', summary: 'Peer-reviewed literature review.', year: 2021, category: 'literature', topics: ['Climate and Atmosphere','Chemicals and Waste'], regions: ['Global'], documentTypes: ['Literature'], leoThesaurus: ['Documents and Literature'] },
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
    'Biological diversity',
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
                <span className="text-sm font-semibold text-slate-800">{title}</span>
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
            <span className="text-sm">{label}</span>
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
        <aside className="shrink-0 w-[280px] xl:w-[320px]" style={{minWidth:"100px", maxWidth:"200px"}}>
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
                <div className="text-sm font-semibold text-slate-600 mb-2">Active Filters</div>
                {chips.length === 0 ? (
                    <div className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-slate-600 bg-white">
                        Type: All
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {chips.map(chip => (
                            <span
                                key={chip.key}
                                className="inline-flex items-center gap-1 rounded-full bg-white border px-2 py-1 text-xs"
                            >
                {chip.label}
                                <button
                                    aria-label={`Remove ${chip.label}`}
                                    className="hover:text-red-600"
                                    onClick={chip.remove}
                                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Sections (accordion) */}
            <div className="mt-6 space-y-2">
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
    return (
        <div className="rounded-xl border bg-white p-4 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold p-2">{r.title}</h3>
            <p className="text-md text-gray-600 mt-1 p-2">{r.summary}</p>
            <div className="flex flex-wrap gap-2 mt-3 p-2">
                <span className="text-sm px-2 py-1 rounded bg-slate-100 border">{r.year}</span>
                <span className="text-sm px-2 py-1 rounded bg-slate-100 border">{r.category}</span>

                {r.topics.map(t => <span key={t} className="text-sm px-2 py-1 rounded bg-emerald-50 border">{t}</span>)}
                <span className="text-sm px-2 py-1 rounded bg-slate-100 border">{r.regions}</span>
            </div>
        </div>
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

