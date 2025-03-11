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
import LoadingSpinner from "../../common/LoadingSpinner";
import { useTheme } from "../../contexts/ThemeContext";
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
  theme,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  theme: string;
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

  const dragHandleClasses = `
    absolute top-3 right-3 z-10 p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-grab
    ${theme === "dark" ? "bg-gray-700" : "bg-white"}
  `;

  const dragHandleIconClasses = `
    ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
  `;

  const widgetClasses = `
    h-full w-full rounded-lg shadow overflow-hidden flex flex-col
    ${theme === "dark" ? "bg-gray-700" : "bg-white"}
  `;

  return (
    <div ref={setNodeRef} style={style} className={`group h-full ${className}`}>
      <div className={dragHandleClasses} {...attributes} {...listeners}>
        <GripVertical size={16} className={dragHandleIconClasses} />
      </div>
      <div className={widgetClasses} style={{ minHeight }}>
        {children}
      </div>
    </div>
  );
}

function AdaptiveWidgetContent({
  children,
  title,
  id,
  theme,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
  theme: string;
}) {
  const headerClasses = `
    flex justify-between items-center p-4 border-b
    ${theme === "dark" ? "border-gray-600" : "border-gray-100"}
  `;

  const titleClasses = `
    text-lg font-bold flex items-center
    ${theme === "dark" ? "text-white" : "text-gray-800"}
  `;

  const contentClasses = `
    flex-grow p-4 overflow-auto
    ${theme === "dark" ? "text-gray-200" : "text-gray-800"}
  `;

  return (
    <div className="flex flex-col h-full w-full" data-widget-id={id}>
      <div className={headerClasses}>
        <h2 className={titleClasses}>
          <span className="bg-blue-500 w-1 h-5 rounded mr-2"></span>
          {title}
        </h2>
      </div>
      <div className={contentClasses}>{children}</div>
    </div>
  );
}

function CombinedReturnsList({ theme }: { theme: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <ReturnsList
        title="Retours en attente"
        count={pendingReturns.length}
        description="Patients en attente"
        iconColor="text-red-600"
        bgColor={theme === "dark" ? "bg-red-900" : "bg-red-100"}
        patients={pendingReturns}
        theme={theme}
      />
      <ReturnsList
        title="Retours à prévoir"
        count={upcomingReturns.length}
        description="Retours programmés dans les 3h"
        iconColor="text-orange-600"
        bgColor={theme === "dark" ? "bg-orange-900" : "bg-orange-100"}
        patients={upcomingReturns}
        theme={theme}
      />
    </div>
  );
}

