'use client';
import { useState, useEffect } from 'react';

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      if (e.key === 'ArrowLeft') setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 no-print">
      
      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} className="bg-white px-4 py-2 rounded-lg shadow font-bold text-gray-700 hover:bg-gray-50">← Prev</button>
        <span className="bg-white px-4 py-2 rounded-lg shadow font-bold text-gray-700 flex items-center">{currentSlide + 1} / {totalSlides}</span>
        <button onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))} className="bg-white px-4 py-2 rounded-lg shadow font-bold text-gray-700 hover:bg-gray-50">Next →</button>
        <button onClick={handlePrint} className="bg-[#0047AB] text-white px-4 py-2 rounded-lg shadow font-bold hover:bg-[#003380]"> Download PDF</button>
      </div>

      {/* Slide Container (16:9 Aspect Ratio) */}
      <div className="w-full max-w-6xl aspect-video bg-white shadow-2xl rounded-xl overflow-hidden relative print:w-full print:h-screen print:rounded-none print:shadow-none">
        
        {/* ================= SLIDE 1: TITLE ================= */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0047AB] to-[#003380] text-white p-16 transition-opacity duration-500 ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <div className="text-6xl font-black text-[#0047AB]">P</div>
          </div>
          <h1 className="text-7xl font-black mb-4 tracking-tight">PAKAZA</h1>
          <p className="text-2xl text-blue-200 mb-8 text-center max-w-2xl">Digitizing Africa’s Informal Transport Network for Last-Mile Logistics.</p>
          <div className="flex gap-4 text-xl font-bold">
            <span className="text-[#00A651]">SEND</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">TRACK</span>
            <span className="text-gray-400">•</span>
            <span className="text-[#ED1C24]">DELIVERED</span>
          </div>
          <p className="absolute bottom-8 text-blue-300 text-sm">Confidential Pitch Deck • 2026</p>
        </div>

        {/* ================= SLIDE 2: PROBLEM ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-white transition-opacity duration-500 ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-12">The Matatu Parcel Market is <span className="text-[#ED1C24]">Broken.</span></h2>
          <div className="grid grid-cols-3 gap-8 flex-grow">
            <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-100 flex flex-col">
              <div className="text-6xl mb-6">👁️🗨️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Zero Visibility</h3>
              <p className="text-gray-600 text-lg">Senders have no idea where their parcel is once it leaves the station. It's a black hole.</p>
            </div>
            <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-100 flex flex-col">
              <div className="text-6xl mb-6"></div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">High Risk</h3>
              <p className="text-gray-600 text-lg">Parcels go missing with zero accountability. "He said, she said" is the standard.</p>
            </div>
            <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-100 flex flex-col">
              <div className="text-6xl mb-6">💸</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Cash Leakage</h3>
              <p className="text-gray-600 text-lg">Manual cash handling leads to theft, delayed driver payouts, and lost revenue.</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 3: SOLUTION ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-[#0047AB] text-white transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black mb-4">PAKAZA: The <span className="text-[#00A651]">Digital Layer.</span></h2>
          <p className="text-2xl text-blue-200 mb-12">We don’t buy vans. We don’t hire drivers. We digitize the *existing* infrastructure.</p>
          
          <div className="flex-grow flex items-center justify-center gap-16">
            {/* Left: Text */}
            <div className="w-1/2 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00A651] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Instant Booking & M-Pesa</h3>
                  <p className="text-blue-200">Cashless, secure transactions at the counter.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00A651] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Live Tracking & SMS</h3>
                  <p className="text-blue-200">Real-time visibility for the sender and receiver.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00A651] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Automated B2C Payouts</h3>
                  <p className="text-blue-200">Drivers get paid instantly and transparently.</p>
                </div>
              </div>
            </div>
            
            {/* Right: Phone Mockup Illustration */}
            <div className="w-1/2 flex justify-center">
              <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl p-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col pt-8 px-4">
                  <div className="text-center mb-6">
                    <div className="text-xs font-bold text-gray-400 mb-1">TRACKING ID</div>
                    <div className="text-2xl font-black text-[#0047AB]">PAK-1001</div>
                  </div>
                  <div className="flex-grow bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-2 bg-[#00A651] rounded w-1/2 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="mt-8 flex justify-center">
                      <div className="w-12 h-12 bg-[#0047AB] rounded-full flex items-center justify-center text-white text-xl">✓</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 4: ECOSYSTEM ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-white transition-opacity duration-500 ${currentSlide === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-4">Built for <span className="text-[#0047AB]">Every Stakeholder.</span></h2>
          <p className="text-xl text-gray-500 mb-12">A complete ecosystem, not just a single app.</p>
          
          <div className="grid grid-cols-4 gap-6 flex-grow">
            <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex flex-col">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-black text-[#0047AB] mb-2">Client</h3>
              <p className="text-gray-600 text-sm">SMS tracking, digital waybills, and live status updates.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border-2 border-gray-100 flex flex-col">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Staff</h3>
              <p className="text-gray-600 text-sm">Fast QR-code intake and seamless M-Pesa integration.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100 flex flex-col">
              <div className="text-5xl mb-4">🚐</div>
              <h3 className="text-xl font-black text-[#00A651] mb-2">Driver</h3>
              <p className="text-gray-600 text-sm">Digital wallet and instant M-Pesa B2C withdrawals.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 flex flex-col">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-black text-[#ED1C24] mb-2">Admin</h3>
              <p className="text-gray-600 text-sm">Centralized control tower, analytics, and batch settlements.</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 5: FLOW ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-gray-50 transition-opacity duration-500 ${currentSlide === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-16 text-center">How It Works</h2>
          
          <div className="flex-grow flex items-center justify-between relative px-8">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-16 right-16 h-2 bg-gray-200 -z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center w-1/4">
              <div className="w-20 h-20 bg-[#0047AB] rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg mb-4">1</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Book</h3>
              <p className="text-gray-600 text-sm text-center">Client pays securely via M-Pesa.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center w-1/4">
              <div className="w-20 h-20 bg-[#0047AB] rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg mb-4">2</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Track</h3>
              <p className="text-gray-600 text-sm text-center">Live map tracking as the matatu moves.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center w-1/4">
              <div className="w-20 h-20 bg-[#0047AB] rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg mb-4">3</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Verify</h3>
              <p className="text-gray-600 text-sm text-center">Digital signature Proof of Delivery.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center w-1/4">
              <div className="w-20 h-20 bg-[#00A651] rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg mb-4">4</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Pay</h3>
              <p className="text-gray-600 text-sm text-center">Automated 45% payout to driver.</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 6: BUSINESS MODEL ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-white transition-opacity duration-500 ${currentSlide === 5 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-4">The <span className="text-[#0047AB]">50/45/5</span> Revenue Split</h2>
          <p className="text-xl text-gray-500 mb-12">Aligning incentives for the entire network.</p>
          
          <div className="flex-grow flex items-center justify-center gap-16">
            {/* SVG Pie Chart */}
            <div className="w-96 h-96 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0047AB" strokeWidth="20" strokeDasharray="125.6 125.6" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00A651" strokeWidth="20" strokeDasharray="113 125.6" strokeDashoffset="-125.6" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ED1C24" strokeWidth="20" strokeDasharray="12.5 125.6" strokeDashoffset="-238.6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#0047AB] rounded-2xl flex items-center justify-center text-3xl font-black text-white">50%</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">PAKAZA Platform</h3>
                  <p className="text-gray-600">Tech maintenance, infrastructure, and profit.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#00A651] rounded-2xl flex items-center justify-center text-3xl font-black text-white">45%</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">The Operator</h3>
                  <p className="text-gray-600">Highly competitive incentive for drivers.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#ED1C24] rounded-2xl flex items-center justify-center text-3xl font-black text-white">5%</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">SACCO Admin</h3>
                  <p className="text-gray-600">Administrative fee for the physical station.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 7: MARKET ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-[#003380] text-white transition-opacity duration-500 ${currentSlide === 6 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black mb-16 text-center">A Multi-Billion Shilling Opportunity</h2>
          
          <div className="flex-grow flex items-center justify-center gap-12">
            <div className="bg-white/10 backdrop-blur p-12 rounded-3xl border border-white/20 text-center w-1/3">
              <div className="text-7xl font-black text-[#00A651] mb-4">$500M+</div>
              <h3 className="text-2xl font-bold mb-2">TAM</h3>
              <p className="text-blue-200">East African informal logistics market.</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-12 rounded-3xl border border-white/20 text-center w-1/3">
              <div className="text-7xl font-black text-[#00A651] mb-4">$150M</div>
              <h3 className="text-2xl font-bold mb-2">SAM</h3>
              <p className="text-blue-200">Kenyan Matatu parcel routes.</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-12 rounded-3xl border border-white/20 text-center w-1/3">
              <div className="text-7xl font-black text-[#00A651] mb-4">$5M</div>
              <h3 className="text-2xl font-bold mb-2">SOM</h3>
              <p className="text-blue-200">Initial 3 major SACCO routes.</p>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 8: GTM ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-white transition-opacity duration-500 ${currentSlide === 7 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black text-gray-900 mb-16 text-center">Go-To-Market Strategy</h2>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-4xl space-y-8">
              <div className="flex items-center gap-8 bg-blue-50 p-8 rounded-3xl border-l-8 border-[#0047AB]">
                <div className="text-6xl font-black text-[#0047AB]">01</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Partner with Major SACCOs</h3>
                  <p className="text-gray-600 text-lg">Onboard 3 high-volume routes (e.g., Nairobi-Machakos) to prove the model.</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-green-50 p-8 rounded-3xl border-l-8 border-[#00A651]">
                <div className="text-6xl font-black text-[#00A651]">02</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Equip Station Staff</h3>
                  <p className="text-gray-600 text-lg">Provide free PAKAZA tablets and training to counter staff for fast adoption.</p>
                </div>
              </div>
              <div className="flex items-center gap-8 bg-red-50 p-8 rounded-3xl border-l-8 border-[#ED1C24]">
                <div className="text-6xl font-black text-[#ED1C24]">03</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Viral SMS Growth</h3>
                  <p className="text-gray-600 text-lg">Every receiver gets a tracking SMS. Every receiver becomes a potential sender.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 9: DEMO ================= */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-16 transition-opacity duration-500 ${currentSlide === 8 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="text-[#00A651] font-black text-sm uppercase tracking-widest mb-4">Live Demonstration</div>
          <h2 className="text-7xl font-black mb-8 text-center">See it in Action.</h2>
          <p className="text-2xl text-gray-400 text-center max-w-2xl mb-12">Slides are great, but let me show you the actual platform in real-time.</p>
          <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="text-6xl">▶</div>
          </div>
        </div>

        {/* ================= SLIDE 10: ASK ================= */}
        <div className={`absolute inset-0 flex flex-col p-16 bg-[#0047AB] text-white transition-opacity duration-500 ${currentSlide === 9 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <h2 className="text-5xl font-black mb-4 text-center">Fueling the Growth</h2>
          <p className="text-3xl text-blue-200 mb-16 text-center">Raising <span className="text-white font-black">$150,000</span> Seed Round</p>
          
          <div className="flex-grow flex items-center justify-center gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20 text-center w-1/3">
              <div className="text-5xl font-black text-[#00A651] mb-2">40%</div>
              <p className="font-bold text-xl">Engineering</p>
              <p className="text-sm text-blue-200 mt-2">M-Pesa Daraja API & Scaling</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20 text-center w-1/3">
              <div className="text-5xl font-black text-[#00A651] mb-2">30%</div>
              <p className="font-bold text-xl">Operations</p>
              <p className="text-sm text-blue-200 mt-2">SACCO Onboarding & Support</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20 text-center w-1/3">
              <div className="text-5xl font-black text-[#00A651] mb-2">30%</div>
              <p className="font-bold text-xl">Marketing</p>
              <p className="text-sm text-blue-200 mt-2">Customer Acquisition</p>
            </div>
          </div>

          <div className="text-center border-t border-white/20 pt-8">
            <h3 className="text-2xl font-bold mb-2">[Your Name]</h3>
            <p className="text-blue-200">founder@pakaza.network | +254 7XX XXX XXX</p>
          </div>
        </div>

      </div>

      {/* Print Styles for PDF Download */}
      <style jsx global>{`
        @media print {
          body { background: white; }
          .no-print { display: none !important; }
          .print\\:w-full { width: 100% !important; height: 100vh !important; }
          .print\\:h-screen { height: 100vh !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          
          /* Force each slide to be on its own page */
          .absolute.inset-0 {
            position: relative !important;
            opacity: 100 !important;
            z-index: 10 !important;
            page-break-after: always;
            height: 100vh;
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}
