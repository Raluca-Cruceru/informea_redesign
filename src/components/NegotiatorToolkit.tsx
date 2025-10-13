import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function NegotiatorToolkit() {
  return (
    <Card className="mb-12 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1745970649957-b4b1f7fde4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY29uZmVyZW5jZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU1ODcxMDIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Environmental conference meeting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
          
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl mb-4 text-gray-800">Negotiator's toolkit</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This comprehensive knowledge base will help you to understand and navigate multilateral environmental negotiations and meetings.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 w-fit">
              Find out more
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}