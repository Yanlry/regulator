import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import ThemedComponent from "./contexts/ThemedComponent";

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentStyles = {
    marginLeft: sidebarOpen ? "280px" : "80px",
    width: `calc(100% - ${sidebarOpen ? "280px" : "80px"})`,
    transition: "all 0.3s ease-in-out",
  };

  return (
    <ThemedComponent type="container" className="flex h-screen">
      <Sidebar onOpenChange={setSidebarOpen} />

      <div className="flex-1 overflow-auto" style={contentStyles}>
        <Routes>
          <Route path="/" element={<Dashboard isOpen={sidebarOpen} />} />
          <Route
            path="/ambulances"
            element={<AmbulancesScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/localisation"
            element={<LocalisationScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/planning"
            element={<PlanningScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/equipes"
            element={<EquipesScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/appointments"
            element={<AppointmentsScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/appointments/new"
            element={<NewAppointmentScreen isOpen={sidebarOpen} />}
          />
          <Route
            path="/regulation"
            element={<RegulationScreen isOpen={sidebarOpen} />}
          />
          <Route path="/rh" element={<RhScreen isOpen={sidebarOpen} />} />
          <Route
            path="/recrutement"
            element={<RecrutementScreen isOpen={sidebarOpen} />}
          />
        </Routes>
      </div>
    </ThemedComponent>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
