import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

const StarRating = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-500 py-4">No reviews yet. Be the first to share your experience!</p>;
    }

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    return (
        <div className="space-y-4">
            {sortedReviews.map(review => (
                <Card key={review.id} className="bg-gray-50 border">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <StarRating rating={review.rating} />
                                <h4 className="font-bold text-md mt-1">{review.title}</h4>
                            </div>
                            <span className="text-xs text-gray-500">{format(new Date(review.created_date), 'MMM yyyy')}</span>
                        </div>
                        <p className="text-gray-700 my-2">{review.comment}</p>
                        <p className="text-sm font-semibold text-gray-600">
                            - {review.user_name}
                            {review.internship_position && `, ${review.internship_position}`}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}












