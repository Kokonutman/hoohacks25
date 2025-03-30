import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Auth() {
  const navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'hospital'>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard', { 
        state: { 
          role: selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1),
          name: name || user.name
        }
      });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length > 0;
    const isNameValid = name.trim().length > 0;
    setIsFormValid(isEmailValid && isPasswordValid && selectedRole !== null && isNameValid);
  }, [email, password, selectedRole, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
        role: selectedRole,
        name: name
      },
      authorizationParams: {
        screen_hint: isSignIn ? 'signin' : 'signup',
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <Link to="/" className="flex items-center gap-3 mb-8">
        <img 
          src="https://i.imgur.com/WtWtsZ1.png" 
          alt="MediCall Logo" 
          className="h-12 w-12 rounded-lg object-cover"
        />
        <span className="text-4xl font-bold text-white">
          Medi<span className="text-[#4F8EF7]">Call</span>
        </span>
      </Link>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-[#4F8EF7] opacity-25 blur rounded-xl"></div>
        <div className="relative bg-[#1E1E1E] rounded-xl p-8">
          {/* Name Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7]"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <div className="relative bg-[#2A2A2A]/50 p-1 rounded-lg">
              <div 
                className="absolute inset-y-1 transition-all duration-300 ease-out bg-[#4F8EF7] rounded-md"
                style={{
                  width: '33.333333%',
                  transform: `translateX(${
                    selectedRole === 'patient' ? '0%' : 
                    selectedRole === 'doctor' ? '100%' : 
                    '200%'
                  })`
                }}
              ></div>
              <div className="relative grid grid-cols-3 gap-1">
                {['Patient', 'Doctor', 'Hospital'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role.toLowerCase() as any)}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 relative z-10 ${
                      selectedRole === role.toLowerCase() ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Auth Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 text-center transition-all duration-300 ${
                isSignIn ? 'text-[#4F8EF7] border-b-2 border-[#4F8EF7]' : 'text-gray-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 text-center transition-all duration-300 ${
                !isSignIn ? 'text-[#4F8EF7] border-b-2 border-[#4F8EF7]' : 'text-gray-400'
              }`}
            >
              Register
            </button>
          </div>

          {/* Auth Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7]"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                isFormValid
                  ? 'bg-[#4F8EF7] text-white hover:bg-[#3D7FE8]'
                  : 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSignIn ? 'Sign In' : 'Register'}
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button 
              disabled={!selectedRole || !name.trim()}
              onClick={() => loginWithRedirect({
                appState: {
                  returnTo: "/dashboard",
                  role: selectedRole,
                  name: name
                },
                connection: 'google-oauth2'
              })}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedRole && name.trim()
                  ? 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
                  : 'bg-[#1A1A1A] text-gray-500 cursor-not-allowed'
              }`}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/225px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button 
              disabled={!selectedRole || !name.trim()}
              onClick={() => loginWithRedirect({
                appState: {
                  returnTo: "/dashboard",
                  role: selectedRole,
                  name: name
                },
                connection: 'apple'
              })}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedRole && name.trim()
                  ? 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
                  : 'bg-[#1A1A1A] text-gray-500 cursor-not-allowed'
              }`}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png" alt="Apple" className="w-4.211 h-5" />
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}