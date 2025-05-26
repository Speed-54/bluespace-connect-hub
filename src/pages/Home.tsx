
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Clock, Star, Globe } from 'lucide-react';
import Header from '@/components/layout/Header';

const Home = () => {
  const stats = [
    { label: 'Active Developers', value: '2,500+', icon: Users },
    { label: 'Projects Completed', value: '1,200+', icon: Star },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Avg. Response Time', value: '2 hours', icon: Clock },
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      technologies: ['React', 'Vue.js', 'Angular', 'Node.js']
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      title: 'Backend Development',
      description: 'Scalable server-side solutions and APIs',
      technologies: ['Node.js', 'Python', 'Java', 'Go']
    },
    {
      title: 'Cloud Solutions',
      description: 'Cloud architecture and deployment services',
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bluespace-gradient hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Connect with Africa's
              <span className="block text-blue-200">Best IT Talent</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
              Bluespace bridges the gap between innovative businesses and skilled IT professionals 
              across Africa, delivering world-class digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/register">
                <Button size="lg" className="bg-white text-bluespace-600 hover:bg-gray-100 px-8 py-4 text-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/talents">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bluespace-600 px-8 py-4 text-lg">
                  Find Developers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-bluespace-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive IT solutions to help your business thrive in the digital age
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-bluespace-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bluespace-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their perfect IT solutions through Bluespace
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-bluespace-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-bluespace-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">Bluespace</span>
              </div>
              <p className="text-gray-400">
                Connecting Africa's best IT talent with innovative businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white">Web Development</Link></li>
                <li><Link to="/services" className="hover:text-white">Mobile Apps</Link></li>
                <li><Link to="/services" className="hover:text-white">Backend Development</Link></li>
                <li><Link to="/services" className="hover:text-white">Cloud Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bluespace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
