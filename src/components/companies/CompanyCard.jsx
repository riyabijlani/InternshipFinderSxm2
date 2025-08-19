import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const industryColors = {
  "Tourism & Hospitality": "bg-orange-100 text-orange-800 border-orange-200",
  "Banking & Finance": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Healthcare": "bg-rose-100 text-rose-800 border-rose-200",
  "Education": "bg-amber-100 text-amber-800 border-amber-200",
  "Government": "bg-slate-100 text-slate-800 border-slate-200",
  "Retail": "bg-pink-100 text-pink-800 border-pink-200",
  "Technology": "bg-blue-100 text-blue-800 border-blue-200",
  "Construction": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Legal Services": "bg-purple-100 text-purple-800 border-purple-200",
  "Real Estate": "bg-lime-100 text-lime-800 border-lime-200",
  "Transportation": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Media & Communications": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "Non-Profit": "bg-teal-100 text-teal-800 border-teal-200",
  "Other": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function CompanyCard({ company, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-150 overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-stone-200">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-lg text-stone-900 mb-1 line-clamp-2 leading-tight">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-stone-500 mb-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end shrink-0">
              {company.is_featured && (
                <Badge className="bg-gradient-to-r from-[#C19A6B] to-[#AF6E4D] text-white border-0 text-xs px-2 py-1">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-4 flex-grow">
          <div className="space-y-4">
            <Badge
              className={`${industryColors[company.industry] || industryColors.Other} border text-sm px-3 py-1`}
            >
              {company.industry}
            </Badge>

            <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
              {company.description}
            </p>

            <div className="flex items-center justify-between text-sm text-stone-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{company.company_size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{company.internship_opportunities?.length || 0} positions</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Link to={createPageUrl(`CompanyProfile?id=${company.id}`)} className="w-full">
            <Button 
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white transition-colors group"
              size="sm"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
