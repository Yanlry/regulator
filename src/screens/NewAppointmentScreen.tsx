
import React from 'react';
import NewAppointment from '../components/NewAppointment';

interface NewAppointmentScreenProps {
  isOpen: boolean;
}

const NewAppointmentScreen: React.FC<NewAppointmentScreenProps> = ({ isOpen }) => {
  return <NewAppointment isOpen={isOpen} />;
};

export default NewAppointmentScreen;