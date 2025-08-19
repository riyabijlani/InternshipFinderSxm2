
import React, { useState } from 'react';
import { Review } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, Star } from 'lucide-react';
import { Alert } from '../common/Alert'; // New import

const StarRatingInput = ({ rating, setRating }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <button
                    type="button"
                    key={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                            ratingValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                    />
                </button>
            );
        })}
    </div>
);

export default function ReviewForm({ companyId, user, onReviewSubmitted }) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [internshipPosition, setInternshipPosition] = useState(''); // Renamed from 'position'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null); // New state for error handling

    if (!user) {
        return (
            <div className="text-center p-4 border rounded-lg bg-gray-50">
                <p>Please <Button variant="link" className="p-0" onClick={() => User.loginWithRedirect(window.location.href)}>log in</Button> to leave a review.</p>
            </div>
        );
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || !title || !comment) {
            setError("Please fill out all fields: rating, title, and comment.");
            return;
        }
        setError(null); // Clear previous errors
        setIsSubmitting(true);
        try {
            const newReview = await Review.create({
                company_id: companyId,
                user_name: user.full_name || user.email,
                rating,
                title,
                comment,
                internship_position: internshipPosition // Updated to new state name
            });
            onReviewSubmitted(newReview);
            // Reset form
            setRating(0);
            setTitle('');
            setComment('');
            setInternshipPosition(''); // Updated to new state name
            setError(null); // Clear error on successful submission
        } catch (err) { // Changed 'error' to 'err' to avoid conflict with state variable
            console.error("Failed to submit review:", err);
            setError("Could not submit your review. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>
            {error && <Alert title="Submission Error">{error}</Alert>} {/* Display error message */}
            <div className="space-y-2">
                <label>Your Rating</label>
                <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div className="space-y-2">
                <label htmlFor="review-title">Review Title</label>
                <Input id="review-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., 'Great learning experience'" required />
            </div>
             <div className="space-y-2">
                <label htmlFor="review-position">Your Position (Optional)</label>
                <Input id="review-position" value={internshipPosition} onChange={e => setInternshipPosition(e.target.value)} placeholder="e.g., 'Marketing Intern'" /> {/* Updated to new state name */}
            </div>
            <div className="space-y-2">
                <label htmlFor="review-comment">Your Review</label>
                <Textarea id="review-comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Share details of your experience..." required rows={5}/>
            </div>
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} {/* Adjusted className order as per outline */}
                    Submit Review
                </Button>
            </div>
        </form>
    );
}
