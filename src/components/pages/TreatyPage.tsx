import { useMemo, useState } from "react";
import {
    BookOpen,
    ExternalLink,
    FileDown,
    FileText,
    GraduationCap,
    Landmark,
    Leaf,
    Library,
    Link as LinkIcon,
    MapPin,
    ScrollText,
    Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

// ---------------- Mock treaty data (swap with live data later) ----------------
const treatyMock = {
    title: "Example Convention X",
    acronym: "EX",
    summary:
        "The Example Convention X (EX) aims to conserve biological diversity, promote the sustainable use of its components, and ensure fair and equitable sharing of benefits arising out of the utilization of genetic resources.",
    region: "Global",
    keywords: [
        "Access and benefit sharing",
        "Genetic resources",
        "Agrobiodiversity",
        "Sustainable development",
        "Jurisprudence",
    ],
    treatyTextUrl: "https://www.cbd.int/convention/text/default.shtml",
    websiteUrl: "https://www.cbd.int/",
    strategicPlanUrl: "https://www.cbd.int/decision/cop/?id=13164",
    eLearningUrl: "https://elearning.informea.org/",
    unCollectionUrl: "https://treaties.un.org/",
    videoUrl: "https://www.youtube.com/embed/hMcyDfJG2hw?start=4",
    enteredIntoForce: "1993-12-29",
    openForSignature: "1992-06-05",
    stats: {
        protocols: 3,
        amendments: null, // n/a
        decisions: 426,
        parties: 196,
        nationalReports: 939,
        nationalPlans: 345,
        documents: 1,
        contacts: 946,
    },
};

// ---------------- Component ----------------

export default function TreatyPage() {
    const t = treatyMock;
    const [active, setActive] = useState<string>("summary");

    // Sidebar items — clicking swaps right-hand content (no scroll)
    const items = useMemo(
        () => [
            { id: "summary", label: "Summary", count: null, icon: ScrollText },
            { id: "protocols", label: "Protocols", count: t.stats.protocols, icon: Library },
            { id: "amendments", label: "Amendments", count: t.stats.amendments ?? "n/a", icon: FileText },
            { id: "treaty-text", label: "Treaty Text", count: null, icon: FileDown },
            { id: "strategic-plan", label: "Strategic plan", count: null, icon: BookOpen },
            { id: "decisions", label: "Decisions", count: t.stats.decisions, icon: Landmark },
            { id: "parties", label: "Parties", count: t.stats.parties, icon: Users },
            { id: "national-reports", label: "National Reports", count: t.stats.nationalReports, icon: FileText },
            { id: "national-plans", label: "National Plans", count: t.stats.nationalPlans, icon: FileText },
            { id: "documents", label: "Documents and Files", count: t.stats.documents, icon: FileText },
            { id: "contacts", label: "Contacts HUB", count: t.stats.contacts, icon: MapPin },
            { id: "elearning", label: "e‑Learning course", count: null, icon: GraduationCap },
            { id: "un-collection", label: "UN treaty collection link", count: null, icon: LinkIcon },
        ],
        [t]
    );

    return (
        <div className=" mx-auto py-8 space-y-8" style={{paddingLeft:"100px", paddingRight:"100px"}}>
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-emerald-50 border flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-semibold tracking-tight truncate">{t.title}</h1>
                    <div className="text-muted-foreground mt-1 flex items-center gap-2">
                        <Badge variant="secondary">{t.acronym}</Badge>
                        <Separator orientation="vertical" className="h-4" />
                        <span className="text-sm flex items-center gap-1"><MapPin className="w-4 h-4"/> {t.region}</span>
                    </div>
                </div>
                <div className="hidden md:flex gap-2">
                    <Button asChild variant="secondary"><a href={t.websiteUrl} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-1"/>Website</a></Button>
                    <Button asChild><a href={t.treatyTextUrl} target="_blank" rel="noreferrer"><FileDown className="w-4 h-4 mr-1"/>Treaty text</a></Button>
                </div>
            </div>

            {/* Layout: sidebar + content */}
            <div className="flex gap-6 py-6">
                {/* Sidebar */}
                <aside className="md:sticky md:top-4 h-fit" style={{minWidth:"250px"}}>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Browse</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <nav className="divide-y">
                                {items.map(({ id, label, count, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setActive(id)}
                                        className={`w-full px-4 py-2 flex items-center justify-between text-left transition-colors hover:bg-muted/60 ${
                                            active === id ? "bg-muted/80" : ""
                                        }`}
                                        aria-current={active === id ? "page" : undefined}
                                    >
                                        <span className="flex items-center gap-2"><Icon className="w-4 h-4"/> {label}</span>
                                        {count !== null ? (
                                            <span className="text-xs rounded-full bg-muted px-2 py-0.5">{count}</span>
                                        ) : null}
                                    </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>

                </aside>

                {/* Content – swaps based on active */}
                <section className="min-w-0 w-full space-y-6">
                    {active === "summary" && <SummarySection t={t} />}
                    {active === "protocols" && <ProtocolsSection t={t} />}
                    {active === "amendments" && <AmendmentsSection t={t} />}
                    {active === "treaty-text" && <TreatyTextSection t={t} />}
                    {active === "strategic-plan" && <StrategicPlanSection t={t} />}
                    {active === "decisions" && <DecisionsSection t={t} />}
                    {active === "parties" && <PartiesSection t={t} />}
                    {active === "national-reports" && <ReportsSection t={t} />}
                    {active === "national-plans" && <PlansSection t={t} />}
                    {active === "documents" && <DocumentsSection t={t} />}
                    {active === "contacts" && <ContactsSection t={t} />}
                    {active === "elearning" && <ELearningSection t={t} />}
                    {active === "un-collection" && <UNCollectionSection t={t} />}
                </section>
            </div>
        </div>
    );
}

// ---------------- Sections ----------------

function SummarySection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><ScrollText className="w-4 h-4"/> Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed pb-4">{t.summary}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    <Fact label="Open for signature" value={t.openForSignature} />
                    <Fact label="Entered into force" value={t.enteredIntoForce} />
                    <Fact label="# of Parties" value={String(t.stats.parties)} />
                    <Fact label="Decisions indexed" value={String(t.stats.decisions)} />
                </div>
                <div className="flex flex-wrap gap-2 p-4">
                    {t.keywords.map((k) => (
                        <Badge key={k} variant="outline">{k}</Badge>
                    ))}
                </div>
                {/* Intro video */}
                <div className="rounded-xl overflow-hidden shadow-sm border" style={{ aspectRatio: "16/9" }}>
                    <iframe
                        className="w-full h-full"
                        src={t.videoUrl}
                        title="Intro video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </CardContent>
        </Card>
    );
}

function ProtocolsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Protocols</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {Array.from({ length: t.stats.protocols }).map((_, i) => (
                    <div key={i} className="rounded-md border p-3">Protocol #{i + 1} — placeholder</div>
                ))}
            </CardContent>
        </Card>
    );
}

function AmendmentsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Amendments</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">No amendments available (n/a).</CardContent>
        </Card>
    );
}

function TreatyTextSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><FileDown className="w-4 h-4"/> Treaty Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <p>Access the full text of the convention, annexes, and authentic languages.</p>
                <Button asChild size="sm"><a href={t.treatyTextUrl} target="_blank" rel="noreferrer">Open Treaty Text</a></Button>
            </CardContent>
        </Card>
    );
}

function StrategicPlanSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4"/> Strategic Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <p>High-level objectives and targets adopted by governing bodies.</p>
                <Button asChild size="sm" variant="secondary"><a href={t.strategicPlanUrl} target="_blank" rel="noreferrer">View Strategic Plan</a></Button>
            </CardContent>
        </Card>
    );
}

function DecisionsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Decisions</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-md border p-3">COP decision #{i + 1} — placeholder</div>
                ))}
                <div className="pt-1"><Badge variant="outline">Total: {t.stats.decisions}</Badge></div>
            </CardContent>
        </Card>
    );
}

function PartiesSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Parties</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>Number of Parties: <Badge className="ml-1" variant="secondary">{t.stats.parties}</Badge></p>
                <p className="text-muted-foreground">Browse Parties for national contacts, reports, and implementation context.</p>
                <Button size="sm" variant="secondary">Open Parties</Button>
            </CardContent>
        </Card>
    );
}

function ReportsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">National Reports</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-md border p-3">National Report — placeholder</div>
                ))}
                <div className="pt-1"><Badge variant="outline">Total: {t.stats.nationalReports}</Badge></div>
            </CardContent>
        </Card>
    );
}

function PlansSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">National Plans</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-md border p-3">National plan #{i + 1} — placeholder</div>
                ))}
                <div className="pt-1"><Badge variant="outline">Total: {t.stats.nationalPlans}</Badge></div>
            </CardContent>
        </Card>
    );
}

function DocumentsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Documents & Files</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="rounded-md border p-3">Document placeholder</div>
                <div className="pt-1"><Badge variant="outline">Total: {t.stats.documents}</Badge></div>
            </CardContent>
        </Card>
    );
}

function ContactsSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">Contacts HUB</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="rounded-md border p-3">Secretariat Contact — placeholder</div>
                <div className="pt-1"><Badge variant="outline">Total: {t.stats.contacts}</Badge></div>
            </CardContent>
        </Card>
    );
}

function ELearningSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">e‑Learning</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Free online courses related to this treaty.</p>
                <Button asChild size="sm"><a href={t.eLearningUrl} target="_blank" rel="noreferrer">Open</a></Button>
            </CardContent>
        </Card>
    );
}

function UNCollectionSection({ t }: { t: typeof treatyMock }) {
    return (
        <Card>
            <CardHeader><CardTitle className="text-base">UN Treaty Collection</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Official registration and depositary information.</p>
                <Button asChild size="sm" variant="secondary"><a href={t.unCollectionUrl} target="_blank" rel="noreferrer">Open</a></Button>
            </CardContent>
        </Card>
    );
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border p-3 bg-background">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-base font-medium">{value}</div>
        </div>
    );
}