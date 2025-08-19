
import React, { useState } from 'react';
import { Application } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, CheckCircle, XCircle, X } from 'lucide-react'; // Added X for the close button
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion'; // Added framer-motion imports

export default function ApplyModal({ isOpen, onClose, user, company, internship }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!user.resume_url) {
        setErrorMessage("Please upload a resume to your profile before applying.");
        setSubmissionState('error');
        return;
    }

    setIsSubmitting(true);
    setSubmissionState('idle');

    try {
        await Application.create({
            user_id: user.id,
            company_id: company.id,
            company_name: company.name,
            internship_title: internship.title,
            cover_letter: coverLetter,
            resume_url: user.resume_url,
            status: 'Applied'
        });
        setSubmissionState('success');
    } catch (error) {
        setErrorMessage('Failed to submit application. Please try again.');
        setSubmissionState('error');
        console.error("Application submission failed:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after a delay to allow for closing animation
    setTimeout(() => {
        setCoverLetter('');
        setSubmissionState('idle');
        setIsSubmitting(false);
        setErrorMessage('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={handleClose} // Close modal on overlay click
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Header Section */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Apply for Internship</h2>
                  <p className="text-stone-600 mt-1">
                    {internship.title} at {company.name}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="w-5 h-5 text-stone-500" />
                </Button>
              </div>
            </div>

            {/* Main Content Area (conditionally renders success or form) */}
            {submissionState === 'success' ? (
                <div className="text-center p-8 flex-grow flex flex-col justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Application Sent!</h3>
                    <p className="text-stone-600 mb-4">
                        Your application for the {internship.title} position at {company.name} has been submitted. You can track its status on your "My Applications" page.
                    </p>
                    <Button onClick={handleClose} className="mt-6">Close</Button>
                </div>
            ) : (
                <>
                    {/* Description below header */}
                    <div className="px-6 pt-4 text-stone-600">
                        <p>Your application will be sent to {company.name}. Your resume from your profile will be attached automatically.</p>
                    </div>

                    {/* Form Fields Section */}
                    <div className="py-4 px-6 space-y-4 flex-grow overflow-y-auto">
                        <div>
                            <label htmlFor="coverLetter" className="text-sm font-medium text-stone-700">Cover Letter (Optional)</label>
                            <Textarea
                                id="coverLetter"
                                placeholder="Write a brief message to the hiring manager..."
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={6}
                                className="border-stone-300 focus:ring-stone-500 focus:border-stone-500"
                            />
                        </div>
                        {submissionState === 'error' && (
                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}
                         {!user.resume_url && (
                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertDescription>You must have a resume uploaded to your profile to apply.</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Footer Section */}
                    <div className="p-6 border-t flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
                      <Button onClick={handleSubmit} disabled={isSubmitting || !user.resume_url}>
                        {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
