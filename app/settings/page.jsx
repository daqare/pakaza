'use client';
import { useState } from 'react';
import Link from 'next/link';
import usePakazaStore from '../../lib/store';

export default function SettingsPage() {
  const { saccos, vehicles, addSacco, addVehicle } = usePakazaStore();
  const [activeTab, setActiveTab] = useState('saccos');
  
  const safeSaccos = Array.isArray(saccos) ? saccos : [];
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  
  const [newSacco, setNewSacco] = useState({ name: '', route: '', color: 'bg-blue-500', payoutNumber: '' });
  const [newVehicle, setNewVehicle] = useState({ plate: '', driver: '', saccoId: safeSaccos[0]?.id || '' });

  const handleAddSacco = (e) => {
    e.preventDefault();
    if (newSacco.name && newSacco.route && newSacco.payoutNumber) {
      addSacco(newSacco);
      setNewSacco({ name: '', route: '', color: 'bg-blue-500', payoutNumber: '' });
    }
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (newVehicle.plate && newVehicle.driver) {
      addVehicle(newVehicle);
      setNewVehicle({ plate: '', driver: '', saccoId: safeSaccos[0]?.id || '' });
    }
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/dashboard" className="text-[#0047AB] hover:underline text-sm font-bold flex items-center gap-1 mb-2">← Back to Dashboard</Link>
          <h1 className="text-3xl font-black text-[#0047AB] mt-2">Network & Fleet Management</h1>
          <p className="text-sm text-gray-500">Register new partners and assign vehicles.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('saccos')}
          className={`px-6 py-3 font-semibold transition ${activeTab === 'saccos' ? 'text-[#0047AB] border-b-2 border-[#0047AB]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          SACCO Partners
        </button>
        <button 
          onClick={() => setActiveTab('vehicles')}
          className={`px-6 py-3 font-semibold transition ${activeTab === 'vehicles' ? 'text-[#0047AB] border-b-2 border-[#0047AB]' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Fleet Registry
        </button>
      </div>

      {activeTab === 'saccos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Register New SACCO</h2>
            <form onSubmit={handleAddSacco} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">SACCO Name</label>
                <input type="text" required value={newSacco.name} onChange={(e) => setNewSacco({...newSacco, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none" placeholder="e.g., Easy Coach" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Route</label>
                <input type="text" required value={newSacco.route} onChange={(e) => setNewSacco({...newSacco, route: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none" placeholder="e.g., Nairobi - Kisumu" />
              </div>
              {/* NEW: M-Pesa Payout Number Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">M-Pesa Payout Number *</label>
                <input type="tel" required value={newSacco.payoutNumber} onChange={(e) => setNewSacco({...newSacco, payoutNumber: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none" placeholder="07XX XXX XXX" />
                <p className="text-xs text-gray-500 mt-1">The number where the 45% operator share will be sent.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Brand Color</label>
                <select value={newSacco.color} onChange={(e) => setNewSacco({...newSacco, color: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none bg-white">
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-purple-500">Purple</option>
                  <option value="bg-red-500">Red</option>
                  <option value="bg-orange-500">Orange</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#0047AB] text-white py-3 rounded-xl font-bold hover:bg-[#003380] transition shadow-lg">Add SACCO</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Active Partners ({safeSaccos.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {safeSaccos.map(s => (
                <div key={s.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className={`w-10 h-10 ${s.color} rounded-lg flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{s.name}</p>
                    <p className="text-xs text-gray-500 truncate">{s.route}</p>
                    <p className="text-xs font-mono text-[#00A651] font-bold mt-1">M-Pesa: {s.payoutNumber || 'Not set'}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">{s.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Register New Vehicle</h2>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Plate Number</label>
                <input type="text" required value={newVehicle.plate} onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none" placeholder="e.g., KDA 123A" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Driver Name</label>
                <input type="text" required value={newVehicle.driver} onChange={(e) => setNewVehicle({...newVehicle, driver: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none" placeholder="e.g., James Mutua" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Assign to SACCO</label>
                <select value={newVehicle.saccoId} onChange={(e) => setNewVehicle({...newVehicle, saccoId: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none bg-white">
                  {safeSaccos.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-[#0047AB] text-white py-3 rounded-xl font-bold hover:bg-[#003380] transition shadow-lg">Add Vehicle</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Fleet Registry ({safeVehicles.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {safeVehicles.map(v => (
                <div key={v.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{v.plate}</p>
                    <p className="text-xs text-gray-500">Driver: {v.driver}</p>
                  </div>
                  <span className="text-xs font-mono bg-[#0047AB]/10 text-[#0047AB] px-2 py-1 rounded border border-[#0047AB]/20">{v.saccoId}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
