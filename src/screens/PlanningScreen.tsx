import Planning from '../components/Planning';

interface PlanningScreenProps {
  isOpen: boolean;
}

const PlanningScreen: React.FC<PlanningScreenProps> = ({ isOpen }) => {
  return <Planning isOpen={isOpen} />;
};


export default PlanningScreen;