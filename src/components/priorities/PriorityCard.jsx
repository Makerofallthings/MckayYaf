import React from 'react';
import { motion } from 'framer-motion';

const PriorityCard = ({ priority, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={priority.image}
            alt={priority.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-8 -mt-16">
          {/* Icon */}
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-600/30">
            <priority.icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {priority.title}
          </h3>

          <p className="text-slate-400 leading-relaxed mb-6">
            {priority.description}
          </p>

        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default PriorityCard;