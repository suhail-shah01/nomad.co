import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (subtotal: number, shipping: number, tax: number, total: number, discount: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; freeShipping: boolean } | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Calculate Promo Discount
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.discountPercent / 100)) : 0;
  const discountedSubtotal = subtotal - discount;

  // Calculate Shipping (Free if over $150 or with promo)
  const isFreeShipping = discountedSubtotal >= 150 || (appliedPromo?.freeShipping ?? false);
  const shipping = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 15);
  
  // Calculate Tax (8%)
  const tax = Math.round(discountedSubtotal * 0.08);
  const total = discountedSubtotal + shipping + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'NOMAD20') {
      setAppliedPromo({ code: 'NOMAD20', discountPercent: 20, freeShipping: false });
      setPromoCode('');
    } else if (code === 'WANDERER') {
      setAppliedPromo({ code: 'WANDERER', discountPercent: 0, freeShipping: true });
      setPromoCode('');
    } else if (code === 'FIRST10') {
      setAppliedPromo({ code: 'FIRST10', discountPercent: 10, freeShipping: false });
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon. Try NOMAD20 or WANDERER.');
    }
  };

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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl border-l border-neutral-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-neutral-900 tracking-wider uppercase">Your Cart</h2>
                <p className="font-mono text-xs text-neutral-400 mt-0.5">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-neutral-50 text-neutral-500 rounded-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                    <svg viewBox="0 0 100 100" className="w-8 h-8 text-neutral-400" fill="currentColor">
                      <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="8" />
                    </svg>
                  </span>
                  <h3 className="font-display font-medium text-base text-neutral-800 tracking-tight">Your pack is empty</h3>
                  <p className="font-sans text-xs text-neutral-400 max-w-[200px] mt-1.5 leading-relaxed">
                    Explore the collection to pack your gear for the next journey.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest px-6 py-2.5 transition-colors uppercase"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                    className="flex gap-4 border-b border-neutral-100 pb-6 last:border-0 last:pb-0"
                  >
                    {/* Item Image */}
                    <div className="w-20 aspect-[4/5] bg-neutral-50 border border-neutral-200 overflow-hidden shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display font-medium text-xs text-neutral-800 line-clamp-2 leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-xs font-semibold text-neutral-900 shrink-0">
                            ${item.product.price * item.quantity}.00
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                          <div className="flex items-center gap-1">
                            <span 
                              style={{ backgroundColor: item.selectedColor.hex }}
                              className="w-2 h-2 rounded-full border border-neutral-300"
                            />
                            <span className="font-mono text-[10px] text-neutral-500 uppercase">{item.selectedColor.name}</span>
                          </div>
                          <span className="font-mono text-[10px] text-neutral-500">SIZE: {item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Quantity Selectors */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200 rounded-sm">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-50 text-neutral-500 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-50 text-neutral-500"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PROMO CODE (NOMAD20)"
                      className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest px-4 py-2 transition-colors uppercase rounded-sm"
                  >
                    Apply
                  </button>
                </form>

                {promoError && (
                  <p className="font-mono text-[10px] text-red-500 mt-1">{promoError}</p>
                )}

                {appliedPromo && (
                  <div className="bg-neutral-100 border border-neutral-200 p-2.5 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-neutral-700">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                        Code {appliedPromo.code} Applied
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-500">
                        {appliedPromo.discountPercent > 0 ? `-${appliedPromo.discountPercent}% OFF` : 'FREE SHIPPING'}
                      </span>
                      <button
                        onClick={() => setAppliedPromo(null)}
                        className="text-neutral-400 hover:text-neutral-900 font-mono text-xs"
                      >
                        [Remove]
                      </button>
                    </div>
                  </div>
                )}

                {/* Subtotals & Math */}
                <div className="space-y-2 border-b border-neutral-200 pb-4">
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Subtotal</span>
                    <span>${subtotal}.00</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600 font-mono">
                      <span>Promo Discount</span>
                      <span>-${discount}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping}.00`}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax}.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <span className="font-display font-bold text-neutral-900 uppercase text-sm tracking-wider">Total</span>
                  <span className="font-mono font-bold text-lg text-neutral-900">${total}.00</span>
                </div>

                <button
                  onClick={() => onCheckout(subtotal, shipping, tax, total, discount)}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest py-3.5 transition-colors uppercase flex items-center justify-center gap-2 rounded-sm"
                >
                  Proceed To Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
