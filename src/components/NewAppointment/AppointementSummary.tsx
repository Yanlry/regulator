import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { User, MapPin, Calendar, Clock, Truck, CheckCircle, Navigation, Phone, Car, Ambulance } from 'lucide-react';
import { Appointment } from './types';

interface AppointmentSummaryProps {
  appointment: Appointment;
  onSubmit: (e: React.FormEvent) => void;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ appointment, onSubmit }) => {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Dynamic theming
  const containerClasses = theme === 'dark'
    ? 'p-6 bg-gray-800 rounded-xl shadow-md border border-gray-700 text-gray-100'
    : 'p-6 bg-white rounded-xl shadow-md border border-gray-100';

  const headerClasses = theme === 'dark'
    ? 'flex items-center mb-6 pb-3 border-b border-gray-700'
    : 'flex items-center mb-6 pb-3 border-b border-gray-100';

  const checkIconClasses = theme === 'dark'
    ? 'p-2 bg-green-900 rounded-full mr-3'
    : 'p-2 bg-green-50 rounded-full mr-3';

  const checkIconColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';

  const titleClasses = theme === 'dark'
    ? 'text-xl font-semibold text-gray-100'
    : 'text-xl font-semibold text-gray-800';

  return (
    <section className={containerClasses}>
      <div className={headerClasses}>
        <div className={checkIconClasses}>
          <CheckCircle className={checkIconColor} size={22} />
        </div>
        <h2 className={titleClasses}>Récapitulatif du rendez-vous</h2>
      </div>
      
      <div className="space-y-5">
        {/* Type de véhicule */}
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-indigo-50'} p-4 rounded-lg`}>
          <div className="flex items-start">
            {appointment.vehicleType === 'ambulance' ? (
              <Ambulance className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} mt-1`} size={18} />
            ) : (
              <Car className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} mt-1`} size={18} />
            )}
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Type de véhicule
              </h3>
              <p className={`mt-1 text-sm font-medium ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>
                {appointment.vehicleType === 'ambulance' ? 'Ambulance' : 'Véhicule Sanitaire Léger (VSL)'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Informations patient */}
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'} p-4 rounded-lg`}>
          <div className="flex items-start">
            <User className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} mt-1`} size={18} />
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Informations patient
              </h3>
              <div className="mt-2 text-sm">
                <p className={`font-medium ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                  {appointment.patient.name || 'Nom non spécifié'}
                </p>
                {appointment.patient.phone && (
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tél: {appointment.patient.phone}
                  </p>
                )}
                {appointment.patient.insuranceNumber && (
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    N° Assurance: {appointment.patient.insuranceNumber}
                  </p>
                )}
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Mobilité: {
                    appointment.patient.mobility === 'walking' ? 'Marchant' :
                    appointment.patient.mobility === 'wheelchair' ? 'Fauteuil roulant' :
                    appointment.patient.mobility === 'stretcher' ? 'Brancard' : 'Marche assistée'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Itinéraire */}
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex items-start">
            <MapPin className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`} size={18} />
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Itinéraire
              </h3>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    Départ
                  </h4>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                    {appointment.pickup.address || 'Adresse non spécifiée'}
                  </p>
                  <div className="flex items-center text-sm mt-1">
                    <Calendar className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mr-1`} size={14} />
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatDate(appointment.pickup.date)}
                    </span>
                    <Clock className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} ml-3 mr-1`} size={14} />
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {appointment.pickup.time || 'Heure non spécifiée'}
                    </span>
                  </div>
                  {appointment.pickup.notes && (
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500 italic' : 'text-gray-600 italic'} mt-1`}>
                      "{appointment.pickup.notes}"
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className={`text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    Arrivée
                  </h4>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : ''}`}>
                    {appointment.destination.address || 'Adresse non spécifiée'}
                  </p>
                  
                  {/* Afficher service et chambre s'ils existent */}
                  {(appointment.destination.service || appointment.destination.room) && (
                    <div className="flex items-center mt-1">
                      <Navigation className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mr-1`} size={14} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {appointment.destination.service && `Service: ${appointment.destination.service}`}
                        {appointment.destination.service && appointment.destination.room && ' - '}
                        {appointment.destination.room && `Chambre: ${appointment.destination.room}`}
                      </span>
                    </div>
                  )}
                  
                  {/* Afficher contact et téléphone s'ils existent */}
                  {(appointment.destination.contactPerson || appointment.destination.contactPhone) && (
                    <div className="flex items-center mt-1">
                      <Phone className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mr-1`} size={14} />
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {appointment.destination.contactPerson && `Contact: ${appointment.destination.contactPerson}`}
                        {appointment.destination.contactPerson && appointment.destination.contactPhone && ' - '}
                        {appointment.destination.contactPhone && `Tél: ${appointment.destination.contactPhone}`}
                      </span>
                    </div>
                  )}
                  
                  {appointment.destination.notes && (
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500 italic' : 'text-gray-600 italic'} mt-1`}>
                      "{appointment.destination.notes}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Détails du transport */}
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex items-start">
            <Truck className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`} size={18} />
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                Détails du transport
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Type:
                  </span>
                  <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                    {appointment.returnTrip ? 'Aller-retour' : 'Aller simple'}
                  </span>
                </div>
                
                {appointment.returnTrip && (
                  <div>
                    <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Retour à:
                    </span>
                    <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                      {appointment.returnTime || 'Non spécifié'}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Priorité:
                  </span>
                  <span className={`ml-2 text-sm ${
                    appointment.urgencyLevel === 'smur' || appointment.urgencyLevel === 'urgence' 
                      ? (theme === 'dark' ? 'text-red-400' : 'text-red-600 font-medium') : 
                    appointment.urgencyLevel === 'medecin' 
                      ? (theme === 'dark' ? 'text-orange-400' : 'text-orange-600') : ''
                  }`}>
                    {appointment.urgencyLevel === 'normal' ? 'Transport programmé' : 
                    appointment.urgencyLevel === 'medecin' ? 'Appel médecin' : 
                    appointment.urgencyLevel === 'urgence' ? 'S.A.M.U' : 
                    appointment.urgencyLevel === 'smur' ? 'S.M.U.R' : ''}
                  </span>
                </div>
                
                <div>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Bon de transport:
                  </span>
                  <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                    {appointment.transportFormStatus === 'ready' ? 'Déjà établi' : 
                     appointment.transportFormStatus === 'collect' ? 'À récupérer à l\'hôpital' : 
                     appointment.transportFormStatus === 'samu' ? 'Mission SAMU - facturation directe' :
                     'En attente avec le médecin'}
                  </span>
                </div>
                
                <div>
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Équipement:
                  </span>
                  <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                    {appointment.requiredEquipment && appointment.requiredEquipment.length > 0 ? 
                      appointment.requiredEquipment.map(eq => {
                        switch(eq) {
                          case 'oxygen': return 'Oxygène';
                          case 'wheelchair': return 'Fauteuil roulant';
                          case 'stretcher': return 'Brancard spécial';
                          case 'bariatric': return 'Équipement bariatrique';
                          default: return eq;
                        }
                      }).join(', ') : 'Aucun équipement spécifique'
                    }
                  </span>
                </div>
              </div>
              
              {appointment.additionalNotes && (
                <div className="mt-3">
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} flex items-center`}>
                    Notes internes (non visibles par le patient):
                    <span className={`ml-1 text-xs ${theme === 'dark' ? 'text-red-400' : 'text-red-500'} font-normal`}>
                      (visible uniquement par l'équipe)
                    </span>
                  </span>
                  <p className={`text-sm mt-1 p-2 rounded border ${theme === 'dark' ? 'bg-gray-800 border-red-900 text-red-400' : 'bg-white border-red-100 text-red-800'}`}>
                    {appointment.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
        <button 
          type="submit"
          onClick={onSubmit}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white 
            ${theme === 'dark' 
              ? 'bg-green-800 hover:bg-green-700 focus:ring-green-700' 
              : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} 
            focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Confirmer et créer
        </button>
      </div>
    </section>
  );
};

export default AppointmentSummary;