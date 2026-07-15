import { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order, Review } from './types';
import { products as initialProducts } from './data/products';
import { NomadLogo } from './components/NomadLogo';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderHistory } from './components/OrderHistory';
import { ContactModal } from './components/ContactModal';
import { 
  Search, 
  ShoppingBag, 
  History, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Globe, 
  Trees, 
  Award,
  ArrowUp,
  Sliders,
  Check,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // --- STATE SYSTEM ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nomad_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nomad_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep track of user-submitted reviews locally
  const [userReviews, setUserReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('nomad_user_reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Navigation & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filters & Query Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceLimit, setPriceLimit] = useState<number>(300);
  const [sortType, setSortType] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Promotion Banner State
  const [bannerClosed, setBannerClosed] = useState(false);

  // Checkout pricing cache
  const [checkoutCosts, setCheckoutCosts] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0, discount: 0 });

  // --- PERSISTENCE EFFECT ---
  useEffect(() => {
    localStorage.setItem('nomad_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nomad_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nomad_user_reviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 350, behavior: 'smooth' });
  }, [currentPage]);

  // --- DYNAMIC PRODUCT RESOLUTION (100 Products + Custom Reviews) ---
  const productsList = useMemo(() => {
    return initialProducts.map(prod => {
      const customReviewsForProd = userReviews[prod.id] || [];
      if (customReviewsForProd.length === 0) return prod;

      const mergedReviews = [...customReviewsForProd, ...prod.reviews];
      const avgRating = parseFloat(
        (mergedReviews.reduce((sum, r) => sum + r.rating, 0) / mergedReviews.length).toFixed(1)
      );

      return {
        ...prod,
        reviews: mergedReviews,
        rating: avgRating,
        reviewsCount: mergedReviews.length
      };
    });
  }, [userReviews]);

  // --- FILTERED PRODUCTS SYSTEM ---
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const keywords = query.split(/\s+/).filter(Boolean);
      
      result = result.filter(p => {
        return keywords.every(kw => {
          const matchesName = p.name.toLowerCase().includes(kw);
          const matchesCategory = p.category.toLowerCase().includes(kw);
          const matchesDesc = p.description.toLowerCase().includes(kw);
          const matchesColor = p.colors.some(c => c.name.toLowerCase().includes(kw));
          const matchesSize = p.sizes.some(s => s.toLowerCase() === kw);
          
          // Synonyms for clothing
          let matchesSynonyms = false;
          if (kw === 'tshirt' || kw === 'tshirts' || kw === 't-shirt' || kw === 't-shirts' || kw === 'tee' || kw === 'tees' || kw === 'shirt' || kw === 'shirts') {
            const normalizedName = p.name.toLowerCase();
            matchesSynonyms = normalizedName.includes('tee') || normalizedName.includes('t-shirt') || normalizedName.includes('tshirt') || normalizedName.includes('shirt');
          }
          if (kw === 'hoodie' || kw === 'hoodies' || kw === 'sweatshirt' || kw === 'sweatshirts' || kw === 'pullover' || kw === 'pullovers' || kw === 'sweater' || kw === 'sweaters') {
            const normalizedName = p.name.toLowerCase();
            matchesSynonyms = normalizedName.includes('hoodie') || normalizedName.includes('sweatshirt') || normalizedName.includes('pullover') || normalizedName.includes('sweater') || normalizedName.includes('fleece');
          }
          if (kw === 'clothing' || kw === 'clothes' || kw === 'garment' || kw === 'garments' || kw === 'apparel') {
            matchesSynonyms = p.category === 'Tops' || p.category === 'Outerwear' || p.category === 'Bottoms';
          }
          if (kw === 'logo' || kw === 'name' || kw === 'nomad' || kw === 'branding') {
            matchesSynonyms = true; // Every product in the Nomad catalog features high-visibility branding
          }
          if (kw === 'kashmir' || kw === 'kashmiri') {
            const normalizedName = p.name.toLowerCase();
            const normalizedDesc = p.description.toLowerCase();
            matchesSynonyms = normalizedName.includes('kashmir') || normalizedName.includes('kashmiri') || normalizedDesc.includes('kashmir') || normalizedDesc.includes('kashmiri') || normalizedName.includes('gulmarg') || normalizedName.includes('shikara') || normalizedName.includes('sonamarg') || normalizedName.includes('chinar') || normalizedName.includes('saffron') || normalizedName.includes('pahalgam') || normalizedName.includes('dal lake') || normalizedName.includes('himalayan');
          }

          return matchesName || matchesCategory || matchesDesc || matchesColor || matchesSize || matchesSynonyms;
        });
      });
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Price Limit Filter
    result = result.filter(p => p.price <= priceLimit);

    // 4. Sort Application
    if (sortType === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default/Featured sorting: Prioritize "T-shirts and Hoodies" (Tops category) first
      // so they populate the first page, and other items are cleanly distributed on subsequent pages
      result.sort((a, b) => {
        const aIsTop = a.category === 'Tops';
        const bIsTop = b.category === 'Tops';
        
        if (aIsTop && !bIsTop) return -1;
        if (!aIsTop && bIsTop) return 1;
        
        // Secondary sort: Prioritize featured items
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        
        return a.id.localeCompare(b.id);
      });
    }

    return result;
  }, [productsList, searchQuery, selectedCategory, priceLimit, sortType]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceLimit, sortType]);

  // --- PAGINATION SYSTEM (12 items per page) ---
  const itemsPerPage = 12;
  
  const totalPages = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      // Page 1 is dedicated to Tops (T-Shirts and Hoodies)
      // Remaining pages are dedicated to other items (Outerwear, Bottoms, Accessories, Footwear)
      const othersCount = filteredProducts.filter(p => p.category !== 'Tops').length;
      return 1 + Math.ceil(othersCount / itemsPerPage);
    }
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts, selectedCategory, searchQuery]);
  
  const paginatedProducts = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      const tops = filteredProducts.filter(p => p.category === 'Tops');
      const others = filteredProducts.filter(p => p.category !== 'Tops');
      
      if (currentPage === 1) {
        // Page 1: Only show the T-shirts & Hoodies (Tops)
        return tops.slice(0, itemsPerPage);
      } else {
        // Pages 2+: Show the other products (Outerwear, Bottoms, Accessories, Footwear)
        const startIndex = (currentPage - 2) * itemsPerPage;
        return others.slice(startIndex, startIndex + itemsPerPage);
      }
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, selectedCategory, searchQuery]);

  // --- CART MUTATIONS ---
  const handleAddToCart = (product: Product) => {
    // Default to first size and color
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    handleAddToCartWithConfig(product, defaultSize, defaultColor, 1);
  };

  const handleAddToCartWithConfig = (
    product: Product, 
    size: string, 
    color: { name: string; hex: string }, 
    quantity: number
  ) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && 
                item.selectedSize === size && 
                item.selectedColor.hex === color.hex
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    
    // Quick success trigger & close product detail modal if open
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // --- REVIEW MUTATION ---
  const handleAddReview = (productId: string, review: Review) => {
    setUserReviews(prev => {
      const existingReviews = prev[productId] || [];
      return {
        ...prev,
        [productId]: [review, ...existingReviews]
      };
    });
  };

  // --- SECURE PAYMENT FLOW ---
  const handleCheckoutTrigger = (
    subtotal: number, 
    shipping: number, 
    tax: number, 
    total: number, 
    discount: number
  ) => {
    setCheckoutCosts({ subtotal, shipping, tax, total, discount });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart after successful payment
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Top Banner Message */}
      <AnimatePresence>
        {!bannerClosed && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-neutral-950 text-white text-[10px] sm:text-xs font-mono tracking-widest uppercase py-2.5 px-4 flex justify-between items-center z-40 relative"
          >
            <div className="flex items-center gap-2 mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>TRAVEL GEAR SYSTEMS LOGGED: use promo <strong className="text-white underline">NOMAD20</strong> for 20% off</span>
            </div>
            <button 
              onClick={() => setBannerClosed(true)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              [X]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="cursor-pointer">
            <NomadLogo className="w-9 h-9" />
          </div>

          {/* Core Central Search System */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 Premium Nomad Garments..."
              className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-900 focus:bg-white rounded-sm transition-all"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-[10px] font-mono text-neutral-400 hover:text-neutral-900"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Contact Button */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="p-2 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950 transition-all flex items-center gap-1.5 relative border border-transparent hover:border-neutral-200 rounded-sm"
              title="Contact Nomad"
            >
              <Mail className="w-4.5 h-4.5" />
              <span className="font-mono text-xs hidden sm:inline">CONTACT</span>
            </button>

            {/* Orders Tracker Button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-2 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-950 transition-all flex items-center gap-1.5 relative border border-transparent hover:border-neutral-200 rounded-sm"
              title="Journey Tracker"
            >
              <History className="w-4.5 h-4.5" />
              <span className="font-mono text-xs hidden sm:inline">TRACK ROUTE</span>
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {orders.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 flex items-center gap-2 rounded-sm relative shadow-sm transition-all text-xs font-mono tracking-wider"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>PACK ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden border-t border-neutral-100 p-3 bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 branded products..."
              className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-900 focus:bg-white rounded-sm"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </header>

      {/* High-End Brand Editorial Hero (Only on main landing without search/filtering) */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="relative bg-neutral-900 text-white min-h-[460px] flex items-center overflow-hidden">
          {/* Subtle outdoor landscape graphic backdrop */}
          <div className="absolute inset-0 z-0 opacity-45 mix-blend-multiply">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop" 
              alt="Mountain Wilderness" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/60 to-transparent z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
            <div className="max-w-xl space-y-6">
              <span className="font-mono text-xs text-neutral-300 tracking-[0.3em] uppercase block">
                ▲ THE TRAVEL APPAREL SYSTEM
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-[1.1] text-white">
                EQUIPPED FOR THE ENDLESS PATH.
              </h1>
              <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-md">
                Nomad® Co. designs durable capsule garments tailored for transition. Crafted from highly resilient, circular materials, our modular collections protect against the elements while maintaining a clean, technical visual signature.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={() => window.scrollTo({ top: 620, behavior: 'smooth' })}
                  className="bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs tracking-widest px-8 py-3.5 font-bold transition-all uppercase rounded-sm"
                >
                  EXPLORE THE 100 SYSTEM
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Core Showcase Grid */}
      <main id="storefront-main" className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Brand Value Propositions */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-neutral-100 pb-10 mb-10">
            <div className="flex gap-4 items-start">
              <span className="p-3 bg-neutral-50 border border-neutral-100 text-neutral-950 rounded-sm">
                <Trees className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900">CIRCULAR FIBERS</h4>
                <p className="font-sans text-xs text-neutral-500 mt-1 leading-relaxed">Organic hemp, merino wool, and recycled nylon layers, designed to leave zero waste footprints.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="p-3 bg-neutral-50 border border-neutral-100 text-neutral-950 rounded-sm">
                <Globe className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900">TRANSIT PACKABLE</h4>
                <p className="font-sans text-xs text-neutral-500 mt-1 leading-relaxed">Lightweight compressibilities, wrinkle-free coatings, and hidden passport security grids.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="p-3 bg-neutral-50 border border-neutral-100 text-neutral-950 rounded-sm">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900">100 PIECE BLUEPRINT</h4>
                <p className="font-sans text-xs text-neutral-500 mt-1 leading-relaxed">100 perfectly engineered modular garments, accessories, and cargo cases complete our system.</p>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Filters Bar */}
        <section className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border-b border-neutral-200 pb-6 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto gap-1 py-1 w-full lg:w-auto scrollbar-none">
            {['All', 'Outerwear', 'Tops', 'Bottoms', 'Accessories', 'Footwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs px-4 py-2 uppercase tracking-widest whitespace-nowrap transition-all border rounded-sm relative ${
                  selectedCategory === cat
                    ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {cat === 'All' ? 'ALL SYSTEM' : cat}
              </button>
            ))}
          </div>

          {/* Desktop Filter Panel & Sort Dropdown */}
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Slide price controls */}
            <div className="hidden sm:flex items-center gap-3 bg-neutral-50 border border-neutral-200 py-1.5 px-3.5 rounded-sm">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">MAX PRICE:</span>
              <input 
                type="range" 
                min="15" 
                max="300" 
                value={priceLimit} 
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-24 accent-neutral-900 h-1 cursor-pointer bg-neutral-200 rounded-lg appearance-none" 
              />
              <span className="font-mono text-xs font-bold text-neutral-900">${priceLimit}.00</span>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest hidden sm:inline">SORT BY:</label>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="flex-1 sm:flex-initial bg-white border border-neutral-200 px-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-neutral-900 rounded-sm"
              >
                <option value="featured">Featured System</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </section>

        {/* Kashmiri Nomad Suggested Searches */}
        <div className="flex flex-wrap items-center gap-2 mb-6 bg-neutral-50 border border-neutral-100 p-3 rounded-sm">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mr-1">Suggested Searches:</span>
          {[
            { label: 'Gulmarg Snow-Cap', query: 'Gulmarg' },
            { label: 'Hoodies', query: 'hoodie' },
            { label: 'T-Shirts', query: 't-shirt' },
            { label: 'Pashmina Wool', query: 'Pashmina' },
            { label: 'Chinar Leaf', query: 'Chinar' },
            { label: 'Shikara', query: 'Shikara' },
            { label: 'Saffron Harvest', query: 'Saffron' },
            { label: 'Sonamarg Alpine', query: 'Sonamarg' }
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => {
                setSearchQuery(tag.query);
                setSelectedCategory('All');
                document.getElementById('storefront-main')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`font-mono text-[10px] px-2.5 py-1 tracking-wider uppercase transition-all rounded-sm border ${
                searchQuery.toLowerCase() === tag.query.toLowerCase()
                  ? 'border-neutral-900 bg-neutral-900 text-white font-bold shadow-sm'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-950 bg-white hover:bg-neutral-50'
              }`}
            >
              #{tag.label}
            </button>
          ))}
        </div>

        {/* Results Metadata & Clear Filters */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500">
          <div className="font-mono uppercase tracking-wider">
            Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> of <strong className="text-neutral-900">100</strong> products
            {selectedCategory !== 'All' && <span> in <strong className="text-neutral-900">{selectedCategory}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-neutral-900">{searchQuery}</strong>"</span>}
          </div>

          {(selectedCategory !== 'All' || searchQuery || priceLimit < 300) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setPriceLimit(300);
                setSortType('featured');
              }}
              className="text-neutral-900 font-mono underline hover:text-neutral-600 uppercase tracking-wider"
            >
              Reset Filters [X]
            </button>
          )}
        </div>

        {/* Active Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-neutral-50 border border-neutral-200 rounded-sm">
            <h3 className="font-display font-medium text-base text-neutral-800 tracking-tight">No products found</h3>
            <p className="font-sans text-xs text-neutral-400 mt-2">Try relaxing your search terms or adjusting the price slider.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setPriceLimit(300);
              }}
              className="mt-6 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest px-6 py-2.5 transition-colors uppercase rounded-sm"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {paginatedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2 border-t border-neutral-100 pt-8">
                
                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:text-neutral-300 transition-colors rounded-sm"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 font-mono text-xs">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 border flex items-center justify-center transition-colors rounded-sm ${
                          currentPage === pageNum
                            ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 disabled:border-neutral-200 disabled:text-neutral-300 transition-colors rounded-sm"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-neutral-900 pb-12 mb-10">
          
          <div className="space-y-4">
            <NomadLogo className="w-8 h-8 text-white" showText={true} textSize="text-lg" />
            <p className="font-sans text-xs text-neutral-400 max-w-sm leading-relaxed">
              Nomad® Clothing Co. designs minimalist aesthetic garments, footwear, and vintage accessories for modern exploration. Authenticated with circular specifications, each piece is designed for enduring journeys.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-300 mb-4">THE 100 PIECES</h4>
            <ul className="space-y-2 font-mono text-[10px] text-neutral-500">
              <li>Outerwear System [001-020]</li>
              <li>Vintage Tops & Tees [021-045]</li>
              <li>Aesthetic Denim & Bottoms [046-065]</li>
              <li>Vintage Washed Caps [066-085]</li>
              <li>Aesthetic Footwear [086-100]</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-300 mb-4">LOGISTICS SERVICES</h4>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-3">
              Standard secure routing with global carbon neutral tracking. Fully insured transit protection.
            </p>
            <span className="font-mono text-[9px] tracking-widest text-emerald-500 font-bold block uppercase">
              ● GLOBAL TRANSPORTS OPERATIONAL
            </span>
          </div>

          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-300 mb-4">CONTACT ROUTING</h4>
            <div className="space-y-2 font-sans text-xs text-neutral-400">
              <p>Email: <a href="mailto:phantomcruiz5@gmail.com" className="text-neutral-200 hover:underline font-mono">phantomcruiz5@gmail.com</a></p>
              <p>Phone: <a href="tel:8491829274" className="text-neutral-200 hover:underline font-mono">+8491829274</a></p>
              <button
                onClick={() => setIsContactOpen(true)}
                className="mt-2 font-mono text-[9px] tracking-widest text-amber-500 hover:text-amber-400 font-bold uppercase flex items-center gap-1 hover:underline"
              >
                ● DISPATCH TRANSMISSION
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-600">
          <div>
            © 2026 NOMAD CLOTHING CO. ALL TRANSITS RESERVED.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">CERTIFIED B-CORP</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">SECURE STRIPE TRANSITS</span>
          </div>
        </div>
      </footer>

      {/* --- SIDEBAR DRAWER AND MODAL OVERLAYS --- */}

      {/* Product Details overlay with user reviews */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartWithConfig={handleAddToCartWithConfig}
        onAddReview={handleAddReview}
      />

      {/* Cart Drawer overlay */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout simulated Stripe Payment Secure Gateway */}
      {isCheckoutOpen && (
        <Checkout
          cartItems={cart}
          subtotal={checkoutCosts.subtotal}
          shipping={checkoutCosts.shipping}
          tax={checkoutCosts.tax}
          total={checkoutCosts.total}
          discount={checkoutCosts.discount}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order history drawer logs */}
      <OrderHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
      />

      {/* Contact Us Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
