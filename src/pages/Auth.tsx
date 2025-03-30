import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserRound, Stethoscope, Building2 } from "lucide-react";

interface AuthProps {
  setRole: (role: string) => void;
}

export default function Auth({ setRole }: AuthProps) {
  const { loginWithRedirect } = useAuth0();

  const roles = [
    { id: "patient", label: "Patient", icon: UserRound },
    { id: "doctor", label: "Doctor", icon: Stethoscope },
    { id: "hospital", label: "Hospital", icon: Building2 },
  ];

  const handleRoleSelect = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-3 mb-12">
        <img
          src="https://i.imgur.com/WtWtsZ1.png"
          alt="MediCall Logo"
          className="h-12 w-12 rounded-lg object-cover"
        />
        <span className="text-4xl font-bold text-white">
          Medi<span className="text-[#4F8EF7]">Call</span>
        </span>
      </Link>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-3 gap-6">
          {roles.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setRole(id); // ✅ call setRole first
                handleRoleSelect(); // ✅ then trigger Auth0 redirect
              }}
              className="relative bg-[#1E1E1E] rounded-xl p-16 flex flex-col items-center justify-center gap-8 transition-all duration-300 group hover:bg-[#2A2A2A] hover:ring-2 hover:ring-[#4F8EF7] hover:shadow-[0_0_30px_rgba(79,142,247,0.2)]"
            >
              <Icon className="w-20 h-20 text-gray-400 group-hover:text-[#4F8EF7] transition-all duration-300" />
              <span className="text-2xl font-medium text-gray-400 group-hover:text-white transition-all duration-300">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
