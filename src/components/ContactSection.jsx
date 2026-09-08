import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Message sent successfully");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="relative isolate overflow-hidden py-24 bg-[#05010f]">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-600/10" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,cyan_0%,transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white tracking-wide">
            Contact <span className="text-cyan-400">Croma Mart</span>
          </h2>
          <p className="text-white/70 mt-3">
            We're here to help — connect with us anytime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-neon">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white/80 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@cromamart.com"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Write subject"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-dark font-semibold tracking-wide hover:shadow-lg hover:shadow-cyan-500/40 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="relative h-[460px] rounded-2xl overflow-hidden border-[5px] border-cyan-400 shadow-[0_0_45px_rgba(34,211,238,0.6)]">
            <iframe
              title="Bangalore Location"
              src="https://www.google.com/maps?q=Bangalore%20Karnataka&output=embed"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
