import React, { useState } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
}

export function Navbar({ searchQuery, setSearchQuery, cartItemsCount, onOpenCart }: NavbarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-blue-100 bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center overflow-hidden shadow-md ring-2 ring-blue-100">
              <img src="/images.jpg" alt="StartUP IT Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 hidden sm:block">StartUP IT</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden md:flex relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-10 pr-4 py-2.5 bg-blue-50 border border-blue-100 rounded-full text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-300 transition-all shadow-sm"
              />
            </div>

            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2.5 text-blue-600 hover:text-blue-700 transition-colors rounded-full hover:bg-blue-50"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-blue-600 hover:text-blue-700 transition-colors rounded-full hover:bg-blue-50 shadow-sm"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden sticky top-20 z-20 bg-blue-50 border-b border-blue-100 overflow-hidden"
          >
            <div className="px-4 py-4 relative">
              <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-blue-500" />
              <input
                type="text"
                placeholder="Search courses..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-blue-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-blue-300 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
