
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Briefcase, 
  Home, 
  Bookmark, 
  User as UserIcon, 
  FileText, 
  Menu,
  X,
  BookOpen,
  Map,
  Bell,
  Calendar,
  Clock,
  BarChart,
  Users,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ to, icon: Icon, children, currentPath }) => (
  <Link to={to}>
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
        currentPath === to
          ? "bg-[#FAF0E6] text-[#654321] font-semibold border border-[#D2B48C]"
          : "text-stone-700 hover:bg-[#FAF0E6] hover:text-[#654321]"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </div>
  </Link>
);

export default function Layout({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const allNav = [
    { to: createPageUrl("Home"), icon: Home, label: "Home" },
    { to: createPageUrl("MapView"), icon: Map, label: "Map View" },
    { to: createPageUrl("Resources"), icon: BookOpen, label: "Resources" },
    { to: createPageUrl("SavedInternships"), icon: Bookmark, label: "Saved Internships" },
    { to: createPageUrl("MyApplications"), icon: FileText, label: "My Applications" },
    { to: createPageUrl("Profile"), icon: UserIcon, label: "My Profile" },
    { to: createPageUrl("Notifications"), icon: Bell, label: "Notifications" },
    { to: createPageUrl("CalendarView"), icon: Calendar, label: "Calendar" },
    { to: createPageUrl("InterviewScheduler"), icon: Clock, label: "Interviews" },
    { to: createPageUrl("CompanyComparison"), icon: BarChart, label: "Compare Companies" },
    { to: createPageUrl("Mentorship"), icon: Users, label: "Find a Mentor" },
    { to: createPageUrl("SuccessStories"), icon: Trophy, label: "Success Stories" }
  ];

  const renderNavLinks = (navItems) => (
    <nav className="flex flex-col gap-2">
      {navItems.map(item => (
        <NavItem key={item.to} to={item.to} icon={item.icon} currentPath={location.pathname}>
          {item.label}
        </NavItem>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#FAF0E6'}}>
      <aside className="hidden md:flex flex-col w-64 border-r border-stone-200 bg-white p-4 shrink-0">
        <Link to={createPageUrl("Home")} className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-md">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-stone-800">SXM Internships</h1>
        </Link>
        
        {renderNavLinks(allNav)}
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-lg flex items-center justify-center shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-stone-800">SXM Internships</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-stone-700" />
          </Button>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed inset-0 z-50 flex flex-col p-4 bg-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-stone-800">Menu</h2>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                {renderNavLinks(allNav)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
