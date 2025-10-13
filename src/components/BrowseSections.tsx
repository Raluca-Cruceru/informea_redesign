import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function BrowseSections() {
    return (
        <div className="flex flex-row gap-4" style={{height:"77px"}}>
            {/* Browse by Region */}
            <Card className="flex-1 overflow-hidden">
                <CardHeader style={{height:"30px", paddingTop:"10px", marginBottom:"-15px"}}>
                    <CardTitle className="flex items-center">
                        <div className="w-1 h-4 bg-cyan-500 mr-3"></div>
                        Browse by Region:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Select defaultValue="all-regions" >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-regions">All regions</SelectItem>
                            <SelectItem value="africa">Africa</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="south-america">South America</SelectItem>
                            <SelectItem value="oceania">Oceania</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Browse by Party */}
            <Card className="flex-1 overflow-hidden">
                <CardHeader style={{height:"30px", paddingTop:"10px", marginBottom:"-15px"}}>
                    <CardTitle className="flex items-center" >
                        <div className="w-1 h-4 bg-cyan-500 mr-3"></div>
                        Browse by Party:
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a party" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="argentina">Argentina</SelectItem>
                            <SelectItem value="brazil">Brazil</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="denmark">Denmark</SelectItem>
                            <SelectItem value="ethiopia">Ethiopia</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
        </div>
    );
}
