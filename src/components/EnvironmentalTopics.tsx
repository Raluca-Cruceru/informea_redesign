import { Leaf, Beaker, Cloud, Scale, Wheat, Waves } from 'lucide-react';
import { Card, CardContent } from './ui/card';
// @ts-ignore
import biodiversity from "../assets/biodiversity.svg";
// @ts-ignore
import chemicals from "../assets/chemicals.svg";
// @ts-ignore
import climate from "../assets/climate.svg";
// @ts-ignore
import governance from "../assets/governance.svg";
// @ts-ignore
import agriculture from "../assets/agriculture.svg";
// @ts-ignore
import oceans from "../assets/oceans.svg";

const topics = [
    { image: biodiversity, title: "Biological diversity", hoverColor: "hover:bg-green-600" },
    { image: chemicals, title: "Chemicals and Waste", hoverColor: "hover:bg-red-600" },
    { image: climate, title: "Climate and Atmosphere", hoverColor: "hover:bg-sky-500" },
    { image: governance, title: "Environmental Governance", hoverColor: "hover:bg-green-800" },
    { image: agriculture, title: "Land and Agriculture", hoverColor: "hover:bg-orange-500" },
    { image: oceans, title: "Marine and Freshwater", hoverColor: "hover:bg-blue-800" },
];

export default function EnvironmentalTopics() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
                <div className=" h-6 bg-cyan-500 mr-3"></div>
                <h3 className="text-lg text-gray-800">Browse by Environmental Topic:</h3>
            </div>

            {/* Fills available vertical space given by parent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0">
                {topics.map((topic, index) => (
                    <Card
                        key={index}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md border-0 ${topic.hoverColor}`}
                    >
                        <CardContent className="p-4 text-center">
                            <div
                                className="rounded-full flex items-center justify-center mx-auto mb-2"
                                style={{ width: "80px", height: "75px", backgroundColor: "#f3f4f6" }} // light gray bg
                            >
                                <img
                                    src={topic.image}
                                    alt={topic.title}
                                    style={{ width: "65px", height: "75px", objectFit: "contain" }}
                                />
                            </div>
                            <p className="text-sm text-gray-700 leading-tight">{topic.title}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
