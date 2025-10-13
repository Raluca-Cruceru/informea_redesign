import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function UNCTPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl mb-8 text-center">UNCT Dashboard</h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>About Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                            Purpose, release day etc...
                        </p>
                    </CardContent>
                </Card>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="mb-2">Feature 1n</h4>
                                <p className="text-gray-600 text-sm">
                                    ...
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2">Feature 2</h4>
                                <p className="text-gray-600 text-sm">
                                    ...
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2">Feature 3</h4>
                                <p className="text-gray-600 text-sm">
                                    ...
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Log in</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                .........
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Other</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">
                                .....
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}