import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Phone, User, MessageSquare, Send, Linkedin, Github, Copy, Check } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      tl.from('.contact-title', { y: 50, opacity: 0, duration: 1 })
        .from('.contact-field', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
        .from('.contact-info', { x: -30, opacity: 0, duration: 1 }, '-=0.8')
        .from('.social-link', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      gsap.from('.success-content', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, [isSubmitted]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyEmail = () => {
    const email = 'eliashabibhamidabdu@gmail.com';
    
    // Modern approach (requires HTTPS or localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email);
    } else {
      // Legacy fallback (essential for local network testing over HTTP)
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed"; 
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      textArea.remove();
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-12 md:py-32 bg-obsidian overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-16 container">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-start lg:grid-rows-[auto_1fr]">
          
          {/* Block 1: Heading (Mobile: Top, Desktop: Top Left) */}
          <div className="space-y-3 md:space-y-4 order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <span className="contact-title block text-champagne font-mono text-sm tracking-[0.3em] uppercase italic">
              Strategic Digital Consultant
            </span>
            <h2 className="contact-title text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-ivory tracking-tight leading-none">
              Say <span className="font-drama italic font-normal text-champagne">Hello.</span>
            </h2>
            <p className="contact-title text-slate-400 text-sm md:text-lg max-w-md leading-relaxed">
              Whether you have a specific project in mind or just want to explore possibilities, I'm here to architect your next digital experience.
            </p>
          </div>

          {/* Block 2: Contact Info & Socials (Mobile: Bottom, Desktop: Bottom Left) */}
          <div className="contact-info space-y-8 order-3 lg:order-none lg:col-start-1 lg:row-start-2 pt-4 lg:pt-0">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-slate/30 border border-ivory/5 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-obsidian transition-all duration-500 shadow-lg">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <p 
                      onClick={copyEmail}
                      className="text-ivory font-sans transition-colors group-hover:text-champagne cursor-pointer text-sm sm:text-base break-all"
                    >
                      eliashabibhamidabdu@gmail.com
                    </p>
                    <button 
                      onClick={copyEmail}
                      className="p-3 sm:p-1.5 rounded-md hover:bg-ivory/5 text-slate-400 hover:text-champagne transition-all shrink-0"
                      title="Copy Email"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-slate/30 border border-ivory/5 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-obsidian transition-all duration-500 shadow-lg">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-ivory font-sans">+251 963 138 123</p>
                </div>
              </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4">
              <a href="#" className="social-link w-10 h-10 flex items-center justify-center border border-ivory/10 rounded-full text-slate-400 hover:text-champagne hover:border-champagne transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="social-link w-10 h-10 flex items-center justify-center border border-ivory/10 rounded-full text-slate-400 hover:text-champagne hover:border-champagne transition-all duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Block 3: Contact Form / Success State (Mobile: Middle, Desktop: Right Column spanning both rows) */}
          <div className="relative order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} autoComplete="off" className="relative z-10 space-y-4 md:space-y-8 bg-slate/20 backdrop-blur-xl p-4 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-ivory/5 shadow-2xl mx-1 sm:mx-0">
                {/* Honeypot fields to distract browser autofill engines */}
                <input type="text" name="prevent_autofill" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                <input type="password" name="password_fake" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="contact-field space-y-1 md:space-y-2">
                    <label htmlFor="name" className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">
                      <User size={12} className="text-champagne" /> Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      required
                      autoComplete="new-password"
                      spellCheck="false"
                      className="w-full bg-transparent border-b border-ivory/10 py-2 md:py-3 text-sm md:text-base text-ivory placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-champagne appearance-none"
                    />
                  </div>
                  <div className="contact-field space-y-1 md:space-y-2">
                    <label htmlFor="phone" className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">
                      <Phone size={12} className="text-champagne" /> Phone (Ethiopia)
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      pattern="^(\+251|0)[97]\d{8}$"
                      title="Please enter a valid Ethiopian phone number (e.g., +251 911223344 or 0911223344)"
                      autoComplete="new-password"
                      spellCheck="false"
                      className="w-full bg-transparent border-b border-ivory/10 py-2 md:py-3 text-sm md:text-base text-ivory placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-champagne appearance-none"
                    />
                  </div>
                </div>

                <div className="contact-field space-y-1 md:space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">
                    <Mail size={12} className="text-champagne" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                    autoComplete="new-password"
                    spellCheck="false"
                    className="w-full bg-transparent border-b border-ivory/10 py-2 md:py-3 text-sm md:text-base text-ivory placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-champagne appearance-none"
                  />
                </div>

                <div className="contact-field space-y-1 md:space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">
                    <MessageSquare size={12} className="text-champagne" /> Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your project or goal..."
                    required
                    rows="3"
                    autoComplete="new-password"
                    spellCheck="false"
                    className="w-full bg-transparent border-b border-ivory/10 py-2 md:py-3 text-sm md:text-base text-ivory placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-champagne resize-none appearance-none"
                  ></textarea>
                </div>

                <div className="contact-field pt-2 md:pt-4">
                  <button 
                    type="submit" 
                    className="group relative w-full h-12 md:h-16 overflow-hidden rounded-full bg-champagne text-obsidian font-sans font-bold uppercase tracking-widest text-xs md:text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] duration-500"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Send Message <Send size={16} />
                    </span>
                    <div className="absolute inset-0 bg-ivory translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </form>
            ) : (
              <div className="success-content relative z-10 bg-slate/20 backdrop-blur-xl p-12 md:p-20 rounded-[2.5rem] border border-ivory/5 shadow-2xl flex flex-col items-center text-center space-y-8">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                  <Check size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-sans font-bold text-ivory tracking-tight">Message Received.</h3>
                  <p className="text-slate-400 leading-relaxed font-sans">
                    Thank you for reaching out, {formData.name.split(' ')[0]}. <br />
                    I have received your inquiry and will review it meticulously. Expect a response within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-champagne font-mono text-xs uppercase tracking-widest hover:text-ivory transition-colors pt-4 underline underline-offset-8 decoration-champagne/30"
                >
                  Return to Form
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
