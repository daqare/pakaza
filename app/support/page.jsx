'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import usePakazaStore from '../../lib/store';

export default function SupportPage() {
  const router = useRouter();
  const { submitTicket } = usePakazaStore();
  const [formData, setFormData] = useState({
    trackingId: '',
    issueType: 'Late Delivery',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTicket(formData);
    setIsSubmitted(true);
    setTimeout(() => router.push('/'), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in py-10">
      <div className="mb-6">
        <Link href="/" className="text-[#0047AB] hover:underline text-sm font-bold flex items-center gap-1">
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎫</div>
              <h1 className="text-3xl font-black text-[#0047AB] mb-2">Report an Issue</h1>
              <p className="text-gray-500">Having trouble with a parcel? Let our support team know.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tracking ID *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., PAK-1001"
                  value={formData.trackingId}
                  onChange={(e) => setFormData({...formData, trackingId: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Issue Type *</label>
                <select 
                  value={formData.issueType}
                  onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 outline-none transition bg-white"
                >
                  <option value="Late Delivery">Late Delivery</option>
                  <option value="Damaged Parcel">Damaged Parcel</option>
                  <option value="Lost Parcel">Lost Parcel</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                <textarea 
                  required 
                  rows="4"
                  placeholder="Please describe the issue..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0047AB] focus:ring-2 focus:ring-[#0047AB]/20 outline-none transition resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#ED1C24] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg">
                Submit Support Ticket
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-[#00A651] mb-2">Ticket Submitted!</h2>
            <p className="text-gray-600 mb-6">Our support team has been notified. You will receive an SMS update shortly.</p>
            <p className="text-sm text-gray-400">Redirecting to home...</p>
          </div>
        )}
      </div>
    </div>
  );
}
