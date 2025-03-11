import Localisation from "../components/Localisation";

interface LocalisationScreenProps {
  isOpen: boolean;
}

const LocalisationScreen: React.FC<LocalisationScreenProps> = ({ isOpen }) => {
  return <Localisation isOpen={isOpen} />;
};

export default LocalisationScreen;