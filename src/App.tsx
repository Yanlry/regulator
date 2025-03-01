import { 
  Ambulance, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Bell, 
  Clock, 
  Users, 
  Activity,
  Home,
  Timer,
  ChevronRight,
  Menu,
  PlusCircle,
  List
} from 'lucide-react';
import AmbulanceMap from './components/AmbulanceMap';
import TransportVolumeChart from './components/TransportVolumeChart';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      

     <div className={`bg-gray-900 text-white shadow-lg transition-all duration-300 ${isOpen ? "w-64 p-4" : "w-16 p-2"}`}>
  
  {/* Bouton pour ouvrir/fermer la sidebar */}
  <div className="flex items-center justify-start gap-3 mb-6">
    <button
      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Menu size={24} />
    </button>
    {isOpen && <h1 className="text-xl font-bold">RÉGULATOR</h1>}
  </div>

  {/* Barre de recherche */}
  {isOpen && (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}

  {/* NAVIGATION */}
  <div className="mb-4">
    {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Navigation</h2>}
    <nav className="space-y-2">
      {[
        { icon: Home, label: "Dashboard" },
        { icon: Calendar, label: "Planning" },
        { icon: Users, label: "Équipes" },
      ].map((item, index) => (
        <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
          <item.icon size={20} />
          {isOpen && <span>{item.label}</span>}
        </a>
      ))}
    </nav>
  </div>

  {/* GESTION DES PATIENTS */}
  <div className="mb-4">
    {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Gestion des Patients</h2>}
    <nav className="space-y-2">
      {[
        { icon: PlusCircle, label: "Nouveau rendez-vous" },
        { icon: List, label: "Liste des patients" },
      ].map((item, index) => (
        <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
          <item.icon size={20} />
          {isOpen && <span>{item.label}</span>}
        </a>
      ))}
    </nav>
  </div>

  {/* OUTILS */}
  <div className="mb-4">
    {isOpen && <h2 className="text-sm font-semibold text-gray-400 mb-2">Outils</h2>}
    <nav className="space-y-2">
      {[
        { icon: MapPin, label: "Carte" },
        { icon: Activity, label: "Rapports" },
        { icon: Bell, label: "Notifications" },
      ].map((item, index) => (
        <a key={index} href="#" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-all">
          <item.icon size={20} />
          {isOpen && <span>{item.label}</span>}
        </a>
      ))}
    </nav>
  </div>
</div>

  
      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 ${
          isOpen ? "w-[calc(100%-16rem)]" : "w-[calc(100%-4rem)]"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Résumé de la journée</h1>
            <p className="text-gray-500">Supervision des transports - {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Retour en attente</p>
              <h3 className="text-3xl font-bold mt-1">4</h3>
              <p className="text-red-500 text-sm mt-1">Attend depuis 1 h 26 min</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
                <Timer size={24} className="text-red-600" />
              </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Ambulances en service</p>
              <h3 className="text-3xl font-bold mt-1">5</h3>
              <p className="text-green-500 text-sm mt-1">3 en charges</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ambulance size={24} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Transports planifiés</p>
              <h3 className="text-3xl font-bold mt-1">28</h3>
              <p className="text-blue-500 text-sm mt-1">8 prévue dans l'heure</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Transports terminés</p>
              <h3 className="text-3xl font-bold mt-1">12</h3>
              <p className="text-green-500 text-sm mt-1">4 en attentes</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>

         
        </div>

        {/* Cartes détaillées pour les retours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Retours en attente */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex items-start justify-between border-b border-gray-100">
              <div>
                <p className="text-gray-500 text-sm">Retours en attente</p>
                <h3 className="text-3xl font-bold mt-1">4</h3>
                <p className="text-blue-500 text-sm mt-1">Patients en attente</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Timer size={24} className="text-red-600" />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-gray-100">
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Martin Dupont</h4>
                      <p className="text-sm text-gray-600">Hôpital de Roubaix - Salle d'attente B</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Attente depuis 45 min</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Sophie Laurent</h4>
                      <p className="text-sm text-gray-600">Clinique St. Michel - Accueil principal</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Attente depuis 30 min</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Jean Moreau</h4>
                      <p className="text-sm text-gray-600">Centre de radiologie - Étage 2</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Attente depuis 20 min</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Marie Petit</h4>
                      <p className="text-sm text-gray-600">Hôpital Central - Service cardiologie</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Attente depuis 15 min</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <a href="#" className="text-blue-600 text-sm font-medium flex items-center justify-center">
                Voir tous les patients en attente
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Retours à prévoir */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex items-start justify-between border-b border-gray-100">
              <div>
                <p className="text-gray-500 text-sm">Retours à prévoir</p>
                <h3 className="text-3xl font-bold mt-1">9</h3>
                <p className="text-orange-500 text-sm mt-1">Retours programmés dans les 3h</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Timer size={24} className="text-orange-600" />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <div className="divide-y divide-gray-100">
                <div className="p-4 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Philippe Dubois</h4>
                      <p className="text-sm text-gray-600">Clinique Saint-Paul, Roubaix</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">Retour prévu à 13h15</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Lucie Mercier</h4>
                      <p className="text-sm text-gray-600">Centre d'imagerie médicale</p>
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Retour prévu à 14h00</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Robert Leroy</h4>
                      <p className="text-sm text-gray-600">Hôpital Central - Service neurologie</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Retour prévu à 14h30</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-orange-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">Émilie Fournier</h4>
                      <p className="text-sm text-gray-600">Clinique St. Michel - Consultation</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Retour prévu à 15h15</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <a href="#" className="text-orange-600 text-sm font-medium flex items-center justify-center">
                Voir tous les retours prévus
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tableau des transports */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tableau des transports de la journée</h2>
              <button className="text-blue-500 hover:text-blue-700">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ambulance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipe</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu actuel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure d'arrivée</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ambulance size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">AMB-101</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Martin D. / Sophie L.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Hôpital Central</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Clinique St. Michel</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">10:30</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        En route
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ambulance size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">AMB-203</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Thomas B. / Julie R.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">23 Rue du Commerce</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Hôpital Central</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">10:45</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Urgence
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ambulance size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">AMB-156</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Pierre M. / Emma T.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Clinique St. Michel</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Centre de Rééducation</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">11:15</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Terminé
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ambulance size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">AMB-118</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Lucas V. / Marie D.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Base centrale</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">45 Avenue des Lilas</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">11:30</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        En attente
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Ambulance size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">AMB-142</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Antoine F. / Clara M.</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Hôpital Central</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">12 Rue des Fleurs</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">12:15</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        Retour prévu
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Suivi des ambulances en temps réel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Suivi des ambulances en temps réel</h2>
              <button className="text-blue-500 hover:text-blue-700">Agrandir</button>
            </div>
            <div className="h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
              <AmbulanceMap />
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-gray-600">Disponible (4)</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-sm text-gray-600">En intervention (5)</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-sm text-gray-600">Urgence (3)</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-gray-400 mr-2"></span>
                <span className="text-sm text-gray-600">En pause (2)</span>
              </div>
            </div>
          </div>

          {/* Volume de transports */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Volume de transports</h2>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Aujourd'hui</option>
                <option>Cette semaine</option>
                <option>Ce mois</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <TransportVolumeChart />
            </div>
          </div>

          {/* Notifications et alertes */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Notifications et alertes</h2>
              <button className="text-blue-500 hover:text-blue-700">Tout marquer comme lu</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-red-50 rounded-lg">
                <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Urgence signalée</h3>
                  <p className="text-sm text-red-700 mt-1">Accident de la route sur A7, km 45. AMB-203 dépêchée sur place.</p>
                  <p className="text-xs text-red-500 mt-1">Il y a 12 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
                  <Clock size={20} className="text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Retard signalé</h3>
                  <p className="text-sm text-yellow-700 mt-1">AMB-101 signale un retard de 15 minutes en raison d'un embouteillage.</p>
                  <p className="text-xs text-yellow-500 mt-1">Il y a 25 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Nouveau transport planifié</h3>
                  <p className="text-sm text-blue-700 mt-1">Transport planifié pour 14h30 de l'Hôpital Central vers la Résidence Les Pins.</p>
                  <p className="text-xs text-blue-500 mt-1">Il y a 42 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-green-50 rounded-lg">
                <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Transport terminé</h3>
                  <p className="text-sm text-green-700 mt-1">AMB-156 a terminé le transport du patient #4582 avec succès.</p>
                  <p className="text-xs text-green-500 mt-1">Il y a 1 heure</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                <div className="flex-shrink-0 bg-orange-100 p-2 rounded-full">
                  <Timer size={20} className="text-orange-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-orange-800">Retour à prévoir</h3>
                  <p className="text-sm text-orange-700 mt-1">Patient #3721 à récupérer à la Clinique St. Michel à 15h30.</p>
                  <p className="text-xs text-orange-500 mt-1">Il y a 35 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Résumé des interventions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Résumé des interventions</h2>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Aujourd'hui</option>
                <option>Cette semaine</option>
                <option>Ce mois</option>
              </select>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Patients transportés</h3>
                  <span className="text-2xl font-bold">58</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">75% de l'objectif quotidien</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Temps moyen par intervention</h3>
                  <span className="text-2xl font-bold">32 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">15% plus rapide que la moyenne</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Satisfaction des patients</h3>
                  <span className="text-2xl font-bold">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Basé sur 42 évaluations</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Taux d'occupation des ambulances</h3>
                  <span className="text-2xl font-bold">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">+5% par rapport à hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;