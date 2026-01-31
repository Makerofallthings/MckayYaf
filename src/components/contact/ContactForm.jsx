import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Build mailto link
    const mailtoSubject = encodeURIComponent(`[${formData.subject}] Contact from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:trentonparras639@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800/50 rounded-3xl p-12 border border-slate-700/50 text-center"
      >
        <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-slate-400 mb-6">
          Thank you for reaching out. Your email client should have opened with your message. 
          If it didn't, please email us directly at{' '}
          <a href="mailto:trentonparras639@gmail.com" className="text-red-400 hover:text-red-300">
            trentonparras639@gmail.com
          </a>
        </p>
        <Button 
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          }}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-white/5 hover:text-white"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-700/50">
      <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
      <p className="text-slate-400 mb-8">Fill out the form below and we'll get back to you soon.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
            <Label className="text-slate-300 mb-2 block">Subject *</Label>
            <Select 
              value={formData.subject} 
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger className={`bg-slate-700/50 border-slate-600 text-white ${errors.subject ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="General Inquiry" className="text-white hover:bg-slate-700">General Inquiry</SelectItem>
                <SelectItem value="Volunteer" className="text-white hover:bg-slate-700">Volunteer Opportunities</SelectItem>
                <SelectItem value="Donations" className="text-white hover:bg-slate-700">Donations</SelectItem>
                <SelectItem value="Partnership" className="text-white hover:bg-slate-700">Partnership</SelectItem>
                <SelectItem value="Media" className="text-white hover:bg-slate-700">Media Inquiry</SelectItem>
                <SelectItem value="Other" className="text-white hover:bg-slate-700">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="text-slate-300 mb-2 block">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500 min-h-[160px] ${errors.message ? 'border-red-500' : ''}`}
            placeholder="How can we help you?"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message
              <Send className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;