import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { DashboardProps } from "./types";
import Notifications from "./Notifications";
import TransportVolume from "./TransportVolume";
import AmbulanceTracking from "./AmbulanceTracking";
import StatCards from "./StatCards";
import Header from "./Header";
import ReturnsList from "./ReturnsList";
import TransportTable from "./TransportTable";
import InterventionSummary from "./InterventionSummary";
import ProximityTransport from "./ProximityTransport";
import LoadingSpinner from "../Common/LoadingSpinner";
import {
  GripVertical,
  Eye,
  EyeOff,
  Filter,
  CheckSquare,
  Square,
  X,
} from "lucide-react";

import {
  pendingReturns,
  upcomingReturns,
  transportsData,
  ambulanceStatsData,
} from "./data";

type WidgetSize =
  | "full-width"
  | "three-quarters"
  | "one-quarter"
  | "half-width"
  | "adaptive";

interface DashboardWidget {
  id: string;
  title: string;
  size: WidgetSize;
  component: React.ReactNode;
  order: number;
  minHeight?: string;
  visible: boolean;
}

function SortableWidget({
  id,
  children,
  className = "",
  minHeight = "300px",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} className={`group h-full ${className}`}>
      <div
        className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} className="text-gray-500" />
      </div>
      <div
        className="h-full w-full bg-white rounded-lg shadow overflow-hidden flex flex-col"
        style={{ minHeight }}
      >
        {children}
      </div>
    </div>
  );
}

function AdaptiveWidgetContent({
  children,
  title,
  id,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
}) {
  return (
    <div className="flex flex-col h-full w-full" data-widget-id={id}>
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="bg-blue-500 w-1 h-5 rounded mr-2"></span>
          {title}
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-auto">{children}</div>
    </div>
  );
}

function CombinedReturnsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ReturnsList
        title="Retours en attente"
        count={pendingReturns.length}
        description="Patients en attente"
        iconColor="text-red-600"
        bgColor="bg-red-100"
        patients={pendingReturns}
      />
      <ReturnsList
        title="Retours à prévoir"
        count={upcomingReturns.length}
        description="Retours programmés dans les 3h"
        iconColor="text-orange-600"
        bgColor="bg-orange-100"
        patients={upcomingReturns}
      />
    </div>
  );
}

