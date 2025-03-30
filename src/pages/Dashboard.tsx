import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Search, Square, CheckSquare } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState("Doctors");
  const role = location?.state?.role || "Unknown";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + "/auth",
      },
    });
  };

  const renderPatientDashboard = () => (
    <div className="space-y-6">
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-400">
          <div>
            <div className="mb-4">
              Full Name: <span className="text-white">&lt;name&gt;</span>
            </div>
            <div>
              Insurance: <span className="text-white">&lt;insurance&gt;</span>
            </div>
          </div>
          <div>
            <div className="mb-4">
              Email: <span className="text-white">&lt;email&gt;</span>
            </div>
            <div>
              Phone: <span className="text-white">&lt;phone&gt;</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">Appointments</h2>
        <div className="text-gray-400">No upcoming appointments</div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">
          Medical History
        </h2>
        <div className="text-gray-400">&lt;medical_history&gt;</div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-6">
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-gray-400">
          <div>
            <div className="mb-4">
              Name: <span className="text-white">&lt;name&gt;</span>
            </div>
            <div className="mb-4">
              Specialty: <span className="text-white">&lt;specialty&gt;</span>
            </div>
            <div>
              Hospitals: <span className="text-white">&lt;hospitals&gt;</span>
            </div>
          </div>
          <div>
            <div className="mb-4">
              Email: <span className="text-white">&lt;email&gt;</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_rgba(79,142,247,0.2)] transition-all duration-300">
        <h2 className="text-xl font-semibold text-white mb-6">Appointments</h2>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] rounded-lg p-4 text-gray-400"
            >
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
                Date & Time:{" "}
                <span className="text-white">&lt;datetime&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHospitalDashboard = () => {
    const timeSlots = [
      "8 AM - 10 AM",
      "10 AM - 12 PM",
      "12 PM - 2 PM",
      "2 PM - 4 PM",
      "4 PM - 6 PM",
    ];

    const getDayInfo = (dayOffset: number) => {
      const date = new Date();
      date.setDate(date.getDate() + dayOffset);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
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
          {[1, 2, 3, 4].map((_, doctorIndex) => (
            <div key={doctorIndex} className="bg-[#2A2A2A] rounded-lg p-6">
              <div className="flex items-start gap-8">
                <div className="w-64">
                  <h3 className="text-lg font-medium text-white mb-2">
                    &lt;name&gt;
                  </h3>
                  <p className="text-gray-400">&lt;specialty&gt;</p>
                </div>
                <div className="flex-1 grid grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((dayOffset) => {
                    const { day, date } = getDayInfo(dayOffset);
                    return (
                      <div
                        key={dayOffset}
                        className="bg-[#1E1E1E] rounded-lg p-4"
                      >
                        <div className="mb-3">
                          <div className="text-gray-300">{day}</div>
                          <div className="text-gray-400 text-sm">{date}</div>
                        </div>
                        <div className="space-y-2">
                          {timeSlots.map((slot, slotIndex) => {
                            const isChecked = Math.random() > 0.5; // For demonstration
                            return (
                              <div
                                key={slotIndex}
                                className="flex items-center gap-2"
                              >
                                {isChecked ? (
                                  <CheckSquare className="h-4 w-4 text-[#4F8EF7]" />
                                ) : (
                                  <Square className="h-4 w-4 text-gray-600" />
                                )}
                                <span className="text-xs text-gray-400">
                                  {slot}
                                </span>
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
          ))}
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
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-[#2A2A2A] rounded-lg p-6">
              <div className="flex gap-8">
                <div className="w-64 space-y-2">
                  <h3 className="text-lg font-medium text-white">
                    &lt;name&gt;
                  </h3>
                  <p className="text-gray-400">&lt;email&gt;</p>
                  <p className="text-gray-400">&lt;phone&gt;</p>
                  <p className="text-gray-400">&lt;insurance&gt;</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="bg-[#1E1E1E] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">
                      Appointments
                    </h4>
                    <div className="text-gray-400 text-sm">
                      {index % 2 === 0 ? (
                        <>
                          <p>Doctor: &lt;doctor&gt;</p>
                          <p>Date & Time: &lt;datetime&gt;</p>
                          <p>Reason: &lt;reason&gt;</p>
                        </>
                      ) : (
                        "No upcoming appointments"
                      )}
                    </div>
                  </div>
                  <div className="bg-[#1E1E1E] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">History</h4>
                    <p className="text-gray-400 text-sm">&lt;history&gt;</p>
                  </div>
                  <div className="bg-[#1E1E1E] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">
                      Prescriptions
                    </h4>
                    <p className="text-gray-400 text-sm">
                      &lt;prescriptions&gt;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                  Patient
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                  Doctor
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                  Time
                </th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">
                  Reason
                </th>
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
            {[
              "Doctors",
              "Patients",
              "Appointments",
              "Prescriptions",
              "Symptoms",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "text-[#4F8EF7] border-b-2 border-[#4F8EF7]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg">
          {activeTab === "Doctors" ? (
            renderDoctorsTab()
          ) : activeTab === "Patients" ? (
            renderPatientsTab()
          ) : activeTab === "Appointments" ? (
            renderAppointmentsTab()
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                {activeTab}
              </h2>
              <div className="text-gray-400">
                Manage {activeTab.toLowerCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    switch (role.toLowerCase()) {
      case "patient":
        return renderPatientDashboard();
      case "doctor":
        return renderDoctorDashboard();
      case "hospital":
        return renderHospitalDashboard();
      default:
        return <div>Unknown role</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <nav className="bg-[#1E1E1E] border-b border-[#2A2A2A] px-4 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-white">
              Medi<span className="text-[#4F8EF7]">Call</span>
            </Link>
          </div>
          <span className="text-gray-300 text-lg">
            Dashboard - {user?.name || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-[#2A2A2A] text-[12px] text-[#4F8EF7] rounded-lg hover:bg-[#3A3A3A] transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">{renderDashboard()}</div>
    </div>
  );
}
