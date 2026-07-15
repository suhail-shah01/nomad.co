import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { Shield, CreditCard, Mail, MapPin, CheckCircle, ArrowLeft, Loader2, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount: number;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  discount,
  onClose,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Address, 2: Payment, 3: Processing -> Success
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  
  // Input fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Receipt Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Auto-format card numbers: XXXX XXXX XXXX XXXX
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  // Auto-format expiry: MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiry(value);
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid Email is required';
    if (!address.trim()) errs.address = 'Shipping address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!zipCode.trim() || zipCode.length < 5) errs.zipCode = 'Valid Zip code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, '').length !== 16) errs.cardNumber = 'Valid 16-digit Card Number is required';
    if (expiry.length !== 5) errs.expiry = 'Expiration date (MM/YY) is required';
    if (cvv.length < 3) errs.cvv = 'Secure 3-digit CVV code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    
    // Simulate multi-stage payment processing animation steps
    const statusSteps = [
      'Establishing TLS Secure Link...',
      'Encrypting payment tokens...',
      'Verifying inventory allocation...',
      'Securing bank authorization...',
      'Registering ledger receipt...'
    ];

    let currentStepIndex = 0;
    setLoadingStatus(statusSteps[currentStepIndex]);

    const interval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < statusSteps.length) {
        setLoadingStatus(statusSteps[currentStepIndex]);
      } else {
        clearInterval(interval);
        
        // Complete checkout! Create official Order object
        const finalOrder: Order = {
          id: `NMD-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [...cartItems],
          subtotal,
          shipping,
          tax,
          total,
          customerDetails: {
            fullName,
            email,
            address,
            city,
            zipCode,
            cardNumber: `•••• •••• •••• ${cardNumber.slice(-4)}`
          },
          date: new Date().toISOString().split('T')[0],
          status: 'Processing'
        };

        setCompletedOrder(finalOrder);
        setLoading(false);
        setStep(3); // Go to success receipt
        onOrderSuccess(finalOrder);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950 flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white text-neutral-900 border border-neutral-800 shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 overflow-hidden rounded-sm">
        
        {/* Left Hand: Checkout Form (8 cols) */}
        <div className="p-6 md:p-10 md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-neutral-700" />
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">SECURE PORTAL</span>
            </div>

            {step < 3 && (
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={step === 2 ? () => setStep(1) : onClose}
                  className="flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> BACK
                </button>
                <span className="text-neutral-300">|</span>
                <span className="font-display font-bold text-lg text-neutral-900 uppercase tracking-tight">
                  {step === 1 ? 'SHIPPING DETAILS' : 'SECURE BILLING'}
                </span>
              </div>
            )}

            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Samuel Wanderer"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.fullName && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. wander@nomad.com"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.email && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                    Shipping Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 100 Compass Peak Road"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.address && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Aspen"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.city && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="e.g. 81611"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.zipCode && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.zipCode}</p>}
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest py-3.5 transition-colors uppercase mt-6 rounded-sm"
                >
                  Continue To Payment
                </button>
              </div>
            )}

            {/* STEP 2: SECURE CREDIT CARD GATEWAY */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* Visual Card representation */}
                <div className="bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 text-white p-5 border border-neutral-800 shadow-lg rounded-sm mb-6 flex flex-col justify-between aspect-[1.58/1] h-36">
                  <div className="flex justify-between items-start">
                    <Landmark className="w-5 h-5 text-neutral-400" />
                    <span className="font-mono text-[9px] text-neutral-500 tracking-widest">NOMAD PREMIUM SHIELD</span>
                  </div>
                  <div>
                    <div className="font-mono tracking-[0.2em] text-sm text-neutral-200 mb-2">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-neutral-400">
                      <div>
                        <div className="text-[7px] text-neutral-500 uppercase">HOLDER</div>
                        <div>{fullName.toUpperCase() || 'SAMUEL WANDERER'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[7px] text-neutral-500 uppercase">EXPIRY</div>
                        <div>{expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div>
                  <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="e.g. 4111 2222 3333 4444"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    <CreditCard className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
                    {errors.cardNumber && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.expiry && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5">
                      CVV Code
                    </label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="•••"
                      className="w-full bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                    />
                    {errors.cvv && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Submitting Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 text-white font-mono text-xs tracking-widest py-3.5 transition-all uppercase mt-6 flex items-center justify-center gap-2 rounded-sm border"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-600" />
                      {loadingStatus}
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-neutral-400" />
                      PAY SECURELY ${total}.00
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION RECEIPT */}
            {step === 3 && completedOrder && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center justify-center h-full"
              >
                <CheckCircle className="w-14 h-14 text-emerald-500 mb-4" />
                <h3 className="font-display font-bold text-xl text-neutral-900 tracking-tight">Your journey begins.</h3>
                <p className="font-mono text-xs text-neutral-400 mt-1">ORDER CONFIRMED: {completedOrder.id}</p>
                
                <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-sm w-full max-w-sm mt-6 text-left space-y-2 font-sans text-xs text-neutral-600">
                  <div className="flex justify-between font-mono text-[9px] text-neutral-400 uppercase">
                    <span>DELIVERING TO</span>
                    <span>CARRIER</span>
                  </div>
                  <div className="font-medium text-neutral-800 flex justify-between">
                    <span>{completedOrder.customerDetails.fullName}</span>
                    <span className="font-mono text-[10px]">Nomad Logistics</span>
                  </div>
                  <p>{completedOrder.customerDetails.address}, {completedOrder.customerDetails.city}, {completedOrder.customerDetails.zipCode}</p>
                  
                  <div className="w-full h-[1px] bg-neutral-200 my-3"></div>
                  
                  <div className="flex justify-between font-mono text-[9px] text-neutral-400 uppercase">
                    <span>Status</span>
                    <span>Method</span>
                  </div>
                  <div className="flex justify-between font-medium text-neutral-800">
                    <span className="text-emerald-600 font-semibold uppercase font-mono text-[10px]">Processing</span>
                    <span className="font-mono text-[10px]">Secured Credit Card</span>
                  </div>
                </div>

                <p className="font-sans text-[11px] text-neutral-400 max-w-sm mt-6 leading-relaxed">
                  A digital invoice has been sent to <span className="text-neutral-800 font-medium">{completedOrder.customerDetails.email}</span>. Thank you for packing with Nomad Clothing Co.
                </p>

                <button
                  onClick={onClose}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest px-8 py-3 transition-colors uppercase mt-8 rounded-sm"
                >
                  Return To Storefront
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Hand: Order Summary Column (4 cols) */}
        <div className="bg-neutral-50 border-t md:border-t-0 md:border-l border-neutral-200 p-6 md:p-8 md:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-xs text-neutral-400 tracking-widest uppercase mb-6">
              ORDER SUMMARY
            </h3>

            {/* Scrollable list of summary items */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex gap-3">
                  <div className="w-11 aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-[11px] text-neutral-800 truncate">
                      {item.product.name}
                    </h4>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase mt-0.5">
                      Size: {item.selectedSize} | Color: {item.selectedColor.name}
                    </p>
                    <p className="font-mono text-[9px] text-neutral-500 mt-0.5">
                      QTY: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-900 shrink-0">
                    ${item.product.price * item.quantity}.00
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Money Breakdown */}
          <div className="border-t border-neutral-200 pt-4 space-y-2">
            <div className="flex justify-between font-mono text-[11px] text-neutral-500">
              <span>Items Subtotal</span>
              <span>${subtotal}.00</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-mono text-[11px] text-emerald-600">
                <span>Promo Discount</span>
                <span>-${discount}.00</span>
              </div>
            )}
            <div className="flex justify-between font-mono text-[11px] text-neutral-500">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping}.00`}</span>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-neutral-500">
              <span>Tax (8%)</span>
              <span>${tax}.00</span>
            </div>

            <div className="w-full h-[1px] bg-neutral-200 my-2"></div>

            <div className="flex justify-between items-baseline">
              <span className="font-display font-bold text-xs text-neutral-900 uppercase tracking-wider">Total</span>
              <span className="font-mono font-bold text-base text-neutral-900">${total}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
