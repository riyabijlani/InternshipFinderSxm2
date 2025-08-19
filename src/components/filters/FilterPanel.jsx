
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const industries = ["Tourism & Hospitality", "Banking & Finance", "Healthcare", "Education", "Government", "Retail", "Technology", "Construction", "Legal Services", "Real Estate", "Transportation", "Media & Communications", "Non-Profit", "Other"];
const locations = ["Philipsburg", "Simpson Bay", "Cole Bay", "Cay Bay", "Maho", "Oyster Pond", "Dawn Beach", "Point Blanche", "Dutch Quarter", "Saunders", "Other"];
const companySizes = ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"];

export default function FilterPanel({ filters, onFilterChange, onClearFilters }) {
  const activeFilterCount = Object.values(filters).filter(value => value !== "all" && value !== "").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-stone-150 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-stone-600" />
          <h3 className="font-semibold text-stone-800">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="bg-[#DEB887]/30 text-[#8B6F47] border border-[#D2B48C]">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-stone-500 hover:text-[#AF6E4D]"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Industry</label>
          <Select
            value={filters.industry || "all"}
            onValueChange={(value) => onFilterChange("industry", value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Location</label>
          <Select
            value={filters.location || "all"}
            onValueChange={(value) => onFilterChange("location", value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Company Size</label>
          <Select
            value={filters.company_size || "all"}
            onValueChange={(value) => onFilterChange("company_size", value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-stone-200"
          >
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value && value !== "all") {
                  return (
                    <Badge
                      key={key}
                      variant="outline"
                      className="bg-[#DEB887]/20 text-[#654321] border-[#D2B48C] hover:bg-[#DEB887]/40"
                    >
                      {value}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-[#8B4513]"
                        onClick={() => onFilterChange(key, "all")}
                      />
                    </Badge>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

