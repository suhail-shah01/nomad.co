import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  RotateCw, 
  Layers, 
  ShoppingBag, 
  X, 
  Sparkles,
  Maximize2,
  Minimize2,
  Move
} from 'lucide-react';

interface SandboxItem {
  id: string; // Unique instance ID
  product: Product;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

interface OutfitSandboxProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const OutfitSandbox: React.FC<OutfitSandboxProps> = ({ products, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sandboxItems, setSandboxItems] = useState<SandboxItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const maxZIndex = useRef(10);

  // Filter some representative items for easy insertion
  const suggestedItems = React.useMemo(() => {
    // Pick 1 featured item from each major category to keep the toolbar clean
    const categories = ['Outerwear', 'Tops', 'Bottoms', 'Accessories', 'Footwear'];
    return categories.map(cat => {
      const found = products.find(p => p.category === cat && p.isFeatured) || products.find(p => p.category === cat);
      return found;
    }).filter((p): p is Product => !!p);
  }, [products]);

  const handleAddItem = (product: Product) => {
    if (!canvasRef.current) return;
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;

    // Place randomly near the center
    const rx = canvasWidth / 2 - 75 + (Math.random() - 0.5) * 60;
    const ry = canvasHeight / 2 - 90 + (Math.random() - 0.5) * 60;

    maxZIndex.current += 1;

    const newItem: SandboxItem = {
      id: `${product.id}_${Date.now()}`,
      product,
      x: rx,
      y: ry,
      rotation: Math.floor(Math.random() * 16) - 8, // slight casual tilt
      scale: 1.0,
      zIndex: maxZIndex.current
    };

    setSandboxItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const handleRemoveItem = (id: string) => {
    setSandboxItems(prev => prev.filter(item => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const handleBringToFront = (id: string) => {
    maxZIndex.current += 1;
    setSandboxItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, zIndex: maxZIndex.current };
      }
      return item;
    }));
    setSelectedItemId(id);
  };

  const handleUpdateRotation = (id: string) => {
    setSandboxItems(prev => prev.map(item => {
      if (item.id === id) {
        // Rotate in steps of 15 degrees
        return { ...item, rotation: (item.rotation + 15) % 360 };
      }
      return item;
    }));
  };

