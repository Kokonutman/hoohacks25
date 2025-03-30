import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Dashboard() {
  const location = useLocation();
  const { logout } = useAuth0();
  const { role, name } = location.state || { role: 'Unknown', name: 'User' };
  const [activeTab, setActiveTab] = useState('Doctors');

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: "https://curemedaddy.tech/"
      }
    });
  };

  const renderPatientDashboard = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
        <div className="text-gray-400">View and manage your personal details</div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-4">Appointments</h2>
        <div className="text-gray-400">Schedule and manage your appointments</div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-4">Medical History</h2>
        <div className="text-gray-400">View your medical records and history</div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
        <div className="text-gray-400">Manage your professional profile</div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-4">Appointments</h2>
        <div className="text-gray-400">View and manage patient appointments</div>
      </div>
    </div>
  );

  const renderHospitalDashboard = () => (
    <div className="space-y-6">
      <div className="border-b border-[#2A2A2A]">
        <div className="grid grid-cols-5 max-w-4xl mx-auto">
          {['Doctors', 'Patients', 'Appointments', 'Prescriptions', 'Symptoms'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'text-[#4F8EF7] border-b-2 border-[#4F8EF7]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg min-h-[300px] max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-4">{activeTab}</h2>
        <div className="text-gray-400">Manage {activeTab.toLowerCase()}</div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (role.toLowerCase()) {
      case 'patient':
        return renderPatientDashboard();
      case 'doctor':
        return renderDoctorDashboard();
      case 'hospital':
        return renderHospitalDashboard();
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Navbar */}
      <nav className="bg-[#1E1E1E] border-b border-[#2A2A2A] px-4 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-white">
              Medi<span className="text-[#4F8EF7]">Call</span>
            </Link>
          </div>
          <span className="text-gray-300 text-lg">Dashboard - {name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-[#2A2A2A] text-[12px] text-[#4F8EF7] rounded-lg hover:bg-[#3A3A3A] transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
}