import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * 
 * @param {object} props
 * @param {object} props.event 
 * @param {string} props.event.imageUrl 
 * @param {string} props.event.date 
 * @param {string} props.event.title
 * @param {string} props.event.location 
 */
const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col border border-gray-200/80">
        <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.title} />
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm font-bold text-purple-600 mb-2">{event.date}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex-grow">{event.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{event.location}</span>
            </div>
        </div>
        <div className="p-3 bg-gray-50 border-t border-gray-200/80">
            <a href="/login" className="block w-full text-center bg-purple-100 text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-200 transition-colors duration-200">
                Info & Registrasi
            </a>
        </div>
    </div>
);

export default EventCard;
