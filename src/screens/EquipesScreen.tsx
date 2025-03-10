import Equipes from "../components/Equipes";

interface EquipesScreenProps {
  isOpen: boolean;
}

const EquipesScreen: React.FC<EquipesScreenProps> = ({isOpen}) => {

  return <Equipes isOpen={isOpen} />;
};

export default EquipesScreen;
