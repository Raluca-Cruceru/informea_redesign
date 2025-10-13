import { useMemo, useState } from "react";
import {
    ArrowLeft,
    MapPin,
    Globe2,
    Users,
    FileText,
    Calendar,
    Building2,
    BookOpen, Search,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
// @ts-ignore
import unflag from "../../assets/unflag.jpeg";
import {Input} from "../ui/input";

// ---------- Mock data (replace with live later) ----------
const mockCountry = {
    name: "Exampleland",
    iso2: "ex",
    region: "Europe",
    subregion: "Western Europe",
    capital: "Sample City",
    lat: 46.2, // mock coordinates
    lon: 6.1,
    population: 12345678,
    lastUpdate: "2025-06-01",
    website: "https://www.informea.org/en/country/exampleland",
};

const mockAgreements = [
    { code: "CBD", name: "Convention on Biological Diversity", status: "Party", joined: "1995-07-12" },
    { code: "UNFCCC", name: "United Nations Framework Convention on Climate Change", status: "Party", joined: "1994-05-20" },
    { code: "Basel", name: "Basel Convention", status: "Party", joined: "1996-03-10" },
    { code: "CITES", name: "Convention on International Trade in Endangered Species", status: "Party", joined: "1997-11-08" },
];

const mockReports = [
    { title: "CBD National Report (6th)", date: "2018-12-05", url: "#" },
    { title: "UNFCCC National Communication (4th)", date: "2017-06-14", url: "#" },
    { title: "Basel Implementation Report (2021)", date: "2021-10-03", url: "#" },
];

const mockLegislation = [
    { title: "Environmental Protection Act No. 123", year: 2019 },
    { title: "Biodiversity Conservation Decree", year: 2021 },
];

const mockCourt = [
    { title: "Supreme Court ruling on waste imports", year: 2020 },
];

const mockDocs = [
    { title: "NDC update (draft)", year: 2024 },
    { title: "Protected areas strategy", year: 2022 },
];

const mockContacts = [
    { role: "CBD National Focal Point", name: "Dr. Ada Lovelace", org: "Ministry of Environment", email: "ada@example.gov" },
    { role: "CITES Management Authority", name: "Grace Hopper", org: "Wildlife Authority", email: "grace@example.gov" },
];

// Left sidebar menu — mirrors the second screenshot
const SIDE_ITEMS = [
    { key: "map", label: "Map & Sites list", count: 32, icon: MapPin },
    { key: "status", label: "Party Status", count: 48, icon: Users },
    { key: "actions", label: "Action Plans", count: 10, icon: FileText },
    { key: "reports", label: "National Reports", count: 117, icon: FileText },
    { key: "laws", label: "National Legislation", count: 2560, icon: BookOpen },
    { key: "court", label: "Court Decisions", count: 12, icon: FileText },
    { key: "docs", label: "Documents and Files", count: 37, icon: FileText },
    { key: "contacts", label: "Contacts HUB", count: 36, icon: Building2 },
    { key: "summary", label: "Summary", count: 0, icon: FileText },
] as const;

// TopoJSON (world) for the simple country map mock
const WORLD_TOPO_JSON =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json#countries-110m";

// ---------- Component ----------

type PartyExampleProps = {
    party?: typeof mockCountry;
    onBack?: () => void;
};

export default function PartyExamplePage({ party, onBack }: PartyExampleProps) {
    const country = party ?? mockCountry;
    const [active, setActive] = useState<(typeof SIDE_ITEMS)[number]["key"]>("map");

    const flagUrl = useMemo(
        () => `https://flagcdn.com/256x192/${country.iso2.toLowerCase()}.png`,
        [country.iso2]
    );

    return (
        <div className=" mx-auto py-8 space-y-8" style={{paddingLeft:"100px", paddingRight:"100px"}}>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4">
                <Button variant="ghost" size="sm" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Parties
                </Button>
                <Separator orientation="vertical" className="h-5" />
                <span className="text-sm text-muted-foreground">Country profile</span>
            </div>

            {/* Hero — airy and simple */}
            <div className="flex gap-6  items-center bg-muted/30  rounded-2xl border p-6">
                <img src={unflag} alt={`${country.name} flag`} className=" rounded-md border bg-white"  style={{width:"160px"}}/>
                <div className="space-y-2 items-start" style={{paddingLeft:"0px"}} >
                    <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-3">
                        {country.name}
                        <Badge variant="secondary">{country.region}</Badge>
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {country.capital} · {country.subregion}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <Badge variant="outline"><Users className="w-5 h-5 text-blue-600 mr-1" />MEA Memberships: XX </Badge>
                        <Badge variant="outline"><FileText className="w-5 h-5 text-blue-600 mr-1" />National Reports: XX </Badge>
                        <Badge variant="outline"><Calendar className="w-3 h-3 mr-1"/> Updated: {country.lastUpdate}</Badge>
                        {/*<Button asChild size="sm" className="ml-auto">*/}
                        {/*    <a href={country.website} target="_blank" rel="noreferrer">View on InforMEA</a>*/}
                        {/*</Button>*/}
                    </div>

                </div>
                <div className="flex-1 relative bg-gray-100 p-2 border-r border-gray-200 rounded-md ml-auto mr-2" style={{maxWidth:"220px",marginRight:"50px"}} >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search Party Information..."
                        className="pl-8 h-8 bg-white/90 border-0 text-gray-900 placeholder:text-gray-500"
                    />
                </div>


            </div>

            {/* Main two-column layout: sidebar filters + content */}
            <div className="flex gap-6 py-6">
                {/* Sidebar */}
                <div className="w-64 h-fit sticky top-4" style={{maxWidth:"250px"}}>
                    <Card  >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Browse</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <nav className="divide-y">
                                {SIDE_ITEMS.map(({ key, label, count, icon: Icon }) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setActive(key)}
                                        className={`w-full px-4 py-3 flex items-center justify-between text-left hover:bg-muted/60 transition-colors ${
                                            active === key ? "bg-muted/80" : ""
                                        }`}
                                        aria-current={active === key ? "page" : undefined}
                                    >
                      <span className="flex items-center gap-2 ">
                        <Icon className="w-4 h-4" /> {label}
                      </span>
                                        {count ? (
                                            <span className="text-xs rounded-full bg-muted px-2 py-0.5">{count}</span>
                                        ) : null}
                                    </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Content area */}
                <div className="flex-1 w-full"  >
                    {active === "map" && <MapAndSites country={country} />}
                    {active === "status" && <PartyStatus />}
                    {active === "actions" && <ActionPlans />}
                    {active === "reports" && <Reports />}
                    {active === "laws" && <Legislation />}
                    {active === "court" && <CourtDecisions />}
                    {active === "docs" && <Documents />}
                    {active === "contacts" && <Contacts />}
                    {active === "summary" && <Summary />}
                </div>
            </div>
        </div>
    );
}

// ---------- Content sections ----------

function MapAndSites({ country }: { country: typeof mockCountry }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><MapPin className="w-4 h-4"/> Map & Sites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {/* Mock country map */}
                <div className="rounded-xl border overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <ComposableMap projectionConfig={{ scale: 145 }} width={980} height={420}>
                        <ZoomableGroup center={[country.lon, country.lat]} zoom={2.5}>
                            <Geographies geography={WORLD_TOPO_JSON}>
                                {({ geographies }) => (
                                    <>
                                        {geographies.map((geo) => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                style={{
                                                    default: { fill: "#e5e7eb", stroke: "#94a3b8", strokeWidth: 0.4, outline: "none" },
                                                    hover: { fill: "#d1d5db", outline: "none" },
                                                    pressed: { fill: "#a3a3a3", outline: "none" },
                                                }}
                                            />
                                        ))}
                                    </>
                                )}
                            </Geographies>
                            {/* Country capital marker (mock) */}
                            <Marker coordinates={[country.lon, country.lat]}>
                                <circle r={5} fill="#0ea5e9" stroke="#0369a1" strokeWidth={1.5} />
                            </Marker>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>

                {/* Sites tabs (like Wetlands / WHC) */}
                <Tabs defaultValue="wetlands" className="w-full">
                    <TabsList className="mb-3">
                        <TabsTrigger value="wetlands">Wetlands of International Importance <Badge className="ml-2" variant="secondary">24</Badge></TabsTrigger>
                        <TabsTrigger value="whc">WHC sites <Badge className="ml-2" variant="secondary">8</Badge></TabsTrigger>
                    </TabsList>
                    <TabsContent value="wetlands">
                        <ul className="space-y-2 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <li key={i} className="rounded-md border p-3">Wetland site #{i + 1} — placeholder</li>
                            ))}
                        </ul>
                    </TabsContent>
                    <TabsContent value="whc">
                        <ul className="space-y-2 text-sm">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <li key={i} className="rounded-md border p-3">World Heritage site #{i + 1} — placeholder</li>
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function PartyStatus() {
    const items = [
        { label: "Treaties signed", value: 48 },
        { label: "Reservations/Declarations", value: 3 },
        { label: "Protocols ratified", value: 12 },
    ];
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Party Status</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
                {items.map((it) => (
                    <div key={it.label} className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">{it.label}</div>
                        <div className="text-2xl font-semibold mt-1">{it.value}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function ActionPlans() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Action Plans</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-md border p-3">Action Plan #{i + 1} — placeholder</div>
                ))}
            </CardContent>
        </Card>
    );
}

