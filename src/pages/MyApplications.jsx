import React from 'react';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function MyApplications() {
  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-sm">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">My Applications</h1>
            <p className="text-stone-600">Track the status of your internship submissions.</p>
          </div>
        </div>
      </motion.div>

      <div className="text-center py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white/50">
        <Briefcase className="w-12 h-12 text-stone-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-stone-800 mb-2">Start Your Internship Journey</h3>
        <p className="text-stone-500 mb-6">
          Apply to companies and track your application status here.
        </p>
        <Link to={createPageUrl("Home")}>
          <Button className="bg-[#8B4513] hover:bg-[#A0522D] text-white">Find an Internship</Button>
        </Link>
      </div>
    </div>
  );
}















