import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { subscribeNewsletter, isAdmin as checkAdmin } from '@/lib/firebaseClient';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { Mail, Phone, MapPin, Instagram, Heart, ArrowRight, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const { login, logout, user, isAdmin } = useAuth();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    try {
      const res = await login(email, password);
      console.log('login result user:', res?.user?.uid, res?.user?.email);
      const uid = res?.user?.uid;
      const admin = await checkAdmin(uid);
      console.log('checkAdmin returned:', admin);
      if (admin) {
        try {
          window.localStorage.setItem('mckayyaf_admin_uid', uid);
        } catch (e) {}
        window.location.href = createPageUrl('Admin');
      } else {
        setError('Access denied: you are not an admin');
        try { await logout(false); } catch (e) { console.warn('logout failed', e); }
      }
    } catch (err) {
      console.error('login error', err);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Informed</h3>
              <p className="text-slate-400">Get updates on our latest initiatives and upcoming events.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-red-500 w-full sm:w-72"
              />
              <Button
                onClick={async () => {
                  if (!newsletterEmail) return;
                  setSubLoading(true);
                  try {
                    await subscribeNewsletter({ email: newsletterEmail });
                    setSubscribed(true);
                    setNewsletterEmail('');
                  } catch (err) {
                    console.error('Subscribe error', err);
                  }
                  setSubLoading(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold whitespace-nowrap"
                disabled={subLoading}
              >
                {subLoading ? 'Subscribing...' : (subscribed ? 'Subscribed' : 'Subscribe')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* lock removed from newsletter area (kept only in bottom bar) */}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 mb-6">
              <img
                src="/favicon.png"
                alt="McKay YAF"
                className="w-10 h-10 rounded-lg object-cover border border-white/10"
              />
              <span className="text-white font-semibold text-xl tracking-tight">
                McKay <span className="text-red-500">YAF Chapter</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              McKay High School chapter of Young Americans for Freedom. Promoting liberty, free enterprise, and traditional values in Salem, Oregon.
            </p>
            <div className="flex gap-3">
              <a 
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="mailto:trentonparras639@gmail.com"
                className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Priorities', 'Events', 'Leadership', 'Contact'].map((page) => (
                <li key={page}>
                  <Link 
                    to={createPageUrl(page)}
                    className="text-slate-400 hover:text-red-400 transition-colors duration-300 text-sm"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  McKay High School<br />
                  2440 Lancaster Dr NE, Salem, OR 97305
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+19719009884" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  (971) 900-9884
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:trentonparras639@gmail.com" className="text-slate-400 hover:text-red-400 transition-colors text-sm">
                  trentonparras639@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2026 McKay YAF. All rights reserved.</p>
          </div>

          {/* subtle lock positioned at far right edge of footer container */}
          <button
            onClick={() => {
              try {
                const stored = typeof window !== 'undefined' ? window.localStorage.getItem('mckayyaf_admin_uid') : null;
                if ((user && (isAdmin || (stored && user.uid === stored)))) {
                  window.location.href = createPageUrl('Admin');
                  return;
                }
              } catch (e) {}
              setShowAdminLogin(true);
            }}
            aria-label="Open admin login"
            title="Admin login"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 opacity-50 hover:opacity-100 hover:text-red-500 transition-colors"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>

          {/* Tiny admin lock trigger */}

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAdminLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Admin Login</h3>
                </div>
                <button 
                  onClick={() => setShowAdminLogin(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label className="text-slate-300 mb-2 block">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="admin@email.com"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 mb-2 block">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="••••••••"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Login
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;