import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="w-full max-w-2xl mx-auto py-8 px-2 sm:py-12 sm:px-0">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left mb-8 sm:mb-12 flex items-center gap-3">
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
                className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 focus:outline-none gap-2 sm:gap-0"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-left truncate max-w-[70vw] sm:max-w-none">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-medium text-neutral-500 mr-2 sm:mr-0 whitespace-nowrap">
                    {item.date}
                  </span>
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
                  <span className="ml-2 text-2xl select-none">{isOpen ? '−' : '+'}</span>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-10 pb-5 sm:pb-6 pt-0">
                      <ul className="list-disc pl-5 text-sm text-neutral-800 space-y-2">
                        {item.items.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapAccordion;
