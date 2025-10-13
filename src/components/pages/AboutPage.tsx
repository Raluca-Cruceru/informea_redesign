import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle, Globe2, GraduationCap, Library, Network, Users, PenTool,Settings2, Book } from "lucide-react";
// @ts-ignore
import infmphoto from "../../assets/InfmPhoto.jpeg";

export default function AboutPage() {
    return (
        <div className="mx-auto  space-y-10"  style={{ paddingLeft: "100px", paddingRight: "100px" }}>
            {/* Hero */}
            <section className="text-center space-y-4 items-center" >

                {/*<img src={infmphoto} style={{ margin:"auto"}}/>*/}
                <h1 className="text-3xl  tracking-tight  py-8">What is InforMEA?</h1>

                <p className="ext-center text-gray-600 max-w-4xl mx-auto " >
                    InforMEA is the United Nations Information Portal on Multilateral Environmental Agreements (MEAs).
                    It offers one place to explore treaties, decisions, national implementation information, learning resources,
                    and more—drawn from MEA secretariats and trusted partners.
                </p>
                {/*<div className="md:grid-cols-2  items-center text-center gap-6 py-6">*/}
                {/*    <Badge variant="secondary" className="text-lg ">UN Environment Programme (UNEP) – facilitator</Badge>*/}
                {/*    <Badge variant="secondary" className="text-lg ">MEA Information & Knowledge Management (IKM) Initiative</Badge>*/}
                {/*</div>*/}
            </section>

            {/* Visual */}
            <div className="grid md:grid-cols-2 gap-8 items-center py-4" >
                <div className="order-2 md:order-1 space-y-6">
                    <Card style={{marginBottom:"10px"}}>
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Globe2 className="w-5 h-5"/> What InforMEA Offers</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-medium text-lg">Semantic Search</h4>
                                <p className="text-sm text-muted-foreground">Keyword & concept-based navigation across treaty texts, COP decisions, goals & targets, and more.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-lg">Treaty & Decision Library</h4>
                                <p className="text-sm text-muted-foreground">Browse treaties and thousands of decisions/resolutions adopted by MEA governing bodies.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-lg">Party Profiles</h4>
                                <p className="text-sm text-muted-foreground">Country pages with membership, national focal points & experts, reports and action plans.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-lg">Learning</h4>
                                <p className="text-sm text-muted-foreground">50+ free online courses used by learners worldwide.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Network className="w-5 h-5"/> How It Works</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 mt-0.5"/>
                                <p className="text-sm text-muted-foreground">
                                    Information is <span className="font-medium">harvested from MEA secretariats</span> using a jointly developed approach (APIs and feeds). Secretariats remain custodians of their data.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 mt-0.5"/>
                                <p className="text-sm text-muted-foreground">
                                    The portal aggregates <span className="font-medium">treaty texts, COP decisions, news & events, membership, national focal points</span>, and other official materials.
                                </p>
                                <Button asChild size="sm" >
                                    <a href="https://www.informea.org/en/about" target="_blank" rel="noreferrer">
                                        Find out more
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Embedded YouTube Video */}
                <div className={"items-center"} >
                    <div className="relative rounded-2xl shadow-lg overflow-hidden" style={{ aspectRatio: "16/9", maxHeight:"310px"}} >
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/hMcyDfJG2hw?start=4"
                            title="InforMEA Introduction Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className={"font-bold text-xl pt-4 pb-4"}>InforMEA Explainers</p>
                <div className={"grid md:grid-cols-3 gap-2"}>
                    <div style={{maxWidth:"150px"}} >

                        <div className="relative w-full rounded-2xl shadow-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/hMcyDfJG2hw?start=4"
                                title="InforMEA Introduction Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                    </div>
                    <div style={{maxWidth:"150px"}} >

                        <div className="relative w-full rounded-2xl shadow-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/hMcyDfJG2hw?start=4"
                                title="InforMEA Introduction Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                    </div>
                    <div style={{maxWidth:"150px"}} >

                        <div className="relative w-full rounded-2xl shadow-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/hMcyDfJG2hw?start=4"
                                title="InforMEA Introduction Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                    </div>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-6 pb-6">
                <Card className="h-full">
                    <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Library className="w-5 h-5"/> Resources for developers</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>...</p>
                        <Button asChild size="sm" className="mt-1">
                            <a href="https://elearning.informea.org/" target="_blank" rel="noreferrer">Explore</a>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="h-full">
                    <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5"/> Process and Governance</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>..</p>
                        <Button asChild size="sm" className="mt-1">
                            <a href="https://elearning.informea.org/" target="_blank" rel="noreferrer">Explore</a>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="h-full">
                    <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Book className="w-5 h-5" /> Brand Guidelines</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-3">
                        <p>...</p>
                        <Button asChild size="sm" className="mt-1">
                            <a href="https://elearning.informea.org/" target="_blank" rel="noreferrer">Explore</a>
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Stats & Credibility */}
            <section className="rounded-2xl border bg-muted/30 pt-4">
                <div className="grid sm:grid-cols-3 gap-6 text-center pb-4">
                    <div>
                        <div className="text-3xl font-semibold">Hundreds</div>
                        <div className="text-sm text-muted-foreground">of MEAs covered</div>
                    </div>
                    <div>
                        <div className="text-3xl font-semibold">Thousands</div>
                        <div className="text-sm text-muted-foreground">of COP decisions indexed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-semibold">50+ Courses</div>
                        <div className="text-sm text-muted-foreground">used by learners worldwide</div>
                    </div>
                </div>
                <Separator className="my-6"/>
                <div className="text-sm text-muted-foreground text-center py-2">
                    Developed under the <span className="font-medium">MEA Information & Knowledge Management (IKM) Initiative</span> and facilitated by <span className="font-medium">UNEP</span> with support from partners.
                </div>
            </section>

            {/* Partners */}
            <section className={"py-6"}>
                <h2 className="text-xl font-semibold mb-4">Partners & Participating MEAs</h2>
                <p className="text-sm text-muted-foreground max-w-3xl">
                    InforMEA works with multiple MEA secretariats (e.g., Basel, Rotterdam & Stockholm Conventions; CITES; CBD; Ramsar; Minamata; UNCCD; UNFCCC; and others), UN bodies and collaborating organizations to harmonize and interoperate information systems.
                </p>
                <div className="flex flex-wrap items-center gap-6 mt-4 opacity-90 py-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg" alt="UN Emblem" className="h-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/UNEP_logo.svg" alt="UNEP" className="h-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/CITES_logo.svg" alt="CITES" className="h-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Convention_on_Biological_Diversity_logo.svg" alt="CBD" className="h-10"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Ramsar_Convention_logo.svg" alt="Ramsar" className="h-10"/>
                </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-background py-4">
                <div>
                    <h3 className="text-lg font-semibold">Start exploring the portal</h3>
                    <p className="text-sm text-muted-foreground">Search across treaties, decisions, country profiles, and learning resources.</p>
                </div>
                <div className="flex gap-3">
                    <Button asChild variant="default"><a href="https://www.informea.org/" target="_blank" rel="noreferrer">Open InforMEA</a></Button>
                    <Button asChild variant="secondary"><a href="https://www.unep.org/resources/toolkits-manuals-and-guides/informea-portal" target="_blank" rel="noreferrer">Learn more</a></Button>
                </div>
            </section>
        </div>
    );
}
