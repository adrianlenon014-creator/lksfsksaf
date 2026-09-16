import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Product, CartItem } from './types';
import { CartSidebar } from './components/CartSidebar';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartItemsCount={cartItemsCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} onAddToCart={handleAddToCart} />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        <footer className="border-t border-blue-100 bg-white mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 text-blue-700">
              <img src="/images.jpg" alt="StartUP IT Logo" className="w-9 h-9 object-contain rounded-xl bg-white ring-1 ring-blue-100 shadow-sm" />
              <span className="font-semibold text-slate-900 text-lg">StartUP IT</span>
            </div>
            <p className="text-sm text-slate-600">
              &copy; {new Date().getFullYear()} StartUP IT. Premium digital learning for builders.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
              <Link to="/terms" className="hover:text-blue-700 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-blue-700 transition-colors">Privacy</Link>
              <a href="mailto:support@startupit.com" className="hover:text-blue-700 transition-colors flex items-center gap-2">
                Support: <span className="text-slate-800">support@startupit.com</span>
              </a>
            </div>
          </div>
        </footer>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </BrowserRouter>
  );
}
