import { useState, useEffect } from "react";
import {
  Truck,
  Calendar,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Circle,
  Cog,
  Disc,
  Droplet,
  Car
} from "lucide-react";

type Ambulance = {
  id: string;
    type: "VSL" | "Ambulance";
  ct: string;
  disponibilite: string;
  pneus: string;
  freins: string;
  derniereVidange: string;
  courroieDistribution: string;
  prochaineRevision: string;
};

const materielAmbulance = [
    { id: 1, nom: "Oxygène médical", datePeremption: "" },
    { id: 2, nom: "Insufflateur manuel (BAVU)", datePeremption: "" },
    { id: 3, nom: "Masques à oxygène (adultes et enfants)", datePeremption: "" },
    { id: 4, nom: "Canules de Guedel", datePeremption: "" },
    { id: 5, nom: "Pansements stériles", datePeremption: "" },
    { id: 6, nom: "Bandes élastiques", datePeremption: "" },
    { id: 7, nom: "Compresses de gaze stériles", datePeremption: "" },
    { id: 8, nom: "Pansements stériles absorbants", datePeremption: "" },
    { id: 9, nom: "Solution antiseptique", datePeremption: "" },
    { id: 10, nom: "Gants chirurgicaux stériles", datePeremption: "" },
    { id: 11, nom: "Gants non stériles à usage unique", datePeremption: "" },
    { id: 12, nom: "Masques de protection respiratoire FFP2", datePeremption: "" },
    { id: 13, nom: "Piles/batteries pour équipements médicaux", datePeremption: "" },
    { id: 14, nom: "Électrodes pour défibrillateur", datePeremption: "" },
  ];
  
  const materielVSL = [
    { id: 1, nom: "Pansements stériles absorbants (20 x 40 cm)", datePeremption: "" },
    { id: 2, nom: "Ruban adhésif parapharmaceutique (2 cm)", datePeremption: "" },
    { id: 3, nom: "Pansements adhésifs assortis", datePeremption: "" },
    { id: 4, nom: "Bandes extensibles (3 m x 10 cm)", datePeremption: "" },
    { id: 5, nom: "Compresses stériles (7,5 cm x 7,5 cm)", datePeremption: "" },
    { id: 6, nom: "Solution antiseptique", datePeremption: "" },
    { id: 7, nom: "Gants chirurgicaux stériles", datePeremption: "" },
    { id: 8, nom: "Gants non stériles à usage unique", datePeremption: "" },
    { id: 9, nom: "Masques de protection respiratoire FFP2", datePeremption: "" },
  ];


