export type ReleaseType = 'album' | 'ep' | 'single';

export interface Track {
  id: string;
  releaseId: string;
  title: string;
  trackNumber: number;
  durationSeconds: number;
  audioPreviewUrl: string;
  lyrics?: string;
  featuringArtists?: string[];
  isHighlight?: boolean;
}

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  audiomack?: string;
  youtube?: string;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  releaseType: ReleaseType;
  coverImage: string;
  releaseDate: string;
  year: number;
  description: string;
  isFeatured?: boolean;
  streamingLinks: StreamingLinks;
  tracks: Track[];
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  category: 'music_video' | 'live' | 'visualizer' | 'documentary';
  duration: string;
  releaseDate: string;
  isFeatured?: boolean;
  viewsCount?: string;
  description?: string;
}

export interface ConcertEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: string;
  date: string;
  day: string;
  month: string;
  ticketProvider: string;
  ticketUrl: string;
  isSoldOut: boolean;
  status: 'confirmed' | 'postponed' | 'cancelled';
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string;
  category: 'editorial' | 'live' | 'studio' | 'lifestyle';
  aspectRatio?: '1:1' | '16:9' | '4:5' | '2:3';
  location?: string;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  stockCount: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceNgn: number;
  priceUsd: number;
  mainImage: string;
  galleryImages: string[];
  isAvailable: boolean;
  category: 'apparel' | 'headwear' | 'accessories';
  variants: ProductVariant[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface BookingInquiry {
  id?: string;
  contactName: string;
  organization?: string;
  email: string;
  phone?: string;
  eventType: string;
  proposedDate: string;
  location: string;
  budgetRange: string;
  message: string;
  status?: 'pending' | 'contacted' | 'confirmed' | 'declined';
  createdAt?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read' | 'archived';
  createdAt?: string;
}

export interface FanSubscriber {
  id?: string;
  email: string;
  fullName?: string;
  interests?: {
    music?: boolean;
    tour?: boolean;
    merch?: boolean;
  };
  status?: 'active' | 'unsubscribed';
  subscribedAt?: string;
}
