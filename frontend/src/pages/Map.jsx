import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import marker1 from "../assets/map/marker.png";
import marker2 from "../assets/map/hospital.png";
import { Skeleton } from "@/components/ui/skeleton"

const redIcon = new L.Icon({
    iconUrl: marker1,
    iconSize: [40, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const greenIcon = new L.Icon({
    iconUrl: marker2,
    iconSize: [40, 45],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const MapComponent = () => {
    const [position, setPosition] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [pharmacy, setpharmacy] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    const fetchNearbyPlaces = async (query, setPlaces) => {
        const bbox = `${position[1] - 0.05},${position[0] - 0.05},${position[1] + 0.05},${position[0] + 0.05}`;
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=10&viewbox=${bbox}&bounded=1`;

        try {
            const response = await axios.get(url);
            setPlaces(response.data);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching nearby ${query}:`, error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (position) {
            fetchNearbyPlaces('Hospital', setHospitals);
            fetchNearbyPlaces('Pharmacy', setpharmacy);
            fetchNearbyPlaces('Clinic', setClinics);
        }
    }, [position]);

    const renderSkeletons = () => (
        <div className="flex overflow-x-auto space-x-3 pb-4">
            {[...Array(10)].map((_, index) => (
                <Skeleton key={index} className="min-w-[300px] h-[150px] p-2" />
            ))}
        </div>
    );

    return (
        <div>
            <div className="relative h-screen w-full rounded-lg">

                <div className="my-2 pb-5">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Hospitals</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {hospitals.map((place, index) => (
                                <div key={index} className="min-w-[300px] p-2 border rounded-md shadow-md" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                    <h3 className="font-bold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    <p className="text-xs opacity-90">Lat: {place.lat}, Lon: {place.lon}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-2 pb-5">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Clinics</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {clinics.map((place, index) => (
                                <div key={index} className="min-w-[300px] p-2 border rounded-md shadow-md" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                    <h3 className="font-bold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    <p className="text-xs opacity-90">Lat: {place.lat}, Lon: {place.lon}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-2 pb-5">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Pharmacy Centers</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {pharmacy.map((place, index) => (
                                <div key={index} className="min-w-[300px] p-2 border rounded-md shadow-md" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                    <h3 className="font-bold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    <p className="text-xs opacity-90">Lat: {place.lat}, Lon: {place.lon}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {loading ? (
                    <Skeleton className="w-full my-4" />
                ) : (position && (
                    <MapContainer center={position} zoom={15} className="w-full h-3/4 rounded-lg shadow-lg">
                        <TileLayer
                            url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAP_KEY}`}
                        />
                        <Marker position={position} icon={redIcon}>
                            <Popup>Your Current Location</Popup>
                        </Marker>

                        {hospitals.map((place, index) => (
                            <Marker key={index} position={[place.lat, place.lon]} icon={greenIcon}>
                                <Popup>{place.display_name}</Popup>
                            </Marker>
                        ))}
                        {pharmacy.map((place, index) => (
                            <Marker key={index} position={[place.lat, place.lon]} icon={greenIcon}>
                                <Popup>{place.display_name}</Popup>
                            </Marker>
                        ))}
                        {clinics.map((place, index) => (
                            <Marker key={index} position={[place.lat, place.lon]} icon={greenIcon}>
                                <Popup>{place.display_name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                ))}
            </div>
        </div>
    );
};

export default MapComponent;
