import React, { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TransportVolumeChartProps {
  selectedPeriod: string;
}

const TransportVolumeChart: React.FC<TransportVolumeChartProps> = ({
  selectedPeriod,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setContainerHeight = useState(0)[1];

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        setContainerHeight(entries[0].contentRect.height);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const transportData = {
    "Aujourd'hui": [
      { hour: "6h", count: 2, previousCount: 1 },
      { hour: "7h", count: 3, previousCount: 2 },
      { hour: "8h", count: 5, previousCount: 4 },
      { hour: "9h", count: 8, previousCount: 6 },
      { hour: "10h", count: 6, previousCount: 7 },
      { hour: "11h", count: 7, previousCount: 5 },
      { hour: "12h", count: 4, previousCount: 5 },
      { hour: "13h", count: 3, previousCount: 3 },
      { hour: "14h", count: 5, previousCount: 4 },
      { hour: "15h", count: 7, previousCount: 6 },
      { hour: "16h", count: 9, previousCount: 7 },
      { hour: "17h", count: 6, previousCount: 5 },
    ],
    "Cette semaine": [
      { hour: "Lun", count: 30, previousCount: 28 },
      { hour: "Mar", count: 42, previousCount: 38 },
      { hour: "Mer", count: 38, previousCount: 34 },
      { hour: "Jeu", count: 45, previousCount: 40 },
      { hour: "Ven", count: 50, previousCount: 45 },
      { hour: "Sam", count: 28, previousCount: 25 },
      { hour: "Dim", count: 35, previousCount: 30 },
    ],
    "Ce mois": [
      { hour: "Semaine 1", count: 200, previousCount: 180 },
      { hour: "Semaine 2", count: 220, previousCount: 210 },
      { hour: "Semaine 3", count: 240, previousCount: 215 },
      { hour: "Semaine 4", count: 190, previousCount: 200 },
    ],
  };

  type Period = "Aujourd'hui" | "Cette semaine" | "Ce mois";
  const hourlyData =
    transportData[selectedPeriod as Period] || transportData["Aujourd'hui"];

  const totalTransports = hourlyData.reduce((sum, item) => sum + item.count, 0);
  const totalPreviousTransports = hourlyData.reduce(
    (sum, item) => sum + (item.previousCount || 0),
    0
  );
  const percentageChange = (
    ((totalTransports - totalPreviousTransports) / totalPreviousTransports) *
    100
  ).toFixed(1);

  const peakHour = [...hourlyData].sort((a, b) => b.count - a.count)[0];

  const dataWithGrowth = hourlyData.map((item) => ({
    ...item,
    growth: (
      ((item.count - (item.previousCount || 0)) / (item.previousCount || 1)) *
      100
    ).toFixed(0),
  }));

  interface CustomTooltipProps {
    active: boolean;
    payload: { value: number }[] | undefined;
    label: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const currentValue = payload[0].value;
      const previousValue = payload[1]?.value || 0;
      const growth = (
        ((currentValue - previousValue) / previousValue) *
        100
      ).toFixed(1);

      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-blue-600 font-semibold">
            {currentValue} transports
          </p>
          <p className="text-gray-500 text-xs">
            Période précédente: {previousValue}
          </p>
          <p
            className={`text-xs font-medium ${
              Number(growth) >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {Number(growth) >= 0 ? "+" : ""}
            {growth}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col p-1">
      <div className="flex-shrink-0 flex justify-between items-center mb-2">
        <div
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            Number(percentageChange) >= 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {Number(percentageChange) >= 0 ? "+" : ""}
          {percentageChange}%
        </div>
      </div>

      <div className="flex-grow" style={{ minHeight: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataWithGrowth}
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide={true} />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <Tooltip
              content={<CustomTooltip active={false} payload={[]} label="" />}
            />
            <Area
              type="monotone"
              dataKey="previousCount"
              stroke="#94A3B8"
              fillOpacity={1}
              fill="url(#colorPrevious)"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorCount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-shrink-0 mt-4 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-800">{totalTransports}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Pic d'activité</p>
            <p className="text-lg font-bold text-gray-800">{peakHour.hour}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Moyenne par heure</p>
            <p className="text-lg font-bold text-gray-800">
              {Math.round(totalTransports / hourlyData.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportVolumeChart;
