import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"> Get Involved</span>?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Join McKay YAF and stand for liberty, free enterprise, and traditional American values. 
            Every voice matters in defending freedom.
          </p>

          {/* Action cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: 'Join Chapter',
                description: 'Become a member of McKay YAF',
                action: 'Sign Up',
                link: 'Contact',
                color: 'red',
              },
              {
                icon: Heart,
                title: 'Get Involved',
                description: 'Volunteer for events and campaigns',
                action: 'Contact Us',
                link: 'Contact',
                color: 'blue',
              },
              {
                icon: Calendar,
                title: 'Attend Events',
                description: 'Join us at meetings and speaker events',
                action: 'View Events',
                link: 'Events',
                color: 'emerald',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="group bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto ${
                    item.color === 'red' ? 'bg-red-600/20' :
                    item.color === 'blue' ? 'bg-blue-600/20' :
                    'bg-emerald-600/20'
                  }`}>
                    <item.icon className={`w-7 h-7 ${
                      item.color === 'red' ? 'text-red-500' :
                      item.color === 'blue' ? 'text-blue-500' :
                      'text-emerald-500'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 mb-6">{item.description}</p>
                  <Link to={createPageUrl(item.link)}>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white group-hover:border-red-500/50"
                    >
                      {item.action}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* main red contact button removed; contact action moved into cards */}
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;