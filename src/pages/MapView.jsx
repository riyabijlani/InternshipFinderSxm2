import React, { useState, useEffect } from 'react';
import { Company } from '@/api/entities';
import { Loader2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Alert } from '../components/common/Alert';

const CompanyMarker = ({ company }) => {
    return (
        <Marker position={[company.latitude, company.longitude]}>
            <Popup>
                <div className="font-sans">
                    <h3 className="font-bold text-md mb-1">{company.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{company.location}</p>
                    <Link to={createPageUrl(`CompanyProfile?id=${company.id}`)}>
                        <Button size="sm" className="w-full">View Details</Button>
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
};

export default function MapView() {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCompanies = async () => {
            setError(null);
            try {
                const data = await Company.list();
                setCompanies(data.filter(c => c.latitude && c.longitude));
            } catch (err) {
                console.error("Error loading companies for map:", err);
                setError("Could not load company locations. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        loadCompanies();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full p-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const ssmCenter = [18.04, -63.07];

    return (
        <div className="h-full flex flex-col" style={{backgroundColor: '#FAF0E6'}}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 md:p-6 border-b bg-white"
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C19A6B] to-[#AF6E4D] rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Company Locations</h1>
                        <p className="text-gray-600">Explore internship opportunities across Sint Maarten.</p>
                    </div>
                </div>
            </motion.div>
            <div className="flex-grow relative">
                {error && <div className="absolute top-2 left-2 z-[1000] w-full max-w-md p-4"><Alert title="Map Error">{error}</Alert></div>}
                <MapContainer center={ssmCenter} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {companies.map(company => (
                        <CompanyMarker key={company.id} company={company} />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}














