import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import EventCard from '@/components/events/EventCard';
import RSVPForm from '@/components/events/RSVPForm';

const categories = ['All', 'Meeting', 'Workshop', 'Rally', 'Training', 'Summit', 'Social'];

// Fallback events if none in database
const fallbackEvents = [
  {
    id: 1,
    title: 'Weekly Chapter Meeting',
    description: 'Join us for our regular chapter meeting to discuss upcoming events and initiatives.',
    date: 'Every Wednesday',
    time: '3:30 PM - 4:30 PM',
    location: 'McKay High School, Room 105',
    attendees: 15,
    category: 'Meeting',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 2,
    title: 'Guest Speaker Event',
    description: 'Special presentation on constitutional rights and civic engagement.',
    date: 'January 27, 2025',
    time: '6:00 PM - 8:00 PM',
    location: 'McKay High School Auditorium',
    attendees: 45,
    category: 'Summit',
    image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  },
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await base44.entities.Event.list('-date');
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  const filteredEvents = selectedCategory === 'All' 
    ? displayEvents 
    : displayEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Get Involved
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Upcoming Events
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Join us at meetings, speaker events, and chapter gatherings. 
              Every event is an opportunity to learn and connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-slate-400">
              <Filter className="w-5 h-5" />
              <span>Filter:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'border-slate-600 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-slate-400">Loading events...</div>
          ) : (
            <div className="space-y-8">
              {filteredEvents.map((event, idx) => (
                <EventCard 
                  key={event.id} 
                  event={{
                    ...event,
                    image: event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
                  }}
                  index={idx}
                  onRSVP={setSelectedEvent}
                />
              ))}
            </div>
          )}

          {filteredEvents.length === 0 && !loading && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-slate-400">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* RSVP Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <RSVPForm event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Events;
