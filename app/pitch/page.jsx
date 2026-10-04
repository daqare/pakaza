'use client';
import { useState, useEffect } from 'react';

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      if (e.key === 'ArrowLeft') setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- REUSABLE SVG ILLUSTRATIONS ---
  const DashboardMockup = () => (
    <div className="w-full h-full bg-gray-900 rounded-xl p-4 shadow-2xl border border-gray-700 flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-grow flex gap-4">
        <div className="w-1/4 bg-gray-800 rounded-lg p-3 space-y-3">
          <div className="h-2 bg-gray-700 rounded w-3/4"></div>
          <div className="h-2 bg-gray-700 rounded w-1/2"></div>
          <div className="h-2 bg-[#00A651] rounded w-full mt-8"></div>
        </div>
        <div className="w-3/4 bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-16 bg-gray-700/50 rounded"></div>
            <div className="h-16 bg-gray-700/50 rounded"></div>
            <div className="h-16 bg-[#0047AB]/30 rounded border border-[#0047AB]"></div>
          </div>
          <div className="h-24 bg-gray-700/30 rounded flex items-end justify-around p-2">
            <div className="w-4 h-8 bg-[#00A651] rounded-t"></div>
            <div className="w-4 h-12 bg-[#00A651] rounded-t"></div>
            <div className="w-4 h-16 bg-[#00A651] rounded-t"></div>
            <div className="w-4 h-10 bg-[#00A651] rounded-t"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Minimal Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} className="text-white hover:text-[#00A651] transition font-bold text-lg">←</button>
        <span className="text-white/60 text-sm font-mono">{String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
        <button onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))} className="text-white hover:text-[#00A651] transition font-bold text-lg">→</button>
      </div>

      {/* 16:9 Slide Container */}
      <div className="w-full max-w-7xl aspect-video bg-white shadow-2xl rounded-2xl overflow-hidden relative">
        
        {/* ================= SLIDE 1: TITLE ================= */}
        <div className={`absolute inset-0 bg-[#0047AB] text-white p-20 flex flex-col justify-between transition-all duration-700 ${currentSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0047AB] font-black text-2xl">P</div>
              <span className="text-2xl font-bold tracking-widest">PAKAZA</span>
            </div>
            <h1 className="text-7xl font-black leading-tight mb-6 max-w-4xl">The Digital Infrastructure for <span className="text-[#00A651]">African Logistics.</span></h1>
            <p className="text-2xl text-blue-200 max-w-2xl">Digitizing the $500M informal Matatu transport network for last-mile parcel delivery.</p>
          </div>
          <div className="relative z-10 flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-blue-300">
            <span>Seed Round • 2026</span>
            <span className="w-12 h-px bg-blue-400"></span>
            <span>Confidential</span>
          </div>
        </div>

        {/* ================= SLIDE 2: PROBLEM ================= */}
        <div className={`absolute inset-0 bg-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
          <div className="text-[#ED1C24] font-black text-sm tracking-widest mb-4">01 / THE PROBLEM</div>
          <h2 className="text-5xl font-black text-gray-900 mb-16 max-w-3xl">A Multi-Billion Shilling Market Running on <span className="text-[#ED1C24]">Pen, Paper, and Trust.</span></h2>
          
          <div className="grid grid-cols-3 gap-8 flex-grow">
            {[
              { icon: '👁️', title: 'Zero Visibility', desc: 'Once a parcel leaves the station, it enters a black hole. Senders have no tracking.' },
              { icon: '⚠️', title: 'High Loss & Theft', desc: 'No accountability. "He said, she said" disputes cost the industry millions annually.' },
              { icon: '💸', title: 'Cash Leakage', desc: 'Manual cash handling leads to driver theft, delayed payouts, and SACCO revenue loss.' }
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col justify-between">
                <div className="text-5xl mb-6">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDE 3: SOLUTION ================= */}
        <div className={`absolute inset-0 bg-[#0f172a] text-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
          <div className="text-[#00A651] font-black text-sm tracking-widest mb-4">02 / THE SOLUTION</div>
          <h2 className="text-5xl font-black mb-6 max-w-3xl">We Don't Buy Vans. <br/>We Build the <span className="text-[#00A651]">Digital Layer.</span></h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl">PAKAZA is the software operating system that connects Senders, Staff, Drivers, and SACCOs in one seamless ecosystem.</p>
          
          <div className="flex-grow flex gap-12 items-center">
            <div className="w-1/2 space-y-6">
              {['Instant M-Pesa Booking', 'Real-Time GPS Tracking', 'Digital Proof of Delivery', 'Automated B2C Payouts'].map((feat, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-[#00A651] rounded-lg flex items-center justify-center font-bold">✓</div>
                  <span className="text-xl font-medium">{feat}</span>
                </div>
              ))}
            </div>
            <div className="w-1/2 h-80">
              <DashboardMockup />
            </div>
          </div>
        </div>

        {/* ================= SLIDE 4: HOW IT WORKS ================= */}
        <div className={`absolute inset-0 bg-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
          <div className="text-[#0047AB] font-black text-sm tracking-widest mb-4">03 / THE FLOW</div>
          <h2 className="text-5xl font-black text-gray-900 mb-20">End-to-End Parcel Lifecycle</h2>
          
          <div className="flex-grow flex items-center justify-between relative px-4">
            <div className="absolute top-12 left-20 right-20 h-1 bg-gray-200"></div>
            {[
              { num: '01', title: 'Book & Pay', desc: 'Client pays via M-Pesa STK Push.', color: '#0047AB' },
              { num: '02', title: 'Track', desc: 'Live map updates via SMS & Web.', color: '#0047AB' },
              { num: '03', title: 'Verify', desc: 'Digital signature on collection.', color: '#0047AB' },
              { num: '04', title: 'Settle', desc: '45% auto-paid to driver wallet.', color: '#00A651' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center w-1/4 text-center">
                <div className="w-24 h-24 bg-white border-4 rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl" style={{borderColor: step.color, color: step.color}}>{step.num}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDE 5: BUSINESS MODEL ================= */}
        <div className={`absolute inset-0 bg-[#f8fafc] p-20 flex flex-col transition-all duration-700 ${currentSlide === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="text-[#0047AB] font-black text-sm tracking-widest mb-4">04 / BUSINESS MODEL</div>
          <h2 className="text-5xl font-black text-gray-900 mb-16">The <span className="text-[#0047AB]">50/45/5</span> Revenue Split</h2>
          
          <div className="flex-grow flex items-center gap-20">
            <div className="w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0047AB" strokeWidth="20" strokeDasharray="125.6 251.2" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00A651" strokeWidth="20" strokeDasharray="113 251.2" strokeDashoffset="-125.6" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ED1C24" strokeWidth="20" strokeDasharray="12.6 251.2" strokeDashoffset="-238.6" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-gray-900">100%</span>
                  <span className="text-sm text-gray-500 font-medium">Gross Revenue</span>
                </div>
              </div>
            </div>
            <div className="w-1/2 space-y-8">
              {[
                { pct: '50%', name: 'PAKAZA Platform', desc: 'Tech infrastructure, SaaS fees, and profit.', color: '#0047AB' },
                { pct: '45%', name: 'The Operator / Driver', desc: 'Highly competitive incentive to use our network.', color: '#00A651' },
                { pct: '5%', name: 'SACCO Admin', desc: 'Administrative fee for the physical station.', color: '#ED1C24' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white" style={{backgroundColor: item.color}}>{item.pct}</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SLIDE 6: MARKET SIZE ================= */}
        <div className={`absolute inset-0 bg-[#0047AB] text-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="text-[#00A651] font-black text-sm tracking-widest mb-4">05 / MARKET OPPORTUNITY</div>
          <h2 className="text-5xl font-black mb-20">A Massive, Untapped <span className="text-[#00A651]">Informal Economy.</span></h2>
          
          <div className="flex-grow flex items-center justify-center gap-8">
            {[
              { val: '$500M+', label: 'TAM', sub: 'East African Informal Logistics' },
              { val: '$150M', label: 'SAM', sub: 'Kenyan Matatu Parcel Routes' },
              { val: '$5M', label: 'SOM', sub: 'Initial 3 High-Volume SACCOs' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 text-center w-1/3 hover:bg-white/20 transition">
                <div className="text-7xl font-black text-[#00A651] mb-4">{item.val}</div>
                <div className="text-2xl font-bold mb-2">{item.label}</div>
                <div className="text-blue-200 text-lg">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDE 7: COMPETITIVE MOAT ================= */}
        <div className={`absolute inset-0 bg-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 6 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
          <div className="text-[#0047AB] font-black text-sm tracking-widest mb-4">06 / COMPETITIVE ADVANTAGE</div>
          <h2 className="text-5xl font-black text-gray-900 mb-16">Why We Win. <span className="text-gray-400 font-medium text-3xl block mt-2">Our Unfair Advantage.</span></h2>
          
          <div className="flex-grow grid grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { title: 'First-Mover SACCO Partnerships', desc: 'Exclusive contracts with top 3 Matatu SACCOs in Nairobi.' },
                { title: 'Deep M-Pesa Integration', desc: 'Automated B2C payouts create high switching costs for drivers.' },
                { title: 'Network Effects', desc: 'Every tracked parcel introduces a new user to the PAKAZA ecosystem.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 bg-[#00A651] rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-500 mb-6 uppercase tracking-wider">Feature Comparison</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-center text-sm font-bold text-gray-400 border-b pb-2">
                  <div className="text-left">Feature</div><div>Traditional</div><div className="text-[#0047AB]">PAKAZA</div>
                </div>
                {[['Digital Tracking', '✕', '✓'], ['M-Pesa Integration', '', '✓'], ['Automated Payouts', '✕', '✓'], ['Proof of Delivery', '✕', '✓']].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 text-center items-center py-2">
                    <div className="text-left font-medium text-gray-700">{row[0]}</div>
                    <div className="text-red-400 text-xl">{row[1]}</div>
                    <div className="text-[#00A651] text-xl font-bold">{row[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 8: GO TO MARKET ================= */}
        <div className={`absolute inset-0 bg-[#0f172a] text-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
          <div className="text-[#00A651] font-black text-sm tracking-widest mb-4">07 / GO-TO-MARKET</div>
          <h2 className="text-5xl font-black mb-16">Phased Rollout Strategy</h2>
          
          <div className="flex-grow flex flex-col justify-center gap-6">
            {[
              { phase: 'Phase 01', title: 'Proof of Concept', desc: 'Onboard 3 major SACCOs on Nairobi-Machakos route. Target: 500 parcels/day.', color: '#0047AB' },
              { phase: 'Phase 02', title: 'Hardware & Expansion', desc: 'Deploy PAKAZA tablets to 50 stations. Expand to Mombasa and Kisumu routes.', color: '#00A651' },
              { phase: 'Phase 03', title: 'Viral Consumer Growth', desc: 'Leverage SMS tracking links. Every receiver becomes a potential sender.', color: '#ED1C24' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-8 bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <div className="text-2xl font-black px-6 py-2 rounded-lg" style={{backgroundColor: item.color}}>{item.phase}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDE 9: FINANCIAL PROJECTIONS (UPDATED) ================= */}
        <div className={`absolute inset-0 bg-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="text-[#0047AB] font-black text-sm tracking-widest mb-4">08 / FINANCIAL PROJECTIONS</div>
          <h2 className="text-5xl font-black text-gray-900 mb-12">Path to <span className="text-[#00A651]">135M KES</span> Annual Revenue</h2>
          
          <div className="flex-grow flex gap-12">
            {/* Left: Unit Economics & Projections */}
            <div className="w-1/2 space-y-6">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-[#0047AB] rounded-full"></span>
                  Year 3 Unit Economics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Avg. Parcel Value</span>
                    <span className="text-2xl font-black text-gray-900">KES 500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Daily Volume Target</span>
                    <span className="text-2xl font-black text-[#0047AB]">1,500 Parcels</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Monthly Gross Transaction Value</span>
                    <span className="text-2xl font-black text-gray-900">KES 22.5M</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#00A651] font-bold">PAKAZA Revenue (50% Take Rate)</span>
                    <span className="text-3xl font-black text-[#00A651]">KES 11.25M / mo</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="text-sm text-[#0047AB] font-bold mb-1">Gross Margin</div>
                  <div className="text-3xl font-black text-gray-900">72%</div>
                  <div className="text-gray-500 text-sm">Software-led, asset-light model</div>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <div className="text-sm text-green-600 font-bold mb-1">Break-even</div>
                  <div className="text-3xl font-black text-gray-900">Month 18</div>
                  <div className="text-gray-500 text-sm">At ~400 parcels/day</div>
                </div>
              </div>
            </div>

            {/* Right: Growth Chart */}
            <div className="w-1/2 flex flex-col justify-end">
              <div className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Monthly Revenue Growth (KES Millions)</div>
              <div className="h-80 flex items-end justify-between gap-4 px-4 border-b-2 border-l-2 border-gray-200 pb-4 relative">
                {[1.5, 4.5, 11.25].map((val, i) => (
                  <div key={i} className="flex flex-col items-center w-1/3 group">
                    <div className="text-sm font-bold text-[#00A651] mb-2 opacity-0 group-hover:opacity-100 transition">KES {val}M</div>
                    <div 
                      className="w-full bg-[#0047AB] rounded-t-xl transition-all duration-1000 hover:bg-[#00A651] relative overflow-hidden" 
                      style={{height: `${(val/12)*100}%`}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="mt-4 font-black text-gray-700 text-lg">Year {i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SLIDE 10: TEAM ================= */}
        <div className={`absolute inset-0 bg-[#f8fafc] p-20 flex flex-col transition-all duration-700 ${currentSlide === 9 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="text-[#0047AB] font-black text-sm tracking-widest mb-4">09 / THE TEAM</div>
          <h2 className="text-5xl font-black text-gray-900 mb-16">Built by Operators & Engineers.</h2>
          
          <div className="flex-grow flex justify-center gap-12">
            {[
              { name: 'Abdiweli Elmi', role: 'Founder & CEO', bio: 'Logistics industry veteran. 10+ years in East African transport networks.' },
              { name: 'Abdiweli Elmi', role: 'Chief Technology Officer', bio: 'Ex-Fintech engineer. Specialist in M-Pesa Daraja API and scalable systems.' },
              { name: 'Mike Mulei', role: 'Chief Operating Officer', bio: 'Expert in SACCO relations and last-mile operational efficiency.' }
            ].map((member, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-1/3 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-gray-400">👤</div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{member.name}</h3>
                <div className="text-[#0047AB] font-bold mb-4">{member.role}</div>
                <p className="text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SLIDE 11: DEMO TRANSITION ================= */}
        <div className={`absolute inset-0 bg-gray-900 text-white p-20 flex flex-col items-center justify-center text-center transition-all duration-700 ${currentSlide === 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="w-32 h-32 bg-[#00A651] rounded-full flex items-center justify-center mb-12 animate-pulse shadow-[0_0_60px_rgba(0,166,81,0.5)]">
            <svg className="w-16 h-16 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <h2 className="text-7xl font-black mb-6">Let's See It Live.</h2>
          <p className="text-2xl text-gray-400 max-w-2xl">Slides tell the story. The product proves it. <br/>Switching to the live PAKAZA dashboard...</p>
        </div>

        {/* ================= SLIDE 12: THE ASK ================= */}
        <div className={`absolute inset-0 bg-[#0047AB] text-white p-20 flex flex-col transition-all duration-700 ${currentSlide === 11 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="text-[#00A651] font-black text-sm tracking-widest mb-4">10 / THE ASK</div>
          <h2 className="text-6xl font-black mb-4">Raising <span className="text-[#00A651]">$150,000</span></h2>
          <p className="text-2xl text-blue-200 mb-16">Seed Round to capture the Kenyan Matatu Logistics Market.</p>
          
          <div className="flex-grow flex items-center justify-center gap-8 mb-16">
            {[
              { pct: '40%', title: 'Engineering', sub: 'Daraja API & Scale' },
              { pct: '30%', title: 'Operations', sub: 'SACCO Onboarding' },
              { pct: '30%', title: 'Marketing', sub: 'User Acquisition' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center w-1/3">
                <div className="text-5xl font-black text-[#00A651] mb-2">{item.pct}</div>
                <div className="text-xl font-bold">{item.title}</div>
                <div className="text-blue-200 text-sm mt-1">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-white/20 pt-8">
            <h3 className="text-3xl font-bold mb-2">Abdiweli Mohamed Elmi</h3>
            <p className="text-blue-200 text-lg">ceo@pakaza.network | +254 722 234807</p>
          </div>
        </div>

      </div>
      
      <div className="mt-6 text-white/40 text-sm">Use Left/Right Arrow Keys to Navigate</div>
    </div>
  );
}
