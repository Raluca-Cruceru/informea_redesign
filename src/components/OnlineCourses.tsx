import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const courses = [
  {
    title: 'Biodiversity and Ecosystem Services',
    image: 'https://images.unsplash.com/photo-1727459916583-12ce2e52dde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9kaXZlcnNpdHklMjBmb3Jlc3QlMjBlY29zeXN0ZW18ZW58MXx8fHwxNzU1ODcxMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true
  },
  {
    title: 'Climate Change and Glacier Monitoring',
    image: 'https://images.unsplash.com/photo-1685746301844-e4e3425b6b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZ2xhY2llcnxlbnwxfHx8fDE3NTU4NzEwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true
  },
  {
    title: 'Renewable Energy Solutions',
    image: 'https://images.unsplash.com/photo-1625549370925-8ab0deb27a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTU4NzEwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true
  },
  {
    title: 'Marine and Ocean Conservation',
    image: 'https://images.unsplash.com/photo-1629215833230-22f4ff6af23a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGNvbnNlcnZhdGlvbiUyMG1hcmluZXxlbnwxfHx8fDE3NTU4NzEwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true
  }
];

export default function OnlineCourses() {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16">
      <div className="grid" style={{paddingLeft:"100px", paddingRight:"100px"}}>
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Explore our FREE online courses</h2>

        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.isNew && (
                    <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                      NEW
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 group-hover:text-cyan-600 transition-colors duration-200">
                    {course.title}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}