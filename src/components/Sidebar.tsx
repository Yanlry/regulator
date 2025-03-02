import { Home, Calendar, Users, MapPin, Activity, Bell, PlusCircle, List, Menu, LogOut, Truck } from 'lucide-react';


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray-900 text-white shadow-lg transition-all duration-300 ${isOpen ? "w-64 p-4" : "w-16 p-2"}`}>
      
      {/* Bouton pour ouvrir/fermer la sidebar */}
      <div className="flex items-center justify-start gap-3 mb-6">
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        {isOpen && <h1 className="text-xl font-bold">RÉGULATOR</h1>}
      </div>

      {/* Barre de recherche */}
      {isOpen && (
        <div className="mb-4">
          <input type="text" placeholder="Rechercher..." className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}

      {/* Sections de navigation */}
      <div className="mb-6">
        {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Navigation</h2>}
        <nav className="space-y-2">
          {[{ icon: Home, label: "Dashboard" }, { icon: Calendar, label: "Planning" }, { icon: Users, label: "Équipes" }].map((item, index) => (
            <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

 {/* 🚑 Gestion des véhicules */}
 <div className="mb-6">
        {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Gestion des vehicules</h2>}
        <nav className="space-y-2">
          {[{ icon: Truck, label: "Mes ambulances" }, { icon: MapPin, label: "Localisation" }].map((item, index) => (
            <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="mb-6">
        {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Gestion des patients</h2>}
        <nav className="space-y-2">
          {[{ icon: PlusCircle, label: "Nouveau rendez-vous" }, { icon: List, label: "Liste des patients" }].map((item, index) => (
            <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="mb-12">
        {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Outils</h2>}
        <nav className="space-y-2">
          {[{ icon: MapPin, label: "Carte" }, { icon: Activity, label: "Rapports" }, { icon: Bell, label: "Notifications" }].map((item, index) => (
            <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
              <item.icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>
            {/* Bouton de déconnexion */}
            <div className="mt-auto">
        <button
          onClick={() => console.log("Déconnexion")}
          className="flex items-center justify-center gap-3 w-full p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
        >
          <LogOut size={20} />
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;