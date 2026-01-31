import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Leaf, 
  Scale, 
  Home, 
  Briefcase,
  Shield,
  Users
} from 'lucide-react';
import PriorityCard from '@/components/priorities/PriorityCard';
import BeliefCard from '@/components/priorities/BeliefCard';

const priorities = [
  {
    icon: GraduationCap,
    title: 'Education Access',
    description: 'Fighting for equitable education funding, universal pre-K, and affordable higher education opportunities for all.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
  },
  {
    icon: Heart,
    title: 'Healthcare Equity',
    description: 'Advocating for affordable healthcare, mental health resources, and reducing health disparities across communities.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
  },
  {
    icon: Leaf,
    title: 'Environmental Justice',
    description: 'Championing clean energy, sustainable practices, and protecting vulnerable communities from environmental hazards.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
  {
    icon: Scale,
    title: 'Civil Rights',
    description: 'Defending voting rights, fighting discrimination, and ensuring equal justice under the law for every citizen.',
    image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&q=80',
  },
  {
    icon: Home,
    title: 'Housing Security',
    description: 'Working to increase affordable housing, prevent homelessness, and ensure safe living conditions for families.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    icon: Briefcase,
    title: 'Economic Opportunity',
    description: 'Promoting fair wages, job training programs, and support for small businesses and workers\' rights.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
];

const beliefs = [
  {
    title: 'Individual Liberty',
    description: 'Personal freedom is a transcendental value rooted in free will and must be protected from arbitrary force.',
  },
  {
    title: 'Economic & Political Link',
    description: 'True liberty is indivisible; you cannot have political freedom without the presence of economic freedom.',
  },
  {
    title: 'Limited Government',
    description: 'The government’s only legitimate roles are maintaining internal order, providing national defense, and administering justice.',
  },
  {
    title: 'Constitutional Federalism',
    description: 'Power should be strictly divided, with most authority reserved for the states and the people rather than the federal government.',
  },
  {
    title: 'The Free Market',
    description: 'A supply-and-demand economy is the only system compatible with personal freedom, and government interference in it diminishes a nation’s moral and physical strength.',
  },
  {
    title: 'National Sovereignty & Defense',
    description: 'Freedom depends on a secure U.S. sovereignty and a foreign policy focused on victory over threats rather than coexistence.',
  },
];

const Priorities = () => {
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
              What We Stand For
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Our Priorities
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We focus our efforts on the issues that matter most to our communities. 
              Here's where we're making the biggest impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Priorities Grid */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priorities.map((priority, idx) => (
              <PriorityCard key={idx} priority={priority} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
                Our Foundation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Core Beliefs
              </h2>
              <p className="text-slate-400 text-lg mb-12">
                These principles guide every decision we make and every campaign we launch. 
                They're not just words—they're our commitment to you.
              </p>

              <div className="space-y-6">
                {beliefs.map((belief, idx) => (
                  <BeliefCard key={idx} belief={belief} index={idx} />
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">15+ Years</div>
                    <div className="text-slate-400 text-sm">Of Advocacy Excellence</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-red-500/30 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Priorities;
