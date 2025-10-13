import { BookOpen, Scale, Gavel, GraduationCap, FileText, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const resources = [
    {
        title: "Global Goals",
        description: "Linkages between MEAs and Sustainable Development Goals",
        icon: Globe,
        color: "text-cyan-600",
        bgColor: "bg-cyan-50"
    },
  {
    title: "Laws and Cases",
    description: "Access environmental legislation and court decisions from around the world",
    icon: Gavel,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
    {
        title: "Document Library",
        description: "Comprehensive collection of MEA documents and literature",
        icon: FileText,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
    },
  {
    title: "Negotiator's Toolkit",
    description: "Essential resources and guidance for environmental negotiations",
    icon: Scale,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },


  {
    title: "Glossary",
    description: "Definitions of terms and concepts used in environmental agreements",
    icon: BookOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
    {
        title: "Online Courses",
        description: "Free educational courses on environmental agreements and topics",
        icon: GraduationCap,
        color: "text-green-600",
        bgColor: "bg-green-50"
    }

];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto  py-8" style={{paddingLeft:"100px", paddingRight:"100px"}}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl mb-8 text-center">Knowledge Base</h1>
        
        <div className="mb-8">
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of resources designed to support Environmental Governance,
            Education, and implementation of Multilateral Environmental Agreements.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className={`w-16 h-16 rounded-full ${resource.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <resource.icon className={`w-8 h-8 ${resource.color}`} />
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{resource.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6">Featured Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-blue-600" />
                  Latest from Negotiator's Toolkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="mb-2">Preparing for COP Meetings</h4>
                <p className="text-gray-600 text-sm mb-4">
                  A comprehensive guide to understanding the processes, procedures, and strategies 
                  for effective participation in Conference of Parties meetings.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Learn More →
                </button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-green-600" />
                  New Online Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="mb-2">Introduction to Climate Finance</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Explore the mechanisms, institutions, and policies that drive climate finance 
                  and support developing countries in their climate actions.
                </p>
                <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                  Enroll Now →
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Contact Hub</h4>
                <p className="text-sm text-gray-600">Find contact information for MEA focal points</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Event Calendar</h4>
                <p className="text-sm text-gray-600">Upcoming MEA meetings and conferences</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">National Reports</h4>
                <p className="text-sm text-gray-600">Access country implementation reports</p>
              </button>
              <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium mb-2">Help & Support</h4>
                <p className="text-sm text-gray-600">Get assistance using InforMEA</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}