
import React, { useState, useEffect } from 'react';
import { Resource } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert } from '../components/common/Alert';

const categoryColors = {
  "Resume Tips": "bg-blue-100 text-blue-700",
  "Interview Prep": "bg-green-100 text-green-700",
  "Career Advice": "bg-purple-100 text-purple-700",
  "Networking": "bg-yellow-100 text-yellow-700",
  "SXM Life": "bg-orange-100 text-orange-700",
};

const ResourceCard = ({ resource, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="h-full"
  >
    <Link to={createPageUrl(`ResourceDetail?id=${resource.id}`)} className="h-full block">
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="p-0">
          <img src={resource.image_url} alt={resource.title} className="w-full h-48 object-cover"/>
        </CardHeader>
        <CardContent className="p-4 flex flex-col">
          <Badge className={`self-start mb-2 ${categoryColors[resource.category]}`}>
            {resource.category}
          </Badge>
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{resource.excerpt}</p>
          <div className="text-xs text-gray-500 mt-4">By {resource.author}</div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      setError(null); // Clear any previous errors
      try {
        const data = await Resource.list('-created_date');
        setResources(data);
      } catch (err) {
        console.error("Error loading resources:", err);
        setError("Could not load resources. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadResources();
  }, []);

  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Internship Resources</h1>
            <p className="text-gray-600">Tips and advice to help you succeed in your career journey.</p>
          </div>
        </div>
      </motion.div>
      
      {error && <div className="mb-6"><Alert title="Error">{error}</Alert></div>}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No Resources Available Yet</h3>
          <p className="text-gray-500">Check back later for helpful articles and guides.</p>
        </div>
      )}
    </div>
  );
}




