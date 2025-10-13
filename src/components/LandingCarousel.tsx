import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Target, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
// @ts-ignore
import negortool from "../assets/toolkit-visual_0.jpg";
// @ts-ignore
import globalgoalss from "../assets/goals.png";
// @ts-ignore
import unct from "../assets/UNCT.png";

interface LandingCarouselProps {
    setCurrentPage: (page: string) => void;
}

const carouselItems = [
  {
    id: 1,
    title: "Negotiator's Toolkit",
    subtitle: "Essential resources for environmental negotiations",
    description: "This comprehensive knowledge base will help you to understand and navigate multilateral environmental negotiations and meetings.",
    image: negortool ,
    bgGradient: "from-cyan-500 to-blue-600",
    ctaText: "Find out more",
    ctaLink: "toolkit"
  },
  {
    id: 2,
    title: "Global Goals & MEA Strategic Plans",
    subtitle: "Mapping linkages for sustainable development",
    description: "Discover how Multilateral Environmental Agreements connect with the Sustainable Development Goals and strategic environmental planning.",
    image: globalgoalss ,
    bgGradient: "from-blue-600 to-cyan-500",
    ctaText: "Explore Goals",
    ctaLink: "goals"
  },
  {
    id: 3,
    title: "UNCT Dashboard",
    subtitle: "COMING SOON",
    description: "United Nations Country Teams Dashboard for Resident Coordinators.",
    image: unct ,
    bgGradient: "from-blue-600 to-cyan-500",
    ctaText: "Find out more",
    ctaLink: "unctdash"
  }
];

export default function LandingCarousel({ setCurrentPage }: LandingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="relative h-[450px] overflow-hidden rounded-lg shadow-2xl" style={{maxHeight:"420px"}}>
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${item.bgGradient} relative`}>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>

            <div className="relative z-10 h-full flex items-center">
              <div className="px-4 md:px-6">
                <div className="grid md:grid-cols-1 items-center">
                  <div className="text-white" style={{paddingLeft: "70px", paddingRight: "200px"}}>
                    <div className="flex items-center mb-2">

                      <div className="min-w-0">
                        <p className="text-base opacity-90 text-white mb-2">{item.subtitle}</p>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl text-white">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 text-white max-w-2xl">
                      {item.description}
                    </p>
                    <Button
                        onClick={() => setCurrentPage(item.ctaLink)}
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 transition-colors text-lg px-8 py-3"
                    >
                      {item.ctaText}
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    {/* This space can be used for additional content or remain empty for visual balance */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}