import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, X, Send, Check, Copy, AlertCircle, Compass, Shield } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const emailAddress = 'phantomcruiz5@gmail.com';
  const phoneNumber = '8491829274';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please write a message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitted({ name: name.trim(), email: email.trim(), subject, message: message.trim() });

    // Simulate luxury sealed letter dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('General Inquiry');
      setMessage('');
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden z-10 flex flex-col md:flex-row"
          >
            {/* Left Side: Vintage Royal Aesthetics & Direct Contact Info */}
            <div className="md:w-5/12 bg-neutral-950 text-white p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-neutral-800">
              {/* Subtle background graphic */}
              <div className="absolute inset-0 opacity-15 mix-blend-overlay">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop" 
                  alt="Mountains" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Golden circular constellation accent */}
              <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full border border-neutral-800/60 pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-dashed border-amber-500/20 pointer-events-none animate-[spin_60s_linear_infinite]" />

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="font-mono text-[9px] text-amber-500 tracking-widest uppercase block mb-1">Direct Routing</span>
                  <h3 className="font-display font-bold text-xl tracking-wider text-neutral-100">COMMUNICATION CORES</h3>
                </div>

                <p className="font-serif italic text-xs text-neutral-400 leading-relaxed">
                  "The finest trails are those built on authentic connections. Dispatch your inquiry directly to our vintage sorting chambers."
                </p>
              </div>

              {/* Verified contact credentials */}
              <div className="relative z-10 space-y-4 mt-8 md:mt-0">
                <div className="space-y-1 group">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">EMAIL REGISTER</span>
                  <div className="flex items-center justify-between gap-2 bg-neutral-900/60 p-2 rounded-sm border border-neutral-800/80">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono text-xs text-neutral-300 truncate select-all">{emailAddress}</span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="text-neutral-500 hover:text-white transition-colors p-1"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 group">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">SECURE TELEPHONY</span>
                  <div className="flex items-center justify-between gap-2 bg-neutral-900/60 p-2 rounded-sm border border-neutral-800/80">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono text-xs text-neutral-300 select-all">+{phoneNumber}</span>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      className="text-neutral-500 hover:text-white transition-colors p-1"
                      title="Copy Telephone Line"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-neutral-900 font-mono text-[9px] text-neutral-500 flex items-center justify-between">
                <span>ESTABLISHED 2026</span>
                <Compass className="w-3.5 h-3.5 text-neutral-600 animate-[pulse_3s_infinite]" />
              </div>
            </div>

            {/* Right Side: Interactive Dispatch Form */}
            <div className="flex-1 p-8 bg-white relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all rounded-sm border border-transparent hover:border-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="font-display font-bold text-lg tracking-wider text-neutral-900 uppercase">DISPATCH CARRIER</h2>
                      <p className="font-serif italic text-xs text-neutral-500 mt-1">
                        Send an authenticated transmission to Nomad Headquarters.
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-xs font-mono p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3 font-mono">
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                          Sender Identification
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name (e.g., Captain Wanderer)"
                          className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-neutral-900 rounded-sm py-2 px-3 text-xs focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                          Return Transit Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email (e.g., nomad@trail.com)"
                          className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-neutral-900 rounded-sm py-2 px-3 text-xs focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                          Transmission Classification
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-neutral-900 rounded-sm py-2.5 px-3 text-xs focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="General Inquiry">General Inquiry / Feedback</option>
                          <option value="Order Tracking">Order & Logistics Routing</option>
                          <option value="Custom Brand Fit">Custom Sizing & Aesthetics</option>
                          <option value="Collaborations">Collaborations / Retails</option>
                          <option value="Return Dispatch">Return / Exchange Dispatch</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
                          Secure Message Content
                        </label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe your inquiry with detail. Standard encrypted routing applied..."
                          className="w-full bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-neutral-900 rounded-sm py-2 px-3 text-xs focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-mono text-xs tracking-widest py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm font-bold border border-transparent hover:border-neutral-900 mt-4"
                      >
                        {isSubmitting ? (
                          <>
                            <Compass className="w-4 h-4 animate-spin text-amber-400" />
                            <span>SEALING LETTER...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>DISPATCH TRANSMISSION</span>
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                   <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center relative">
                      <Check className="w-8 h-8 text-emerald-600" />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-base tracking-widest text-neutral-900 uppercase">
                        TRANSMISSION LOGGED & SEALED
                      </h3>
                      <p className="font-mono text-[10px] text-amber-600 tracking-wider font-semibold">
                        ROUTING DIRECTLY TO: {emailAddress}
                      </p>
                    </div>

                    <div className="max-w-md bg-neutral-50 border border-neutral-200 p-4 rounded-sm space-y-3 text-left">
                      <p className="font-serif italic text-xs text-neutral-600 leading-relaxed">
                        "Your letter has been securely formatted and sent to our principal address at <strong className="text-neutral-900">{emailAddress}</strong>. To ensure instant delivery or to send from your personal mailbox client, click the button below."
                      </p>
                      <div className="border-t border-neutral-200/60 pt-2 flex flex-col gap-1 font-mono text-[9px] text-neutral-500">
                        <div className="flex justify-between">
                          <span>SENDER ID:</span>
                          <span className="font-bold text-neutral-800">{lastSubmitted.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CLASSIFICATION:</span>
                          <span className="font-bold text-neutral-800">{lastSubmitted.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SENDER EMAIL:</span>
                          <span className="font-bold text-neutral-800">{lastSubmitted.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                      <a
                        href={`mailto:${emailAddress}?subject=${encodeURIComponent(`[Nomad Co. - ${lastSubmitted.subject}] Inquiry from ${lastSubmitted.name}`)}&body=${encodeURIComponent(
                          `Hello Nomad Team,\n\nI am reaching out regarding: ${lastSubmitted.subject}.\n\nMy Message:\n"${lastSubmitted.message}"\n\nReturn Contact Details:\nName: ${lastSubmitted.name}\nEmail: ${lastSubmitted.email}\n\n---\nSent via Nomad Kashmir Digital Chamber`
                        )}`}
                        className="font-mono text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm border border-transparent hover:border-neutral-950 text-center"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        SEND VIA MAIL CLIENT
                      </a>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="font-mono text-xs border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50 px-5 py-3 rounded-sm transition-all text-neutral-600 hover:text-neutral-950"
                      >
                        SEND ANOTHER
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
