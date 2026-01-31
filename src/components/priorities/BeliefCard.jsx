import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const BeliefCard = ({ belief, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 group"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors duration-300">
        <Check className="w-5 h-5 text-red-500" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{belief.title}</h4>
        <p className="text-slate-400 leading-relaxed">{belief.description}</p>
      </div>
    </motion.div>
  );
}

export default BeliefCard;