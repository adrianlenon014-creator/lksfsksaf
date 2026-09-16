import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type CheckoutState = 'idle' | 'processing' | 'success';
const defaultApiUrl = 'https://lksfsksaffff.onrender.com';

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }: CartSidebarProps) {
  const [email, setEmail] = useState('');
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle');
  const [emailError, setEmailError] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!email.trim() || !email.includes('@')) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setCheckoutError('');
    setCheckoutState('processing');

    try {
      const configuredApiUrl = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
      const apiUrls = configuredApiUrl === defaultApiUrl ? [configuredApiUrl] : [configuredApiUrl, defaultApiUrl];
      let response: Response | undefined;
      let contentType = '';
      let responseText = '';

      for (const apiUrl of apiUrls) {
        response = await fetch(`${apiUrl}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, email: email.trim() }),
        });
        contentType = response.headers.get('content-type') || '';
        responseText = await response.text();

        if (contentType.includes('application/json') || response.status !== 404) {
          break;
        }
      }

      if (!response) {
        throw new Error('The checkout API did not respond.');
      }

      let result: { url?: string; error?: string } = {};

      if (contentType.includes('application/json')) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(`The checkout API returned invalid JSON (HTTP ${response.status}).`);
        }
      } else {
        throw new Error(
          `The checkout API returned HTML instead of JSON (HTTP ${response.status}). Check that VITE_API_URL points to the Express API.`
        );
      }

      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Unable to start checkout.');
      }

      onClearCart();
      window.location.href = result.url;
    } catch (error) {
      setCheckoutState('idle');
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start checkout.');
    }
  };

  const resetAndClose = () => {
    setCheckoutState('idle');
    setEmail('');
    setCheckoutError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkoutState === 'success' ? resetAndClose : onClose}
            className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-blue-100 z-50 flex flex-col shadow-[0_20px_70px_rgba(15,23,42,0.2)]"
          >
            <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">Checkout</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">Your cart</h2>
              </div>
              <button
                onClick={resetAndClose}
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {checkoutState === 'success' ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle2 size={68} className="mb-6 text-blue-600" />
                </motion.div>
                <h3 className="mb-3 text-2xl font-black text-slate-900">Payment successful</h3>
                <p className="mb-8 max-w-sm leading-relaxed text-slate-600">
                  Your course access has been confirmed and the delivery link will be sent to:
                  <span className="mt-2 block font-semibold text-blue-700">{email}</span>
                </p>
                <button
                  onClick={resetAndClose}
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center py-16 text-slate-500">
                      <p className="text-lg font-medium">Your cart is empty.</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
                        <div className="flex-1">
                          <h4 className="mb-1 text-base font-semibold text-slate-900 leading-tight">{item.title}</h4>
                          <div className="mb-3 text-sm text-slate-600">${item.price.toFixed(2)}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">Qty: {item.quantity}</span>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-blue-100 bg-white p-4 sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-slate-600">Total</span>
                      <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                          Delivery email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                          }}
                          placeholder="you@example.com"
                          className={`w-full rounded-xl border bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none ${emailError ? 'border-red-400' : 'border-blue-100 focus:border-blue-300'}`}
                        />
                        {emailError && (
                          <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
                        )}
                        {checkoutError && (
                          <p className="mt-2 text-sm text-red-600">{checkoutError}</p>
                        )}
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={checkoutState === 'processing'}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
                      >
                        {checkoutState === 'processing' ? 'Processing...' : 'Pay and send course'}
                        <ArrowRight size={18} />
                      </button>

                      <p className="pb-2 text-center text-xs leading-relaxed text-slate-500 sm:pb-0">
                        Secure checkout. After payment succeeds, your course access is sent to the email above.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

