import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/DashboardScreen";
import AmbulancesScreen from "./screens/AmbulancesScreen";
import LocalisationScreen from "./screens/LocalisationScreen";
import PlanningScreen from "./screens/PlanningScreen"; 
import EquipesScreen from "./screens/EquipesScreen"; 
import NewAppointmentScreen from "./screens/NewAppointmentScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import RegulationScreen from "./screens/RegulationScreen"; // Importez le composant Regulation
import RhScreen from "./screens/RhScreen"; // Importez le composant Rh
import RecrutementScreen from "./screens/RecrutementScreen";

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
            <Route path="/ambulances" element={<AmbulancesScreen isOpen={isOpen} />} />
            <Route path="/localisation" element={<LocalisationScreen isOpen={isOpen} />} />
            <Route path="/planning" element={<PlanningScreen isOpen={isOpen} />} /> 
            <Route path="/equipes" element={<EquipesScreen isOpen={isOpen} />} /> 
            <Route path="/appointments" element={<AppointmentsScreen isOpen={isOpen} />} />
            <Route path="/appointments/new" element={<NewAppointmentScreen isOpen={isOpen} />} /> 
            <Route path="/regulation" element={<RegulationScreen isOpen={isOpen} />} /> 
            <Route path="/rh" element={<RhScreen isOpen={isOpen} />} /> 
            <Route path="/recrutement" element={<RecrutementScreen isOpen={isOpen} />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;