const ambulancesData: Ambulance[] = [
    {
      id: "AMB : GP-564-FQ",
      type: "Ambulance",
      ct: "21 Novembre 2025",
      disponibilite: "Disponible",
      pneus: "Bon état",
      freins: "Usure modérée",
      derniereVidange: "20 Janvier 2025",
      courroieDistribution: "À vérifier dans 10 000 km",
      prochaineRevision: "25 Mai 2025",
    },
    {
      id: "AMB : GH-987-HP",
      type: "Ambulance",
      ct: "30 Septembre 2025",
      disponibilite: "Indisponible",
      pneus: "À changer bientôt",
      freins: "Bon état",
      derniereVidange: "23 Janvier 2025",
      courroieDistribution: "Remplacement prévu dans 5 000 km",
      prochaineRevision: "02 Juin 2025",
    },
    {
      id: "AMB : BV-123-XZ",
      type: "Ambulance",
      ct: "12 Décembre 2026",
      disponibilite: "Disponible",
      pneus: "Neufs",
      freins: "Remplacés récemment",
      derniereVidange: "10 Février 2025",
      courroieDistribution: "Bonne condition",
      prochaineRevision: "15 Juillet 2025",
    },
    {
      id: "AMB : ZZ-777-AB",
      type: "Ambulance",
      ct: "05 Mars 2025",
      disponibilite: "En maintenance",
      pneus: "Usure avancée",
      freins: "À remplacer",
      derniereVidange: "05 Décembre 2024",
      courroieDistribution: "À vérifier",
      prochaineRevision: "20 Avril 2025",
    },
    {
      id: "VSL : YY-444-CD",
      type: "VSL",
      ct: "18 Juin 2025",
      disponibilite: "Disponible",
      pneus: "État moyen",
      freins: "Disques neufs",
      derniereVidange: "07 Mars 2025",
      courroieDistribution: "Remplacement prévu",
      prochaineRevision: "10 Septembre 2025",
    },
    {
      id: "VSL : XX-333-EF",
      type: "VSL",
      ct: "01 Février 2026",
      disponibilite: "Disponible",
      pneus: "Bon état",
      freins: "Usure normale",
      derniereVidange: "28 Février 2025",
      courroieDistribution: "Bonne condition",
      prochaineRevision: "05 Octobre 2025",
    },
    {
      id: "VSL : AA-111-GH",
      type: "VSL",
      ct: "10 Octobre 2026",
      disponibilite: "En mission",
      pneus: "Bon état",
      freins: "À surveiller",
      derniereVidange: "02 Avril 2025",
      courroieDistribution: "Récent changement",
      prochaineRevision: "12 Décembre 2025",
    },
    {
      id: "VSL : BB-222-IJ",
      type: "VSL",
      ct: "25 Juillet 2025",
      disponibilite: "Indisponible",
      pneus: "À remplacer bientôt",
      freins: "Disques endommagés",
      derniereVidange: "15 Janvier 2025",
      courroieDistribution: "Usure normale",
      prochaineRevision: "08 Août 2025",
    },
    {
      id: "VSL : CC-555-KL",
      type: "VSL",
      ct: "17 Mai 2026",
      disponibilite: "Disponible",
      pneus: "Bon état",
      freins: "Nouveaux",
      derniereVidange: "18 Février 2025",
      courroieDistribution: "À surveiller",
      prochaineRevision: "28 Novembre 2025",
    },
    {
      id: "VSL : DD-888-MN",
      type: "VSL",
      ct: "03 Avril 2025",
      disponibilite: "En réparation",
      pneus: "Fortement usés",
      freins: "Défaillants",
      derniereVidange: "11 Décembre 2024",
      courroieDistribution: "Doit être changée",
      prochaineRevision: "18 Mai 2025",
    },
  ];

