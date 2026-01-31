import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Calendar, Mic, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const HeroSection = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) setSettings(data[0]);
    };
    loadSettings();
  }, []);

  const stats = [
    { icon: Users, value: settings?.active_members || '25+', label: 'Members' },
    { icon: Calendar, value: settings?.events_this_year || '12', label: 'Events This Year' },
    { icon: Clock, value: settings?.year_founded || '2026', label: 'Founded' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-sm font-medium">McKay High School</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              McKay
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                YAF Chapter
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Young Americans for Freedom at McKay High School. Standing for liberty, 
              free enterprise, and traditional American values.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to={createPageUrl('Contact')}>
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Join Our Chapter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Events')}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-slate-600 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-lg transition-all duration-300 w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  View Events
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  className="text-center sm:text-left"
                >
                  <stat.icon className="w-5 h-5 text-red-500 mb-2 mx-auto sm:mx-0" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{settings?.active_members || '25'}+</div>
                    <div className="text-slate-400 text-sm">Active members</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-red-500/30 rounded-2xl" />
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-red-600/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-red-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;