function Reports() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">National Reports</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                {mockReports.map((r, i) => (
                    <div key={i} className="rounded-lg border p-3 flex items-center justify-between">
                        <div>
                            <div className="font-medium">{r.title}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                        </div>
                        <Button asChild size="sm"><a href={r.url}>Open</a></Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Legislation() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">National Legislation</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {mockLegislation.map((l, i) => (
                    <div key={i} className="rounded-md border p-3 flex items-center justify-between">
                        <span>{l.title}</span>
                        <Badge variant="outline">{l.year}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function CourtDecisions() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Court Decisions</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {mockCourt.map((c, i) => (
                    <div key={i} className="rounded-md border p-3 flex items-center justify-between">
                        <span>{c.title}</span>
                        <Badge variant="outline">{c.year}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Documents() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Documents & Files</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {mockDocs.map((d, i) => (
                    <div key={i} className="rounded-md border p-3 flex items-center justify-between">
                        <span>{d.title}</span>
                        <Badge variant="outline">{d.year}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Contacts() {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Contacts HUB</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                {mockContacts.map((c, i) => (
                    <div key={i} className="rounded-lg border p-3">
                        <div className="font-medium">{c.role}</div>
                        <div className="text-sm">{c.name} · {c.org}</div>
                        {c.email && (
                            <a className="text-sm underline" href={`mailto:${c.email}`}>{c.email}</a>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

function Summary() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><FileText className="w-4 h-4"/> Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                    This page mirrors typical InforMEA country content...
                </p>
                <p>Mock data will be replaced with real data once when the redesign will be implemented.</p>
            </CardContent>
        </Card>
    );
}
