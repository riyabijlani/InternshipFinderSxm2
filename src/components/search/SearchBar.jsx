
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({ searchTerm, onSearchChange, placeholder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Search className="h-5 w-5 text-stone-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder || "Search companies, industries, or positions..."}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-12 pr-4 py-3 h-12 text-lg border-stone-200 focus:border-[#C19A6B] focus:ring-2 focus:ring-[#AF6E4D]/20 rounded-xl shadow-sm transition-all duration-200 bg-white"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <MapPin className="h-5 w-5 text-[#AF6E4D]" />
      </div>
    </motion.div>
  );
}














