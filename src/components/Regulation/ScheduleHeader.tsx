import React from 'react';
import { ScheduleHeaderProps } from '../Regulation/types';
import { formatDate } from '../Regulation/utils';
import { Clipboard } from 'lucide-react';

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ tomorrow }) => {
  return (
    <header className="mb-8">
      <div className="flex items-center mb-2">
        <div className="p-2 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
          <Clipboard className="h-6 w-6 text-blue-600" />  
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Régulation</h1>
          <h2 className="text-lg text-gray-600 font-medium flex items-center">
            Planning pour le <span className="text-blue-600 ml-1">{formatDate(tomorrow)}</span>  
          </h2>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ScheduleHeader);