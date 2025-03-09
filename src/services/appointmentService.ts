import { Appointment, AppointmentStatus, UrgencyLevel, VehicleType } from '../components/Appointments/types';


const generateMockAppointments = (): Appointment[] => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const patients = [
    { name: 'Jean Dupont', phone: '01 23 45 67 89' },
    { name: 'Marie Bernard', phone: '01 98 76 54 32' },
    { name: 'Paul Richard', phone: '06 12 34 56 78' },
    { name: 'Sophie Moreau', phone: '07 65 43 21 09' },
    { name: 'Pierre Lambert', phone: '01 45 67 89 10' },
    { name: 'Nathalie Petit', phone: '06 78 91 23 45' },
    { name: 'Thomas Dubois', phone: '07 12 34 56 78' },
    { name: 'Catherine Martin', phone: '01 56 78 90 12' },
    { name: 'Philippe Leroy', phone: '06 54 32 10 98' },
    { name: 'Isabelle Lefevre', phone: '07 89 01 23 45' },
    { name: 'François Girard', phone: '01 23 45 67 89' },
    { name: 'Sylvie Robert', phone: '06 78 90 12 34' },
    { name: 'Daniel Blanc', phone: '07 65 43 21 09' },
    { name: 'Véronique Michel', phone: '01 90 87 65 43' },
    { name: 'Laurent Roux', phone: '06 12 34 56 78' },
    { name: 'Martine Durand', phone: '07 54 32 10 98' },
    { name: 'André Fournier', phone: '01 67 89 01 23' },
    { name: 'Christine Morel', phone: '06 23 45 67 89' },
    { name: 'Patrick Vincent', phone: '07 90 12 34 56' },
    { name: 'Monique Simon', phone: '01 34 56 78 90' }
  ];
  
  const medicalFacilities = [
    { 
      name: 'Hôpital Saint-Louis', 
      address: '1 Avenue Claude Vellefaux, 75010 Paris',
      services: ['Cardiologie', 'Neurologie', 'Oncologie', 'Pneumologie', 'Urgences']
    },
    { 
      name: 'Hôpital Necker-Enfants malades', 
      address: '149 Rue de Sèvres, 75015 Paris',
      services: ['Pédiatrie', 'Néphrologie', 'Chirurgie', 'Hématologie', 'Urgences pédiatriques']
    },
    { 
      name: 'Hôpital Pitié-Salpêtrière', 
      address: '47-83 Boulevard de l\'Hôpital, 75013 Paris',
      services: ['Cardiologie', 'Neurochirurgie', 'Psychiatrie', 'Rhumatologie', 'Urgences']
    },
    { 
      name: 'Hôpital Européen Georges-Pompidou', 
      address: '20 Rue Leblanc, 75015 Paris',
      services: ['Cardiologie', 'Immunologie', 'Gastro-entérologie', 'Chirurgie vasculaire', 'Urgences']
    },
    { 
      name: 'Hôpital Cochin', 
      address: '27 Rue du Faubourg Saint-Jacques, 75014 Paris',
      services: ['Gynécologie', 'Obstétrique', 'Rhumatologie', 'Médecine interne', 'Urgences']
    },
    { 
      name: 'Clinique des Lilas', 
      address: '41-49 Avenue du Maréchal Juin, 93260 Les Lilas',
      services: ['Orthopédie', 'Chirurgie', 'Rééducation', 'Médecine générale']
    },
    { 
      name: 'Centre de Rééducation', 
      address: '33 Boulevard du Montparnasse, 75006 Paris',
      services: ['Rééducation fonctionnelle', 'Kinésithérapie', 'Ergothérapie', 'Balnéothérapie']
    },
    { 
      name: 'Clinique de l\'Alma', 
      address: '166 Rue de l\'Université, 75007 Paris',
      services: ['Chirurgie', 'Endoscopie', 'Médecine esthétique', 'Consultation']
    }
  ];
  
  const residentialAreas = [
    '15 Rue de Paris, 75001 Paris',
    '25 Avenue Victor Hugo, 75016 Paris',
    '7 Rue de la Pompe, 75116 Paris',
    '42 Boulevard Haussmann, 75009 Paris',
    '18 Rue Oberkampf, 75011 Paris',
    '56 Avenue de la République, 75011 Paris',
    '12 Rue Saint-Maur, 75011 Paris',
    '33 Rue des Martyrs, 75009 Paris',
    '8 Rue de Charonne, 75011 Paris',
    '22 Rue Monge, 75005 Paris',
    '45 Boulevard Saint-Germain, 75005 Paris',
    '17 Avenue de Clichy, 75017 Paris',
    '63 Rue de la Roquette, 75011 Paris',
    '29 Rue du Commerce, 75015 Paris',
    '52 Rue Montorgueil, 75002 Paris',
    '10 Rue de la Butte aux Cailles, 75013 Paris',
    '38 Rue des Abbesses, 75018 Paris',
    '14 Place de la Bastille, 75004 Paris',
    '27 Avenue Parmentier, 75011 Paris',
    '6 Rue de Belleville, 75020 Paris'
  ];
  

  const appointments: Appointment[] = [];
  
  for (let i = 0; i < 3; i++) {
    const hour = 6 + i;
    const formattedHour = String(hour).padStart(2, '0');

    const appointmentsPerHour = Math.floor(Math.random() * 2) + 1;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'confirmed', 'in-progress'];
      if (hour < 8) {
        statusOptions.push('completed', 'completed'); 
      }
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'normal', 'normal', 'low', 'high'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['vsl', 'vsl', 'ambulance', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `AM-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 3; i++) {
    const hour = 9 + i;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 3) + 3;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'confirmed', 'in-progress', 'in-progress'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'normal', 'high', 'high', 'critical', 'low'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['ambulance', 'ambulance', 'vsl', 'vsl', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `MP-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 2; i++) {
    const hour = 12 + i;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 3) + 2;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');

      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'confirmed', 'confirmed', 'in-progress'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'normal', 'normal', 'high', 'low', 'low'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['vsl', 'vsl', 'ambulance', 'taxi', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `MD-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 3; i++) {
    const hour = 14 + i;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 2) + 3;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'pending', 'confirmed', 'in-progress'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'normal', 'high', 'low', 'critical'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['ambulance', 'ambulance', 'vsl', 'vsl', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `AF-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 3; i++) {
    const hour = 17 + i;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 3) + 4;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'pending', 'confirmed', 'in-progress'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'high', 'high', 'critical', 'low'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['ambulance', 'ambulance', 'ambulance', 'vsl', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `EP-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 3; i++) {
    const hour = 20 + i;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 2) + 2;
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['pending', 'pending', 'confirmed'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['normal', 'high', 'high', 'critical'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['ambulance', 'ambulance', 'vsl', 'taxi'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `EV-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  for (let i = 0; i < 7; i++) {
    const hour = (23 + i) % 24;
    const formattedHour = String(hour).padStart(2, '0');
    
    const appointmentsPerHour = Math.floor(Math.random() * 3);
    
    for (let j = 0; j < appointmentsPerHour; j++) {
      const minutesRandom = Math.floor(Math.random() * 60);
      const formattedMinutes = String(minutesRandom).padStart(2, '0');
      
      const patientIndex = Math.floor(Math.random() * patients.length);
      const residentialIndex = Math.floor(Math.random() * residentialAreas.length);
      const facilityIndex = Math.floor(Math.random() * medicalFacilities.length);
      const facility = medicalFacilities[facilityIndex];
      const serviceIndex = Math.floor(Math.random() * facility.services.length);
      
      const statusOptions: AppointmentStatus[] = ['confirmed', 'confirmed', 'in-progress', 'pending'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      const urgencyOptions: UrgencyLevel[] = ['critical', 'critical', 'high', 'high', 'normal'];
      const urgency = urgencyOptions[Math.floor(Math.random() * urgencyOptions.length)];
      
      const vehicleOptions: VehicleType[] = ['ambulance', 'ambulance', 'ambulance', 'vsl'];
      const vehicleType = vehicleOptions[Math.floor(Math.random() * vehicleOptions.length)];
      
      appointments.push({
        id: `NT-${formattedDate}-${formattedHour}${formattedMinutes}-${i * 10 + j}`,
        patientName: patients[patientIndex].name,
        patientPhone: patients[patientIndex].phone,
        vehicleType: vehicleType,
        pickupAddress: residentialAreas[residentialIndex],
        pickupDate: formattedDate,
        pickupTime: `${formattedHour}:${formattedMinutes}`,
        destinationAddress: facility.address,
        destinationService: facility.services[serviceIndex],
        destinationRoom: String(Math.floor(Math.random() * 500) + 100),
        status: status,
        urgencyLevel: urgency
      });
    }
  }
  
  return appointments.sort((a, b) => {
    const timeA = a.pickupTime;
    const timeB = b.pickupTime;
    
    return timeA.localeCompare(timeB);
  });
};

const mockAppointments: Appointment[] = generateMockAppointments();

export const fetchAppointments = async (): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAppointments);
    }, 800);
  });
};

