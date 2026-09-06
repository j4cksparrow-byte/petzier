export interface Spec {
  label: string;
  value: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  petName?: string;
  petType?: string;
}

export interface Problem {
  title: string;
  description: string;
}

export interface Material {
  name: string;
  description: string;
}

export interface BoxItem {
  name: string;
  qty: string;
}

export interface Product {
  /** WooCommerce product ID. Only set for products fetched live from WooCommerce. */
  wooId?: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  heroImage: string;
  /** All product photos, in display order. Falls back to a single-item array of `image` when a product has only one photo. */
  images: string[];
  badge?: string;
  dispatchNote: string;
  problems: Problem[];
  materials: Material[];
  boxItems: BoxItem[];
  specs: Spec[];
  reviews: Review[];
  editorialHeadline: string;
  editorialBody: string;
}
