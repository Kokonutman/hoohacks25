import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Square, CheckSquare } from 'lucide-react';

// Define an interface for MongoDB's ObjectId (with a method)
interface ObjectId {
  toHexString(): string;
}

interface Patient {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  insurance: string;
}

interface Doctor {
  _id: ObjectId;
  name: string;
  email: string;
  specialty: string;
  hospitals: string[];
}

interface Appointment {
  _id: ObjectId;
  patient: ObjectId;
  doctor: ObjectId;
  hospital: ObjectId;
  datetime: Date;
  reason: string;
}

interface Hospital {
  _id: ObjectId;
  name: string;
}

interface Data {
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  hospitals: Hospital[];
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract role, name, and email from the navigation state
  const { role, name, email } = location.state || { role: 'unknown', name: 'User', email: '' };
  const [activeTab, setActiveTab] = useState('Doctors');
  const [data, setData] = useState<Data>({
    patients: [],
    doctors: [],
    appointments: [],
    hospitals: [],
  });

  // Fetch API data every 5 seconds, including role and email as query parameters
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const queryParams = new URLSearchParams({ role, email });
        const response = await fetch(`http://localhost:5173/api/data?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchDataFromAPI();
    const intervalId = setInterval(fetchDataFromAPI, 5000);
    return () => clearInterval(intervalId);
  }, [role, email]);

  const handleLogout = () => {
    navigate('/auth');
  };

  const renderPatientDashboard = () => (
    <div className="space-y-6">
      {data.patients.length === 0 ? (
        <div className="text-gray-400">No patient data available</div>
      ) : (
        data.patients.map((patient) => (
          <div
            key={patient._id.toHexString()}
            className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-400">
              <div>
                <div className="mb-4">
                  Full Name: <span className="text-white">{patient.name}</span>
                </div>
                <div>
                  Insurance: <span className="text-white">{patient.insurance}</span>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  Email: <span className="text-white">{patient.email}</span>
                </div>
                <div>
                  Phone: <span className="text-white">{patient.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">Appointments</h2>
        <div className="text-gray-400">No upcoming appointments</div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6">
      {data.doctors.length === 0 ? (
        <div className="text-gray-400">No doctor data available</div>
      ) : (
        data.doctors.map((doctor) => (
          <div
            key={doctor._id.toHexString()}
            className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-400">
              <div>
                <div className="mb-4">
                  Name: <span className="text-white">{doctor.name}</span>
                </div>
                <div className="mb-4">
                  Specialty: <span className="text-white">{doctor.specialty}</span>
                </div>
                <div>
                  Hospitals: <span className="text-white">{doctor.hospitals.join(', ')}</span>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  Email: <span className="text-white">{doctor.email}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">Appointments</h2>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
            <div key={index} className="bg-[#2A2A2A] rounded-lg p-4 text-gray-400">
              <div className="mb-4">
                Patient: <span className="text-white">&lt;patient&gt;</span>
              </div>
              <div className="mb-4">
                Hospital: <span className="text-white">&lt;hospital&gt;</span>
              </div>
              <div className="mb-4">
                Reason: <span className="text-white">&lt;reason&gt;</span>
              </div>
              <div>
                Date &amp; Time: <span className="text-white">&lt;datetime&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHospitalDashboard = () => {
    // For hospitals, we'll show all data (doctors, patients, etc.)
    const timeSlots = [
      '8 AM - 10 AM',
      '10 AM - 12 PM',
      '12 PM - 2 PM',
      '2 PM - 4 PM',
      '4 PM - 6 PM'
    ];

    const getDayInfo = (dayOffset: number) => {
      const date = new Date();
      date.setDate(date.getDate() + dayOffset);
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      };
    };

    const renderDoctorsTab = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Doctors</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors..."
              className="bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-4">
          {data.doctors.length === 0 ? (
            <div className="text-gray-400">No doctors available</div>
          ) : (
            data.doctors.map((doctor) => (
              <div key={doctor._id.toHexString()} className="bg-[#2A2A2A] rounded-lg p-6">
                <div className="flex items-start gap-8">
                  <div className="w-64">
                    <h3 className="text-lg font-medium text-white mb-2">{doctor.name}</h3>
                    <p className="text-gray-400">{doctor.specialty}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-4">
                    {[0, 1, 2, 3, 4].map((dayOffset) => {
                      const { day, date } = getDayInfo(dayOffset);
                      return (
                        <div key={dayOffset} className="bg-[#1E1E1E] rounded-lg p-4">
                          <div className="mb-3">
                            <div className="text-gray-300">{day}</div>
                            <div className="text-gray-400 text-sm">{date}</div>
                          </div>
                          <div className="space-y-2">
                            {timeSlots.map((slot, slotIndex) => {
                              const isChecked = Math.random() > 0.5; // For demo purposes
                              return (
                                <div key={slotIndex} className="flex items-center gap-2">
                                  {isChecked ? (
                                    <CheckSquare className="h-4 w-4 text-[#4F8EF7]" />
                                  ) : (
                                    <Square className="h-4 w-4 text-gray-600" />
                                  )}
                                  <span className="text-xs text-gray-400">{slot}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );

    const renderPatientsTab = () => (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Patients</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              className="bg-[#2A2A2A] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-4">
          {data.patients.length === 0 ? (
            <div className="text-gray-400">No patients available</div>
          ) : (
            data.patients.map((patient) => (
              <div key={patient._id.toHexString()} className="bg-[#2A2A2A] rounded-lg p-6">
                <div className="flex gap-8">
                  <div className="w-64 space-y-2">
                    <h3 className="text-lg font-medium text-white">{patient.name}</h3>
                    <p className="text-gray-400">{patient.email}</p>
                    <p className="text-gray-400">{patient.phone}</p>
                    <p className="text-gray-400">{patient.insurance}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="bg-[#1E1E1E] rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Appointments</h4>
                      <div className="text-gray-400 text-sm">
                        No upcoming appointments
                      </div>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">History</h4>
                      <p className="text-gray-400 text-sm">No history available</p>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Prescriptions</h4>
                      <p className="text-gray-400 text-sm">No prescriptions available</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );

    const renderAppointmentsTab = () => (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Appointments</h2>
        <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1E1E1E]">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Patient</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Doctor</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Time</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#1E1E1E]/50 transition-colors duration-150">
                <td className="py-4 px-6 text-white">&lt;patient&gt;</td>
                <td className="py-4 px-6 text-white">&lt;doctor&gt;</td>
                <td className="py-4 px-6 text-white">&lt;date&gt;</td>
                <td className="py-4 px-6 text-white">&lt;time&gt;</td>
                <td className="py-4 px-6 text-white">&lt;reason&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
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
        <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg">
          {activeTab === 'Doctors'
            ? renderDoctorsTab()
            : activeTab === 'Patients'
            ? renderPatientsTab()
            : activeTab === 'Appointments'
            ? renderAppointmentsTab()
            : (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">{activeTab}</h2>
                <div className="text-gray-400">Manage {activeTab.toLowerCase()}</div>
              </div>
            )}
        </div>
      </div>
    );
  };

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