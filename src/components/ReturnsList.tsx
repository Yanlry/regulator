import { Timer, ChevronRight } from "lucide-react";

interface ReturnsListProps {
  title: string;
  count: number;
  description: string;
  iconColor: string;
  bgColor: string;
  patients: { name: string; location: string; badgeColor: string; status: string }[];
}

const ReturnsList: React.FC<ReturnsListProps> = ({ title, count, description, iconColor, bgColor, patients }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-start justify-between border-b border-gray-100">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{count}</h3>
          <p className={`${iconColor} text-sm mt-1`}>{description}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Timer size={24} className={iconColor} />
        </div>
      </div>

      {/* Liste des patients */}
      <div className="max-h-64 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {patients.map((patient, index) => (
            <div key={index} className="p-4 hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{patient.name}</h4>
                  <p className="text-sm text-gray-600">{patient.location}</p>
                </div>
                <span className={`${patient.badgeColor} text-xs px-2 py-1 rounded-full font-medium`}>
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-100">
        <a href="#" className={`${iconColor} text-sm font-medium flex items-center justify-center`}>
          Voir tous les {title.toLowerCase()}
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ReturnsList;