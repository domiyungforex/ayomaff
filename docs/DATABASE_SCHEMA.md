# Database Schema & Data Models

## 1. Schema Overview

The database is built on PostgreSQL (Supabase-compatible) with Row Level Security (RLS) enabled on all tables. 

Public visitors have read-only access to published content (`is_published = true`), while administrative operations require authenticated roles (`admin`, `editor`). In addition, write actions for public users are strictly constrained to insert-only on inquiries and newsletter signups.

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   releases   │1     *│    tracks    │       │    videos    │
│──────────────│───────│──────────────│       │──────────────│
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ slug (UQ)    │       │ release_id   │       │ slug (UQ)    │
│ title        │       │ title        │       │ youtube_id   │
│ release_type │       │ duration_sec │       │ title        │
│ cover_image  │       │ audio_url    │       │ featured     │
│ release_date │       │ streaming_url│       └──────────────┘
└──────────────┘       └──────────────┘
       │
       │
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    events    │       │gallery_images│       │   products   │1    *┌──────────────┐
│──────────────│       │──────────────│       │──────────────│──────│ variants     │
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │      │──────────────│
│ title        │       │ image_url    │       │ title        │      │ id (PK)      │
│ venue        │       │ caption      │       │ price_ngn    │      │ product_id   │
│ city, country│       │ category     │       │ price_usd    │      │ size, color  │
│ event_date   │       │ sort_order   │       │ stock_status │      │ stock_qty    │
│ ticket_url   │       └──────────────┘       └──────────────┘      └──────────────┘
└──────────────┘
       │
┌──────────────────────┐       ┌──────────────────────┐
│  booking_inquiries   │       │     subscribers      │
│──────────────────────│       │──────────────────────│
│ id (PK)              │       │ id (PK)              │
│ client_name, email   │       │ email (UQ)           │
│ event_type, budget   │       │ preferences (JSONB)  │
│ status (pending/etc) │       │ status (active/unsub)│
└──────────────────────┘       └──────────────────────┘
```

## 2. Table Definitions

### `releases`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `slug`: TEXT UNIQUE NOT NULL
- `title`: TEXT NOT NULL
- `release_type`: TEXT NOT NULL CHECK (release_type IN ('album', 'ep', 'single'))
- `cover_image`: TEXT NOT NULL
- `release_date`: DATE NOT NULL
- `description`: TEXT
- `is_featured`: BOOLEAN DEFAULT false
- `is_published`: BOOLEAN DEFAULT true
- `spotify_url`: TEXT
- `apple_music_url`: TEXT
- `audiomack_url`: TEXT
- `youtube_url`: TEXT
- `created_at`: TIMESTAMPTZ DEFAULT now()
- `updated_at`: TIMESTAMPTZ DEFAULT now()

### `tracks`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `release_id`: UUID REFERENCES releases(id) ON DELETE CASCADE
- `title`: TEXT NOT NULL
- `track_number`: INTEGER NOT NULL
- `duration_seconds`: INTEGER NOT NULL
- `audio_preview_url`: TEXT
- `lyrics`: TEXT
- `featuring_artists`: TEXT[]
- `is_highlight`: BOOLEAN DEFAULT false

### `videos`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `slug`: TEXT UNIQUE NOT NULL
- `title`: TEXT NOT NULL
- `youtube_id`: TEXT NOT NULL
- `thumbnail_url`: TEXT NOT NULL
- `category`: TEXT NOT NULL CHECK (category IN ('music_video', 'live', 'visualizer', 'documentary'))
- `release_date`: DATE NOT NULL
- `is_featured`: BOOLEAN DEFAULT false
- `views_count`: INTEGER DEFAULT 0

### `events` (Concerts / Tour Dates)
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `title`: TEXT NOT NULL
- `venue`: TEXT NOT NULL
- `city`: TEXT NOT NULL
- `country`: TEXT NOT NULL
- `event_date`: TIMESTAMPTZ NOT NULL
- `ticket_provider`: TEXT
- `ticket_url`: TEXT
- `is_sold_out`: BOOLEAN DEFAULT false
- `status`: TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'postponed', 'cancelled'))

### `gallery_images`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `image_url`: TEXT NOT NULL
- `caption`: TEXT
- `category`: TEXT NOT NULL CHECK (category IN ('editorial', 'live', 'studio', 'lifestyle'))
- `aspect_ratio`: TEXT DEFAULT '1:1'
- `sort_order`: INTEGER DEFAULT 0

### `products` & `product_variants`
- `products`: `id`, `slug`, `title`, `description`, `price_ngn`, `price_usd`, `main_image`, `gallery_images`, `is_available`
- `product_variants`: `id`, `product_id`, `size`, `color`, `sku`, `stock_count`

### `orders` & `order_items`
- `orders`: `id`, `order_number`, `customer_name`, `customer_email`, `total_amount`, `currency`, `payment_status`, `payment_reference`, `shipping_address`, `created_at`
- `order_items`: `id`, `order_id`, `product_id`, `variant_id`, `quantity`, `unit_price`

### `subscribers` (Fan Club)
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `email`: TEXT UNIQUE NOT NULL
- `full_name`: TEXT
- `interests`: JSONB DEFAULT '{"music": true, "tour": true, "merch": true}'::jsonb
- `status`: TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
- `subscribed_at`: TIMESTAMPTZ DEFAULT now()

### `booking_inquiries` & `contact_inquiries`
- `booking_inquiries`: `id`, `contact_name`, `organization`, `email`, `phone`, `event_type`, `proposed_date`, `location`, `budget_range`, `message`, `status`, `internal_notes`, `created_at`
- `contact_inquiries`: `id`, `name`, `email`, `subject`, `message`, `status`, `created_at`

### `audit_logs`
- `id`: UUID PRIMARY KEY DEFAULT gen_random_uuid()
- `admin_email`: TEXT NOT NULL
- `action`: TEXT NOT NULL
- `entity_type`: TEXT NOT NULL
- `entity_id`: TEXT
- `details`: JSONB
- `timestamp`: TIMESTAMPTZ DEFAULT now()
