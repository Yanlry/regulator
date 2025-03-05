import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Ambulances from "./screens/Ambulances"; // Nouvelle page

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar fixe et scrollable indépendamment */}
        <div className="h-screen overflow-y-auto">
          <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        </div>

        {/* Contenu principal (Dashboard, Ambulances, etc.) */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 `}>
          <Routes>
            <Route path="/" element={<Dashboard isOpen={isOpen} />} />
            <Route
              path="/ambulances"
              element={<Ambulances isOpen={isOpen} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
