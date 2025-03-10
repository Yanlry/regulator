import React, { useState } from "react";
import { AmbulanceDetailProps, Ambulance } from "../data/types";
import { 
  MapPin, 
  Clock, 
  User, 
  Check, 
  Truck, 
  Phone, 
  Share2,
  AlertCircle,
  Calendar,
  FileText,
  Activity,
  MessageSquare,
  FileCheck,
  AlertTriangle,
} from "lucide-react";

// Extension du type avec informations détaillées
interface ExtendedAmbulanceProps extends AmbulanceDetailProps {
  ambulance: Ambulance & {
    id: string;
    status: string;
    type?: string;
    bonTransportOk?: boolean;
    pointDepart?: string;
    destination?: string;
    heureDepart?: string;
    heureArrivee?: string;
    
    // Informations détaillées
    patientActuel?: {
      nom: string;
      prenom: string;
      age: number;
      sexe: string;
      numeroSecu?: string;
      telephone?: string;
      typeTransport: "Assis" | "Allongé" | "Médicalisé";
      priorite: "P0" | "P1" | "P2" | "P3";
      condition?: string;
      commentaire?: string;
      contactUrgence?: string;
    };
    
    destinationDetails?: {
      service?: string;
      etage?: string;
      contact?: string;
      telephone?: string;
      typeVisite: "Consultation" | "Examen" | "Hospitalisation" | "Sortie" | "Transfert";
      dureePrevue?: string;
      commentaire?: string;
    };
    
    courseSuivante?: {
      depart: string;
      destination: string;
      heure: string;
      patient?: {
        nom: string;
        prenom: string;
        age: number;
        sexe: string;
        typeTransport: "Assis" | "Allongé" | "Médicalisé";
        priorite: "P0" | "P1" | "P2" | "P3";
        condition?: string;
      };
      destinationDetails?: {
        service?: string;
        typeVisite: "Consultation" | "Examen" | "Hospitalisation" | "Sortie" | "Transfert";
      };
    };
    
    chauffeurs?: {
      principal: {
        nom: string;
        prenom: string;
        telephone: string;
        qualification: string[];
        tempsService: string;
        tempsRepos: string;
        coursesJour: number;
      };
      secondaire?: {
        nom: string;
        prenom: string;
        telephone: string;
        qualification: string[];
        tempsService: string;
        tempsRepos: string;
        coursesJour: number;
      };
    };
    
    historiqueCourses?: {
      depart: string;
      destination: string;
      heureDepart: string;
      heureArrivee: string;
      statut: "Terminé" | "Annulé" | "En cours";
      patient?: string;
      patientDetails?: {
        nom: string;
        prenom: string;
        age: number;
        typeTransport: "Assis" | "Allongé" | "Médicalisé";
      };
      typeVisite?: "Consultation" | "Examen" | "Hospitalisation" | "Sortie" | "Transfert";
      commentaire?: string;
      problemesSignales?: boolean;
    }[];
  };
}

