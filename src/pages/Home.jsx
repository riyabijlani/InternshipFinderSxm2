import React, { useState, useEffect, useMemo } from "react";
import { Company } from "@/api/entities";
import SearchBar from "../components/search/SearchBar";
import FilterPanel from "../components/filters/FilterPanel";
import CompanyGrid from "../components/companies/CompanyGrid";
import { motion } from "framer-motion";
import { Alert } from "../components/common/Alert";
import { MapPin, Users, Briefcase, Star } from "lucide-react";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    industry: "all",
    location: "all",
    company_size: "all"
  });

  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const companyData = await Company.list("-created_date");
            setCompanies(companyData);
        } catch (error) {
            console.error("Error loading data:", error);
            setError("There was a problem loading company data. Please check your connection and refresh the page.");
        } finally {
            setIsLoading(false);
        }
    };
    loadData();
  }, []);

  const { featuredCompanies, regularCompanies } = useMemo(() => {
    const filtered = companies.filter(company => {
      const searchMatch = !searchTerm || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.internship_opportunities && company.internship_opportunities.some(opp => 
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.department.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      const industryMatch = filters.industry === "all" || company.industry === filters.industry;
      const locationMatch = filters.location === "all" || company.location === filters.location;
      const sizeMatch = filters.company_size === "all" || company.company_size === filters.company_size;

      return searchMatch && industryMatch && locationMatch && sizeMatch;
    });

    const featured = filtered.filter(c => c.is_featured);
    const featuredIds = new Set(featured.map(c => c.id));
    const regular = filtered.filter(c => !featuredIds.has(c.id));

    return {
      featuredCompanies: featured,
      regularCompanies: regular
    };
  }, [companies, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: "all",
      location: "all", 
      company_size: "all"
    });
    setSearchTerm("");
  };

  const totalInternships = useMemo(() => companies.reduce((sum, company) => 
    sum + (company.internship_opportunities?.length || 0), 0
  ), [companies]);

  const uniqueLocations = useMemo(() => new Set(companies.map(c => c.location)).size, [companies]);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FAF0E6'}}>
      <div className="text-stone-800" style={{background: 'linear-gradient(to right, #F5F5DC, #DEB887)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-stone-800">
              Find Your Perfect
              <span className="bg-gradient-to-r from-[#AF6E4D] to-[#8B6F47] bg-clip-text text-transparent"> Internship</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting Sint Maarten students with amazing internship opportunities at local companies
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-[#D2B48C]">
                <Briefcase className="h-5 w-5 text-[#AF6E4D]" />
                <span className="font-semibold text-stone-800">{totalInternships}+ Internships</span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-[#D2B48C]">
                <Users className="h-5 w-5 text-[#AF6E4D]" />
                <span className="font-semibold text-stone-800">{companies.length}+ Companies</span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-[#D2B48C]">
                <MapPin className="h-5 w-5 text-[#AF6E4D]" />
                <span className="font-semibold text-stone-800">{uniqueLocations}+ Locations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search companies, industries, or internship positions..."
            />
          </motion.div>

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
            <div className="mb-8">
                <Alert title="Error Loading Data">{error}</Alert>
            </div>
        )}

        {featuredCompanies.length > 0 && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-[#CD853F]" />
                <h2 className="text-2xl font-bold text-stone-800">
                  Featured Companies
                </h2>
              </div>
              <p className="text-stone-600 mt-1">
                Top internship opportunities in Sint Maarten
              </p>
            </motion.div>
            <CompanyGrid
              companies={featuredCompanies}
              isLoading={isLoading}
              searchTerm=""
              filters={{ industry: "all", location: "all", company_size: "all" }}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-stone-800">
              {regularCompanies.length} Companies Found
            </h2>
            <p className="text-stone-600 mt-1">
              Discover internship opportunities across Sint Maarten
            </p>
          </div>
        </motion.div>

        <CompanyGrid
          companies={regularCompanies}
          isLoading={isLoading}
          searchTerm={searchTerm}
          filters={filters}
        />
      </div>
    </div>
  );
}
