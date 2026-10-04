'use client';
import Link from 'next/link';
import usePakazaStore from '../../lib/store';

export default function NotificationsPage() {
  const { notifications, clearNotifications, markAllRead } = usePakazaStore();
  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  const unreadCount = safeNotifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <Link href="/dashboard" className="text-[#0047AB] hover:underline text-sm font-bold flex items-center gap-1 mb-2">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[#0047AB]">Notification Center</h1>
          <p className="text-gray-500 text-sm mt-1">Your complete history of SMS alerts and system updates.</p>
        </div>
        <div className="text-4xl bg-gray-100 p-3 rounded-2xl">🔔</div>
      </div>

      {/* Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Alerts</p>
          <p className="text-3xl font-black text-gray-900">{safeNotifications.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border-l-4 border-[#00A651] shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Unread Messages</p>
          <p className="text-3xl font-black text-[#00A651]">{unreadCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs text-gray-500 uppercase font-bold mb-2">Quick Actions</p>
          <div className="flex gap-3">
            <button onClick={markAllRead} className="flex-1 bg-[#0047AB]/10 text-[#0047AB] py-2 rounded-lg text-xs font-bold hover:bg-[#0047AB]/20 transition">Mark all read</button>
            <button onClick={clearNotifications} className="flex-1 bg-[#ED1C24]/10 text-[#ED1C24] py-2 rounded-lg text-xs font-bold hover:bg-[#ED1C24]/20 transition">Clear history</button>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {safeNotifications.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-sm">Book a parcel or switch statuses in the dashboard to see alerts appear here in real-time.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {safeNotifications.map((note) => (
              <div key={note.id} className={`p-6 flex gap-4 hover:bg-gray-50 transition ${!note.read ? 'bg-blue-50/50' : ''}`}>
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${
                    note.message.includes('M-Pesa') || note.message.includes('sent') ? 'bg-[#00A651]/10 text-[#00A651]' : 'bg-[#0047AB]/10 text-[#0047AB]'
                  }`}>
                    {note.message.includes('M-Pesa') || note.message.includes('sent') ? '💸' : '📱'}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-sm ${!note.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {note.message.includes('IN TRANSIT') ? 'Status Update: In Transit' : 
                       note.message.includes('ARRIVED') ? 'Status Update: Arrived' : 
                       note.message.includes('COLLECTED') ? 'Status Update: Collected' :
                       note.message.includes('M-Pesa') ? 'Withdrawal Successful' : 'System Alert'}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-4">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{note.message}</p>
                </div>
                {!note.read && <div className="w-2.5 h-2.5 rounded-full bg-[#0047AB] mt-2 flex-shrink-0"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
