import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ObjectId {
  toHexString(): string;
}

interface Patient {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  insuranceId: ObjectId;
  insuranceProvider: string;
  insurancePlan: string;
  zipcode: string;
}

interface Doctor {
  _id: ObjectId;
  name: string;
  email: string;
  specialty: string;
  hospitals: string[];
}

interface Hospital {
  _id: ObjectId;
  name: string;
}

interface Appointment {
  _id: ObjectId;
  patientId: ObjectId;
  doctorId: ObjectId;
  hospitalId: ObjectId;
  datetime: Date;
  status: string;
  reason: string;
}

interface InsurancePlan {
  _id: ObjectId;
  planName: string;
  providerId: ObjectId;
}

interface InsuranceProvider {
  _id: ObjectId;
  name: string;
}

interface Data {
  patients: Patient[];
  doctors: Doctor[];
  hospitals: Hospital[];
  appointments: Appointment[];
  insurance_plans: InsurancePlan[];
  insurance_providers: InsuranceProvider[];
}

const getById = <T extends { _id: ObjectId }>(list: T[], id: ObjectId) =>
  list.find((item) => item._id.toHexString() === id.toHexString());

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, name, email } = location.state || {
    role: "unknown",
    name: "User",
    email: "",
  };

  const [data, setData] = useState<Data>({
    patients: [],
    doctors: [],
    hospitals: [],
    appointments: [],
    insurance_plans: [],
    insurance_providers: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({ role, email });
        const response = await fetch(
          `http://localhost:5173/api/data?${queryParams.toString()}`
        );
        if (!response.ok) throw new Error("Network error");
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [role, email]);

  const handleLogout = () => navigate("/auth");

  const renderAppointmentCard = (appt: Appointment) => {
    const patient = getById(data.patients, appt.patientId);
    const doctor = getById(data.doctors, appt.doctorId);
    const hospital = getById(data.hospitals, appt.hospitalId);

    return (
      <div
        key={appt._id.toHexString()}
        className="bg-[#2A2A2A] rounded-lg p-4 text-white mb-4"
      >
        <div>
          <strong>Patient:</strong> {patient?.name || "Unknown"}
        </div>
        <div>
          <strong>Doctor:</strong> {doctor?.name || "Unknown"}
        </div>
        <div>
          <strong>Hospital:</strong> {hospital?.name || "Unknown"}
        </div>
        <div>
          <strong>Date & Time:</strong>{" "}
          {new Date(appt.datetime).toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong> {appt.status}
        </div>
        <div>
          <strong>Reason:</strong> {appt.reason}
        </div>
      </div>
    );
  };

  const renderAllData = () => (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Patients</h2>
        {data.patients.map((p) => {
          const plan = getById(data.insurance_plans, p.insuranceId);
          const provider =
            plan && getById(data.insurance_providers, plan.providerId);

          return (
            <div
              key={p._id.toHexString()}
              className="bg-[#2A2A2A] rounded-lg p-4 text-white mb-2"
            >
              <div>
                <strong>Name:</strong> {p.name}
              </div>
              <div>
                <strong>Email:</strong> {p.email}
              </div>
              <div>
                <strong>Phone:</strong> {p.phone}
              </div>
              <div>
                <strong>Insurance:</strong>{" "}
                {provider?.name || p.insuranceProvider} -{" "}
                {plan?.planName || p.insurancePlan}
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Doctors</h2>
        {data.doctors.map((d) => (
          <div
            key={d._id.toHexString()}
            className="bg-[#2A2A2A] rounded-lg p-4 text-white mb-2"
          >
            <div>
              <strong>Name:</strong> {d.name}
            </div>
            <div>
              <strong>Email:</strong> {d.email}
            </div>
            <div>
              <strong>Specialty:</strong> {d.specialty}
            </div>
            <div>
              <strong>Hospitals:</strong> {d.hospitals.join(", ")}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Appointments</h2>
        {data.appointments.map(renderAppointmentCard)}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Hospitals</h2>
        {data.hospitals.map((h) => (
          <div
            key={h._id.toHexString()}
            className="bg-[#2A2A2A] rounded-lg p-4 text-white mb-2"
          >
            <div>
              <strong>Name:</strong> {h.name}
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      <nav className="bg-[#1E1E1E] border-b border-[#2A2A2A] px-4 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            Medi<span className="text-[#4F8EF7]">Call</span>
          </Link>
          <span className="text-gray-300 text-lg">Dashboard - {name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-[#2A2A2A] text-[12px] text-[#4F8EF7] rounded-lg hover:bg-[#3A3A3A] transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">{renderAllData()}</div>
    </div>
  );
}
