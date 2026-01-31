import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventCard = ({ event, index, onRSVP }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-500">
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="lg:w-2/5 aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img 
              src={event.image || event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'}
              alt={event.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="lg:w-3/5 p-8">
            {/* Date badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/20 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-red-400 text-sm font-medium">{event.date}</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {event.title}
            </h3>

            <p className="text-slate-400 leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-slate-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Users className="w-5 h-5 text-slate-500" />
                <span>{event.attendees} attending</span>
              </div>
            </div>

            <Button 
              onClick={() => onRSVP(event)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 border-0"
            >
              RSVP Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;