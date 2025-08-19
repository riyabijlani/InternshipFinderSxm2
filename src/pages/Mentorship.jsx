
import React, { useState, useEffect } from 'react';
import { Mentor } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Users, Mail, Linkedin, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert } from '../components/common/Alert';

const MentorCard = ({ mentor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
            {mentor.profile_image ? (
              <img src={mentor.profile_image} alt={mentor.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              mentor.name.split(' ').map(n => n[0]).join('').substring(0, 2)
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600 text-sm">{mentor.title}</p>
            <p className="text-gray-500 text-sm">{mentor.company}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{mentor.years_experience} years experience</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Badge variant="outline" className="mb-2">{mentor.industry}</Badge>
          {!mentor.available && (
            <Badge variant="secondary" className="ml-2">Not Available</Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
        
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {mentor.expertise?.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
            {mentor.expertise?.length > 3 && (
              <Badge variant="secondary" className="text-xs">+{mentor.expertise.length - 3} more</Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 pt-4 border-t">
          {mentor.contact_email && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              asChild
            >
              <a href={`mailto:${mentor.contact_email}`}>
                <Mail className="w-4 h-4 mr-1" />
                Contact
              </a>
            </Button>
          )}
          {mentor.linkedin_url && (
            <Button 
              size="sm" 
              variant="outline"
              asChild
            >
              <a href={mentor.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Mentorship() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    const loadMentors = async () => {
      setError(null); // Clear previous errors
      try {
        const data = await Mentor.list();
        setMentors(data);
      } catch (err) {
        console.error("Error loading mentors:", err);
        setError("Could not load mentors. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadMentors();
  }, []);

  const filteredMentors = selectedIndustry === 'all' 
    ? mentors 
    : mentors.filter(m => m.industry === selectedIndustry);

  const industries = [...new Set(mentors.map(m => m.industry))];

  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
            <p className="text-gray-600">Connect with experienced professionals in Sint Maarten.</p>
          </div>
        </div>
      </motion.div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedIndustry === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedIndustry('all')}
          >
            All Industries
          </Button>
          {industries.map(industry => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedIndustry(industry)}
            >
              {industry}
            </Button>
          ))}
        </div>
      </div>

      {error && <div className="mb-6"><Alert title="Error">{error}</Alert></div>}
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <MentorCard key={mentor.id} mentor={mentor} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Mentors Available</h3>
          <p className="text-gray-500">Check back later for mentorship opportunities.</p>
        </div>
      )}
    </div>
  );
}












