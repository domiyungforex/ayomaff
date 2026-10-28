# Admin CMS Dashboard Specification

## 1. Overview & Security Architecture

The administrative portal (`/admin`) provides full content and operational management for Ayo Maff's team. It is guarded by server-side authentication and role-based authorization (RBAC).

Only authenticated users with the `admin` or `editor` role can access `/admin/*` routes or invoke administrative server actions.

```
                  ┌──────────────────────┐
                  │   /admin (Request)   │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Server Auth Guard    │
                  │ Check Session Token  │
                  └──────────┬───────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
        [Authorized]                 [Unauthorized]
              │                             │
              ▼                             ▼
    Render CMS Dashboard            Redirect to /admin/login
```

## 2. Admin Modules

### 2.1 Overview & Analytics (`/admin`)
- Real-time KPIs: Total Releases, Official Videos, Upcoming Shows, Active Fan Club Subscribers, Unread Inquiries, Pending Orders.
- Recent Activity Feed: Log of recent submissions and content updates.
- Fast Action Buttons: New Release, Add Tour Date, Export Subscribers CSV.

### 2.2 Discography Management (`/admin/music`)
- Table view of all releases (Albums, EPs, Singles) with publication status badge.
- Modal editor to add or edit release metadata (Title, Type, Cover Image URL, Release Date, Streaming Links).
- Tracklist editor to sequence tracks, audio preview URLs, and lyrics.

### 2.3 Official Video Management (`/admin/videos`)
- Add and reorder official YouTube videos.
- Toggle featured hero video for `/videos`.

### 2.4 Tour Management (`/admin/tour`)
- Create upcoming tour dates (Venue, City, Country, Date, Ticket URL).
- Mark shows as "Sold Out" or "Postponed".

### 2.5 Visual Gallery Management (`/admin/gallery`)
- Upload and tag high-resolution photographs into categories (`editorial`, `live`, `studio`, `lifestyle`).
- Edit captions and set display order.

### 2.6 Merch & Inventory (`/admin/merch`)
- Product catalog, prices in NGN and USD, inventory counts per size/color variant.
- Review orders and update fulfillment status (`pending`, `paid`, `shipped`, `delivered`).

### 2.7 Inquiries Inbox (`/admin/inquiries`)
- Tabbed view: Booking Requests and General Contact Inquiries.
- Detail drawer with client contact, event budget, date, and internal notes.
- Status workflow: `Pending` -> `Contacted` -> `Confirmed` -> `Declined`.

### 2.8 Fan Club Subscribers (`/admin/subscribers`)
- Searchable list of fan email subscribers.
- One-click CSV export for external newsletter campaigns (Mailchimp / Resend / Brevo).

### 2.9 Settings & Audit Log (`/admin/settings`)
- Artist profile configuration, social links, SEO defaults.
- Immutable audit log of administrative actions.
