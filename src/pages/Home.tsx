import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Mic } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Home() {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [agentStatus, setAgentStatus] = useState({
    appointment: "Checking availability...",
    insurance: "Verifying coverage..."
  });
  
  const samplePrompts = [
    "I need pediatricians near me who prescribe medicines",
    "Schedule an appointment with Dr. Smith next week",
    "Check if my insurance covers physical therapy",
    "Find an orthopedic specialist within 5 miles",
    "Book a dental cleaning for next month",
    "Is my prescription ready for pickup?",
    "What's the earliest available slot for a checkup?"
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const updateStatus = () => {
      if (isTyping) {
        setAgentStatus({
          appointment: "Checking availability...",
          insurance: "Verifying coverage..."
        });
        if (isTextVisible) {
          timer = setTimeout(() => {
            setAgentStatus({
              appointment: "Appointment available",
              insurance: "Coverage verified"
            });
          }, 3000);
        }
      } else {
        setAgentStatus({
          appointment: "",
          insurance: ""
        });
      }
    };

    updateStatus();
    return () => clearTimeout(timer);
  }, [isTyping, isTextVisible]);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    let visibilityTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;

    const startTypingCycle = () => {
      setIsTyping(true);
      setIsTextVisible(true);

      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 9000);

      completionTimer = setTimeout(() => {
        setIsTextVisible(false);
        
        visibilityTimer = setTimeout(() => {
          setCurrentPromptIndex((prev) => (prev + 1) % samplePrompts.length);
          startTypingCycle();
        }, 500);
      }, 11000);
    };

    startTypingCycle();

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(completionTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-pattern text-white">
      <div className="container mx-auto px-4">
        <div className="min-h-screen grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Left Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <img 
                src="https://i.imgur.com/WtWtsZ1.png" 
                alt="MediCall Logo" 
                className="h-[64px] w-[64px] rounded-lg object-cover"
              />
              <h1 className="text-5xl font-bold">
                Medi<span className="text-[#4F8EF7]">Call</span>
              </h1>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold leading-tight">
                Your Voice, Your Care,<br />
                <span className="shimmer-text">One Call Away.</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Lets patients instantly verify insurance, find nearby hospitals, receive symptom triage, and book appointments - all through one simple call.
              </p>
            </div>

            <div className="space-y-6">
              {['Real-time speech-to-speech AI', 'In-network hospital finder', 'Symptom triage and escalation', 'Calendar-integrated bookings'].map((feature, index) => (
                <div key={feature} className="flex items-center gap-4 feature-item">
                  <div className="h-5 w-5 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-[#4F8EF7]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={() => navigate('/auth')}
                className="bg-[#4F8EF7] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#3D7FE8] flex items-center gap-3"
              >
                <Mic className="h-5 w-5" />
                Try MediCall
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative">
            <div className="bg-[#0C1A2E] border border-[#1E3251] rounded-xl p-6 glow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-[#4F8EF7] rounded-full flex items-center justify-center">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold">MediCall is listening...</div>
                  <div className="text-gray-400 text-sm">Try saying:</div>
                </div>
              </div>

              <div className="bg-[#081221] rounded-lg p-4 mb-6">
                <div className="prompt-box text-gray-400">
                  {isTextVisible && (
                    <span className={`typing-text ${isTyping ? 'typing' : 'erasing'}`}>
                      {samplePrompts[currentPromptIndex]}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full h-96 rounded-lg mb-6 overflow-hidden">
                <Spline scene="https://prod.spline.design/qxh29EjgEvBenXjB/scene.splinecode" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#081221] rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Appointment Agent</h3>
                  <p className="agent-status text-gray-400 text-sm transition-all duration-300">{agentStatus.appointment}</p>
                </div>
                <div className="bg-[#081221] rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Insurance Agent</h3>
                  <p className="agent-status text-gray-400 text-sm transition-all duration-300">{agentStatus.insurance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}