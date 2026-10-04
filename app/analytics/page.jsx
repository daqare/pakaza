'use client';
import Link from 'next/link';
import usePakazaStore from '../../lib/store';

export default function AnalyticsPage() {
  const { parcels, ledger, saccos } = usePakazaStore();
  
  const safeParcels = Array.isArray(parcels) ? parcels : [];
  const safeLedger = Array.isArray(ledger) ? ledger : [];
  const safeSaccos = Array.isArray(saccos) ? saccos : [];

  // 1. Calculate Revenue Split (The 50/45/5 Rule)
  const totalRevenue = safeLedger.filter(l => l.type === 'REVENUE').reduce((sum, e) => sum + (e.total || 0), 0);
  const pakazaShare = Math.round(totalRevenue * 0.50);
  const operatorShare = Math.round(totalRevenue * 0.45);
  const saccoShare = Math.round(totalRevenue * 0.05);

  // 2. Calculate Busiest Routes (Parcels per SACCO)
  const routeStats = safeSaccos.map(s => ({
    name: s.name,
    count: safeParcels.filter(p => p.saccoId === s.id).length,
    color: s.color
  })).sort((a, b) => b.count - a.count);

  const maxRouteCount = Math.max(...routeStats.map(r => r.count), 1);

  // 3. Status Distribution
  const statusCounts = {
    PAID: safeParcels.filter(p => p.status === 'PAID').length,
    IN_TRANSIT: safeParcels.filter(p => p.status === 'IN_TRANSIT').length,
    ARRIVED: safeParcels.filter(p => p.status === 'ARRIVED').length,
    COLLECTED: safeParcels.filter(p => p.status === 'COLLECTED').length,
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <Link href="/dashboard" className="text-[#0047AB] hover:underline text-sm font-bold flex items-center gap-1 mb-2">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[#0047AB]">Business Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time insights into network performance and revenue.</p>
        </div>
        <div className="text-4xl bg-gray-100 p-3 rounded-2xl">📊</div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Parcels</p>
          <p className="text-3xl font-black text-gray-900">{safeParcels.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border-l-4 border-[#0047AB] shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Gross Revenue</p>
          <p className="text-3xl font-black text-[#0047AB]">KES {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border-l-4 border-[#00A651] shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Active Matatus</p>
          <p className="text-3xl font-black text-[#00A651]">{statusCounts.IN_TRANSIT}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border-l-4 border-[#ED1C24] shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Completed</p>
          <p className="text-3xl font-black text-[#ED1C24]">{statusCounts.COLLECTED}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Revenue Distribution (The 50/45/5 Split) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Distribution Model</h2>
          <div className="space-y-6">
            {/* PAKAZA 50% */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700">PAKAZA Platform (50%)</span>
                <span className="font-black text-[#0047AB]">KES {pakazaShare.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-[#0047AB] h-4 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
              </div>
            </div>
            {/* Operator 45% */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700">Operator / Driver (45%)</span>
                <span className="font-black text-[#00A651]">KES {operatorShare.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-[#00A651] h-4 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
              </div>
            </div>
            {/* SACCO 5% */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-gray-700">SACCO Admin Fee (5%)</span>
                <span className="font-black text-[#ED1C24]">KES {saccoShare.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-[#ED1C24] h-4 rounded-full transition-all duration-1000" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Busiest Routes */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Busiest Routes (Volume)</h2>
          <div className="space-y-4">
            {routeStats.map((route, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 ${route.color} rounded-lg flex items-center justify-center text-white font-bold shadow-sm`}>
                  {route.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{route.name}</span>
                    <span className="text-sm font-bold text-gray-900">{route.count} Parcels</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${route.color} h-2 rounded-full transition-all duration-1000`} 
                      style={{ width: `${(route.count / maxRouteCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            {routeStats.length === 0 && <p className="text-gray-500 text-center py-4">No route data available yet.</p>}
          </div>
        </div>

        {/* Chart 3: Live Fleet Status (Donut Chart Simulation) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Live Fleet Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
              <div className="text-3xl font-black text-blue-700 mb-1">{statusCounts.PAID}</div>
              <p className="text-xs font-bold text-blue-600 uppercase">Booked & Paid</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
              <div className="text-3xl font-black text-purple-700 mb-1">{statusCounts.IN_TRANSIT}</div>
              <p className="text-xs font-bold text-purple-600 uppercase">In Transit</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
              <div className="text-3xl font-black text-green-700 mb-1">{statusCounts.ARRIVED}</div>
              <p className="text-xs font-bold text-green-600 uppercase">Arrived at Hub</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl font-black text-gray-700 mb-1">{statusCounts.COLLECTED}</div>
              <p className="text-xs font-bold text-gray-600 uppercase">Successfully Collected</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
