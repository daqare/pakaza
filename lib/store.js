import { create } from 'zustand';

const initialSaccos = [
  { id: 'SAC-001', name: 'Kina SACCO', route: 'Nairobi - Machakos', color: 'bg-blue-500', payoutNumber: '0712345001' },
  { id: 'SAC-002', name: 'Prestige SACCO', route: 'Nairobi - Mwingi', color: 'bg-purple-500', payoutNumber: '0733456002' },
  { id: 'SAC-003', name: 'Makos SACCO', route: 'Nairobi - Makueni', color: 'bg-green-500', payoutNumber: '0722567003' },
];

const initialParcels = [
  { id: 'PAK-1001', senderName: 'John Kamau', receiverName: 'Mary Wanjiku', saccoId: 'SAC-001', weightKg: 5.5, status: 'IN_TRANSIT', price: 1200, senderPhone: '0712345678', receiverPhone: '0723456789', createdAt: '2 hours ago' },
  { id: 'PAK-1002', senderName: 'Tech Solutions', receiverName: 'David Ochieng', saccoId: 'SAC-002', weightKg: 12.0, status: 'ARRIVED', price: 2400, senderPhone: '0712345678', receiverPhone: '0723456789', createdAt: '5 hours ago' },
  { id: 'PAK-1003', senderName: 'Sarah Auma', receiverName: 'Peter Mwangi', saccoId: 'SAC-001', weightKg: 2.3, status: 'PAID', price: 600, senderPhone: '0712345678', receiverPhone: '0723456789', createdAt: '1 day ago' },
];

const initialLedger = initialParcels.map(p => ({
  id: `TXN-${p.id.split('-')[1]}`,
  parcelId: p.id,
  saccoId: p.saccoId,
  total: p.price,
  pakazaShare: Math.round(p.price * 0.5),
  operatorShare: Math.round(p.price * 0.45),
  saccoShare: Math.round(p.price * 0.05),
  date: p.createdAt,
  type: 'REVENUE'
}));

