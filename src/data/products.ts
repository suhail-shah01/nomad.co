import { Product, Review } from '../types';

// Unsplash image mappings for categories
const outerwearImages = [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', // Stylish jacket
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop', // Shearling jacket
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop', // Leather jacket
  'https://images.unsplash.com/photo-1508427953056-b00b8d78ec65?q=80&w=600&auto=format&fit=crop', // Minimal bomber jacket
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop', // Cozy hoodie/puffer
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop', // Casual jacket
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop', // Elegant overcoat
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop', // Wool coat
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop', // Black coat
  'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop'  // Winter wear
];

const topsImages = [
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop', // White tee
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop', // White tee folded
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop', // Knitwear sweater
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop', // Black folded tee
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop', // Striped knit tee
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop', // Linen shirt
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', // Checkered shirt
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop'  // Black sweater
];

const bottomsImages = [
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop', // Denim
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop', // Cargo pants
  'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop', // Joggers
  'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600&auto=format&fit=crop', // Blue jeans
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop'  // Casual shorts
];

const accessoriesImages = [
  'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600&auto=format&fit=crop', // Beanie
  'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?q=80&w=600&auto=format&fit=crop', // Cap
  'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600&auto=format&fit=crop', // Belt
  'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop'  // Socks
];

const gearImages = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', // Backpack
  'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop', // Water bottle
  'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', // Leather messenger
  'https://images.unsplash.com/photo-1524498250428-ec03307248c9?q=80&w=600&auto=format&fit=crop', // Travel duffel
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop'  // Sling bag
];

// Earth tone palettes
const defaultColors = [
  { name: 'Obsidian Black', hex: '#1C1C1D' },
  { name: 'Forest Olive', hex: '#2F3E35' },
  { name: 'Saharan Sand', hex: '#D7C2A5' },
  { name: 'Slate Blue', hex: '#4B5E6B' },
  { name: 'Clay Rust', hex: '#A25946' },
  { name: 'Pebble Grey', hex: '#8B8C8D' }
];

const accessoryColors = [
  { name: 'Obsidian Black', hex: '#1C1C1D' },
  { name: 'Forest Olive', hex: '#2F3E35' },
  { name: 'Saharan Sand', hex: '#D7C2A5' },
  { name: 'Clay Rust', hex: '#A25946' }
];

const gearColors = [
  { name: 'Obsidian Black', hex: '#1C1C1D' },
  { name: 'Coyote Tan', hex: '#AF8E69' },
  { name: 'Sage Green', hex: '#5E6B5D' }
];

// Lists of premium, brand-consistent names grouped by categories
const outerwearNames = [
  'Nomad Apex GORE-TEX Shell',
  'Nomad Summit Alpine Down Parka',
  'Nomad Ranger Ripstop Field Jacket',
  'Nomad Quest Technical Fleece Hoodie',
  'Nomad Odyssey Transit Windbreaker',
  'Nomad Shelter Stormproof Anorak',
  'Nomad Vanguard Merino Wool Overcoat',
  'Nomad Horizon Packable Rain Shell',
  'Nomad Drift Shearling Collar Bomber',
  'Nomad Patrol Hybrid Fleece Vest',
  'Nomad Sentinel Insulation Jacket',
  'Nomad Voyager Expedition Parka',
  'Nomad Boundary Corduroy Shacket',
  'Nomad Ridge Sherpa-Lined Jacket',
  'Nomad Grid Technical Pullover',
  'Nomad Shelter Mountain Poncho',
  'Nomad Scout Utility Field Coat',
  'Nomad Trailhead Weatherproof Parka',
  'Nomad Ascent Thermal Softshell',
  'Nomad Solitude Woolen Trench'
];

