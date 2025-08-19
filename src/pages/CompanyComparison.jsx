
import React, { useState, useEffect } from 'react';
import { Company } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Users, Calendar, Briefcase, ExternalLink, Mail, Phone, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Alert } from '../components/common/Alert';

const ComparisonCard = ({ company, onRemove }) => (
  <Card className="h-full">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center border border-stone-200 shadow-sm">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{company.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3" />
              {company.location}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(company.id)}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
    
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Industry</h4>
        <Badge variant="outline">{company.industry}</Badge>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Company Size</h4>
        <div className="flex items-center gap-1 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          {company.company_size}
        </div>
      </div>
      
      {company.established_year && (
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Established</h4>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            {company.established_year}
          </div>
        </div>
      )}
      
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Internships Available</h4>
        <div className="flex items-center gap-1 text-sm">
          <Briefcase className="w-4 h-4 text-gray-400" />
          {company.internship_opportunities?.length || 0} positions
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Description</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{company.description}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Contact</h4>
        <div className="space-y-1">
          {company.contact_email && (
            <div className="flex items-center gap-1 text-xs">
              <Mail className="w-3 h-3 text-gray-400" />
              <span className="truncate">{company.contact_email}</span>
            </div>
          )}
          {company.contact_phone && (
            <div className="flex items-center gap-1 text-xs">
              <Phone className="w-3 h-3 text-gray-400" />
              {company.contact_phone}
            </div>
          )}
          {company.website && (
            <div className="flex items-center gap-1 text-xs">
              <ExternalLink className="w-3 h-3 text-gray-400" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                Website
              </a>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <Link to={createPageUrl(`CompanyProfile?id=${company.id}`)}>
          <Button className="w-full" size="sm">View Full Profile</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default function CompanyComparison() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      setError(null); // Clear any previous errors
      try {
        const data = await Company.list();
        setCompanies(data);
        setAvailableCompanies(data);
      } catch (err) {
        console.error("Error loading companies:", err);
        setError("Could not load companies for comparison. Please try again.");
      }
    };
    loadCompanies();
  }, []);

  const handleAddCompany = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    if (company && !selectedCompanies.find(c => c.id === companyId)) {
      setSelectedCompanies(prev => [...prev, company]);
    }
  };

  const handleRemoveCompany = (companyId) => {
    setSelectedCompanies(prev => prev.filter(c => c.id !== companyId));
  };

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Comparison</h1>
            <p className="text-gray-600">Compare companies side by side to make the best choice.</p>
          </div>
        </div>
      </motion.div>

      {error && <div className="mb-6"><Alert title="Error">{error}</Alert></div>}

      <div className="mb-6">
        <Select onValueChange={handleAddCompany}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Add a company to compare..." />
          </SelectTrigger>
          <SelectContent>
            {availableCompanies
              .filter(c => !selectedCompanies.find(sc => sc.id === c.id))
              .map(company => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name} - {company.location}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCompanies.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ComparisonCard company={company} onRemove={handleRemoveCompany} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Comparing Companies</h3>
          <p className="text-gray-500">Select companies from the dropdown above to compare them side by side.</p>
        </div>
      )}
    </div>
  );
}
