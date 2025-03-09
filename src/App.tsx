import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Ambulances from "./screens/Ambulances";
import Localisation from "./screens/Localisation";
import Planning from "./screens/Planning"; 
import Equipes from "./screens/Equipes"; 
import NewAppointment from "./screens/NewAppointment";
import Appointments from "./screens/Appointments";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        <div className="h-screen overflow-y-auto">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex-1 overflow-y-auto transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard isOpen={isOpen} />} />
            <Route path="/ambulances" element={<Ambulances isOpen={isOpen} />} />
            <Route path="/localisation" element={<Localisation isOpen={isOpen} />} />
            <Route path="/planning" element={<Planning isOpen={isOpen} />} /> 
            <Route path="/equipes" element={<Equipes isOpen={isOpen} />} /> 
            <Route path="/appointments" element={<Appointments isOpen={isOpen} />} />
            <Route path="/appointments/new" element={<NewAppointment isOpen={isOpen} />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;