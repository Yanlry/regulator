import React from 'react';
import Regulation from '../components/Regulation/index';

interface RegulationScreenProps {
  isOpen: boolean;
}

const RegulationScreen: React.FC<RegulationScreenProps> = ({ isOpen }) => {
  return <Regulation isOpen={isOpen} />;
};

export default RegulationScreen;
