import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import TeamMemberCard from '@/components/leadership/TeamMemberCard';

const Leadership = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      const data = await base44.entities.TeamMember.list('order');
      setTeamMembers(data);
      setLoading(false);
    };
    loadTeam();
  }, []);

  // Fallback data if no team members in database
  const displayTeam = teamMembers.length > 0 ? teamMembers : [
    {
      id: 1,
      name: 'Chapter President',
      role: 'President',
      bio: 'Leading the McKay YAF chapter and organizing events.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      id: 2,
      name: 'Vice President',
      role: 'Vice President',
      bio: 'Supporting chapter leadership and member engagement.',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    },
    {
      id: 3,
      name: 'Secretary',
      role: 'Secretary',
      bio: 'Managing communications and chapter records.',
      image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    },
  ];

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Our Team
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Leadership
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Meet the dedicated students leading McKay YAF. Their passion and 
              commitment drive our chapter forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <Quote className="w-12 h-12 text-red-500/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-6">
              "Freedom is never more than one generation away from extinction. 
              We didn't pass it to our children in the bloodstream."
            </blockquote>
            <cite className="text-slate-400 not-italic">
              — Ronald Reagan
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
              Chapter Officers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Executive Staff
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our chapter officers lead with dedication and commitment to 
              promoting freedom and conservative values.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-slate-400">Loading team members...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTeam.map((member, idx) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={{
                    name: member.name,
                    role: member.role,
                    bio: member.bio,
                    image: member.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
                    email: member.email,
                    linkedin: member.linkedin,
                    twitter: member.twitter,
                    instagram: member.instagram,
                  }} 
                  index={idx} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Leadership;
