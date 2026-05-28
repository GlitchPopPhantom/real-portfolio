import React from 'react';
import { Zap, Shield, BarChart3, ChevronRight, Check } from 'lucide-react';

const WhiplashLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 border-b border-slate-100">
        <div className="text-2xl font-black tracking-tighter text-blue-600">WHIPLASH</div>
        <nav className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#" className="hover:text-blue-600">Features</a>
          <a href="#" className="hover:text-blue-600">Pricing</a>
          <a href="#" className="hover:text-blue-600">Enterprise</a>
        </nav>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800">
          Get Started
        </button>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto pt-24 pb-16 px-6 text-center">
        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Move Faster.</span>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mt-6 mb-8">
          Automation at the <br /> speed of thought.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Whiplash integrates your entire stack, automating high-latency workflows with zero configuration.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2">
            Start Free Trial <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "Instant Deployment", desc: "Get your workflows live in seconds, not weeks." },
          { icon: BarChart3, title: "Real-time Insights", desc: "Monitor your velocity with advanced telemetry." },
          { icon: Shield, title: "Enterprise Security", desc: "SOC2 compliant infrastructure out of the box." }
        ].map((feature, idx) => (
          <div key={idx} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <feature.icon className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Simple Pricing Section */}
      <section className="bg-slate-900 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">Simple, transparent pricing</h2>
        <div className="max-w-sm mx-auto bg-white text-slate-900 p-8 rounded-2xl">
          <h4 className="text-lg font-bold mb-4">Pro Plan</h4>
          <div className="text-5xl font-black mb-6">$49<span className="text-xl font-medium text-slate-500">/mo</span></div>
          <ul className="text-left space-y-4 mb-8">
            {["Unlimited automations", "Priority support", "Advanced Analytics"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={18} className="text-blue-600" /> {item}
              </li>
            ))}
          </ul>
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">Choose Plan</button>
        </div>
      </section>
    </div>
  );
};

export default WhiplashLanding;