export const fetchAppointmentById = async (id: string): Promise<Appointment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointment = mockAppointments.find(a => a.id === id);
      resolve(appointment || null);
    }, 500);
  });
};

export const createAppointment = async (appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAppointment: Appointment = {
        id: `NEW-${Date.now().toString()}`,  
        ...appointmentData,
      };
      
      mockAppointments.push(newAppointment);
      mockAppointments.sort((a, b) => a.pickupTime.localeCompare(b.pickupTime));
      
      resolve(newAppointment);
    }, 800);
  });
};

export const updateAppointment = async (
  id: string, 
  appointmentData: Partial<Appointment>
): Promise<Appointment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointmentIndex = mockAppointments.findIndex(a => a.id === id);
      if (appointmentIndex === -1) {
        resolve(null);
        return;
      }
      
      const updatedAppointment = {
        ...mockAppointments[appointmentIndex],
        ...appointmentData,
      };
      
      mockAppointments[appointmentIndex] = updatedAppointment;
      
      if (appointmentData.pickupTime) {
        mockAppointments.sort((a, b) => a.pickupTime.localeCompare(b.pickupTime));
      }
      
      resolve(updatedAppointment);
    }, 800);
  });
};


export const deleteAppointment = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointmentIndex = mockAppointments.findIndex(a => a.id === id);
      if (appointmentIndex === -1) {
        resolve(false);
        return;
      }
      
      mockAppointments.splice(appointmentIndex, 1);
      resolve(true);
    }, 800);
  });
};