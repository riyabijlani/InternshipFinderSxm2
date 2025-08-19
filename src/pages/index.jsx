import Layout from "./Layout.jsx";

import Home from "./Home";

import CompanyProfile from "./CompanyProfile";

import SavedInternships from "./SavedInternships";

import MyApplications from "./MyApplications";

import Resources from "./Resources";

import ResourceDetail from "./ResourceDetail";

import Profile from "./Profile";

import MapView from "./MapView";

import Notifications from "./Notifications";

import InterviewScheduler from "./InterviewScheduler";

import CompanyComparison from "./CompanyComparison";

import Mentorship from "./Mentorship";

import SuccessStories from "./SuccessStories";

import CalendarView from "./CalendarView";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    CompanyProfile: CompanyProfile,
    
    SavedInternships: SavedInternships,
    
    MyApplications: MyApplications,
    
    Resources: Resources,
    
    ResourceDetail: ResourceDetail,
    
    Profile: Profile,
    
    MapView: MapView,
    
    Notifications: Notifications,
    
    InterviewScheduler: InterviewScheduler,
    
    CompanyComparison: CompanyComparison,
    
    Mentorship: Mentorship,
    
    SuccessStories: SuccessStories,
    
    CalendarView: CalendarView,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/CompanyProfile" element={<CompanyProfile />} />
                
                <Route path="/SavedInternships" element={<SavedInternships />} />
                
                <Route path="/MyApplications" element={<MyApplications />} />
                
                <Route path="/Resources" element={<Resources />} />
                
                <Route path="/ResourceDetail" element={<ResourceDetail />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/MapView" element={<MapView />} />
                
                <Route path="/Notifications" element={<Notifications />} />
                
                <Route path="/InterviewScheduler" element={<InterviewScheduler />} />
                
                <Route path="/CompanyComparison" element={<CompanyComparison />} />
                
                <Route path="/Mentorship" element={<Mentorship />} />
                
                <Route path="/SuccessStories" element={<SuccessStories />} />
                
                <Route path="/CalendarView" element={<CalendarView />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}









