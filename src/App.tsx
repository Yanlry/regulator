import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Ambulances from "./screens/Ambulances";
import Localisation from "./screens/Localisation";
import Planning from "./screens/Planning"; 
import Equipes from "./screens/Equipes"; 
import NewAppointement from "./screens/NewAppointment";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen">
        <div className="h-screen overflow-y-auto">
          <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        </div>

        <div className="flex-1 overflow-y-auto transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard isOpen={isOpen} />} />
            <Route path="/ambulances" element={<Ambulances isOpen={isOpen} />} />
            <Route path="/localisation" element={<Localisation isOpen={isOpen} />} />
            <Route path="/planning" element={<Planning isOpen={isOpen} />} /> 
            <Route path="/equipes" element={<Equipes isOpen={isOpen} />} /> 
            <Route path="/newAppointement" element={<NewAppointement isOpen={isOpen} />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;