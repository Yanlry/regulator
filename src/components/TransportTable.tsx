
interface Transport {
  ambulance: string;
  equipe: string;
  lieuActuel: string;
  destination: string;
  rdv: string;
  status: string;
  statusColor: string;
}

interface TransportTableProps {
  transports: Transport[];
}

const TransportTable: React.FC<TransportTableProps> = ({ transports }) => {
  return (
    <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Transports de la journée</h2>
        <button className="text-blue-500 hover:text-blue-700">Voir tout</button>
      </div>

      {/* Conteneur avec scroll vertical et hauteur max */}
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          {/* En-tête de la table FIXE */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {["Ambulance", "Équipe", "Lieu de départ", "Destination", "RDV", "Statut"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody className="bg-white divide-y divide-gray-200">
            {transports.map((transport, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{transport.ambulance}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transport.equipe}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transport.lieuActuel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transport.destination}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transport.rdv}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transport.statusColor}`}>
                    {transport.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransportTable;