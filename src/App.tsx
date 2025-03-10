import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar, SidebarProvider, useSidebar } from "./components/Sidebar";
import Dashboard from "./screens/DashboardScreen";
import AmbulancesScreen from "./screens/AmbulancesScreen";
import LocalisationScreen from "./screens/LocalisationScreen";
import PlanningScreen from "./screens/PlanningScreen"; 
import EquipesScreen from "./screens/EquipesScreen"; 
import NewAppointmentScreen from "./screens/NewAppointmentScreen";
import AppointmentsScreen from "./screens/AppointmentsScreen";
import RegulationScreen from "./screens/RegulationScreen"; 
import RhScreen from "./screens/RhScreen"; 
import RecrutementScreen from "./screens/RecrutementScreen";

/**
 * Conteneur d'application qui s'adapte à l'état de la sidebar
 */
const AppContent = () => {
  // Utilise le hook pour accéder à l'état de la sidebar
  const { isOpen } = useSidebar();
  
  return (
    <div className="flex h-screen">
      {/* Sidebar avec ouverture au survol */}
      <Sidebar />
      
      {/* Conteneur principal qui s'ajuste automatiquement */}
      <div 
        className={`
          flex-1 
          transition-all duration-300
        `}
        style={{ 
          marginLeft: isOpen ? '16rem' : '4rem',
          width: `calc(100% - ${isOpen ? '16rem' : '4rem'})` 
        }}
      >
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
  );
};

const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <AppContent />
      </Router>
    </SidebarProvider>
  );
};

export default App;