const topsNames = [
  'Nomad Trailhead Organic Slub Tee',
  'Nomad Merino Wool Base Layer Henley',
  'Nomad Latitude Linen Button-Down',
  'Nomad Thermal Waffle Knit Longsleeve',
  'Nomad Everyday Supima Cotton Tee',
  'Nomad Oasis Breathable Pique Polo',
  'Nomad Dune Lightweight Chambray Shirt',
  'Nomad Ember Heavyweight Flannel',
  'Nomad Driftwood Ribbed Sweater',
  'Nomad Summit Technical Quarter-Zip',
  'Nomad Atlas French Terry Hoodie',
  'Nomad Compass Classic Pocket Tee',
  'Nomad Meridian Silk-Blend Knit Polo',
  'Nomad Ridge Merino Crewneck Sweater',
  'Nomad Eclipse UV Sun-Proof Hoody',
  'Nomad Pioneer Brushed Utility Shirt',
  'Nomad Peak Hemp-Blend Relaxed Tee',
  'Nomad Wanderer Knit Cardigan',
  'Nomad Cascade Indigo Denim Over-Shirt',
  'Nomad Core Minimalist Logo Tee',
  'Nomad Vent Tech Breathable Active Tee',
  'Nomad Thermal Grid Fleece Crewneck',
  'Nomad Oxford Button-Up Smart Shirt',
  'Nomad Horizon Graphic Pocket Tee',
  'Nomad Ridge Textured Henley'
];

const bottomsNames = [
  'Nomad Transit Water-Resistant Chino',
  'Nomad Frontier Heavy Canvas Cargo Pant',
  'Nomad Voyager 4-Way Stretch Pant',
  'Nomad Canyon Trail Trekking Pant',
  'Nomad Grid Ripstop Cargo Pant',
  'Nomad Active Merino Wool Jogger',
  'Nomad All-Terrain Utility Short',
  'Nomad Latitude Lightweight Chino Short',
  'Nomad Summit Corduroy Flat Trousers',
  'Nomad Apex Technical Shell Pant',
  'Nomad Dune Linen Relaxed Pant',
  'Nomad Roam Brushed Cotton Sweatpant',
  'Nomad Ascent Multi-Pocket Trail Short',
  'Nomad Pioneer Selvedge Denim Jeans',
  'Nomad Horizon Quick-Dry Swim Short',
  'Nomad Drift Lightweight Training Pant',
  'Nomad Boundary Double-Knee Work Pant',
  'Nomad Sentinel Reinforced Climber Pant',
  'Nomad Trailhead Stretch Cargo Short',
  'Nomad Odyssey Fleece Sweatshorts'
];

const accessoriesNames = [
  'Nomad Apex Ribbed Merino Beanie',
  'Nomad Summit Merino Sock 3-Pack',
  'Nomad Horizon Curved Brim Cap',
  'Nomad Vagabond Woven Webbing Belt',
  'Nomad Shelter Stormproof Gloves',
  'Nomad Merino Wool Thermal Gaiter',
  'Nomad Drifter 5-Panel Nylon Cap',
  'Nomad Signature Full-Grain Leather Belt',
  'Nomad Oasis Linen Summer Scarf',
  'Nomad Thermal Touchscreen Tech Glove',
  'Nomad Shelter Aviator Trapper Hat',
  'Nomad Trailhead Ribbed Crew Socks',
  'Nomad Aegis Polarized Active Sunglasses',
  'Nomad Shield Stainless Steel Sunglasses',
  'Nomad Ascent Knit Elastic Headband',
  'Nomad Odyssey Soft Corduroy Cap',
  'Nomad Ridge Solid Brass Key Clip',
  'Nomad Boundary Minimalist Leather Wallet',
  'Nomad Drift Waterproof Bucket Hat',
  'Nomad Horizon Lightweight Runner Visor'
];

const gearNames = [
  'Nomad Expedition Dry Backpack 35L',
  'Nomad Daypack Cordura Everyday 20L',
  'Nomad Voyager Roll-Top Duffel 50L',
  'Nomad Sling Pack Modular Crossbody',
  'Nomad Escapist Tech Messenger Bag',
  'Nomad Roam Dual-Compartment Pouch',
  'Nomad Toiletry Kit Water-Resistant',
  'Nomad Vacuum Insulated Steel Flask 32oz',
  'Nomad Trailhead Ultralight Titanium Mug',
  'Nomad Compass Cordura Waist Pack',
  'Nomad Range Protective Laptop Sleeve',
  'Nomad Utility Heavy Gear Straps',
  'Nomad Ridge Carabiner Multi-Tool',
  'Nomad Horizon Microfiber Camp Towel',
  'Nomad Classic Canvas Branding Tote'
];

// Base reviews list pool to procedurally generate varying reviews
const reviewsPool = [
  { rating: 5, comment: 'Absolutely outstanding quality. The stitching is perfect and it fits like a glove. Will definitely buy more from Nomad!' },
  { rating: 5, comment: 'The material is incredibly soft yet durable. Extremely comfortable for long travel days.' },
  { rating: 4, comment: 'Excellent product. Love the minimalist aesthetic. It runs slightly large, so check the size guide.' },
  { rating: 5, comment: 'Hands down my favorite piece of clothing. Super functional pockets and very sleek.' },
  { rating: 4, comment: 'Very high quality fabric. Kept me warm during my chilly evening hikes. Highly recommend.' },
  { rating: 5, comment: 'A perfect blend of outdoor utility and modern urban style. Nomad has crushed it.' },
  { rating: 5, comment: 'Beautiful earthy color options. Launders perfectly without shrinking.' },
  { rating: 4, comment: 'Really great quality. The price is justified given the premium feel and sustainability aspects.' },
  { rating: 5, comment: 'Highly breathable, packs away beautifully, and the Nomad emblem looks super subtle and clean.' },
  { rating: 5, comment: 'Perfect for minimalists. No loud labels, just functional, gorgeous garments.' }
];

const reviewers = [
  'Alex Mercer', 'Sophia Vance', 'Liam Chen', 'Emma K.', 'Marcus Brodie',
  'Chloe Lindqvist', 'Devon Patel', 'Elena Rostova', 'Julian Thorne', 'Sasha Mendez',
  'Kai Sterling', 'Nora Lindell', 'Tariq Al-Fayed', 'Clara Dubois', 'Oliver Finch'
];

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate the complete list of 100 products
export const products: Product[] = [];

// 1. Generate Outerwear (20 Items)
outerwearNames.forEach((name, i) => {
  const id = `nomad-${String(i + 1).padStart(3, '0')}`;
  const price = 95 + (i * 8) + (i % 3 === 0 ? 5 : -4); // Realistic outer prices
  const rating = parseFloat((4.4 + (i % 7) * 0.08).toFixed(1));
  
  // Custom reviews
  const reviews: Review[] = [];
  const reviewsCount = 3 + (i % 4);
  for (let r = 0; r < reviewsCount; r++) {
    const reviewer = reviewers[(i + r * 3) % reviewers.length];
    const reviewBase = reviewsPool[(i * 2 + r * 5) % reviewsPool.length];
    const daysAgo = 2 + r * 15 + (i % 5);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${id}-rev-${r}`,
      userName: reviewer,
      rating: reviewBase.rating,
      comment: reviewBase.comment,
      date: date.toISOString().split('T')[0]
    });
  }

  products.push({
    id,
    name,
    price,
    category: 'Outerwear',
    description: `Engineered for the wanderer, this premium Nomad outerwear combines weatherproof durability with an elegant minimalist aesthetic. Features water-resistant fibers, ergonomic seams for movement, and reinforced lining. Perfect for layering during transit or mountain excursions. Features subtle Nomad signature branding embossed at the hem.`,
    image: outerwearImages[i % outerwearImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(0, 3 + (i % 4)),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    reviews,
    isFeatured: i === 0 || i === 4 || i === 11 // A few featured
  });
});

// 2. Generate Tops (25 Items)
topsNames.forEach((name, i) => {
  const index = i + 20;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 28 + (i * 2) + (i % 4 === 0 ? 3 : -2); // Realistic top prices
  const rating = parseFloat((4.3 + (i % 6) * 0.1).toFixed(1));

  const reviews: Review[] = [];
  const reviewsCount = 2 + (i % 5);
  for (let r = 0; r < reviewsCount; r++) {
    const reviewer = reviewers[(index + r * 3) % reviewers.length];
    const reviewBase = reviewsPool[(index * 2 + r * 4) % reviewsPool.length];
    const daysAgo = 4 + r * 12 + (i % 6);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${id}-rev-${r}`,
      userName: reviewer,
      rating: reviewBase.rating,
      comment: reviewBase.comment,
      date: date.toISOString().split('T')[0]
    });
  }

  products.push({
    id,
    name,
    price,
    category: 'Tops',
    description: `A cornerstone of the modern capsule wardrobe. This Nomad top is cut from highly sustainable, breathable fabrics that adapt seamlessly to temperature changes. Offers premium anti-odor properties, ultra-soft flatlock seams, and standard athletic fit. Designed with our original coordinates print and minimal icon embroidery on the pocket.`,
    image: topsImages[i % topsImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(i % 3, 4 + (i % 3)),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    reviews,
    isFeatured: i === 0 || i === 8 || i === 19 // Featured tops
  });
});

