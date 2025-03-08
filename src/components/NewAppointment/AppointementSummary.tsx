import React from 'react';
import { User, MapPin, Calendar, Clock, Truck, CheckCircle, Navigation, Phone, Car, Ambulance } from 'lucide-react';
import { Appointment } from './types';

interface AppointmentSummaryProps {
  appointment: Appointment;
  onSubmit: (e: React.FormEvent) => void;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ appointment, onSubmit }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <div className="p-2 bg-green-50 rounded-full mr-3">
          <CheckCircle className="text-green-600" size={22} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Récapitulatif du rendez-vous</h2>
      </div>
      
      <div className="space-y-5">
        {/* Type de véhicule */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-start">
            {appointment.vehicleType === 'ambulance' ? (
              <Ambulance className="text-indigo-600 mt-1" size={18} />
            ) : (
              <Car className="text-indigo-600 mt-1" size={18} />
            )}
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Type de véhicule</h3>
              <p className="mt-1 text-sm font-medium text-indigo-700">
                {appointment.vehicleType === 'ambulance' ? 'Ambulance' : 'Véhicule Sanitaire Léger (VSL)'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Informations patient */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <User className="text-blue-600 mt-1" size={18} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Informations patient</h3>
              <div className="mt-2 text-sm">
                <p className="font-medium">{appointment.patient.name || 'Nom non spécifié'}</p>
                {appointment.patient.phone && (
                  <p className="text-gray-600">Tél: {appointment.patient.phone}</p>
                )}
                {appointment.patient.insuranceNumber && (
                  <p className="text-gray-600">N° Assurance: {appointment.patient.insuranceNumber}</p>
                )}
                <p className="text-gray-600 mt-1">
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
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <MapPin className="text-gray-600 mt-1" size={18} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Itinéraire</h3>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-600 uppercase">Départ</h4>
                  <p className="text-sm font-medium">{appointment.pickup.address || 'Adresse non spécifiée'}</p>
                  <div className="flex items-center text-sm mt-1">
                    <Calendar className="text-gray-500 mr-1" size={14} />
                    <span className="text-gray-600">{formatDate(appointment.pickup.date)}</span>
                    <Clock className="text-gray-500 ml-3 mr-1" size={14} />
                    <span className="text-gray-600">{appointment.pickup.time || 'Heure non spécifiée'}</span>
                  </div>
                  {appointment.pickup.notes && (
                    <p className="text-xs text-gray-600 mt-1 italic">"{appointment.pickup.notes}"</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-600 uppercase">Arrivée</h4>
                  <p className="text-sm font-medium">{appointment.destination.address || 'Adresse non spécifiée'}</p>
                  
                  {/* Afficher service et chambre s'ils existent */}
                  {(appointment.destination.service || appointment.destination.room) && (
                    <div className="flex items-center mt-1">
                      <Navigation className="text-gray-500 mr-1" size={14} />
                      <span className="text-xs text-gray-600">
                        {appointment.destination.service && `Service: ${appointment.destination.service}`}
                        {appointment.destination.service && appointment.destination.room && ' - '}
                        {appointment.destination.room && `Chambre: ${appointment.destination.room}`}
                      </span>
                    </div>
                  )}
                  
                  {/* Afficher contact et téléphone s'ils existent */}
                  {(appointment.destination.contactPerson || appointment.destination.contactPhone) && (
                    <div className="flex items-center mt-1">
                      <Phone className="text-gray-500 mr-1" size={14} />
                      <span className="text-xs text-gray-600">
                        {appointment.destination.contactPerson && `Contact: ${appointment.destination.contactPerson}`}
                        {appointment.destination.contactPerson && appointment.destination.contactPhone && ' - '}
                        {appointment.destination.contactPhone && `Tél: ${appointment.destination.contactPhone}`}
                      </span>
                    </div>
                  )}
                  
                  {appointment.destination.notes && (
                    <p className="text-xs text-gray-600 mt-1 italic">"{appointment.destination.notes}"</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Détails du transport */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <Truck className="text-gray-600 mt-1" size={18} />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Détails du transport</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">Type:</span>
                  <span className="ml-2 text-sm">{appointment.returnTrip ? 'Aller-retour' : 'Aller simple'}</span>
                </div>
                
                {appointment.returnTrip && (
                  <div>
                    <span className="text-xs font-medium text-gray-500">Retour à:</span>
                    <span className="ml-2 text-sm">{appointment.returnTime || 'Non spécifié'}</span>
                  </div>
                )}
                
                <div>
                  <span className="text-xs font-medium text-gray-500">Priorité:</span>
                  <span className={`ml-2 text-sm ${
                    appointment.urgencyLevel === 'smur' || appointment.urgencyLevel === 'urgence' ? 'text-red-600 font-medium' : 
                    appointment.urgencyLevel === 'medecin' ? 'text-orange-600' : ''
                  }`}>
                    {appointment.urgencyLevel === 'normal' ? 'Transport programmé' : 
                    appointment.urgencyLevel === 'medecin' ? 'Appel médecin' : 
                    appointment.urgencyLevel === 'urgence' ? 'S.A.M.U' : 
                    appointment.urgencyLevel === 'smur' ? 'S.M.U.R' : ''}
                  </span>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-gray-500">Bon de transport:</span>
                  <span className="ml-2 text-sm">
                    {appointment.transportFormStatus === 'ready' ? 'Déjà établi' : 
                     appointment.transportFormStatus === 'collect' ? 'À récupérer à l\'hôpital' : 
                     appointment.transportFormStatus === 'samu' ? 'Mission SAMU - facturation directe' :
                     'En attente avec le médecin'}
                  </span>
                </div>
                
                <div>
                  <span className="text-xs font-medium text-gray-500">Équipement:</span>
                  <span className="ml-2 text-sm">
                    {appointment.requiredEquipment && appointment.requiredEquipment.length > 0 ? 
                      appointment.requiredEquipment.map(eq => {
                        switch(eq) {
                          case 'oxygen': return 'Oxygène';
                          case 'wheelchair': return 'Chaise portoire';
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
                  <span className="text-xs font-medium text-gray-500 flex items-center">
                    Notes internes (non visibles par le patient):
                    <span className="ml-1 text-xs text-red-500 font-normal">(visible uniquement par l'équipe)</span>
                  </span>
                  <p className="text-sm mt-1 bg-white p-2 rounded border border-red-100 text-red-800">
                    {appointment.additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
        <button 
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Confirmer et créer
        </button>
      </div>
    </section>
  );
};

export default AppointmentSummary;