import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicy = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0 && data[0].privacy_policy) {
        setPolicy(data[0].privacy_policy);
      } else {
        setPolicy(`McKay YAF Privacy Policy & Disclaimer

This website is operated by the McKay High School chapter of Young Americans for Freedom (YAF). By using this website, you agree to the following terms:

Information Collection
We may collect personal information such as names and email addresses when you voluntarily submit them through our contact forms or event RSVPs. This information is used solely for chapter communications and event coordination.

Use of Information
Any personal information collected will not be sold, shared, or distributed to third parties without your consent, except as required by law or school policies.

Student Privacy
As a student organization at McKay High School, we are committed to protecting the privacy of our members and website visitors in accordance with applicable student privacy regulations.

Contact Information
If you have questions about this privacy policy, please contact us at trentonparras639@gmail.com.

Disclaimer
The views and opinions expressed on this website are those of McKay YAF and do not necessarily reflect the official policy or position of McKay High School or Salem-Keizer School District.

This policy was last updated in 2026.`);
      }
      setLoading(false);
    };
    loadPolicy();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            {loading ? (
              <p className="text-slate-400">Loading...</p>
            ) : (
              <div className="prose prose-invert prose-slate max-w-none">
                {policy.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
