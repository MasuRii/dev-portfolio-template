import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  isTextArea?: boolean;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  isTextArea = false,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  const inputClasses = `
    w-full px-0 py-3 bg-transparent border-b border-border focus:border-accent outline-none transition-all duration-300
    ${error ? 'border-error/50' : ''}
    placeholder:opacity-0 focus:shadow-[0_4px_12px_-4px_rgba(79,70,229,0.1)]
  `;

  return (
    <div className="relative group pt-4">
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isActive ? -24 : 0,
          scale: isActive ? 0.85 : 1,
          color: isFocused ? 'var(--accent)' : 'var(--secondary)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute left-0 top-3 pointer-events-none origin-left text-secondary/70"
      >
        {label}
      </motion.label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${inputClasses} resize-none`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <motion.div
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          backgroundColor: error ? 'var(--error)' : 'var(--accent)',
        }}
        className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          className="text-xs text-error mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: '', // Bot trap
  });

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Check honeypot
    if (formData._honeypot) {
      console.warn('Bot detected via honeypot');
      setStatus('success'); // Silently fail for bots
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT;

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send message');
      } else {
        // Simulate API call for local development/placeholder
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Placeholder Form Submission:', formData);
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        _honeypot: '',
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.'
      );
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="p-8 rounded-2xl border border-border bg-surface shadow-xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-12 text-center"
            data-testid="contact-success"
          >
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-secondary">
              Thanks for reaching out. I'll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-8"
            noValidate
            data-testid="contact-form"
          >
            {/* Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="_honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData._honeypot}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputField
                id="name"
                label="Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <InputField
              id="subject"
              label="Subject"
              placeholder="Project Inquiry"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
            />

            <InputField
              id="message"
              label="Message"
              isTextArea
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm flex items-center gap-3"
                data-testid="contact-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMessage}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'submitting'}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-accent to-accent-alt text-white font-bold rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
