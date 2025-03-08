import Ambulances from "../components/Ambulances";

interface AmbulancesScreenProps {
  isOpen: boolean;
}

const AmbulancesScreen: React.FC<AmbulancesScreenProps> = ({isOpen}) => {

  return <Ambulances isOpen={isOpen} />;
};

export default AmbulancesScreen;
