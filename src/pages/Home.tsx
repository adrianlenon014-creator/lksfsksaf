import React from 'react';
import { motion } from 'motion/react';
import { products } from '../data';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

export function Home({ searchQuery, onAddToCart }: HomeProps) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),transparent_30%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_42%,#2563eb_100%)] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-50">
                StartUP IT
              </span>
              <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Learn modern tech skills that move your career forward.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
                Build backend systems, ship better frontend experiences, and launch iOS products with practical courses designed for ambitious developers and startup teams.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#catalog" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-50">
                  Explore courses
                </a>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Buy now
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-[32px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm shadow-2xl shadow-blue-950/20">
                <div className="rounded-[24px] bg-white p-5 text-slate-900 shadow-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">Featured path</p>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700">Popular</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">Modern Backend Engineering</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Master APIs, database design, secure architecture, and production deployment workflows.
                  </p>
                  <div className="mt-6 space-y-4 text-sm text-slate-700">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                      <span>Live projects</span>
                      <span className="font-bold text-blue-700">12</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                      <span>Average outcome</span>
                      <span className="font-bold text-blue-700">+40%</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Course</p>
                      <p className="text-3xl font-black text-slate-900">$900</p>
                    </div>
                    <button className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                      View course
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main id="catalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 w-full pt-12 sm:pt-16">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Catalog</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Popular courses</h2>
          </div>
          <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 shadow-sm">{filteredProducts.length} available</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-blue-200 bg-white py-20 text-center">
            <p className="text-slate-500 text-lg">No courses found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
