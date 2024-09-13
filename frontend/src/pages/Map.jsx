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
    const [pharmacy, setPharmacy] = useState([]);
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
            fetchNearbyPlaces('Doctors', setPharmacy);
            fetchNearbyPlaces('Hospital', setHospitals);
            fetchNearbyPlaces('Clinic', setClinics);
        }
    }, [position]);

    const getGoogleMapsDirectionsUrl = (currentLat, currentLon, placeLat, placeLon) => {
        return `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLon}&destination=${placeLat},${placeLon}&travelmode=walking`;
    };

    const getGoogleStreetViewUrl = (lat, lon) => {
        return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lon}`;
    };

    const getGoogleStaticMapImage = (lat, lon) => {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=300x200&maptype=roadmap&markers=color:red%7Clabel:P%7C${lat},${lon}`;
    };

    const renderSkeletons = () => (
        <div className="flex overflow-x-auto space-x-3 pb-4">
            {[...Array(10)].map((_, index) => (
                <Skeleton key={index} className="min-w-[300px] h-[150px] p-2" />
            ))}
        </div>
    );

    return (
        <div>
            <div className='my-5 '>
                <h1 className='text-2xl md:text-3xl font-bold'>
                    Map at your <span className='text-primary'>Fingertip</span>
                </h1>
                <p className='text-lg opacity-90 my-2'>
                    Find the best nearest Doctors, Hospitals and Clinics within few clicks
                </p>
            </div>
            <div>
                {loading ? (
                    <Skeleton className="w-full h-screen rounded-lg shadow-lg" />
                ) : (position && (
                    <MapContainer center={position} zoom={15} className="h-screen w-full rounded-lg shadow-lg -z-0">
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
                <div className="my-2 pb-5 mt-5">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Doctors</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {pharmacy.map((place, index) => (
                                <div key={index} className="min-w-[300px] p-2 border rounded-md shadow-md flex flex-col justify-between" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                    <h3 className="font-bold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    <div className='flex items-center gap-2 justify-center '>
                                        <a
                                            href={getGoogleMapsDirectionsUrl(position[0], position[1], place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-3 text-white border rounded-md bg-primary hover:bg-primary/90" style={{
                                                borderColor: `var(--borderColor)`,
                                            }}
                                        >
                                            Get Walking Directions
                                        </a>

                                        <a
                                            href={getGoogleStreetViewUrl(place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-2 border rounded-md hover:opacity-80" style={{
                                                borderColor: `var(--borderColor)`,
                                            }}
                                        >
                                            View in Street View
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-2 pb-5">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Hospitals</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {hospitals.map((place, index) => (
                                <div key={index} className="min-w-[300px] p-2 border rounded-md shadow-md flex flex-col justify-between" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                    <h3 className="font-semibold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    {/* <p className="text-xs opacity-90">Lat: {place.lat}, Lon: {place.lon}</p> */}

                                    {/* <img
                                        src={getGoogleStaticMapImage(place.lat, place.lon)}
                                        alt={place.display_name}
                                        className="w-full h-[150px] my-2"
                                    /> */}

                                    <div className='flex items-center gap-3 justify-center mt-auto'>
                                        <a
                                            href={getGoogleMapsDirectionsUrl(position[0], position[1], place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-3 text-white border rounded-md bg-primary hover:bg-primary/90" style={{
                                                borderColor: `var(--borderColor)`,
                                            }}
                                        >
                                            Get Walking Directions
                                        </a>

                                        <a
                                            href={getGoogleStreetViewUrl(place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-2 border rounded-md hover:opacity-80" style={{
                                                borderColor: `var(--borderColor)`,
                                            }}
                                        >
                                            View in Street View
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-2">
                    <h2 className="text-xl font-bold my-2">Nearest <span className='text-primary'>Clinics</span></h2>
                    {loading ? renderSkeletons() : (
                        <div className="flex overflow-x-auto space-x-3 pb-4">
                            {clinics.map((place, index) => (
                                <div
                                    key={index}
                                    className="min-w-[300px] p-2 border rounded-md shadow-md flex flex-col justify-between"
                                    style={{ borderColor: `var(--borderColor)` }}
                                >
                                    <div>
                                        <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary w-fit'>{place.name}</h2>
                                        <h3 className="font-bold opacity-95 text-sm my-3">{place.display_name}</h3>
                                    </div>

                                    <div className='flex items-center gap-2 justify-center mt-auto'>
                                        <a
                                            href={getGoogleMapsDirectionsUrl(position[0], position[1], place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-3 text-white border rounded-md bg-primary hover:bg-primary/90"
                                            style={{ borderColor: `var(--borderColor)` }}
                                        >
                                            Get Walking Directions
                                        </a>

                                        <a
                                            href={getGoogleStreetViewUrl(place.lat, place.lon)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs p-2 px-2 border rounded-md hover:opacity-80"
                                            style={{ borderColor: `var(--borderColor)` }}
                                        >
                                            View in Street View
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
