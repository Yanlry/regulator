import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Résumé de la journée</h1>
        <p className="text-gray-500">Supervision des transports - {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      <div className="flex items-center gap-4">
        <input type="text" placeholder="Rechercher..." className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </div>
      </div>
    </div>
  );
};

export default Header;