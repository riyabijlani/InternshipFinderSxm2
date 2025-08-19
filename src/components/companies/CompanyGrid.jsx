import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyCard from "./CompanyCard";
import { Building2, SearchX } from "lucide-react";

export default function CompanyGrid({ companies, isLoading, searchTerm, filters }) {
  const hasActiveFilters = Object.values(filters).some(value => value !== "all" && value !== "");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-xl shadow-md p-6 h-80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="mt-6 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          {searchTerm || hasActiveFilters ? (
            <SearchX className="w-12 h-12 text-gray-400" />
          ) : (
            <Building2 className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {searchTerm || hasActiveFilters ? "No companies found" : "No companies yet"}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {searchTerm || hasActiveFilters 
            ? "Try adjusting your search or filters to find more internship opportunities."
            : "Companies will appear here once they're added to the platform."
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="wait">
        {companies.map((company, index) => (
          <CompanyCard
            key={company.id}
            company={company}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
