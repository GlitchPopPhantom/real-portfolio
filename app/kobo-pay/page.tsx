import React from 'react';
import { 
  Globe2, 
  Code2, 
  CreditCard, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const KoboPayLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">Kobo Pay</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#products" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Products</a>
              <a href="#developers" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Developers</a>
              <a href="#company" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Company</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-slate-600 hover:text-slate-900 font-medium">Sign In</button>
              <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-slate-100 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
            The Financial Orchestration Layer for Africa & G20
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 max-w-4xl mx-auto leading-tight">
            We make local rails <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              globally usable.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Kobo Pay is not just a payments company. We're the orchestration layer that sits between your business and the complexity of global finance. One integration gives you the infrastructure to launch and scale across 35+ countries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              Start Building <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors">
              Read the Docs
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900">35+</div>
              <div className="text-sm text-slate-500 mt-1">Countries Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">30+</div>
              <div className="text-sm text-slate-500 mt-1">Payment Methods</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">7M+</div>
              <div className="text-sm text-slate-500 mt-1">Transactions Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">Zero</div>
              <div className="text-sm text-slate-500 mt-1">Reconciliation Overhead</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Products Grid */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Financial Command</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Open accounts with local bank details in minutes, accept payments in native currencies, eliminate forced conversion fees, and move money globally at speed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Payments API</h3>
              <p className="text-slate-600 mb-6">
                Connect through a single API. Access every major African payment method and G20 corridor through a single integration. No local entities required.
              </p>
              <a href="#" className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Explore API <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Liquidity & FX</h3>
              <p className="text-slate-600 mb-6">
                Receive, convert, and move funds across fiat and cryptocurrency globally. Manage cash flow with active treasury control, not passive absorption.
              </p>
              <a href="#" className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Explore Treasury <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acquiring & Payouts</h3>
              <p className="text-slate-600 mb-6">
                Go global with local acquiring. Process transfers with APMs and pay out instantly to bank accounts, mobile wallets, and crypto addresses.
              </p>
              <a href="#" className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Explore Payouts <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Advantage / Comparison */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Kobo Pay Advantage</h2>
              <p className="text-lg text-slate-400 mb-8">
                Traditional providers give you a patchwork of country-by-country deals. We give you intelligent, unified control.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Intelligent Routing</h4>
                    <p className="text-slate-400">Every transaction is dynamically routed based on cost, speed, success rate, and FX efficiency. Not just a path; the right path.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Embedded Compliance</h4>
                    <p className="text-slate-400">Local licensing, KYC, AML, and sanctions screening are native to the layer. Compliance isn't a gate. It's part of the flow.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Real-Time Control</h4>
                    <p className="text-slate-400">Monitor or reconcile in live time. Full visibility across fiat and crypto ledgers. Zero blind spots.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table Card */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-6 text-center">Infrastructure Comparison</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 border-b border-slate-700 pb-4 text-sm font-semibold text-slate-400">
                  <div>Feature</div>
                  <div>Legacy Gateways</div>
                  <div className="text-emerald-400">Kobo Pay</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-slate-700 pb-4 text-sm">
                  <div className="font-medium">Market Access</div>
                  <div className="text-slate-400">Country-by-country</div>
                  <div className="font-bold">Unified Africa + G20</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-slate-700 pb-4 text-sm">
                  <div className="font-medium">Compliance</div>
                  <div className="text-slate-400">Manual, reactive</div>
                  <div className="font-bold">Embedded, real-time</div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-slate-700 pb-4 text-sm">
                  <div className="font-medium">Pricing</div>
                  <div className="text-slate-400">Per-transaction</div>
                  <div className="font-bold">Value-based scale</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">Crypto/Fiat</div>
                  <div className="text-slate-400">Separate vendors</div>
                  <div className="font-bold">Native bridging</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Get started in minutes</h2>
          <p className="text-xl text-emerald-100 mb-10">
            Join enterprises, fintechs, and marketplaces scaling their gig economy and SaaS payouts across emerging markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors">
              Talk to Sales
            </button>
            <button className="bg-emerald-500 text-white border border-emerald-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">K</span>
                </div>
                <span className="font-bold text-xl text-slate-900">Kobo Pay</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                The financial orchestration layer bridging the worlds of fiat and cryptocurrency for global businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Products</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">Unified API</a></li>
                <li><a href="#" className="hover:text-emerald-600">Acquiring</a></li>
                <li><a href="#" className="hover:text-emerald-600">Payment Methods</a></li>
                <li><a href="#" className="hover:text-emerald-600">Treasury & FX</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">Docs & API</a></li>
                <li><a href="#" className="hover:text-emerald-600">Support Center</a></li>
                <li><a href="#" className="hover:text-emerald-600">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600">Customer Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-600">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Kobo Pay Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900">Twitter</a>
              <a href="#" className="hover:text-slate-900">LinkedIn</a>
              <a href="#" className="hover:text-slate-900">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KoboPayLanding;