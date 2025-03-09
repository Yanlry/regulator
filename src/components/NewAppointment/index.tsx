import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Appointment, NewAppointmentProps } from './types';
import Header from './Header';
import VehicleTypeSelector from './VehiculeTypeSelector';
import PatientInfo from './PatientInfo';
import PickupDetails from './PickupDetails';
import DestinationDetails from './DestinationDetails';
import TransportDetails from './TransportDetails';
import AppointmentSummary from './AppointementSummary';
import { Menu, ArrowLeft } from 'lucide-react';


interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    position: 'relative' as const
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-3 right-3 z-10 bg-white hover:bg-gray-100 rounded-full p-2 cursor-move shadow-sm"
        title="Déplacer cette section"
      >
        <Menu size={18} className="text-gray-500" />
      </div>
      {children}
    </div>
  );
};


interface ComponentOrder {
  id: string;
  name: string;
}


const NewAppointment: React.FC<NewAppointmentProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<'form' | 'summary'>('form');
  const [appointment, setAppointment] = useState<Appointment>({
    vehicleType: 'ambulance', 
    patient: {
      id: '',
      name: '',
      phone: '',
      insuranceNumber: '',
      mobility: 'walking'
    },
    pickup: {
      address: '',
      date: '',
      time: '',
      notes: ''
    },
    destination: {
      address: '',
      notes: '',
      service: '',
      room: '',
      contactPerson: '',
      contactPhone: ''
    },
    returnTrip: false,
    returnTime: '',
    urgencyLevel: 'normal',
    transportFormStatus: 'ready',
    requiredEquipment: [],
    additionalNotes: '',
  });
 
  const [componentsOrder, setComponentsOrder] = useState<ComponentOrder[]>([
    { id: 'vehicle', name: 'Type de véhicule' },
    { id: 'locations', name: 'Lieux de départ et d\'arrivée' },
    { id: 'patient', name: 'Information patient' },
    { id: 'transport', name: 'Détails du transport' },
  ]);
 
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
 
  const handleDragEnd = useCallback((event: DragEndEvent): void => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      setComponentsOrder((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);
 

  const handleContinue = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    setCurrentStep('summary'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
 
  const handleBackToForm = useCallback((): void => {
    setCurrentStep('form'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
 
  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Appointment data submitted:', appointment); 
    alert('Rendez-vous créé avec succès!');
    navigate('/appointments');
  }, [appointment, navigate]);

  const handleCancel = useCallback((): void => {
    navigate('/appointments');
  }, [navigate]);

  const renderComponent = useCallback((id: string): React.ReactNode => {
    switch (id) {
      case 'vehicle':
        return (
          <VehicleTypeSelector
            vehicleType={appointment.vehicleType}
            setAppointment={setAppointment}
          />
        );
      case 'locations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PickupDetails 
              pickup={appointment.pickup}
              setAppointment={setAppointment}
            />
            <DestinationDetails 
              destination={appointment.destination}
              setAppointment={setAppointment}
            />
          </div>
        );
      case 'patient':
        return (
          <PatientInfo 
            patient={appointment.patient}
            setAppointment={setAppointment}
          />
        );
      case 'transport':
        return (
          <TransportDetails 
            appointment={appointment}
            setAppointment={setAppointment}
          />
        );
      default:
        return null;
    }
  }, [appointment, setAppointment]);

  return (
    <div className={`transition-all duration-300 bg-gray-100 min-h-screen ${isOpen ? "ml-64" : "ml-16"}`}>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {/* Masquer le bouton de retour en arrière lorsqu'on est à l'étape récapitulative */}
            {currentStep === 'form' && (
              <button 
                onClick={handleCancel}
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Retour à la liste des rendez-vous"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
            )}
            <Header 
              title="Nouveau Rendez-vous de Transport" 
              description="Créez un nouveau rendez-vous de transport en ambulance" 
            />
          </div>
          
          {/* Afficher le bouton de retour au formulaire uniquement à l'étape récapitulative */}
          {currentStep === 'summary' && (
            <button 
              type="button" 
              onClick={handleBackToForm}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour au formulaire
            </button>
          )}
        </div>

        {currentStep === 'form' ? (
          <form onSubmit={handleContinue} className="space-y-6">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={componentsOrder.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-6">
                  {componentsOrder.map((component) => (
                    <SortableItem key={component.id} id={component.id}>
                      {renderComponent(component.id)}
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          
            <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Continuer au récapitulatif
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <AppointmentSummary 
              appointment={appointment} 
              onSubmit={handleSubmit}
            />
            
            {/* Bouton Retour au formulaire déplacé dans l'en-tête */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAppointment;