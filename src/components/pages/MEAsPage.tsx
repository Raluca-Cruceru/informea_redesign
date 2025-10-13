import { useEffect, useMemo, useState } from "react";
import { MapPin, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Topic SVGs
import biodiversity from "../../assets/biodiversity.svg";
import chemicals from "../../assets/chemicals.svg";
import climate from "../../assets/climate.svg";
import governance from "../../assets/governance.svg";
import agriculture from "../../assets/agriculture.svg";
import oceans from "../../assets/oceans.svg";

/* ---------- Types ---------- */
type TopicId = "biodiversity" | "chemicals" | "climate" | "envgov" | "land" | "marine";
type RegionId = "all" | "africa" | "asia-pacific" | "europe" | "lac" | "global";

type MEA = {
    id: string;
    title: string;
    acronym?: string;
    adoptedYear?: number;
    partiesCount?: number;
    topics: TopicId[];
    regions: Exclude<RegionId, "all">[];
    parties?: string[];
};

/* ---------- Labels, icons, softer colors ---------- */
const TOPIC_LABEL: Record<TopicId, string> = {
    biodiversity: "Biological diversity",
    chemicals: "Chemicals and Waste",
    climate: "Climate and Atmosphere",
    envgov: "Environmental Governance",
    land: "Land and Agriculture",
    marine: "Marine and Freshwater",
};

const TOPIC_IMG: Record<TopicId, string> = {
    biodiversity,
    chemicals,
    climate,
    envgov: governance,
    land: agriculture,
    marine: oceans,
};

/** Softer, eye-friendly header tints */
const TOPIC_COLOR: Record<TopicId, string> = {
    biodiversity: "#10B981", // emerald-500
    chemicals:    "#F43F5E", // rose-500
    climate:      "#0EA5E9", // sky-500
    envgov:       "#0D9488", // teal-600
    land:         "#65A30D", // lime-600
    marine:       "#2563EB", // blue-600
};

/** Light topic tag colors */
const TOPIC_TAG: Record<TopicId, string> = {
    biodiversity: "bg-emerald-100 text-emerald-700",
    chemicals:    "bg-rose-100 text-rose-700",
    climate:      "bg-sky-100 text-sky-700",
    envgov:       "bg-teal-100 text-teal-700",
    land:         "bg-lime-100 text-lime-700",
    marine:       "bg-blue-100 text-blue-700",
};

const REGION_LABEL: Record<Exclude<RegionId,"all">, string> = {
    africa: "Africa",
    "asia-pacific": "Asia and the Pacific",
    europe: "Europe",
    lac: "Latin America and the Caribbean",
    global: "Global",
};

/* ---------- Sample data ---------- */
const MEAS: MEA[] = [
    { id: "basel", title: "Example Convention 1", acronym: "BC", adoptedYear: 1989, partiesCount: 190, topics: ["chemicals"], regions: ["global"] },
    { id: "stockholm", title: "Example Convention 2", acronym: "SC", adoptedYear: 2001, partiesCount: 186, topics: ["chemicals"], regions: ["global"] },
    { id: "rotterdam", title: "Example Convention 3", acronym: "RC", adoptedYear: 1998, partiesCount: 165, topics: ["chemicals"], regions: ["global"] },
    { id: "minamata", title: "Example Convention 4", acronym: "MC", adoptedYear: 2013, partiesCount: 148, topics: ["chemicals"], regions: ["global"] },

    { id: "barcelona", title: "Example Convention 5", acronym: "BC-Med", adoptedYear: 1976, partiesCount: 22, topics: ["marine","chemicals"], regions: ["europe","africa"], parties: ["Spain","France","Italy","Morocco","Algeria"] },


    { id: "unfccc", title: "Example Convention 6", acronym: "UNFCCC", adoptedYear: 1992, partiesCount: 197, topics: ["climate"], regions: ["global"], parties: ["France","UK","Germany","Kenya","Brazil"] },
    { id: "kyoto", title: "Example Convention 7", acronym: "KP", adoptedYear: 1997, partiesCount: 192, topics: ["climate"], regions: ["global"] },
    { id: "paris", title: "Example Convention 8", acronym: "PA", adoptedYear: 2015, partiesCount: 195, topics: ["climate"], regions: ["global"], parties: ["France","Germany","Kenya","Brazil","India"] },

    { id: "cbd", title: "Example Convention 9", acronym: "CBD", adoptedYear: 1992, partiesCount: 196, topics: ["biodiversity"], regions: ["global"], parties: ["Kenya","Brazil","India"] },
    { id: "cites", title: "Example Convention 10", adoptedYear: 1973, partiesCount: 184, topics: ["biodiversity"], regions: ["global"] },
    { id: "cms", title: "Example Convention 11", adoptedYear: 1979, partiesCount: 133, topics: ["biodiversity"], regions: ["global"] },

    { id: "ramsar", title: "Example Convention 12", adoptedYear: 1971, partiesCount: 172, topics: ["marine","biodiversity"], regions: ["global"] },
    { id: "uncos", title: "Example Convention 13", adoptedYear: 1982, partiesCount: 169, topics: ["marine"], regions: ["global"] },
    { id: "dumping", title: "Example Convention 14", adoptedYear: 1972, partiesCount: 87, topics: ["marine","chemicals"], regions: ["europe","africa","asia-pacific","lac"], parties: ["UK","France","Norway"] },
];

interface TreatiesProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export default function MEAsPage({ currentPage, setCurrentPage }: TreatiesProps) {
    // ultra-compact filters (no on-page search, no status)
    const [selectedTopic, setSelectedTopic] = useState<TopicId | "all">("all");
    const [selectedRegion, setSelectedRegion] = useState<RegionId>("all");
    const [selectedParty, setSelectedParty] = useState<string>("all");

    // build parties list
    const parties = useMemo(() => {
        const s = new Set<string>();
        MEAS.forEach(m => m.parties?.forEach(p => s.add(p)));
        return Array.from(s).sort((a,b) => a.localeCompare(b));
    }, []);

    // init from URL (optional)
    useEffect(() => {
        try {
            const qs = new URLSearchParams(window.location.search);
            const t = qs.get("topic") as TopicId | null;
            const r = (qs.get("region") as RegionId | null) ?? null;
            const p = qs.get("party");
            if (t) setSelectedTopic(t);
            if (r) setSelectedRegion(r);
            if (p) setSelectedParty(p);
        } catch {}
    }, []);

    // **Tint header** to topic color (softer palette)
    useEffect(() => {
        const root = document.documentElement;
        if (selectedTopic !== "all") {
            root.style.setProperty("--header-bg", TOPIC_COLOR[selectedTopic]);
        } else {
            root.style.removeProperty("--header-bg");
        }
        return () => root.style.removeProperty("--header-bg");
    }, [selectedTopic]);

    // filtering
    const filtered = useMemo(() => {
        let list = MEAS.slice();

        if (selectedTopic !== "all") list = list.filter(m => m.topics.includes(selectedTopic));
        if (selectedRegion !== "all") {
            list =
                selectedRegion === "global"
                    ? list.filter(m => m.regions.includes("global"))
                    : list.filter(m => m.regions.includes(selectedRegion) || m.regions.includes("global"));
        }
        if (selectedParty !== "all") list = list.filter(m => !m.parties || m.parties.includes(selectedParty));

        return list.sort((a,b) => a.title.localeCompare(b.title));
    }, [selectedTopic, selectedRegion, selectedParty]);

    // split into regional / global
    const globalList = filtered.filter(m => m.regions.includes("global"));
    const regionalList = filtered.filter(m => !m.regions.includes("global"));

    const clearAll = () => {
        setSelectedTopic("all");
        setSelectedRegion("all");
        setSelectedParty("all");
    };

    // Card renderer
    const TreatyCard = (m: MEA) => {
        const topic = m.topics[0];
        const img = topic ? TOPIC_IMG[topic] : undefined;
        return (
            <a
               href="/treatypage"
               onClick={(e) => {
                   e.preventDefault();           // stop full-page nav
                   setCurrentPage('treatypage'); // switch to the example page
                   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
               }}

               className="block">
            <Card className="h-full border-gray-200 hover:shadow-sm transition-shadow p-2">
                <CardContent className="px-4 py-4 h-full">
                    <div className="flex items-start gap-3">
                        {/* Picture */}
                        <div className=" rounded-full ring-4 ring-gray-100 bg-white grid place-items-center overflow-hidden shrink-0">
                            {img ? (
                                <img src={img} alt={topic ? TOPIC_LABEL[topic] : "Treaty"} className="w-10 h-10 object-contain" />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-[17px] md:text-lg font-semibold text-gray-900">{m.title}</h3>

                            {/* tags row (topics + regions) */}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {m.topics.map((t) => (
                                    <span
                                        key={t}
                                        className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded ${TOPIC_TAG[t]}`}
                                    >
                    {TOPIC_LABEL[t]}
                  </span>
                                ))}
                                {m.regions.map((r) => (
                                    <span
                                        key={r}
                                        className="inline-flex items-center text-[11px] px-2 py-0.5 rounded bg-gray-200 text-gray-800"
                                    >
                    {REGION_LABEL[r]}
                  </span>
                                ))}
                            </div>

                            {/* meta */}
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                                {m.acronym && <span className="font-medium text-gray-700">{m.acronym}</span>}
                                {m.adoptedYear && <span>Adopted: {m.adoptedYear}</span>}
                                {typeof m.partiesCount === "number" && (
                                    <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 opacity-60" />
                                        {m.partiesCount} Parties
                  </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </a>
        );
    };

    return (
        <div className="min-h-screen bg-[#f7f9fa]" style={{paddingLeft:"100px", paddingRight:"100px"}}>
            <h2 className={"text-2xl max-w-5xl font-bold text-gray-700 text-center p-6 "}>All Treaties and Multilateral Environmental Agreements (MEAs)</h2>
            <p className={"text-lg text-center"} style={{paddingLeft:"20px", paddingRight:"20px"}}>Discover what issue each environmental agreement seeks to address and how the conventions complement each other.
                Here you will find environmental agreements': Summary, Text and Amendments,
                Decisions and Resolutions, Ratification status.</p>
            <div className="max-w-[1200px] mx-auto px-6 py-6" >
                {/* One-line compact filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-2">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Topic */}
                        <Select value={selectedTopic} onValueChange={(v) => setSelectedTopic(v as TopicId | "all")}>
                            <SelectTrigger className="h-9 w-[170px] text-lg font-semibold">
                                <SelectValue placeholder="All topics" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Topics</SelectItem>
                                {(Object.keys(TOPIC_LABEL) as TopicId[]).map(id => (
                                    <SelectItem key={id} value={id}>{TOPIC_LABEL[id]}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Region */}
                        <Select value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as RegionId)}>
                            <SelectTrigger className="h-9 w-[170px]  text-lg font-semibold">
                                <SelectValue placeholder="All regions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Regions</SelectItem>
                                <SelectItem value="africa">Africa</SelectItem>
                                <SelectItem value="asia-pacific">Asia & the Pacific</SelectItem>
                                <SelectItem value="europe">Europe</SelectItem>
                                <SelectItem value="lac">Latin America & Caribbean</SelectItem>
                                <SelectItem value="global">Global Treaties</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Party */}
                        <Select value={selectedParty} onValueChange={setSelectedParty}>
                            <SelectTrigger className="h-9 w-[180px]  text-lg font-semibold">
                                <SelectValue placeholder="All Parties" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All parties</SelectItem>
                                {parties.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <div className="ml-auto">
                            {(selectedTopic !== "all" || selectedRegion !== "all" || selectedParty !== "all") && (
                                <button
                                    onClick={() => {
                                        setSelectedTopic("all");
                                        setSelectedRegion("all");
                                        setSelectedParty("all");
                                    }}
                                    className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tiny chips row */}
                    {(selectedTopic !== "all" || selectedRegion !== "all" || selectedParty !== "all") && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {selectedTopic !== "all" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs">
                  Topic: {TOPIC_LABEL[selectedTopic]}
                                    <button onClick={() => setSelectedTopic("all")} aria-label="Remove topic"><X className="w-3.5 h-3.5" /></button>
                </span>
                            )}
                            {selectedRegion !== "all" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs">
                  Region: {REGION_LABEL[selectedRegion as Exclude<RegionId,"all">]}
                                    <button onClick={() => setSelectedRegion("all")} aria-label="Remove region"><X className="w-3.5 h-3.5" /></button>
                </span>
                            )}
                            {selectedParty !== "all" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs">
                  Party: {selectedParty}
                                    <button onClick={() => setSelectedParty("all")} aria-label="Remove party"><X className="w-3.5 h-3.5" /></button>
                </span>
                            )}
                        </div>
                    )}
                </div>


                {/* Split results: Regional (left) & Global (right) */}
                {/* Two fixed columns: Regional (left) / Global (right) */}
                <div className="mt-6 grid grid-cols-2 gap-8 items-start" style={{paddingTop:"15px"}}>
                    {/* Global column */}
                    <section className="col-span-1 min-w-0">
                        <div className="mb-3">
                            <div className="flex items-center gap-3" style={{paddingTop:"10px"}}>
                                <h3 className="text-xl font-semibold uppercase tracking-wide text-gray-600">
                                    Global treaties
                                </h3>
                                <div className="flex-1 border-t border-gray-200" />
                            </div>
                            <p className="text-sm text-gray-500 mt-1 p-2">
                                {globalList.length} global treaties and protocols
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {globalList.map((m) => (
                                <li key={m.id} className="p-2">{TreatyCard(m)}</li>
                            ))}
                            {globalList.length === 0 && (
                                <li className="text-sm text-gray-500">No global treaties match your filters.</li>
                            )}
                        </ul>
                    </section>
                    {/* Regional column */}
                    <section className="col-span-1 min-w-0">
                        <div className="mb-3">
                            <div className="flex items-center gap-3" style={{paddingTop:"10px"}}>
                                <h3 className="text-xl font-semibold uppercase tracking-wide text-gray-600">
                                    Regional treaties
                                </h3>
                                <div className="flex-1 border-t border-gray-200" />
                            </div>
                            <p className="text-sm text-gray-500 mt-1 p-2">
                                {regionalList.length} regional treaties and protocols
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {regionalList.map((m) => (
                                <li key={m.id} className="p-2">{TreatyCard(m)}</li>
                            ))}
                            {regionalList.length === 0 && (
                                <li className="text-sm text-gray-500">No regional treaties match your filters.</li>
                            )}
                        </ul>
                    </section>


                </div>


                <div className="h-8" />
            </div>
        </div>
    );
}
