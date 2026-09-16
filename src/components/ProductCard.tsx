import React from 'react';
import { Product } from '../types';
import { IconMap } from '../utils/icons';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const Icon = IconMap[product.icon] || IconMap['Code'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group flex h-full flex-col rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_18px_45px_rgba(37,99,235,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(37,99,235,0.14)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 ring-1 ring-blue-100 shadow-sm">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600">{product.category}</span>
      </div>

      <div className="flex-1">
        <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 leading-tight">{product.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">{product.description}</p>
      </div>

      <div className="mt-auto border-t border-blue-100 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Price</p>
            <span className="text-2xl font-black text-slate-900">${product.price.toFixed(0)}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}
