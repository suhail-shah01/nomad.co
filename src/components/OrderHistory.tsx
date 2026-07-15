import React from 'react';
import { Order } from '../types';
import { Package, Calendar, Truck, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl border-l border-neutral-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-neutral-900 tracking-wider uppercase">Order Journey Tracker</h2>
                <p className="font-mono text-xs text-neutral-400 mt-0.5">
                  Track your gear and travel log history
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-neutral-50 text-neutral-500 rounded-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                    <Truck className="w-8 h-8 text-neutral-300" />
                  </span>
                  <h3 className="font-display font-medium text-base text-neutral-800 tracking-tight">No journeys registered</h3>
                  <p className="font-sans text-xs text-neutral-400 max-w-[240px] mt-1.5 leading-relaxed">
                    Once you check out through our secure payment gateway, your order itinerary will be logged here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-neutral-200 p-4 rounded-sm bg-neutral-50/50 space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-neutral-900 block">ORDER {order.id}</span>
                          <span className="font-mono text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            Registered on {order.date}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border rounded-full font-semibold ${
                            order.status === 'Processing' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : order.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items Row */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 text-xs text-neutral-700">
                            <div className="w-8 aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-neutral-800 truncate block leading-tight">{item.product.name}</span>
                              <span className="font-mono text-[9px] text-neutral-400 uppercase">
                                Qty: {item.quantity} | {item.selectedSize} | {item.selectedColor.name}
                              </span>
                            </div>
                            <span className="font-mono text-neutral-900 font-medium">${item.product.price * item.quantity}.00</span>
                          </div>
                        ))}
                      </div>

                      {/* Itinerary Progress */}
                      <div className="bg-white p-3 border border-neutral-200 rounded-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-4 h-4 text-neutral-700" />
                          <span className="font-display font-bold text-[10px] tracking-wider text-neutral-800 uppercase">Est. Shipment Route</span>
                        </div>
                        <div className="space-y-1.5 font-sans text-xs text-neutral-500">
                          <div className="flex justify-between">
                            <span>Recipient Name:</span>
                            <span className="font-medium text-neutral-700">{order.customerDetails.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Route:</span>
                            <span className="font-medium text-neutral-700">{order.customerDetails.address}, {order.customerDetails.city}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-neutral-100 mt-1 font-semibold">
                            <span>Paid Total:</span>
                            <span className="font-mono text-neutral-900">${order.total}.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
