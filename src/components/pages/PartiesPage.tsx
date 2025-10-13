import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// --- Helpers ---
const slugify = (name: string) =>
    name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const WORLD_TOPO_JSON = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Type for a Party/country row
type Party = {
    country: string;
    region: string; // UN-style region label
    agreements?: number;
    reports?: number;
    lastUpdate?: string;
};

interface PartiesProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export default function PartiesPage({ currentPage, setCurrentPage }: PartiesProps) {
    const [query, setQuery] = useState("");
    const [regionFilter, setRegionFilter] = useState("all-regions");
    const [agreementFilter, setAgreementFilter] = useState("all-agreements");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [parties, setParties] = useState<Party[]>([]);

    // --- Load countries/parties ---
    useEffect(() => {
        let cancelled = false;

        async function loadParties() {
            setIsLoading(true);
            setError(null);
            try {
                // Option A (preferred): serve a JSON you export from InforMEA at /data/informea-parties.json
                // Each item: { country, region, agreements?, reports?, lastUpdate? }
                const res = await fetch("/data/informea-parties.json", { cache: "reload" });
                if (!res.ok) throw new Error("Missing /data/informea-parties.json");
                const data = (await res.json()) as Party[];
                if (!cancelled) setParties(data);
            } catch (e) {
                // Option B (fallback): seed with a minimal list so UI works
                if (!cancelled) {
                    setParties([
                        { country: "Brazil", region: "Latin America and the Caribbean", agreements: 45, reports: 128, lastUpdate: "2024-01-15" },
                        { country: "Germany", region: "Europe", agreements: 52, reports: 156, lastUpdate: "2024-01-10" },
                        { country: "Kenya", region: "Africa", agreements: 38, reports: 94, lastUpdate: "2024-01-08" },
                        { country: "Japan", region: "Asia and the Pacific", agreements: 48, reports: 142, lastUpdate: "2024-01-12" },
                        { country: "Canada", region: "North America", agreements: 44, reports: 134, lastUpdate: "2024-01-05" },
                        { country: "Australia", region: "Asia and the Pacific", agreements: 41, reports: 118, lastUpdate: "2024-01-07" },
                    ]);
                    setError("Using fallback sample data.");
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        loadParties();
        return () => {
            cancelled = true;
        };
    }, []);

    // --- Derived list ---
    const filtered = useMemo(() => {
        return parties
            .filter((p) => (regionFilter === "all-regions" ? true : matchRegion(p.region, regionFilter)))
            .filter((p) => (query ? p.country.toLowerCase().includes(query.toLowerCase()) : true))
            // Agreement filter is a placeholder until you wire actual membership flags
            .filter(() => agreementFilter === "all-agreements");
    }, [parties, regionFilter, query, agreementFilter]);

    function matchRegion(regionLabel: string, filter: string) {
        const map: Record<string, string> = {
            "africa": "africa",
            "asia-pacific": "asia and the pacific",
            "europe": "europe",
            "latin-america": "latin america",
            "north-america": "north america",
            "west-asia": "west asia",
        };
        const key = map[filter];
        return regionLabel.toLowerCase().includes(key);
    }

    // When a map country is clicked, select and filter to it
    const onCountryClick = (name: string) => {
        setSelectedCountry(name);
        setQuery(name);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl mb-4 text-center">Parties</h1>
                <p className="text-center text-muted-foreground text-sm mb-6">
                    Select the Party you would like to learn more about, including which Multilateral Environmental Agreements (MEAs) it has ratified and who has been designated as focal point for each MEA. You can also consult action plans and reports submitted by parties under different MEAs and find the protected Ramsar and World Heritage sites within each party's territory.
                </p>

                {/* Interactive Map */}
                <div className="rounded-xl border bg-white p-2 mb-2">
                    <div className="flex items-center justify-between ">
                        <div className="text-sm text-muted-foreground">Interactive map — click a country to filter the list</div>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedCountry(null); setQuery(""); }}>Reset</Button>
                    </div>
                    <div className="w-full overflow-hidden rounded-lg">
                        <ComposableMap projectionConfig={{ scale: 140 }} width={900} height={380}>
                            <Geographies geography={WORLD_TOPO_JSON}>
                                {({ geographies }) => (
                                    <>
                                        {geographies.map((geo) => {
                                            const name = (geo.properties as any).name as string;
                                            const isSelected = selectedCountry === name;
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onClick={() => onCountryClick(name)}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { outline: "none", filter: "brightness(0.9)" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                    className={
                                                        "cursor-pointer transition-colors fill-muted-foreground/20 hover:fill-muted-foreground/30 " +
                                                        (isSelected ? "!fill-cyan-400" : "")
                                                    }
                                                />
                                            );
                                        })}
                                    </>
                                )}
                            </Geographies>
                        </ComposableMap>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white p-6 rounded-lg border mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input placeholder="Search countries..." className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} />
                        </div>

                        <Select value={regionFilter} onValueChange={setRegionFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-regions">All Regions</SelectItem>
                                <SelectItem value="africa">Africa</SelectItem>
                                <SelectItem value="asia-pacific">Asia and the Pacific</SelectItem>
                                <SelectItem value="europe">Europe</SelectItem>
                                <SelectItem value="latin-america">Latin America and the Caribbean</SelectItem>
                                <SelectItem value="north-america">North America</SelectItem>
                                <SelectItem value="west-asia">West Asia</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={agreementFilter} onValueChange={setAgreementFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Agreement" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-agreements">All Agreements</SelectItem>
                                <SelectItem value="cbd">Convention on Biological Diversity</SelectItem>
                                <SelectItem value="unfccc">UNFCCC</SelectItem>
                                <SelectItem value="basel">Basel Convention</SelectItem>
                                <SelectItem value="cites">CITES</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {error && <p className="text-xs text-amber-600 mt-2">{error}</p>}
                </div>

                {/* Parties List */}
                {isLoading ? (
                    <div className="grid gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-40" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filtered.map((party, index) => (
                            <a
                                key={index}
                                href="/exampleparty"
                                onClick={(e) => {
                                    e.preventDefault();           // stop full-page nav
                                    setCurrentPage('exampleparty'); // switch to the example page
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }}

                                className="block"
                            >
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg mb-2 flex items-center">
                                                    <MapPin className="w-5 h-5 mr-2 text-cyan-600" />
                                                    {party.country}
                                                </CardTitle>
                                                <p className="text-gray-600">{party.region}</p>
                                            </div>
                                            <Badge variant="outline">{party.region}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-4 gap-4">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-2">
                                                    <Users className="w-5 h-5 text-blue-600 mr-1" />
                                                    <span className="text-2xl text-blue-600">{party.agreements ?? "–"}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">MEA Memberships</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-2">
                                                    <FileText className="w-5 h-5 text-green-600 mr-1" />
                                                    <span className="text-2xl text-green-600">{party.reports ?? "–"}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">National Reports</p>
                                            </div>
                                            {/*<div className="text-center">*/}
                                            {/*    <div className="text-lg mb-2 text-gray-700">Active</div>*/}
                                            {/*    <p className="text-sm text-gray-600">Status</p>*/}
                                            {/*</div>*/}
                                            <div className="text-center">
                                                <div className="text-sm mb-2 text-gray-700">{party.lastUpdate ?? "—"}</div>
                                                <p className="text-sm text-gray-600">Last Update</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                )}

                {/* Regional Overview (static example) */}
                <div className="mt-12">
                    <h2 className="text-2xl mb-6">Regional Overview</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Africa</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl mb-2 text-green-600">54</div>
                                <p className="text-gray-600">Countries participating in MEAs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Europe</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl mb-2 text-blue-600">47</div>
                                <p className="text-gray-600">Countries participating in MEAs</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Asia and the Pacific</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl mb-2 text-purple-600">56</div>
                                <p className="text-gray-600">Countries participating in MEAs</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}