function WidgetFilter({
  widgets,
  onToggleWidget,
  onToggleAll,
  onClose,
}: {
  widgets: DashboardWidget[];
  onToggleWidget: (id: string) => void;
  onToggleAll: (visible: boolean) => void;
  onClose: () => void;
}) {
  const allVisible = widgets.every((widget) => widget.visible);
  const anyVisible = widgets.some((widget) => widget.visible);

  return (
    <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-20 border border-gray-200">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-medium text-gray-800 flex items-center">
          <Filter size={16} className="mr-2" />
          Affichage des widgets
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => onToggleAll(true)}
          className={`px-3 py-1.5 text-sm rounded ${
            allVisible
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Eye size={14} className="inline mr-1" /> Tout afficher
        </button>
        <button
          onClick={() => onToggleAll(false)}
          className={`px-3 py-1.5 text-sm rounded ${
            !anyVisible
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          disabled={!anyVisible}
        >
          <EyeOff size={14} className="inline mr-1" /> Tout masquer
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={`flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer ${
              widget.visible ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => onToggleWidget(widget.id)}
          >
            {widget.visible ? (
              <CheckSquare size={18} className="mr-3 text-blue-600" />
            ) : (
              <Square size={18} className="mr-3 text-gray-400" />
            )}
            <span
              className={widget.visible ? "text-gray-800" : "text-gray-500"}
            >
              {widget.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [showWidgetFilter, setShowWidgetFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // État pour la gestion du chargement
  useEffect(() => {
    // Simuler le chargement des données du tableau de bord
    const loadDashboardData = async () => {
      try {
        // Simuler le temps nécessaire pour charger toutes les données des widgets
        // Dans un cas réel, cela représenterait les appels API ou les traitements de données
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Une fois les données chargées, désactiver l'état de chargement
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données du tableau de bord:", error);
        setIsLoading(false); // Désactiver le chargement même en cas d'erreur
      }
    };

    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: "stat-cards",
      title: "Statistiques",
      size: "full-width",
      component: <StatCards />,
      order: 1,
      minHeight: "150px",
      visible: true,
    },
    {
      id: "returns-combined",
      title: "Retours",
      size: "full-width",
      component: <CombinedReturnsList />,
      order: 2,
      minHeight: "250px",
      visible: true,
    },
    {
      id: "transport-table",
      title: "Transports de la journée",
      size: "full-width",
      component: <TransportTable transports={transportsData} />,
      order: 3,
      minHeight: "400px",
      visible: true,
    },
    {
      id: "ambulance-tracking",
      title: "Suivi des ambulances",
      size: "three-quarters",
      component: (
        <AmbulanceTracking stats={ambulanceStatsData} activities={[]} />
      ),
      order: 4,
      minHeight: "500px",
      visible: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      size: "one-quarter",
      component: <Notifications />,
      order: 5,
      minHeight: "500px",
      visible: true,
    },
    {
      id: "intervention-summary",
      title: "Résumé des interventions",
      size: "half-width",
      component: <InterventionSummary />,
      order: 6,
      minHeight: "350px",
      visible: true,
    },
    {
      id: "transport-volume",
      title: "Volume de transport",
      size: "half-width",
      component: <TransportVolume />,
      order: 7,
      minHeight: "350px",
      visible: true,
    },
    {
      id: "proximity-transport",
      title: "Transports à proximité",
      size: "full-width",
      component: <ProximityTransport transports={transportsData} />,
      order: 8,
      minHeight: "350px",
      visible: true,
    },
  ]);

  const toggleWidgetVisibility = (id: string) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === id ? { ...widget, visible: !widget.visible } : widget
      )
    );
  };

  const toggleAllWidgetsVisibility = (visible: boolean) => {
    setWidgets(widgets.map((widget) => ({ ...widget, visible })));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const activeItem = items.find((item) => item.id === active.id);
        const overItem = items.find((item) => item.id === over.id);

        if (!activeItem || !overItem) return items;

        const newItems = items.map((item) => {
          if (item.id === active.id) {
            return { ...item, order: overItem.order };
          }
          if (item.id === over.id) {
            return { ...item, order: activeItem.order };
          }
          return item;
        });

        return newItems.sort((a, b) => a.order - b.order);
      });
    }
  };

  const organizeLayoutRows = () => {
    const visibleWidgets = widgets
      .filter((widget) => widget.visible)
      .sort((a, b) => a.order - b.order);

    const rows: DashboardWidget[][] = [];
    let currentRow: DashboardWidget[] = [];
    let currentRowWidth = 0;

    visibleWidgets.forEach((widget) => {
      let widgetWidth = 0;

      switch (widget.size) {
        case "full-width":
          widgetWidth = 4;
          break;
        case "three-quarters":
          widgetWidth = 3;
          break;
        case "half-width":
          widgetWidth = 2;
          break;
        case "one-quarter":
        case "adaptive":
          widgetWidth = 1;
          break;
      }

      if (widget.size === "full-width" || currentRowWidth + widgetWidth > 4) {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowWidth = 0;
        }

        if (widget.size === "full-width") {
          rows.push([widget]);
          return;
        }
      }

      currentRow.push(widget);
      currentRowWidth += widgetWidth;

      if (currentRowWidth === 4) {
        rows.push([...currentRow]);
        currentRow = [];
        currentRowWidth = 0;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const getResponsiveLayout = () => {
    if (windowSize.width < 768) {
      return widgets
        .filter((widget) => widget.visible)
        .sort((a, b) => a.order - b.order)
        .map((widget) => [widget]);
    }

    return organizeLayoutRows();
  };

  const renderWidgetRows = () => {
    const rows = getResponsiveLayout();

    return rows.map((row, rowIndex) => {
      const gridCols = windowSize.width < 768 ? "grid-cols-1" : "grid-cols-4";

      return (
        <div key={`row-${rowIndex}`} className={`grid ${gridCols} gap-4 mb-4`}>
          {row.map((widget) => {
            let colSpanClass =
              windowSize.width < 768 ? "col-span-1" : "col-span-1";

            if (windowSize.width >= 768) {
              switch (widget.size) {
                case "full-width":
                  colSpanClass = "col-span-4";
                  break;
                case "three-quarters":
                  colSpanClass = "col-span-3";
                  break;
                case "half-width":
                  colSpanClass = "col-span-2";
                  break;
                case "one-quarter":
                case "adaptive":
                  colSpanClass = "col-span-1";
                  break;
              }
            }

            return (
              <SortableWidget
                key={widget.id}
                id={widget.id}
                className={`${colSpanClass} h-full`}
                minHeight={widget.minHeight}
              >
                {widget.id === "proximity-transport" ? (
                  widget.component
                ) : (
                  <AdaptiveWidgetContent title={widget.title} id={widget.id}>
                    {widget.component}
                  </AdaptiveWidgetContent>
                )}
              </SortableWidget>
            );
          })}
        </div>
      );
    });
  };

  // Afficher le spinner de chargement avant le rendu du tableau de bord
  if (isLoading) {
    return (
      <div className={`transition-all duration-300 bg-gray-100 min-h-screen ${
        isOpen ? "ml-64" : "ml-16"
      }`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div
        className={`transition-all duration-300 p-4 overflow-y-auto h-screen w-full ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header avec bouton de filtre de widgets */}
        <div className="mb-4">
          <Header
            showWidgetFilter={showWidgetFilter}
            setShowWidgetFilter={setShowWidgetFilter}
          />

          {/* Filtre de widgets */}
          {showWidgetFilter && (
            <WidgetFilter
              widgets={widgets}
              onToggleWidget={toggleWidgetVisibility}
              onToggleAll={toggleAllWidgetsVisibility}
              onClose={() => setShowWidgetFilter(false)}
            />
          )}
        </div>

        {/* Filtre de widgets (doublon - à supprimer) */}
        {showWidgetFilter && (
          <WidgetFilter
            widgets={widgets}
            onToggleWidget={toggleWidgetVisibility}
            onToggleAll={toggleAllWidgetsVisibility}
            onClose={() => setShowWidgetFilter(false)}
          />
        )}

        {/* Widgets réorganisables */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.filter((w) => w.visible).map((w) => w.id)}
            strategy={rectSortingStrategy}
          >
            <div className="space-y-4">{renderWidgetRows()}</div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Dashboard;