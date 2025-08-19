
import React, { useState, useEffect } from 'react';
import { Resource } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns'; // Retained as it's used in the component
import { Alert } from '../components/common/Alert'; // Fixed import path for Alert component

const categoryColors = {
  "Resume Tips": "bg-blue-100 text-blue-700",
  "Interview Prep": "bg-green-100 text-green-700",
  "Career Advice": "bg-purple-100 text-purple-700",
  "Networking": "bg-yellow-100 text-yellow-700",
  "SXM Life": "bg-orange-100 text-orange-700",
};

export default function ResourceDetail() {
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadResource = async () => {
      setError(null);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const resourceId = urlParams.get('id');
        if (!resourceId) {
          navigate(createPageUrl("Resources"));
          return;
        }
        const allResources = await Resource.list();
        const foundResource = allResources.find(r => r.id === resourceId);

        if (foundResource) {
          setResource(foundResource);
        } else {
          navigate(createPageUrl("Resources"));
        }
      } catch (err) {
        console.error("Error loading resource:", err);
        setError("Could not load this resource. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadResource();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
      return (
        <div className="p-8">
            <Alert title="Error">{error}</Alert>
            <div className="mt-4 text-center">
                <Button onClick={() => navigate(createPageUrl("Resources"))}>
                    Go back to Resources
                </Button>
            </div>
        </div>
      );
  }

  if (!resource) {
    return null;
  }
  
  return (
    <div className="p-4 md:p-8">
       <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to={createPageUrl("Resources")}>
            <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Button>
          </Link>
        </motion.div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <motion.img 
          src={resource.image_url} 
          alt={resource.title} 
          className="w-full h-64 md:h-96 object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <div className="p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Badge className={`${categoryColors[resource.category]} mb-4`}>{resource.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{resource.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(resource.created_date), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-800"
          >
            <ReactMarkdown>{resource.content}</ReactMarkdown>
          </motion.div>
        </div>
      </div>
    </div>
  );
}














