import image_b3317a67a82acceac61c19bd7a0014d2781165eb from 'figma:asset/b3317a67a82acceac61c19bd7a0014d2781165eb.png';
import { useState } from 'react';
import {Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, GraduationCap, Instagram, X} from 'lucide-react';
import Header from './components/Header';
import LandingCarousel from './components/LandingCarousel';
import EnvironmentalTopics from './components/EnvironmentalTopics';
import BrowseSections from './components/BrowseSections';
import OnlineCourses from './components/OnlineCourses';
import AboutPage from './components/pages/AboutPage';
import MEAsPage from './components/pages/MEAsPage';
import PartiesPage from './components/pages/PartiesPage';
import ResourcesPage from './components/pages/ResourcesPage';
import UNCTPage from './components/pages/UNCTPage';
import NegotiatorsPage from "./components/pages/NegotiatorsPage";
import GoalsPage from "./components/pages/GoalsPage";
import PartyExamplePage from "./components/pages/PartyExamplePage";
import TreatyPage from "./components/pages/TreatyPage";
// @ts-ignore
import unlogo from "./assets/un-logo.png";
// @ts-ignore
import unepLogo from './assets/unep.png';
// @ts-ignore
import faoLogo from './assets/fao_logo.png';
// @ts-ignore
import unescoLogo from './assets/UNESCO-logo.png';
// @ts-ignore
import uneceLogo from './assets/UNECE-logo.png';
// @ts-ignore
import eclacLogo from './assets/ECLAC-logo.svg.png';
// @ts-ignore
import ecolexLogo from './assets/ecolex-logo.jpg';
// @ts-ignore
import eulogo from './assets/EU-logo.png';
import ResultsPage from './components/pages/ResultsPage';
import { SearchProvider } from './search-state';