const Revision = ({ isOpen }: { isOpen: boolean }) => {
    const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null);
    const [materielObligatoire, setMaterielObligatoire] = useState(materielAmbulance);
    const [datesPeremption, setDatesPeremption] = useState<Record<number, string>>({});
    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState<string>("");
  
    useEffect(() => {
      if (selectedAmbulance) {
        setMaterielObligatoire(selectedAmbulance.type === "VSL" ? materielVSL : materielAmbulance);
      }
    }, [selectedAmbulance]);
  
    useEffect(() => {
      setDatesPeremption(
        materielObligatoire.reduce((acc, item) => {
          acc[item.id] = "";
          return acc;
        }, {} as Record<number, string>)
      );
    }, [materielObligatoire]);
  
    const handleEditClick = (field: keyof Ambulance) => {
      if (editingField === null) {
        const confirmEdit = confirm("Voulez-vous modifier cette information ?");
        if (confirmEdit) {
          setEditingField(field);
          if (selectedAmbulance) {
            setTempValue(selectedAmbulance[field]);
          }
        }
      }
    };
  
    const handleChange = (field: keyof Ambulance, value: string) => {
      setSelectedAmbulance((prev) => (prev ? { ...prev, [field]: value } : prev));
    };
  
    const handleCancel = () => {
      setEditingField(null);
      setTempValue("");
    };
  
    const handleSave = (field: keyof Ambulance) => {
      handleChange(field, tempValue);
      setEditingField(null);
      setTempValue("");
    };
  
    const handleDateChange = (id: number, date: string) => {
      setDatesPeremption((prev) => ({
        ...prev,
        [id]: date,
      }));
    };

  return (
<div
  className={`transition-all duration-300 h-screen flex overflow-hidden ${
    isOpen ? "ml-64" : "ml-16"
  }`}
>

  {/* Conteneur principal scrollable */}
  <div className="flex-1 h-full flex flex-col overflow-y-auto p-6 bg-gray-100">
    {!selectedAmbulance ? (
      <div className="text-center text-gray-500 text-lg font-medium">
        Sélectionnez une ambulance pour voir les détails
      </div>
    ) : (
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🚑 Détails de {selectedAmbulance.id}
        </h2>
        <div className="grid grid-cols-2 gap-6 p-4">
          {[
            {
              label: "Pneus",
              field: "pneus",
              icon: <Circle size={16} className="text-blue-500" />,
            },
            {
              label: "Freins",
              field: "freins",
              icon: <Disc size={16} className="text-red-500" />,
            },
            {
              label: "Dernière vidange",
              field: "derniereVidange",
              icon: <Droplet size={16} className="text-yellow-500" />,
            },
            {
              label: "Courroie distribution",
              field: "courroieDistribution",
              icon: <Cog size={16} className="text-gray-500" />,
            },
            {
              label: "Prochaine révision",
              field: "prochaineRevision",
              icon: <Calendar size={16} className="text-green-500" />,
            },
            {
              label: "Prochain contrôle technique",
              field: "ct",
              icon: <ShieldCheck size={16} className="text-purple-500" />,
            },
          ].map(({ label, field, icon }) => (
            <div
              key={field}
              className="flex items-center gap-3 border-b border-gray-200 pb-2"
            >
              <span className="text-lg">{icon}</span>
              {editingField === field ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="text-sm text-gray-800 border-b border-gray-400 focus:border-blue-500 transition-all w-full outline-none"
                  />
                  <Check
                    size={18}
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleSave(field as keyof Ambulance)}
                  />
                  <X
                    size={18}
                    className="text-red-500 cursor-pointer"
                    onClick={handleCancel}
                  />
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-md font-bold text-gray-900">
                    {label}
                  </span>
                  <span
                    className="text-sm text-gray-500 cursor-pointer transition-all hover:text-blue-600"
                    onClick={() =>
                      handleEditClick(field as keyof Ambulance)
                    }
                  >
                    {selectedAmbulance[field as keyof Ambulance]}
                  </span>
                </div>
              )}
              {editingField !== field && (
                <Edit2
                  size={16}
                  className="text-gray-400 cursor-pointer ml-2 hover:text-blue-500 transition-all"
                  onClick={() => handleEditClick(field as keyof Ambulance)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Problèmes signalés */}
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-red-600">
            ⚠️ Problèmes signalés
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Première vitesse ne passe pas bien</li>
            <li>Problème de frein arrière</li>
          </ul>
        </div>

        {/* Matériel manquant */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold text-yellow-600">
            📋 Matériel à ajouter
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Brancard non conforme</li>
            <li>Trousse de secours manquante</li>
          </ul>
        </div>

        {/* Péremption du matériel */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
        Péremption du matériel
      </h3>
      <div className="mt-2 space-y-2">
        {materielObligatoire.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg border shadow-sm"
          >
            <span className="text-sm font-medium text-gray-700">{item.nom}</span>
            <input
              type="date"
              className="border rounded-lg p-2 text-sm"
              value={datesPeremption[item.id]}
              onChange={(e) => handleDateChange(item.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
      </div>
    )}
  </div>

  {/* Sidebar des ambulances avec overflow-y-auto */}
{/* Sidebar des véhicules avec overflow-y-auto */}
<div className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto h-full">
  {/* Liste des Ambulances */}
  <h2 className="text-lg font-bold text-gray-800 mb-4">🚑 Liste des ambulances</h2>
  {ambulancesData
    .filter((vehicule) => vehicule.type === "Ambulance")
    .map((ambulance) => (
      <div
        key={ambulance.id}
        className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center gap-3 cursor-pointer hover:bg-gray-200 mb-2"
        onClick={() => setSelectedAmbulance(ambulance)}
      >
        <Truck size={24} className="text-blue-600" />
        <span className="font-semibold text-gray-800">{ambulance.id}</span>
      </div>
    ))}

  {/* Liste des VSL */}
  <h2 className="text-lg font-bold text-gray-800 mt-6 mb-4">🚗 Liste des VSL</h2>
  {ambulancesData
    .filter((vehicule) => vehicule.type === "VSL")
    .map((vsl) => (
      <div
        key={vsl.id}
        className="bg-gray-100 p-3 rounded-lg shadow-md flex items-center gap-3 cursor-pointer hover:bg-gray-200 mb-2"
        onClick={() => setSelectedAmbulance(vsl)}
      >
        <Car size={24} className="text-green-600" />
        <span className="font-semibold text-gray-800">{vsl.id}</span>
      </div>
    ))}
</div>

</div>
  );
};

export default Revision;

