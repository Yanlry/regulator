import React from 'react';
import { ScheduleHeaderProps } from '../Regulation/types';
import { formatDate } from '../Regulation/utils';

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ tomorrow }) => {
  return (
    <div className="mb-5">
      <h1 className="text-xl font-bold text-gray-800 mb-1 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
        </svg>
        Régulation des Ambulances
      </h1>
      <div className="flex items-center text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-blue-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="font-medium">
          Planning pour{" "}
          <span className="text-blue-600">{formatDate(tomorrow)}</span>
        </h2>
      </div>
    </div>
  );
};

export default React.memo(ScheduleHeader);