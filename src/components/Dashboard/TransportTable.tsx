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
  theme: string;
}

const TransportTable: React.FC<TransportTableProps> = ({ transports, theme }) => {
  // Theme-specific class definitions
  const containerClasses = `
    lg:col-span-3 rounded-xl shadow-md p-2
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const tableClasses = `
    min-w-full divide-y
    ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}
  `;

  const headerClasses = `
    sticky top-0 z-10
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
  `;

  const headerCellClasses = `
    px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
  `;

  const bodyClasses = `
    divide-y
    ${theme === 'dark' ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}
  `;

  const cellTextClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}
  `;

  // Function to get appropriate status badge color for the current theme
  const getStatusColor = (originalColor: string) => {
    if (theme === 'dark') {
      // Transform light mode colors to dark mode equivalents
      return originalColor
        .replace('green-100', 'green-900')
        .replace('green-800', 'green-200')
        .replace('red-100', 'red-900')
        .replace('red-800', 'red-200')
        .replace('yellow-100', 'yellow-900')
        .replace('yellow-800', 'yellow-200')
        .replace('blue-100', 'blue-900')
        .replace('blue-800', 'blue-200')
        .replace('gray-100', 'gray-800')
        .replace('gray-800', 'gray-200');
    }
    return originalColor;
  };

  return (
    <div className={containerClasses}>
      {/* Conteneur avec scroll vertical et hauteur max */}
      <div className="overflow-y-auto max-h-96">
        <table className={tableClasses}>
          {/* En-tête de la table FIXE */}
          <thead className={headerClasses}>
            <tr>
              {["Ambulance", "Équipe", "Lieu de départ", "Destination", "RDV", "Statut"].map((header) => (
                <th
                  key={header}
                  className={headerCellClasses}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody className={bodyClasses}>
            {transports.map((transport, index) => (
              <tr key={index} className={theme === 'dark' ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className={`font-medium ${cellTextClasses}`}>{transport.ambulance}</div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${cellTextClasses}`}>{transport.equipe}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${cellTextClasses}`}>{transport.lieuActuel}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${cellTextClasses}`}>{transport.destination}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${cellTextClasses}`}>{transport.rdv}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transport.statusColor)}`}>
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