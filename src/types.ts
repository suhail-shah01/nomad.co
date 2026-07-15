export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Outerwear' | 'Tops' | 'Bottoms' | 'Footwear' | 'Accessories';
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  reviews: Review[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
  };
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
