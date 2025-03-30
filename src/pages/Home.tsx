import React, { useRef } from 'react';
import { Brain, Clock, Globe, MessageSquare, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-sm transition-all duration-300 border border-[#2A2A2A] hover:shadow-[0_0_15px_rgba(79,142,247,0.3)] hover:border-[#4F8EF7]/50">
      <div className="h-12 w-12 bg-[#4F8EF7]/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#4F8EF7]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "State-of-the-art machine learning algorithms for intelligent navigation"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Seamless navigation assistance anywhere in the world"
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Enterprise-grade security protocols to protect your data"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Instant updates and notifications for optimal navigation"
    },
    {
      icon: MessageSquare,
      title: "Smart Assistant",
      description: "24/7 AI-powered assistance for all your navigation needs"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for quick response times"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
        <div className="container mx-auto px-4 py-32 text-center relative z-10">
          <h1 className="text-7xl font-bold mb-8 text-white">
            Navis<span className="text-[#4F8EF7]">AI</span>
          </h1>
          <h2 className="text-3xl font-medium text-gray-300 mb-8">
            <span className="animate-shimmer-text">
              Navigate the future with artificial intelligence
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-200 mb-12 text-lg">
            Experience the next generation of navigation powered by cutting-edge AI technology. 
            NavisAI combines precision, intelligence, and reliability to transform your navigation experience.
          </p>
          <div className="space-y-6">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-[#4F8EF7] text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#3D7FE8] hover:scale-105 hover:shadow-lg text-lg"
            >
              Get Started
            </button>
            <div>
              <button 
                onClick={scrollToFeatures}
                className="bg-[#4F8EF7]/10 border-2 border-[#FFFFFF] text-[#FFFFFF] px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#4F8EF7]/20 text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="bg-[#161616] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}