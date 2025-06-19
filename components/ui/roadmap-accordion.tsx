import React, { useState } from 'react';

interface RoadmapAccordionEntry {
  title: string;
  date: string;
  percent: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  icon: React.ReactNode;
  items: string[];
}

const statusColors: Record<string, string> = {
  Completed: 'bg-black text-white',
  'In Progress': 'bg-gray-100 text-black',
  Planned: 'bg-gray-100 text-black',
};

export const RoadmapAccordion = ({ data }: { data: RoadmapAccordionEntry[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="w-full font-inter max-w-[80%] mx-auto py-12 px-2 md:px-0">
      <h2 className="text-4xl md:text-5xl font-bold text-left mb-12 flex items-center gap-3">
        Roadmap
      </h2>
      <div className="flex flex-col gap-3">
        {data.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`border rounded-xl transition-all duration-200 ${isOpen ? 'shadow-lg border-black' : 'border-neutral-200'} bg-white`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 focus:outline-none"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 p-1 flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                    {item.icon}
                  </span>
                  <span className="text-lg md:text-xl font-semibold text-left">{item.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-neutral-500 mr-2">{item.date}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[item.status]}`}
                  >
                    {item.percent === 100
                      ? '100%'
                      : item.status === 'Completed'
                        ? '100%'
                        : item.status === 'Planned'
                          ? 'Planned'
                          : 'In Progress'}
                  </span>
                  <span className="ml-2 text-2xl">{isOpen ? '−' : '+'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-10 pb-6 pt-0">
                  <ul className="list-disc pl-5 text-sm text-neutral-800 space-y-2">
                    {item.items.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapAccordion;
