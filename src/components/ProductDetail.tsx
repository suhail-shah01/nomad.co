import React, { useState, useEffect } from 'react';
import { Product, Review } from '../types';
import { X, Star, ShoppingBag, Check, MessageSquare, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartWithConfig: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCartWithConfig,
  onAddReview
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  // Review form states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Sync state with product details
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setReviewName('');
      setReviewRating(5);
      setReviewComment('');
      setReviewSuccess(false);
      setReviewError('');
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    onAddToCartWithConfig(product, selectedSize, selectedColor, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');

    if (!reviewName.trim()) {
      setReviewError('Please enter your name.');
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError('Please share your thoughts in a comment.');
      return;
    }

    const newReview: Review = {
      id: `${product.id}-user-rev-${Date.now()}`,
      userName: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(product.id, newReview);
    setReviewSuccess(true);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900 z-40"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-white w-full max-w-4xl min-h-[500px] shadow-2xl border border-neutral-100 z-50 relative flex flex-col md:flex-row overflow-hidden rounded-sm"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-55 p-1 bg-white/80 hover:bg-white text-neutral-600 rounded-full border border-neutral-200 shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Product Image & Embroidery Badge Tag */}
          <div className="w-full md:w-1/2 bg-neutral-50 relative aspect-[4/5] md:aspect-auto overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

            {/* Dynamic Premium Embroidery Badge Tag Overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-neutral-200 shadow-sm px-3 py-2 flex items-center gap-2 rounded-sm pointer-events-none select-none">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-neutral-900" fill="currentColor">
                <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="12" />
                <polygon points="50,15 50,85 85,85" fill="currentColor" opacity="0.3" />
              </svg>
              <div>
                <span className="font-display font-bold text-[10px] tracking-widest text-neutral-900 uppercase block leading-none">
                  Nomad Apparel<span className="text-neutral-500 font-normal">®</span>
                </span>
                <span className="font-mono text-[7.5px] text-neutral-400 tracking-wider block mt-0.5 uppercase">Garment Craft Co.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Details & Review System */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-[85vh] flex flex-col">
            {/* Core Info */}
            <div className="pb-5 border-b border-neutral-100">
              <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-1 block">
                {product.category}
              </span>
              <h2 className="font-display font-bold text-xl text-neutral-900 tracking-tight leading-tight mb-2">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-4">
                <span className="font-mono text-lg font-bold text-neutral-900">
                  ${product.price}.00
                </span>
                <span className="h-4 w-[1px] bg-neutral-200"></span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-700 ml-1">
                    {product.rating}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 ml-0.5">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Config: Colors & Sizes */}
            <div className="py-5 border-b border-neutral-100 space-y-5">
              {/* Color Swatches */}
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
                  Select Color: <span className="text-neutral-800 font-bold">{selectedColor?.name}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-7 h-7 rounded-full border relative flex items-center justify-center transition-transform hover:scale-110 ${
                        selectedColor?.hex === color.hex
                          ? 'border-neutral-900 shadow-md scale-105'
                          : 'border-neutral-200'
                      }`}
                      title={color.name}
                    >
                      {selectedColor?.hex === color.hex && (
                        <Check className={`w-3.5 h-3.5 ${
                          color.hex === '#F2EFE9' || color.hex === '#D7C2A5' ? 'text-neutral-900' : 'text-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes Selection */}
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
                  Select Size:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 h-9 px-2 text-xs font-mono border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'border-neutral-900 bg-neutral-900 text-white font-semibold shadow-sm'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Add button */}
              <div className="flex gap-3 pt-2">
                <div className="flex items-center border border-neutral-200 rounded-sm shrink-0">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 h-10 hover:bg-neutral-50 text-neutral-500 text-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-neutral-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 h-10 hover:bg-neutral-50 text-neutral-500 text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest h-10 px-6 transition-colors uppercase flex items-center justify-center gap-2 rounded-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Pack
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="py-5 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
                The Specs:
              </span>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="py-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm tracking-wider text-neutral-900 uppercase">
                  User Reviews ({product.reviews.length})
                </h3>
              </div>

              {/* Add New Review Accordion */}
              <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-sm">
                <h4 className="font-display font-medium text-xs text-neutral-800 tracking-tight flex items-center gap-1.5 mb-3">
                  <MessageSquare className="w-3.5 h-3.5" />
                  WRITE A BRAND REVIEW
                </h4>
                
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[9px] text-neutral-400 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Liam Mercer"
                        className="w-full bg-white border border-neutral-200 px-3 py-1.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] text-neutral-400 uppercase mb-1">Your Rating</label>
                      <div className="flex items-center h-8 gap-1 bg-white border border-neutral-200 px-3 rounded-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-0.5 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= reviewRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-neutral-400 uppercase mb-1">Your Comment</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding fabric quality, fit, and aesthetic details..."
                      rows={2}
                      className="w-full bg-white border border-neutral-200 p-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-sm resize-none"
                    />
                  </div>

                  {reviewError && (
                    <p className="font-mono text-[10px] text-red-500">{reviewError}</p>
                  )}

                  {reviewSuccess && (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 font-sans text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Review submitted successfully! Thank you for supporting Nomad craft.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[10px] tracking-widest py-2 transition-colors uppercase rounded-sm"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {product.reviews.length === 0 ? (
                  <p className="font-sans text-xs text-neutral-400 italic">No reviews yet. Be the first to review this product!</p>
                ) : (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-semibold text-xs text-neutral-800">{rev.userName}</span>
                        <span className="font-mono text-[10px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="font-sans text-xs text-neutral-500 leading-relaxed bg-neutral-50 p-2.5 border border-neutral-100/50 rounded-sm">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
