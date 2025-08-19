import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your professional information and preferences.</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
        <div className="text-center py-12">
          <UserIcon className="w-16 h-16 text-stone-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-stone-800 mb-2">Profile Management</h3>
          <p className="text-stone-600">
            Create and manage your professional profile to apply for internships.
          </p>
        </div>
      </div>
    </div>
  );
}










