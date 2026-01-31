import React, { useEffect, useState } from 'react';
import { Target, Eye, Heart, Users, Calendar, Mic, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const MissionSection = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) setSettings(data[0]);
    };
    loadSettings();
  }, []);

  const cards = [
    {
      icon: Target,
      title: 'Our Mission',
      description: settings?.mission_text || 'To educate and empower students about conservative principles, free enterprise, and the American founding values at McKay High School.',
      color: 'red',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: settings?.vision_text || 'A generation of informed, engaged citizens who understand and defend the principles of liberty and limited government.',
      color: 'blue',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: settings?.values_text || 'Individual liberty, personal responsibility, free enterprise, traditional values, and a strong national defense of our shared American values guide our chapter.',
      color: 'emerald',
    },
  ];

  return (
    <section className="relative py-32 bg-slate-900">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Driven by Purpose
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            McKay YAF is committed to promoting conservative principles 
            and empowering the next generation of American leaders.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  card.color === 'red' ? 'bg-red-600/20' :
                  card.color === 'blue' ? 'bg-blue-600/20' :
                  'bg-emerald-600/20'
                }`}>
                  <card.icon className={`w-8 h-8 ${
                    card.color === 'red' ? 'text-red-500' :
                    card.color === 'blue' ? 'text-blue-500' :
                    'text-emerald-500'
                  }`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 bg-gradient-to-br from-red-600/10 to-red-600/5 rounded-3xl p-12 border border-red-500/20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: settings?.active_members || '25+', label: 'Active Members' },
              { icon: Calendar, value: settings?.events_this_year || '12', label: 'Events This Year' },
              { icon: Mic, value: settings?.guest_speakers || '5', label: 'Guest Speakers' },
              { icon: Clock, value: settings?.year_founded || '2026', label: 'Year Founded' },
            ].map((stat, idx) => (
              <div key={idx}>
                <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MissionSection;