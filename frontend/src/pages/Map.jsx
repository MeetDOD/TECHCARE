import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import marker1 from "../assets/map/marker.png";
import marker2 from "../assets/map/hospital.png";
import { Input } from '@/components/ui/input';

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
    const [places, setPlaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        if (position) {
            const fetchNearbyPlaces = async () => {
                const bbox = `${position[1] - 0.05},${position[0] - 0.05},${position[1] + 0.05},${position[0] + 0.05}`;
                const url = `https://nominatim.openstreetmap.org/search?q=Hospital&format=json&limit=10&viewbox=${bbox}&bounded=1`;

                try {
                    const response = await axios.get(url);
                    setPlaces(response.data);
                } catch (error) {
                    console.error('Error fetching nearby places:', error);
                }
            };

            fetchNearbyPlaces();
        }
    }, [position]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 2) {
                const url = `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=5`;
                try {
                    const response = await axios.get(url);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
            }
        };

        const debounceFetch = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    return (
        <div className="relative h-screen w-full rounded-lg">
            <Input
                type="text"
                placeholder="Search for places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg mb-4 w-full"
            />

            {suggestions.length > 0 && (
                <ul className="absolute bg-white border rounded-md w-full z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setSearchTerm(suggestion.display_name);
                                setPosition([suggestion.lat, suggestion.lon]);
                                setSuggestions([]);
                            }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}

            {position && (
                <MapContainer center={position} zoom={14} className="w-full h-3/4 rounded-lg shadow-lg">
                    <TileLayer
                        url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=api_key_please`}
                    />
                    <Marker position={position} icon={redIcon}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {places.map((place, index) => (
                        <Marker key={index} position={[place.lat, place.lon]} icon={greenIcon}>
                            <Popup>{place.display_name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
};

export default MapComponent;