export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const XIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M18.901 1.153h3.815l-8.34 9.53L23.25 22.847h-7.44l-5.833-7.616-6.667 7.616H.31l8.892-10.17L.75 1.153h7.558l5.263 6.932z" />
        </svg>
    );

    const renderContent = () => {
        switch (currentPage) {
            case 'about':
                return <AboutPage />;
            case 'meas':
                return <MEAsPage setCurrentPage={setCurrentPage} />;
            case 'parties':
                return <PartiesPage setCurrentPage={setCurrentPage} />;
            case 'resources':
                return <ResourcesPage />;
            case 'unctdash':
                return <UNCTPage />;
            case 'goals':
                return <GoalsPage />;
            case 'toolkit':
                return <NegotiatorsPage />;
            case 'exampleparty':
                return <PartyExamplePage />;
            case 'treatypage':
                return <TreatyPage />;
            case 'results':
                return <ResultsPage />;
            default:
                return (
                    <>


                        {/*/!* Browse Sections (Region and Party) Below *!/*/}
                        {/*<section className="pb-16">*/}
                        {/*    <div className="container mx-auto px-4">*/}
                        {/*        <BrowseSections />*/}
                        {/*    </div>*/}
                        {/*</section>*/}

                        {/*<section className="py-8">*/}
                        {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2">*/}
                        {/*        <LandingCarousel setCurrentPage={setCurrentPage} />*/}
                        {/*        <div className="grid gap-6">*/}
                        {/*            <EnvironmentalTopics />*/}
                        {/*            <BrowseSections />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <OnlineCourses />*/}
                        {/*</section>*/}
                        <div className="grid md:grid-cols-2 gap-6 py-8" style={{paddingLeft:"100px", paddingRight:"100px", maxHeight:"480px"}}>
                            <LandingCarousel setCurrentPage={setCurrentPage}/>
                            <div className="grid gap-6" style={{maxHeight:"420px"}}>
                                <EnvironmentalTopics/>
                                <BrowseSections />
                            </div>
                        </div>

                        <OnlineCourses />

                    </>
                );
        }
    };

    const OrgLogo = ({ href, src, label, alt }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className="group block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
        >
            <div
                className="
      rounded-lg
      p-3
      mb-2
      transition-all
      duration-300
      ease-out
      border
      border-transparent
      bg-transparent
      group-hover:border-white
      group-hover:bg-white
      shadow-sm
      group-hover:shadow-md
    "
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || label}
                        loading="lazy"
                        className="

          h-16
          mx-auto
          object-contain
          filter
          grayscale
          brightness-75
          opacity-70
          transition-all
          duration-300
          ease-out
          group-hover:grayscale-0
          group-hover:brightness-100
          group-hover:opacity-100
          group-hover:-translate-y-1
          transform
        "
                    />
                ) : (
                    <div className="w-14 h-14 mx-auto flex items-center justify-center bg-gray-100 rounded">
                        <span className="text-xs font-semibold text-gray-600">{label}</span>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                {label}
            </p>
        </a>

    );

    return (
        <SearchProvider>
        <div className="min-h-screen bg-gray-50">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <main>
                {renderContent()}

                {/* Footer with Information from Image */}
                <footer className="bg-gray-800 text-white py-12">
                    <div className="grid" style={{paddingLeft:"100px", paddingRight:"100px"}}>
                        {/* Footer Image Information */}
                        {/*<div className="mb-8 p-6 bg-gray-700 rounded-lg">*/}
                        {/*    <h3 className="text-lg mb-4">United Nations Information Portal on Multilateral Environmental Agreements</h3>*/}
                        {/*    <p className="text-gray-300 text-sm leading-relaxed mb-4">*/}
                        {/*        InforMEA provides easy access to information on MEAs. You can consult treaty texts and provisions of decisions and resolutions adopted by the Governing Bodies of MEAs. You may browse Party information including contacts, national reports and national plans submitted under MEAs. Feel free to learn of terms and concepts as defined in the context of MEAs and consider taking one of our 50 online courses introducing MEAs. Don't forget to use the explorer field to search across all this information and further filter and refine results.*/}
                        {/*    </p>*/}
                        {/*    <p className="text-gray-300 text-sm">*/}
                        {/*        Watch the video to learn more about the role of each MEA from the Secretary. You will also have a chance to learn more on InforMEA.{' '}*/}
                        {/*        <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">Please click here</a>*/}
                        {/*    </p>*/}
                        {/*</div>*/}

                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <h4 className="mb-4">GET INFORMED</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Treaties</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Parties</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Law and Cases</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Goals</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documents and Literature</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Glossary</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contacts Hub</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4">BROWSE BY ENVIRONMENTAL TOPIC</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Biological diversity</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chemicals and Waste</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Climate and Atmosphere</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Environmental Governance</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Land and Agriculture</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Marine and Freshwater</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4">BROWSE BY REGIONS</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Africa</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Asia and the Pacific</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Europe</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Latin America and the Caribbean</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">North America</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Polar: Arctic</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">West Asia</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 flex items-center">
                                    <GraduationCap className="w-5 h-5 mr-2" />
                                    FREE COURSES
                                </h4>
                                <p className="text-gray-300 text-sm mb-4">
                                    Explore our collection of courses on the environmental topics
                                </p>
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition-colors flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    FREE ONLINE COURSES
                                </button>
                            </div>
                        </div>

                        {/* Organizations */}
                        <div className="mb-8">


                            {/* Reusable partner logo component */}
                            {/* Put this inside App() above return if you prefer, or outside as a separate component file */}
                            {/*
  const OrgLogo = ({ href, src, label, alt }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className="group block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
    >
      <div className="bg-white rounded-lg p-3 mb-2 shadow-sm transition-all duration-200 ease-out group-hover:shadow-md">
        {src ? (
          <img
            src={src}
            alt={alt || label}
            className="w-14 h-14 mx-auto object-contain filter grayscale opacity-70 transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transform"
            loading="lazy"
          />
        ) : (
          <div className="w-14 h-14 mx-auto flex items-center justify-center bg-gray-100 rounded">
            <span className="text-xs font-semibold text-gray-600">{label}</span>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-300 group-hover:text-white transition-colors">{label}</p>
    </a>
  );
  */}

                            <div className="border-t border-gray-600 mt-4 py-4 text-center text-xs text-gray-400"></div>
                            <h4 className="mb-6">ORGANIZATIONS</h4>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-6 items-center">
                                    <OrgLogo href="https://www.unep.org/" src={unlogo} label="UN" />
                                    <OrgLogo href="https://www.unep.org/" src={unepLogo} label="UN Environment" />
                                    <OrgLogo href="https://www.fao.org/" src={faoLogo} label="FAO" />
                                    <OrgLogo href="https://www.unesco.org/" src={unescoLogo} label="UNESCO" />
                                    <OrgLogo href="https://unece.org/" src={uneceLogo} label="UNECE" />
                                    <OrgLogo href="https://www.cepal.org/en" src={eclacLogo} label="ECLAC" />
                                    <OrgLogo href="https://www.ecolex.org/" src={ecolexLogo} label="ECOLEX" />
                                </div>

                                <OrgLogo href="https://europa.eu/" src={eulogo} label="European Union" />
                            </div>
                        </div>

                        <div className="border-t border-gray-600 mt-4 text-center text-xs text-gray-400 pb-4"></div>


                        {/* Contact and Social Media */}
                        <div className="grid md:grid-cols-3 gap-8 mb-8 pt-4">
                            <div>
                                <h4 className="mb-4">Contact us</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <a href="mailto:ikm.mea@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                                            ikm.mea@gmail.com
                                        </a>
                                    </div>
                                    {/*<div className="flex items-center space-x-2">*/}
                                    {/*    <Phone className="w-4 h-4 text-gray-400" />*/}
                                    {/*    <span className="text-gray-300">+254 20 762 1234</span>*/}
                                    {/*</div>*/}
                    {/*                <div className="flex items-start space-x-2">*/}
                    {/*                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />*/}
                    {/*                    <span className="text-gray-300">*/}
                    {/*  UN Environment Programme<br />*/}
                    {/*  Nairobi, Kenya*/}
                    {/*</span>*/}
                    {/*                </div>*/}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-4">Follow Us</h4>
                                <div className="flex space-x-3">
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <XIcon className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="container m-auto border-2 border-white p-4 rounded-md">
                                <h4>SUBSCRIBE TO THE INFORMEA NEWSLETTER</h4>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div className="border-t border-gray-600 pt-8 flex justify-between items-center text-sm ">
                            <div className="flex items-center space-x-2">
                                <img src={image_b3317a67a82acceac61c19bd7a0014d2781165eb} alt="UN Logo" className="w-auto h-10" />
                                <h1 className="text-3xl font-serif" style={{ fontFamily: 'Times New Roman, serif', fontSize:"27px" }}>
                                    InforMEA
                                </h1>
                            </div>
                            <div className="flex space-x-4 text-gray-400">
                                <a href="#" className="hover:text-white transition-colors">About InforMEA</a>
                                <a href="#" className="hover:text-white transition-colors">Contact & Support Requests</a>
                                <a href="#" className="hover:text-white transition-colors">Get Involved</a>
                                <a href="#" className="hover:text-white transition-colors">Log out</a>
                            </div>
                        </div>

                        {/*<div className="border-t border-gray-600 mt-4 pt-4 text-center text-xs text-gray-400">*/}
                        {/*    <p>&copy; 2024 InforMEA. United Nations Environment Programme. All rights reserved.</p>*/}
                        {/*</div>*/}
                    </div>
                </footer>
            </main>
        </div>


        </SearchProvider>

    );
}