-- =============================================================================
-- Migration: 20261028000001_initial_schema.sql
-- Description: Core tables, constraints, indexes, and RLS policies for Ayo Maff
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. RELEASES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.releases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    release_type TEXT NOT NULL CHECK (release_type IN ('album', 'ep', 'single')),
    cover_image TEXT NOT NULL,
    release_date DATE NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    spotify_url TEXT,
    apple_music_url TEXT,
    audiomack_url TEXT,
    youtube_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 2. TRACKS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    release_id UUID NOT NULL REFERENCES public.releases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    track_number INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL,
    audio_preview_url TEXT,
    lyrics TEXT,
    featuring_artists TEXT[] DEFAULT '{}',
    is_highlight BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 3. VIDEOS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('music_video', 'live', 'visualizer', 'documentary')),
    release_date DATE NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 4. EVENTS / TOUR DATES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    venue TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    event_date TIMESTAMPTZ NOT NULL,
    ticket_provider TEXT,
    ticket_url TEXT,
    is_sold_out BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'postponed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 5. GALLERY IMAGES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL CHECK (category IN ('editorial', 'live', 'studio', 'lifestyle')),
    aspect_ratio TEXT DEFAULT '1:1',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 6. MERCHANDISE PRODUCTS & VARIANTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price_ngn NUMERIC(12, 2) NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    main_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    sku TEXT UNIQUE,
    stock_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 7. ORDERS & ORDER ITEMS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL CHECK (currency IN ('NGN', 'USD')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    payment_reference TEXT UNIQUE,
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    variant_id UUID REFERENCES public.product_variants(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 8. SUBSCRIBERS (FAN CLUB)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    interests JSONB DEFAULT '{"music": true, "tour": true, "merch": true}'::jsonb,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 9. INQUIRIES (BOOKING & CONTACT)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.booking_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    event_type TEXT NOT NULL,
    proposed_date DATE NOT NULL,
    location TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'declined')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 10. AUDIT LOGS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_releases_published ON public.releases (is_published, release_date DESC);
CREATE INDEX IF NOT EXISTS idx_tracks_release ON public.tracks (release_id, track_number ASC);
CREATE INDEX IF NOT EXISTS idx_videos_category ON public.videos (category, release_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events (event_date ASC);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (payment_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_inquiries_status ON public.booking_inquiries (status, created_at DESC);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can view published releases, tracks, videos, events, gallery, products
CREATE POLICY "Public can view published releases" ON public.releases FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can view available products" ON public.products FOR SELECT USING (is_available = true);
CREATE POLICY "Public can view product variants" ON public.product_variants FOR SELECT USING (true);

-- Public can insert new inquiries and subscriptions
CREATE POLICY "Public can subscribe to newsletter" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit booking inquiries" ON public.booking_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
