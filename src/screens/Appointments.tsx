import React from 'react';
import Appointments from '../components/Appointments';

interface AppointmentsScreenProps {
  isOpen: boolean;
}

const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({ isOpen }) => {
  return <Appointments isOpen={isOpen} />;
};

export default AppointmentsScreen;