// 3. Generate Bottoms (20 Items)
bottomsNames.forEach((name, i) => {
  const index = i + 45;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 65 + (i * 3) + (i % 2 === 0 ? 4 : -3); // Realistic bottoms prices
  const rating = parseFloat((4.5 + (i % 5) * 0.08).toFixed(1));

  const reviews: Review[] = [];
  const reviewsCount = 2 + (i % 4);
  for (let r = 0; r < reviewsCount; r++) {
    const reviewer = reviewers[(index + r * 2) % reviewers.length];
    const reviewBase = reviewsPool[(index * 3 + r * 3) % reviewsPool.length];
    const daysAgo = 5 + r * 14 + (i % 7);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${id}-rev-${r}`,
      userName: reviewer,
      rating: reviewBase.rating,
      comment: reviewBase.comment,
      date: date.toISOString().split('T')[0]
    });
  }

  products.push({
    id,
    name,
    price,
    category: 'Bottoms',
    description: `Constructed to withstand harsh terrain while providing comfort for the long haul. Nomad bottoms incorporate dynamic stretch gussets, dual security pockets, and a tailored leg. Perfect for hiking, working, or relaxing. Complete with custom custom-molded brand buttons and a Nomad logo patch stitched onto the waistband.`,
    image: bottomsImages[i % bottomsImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(1, 4 + (i % 3)),
    sizes: ['S', 'M', 'L', 'XL'],
    reviews,
    isFeatured: i === 2 || i === 13 // Featured bottoms
  });
});

// 4. Generate Accessories (20 Items)
accessoriesNames.forEach((name, i) => {
  const index = i + 65;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 18 + (i * 2) + (i % 3 === 0 ? 1 : -1); // Accessory prices
  const rating = parseFloat((4.2 + (i % 8) * 0.09).toFixed(1));

  const reviews: Review[] = [];
  const reviewsCount = 1 + (i % 5);
  for (let r = 0; r < reviewsCount; r++) {
    const reviewer = reviewers[(index + r * 4) % reviewers.length];
    const reviewBase = reviewsPool[(index * i + r * 2) % reviewsPool.length];
    const daysAgo = 1 + r * 18 + (i % 8);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${id}-rev-${r}`,
      userName: reviewer,
      rating: reviewBase.rating,
      comment: reviewBase.comment,
      date: date.toISOString().split('T')[0]
    });
  }

  products.push({
    id,
    name,
    price,
    category: 'Accessories',
    description: `Finely detailed accents designed to complete your travel apparel system. Made from temperature-regulating wools and high-tech synthetics. Features Nomad insignia embroidered directly on the fabric. Practical, comfortable, and styled to be worn daily.`,
    image: accessoriesImages[i % accessoriesImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: accessoryColors.slice(0, 2 + (i % 3)),
    sizes: ['One Size'],
    reviews,
    isFeatured: i === 0 || i === 12
  });
});

// 5. Generate Gear & Bags (15 Items)
gearNames.forEach((name, i) => {
  const index = i + 85;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 22 + (i * 9) + (i % 3 === 0 ? 5 : -4); // Gear and bags prices
  const rating = parseFloat((4.6 + (i % 4) * 0.08).toFixed(1));

  const reviews: Review[] = [];
  const reviewsCount = 3 + (i % 3);
  for (let r = 0; r < reviewsCount; r++) {
    const reviewer = reviewers[(index + r * 5) % reviewers.length];
    const reviewBase = reviewsPool[(index * 2 + r * 7) % reviewsPool.length];
    const daysAgo = 3 + r * 20 + (i % 5);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    reviews.push({
      id: `${id}-rev-${r}`,
      userName: reviewer,
      rating: reviewBase.rating,
      comment: reviewBase.comment,
      date: date.toISOString().split('T')[0]
    });
  }

  products.push({
    id,
    name,
    price,
    category: 'Gear & Bags',
    description: `Durable carrying systems and tools for the off-grid explorer. Built from heavy-duty Cordura nylon, weatherproof coatings, and premium hardware. Features modular attachments, hidden security pockets, and ergonomic load-distribution straps. Screenprinted with our emblem and Nomad branding representing ultimate freedom in travel.`,
    image: gearImages[i % gearImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: gearColors.slice(0, 1 + (i % 3)),
    sizes: ['One Size'],
    reviews,
    isFeatured: i === 0 || i === 3 || i === 10
  });
});