export const usePakazaStore = create((set, get) => ({
  parcels: initialParcels,
  ledger: initialLedger,
  saccos: initialSaccos,
  withdrawals: [],
  notifications: [],
  tickets: [],
  promoCodes: [
    { code: 'WELCOME10', discount: 10, description: '10% off for new users' },
    { code: 'FAST50', discount: 50, description: '50% off flash sale' }
  ],
  currentRole: 'ADMIN',
  operatorSaccoId: 'SAC-001',
  smsToast: null,
  selectedParcel: null,

  setRole: (role) => set({ currentRole: role }),
  setSelectedParcel: (parcel) => set({ selectedParcel: parcel }),
  setOperatorSaccoId: (id) => set({ operatorSaccoId: id }),

  showSms: (msg) => { 
    set({ smsToast: msg }); 
    set((state) => ({
      notifications: [
        { id: Date.now().toString(), message: msg, date: new Date().toLocaleTimeString(), read: false },
        ...(state.notifications || [])
      ]
    }));
    setTimeout(() => set({ smsToast: null }), 8000);
  },

  clearNotifications: () => set({ notifications: [] }),
  markAllRead: () => set((state) => ({ 
    notifications: (state.notifications || []).map(n => ({...n, read: true})) 
  })),

  submitTicket: (ticketData) => {
    const newTicket = {
      id: `TKT-${Date.now().toString().slice(-6)}`,
      trackingId: ticketData.trackingId,
      issueType: ticketData.issueType,
      description: ticketData.description,
      status: 'OPEN',
      date: new Date().toLocaleString()
    };
    set((state) => ({
      tickets: [newTicket, ...(state.tickets || [])]
    }));
    get().showSms(`PAKAZA: Support ticket ${newTicket.id} received. We will contact you shortly.`);
    return newTicket;
  },

  resolveTicket: (id) => {
    set((state) => ({
      tickets: (state.tickets || []).map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t)
    }));
    get().showSms(`PAKAZA: Ticket ${id} has been marked as resolved.`);
  },

  requestPayout: (saccoId, amount, phone) => {
    const withdrawal = {
      id: `WTH-${Date.now().toString().slice(-6)}`,
      saccoId, amount, phone,
      date: new Date().toLocaleString(),
      status: 'COMPLETED'
    };
    
    set((state) => ({
      withdrawals: [withdrawal, ...(state.withdrawals || [])],
      ledger: [{
        id: `TXN-${Date.now()}`, parcelId: 'N/A', saccoId,
        total: -amount, pakazaShare: 0, operatorShare: -amount, saccoShare: 0,
        date: withdrawal.date, type: 'PAYOUT'
      }, ...(state.ledger || [])]
    }));
    
    get().showSms(`PAKAZA: KES ${amount.toLocaleString()} sent to M-Pesa ${phone}. Ref: ${withdrawal.id}`);
  },

  runBatchSettlement: () => {
    const state = get();
    const safeParcels = Array.isArray(state.parcels) ? state.parcels : [];
    const safeSaccos = Array.isArray(state.saccos) ? state.saccos : [];
    
    const balances = {};
    safeSaccos.forEach(s => balances[s.id] = 0);
    
    safeParcels.forEach(p => {
      if (balances[p.saccoId] !== undefined) {
        balances[p.saccoId] += Math.round((p.price || 0) * 0.45);
      }
    });

    const safeWithdrawals = Array.isArray(state.withdrawals) ? state.withdrawals : [];
    const paid = {};
    safeSaccos.forEach(s => paid[s.id] = 0);
    safeWithdrawals.forEach(w => {
      if (paid[w.saccoId] !== undefined) paid[w.saccoId] += w.amount;
    });

    let totalDisbursed = 0;
    let newWithdrawals = [];
    let newLedgerEntries = [];
    let processedCount = 0;
    let settlementMessages = [];

    safeSaccos.forEach(sacco => {
      const outstanding = balances[sacco.id] - paid[sacco.id];
      const payoutNum = sacco.payoutNumber || '0700000000';

      if (outstanding > 0) {
        const withdrawal = {
          id: `BATCH-${Date.now().toString().slice(-6)}-${sacco.id}`,
          saccoId: sacco.id,
          amount: outstanding,
          phone: payoutNum,
          date: new Date().toLocaleString(),
          status: 'COMPLETED'
        };
        newWithdrawals.push(withdrawal);
        newLedgerEntries.push({
          id: `TXN-BATCH-${Date.now()}-${sacco.id}`,
          parcelId: 'BATCH', saccoId: sacco.id,
          total: -outstanding, pakazaShare: 0, operatorShare: -outstanding, saccoShare: 0,
          date: withdrawal.date, type: 'PAYOUT'
        });
        totalDisbursed += outstanding;
        processedCount++;
        settlementMessages.push(`KES ${outstanding.toLocaleString()} to ${sacco.name} (${payoutNum})`);
      }
    });

    if (processedCount > 0) {
      set((state) => ({
        withdrawals: [...newWithdrawals, ...(state.withdrawals || [])],
        ledger: [...newLedgerEntries, ...(state.ledger || [])]
      }));
      const summary = settlementMessages.join(' | ');
      get().showSms(`PAKAZA: Weekly Settlement Complete! Disbursed: ${summary}`);
    } else {
      get().showSms(`PAKAZA: All drivers are fully settled. No outstanding balances.`);
    }
    
    return { processedCount, totalDisbursed };
  },

  // NEW: Save Proof of Delivery
  saveProofOfDelivery: (parcelId, signatureData, photoName) => {
    set((state) => ({
      parcels: (state.parcels || []).map(p => 
        p.id === parcelId 
          ? { ...p, podSignature: signatureData, podPhoto: photoName, podDate: new Date().toLocaleString() } 
          : p
      )
    }));
    get().showSms(`PAKAZA: Proof of Delivery saved for ${parcelId}. Parcel marked as COLLECTED.`);
  },

  addParcel: (data) => {
    const basePrice = Math.ceil(parseFloat(data.weightKg) || 1) * 200;
    const discountPercent = data.discountPercent || 0;
    const finalPrice = basePrice - (basePrice * (discountPercent / 100));

    const newParcel = { 
      id: `PAK-${Math.floor(1000 + Math.random() * 9000)}`, 
      senderName: data.senderName || '', senderPhone: data.senderPhone || '',
      receiverName: data.receiverName || '', receiverPhone: data.receiverPhone || '',
      saccoId: data.saccoId || 'SAC-001', weightKg: parseFloat(data.weightKg) || 1,
      description: data.description || '', price: finalPrice, status: 'PAID', createdAt: 'Just now' 
    };
    const newLedger = { 
      id: `TXN-${Date.now()}`, parcelId: newParcel.id, saccoId: newParcel.saccoId,
      total: finalPrice, pakazaShare: Math.round(finalPrice * 0.5), operatorShare: Math.round(finalPrice * 0.45),
      saccoShare: Math.round(finalPrice * 0.05), date: 'Just now', type: 'REVENUE'
    };
    set(state => ({ 
      parcels: [newParcel, ...(state.parcels || [])], 
      ledger: [newLedger, ...(state.ledger || [])] 
    }));
    get().showSms(`PAKAZA: Your parcel ${newParcel.id} has been received. Tracking: ${newParcel.id}`);
    return newParcel;
  },

  updateStatus: (id, status) => {
    const p = (get().parcels || []).find(x => x.id === id);
    if (p) {
      let msg = '';
      if (status === 'IN_TRANSIT') msg = `PAKAZA: Good news! Parcel ${id} is now IN TRANSIT.`;
      if (status === 'ARRIVED') msg = `PAKAZA: Parcel ${id} has ARRIVED at the destination office.`;
      if (msg) get().showSms(msg);
    }
    set(state => ({ 
      parcels: (state.parcels || []).map(x => x.id === id ? { ...x, status } : x) 
    }));
  },

  addSacco: (saccoData) => set((state) => ({
    saccos: [...(state.saccos || []), { ...saccoData, id: `SAC-${Date.now().toString().slice(-3)}` }]
  })),

  addVehicle: (vehicleData) => set((state) => ({
    vehicles: [...(state.vehicles || []), { ...vehicleData, id: `V-${Date.now().toString().slice(-3)}` }]
  })),

  resetDemoData: () => set({ 
    parcels: initialParcels, ledger: initialLedger, saccos: initialSaccos,
    withdrawals: [], notifications: [], tickets: []
  })
}));

export default usePakazaStore;
