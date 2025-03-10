import Dashboard from "../components/Dashboard";

interface DashboardScreenProps {
  isOpen: boolean;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ isOpen }) => {

  return <Dashboard isOpen={isOpen} />;
};

export default DashboardScreen;
