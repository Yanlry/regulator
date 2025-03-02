const interventionData = [
  {
    label: "Patients transportés",
    value: 58,
    percentage: 75,
    barColor: "bg-blue-600",
    comment: "75% de l'objectif quotidien",
  },
  {
    label: "Temps moyen par intervention",
    value: "32 min",
    percentage: 85,
    barColor: "bg-green-600",
    comment: "15% plus rapide que la moyenne",
  },
  {
    label: "Satisfaction des patients",
    value: "4.8/5",
    percentage: 96,
    barColor: "bg-yellow-500",
    comment: "Basé sur 42 évaluations",
  },
  {
    label: "Taux d'occupation des ambulances",
    value: "87%",
    percentage: 87,
    barColor: "bg-blue-600",
    comment: "+5% par rapport à hier",
  },
];

const InterventionSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Résumé des interventions</h2>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Ce mois</option>
        </select>
      </div>
      <div className="space-y-6">
        {interventionData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
              <span className="text-2xl font-bold">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${item.barColor} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionSummary;