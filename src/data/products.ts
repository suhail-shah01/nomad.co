import { Product, Review } from '../types';

// Unsplash image mappings for categories
const outerwearImages = [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', // Vintage corduroy style
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop', // Shearling vintage collar
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop', // Heavy leather jacket
  'https://images.unsplash.com/photo-1508427953056-b00b8d78ec65?q=80&w=600&auto=format&fit=crop', // Retro oversized bomber
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop', // Cozy oversized knit hoodie
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop', // Workwear utility canvas jacket
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop', // Vintage trench overcoat
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop', // Woolen vintage aesthetic coat
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop', // Elegant winter fit
  'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=600&auto=format&fit=crop'  // Mountain expedition wear
];

const topsImages = [
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop', // Heavyweight vintage tee
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop', // Handcrafted white folded shirt
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop', // Vintage knitwear sweater
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop', // Graphic tee
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop', // Striped vintage tee
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop', // Retro linen shirt
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', // Plaid flannel shirt
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop'  // Heavy knit sweater
];

const bottomsImages = [
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop', // Distressed vintage denim
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop', // Retro cargo pants
  'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop', // Heavy fleece joggers
  'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=600&auto=format&fit=crop', // Classic washed blue jeans
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop'  // Retro relaxed shorts
];

const accessoriesImages = [
  'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?q=80&w=600&auto=format&fit=crop', // Vintage strapback cap
  'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600&auto=format&fit=crop', // Heavy knit beanie
  'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600&auto=format&fit=crop', // Vintage full-grain belt
  'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop'  // Thick ribbed crew socks
];

const footwearImages = [
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop', // Suede retro sneaker
  'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop', // Handcrafted leather boot
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop', // Retro high-top canvas shoe
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', // Chunky aesthetic sneaker
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop', // Vintage clean tennis shoe
  'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=600&auto=format&fit=crop', // Suede hiking shoe
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'  // Classic athletic trainer
];

// Earth tone palettes
const defaultColors = [
  { name: 'Obsidian Black', hex: '#1C1C1D' },
  { name: 'Vintage Olive', hex: '#3E4940' },
  { name: 'Saharan Sand', hex: '#D7C2A5' },
  { name: 'Washed Indigo', hex: '#4C5D6C' },
  { name: 'Rust Red', hex: '#9E5241' },
  { name: 'Alabaster White', hex: '#F0ECE4' }
];

const accessoryColors = [
  { name: 'Obsidian Black', hex: '#1C1C1D' },
  { name: 'Vintage Olive', hex: '#3E4940' },
  { name: 'Saharan Sand', hex: '#D7C2A5' },
  { name: 'Rust Red', hex: '#9E5241' }
];

const shoeColors = [
  { name: 'Distressed Tobacco Suede', hex: '#967451' },
  { name: 'Obsidian Black Leather', hex: '#1C1C1D' },
  { name: 'Natural Sand Canvas', hex: '#E6DCCE' },
  { name: 'Ecru White Suede', hex: '#EBE6DC' }
];

// Lists of premium, aesthetic and vintage products
const outerwearNames = [
  'Nomad Believers "Gulmarg Snow Peak" Heavy Waxed Parka with Bold Crest Logo',
  'Nomad Believers "Chinar Leaf" Corduroy Cabin Jacket - Embroidered Vintage Logo',
  'Nomad Believers "Karakoram Ridge" Down-Fill Mountain Puffer (Clear Sleeve Branding)',
  'Nomad Believers "Sonamarg" Heavy Sherpa Expedition Coat with Stitched Nomad Seal',
  'Nomad Believers "Pir Panjal" Hooded Waxed Field Jacket - Big Front Logo Stamp',
  'Nomad Believers "Dal Lake Dawn" Oversized Tweed Trench with Embroidered Name',
  'Nomad Believers "Himalayan Pine" Workwear Utility Canvas Jacket with Branded Badge',
  'Nomad Believers "Zoji La Pass" Heavy Leather Flight Bomber (Embossed Nomad Emblem)',
  'Nomad Believers "Saffron Field" Vintage Coach Jacket - High-Visibility Crest Print',
  'Nomad Believers "Pahalgam" Reversible Fleece Trail Anorak with Giant Back Branding',
  'Nomad Believers "Wanderer in Kashmir" Denim Trucker (Bold Back Logo Embroidery)',
  'Nomad Believers "Kashmiri Mist" Woolen Double-Breasted Overcoat - Engraved Buttons',
  'Nomad Believers "K2 Summit" Extreme Windproof Shell (Clearly Visible Mountain Logo)',
  'Nomad Believers "Amarnath Alpine" Heavyweight Knit Zip-Cardigan with Nomad Patch',
  'Nomad Believers "Shikara" Vintage Rain Parka - Reflective Chest Nomad Brand',
  'Nomad Believers "Aru Valley" Checked Flannel Shacket with Chest Pocket Logo Badge',
  'Nomad Believers "Lidder River" Retro Transit Utility Vest with Stamped Logo',
  'Nomad Believers "Dachigam Forest" Heavy Cotton Duster (Stitched Mountain Emblem)',
  'Nomad Believers "Yusmarg" Corduroy Collar Barn Jacket - Front & Center Chest Print',
  'Nomad Believers "Sindh Valley" Fleece-Lined Parka with Clearly Stamped Nomad Emblem'
];

const topsNames = [
  'Nomad Believers "Gulmarg Snow Peak" Heavyweight Logo Hoodie (Front Center Crest)',
  'Nomad Believers "Kashmir Valley" Vintage Graphic T-Shirt - Bold Mountain Print',
  'Nomad Believers "Dal Lake Sunset" Premium Hoodie with Giant Nomad Back Print',
  'Nomad Believers "Kashmiri Chinar" Washed Cotton Tee with High-Contrast Chest Logo',
  'Nomad Believers "Sonamarg Meadows" Drop-Shoulder T-Shirt - Stitched Nomad Name',
  'Nomad Believers "Pashmina Luxury Blend" Ribbed Fisherman Knit (Sleeve Nomad Badge)',
  'Nomad Believers "Saffron Harvest" Heavy Cotton Hoodie - Golden Nomad Crest Logo',
  'Nomad Believers "Himalayan Cedar" Heavy Waffle Henley with Embroidered Brand',
  'Nomad Believers "Pahalgam Pine" Vintage Longsleeve T-Shirt - Bold Sleeve Lettering',
  'Nomad Believers "Betaab Valley" Boxy Fit Heavy Tee - Royal Vintage Nomad Logo',
  'Nomad Believers "Ganeshbal" Premium Hand-Dyed Hooded Pullover - Front Brand Crest',
  'Nomad Believers "Jhelum River" Soft Supima Cotton Pocket Tee - Pocket Logo Print',
  'Nomad Believers "Shikara Rhythm" Retro Knit Sweatshirt with Big Chest Nomad Name',
  'Nomad Believers "Zabarwan Range" Vintage Brushed Flannel - Stamped Cuff Branding',
  'Nomad Believers "Chinar Shadow" Aesthetic Oversized Tee (Vivid Chest Embroidery)',
  'Nomad Believers "Martand Temple" Archival Graphic T-Shirt with Mountain Logo Print',
  'Nomad Believers "Aru Trail" High-Contrast Half-Zip Fleece with Bold Collar Brand',
  'Nomad Believers "Kashmiri Chai" Pastel Clay Aesthetic Tee - Left Breast Mountain Logo',
  'Nomad Believers "Dal Mist" Soft French Terry Hoodie - Large Distressed Back Graphic',
  'Nomad Believers "Naranag Ruins" Double-Pocket Linen Over-Shirt (Nomad Sleeve Stamp)',
  'Nomad Believers "Himalaya Nomad Co." Brushed Cotton Oxford with Embroidered Logo',
  'Nomad Believers "Gurez Valley" Retro Mock-Neck Longsleeve (Bold Contrast Collar Logo)',
  'Nomad Believers "Verinag Spring" Pigment-Dyed Heavyweight Hoodie (Front Mountain Print)',
  'Nomad Believers "Kashmiri Kesar" Golden Mustard Tee - Clearly Visible Nomad Branding',
  'Nomad Believers "Tulip Garden" Vibrant Organic Cotton Tee with Signature Crest'
];

const bottomsNames = [
  'Nomad Believers "Pir Panjal" Heavy Selvedge Denim Jeans (Stamped Leather Back-Patch)',
  'Nomad Believers "Gulmarg Snow-Cap" Carpenter Canvas Pants with Stitched Brand Seal',
  'Nomad Believers "Dal Lake Chinar" Wide-Leg Pleated Corduroy Pants (Nomad Co. Tab)',
  'Nomad Believers "Himalayan Ridge" Double-Knee Work Pants - Embossed Knee Crests',
  'Nomad Believers "Sonamarg Transit" Heavyweight Chinos with Contrast Pocket Branding',
  'Nomad Believers "Pahalgam Trail" Rugged Ripstop Outdoor Cargo Pants (Front Leg Print)',
  'Nomad Believers "Betaab Meadows" Straight Washed Indigo Denim with Stenciled Logo',
  'Nomad Believers "Aru Forest" Fleece Lounge Joggers - Highlighted Left Thigh Branding',
  'Nomad Believers "Kashmir Khaki" Vintage Straight Trousers - Brass Emblem Button',
  'Nomad Believers "Lidder Valley" Drawstring Linen Trail Pants - Stitched Name Tab',
  'Nomad Believers "Zoji La Expedition" Heavy Canvas Pants (Clearly Visible Back Pocket Logo)',
  'Nomad Believers "Shikara Voyage" Relaxed Fit Denim Shorts with Stamped Brand',
  'Nomad Believers "Saffron Field" Heavyweight Corduroy Utility Pants (Side Pocket Crest)',
  'Nomad Believers "Dachigam" Brushed Canvas Chinos with Embossed Leather Trim',
  'Nomad Believers "Himalaya Ridge" Technical Waterproof Mountain Pants with Brand Print',
  'Nomad Believers "K2 Patrol" Heavy Cotton Utility Cargo Shorts with Distinctive Logo',
  'Nomad Believers "Yusmarg Meadows" Terry Sweatshorts with Prominent Left Leg Emblem',
  'Nomad Believers "Sinthan Top" Vintage Corduroy Carpenter Shorts - Stitched Brand Stamp',
  'Nomad Believers "Gurez" Washed Canvas Relaxed Fit Pants (With Bold Nomad Crest)',
  'Nomad Believers "Sheshnag" Cropped Workwear Trousers - Highlighted Pocket Logo Embroidery'
];

const accessoriesNames = [
  'Nomad Believers "Gulmarg Peak" Washed Cotton Strapback Cap with Embroidered Logo',
  'Nomad Believers "Kashmiri Chinar" Vintage Corduroy 5-Panel Cap (Large Mountain Crest)',
  'Nomad Believers "Sonamarg Blizzard" Heavy Ribbed Wool Beanie with Bold Woven Brand',
  'Nomad Believers "Pashmina Heritage" Soft Wool Scarf - Distinctive Nomad Tag',
  'Nomad Believers "Betaab Valley" Embroidered Canvas Bucket Hat (Full Circumference Logo)',
  'Nomad Believers "Himalayan Cedar" Brass-Buckle Leather Belt - Engraved Brand Name',
  'Nomad Believers "Dal Lake Dawn" Polarized Sunglasses (Gold Frame with Laser Logo)',
  'Nomad Believers "Pahalgam Explorer" Touchscreen Field Gloves with Raised Mountain Logo',
  'Nomad Believers "Shikara Sailor" Thick Ribbed Cotton Crew Socks (Bold Ankle Knit Logo)',
  'Nomad Believers "Lidder River" Brass Key Clip with Full-Grain Embossed Leather Fob',
  'Nomad Believers "Kashmir Valley" Full-Grain Minimalist Leather Wallet (Stamped Crest)',
  'Nomad Believers "Zoji La" Weatherproof Canvas Trapper Hat with Stitched Peak Seal',
  'Nomad Believers "Aru Alpine" Heavy Knit Trail Blanket Scarf with Oversized Brand Tag',
  'Sinthan Pass" Ribbed Merino Hiking Socks - Highlighted Arch Branding',
  'Nomad Believers "Pir Panjal" Vintage unstructured Denim Cap - Contrast Logo Stitching',
  'Nomad Believers "K2 Ascent" Water-Repellent Tactical Cap - Bold Side Mountain Print',
  'Nomad Believers "Chinar Leaf" Woven Travel Bandana (Saffron and Olive Crest Repeat)',
  'Nomad Believers "Kashmir Saffron" Brass Pin Set (3-Pack Mountain & Man Logos)',
  'Nomad Believers "Gurez Border" Distressed Canvas Webbing Belt with Branded Metal Buckle',
  'Nomad Believers "Tulip Field" Premium Silk Bandana featuring Handcrafted Crest Logo'
];

const footwearNames = [
  'Nomad Believers "Gulmarg Expedition" Suede Hiking Boots with Stamped Mountain Logo',
  'Nomad Believers "Dal Lake Shikara" Suede Chelsea Boots (Engraved Leather Brand Heel)',
  'Nomad Believers "Sonamarg Alpine" Retro High-Top Canvas Shoes - Giant Star Crest',
  'Nomad Believers "Pir Panjal Ranger" Heavy Waterproof Leather boots (Nomad Crest On Tongue)',
  'Nomad Believers "Pahalgam Court" Vintage Leather Sneakers (Gold Lettering Nomad Logo)',
  'Nomad Believers "Lidder River" Suede Vibram-Sole Trail Runners with Highlighted Logo',
  'Nomad Believers "Kashmir Leisure" Vintage Suede Penny Loafers - Stitched Brand Crest',
  'Nomad Believers "Shikara Row" Retro Low-Top Canvas Trainers with Big Tongue Label',
  'Nomad Believers "K2 Ascent" Suede Trail Shoes - High Contrast Nomad Co. Emblem',
  'Nomad Believers "Aru Valley" Shearling-Lined Suede Cabin Slippers with Stamped Name',
  'Nomad Believers "Betaab City" Chunky Aesthetic Running Shoes (Prominent Heel Mountain Sign)',
  'Nomad Believers "Zoji La Storm" Heavy-Duty Vibram Leather Boots with Branded Eyelets',
  'Nomad Believers "Jhelum Wanderer" Breathable Canvas Slip-Ons (Printed Mountain Logo)',
  'Nomad Believers "Yusmarg Trail" Technical Waterproof Runners - Highlighted Side Sign',
  'Nomad Believers "Sinthan Summit" Suede Tennis Shoes with Royal Script Branding'
];

// Base reviews list pool to procedurally generate varying reviews
const reviewsPool = [
  { rating: 5, comment: 'Incredible vintage aesthetic. The fabric is thick, durable, and feels like something that will last a lifetime. The Nomad logo stitching is beautiful!' },
  { rating: 5, comment: 'Absolutely obsessed with the cut. It has that perfect vintage slouchy shoulder, and the branding is so classy and low-key.' },
  { rating: 4, comment: 'Superb quality. Beautiful muted colors that perfectly fit an earth-toned wardrobe. Definitely gives off royal retro explorer vibes.' },
  { rating: 5, comment: 'The mountain logo and Nomad name are beautifully detailed. Highly aesthetic and works for both men and women wear. Very comfy!' },
  { rating: 4, comment: 'Great heavyweight denim. Hard to find jeans with this classic vintage cut these days. Highly recommended.' },
  { rating: 5, comment: 'Premium details are outstanding! From the custom metal hardware with the mountain insignia to the vintage wash, it is perfection.' },
  { rating: 5, comment: 'Beautiful earthy tones. It looks exactly like vintage high-fashion pieces. Launders wonderfully without losing shape.' },
  { rating: 4, comment: 'Really great quality. The price is completely justified by the heavy premium feel of the material. A staple piece.' },
  { rating: 5, comment: 'Subtle and aesthetic. No loud tags, just perfect tailored seams, vintage-vibe fabric, and beautiful logo work.' },
  { rating: 5, comment: 'Perfect fit and incredible texture. Best vintage cap/shirt combo I have ever bought.' }
];

const reviewers = [
  'Alex Mercer', 'Sophia Vance', 'Liam Chen', 'Emma K.', 'Marcus Brodie',
  'Chloe Lindqvist', 'Devon Patel', 'Elena Rostova', 'Julian Thorne', 'Sasha Mendez',
  'Kai Sterling', 'Nora Lindell', 'Tariq Al-Fayed', 'Clara Dubois', 'Oliver Finch'
];

// Generate the complete list of 100 products
export const products: Product[] = [];

// 1. Generate Outerwear (20 Items)
outerwearNames.forEach((name, i) => {
  const id = `nomad-${String(i + 1).padStart(3, '0')}`;
  const price = 95 + (i * 8) + (i % 3 === 0 ? 5 : -4); // Realistic outer prices
  const rating = parseFloat((4.4 + (i % 7) * 0.08).toFixed(1));
  
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
    description: `Inspired by the pristine snow-covered peaks of Gulmarg and Chinar valleys of Kashmir. This premium vintage-inspired outerwear masterpiece features heavy-density weather-resistant fabrics and custom aged brass hardware. It boasts a clearly visible, beautifully embroidered Nomad Co. "Man & Mountain" signature logo and name on the chest or sleeve, making the brand signature pop with royal alpine style.`,
    image: outerwearImages[i % outerwearImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(0, 3 + (i % 4)),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    reviews,
    isFeatured: i === 0 || i === 4 || i === 8 // A few featured
  });
});

// 2. Generate Tops (25 Items)
topsNames.forEach((name, i) => {
  const index = i + 20;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 32 + (i * 2) + (i % 4 === 0 ? 3 : -2); // Realistic top prices
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
    description: `An exquisite, high-end t-shirt or hoodie inspired by the beautiful Kashmiri mountain ranges. Made from ultra-premium heavyweight cotton with an authentic vintage wash. Features a high-visibility, clearly visible Nomad royal brand name and the majestic "Man & Mountain" peak logo screen-printed or precision-embroidered front and center. Built to make the iconic Nomad mountain identity stand out prominently on your travels.`,
    image: topsImages[i % topsImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(i % 3, 4 + (i % 3)),
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    reviews,
    isFeatured: i === 0 || i === 1 || i === 10 // Featured tops
  });
});

// 3. Generate Bottoms (20 Items)
bottomsNames.forEach((name, i) => {
  const index = i + 45;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 68 + (i * 3) + (i % 2 === 0 ? 4 : -3); // Realistic bottoms prices
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
    description: `Aesthetic pants inspired by the rugged trails of Pir Panjal and Kashmiri mountain ridges. Crafted with classical precision incorporating heavy selvedge denim, premium corduroy weaves, or organic canvas. Complete with our clearly visible, handcrafted genuine leather Nomad brand badge and mountain logo patch prominently stitched onto the back waistband.`,
    image: bottomsImages[i % bottomsImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: defaultColors.slice(1, 4 + (i % 3)),
    sizes: ['28', '30', '32', '34', '36'],
    reviews,
    isFeatured: i === 0 || i === 3 // Featured bottoms
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
    description: `Complete your vintage travel outfit with Nomad premium accessories inspired by the legendary Pashmina weavers and deep-snow winters of Kashmir. Each piece features our clearly visible "Man & Mountain" logo patch or high-visibility signature label, showcasing the Nomad name with exquisite contrast embroidery.`,
    image: accessoriesImages[i % accessoriesImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: accessoryColors.slice(0, 2 + (i % 3)),
    sizes: ['One Size'],
    reviews,
    isFeatured: i === 0 || i === 1 || i === 4
  });
});

// 5. Generate Footwear (15 Items)
footwearNames.forEach((name, i) => {
  const index = i + 85;
  const id = `nomad-${String(index + 1).padStart(3, '0')}`;
  const price = 75 + (i * 12) + (i % 3 === 0 ? 5 : -4); // Shoes and boots prices
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
    category: 'Footwear',
    description: `Handcrafted premium boots and sneakers inspired by the alpine paths of Sonamarg and Karakoram. Features our clearly visible, high-definition "Man & Mountain" logo badge stitched onto the woven tongue or stamped directly into the premium full-grain leather heel. Built to withstand rugged adventures while maintaining a timeless aesthetic.`,
    image: footwearImages[i % footwearImages.length],
    rating,
    reviewsCount: reviews.length,
    colors: shoeColors.slice(0, 1 + (i % 3)),
    sizes: ['7', '8', '9', '10', '11', '12'],
    reviews,
    isFeatured: i === 0 || i === 2 || i === 4
  });
});