  const handleUpdateScale = (id: string, amount: number) => {
    setSandboxItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextScale = Math.min(2.0, Math.max(0.5, item.scale + amount));
        return { ...item, scale: parseFloat(nextScale.toFixed(1)) };
      }
      return item;
    }));
  };

  const handleClearSandbox = () => {
    setSandboxItems([]);
    setSelectedItemId(null);
  };

  const handlePackOutfitToCart = () => {
    if (sandboxItems.length === 0) return;
    
    // Add all unique products on canvas to shopping bag
    const addedProducts: string[] = [];
    sandboxItems.forEach(item => {
      onAddToCart(item.product);
      addedProducts.push(item.product.name);
    });

    // Provide immediate alert-like visual styling confirmation or custom modal notification
    alert(`⚡ Outfitting bundle packed! Added ${sandboxItems.length} designer items into your travel deck.`);
  };

  return (
    <div className="border border-neutral-200 bg-white shadow-sm rounded-sm overflow-hidden mb-12">
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 flex items-center justify-between bg-neutral-950 text-white cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> NOMAD DESIGN LAB & OUTFIT WORKSPACE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 hidden sm:inline uppercase">
            {isOpen ? '[ COLLAPSE WORKSPACE ]' : '[ ACTIVATE PLAYGROUND - DRAG & BUILD ]'}
          </span>
          <button className="text-white hover:text-amber-400 transition-colors">
            {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row h-[550px] lg:h-[620px] bg-neutral-100 border-t border-neutral-200"
          >
            {/* Sidebar Left: Draggable catalog items */}
            <div className="w-full lg:w-80 bg-white border-r border-neutral-200 flex flex-col h-1/3 lg:h-full overflow-hidden">
              <div className="p-4 border-b border-neutral-100 bg-neutral-50">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-900">100 Blueprint Layers</h4>
                <p className="font-sans text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  Click any capsule garment to drop it onto your active design board below. Arrange your custom expedition style.
                </p>
              </div>

              {/* Suggested items list */}
              <div className="p-4 overflow-y-auto flex-grow grid grid-cols-5 lg:grid-cols-1 gap-3.5 max-h-[120px] lg:max-h-none scrollbar-none">
                {suggestedItems.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleAddItem(prod)}
                    className="flex flex-col lg:flex-row items-center gap-3 p-2 border border-neutral-100 hover:border-neutral-900 hover:bg-neutral-50 transition-all rounded-sm text-left group"
                  >
                    <div className="w-10 h-12 lg:w-12 lg:h-14 bg-neutral-50 overflow-hidden flex-shrink-0 relative border border-neutral-100">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="hidden lg:block overflow-hidden">
                      <span className="font-mono text-[8.5px] tracking-wider text-neutral-400 block uppercase">{prod.category}</span>
                      <h5 className="font-display font-bold text-[11px] text-neutral-800 truncate leading-tight group-hover:text-neutral-950">{prod.name}</h5>
                      <span className="font-mono text-[10px] font-bold text-neutral-900">${prod.price}.00</span>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 ml-auto hidden lg:block" />
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-center hidden lg:block">
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
                  ● DOUBLE CLICK BOARD ITEM TO REMOVE
                </span>
              </div>
            </div>

            {/* Canvas Area Right */}
            <div className="flex-grow flex flex-col relative overflow-hidden h-2/3 lg:h-full">
              
              {/* Canvas Board Options */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-auto">
                <button
                  onClick={handleClearSandbox}
                  disabled={sandboxItems.length === 0}
                  className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 disabled:opacity-50 hover:border-neutral-300 font-mono text-[10px] uppercase tracking-widest transition-all rounded-sm shadow-sm"
                >
                  Clear Board
                </button>
                <button
                  onClick={handlePackOutfitToCart}
                  disabled={sandboxItems.length === 0}
                  className="px-3 py-1.5 bg-amber-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 disabled:opacity-50 transition-all rounded-sm flex items-center gap-1.5 shadow-md border border-amber-600 animate-pulse"
                >
                  <ShoppingBag className="w-3 h-3" /> Pack Bundle
                </button>
              </div>

              <div className="absolute top-4 right-4 z-20 pointer-events-none text-right font-mono text-[9px] text-neutral-400 uppercase tracking-widest hidden sm:block">
                Active Items on Table: <strong className="text-neutral-900">{sandboxItems.length}</strong>
              </div>

              {/* Active Workspace Canvas */}
              <div 
                ref={canvasRef}
                className="flex-grow relative overflow-hidden bg-neutral-100 p-6 select-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #cbcbcb 1px, transparent 1.5px)',
                  backgroundSize: '24px 24px'
                }}
                onClick={() => setSelectedItemId(null)}
              >
                {sandboxItems.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                    <Move className="w-10 h-10 text-neutral-300 stroke-[1.5] mb-3 animate-bounce" />
                    <h5 className="font-display font-bold text-xs uppercase tracking-widest text-neutral-500">Your Creative Canvas is Ready</h5>
                    <p className="font-sans text-[11px] text-neutral-400 mt-2 max-w-xs leading-relaxed">
                      Drop items from the layout panel on the left, drag them freely, spin them, scale, and compile your travel system.
                    </p>
                  </div>
                )}

                {/* Draggable items container */}
                <AnimatePresence>
                  {sandboxItems.map(item => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        drag
                        dragConstraints={canvasRef}
                        dragElastic={0.05}
                        onDragStart={() => handleBringToFront(item.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItemId(item.id);
                        }}
                        onDoubleClick={() => handleRemoveItem(item.id)}
                        style={{
                          position: 'absolute',
                          left: item.x,
                          top: item.y,
                          zIndex: item.zIndex,
                        }}
                        animate={{
                          rotate: item.rotation,
                          scale: item.scale,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 25
                        }}
                        className={`group cursor-grab active:cursor-grabbing p-2.5 bg-white border rounded-sm shadow-md flex flex-col items-center transition-all ${
                          isSelected ? 'border-amber-500 ring-2 ring-amber-400/20 shadow-xl' : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {/* Polaroid Polaroid photo container */}
                        <div className="w-24 h-28 sm:w-28 sm:h-32 bg-neutral-50 overflow-hidden relative border border-neutral-100 pointer-events-none select-none">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover object-center" 
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Text Label on the bottom of Polaroid frame */}
                        <div className="mt-2 text-center w-full max-w-[110px] pointer-events-none">
                          <p className="font-display font-black text-[9px] uppercase tracking-wider text-neutral-800 truncate leading-tight">
                            {item.product.name.replace("Gulmarg", "Nmd")}
                          </p>
                          <span className="font-mono text-[8.5px] font-bold text-neutral-500 block mt-0.5">${item.product.price}</span>
                        </div>

                        {/* Interactive Float Controls Menu overlay (Only visible when item is selected) */}
                        {isSelected && (
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-neutral-950 text-white rounded-full p-1 shadow-lg flex items-center gap-1 border border-neutral-800 pointer-events-auto z-50">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateRotation(item.id); }}
                              className="p-1 hover:text-amber-400 transition-colors"
                              title="Rotate 15°"
                            >
                              <RotateCw className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateScale(item.id, 0.1); }}
                              className="p-1 hover:text-amber-400 transition-colors"
                              title="Enlarge Size"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleUpdateScale(item.id, -0.1); }}
                              className="p-1 hover:text-amber-400 transition-colors"
                              title="Shrink Size"
                            >
                              <Minimize2 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleBringToFront(item.id); }}
                              className="p-1 hover:text-amber-400 transition-colors"
                              title="Bring to Front"
                            >
                              <Layers className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleRemoveItem(item.id); }}
                              className="p-1 hover:text-rose-400 transition-colors"
                              title="Remove Piece"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
