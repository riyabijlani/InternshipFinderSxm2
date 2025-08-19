
import React, { useState, useEffect } from "react";
import { Company } from "@/api/entities";
import { User } from "@/api/entities";
import { Review } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  ArrowLeft,
  Clock,
  GraduationCap,
  Star,
  MessageSquare,
  Bookmark // Added Bookmark icon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ApplyModal from "../components/applications/ApplyModal";
import ReviewForm from "../components/reviews/ReviewForm";
import ReviewList from "../components/reviews/ReviewList";
import { Alert } from "../components/common/Alert";

const industryColors = {
  default: "bg-stone-100 text-stone-800 border-stone-200"
};

export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // New state for saving
  const [isSaving, setIsSaving] = useState(false); // New state for saving progress
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const urlParams = new URLSearchParams(window.location.search);
        const companyId = urlParams.get("id");

        if (!companyId) {
          navigate(createPageUrl("Home"));
          return;
        }

        const [allCompanies, currentUser, companyReviews] = await Promise.all([
          Company.list(),
          User.me().catch(() => null), // Catch error if user not logged in
          Review.filter({ company_id: companyId }).catch(() => []) // Catch error if no reviews or fetch fails
        ]);

        const foundCompany = allCompanies.find(c => c.id === companyId);

        if (foundCompany) {
          setCompany(foundCompany);
          setUser(currentUser);
          setReviews(companyReviews);
          if (currentUser && currentUser.saved_companies) {
            setIsSaved(currentUser.saved_companies.includes(foundCompany.id));
          }
        } else {
          navigate(createPageUrl("Home"));
        }
      } catch (err) {
        console.error("Error loading company data:", err);
        setError("Could not load company profile. Please check your connection or try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleApplyClick = (internship) => {
    if (!user) {
      User.loginWithRedirect(window.location.href);
    } else {
      setSelectedInternship(internship);
      setApplyModalOpen(true);
    }
  };

  const onReviewSubmitted = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const toggleSave = async () => {
    if (!user) {
      User.loginWithRedirect(window.location.href);
      return;
    }
    if (isSaving || !company) return;

    setIsSaving(true);
    try {
      if (isSaved) {
        await User.unsaveCompany(user.id, company.id);
        setIsSaved(false);
      } else {
        await User.saveCompany(user.id, company.id);
        setIsSaved(true);
      }
      // Re-fetch user data to ensure the saved_companies list is up-to-date
      const updatedUser = await User.me();
      setUser(updatedUser);
    } catch (err) {
      console.error("Failed to toggle company save status:", err);
      // Optionally show an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-white to-amber-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-gray-200 rounded w-64"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert title="Error">{error}</Alert>
        </div>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <div className="bg-[#FAF0E6] min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>
        </motion.div>

        {/* Company Header */}
        <Card className="overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#D2B48C] to-[#C19A6B] h-32 md:h-40" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row gap-6 -mt-20">
              <div className="w-24 h-24 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shrink-0 shadow-md border-4 border-white">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <div className="flex-grow pt-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-stone-900 mb-2">
                      {company.name}
                    </h1>
                    <div className="flex items-center gap-4 text-stone-600 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {company.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {company.company_size}
                      </div>
                      {company.established_year && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Est. {company.established_year}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Badge
                      className={`${industryColors.default} border text-sm px-3 py-1`}
                    >
                      {company.industry}
                    </Badge>
                    <Button onClick={toggleSave} variant="outline" size="icon" disabled={isSaving} aria-label="Save company">
                      <Bookmark className={`w-5 h-5 transition-colors ${isSaved ? "text-[#C19A6B] fill-current" : "text-stone-500"}`} />
                    </Button>
                    <Button onClick={() => {
                        // General apply button in the header, no specific internship selected
                        setSelectedInternship(null);
                        setApplyModalOpen(true);
                    }} className="bg-[#8B4513] hover:bg-[#A0522D] text-white">Apply Now</Button>
                  </div>
                </div>

                <p className="text-stone-700 leading-relaxed mb-6">
                  {company.description}
                </p>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3">
                  {company.contact_email && (
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2 border-[#D2B48C] text-[#654321] hover:bg-[#FAF0E6]"
                    >
                      <a href={`mailto:${company.contact_email}`}>
                        <Mail className="w-4 h-4" />
                        {company.contact_email}
                      </a>
                    </Button>
                  )}
                  {company.contact_phone && (
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2 border-stone-300 text-stone-700 hover:bg-stone-50"
                    >
                      <a href={`tel:${company.contact_phone}`}>
                        <Phone className="w-4 h-4" />
                        {company.contact_phone}
                      </a>
                    </Button>
                  )}
                  {company.website && (
                    <Button
                      variant="outline"
                      asChild
                      className="gap-2 border-stone-300 text-stone-700 hover:bg-stone-50"
                    >
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Internship Opportunities */}
        {company.internship_opportunities && company.internship_opportunities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Briefcase className="w-6 h-6 text-[#8B6F47]" />
                  Internship Opportunities
                  <Badge variant="secondary" className="ml-2 bg-stone-200 text-stone-800">
                    {company.internship_opportunities.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {company.internship_opportunities.map((opportunity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-gradient-to-r from-[#FAF0E6]/50 to-white rounded-xl p-6 border border-[#D2B48C]/50"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-stone-900 mb-1">
                            {opportunity.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-stone-600">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {opportunity.department}
                            </div>
                            {opportunity.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {opportunity.duration}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button onClick={() => handleApplyClick(opportunity)} className="bg-[#8B4513] hover:bg-[#A0522D] text-white">Apply Now</Button>
                      </div>

                      {opportunity.description && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-stone-900 mb-2">Description</h4>
                          <p className="text-stone-700 leading-relaxed">
                            {opportunity.description}
                          </p>
                        </div>
                      )}

                      {opportunity.required_skills && opportunity.required_skills.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-stone-900 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.required_skills.map(skill => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {opportunity.requirements && (
                        <div>
                          <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            Requirements
                          </h4>
                          <p className="text-stone-700 leading-relaxed">
                            {opportunity.requirements}
                          </p>
                        </div>
                      )}

                      {index < company.internship_opportunities.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-[#654321] to-[#8B6F47] rounded-xl text-white text-center">
                  <h4 className="text-lg font-semibold mb-2">Ready to Apply?</h4>
                  <p className="mb-4 text-stone-200">
                    Contact {company.name} directly to discuss internship opportunities.
                  </p>
                  {company.contact_email && (
                    <Button
                      variant="secondary"
                      asChild
                      className="gap-2 bg-white text-[#654321] hover:bg-stone-50"
                    >
                      <a href={`mailto:${company.contact_email}?subject=Internship Inquiry`}>
                        <Mail className="w-4 h-4" />
                        Send Application Email
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageSquare className="w-6 h-6 text-[#8B6F47]" />
                Reviews & Ratings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewList reviews={reviews} />
              <Separator className="my-6" />
              <ReviewForm companyId={company.id} user={user} onReviewSubmitted={onReviewSubmitted} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Apply Modal always checks if selectedInternship is null or an object */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        user={user}
        company={company}
        internship={selectedInternship}
      />
    </div>
  );
}






