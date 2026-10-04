'use client';
import { useState } from 'react';
import { usePakazaStore } from '../lib/store';
import SignaturePad from './SignaturePad';

export default function ParcelDetailModal() {
  const { selectedParcel, setSelectedParcel, updateStatus, saccos, saveProofOfDelivery } = usePakazaStore();
  const [isCollecting, setIsCollecting] = useState(false);
  const [podPhotoName, setPodPhotoName] = useState('');

  if (!selectedParcel) return null;

  const safeSaccos = Array.isArray(saccos) ? saccos : [];
  const sacco = safeSaccos.find(s => s.id === selectedParcel.saccoId);
  const price = selectedParcel.price || 0;
  const status = selectedParcel.status || 'UNKNOWN';

  const split = {
    pakaza: Math.round(price * 0.50),
    operator: Math.round(price * 0.45),
    sacco: Math.round(price * 0.05),
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'COLLECTED') {
      setIsCollecting(true); // Trigger Signature Pad
    } else {
      updateStatus(selectedParcel.id, newStatus);
      setSelectedParcel({ ...selectedParcel, status: newStatus });
    }
  };

  const handleSignatureSave = (signatureData) => {
    saveProofOfDelivery(selectedParcel.id, signatureData, podPhotoName || 'No ID Photo');
    updateStatus(selectedParcel.id, 'COLLECTED');
    setSelectedParcel({ 
      ...selectedParcel, 
      status: 'COLLECTED', 
      podSignature: signatureData, 
      podPhoto: podPhotoName || 'No ID Photo',
      podDate: new Date().toLocaleString()
    });
    setIsCollecting(false);
    setPodPhotoName('');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPodPhotoName(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={() => { setSelectedParcel(null); setIsCollecting(false); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden my-8 relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Signature Overlay */}
        {isCollecting && (
          <div className="absolute inset-0 z-50 bg-white p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-[#0047AB] mb-2">Proof of Delivery</h3>
            <p className="text-sm text-gray-500 mb-6">Please capture the receiver's signature and ID photo to finalize collection.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload ID Photo (Optional)</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0047AB]/10 file:text-[#0047AB] hover:file:bg-[#0047AB]/20" />
              {podPhotoName && <p className="text-xs text-[#00A651] font-bold mt-2">✓ {podPhotoName} attached</p>}
            </div>

            <SignaturePad onSave={handleSignatureSave} onCancel={() => setIsCollecting(false)} />
          </div>
        )}

        {/* Main Modal Content */}
        <div className="bg-[#0047AB] text-white p-6 flex justify-between items-start">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Tracking ID</p>
            <h2 className="text-3xl font-black tracking-tight">{selectedParcel.id}</h2>
          </div>
          <button onClick={() => { setSelectedParcel(null); setIsCollecting(false); }} className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 transition">✕</button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${status === 'PAID' ? 'bg-blue-100 text-blue-800' : status === 'IN_TRANSIT' ? 'bg-purple-100 text-purple-800' : status === 'COLLECTED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {status.replace('_', ' ')}
            </span>
            <span className="text-sm font-semibold text-gray-600">{sacco?.name || 'Unknown SACCO'}</span>
          </div>

          {/* Proof of Delivery Display */}
          {selectedParcel.podSignature && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-green-600 text-xl">✅</div>
                <h4 className="font-bold text-green-800">Proof of Delivery Verified</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Digital Signature</p>
                  <img src={selectedParcel.podSignature} alt="Signature" className="h-16 bg-white border border-gray-200 rounded p-1" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">ID Document</p>
                  <div className="h-16 bg-white border border-gray-200 rounded p-2 flex items-center text-xs text-gray-600 font-mono truncate">
                    📎 {selectedParcel.podPhoto}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-right">Collected on: {selectedParcel.podDate}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0047AB]"></div>
              <div><p className="text-xs text-gray-500 uppercase">Sender</p><p className="font-semibold">{selectedParcel.senderName || 'N/A'}</p></div>
            </div>
            <div className="w-0.5 h-6 bg-gray-300 ml-1"></div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00A651]"></div>
              <div><p className="text-xs text-gray-500 uppercase">Receiver</p><p className="font-semibold">{selectedParcel.receiverName || 'N/A'}</p></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">Financial Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Total Price</span><span className="font-bold">KES {price.toLocaleString()}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#0047AB]">PAKAZA (50%)</span><span className="font-semibold text-[#0047AB]">KES {split.pakaza.toLocaleString()}</span></div>
              <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-[#00A651]">Operator (45%)</span><span className="font-semibold text-[#00A651]">KES {split.operator.toLocaleString()}</span></div>
              <div className="flex justify-between py-2"><span className="text-purple-600">SACCO (5%)</span><span className="font-semibold text-purple-600">KES {split.sacco.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Update Status</label>
            <select value={status} onChange={(e) => handleStatusChange(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] outline-none font-medium bg-white">
              <option value="INITIATED">Initiated</option>
              <option value="PAID">Paid</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="ARRIVED">Arrived</option>
              <option value="COLLECTED">Collected (Requires Signature)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
