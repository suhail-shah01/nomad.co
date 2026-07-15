import React from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => {
  return (
    <motion.div 
      layout
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06), 0 10px 10px -5px rgba(0,0,0,0.02)",
        borderColor: "rgba(0, 0, 0, 0.08)"
      }}
      whileDrag={{
        scale: 1.05,
        rotate: 1.5,
        zIndex: 50,
        boxShadow: "0 30px 45px -5px rgba(0,0,0,0.15), 0 15px 20px -5px rgba(0,0,0,0.08)",
        borderColor: "rgba(0, 0, 0, 0.15)"
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1], // Highly responsive premium ease-out bezier
        layout: { duration: 0.3 }
      }}
      className="group relative flex flex-col bg-white border border-neutral-100 overflow-hidden cursor-pointer transition-colors duration-300"
      onClick={() => onSelect(product)}
    >
      {/* Product Image Container with Embroidery Stamp */}
      <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Premium Fabric Tag Overlay (Realizes Nomad Branding requirement) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-neutral-200 shadow-sm px-2.5 py-1.5 flex items-center gap-1.5 rounded-sm pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 text-neutral-900" fill="currentColor">
            <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="12" />
            <polygon points="50,15 50,85 85,85" fill="currentColor" opacity="0.3" />
          </svg>
          <span className="font-display font-bold text-[9px] tracking-widest text-neutral-900 uppercase">
            Nomad<span className="text-neutral-500">®</span>
          </span>
          <span className="w-[1px] h-2.5 bg-neutral-300"></span>
          <span className="font-mono text-[8px] text-neutral-500 tracking-wider">OFFICIAL</span>
        </div>

        {/* Featured Ribbon */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3 bg-neutral-900 text-white font-mono text-[9px] tracking-wider uppercase px-2.5 py-1">
            Featured
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 px-4 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 py-2 px-3 text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors duration-200 border border-neutral-200 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            QUICK VIEW
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white transition-colors duration-200 border border-neutral-900 shadow-sm"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
          {product.category}
        </span>
        
        <h3 className="font-display font-medium text-sm text-neutral-800 tracking-tight leading-tight group-hover:text-neutral-900 group-hover:underline underline-offset-4 decoration-1 mb-2">
          {product.name}
        </h3>

        {/* Color Swatches Indicator */}
        <div className="flex gap-1 mb-3">
          {product.colors.map((color) => (
            <span 
              key={color.name}
              style={{ backgroundColor: color.hex }}
              className="w-2.5 h-2.5 rounded-full border border-neutral-200"
              title={color.name}
            />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-mono font-medium text-sm text-neutral-900">
            ${product.price}.00
          </span>

          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-mono text-[11px] text-neutral-600">
              {product.rating}
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
