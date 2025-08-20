
import React, { useState, useEffect } from 'react';
import { SuccessStory } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, GraduationCap, Briefcase, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert } from '../components/common/Alert'; // Updated import for Alert component

const SuccessStoryCard = ({ story, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
            {story.image_url ? (
              <img src={story.image_url} alt={story.student_name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              story.student_name.split(' ').map(n => n[0]).join('').substring(0, 2)
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{story.student_name}</h3>
            <p className="text-gray-600 text-sm">{story.current_role}</p>
            <p className="text-gray-500 text-sm">{story.current_company}</p>
            {story.is_featured && (
              <Badge className="mt-1 bg-yellow-100 text-yellow-700 border-yellow-200">
                <Star className="w-3 h-3 mr-1" />
                Featured Story
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-2">{story.title}</h4>
          <p className="text-sm text-gray-700 line-clamp-4">{story.content}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">Interned at:</span>
            </div>
            <p className="text-gray-900">{story.company_name}</p>
            <p className="text-gray-600">{story.position}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Background:</span>
            </div>
            <p className="text-gray-900">{story.field_of_study}</p>
            <p className="text-gray-600">Class of {story.graduation_year}</p>
          </div>
        </div>
        
        {story.key_achievements && story.key_achievements.length > 0 && (
          <div>
            <h5 className="font-semibold text-sm text-gray-700 mb-2">Key Achievements</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {story.key_achievements.slice(0, 3).map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Trophy className="w-3 h-3 text-yellow-500 mt-1 shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {story.advice && (
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <h5 className="font-semibold text-sm text-blue-900 mb-1">Advice for Students:</h5>
            <p className="text-sm text-blue-800 italic">"{story.advice}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const loadStories = async () => {
      setError(null); // Clear previous errors
      try {
        const data = await SuccessStory.list('-created_date');
        setStories(data);
      } catch (err) {
        console.error("Error loading success stories:", err);
        setError("Could not load success stories. Please check your connection and try again."); // Set error message
      } finally {
        setIsLoading(false);
      }
    };
    loadStories();
  }, []);

  const featuredStories = stories.filter(s => s.is_featured);
  const regularStories = stories.filter(s => !s.is_featured);

  return (
    <div className="p-4 md:p-8" style={{backgroundColor: '#FAF0E6'}}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Success Stories</h1>
            <p className="text-gray-600">Be inspired by fellow Sint Maarten students who achieved their goals.</p>
          </div>
        </div>
      </motion.div>

      {error && <div className="mb-6"><Alert title="Error">{error}</Alert></div>}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          {featuredStories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredStories.map((story, index) => (
                  <SuccessStoryCard key={story.id} story={story} index={index} />
                ))}
              </div>
            </div>
          )}

          {regularStories.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">All Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularStories.map((story, index) => (
                  <SuccessStoryCard key={story.id} story={story} index={index + featuredStories.length} />
                ))}
              </div>
            </div>
          )}

          {stories.length === 0 && !error && (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Success Stories Yet</h3>
              <p className="text-gray-500">Check back later for inspiring stories from successful interns.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}















