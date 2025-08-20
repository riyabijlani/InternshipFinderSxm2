import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalendarView() {
  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar & Deadlines</h1>
            <p className="text-gray-600">Keep track of your internship journey timeline.</p>
          </div>
        </div>
      </motion.div>

      <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-white/50">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
        <p className="text-gray-500">Important dates and deadlines will appear here.</p>
      </div>
    </div>
  );
}















