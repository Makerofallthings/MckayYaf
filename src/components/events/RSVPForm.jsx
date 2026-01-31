import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rsvpEvent } from '@/lib/firebaseClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RSVPForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    grade: '',
    dietary: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.grade) newErrors.grade = 'Grade level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await rsvpEvent({ eventId: event.id, eventTitle: event.title, ...formData });
    } catch (err) {
      console.error('RSVP error', err);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center border border-slate-700"
        >
          <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">You're Registered!</h3>
          <p className="text-slate-400 mb-6">
            Thank you for registering for <span className="text-white font-medium">{event.title}</span>. 
            We've sent a confirmation email to {formData.email}.
          </p>
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-slate-300 mb-2">
              <Calendar className="w-5 h-5 text-red-500" />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>{event.location}</span>
            </div>
          </div>
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 w-full">
            Done
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-700"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">RSVP</h3>
            <p className="text-slate-400">{event.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name" className="text-slate-300 mb-2 block">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-slate-300 mb-2 block">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-slate-300 mb-2 block">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="age" className="text-slate-300 mb-2 block">Age *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500 ${errors.age ? 'border-red-500' : ''}`}
              placeholder="16"
            />
            {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <Label className="text-slate-300 mb-2 block">Grade Level *</Label>
            <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
              <SelectTrigger className={`bg-slate-700/50 border-slate-600 text-white ${errors.grade ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <SelectItem key={num} value={String(num)} className="text-white hover:bg-slate-700">
                    Grade {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade}</p>}
          </div>

          <div>
            <Label htmlFor="dietary" className="text-slate-300 mb-2 block">Dietary Restrictions</Label>
            <Input
              id="dietary"
              value={formData.dietary}
              onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500"
              placeholder="Vegetarian, vegan, allergies, etc."
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 shadow-lg shadow-red-600/25"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Submitting...
              </span>
            ) : (
              'Complete RSVP'
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default RSVPForm;