const AmbulanceDetail: React.FC<ExtendedAmbulanceProps> = ({ ambulance }) => {
  const [activeTab, setActiveTab] = useState<string>("historique");

  // Configuration des données détaillées
  const extendedAmbulance = {
    ...ambulance,
    type: ambulance.type || "VSL 12",
    bonTransportOk: ambulance.bonTransportOk !== undefined ? ambulance.bonTransportOk : true,
    pointDepart: ambulance.pointDepart || "Hôpital Central",
    
    patientActuel: ambulance.patientActuel || {
      nom: "Leroy",
      prenom: "Marie",
      age: 68,
      sexe: "F",
      numeroSecu: "2 55 12 34 567 890 12",
      telephone: "06 12 34 56 78",
      typeTransport: "Assis",
      priorite: "P3",
      condition: "Stabilisée, mobilité réduite",
      commentaire: "Prévoir assistance à la marche",
      contactUrgence: "M. Leroy (fils): 06 98 76 54 32"
    },
    
    destinationDetails: ambulance.destinationDetails || {
      service: "Cardiologie",
      etage: "3ème étage, aile B",
      contact: "Dr. Martin",
      telephone: "04 92 31 44 55",
      typeVisite: "Consultation",
      dureePrevue: "45 min",
      commentaire: "RDV à 14h30 précises"
    },
    
    chauffeurs: ambulance.chauffeurs || {
      principal: {
        nom: "Dubois",
        prenom: "Jean",
        telephone: "06 12 34 56 78",
        qualification: ["Ambulancier"],
        tempsService: "4h15",
        tempsRepos: "2h19",
        coursesJour: 5
      },
      secondaire: {
        nom: "Martin",
        prenom: "Sophie",
        telephone: "06 98 76 54 32",
        qualification: ["Auxiliaire ambulancier"],
        tempsService: "3h45",
        tempsRepos: "1h",
        coursesJour: 5
      }
    },
    
    courseSuivante: ambulance.courseSuivante || {
      depart: "Centre médical Pasteur",
      destination: "Résidence Les Oliviers",
      heure: "14:30",
      patient: {
        nom: "Bertrand",
        prenom: "Albert",
        age: 82,
        sexe: "M",
        typeTransport: "Assis",
        priorite: "P2",
        condition: "Post-opératoire, fatigué"
      },
      destinationDetails: {
        service: "EHPAD",
        typeVisite: "Sortie"
      }
    },
    
    historiqueCourses: ambulance.historiqueCourses || [
      {
        depart: "Clinique Saint-Joseph",
        destination: "Domicile patient",
        heureDepart: "08:15",
        heureArrivee: "09:00",
        statut: "Terminé",
        patient: "Martinez, P.",
        patientDetails: {
          nom: "Martinez",
          prenom: "Patrick",
          age: 51,
          typeTransport: "Assis"
        },
        typeVisite: "Sortie",
        commentaire: "RAS",
        problemesSignales: false
      },
      {
        depart: "Domicile patient",
        destination: "Centre d'imagerie",
        heureDepart: "10:30",
        heureArrivee: "10:55",
        statut: "Terminé",
        patient: "Dupont, A.",
        patientDetails: {
          nom: "Dupont",
          prenom: "Alice",
          age: 45,
          typeTransport: "Assis"
        },
        typeVisite: "Examen",
        commentaire: "Patiente anxieuse",
        problemesSignales: false
      },
      {
        depart: "Centre d'imagerie",
        destination: "Domicile patient",
        heureDepart: "11:45",
        heureArrivee: "12:15",
        statut: "Terminé",
        patient: "Dupont, A.",
        patientDetails: {
          nom: "Dupont",
          prenom: "Alice",
          age: 45,
          typeTransport: "Assis"
        },
        typeVisite: "Sortie",
        commentaire: "RAS",
        problemesSignales: false
      }
    ]
  };

  // Fonctions utilitaires pour les styles
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "P0":
        return "bg-red-50 text-red-600 border-red-200";
      case "P1":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "P2":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "P3":
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  const getTransportTypeStyle = (type: string) => {
    switch (type) {
      case "Allongé":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Médicalisé":
        return "bg-red-50 text-red-600 border-red-200";
      case "Assis":
      default:
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Terminé":
        return "text-emerald-600";
      case "Annulé":
        return "text-red-600";
      case "En cours":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white shadow overflow-hidden font-sans">
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-2.5 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></span>
            <span className="font-semibold text-gray-900">{ambulance.id}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center px-1.5 py-0.5 bg-gray-100 rounded">
            <Truck size={12} className="mr-1" />
            {extendedAmbulance.type}
          </div>
        </div>
        
        <div className="flex items-center px-2 py-1 rounded-full bg-green-50 border border-green-100">
          {extendedAmbulance.bonTransportOk ? (
            <Check size={14} className="text-green-600 mr-1" />
          ) : (
            <AlertCircle size={14} className="text-red-600 mr-1" />
          )}
          <span className="text-xs font-medium text-green-700">Bon OK</span>
        </div>
      </div>

      {/* Navigation par onglets - design amélioré */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          className={`py-2 px-3 text-xs font-medium ${
            activeTab === "current"
              ? "text-blue-600 border-b-2 border-blue-500 bg-white"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Course
        </button>
        <button
          className={`py-2 px-3 text-xs font-medium ${
            activeTab === "next"
              ? "text-blue-600 border-b-2 border-blue-500 bg-white"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("next")}
        >
          Prochaine
        </button>
        <button
          className={`py-2 px-3 text-xs font-medium ${
            activeTab === "team"
              ? "text-blue-600 border-b-2 border-blue-500 bg-white"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("team")}
        >
          Équipe
        </button>
        <button
          className={`py-2 px-3 text-xs font-medium ${
            activeTab === "historique"
              ? "text-blue-600 border-b-2 border-blue-500 bg-white"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("historique")}
        >
          Historique
        </button>
      </div>

      {/* Contenu avec style amélioré */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Historique des courses - Style amélioré */}
        {activeTab === "historique" && (
          <div className="flex flex-col h-full">
            <div className="px-3 py-2 bg-white border-b border-gray-200">
              <span className="text-xs font-medium text-gray-700 flex items-center">
                Historique des courses
              </span>
            </div>
            
            <div className="flex-1 overflow-auto divide-y divide-gray-100">
              {extendedAmbulance.historiqueCourses?.map((course, index) => (
                <div key={index} className="px-3 py-2.5 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1.5 text-gray-400" />
                      <span className="font-medium">{course.heureDepart} - {course.heureArrivee}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-xs font-medium ${getStatusStyle(course.statut)}`}>
                        {course.statut}
                      </span>
                      
                      {course.typeVisite && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                          {course.typeVisite}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex mb-2">
                    <div className="flex flex-col items-center mr-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-400 border border-white ring-1 ring-blue-100"></div>
                      <div className="w-0.5 h-8 bg-gray-200"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 border border-white ring-1 ring-emerald-100"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{course.depart}</div>
                      <div className="text-sm font-medium text-gray-800 mt-1.5">{course.destination}</div>
                    </div>
                  </div>
                  
                  {course.patientDetails && (
                    <div className="flex justify-between items-center mt-1.5 px-2 py-1.5 bg-gray-50 rounded-md">
                      <div className="flex items-center text-xs text-gray-700">
                        <User size={12} className="mr-1.5 text-gray-500" />
                        <span>
                          {course.patientDetails.prenom} {course.patientDetails.nom}
                          <span className="text-gray-500">, {course.patientDetails.age} ans</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">
                          {course.patientDetails.typeTransport}
                        </span>
                        
                        {course.commentaire && (
                          <div className="ml-1.5">
                            {course.problemesSignales ? (
                              <AlertTriangle size={12} className="text-amber-500" />
                            ) : (
                              <FileCheck size={12} className="text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {course.commentaire && course.commentaire !== "RAS" && (
                    <div className="mt-1.5 text-xs text-gray-600 bg-amber-50 border border-amber-100 p-1.5 rounded">
                      <MessageSquare size={12} className="inline-block mr-1 text-amber-500" />
                      {course.commentaire}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Course actuelle - Style amélioré */}
        {activeTab === "current" && (
          <div className="divide-y divide-gray-100 bg-white">
            <div className="p-3">
              <div className="mb-2 text-xs font-medium text-gray-700 flex items-center">
                <Calendar size={14} className="mr-1.5 text-blue-500" />
                Course actuelle
              </div>
              
              {/* Trajet avec style amélioré */}
              <div className="flex space-x-3 mb-3">
                <div className="flex flex-col items-center mr-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-100 z-10"></div>
                  <div className="w-0.5 h-16 bg-gradient-to-b from-blue-300 to-emerald-300"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100 z-10"></div>
                </div>
                
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <MapPin size={12} className="mr-1 text-blue-500" />
                      Point de départ
                    </div>
                    <div className="font-medium text-gray-800">{extendedAmbulance.pointDepart}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <MapPin size={12} className="mr-1 text-emerald-500" />
                      Destination
                    </div>
                    <div className="font-medium text-gray-800">{ambulance.destination || "Non définie"}</div>
                    {extendedAmbulance.destinationDetails && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {extendedAmbulance.destinationDetails.service}, {extendedAmbulance.destinationDetails.etage}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 flex items-center justify-end">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    Horaires
                  </div>
                  <div className="text-sm font-medium">
                    {ambulance.heureDepart || "--:--"}
                    <span className="text-gray-400 mx-1">→</span>
                    {ambulance.heureArrivee || "--:--"}
                  </div>
                  {extendedAmbulance.destinationDetails && (
                    <div className="text-xs text-gray-500 mt-2 flex items-center justify-end">
                      <Clock size={10} className="mr-1" />
                      {extendedAmbulance.destinationDetails.dureePrevue}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Patient - Style amélioré */}
            <div className="p-3">
              <div className="flex justify-between mb-2">
                <div className="text-xs font-medium text-gray-700 flex items-center">
                  <User size={14} className="mr-1.5 text-blue-500" />
                  Patient
                </div>
                
                <div className="flex space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPriorityStyle(extendedAmbulance.patientActuel.priorite)}`}>
                    {extendedAmbulance.patientActuel.priorite}
                  </span>
                  
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getTransportTypeStyle(extendedAmbulance.patientActuel.typeTransport)}`}>
                    {extendedAmbulance.patientActuel.typeTransport}
                  </span>
                </div>
              </div>
              
              <div className="px-3 py-2 bg-gray-50 rounded-md">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {extendedAmbulance.patientActuel.prenom} {extendedAmbulance.patientActuel.nom}
                  <span className="text-gray-500 font-normal ml-1">
                    ({extendedAmbulance.patientActuel.age} ans)
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-1 mt-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone size={12} className="mr-1.5 text-gray-400" />
                    <span>{extendedAmbulance.patientActuel.telephone}</span>
                  </div>
                  
                  {extendedAmbulance.patientActuel.condition && (
                    <div className="flex items-start text-xs text-gray-600 mt-1">
                      <Activity size={12} className="mr-1.5 mt-0.5 text-blue-500" />
                      <span>{extendedAmbulance.patientActuel.condition}</span>
                    </div>
                  )}
                  
                  {extendedAmbulance.patientActuel.commentaire && (
                    <div className="flex items-start text-xs text-gray-600 mt-1 px-2 py-1 bg-blue-50 rounded border border-blue-100">
                      <MessageSquare size={12} className="mr-1.5 mt-0.5 text-blue-500" />
                      <span>{extendedAmbulance.patientActuel.commentaire}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Détails destination - Style amélioré */}
            <div className="p-3">
              <div className="text-xs font-medium text-gray-700 flex items-center mb-2">
                <FileText size={14} className="mr-1.5 text-blue-500" />
                Détails RDV
              </div>
              
              <div className="px-3 py-2 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block mb-0.5">Contact:</span>
                    <span className="font-medium text-gray-800">{extendedAmbulance.destinationDetails.contact}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 block mb-0.5">Type:</span>
                    <span className="font-medium text-gray-800">{extendedAmbulance.destinationDetails.typeVisite}</span>
                  </div>
                  
                  {extendedAmbulance.destinationDetails.commentaire && (
                    <div className="col-span-2 flex items-start mt-1 px-2 py-1 bg-amber-50 rounded border border-amber-100">
                      <AlertCircle size={12} className="mr-1.5 mt-0.5 text-amber-500 flex-shrink-0" />
                      <span className="text-gray-700">{extendedAmbulance.destinationDetails.commentaire}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Prochaine course - Style amélioré */}
        {activeTab === "next" && (
          <div className="divide-y divide-gray-100 bg-white">
            <div className="p-3">
              <div className="mb-2 text-xs font-medium text-gray-700 flex items-center">
                <Calendar size={14} className="mr-1.5 text-purple-500" />
                Prochaine course
              </div>
              
              {/* Trajet */}
              <div className="flex space-x-3 mb-3">
                <div className="flex flex-col items-center mr-1">
                  <div className="w-3 h-3 rounded-full bg-purple-400 ring-2 ring-purple-100 z-10"></div>
                  <div className="w-0.5 h-16 bg-gradient-to-b from-purple-300 to-purple-400"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-100 z-10"></div>
                </div>
                
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <MapPin size={12} className="mr-1 text-purple-400" />
                      Point de départ
                    </div>
                    <div className="font-medium text-gray-800">{extendedAmbulance.courseSuivante.depart}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <MapPin size={12} className="mr-1 text-purple-600" />
                      Destination
                    </div>
                    <div className="font-medium text-gray-800">{extendedAmbulance.courseSuivante.destination}</div>
                    {extendedAmbulance.courseSuivante.destinationDetails && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {extendedAmbulance.courseSuivante.destinationDetails.service}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 flex items-center justify-end">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    Heure prévue
                  </div>
                  <div className="text-sm font-medium text-purple-700">
                    {extendedAmbulance.courseSuivante.heure}
                  </div>
                  {extendedAmbulance.courseSuivante.destinationDetails && (
                    <div className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full mt-2 inline-block">
                      {extendedAmbulance.courseSuivante.destinationDetails.typeVisite}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Patient suivant */}
            {extendedAmbulance.courseSuivante.patient && (
              <div className="p-3">
                <div className="flex justify-between mb-2">
                  <div className="text-xs font-medium text-gray-700 flex items-center">
                    <User size={14} className="mr-1.5 text-purple-500" />
                    Patient
                  </div>
                  
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPriorityStyle(extendedAmbulance.courseSuivante.patient.priorite)}`}>
                      {extendedAmbulance.courseSuivante.patient.priorite}
                    </span>
                    
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getTransportTypeStyle(extendedAmbulance.courseSuivante.patient.typeTransport)}`}>
                      {extendedAmbulance.courseSuivante.patient.typeTransport}
                    </span>
                  </div>
                </div>
                
                <div className="px-3 py-2 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    {extendedAmbulance.courseSuivante.patient.prenom} {extendedAmbulance.courseSuivante.patient.nom}
                    <span className="text-gray-500 font-normal ml-1">
                      ({extendedAmbulance.courseSuivante.patient.age} ans)
                    </span>
                  </div>
                  
                  {extendedAmbulance.courseSuivante.patient.condition && (
                    <div className="mt-2 text-xs text-gray-600 px-2 py-1 bg-purple-50 rounded border border-purple-100">
                      <Activity size={12} className="inline-block mr-1.5 text-purple-500" />
                      <span>{extendedAmbulance.courseSuivante.patient.condition}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Équipage - Style amélioré */}
        {activeTab === "team" && (
          <div className="divide-y divide-gray-100 bg-white">
            <div className="p-3">
              <div className="flex justify-between mb-2">
                <div className="text-xs font-medium text-gray-700 flex items-center">
                  <User size={14} className="mr-1.5 text-blue-500" />
                  Chauffeur principal
                </div>
                
                <div className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                  {extendedAmbulance.chauffeurs.principal.coursesJour} courses
                </div>
              </div>
              
              <div className="px-3 py-2.5 bg-gray-50 rounded-md">
                <div className="text-base font-medium text-gray-800 mb-1">
                  {extendedAmbulance.chauffeurs.principal.prenom} {extendedAmbulance.chauffeurs.principal.nom}
                </div>
                
                <div className="flex items-center mb-2 text-xs text-gray-600">
                  <Phone size={12} className="mr-1.5" />
                  <span className="underline">{extendedAmbulance.chauffeurs.principal.telephone}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mt-3 border-t border-gray-200 pt-2">
                  <div>
                    <span className="text-gray-500 block mb-0.5">Heures à 25% :</span>
                    <span className="font-medium text-gray-800">{extendedAmbulance.chauffeurs.principal.tempsService}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 block mb-0.5">Heures à 50% :</span>
                    <span className="font-medium text-gray-800">{extendedAmbulance.chauffeurs.principal.tempsRepos}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <span className="text-gray-500 block mb-1 text-xs">Qualifications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {extendedAmbulance.chauffeurs.principal.qualification.map((qual, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {extendedAmbulance.chauffeurs.secondaire && (
              <div className="p-3">
                <div className="flex justify-between mb-2">
                  <div className="text-xs font-medium text-gray-700 flex items-center">
                    <User size={14} className="mr-1.5 text-blue-500" />
                    Chauffeur secondaire
                  </div>
                  
                  <div className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                    {extendedAmbulance.chauffeurs.secondaire.coursesJour} courses
                  </div>
                </div>
                
                <div className="px-3 py-2.5 bg-gray-50 rounded-md">
                  <div className="text-base font-medium text-gray-800 mb-1">
                    {extendedAmbulance.chauffeurs.secondaire.prenom} {extendedAmbulance.chauffeurs.secondaire.nom}
                  </div>
                  
                  <div className="flex items-center mb-2 text-xs text-gray-600">
                    <Phone size={12} className="mr-1.5" />
                    <span className="underline">{extendedAmbulance.chauffeurs.secondaire.telephone}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs mt-3 border-t border-gray-200 pt-2">
                    <div>
                      <span className="text-gray-500 block mb-0.5">Heure à 25% :</span>
                      <span className="font-medium text-gray-800">{extendedAmbulance.chauffeurs.secondaire.tempsService}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 block mb-0.5">Heures à 50% :</span>
                      <span className="font-medium text-gray-800">{extendedAmbulance.chauffeurs.secondaire.tempsRepos}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <span className="text-gray-500 block mb-1 text-xs">Qualifications:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {extendedAmbulance.chauffeurs.secondaire.qualification.map((qual, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Boutons d'action en bas - Style amélioré */}
      <div className="flex p-2 border-t border-gray-200 bg-white">
        <button className="flex-1 bg-blue-600 text-white rounded-md py-2 mr-2 flex justify-center items-center text-sm font-medium shadow-sm">
          <Phone size={16} className="mr-2" />
          Contacter
        </button>
        <button className="flex-1 bg-emerald-600 text-white rounded-md py-2 flex justify-center items-center text-sm font-medium shadow-sm">
          <Share2 size={16} className="mr-2" />
          Assigner
        </button>
      </div>
    </div>
  );
};

export default AmbulanceDetail;