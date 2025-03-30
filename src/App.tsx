import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [role, setRole] = useState<string>("patient");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setRole={setRole} />} />
        <Route
          path="/dashboard"
          element={<Dashboard role={role || "patient"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
