import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ContactForm from '@/components/contact/ContactForm';

const iconMap = {
  email: Mail,
  phone: Phone,
  address: MapPin,
  hours: Clock,
};

const defaultContactInfo = [
  {
    type: 'email',
    title: 'Email Us',
    details: 'trentonparras639@gmail.com',
    description: 'We respond within 24 hours',
    href: 'mailto:trentonparras639@gmail.com',
  },
  {
    type: 'phone',
    title: 'Call Us',
    details: '(971) 900-9884',
    description: 'Text or call anytime',
    href: 'tel:+19719009884',
  },
  {
    type: 'address',
    title: 'Visit Us',
    details: 'McKay High School',
    description: '2440 Lancaster Dr NE, Salem, OR 97305 • Room 214',
  },
  {
    type: 'hours',
    title: 'Meeting Times',
    details: 'Wednesdays',
    description: '3:30 PM - 4:30 PM',
  },
];

const Contact = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContactInfo = async () => {
      const data = await base44.entities.ContactInfo.list();
      setContactInfo(data);
      setLoading(false);
    };
    loadContactInfo();
  }, []);

  const displayContactInfo = contactInfo.length > 0 ? contactInfo : defaultContactInfo;

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
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Interested in joining The McKay YAF Chapter? Stop in on our meeting days in room 214 or contact us for further questions!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayContactInfo.map((item, idx) => {
              const Icon = iconMap[item.type] || Mail;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="block h-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600/30 transition-colors">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-red-400 font-medium mb-1">{item.details}</p>
                      <p className="text-slate-500 text-sm">{item.description}</p>
                    </a>
                  ) : (
                    <div className="h-full bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-300 font-medium mb-1">{item.details}</p>
                      <p className="text-slate-500 text-sm">{item.description}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            {/* Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Additional info */}
              <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Join McKay YAF</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Fill out the contact form to express your interest in joining our chapter. 
                      We welcome all McKay High School students who share our values.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <h4 className="text-white font-semibold mb-4">Why Join YAF?</h4>
                  <ul className="space-y-3">
                    {[
                      'Learn about conservative principles and American values',
                      'Hear from guest speakers and thought leaders',
                      'Connect with like-minded students',
                      'Develop leadership and public speaking skills',
                    ].map((item, idx) => (
                      <li key={idx} className="text-slate-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Map */}
              <div className="bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps?q=2440+Lancaster+Dr+NE,+Salem,+OR+97305&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.7)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="2440 Lancaster Dr NE, Salem, OR 97305"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
