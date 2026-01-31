import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-500">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-red-400 text-sm font-medium">{member.role}</span>
          <h3 className="text-2xl font-bold text-white mt-1 mb-2">
            {member.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {member.bio}
          </p>

          {/* Social links */}
          <div className="flex gap-2">
            <a 
              href={`mailto:${member.email || 'trentonparras639@gmail.com'}`}
              className="w-10 h-10 rounded-lg bg-slate-700/80 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-700/80 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.twitter && (
              <a 
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-700/80 hover:bg-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a 
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-700/80 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}