function WidgetFilter({
  widgets,
  onToggleWidget,
  onToggleAll,
  onClose,
  theme,
}: {
  widgets: DashboardWidget[];
  onToggleWidget: (id: string) => void;
  onToggleAll: (visible: boolean) => void;
  onClose: () => void;
  theme: string;
}) {
  const allVisible = widgets.every((widget) => widget.visible);
  const anyVisible = widgets.some((widget) => widget.visible);

  const containerClasses = `
    absolute top-16 right-4 shadow-lg rounded-lg p-4 w-80 z-20 border
    ${
      theme === "dark"
        ? "bg-gray-700 border-gray-600"
        : "bg-white border-gray-200"
    }
  `;

  const headerClasses = `
    flex justify-between items-center mb-4 pb-2
    ${
      theme === "dark" ? "border-b border-gray-600" : "border-b border-gray-200"
    }
  `;

  const titleClasses = `
    font-medium flex items-center
    ${theme === "dark" ? "text-white" : "text-gray-800"}
  `;

  const closeButtonClasses = `
    ${
      theme === "dark"
        ? "text-gray-400 hover:text-gray-200"
        : "text-gray-500 hover:text-gray-700"
    }
  `;

  const showAllButtonClasses = `
    px-3 py-1.5 text-sm rounded
    ${
      allVisible
        ? theme === "dark"
          ? "bg-blue-700 text-blue-100"
          : "bg-blue-100 text-blue-700"
        : theme === "dark"
        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `;

  const hideAllButtonClasses = `
    px-3 py-1.5 text-sm rounded
    ${
      !anyVisible
        ? theme === "dark"
          ? "bg-blue-700 text-blue-100"
          : "bg-blue-100 text-blue-700"
        : theme === "dark"
        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `;

  const widgetItemClasses = (visible: boolean) => `
    flex items-center p-2 rounded cursor-pointer
    ${visible ? "opacity-100" : "opacity-70"}
    ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-50"}
  `;

  const widgetTextClasses = (visible: boolean) => `
    ${
      visible
        ? theme === "dark"
          ? "text-white"
          : "text-gray-800"
        : theme === "dark"
        ? "text-gray-400"
        : "text-gray-500"
    }
  `;

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h3 className={titleClasses}>
          <Filter size={16} className="mr-2" />
          Affichage des widgets
        </h3>
        <button onClick={onClose} className={closeButtonClasses}>
          <X size={18} />
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => onToggleAll(true)}
          className={showAllButtonClasses}
        >
          <Eye size={14} className="inline mr-1" /> Tout afficher
        </button>
        <button
          onClick={() => onToggleAll(false)}
          className={hideAllButtonClasses}
          disabled={!anyVisible}
        >
          <EyeOff size={14} className="inline mr-1" /> Tout masquer
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className={widgetItemClasses(widget.visible)}
            onClick={() => onToggleWidget(widget.id)}
          >
            {widget.visible ? (
              <CheckSquare size={18} className="mr-3 text-blue-600" />
            ) : (
              <Square
                size={18}
                className={`mr-3 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
            )}
            <span className={widgetTextClasses(widget.visible)}>
              {widget.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = () => {
  // Get current theme from context
  const { theme } = useTheme();

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [showWidgetFilter, setShowWidgetFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données du tableau de bord:",
          error
        );
        setIsLoading(false);
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
      component: <StatCards theme={theme} />,
      order: 1,
      minHeight: "150px",
      visible: true,
    },
    {
      id: "returns-combined",
      title: "Retours",
      size: "full-width",
      component: <CombinedReturnsList theme={theme} />,
      order: 2,
      minHeight: "250px",
      visible: true,
    },
    {
      id: "transport-table",
      title: "Transports de la journée",
      size: "full-width",
      component: <TransportTable transports={transportsData} theme={theme} />,
      order: 3,
      minHeight: "400px",
      visible: true,
    },
    {
      id: "ambulance-tracking",
      title: "Suivi des ambulances",
      size: "three-quarters",
      component: (
        <AmbulanceTracking
          stats={ambulanceStatsData}
          activities={[]}
          theme={theme}
        />
      ),
      order: 4,
      minHeight: "500px",
      visible: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      size: "one-quarter",
      component: <Notifications theme={theme} />,
      order: 5,
      minHeight: "500px",
      visible: true,
    },
    {
      id: "intervention-summary",
      title: "Résumé des interventions",
      size: "half-width",
      component: <InterventionSummary theme={theme} />,
      order: 6,
      minHeight: "350px",
      visible: true,
    },
    {
      id: "transport-volume",
      title: "Volume de transport",
      size: "half-width",
      component: <TransportVolume theme={theme} />,
      order: 7,
      minHeight: "350px",
      visible: true,
    },
    {
      id: "proximity-transport",
      title: "Transports à proximité",
      size: "full-width",
      component: (
        <ProximityTransport transports={transportsData} theme={theme} />
      ),
      order: 8,
      minHeight: "350px",
      visible: true,
    },
  ]);

  // Re-update widget components when theme changes
  useEffect(() => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        // Create a new component instance with the updated theme
        let updatedComponent;
        switch (widget.id) {
          case "stat-cards":
            updatedComponent = <StatCards theme={theme} />;
            break;
          case "returns-combined":
            updatedComponent = <CombinedReturnsList theme={theme} />;
            break;
          case "transport-table":
            updatedComponent = (
              <TransportTable transports={transportsData} theme={theme} />
            );
            break;
          case "ambulance-tracking":
            updatedComponent = (
              <AmbulanceTracking
                stats={ambulanceStatsData}
                activities={[]}
                theme={theme}
              />
            );
            break;
          case "notifications":
            updatedComponent = <Notifications theme={theme} />;
            break;
          case "intervention-summary":
            updatedComponent = <InterventionSummary theme={theme} />;
            break;
          case "transport-volume":
            updatedComponent = <TransportVolume theme={theme} />;
            break;
          case "proximity-transport":
            updatedComponent = (
              <ProximityTransport transports={transportsData} theme={theme} />
            );
            break;
          default:
            updatedComponent = widget.component;
        }
        return { ...widget, component: updatedComponent };
      })
    );
  }, [theme]);

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
                theme={theme}
              >
                {widget.id === "proximity-transport" ? (
                  widget.component
                ) : (
                  <AdaptiveWidgetContent
                    title={widget.title}
                    id={widget.id}
                    theme={theme}
                  >
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

  // Theme-specific classes
  const containerClasses = `
   p-4 w-full transition-all duration-300
    ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}
  `;

  const dashboardContainerClasses = `
    transition-all duration-300 min-h-screen p-4
    ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}
  `;

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen w-full ${containerClasses}`}>
      <div className={dashboardContainerClasses}>
        {/* Header avec bouton de filtre de widgets */}
        <div className="mb-4">
          <Header
            showWidgetFilter={showWidgetFilter}
            setShowWidgetFilter={setShowWidgetFilter}
            theme={theme}
          />

          {/* Filtre de widgets */}
          {showWidgetFilter && (
            <WidgetFilter
              widgets={widgets}
              onToggleWidget={toggleWidgetVisibility}
              onToggleAll={toggleAllWidgetsVisibility}
              onClose={() => setShowWidgetFilter(false)}
              theme={theme}
            />
          )}
        </div>

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
