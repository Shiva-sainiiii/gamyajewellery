# Gamya Jewellery – demo storefront (Tanishq-style)

Next.js 14 (App Router), no extra dependencies.

    npm install
    npm run dev        # http://localhost:3000

## What works (all client-side, saved in the browser's localStorage)
- Animated hero carousel, scroll-reveal sections, mega-menu, live search suggestions
- 692 products from `data/catalog.csv` → `lib/products.json` (`npm run data` rebuilds it)
- Shop filters (category, metal, colour, price, occasion, gemstone), sort, infinite scroll
- Product page: hover zoom, metal-colour variants, size picker, price breakup, pincode check, video-call booking
- Bag drawer, wishlist, coupons (WELCOME5, GAMYA10), test payment, order tracking (/track)
- /admin: change gold/silver/platinum rate (every price updates), move orders through Placed → Delivered

## Photos
Images load from the dataset's image paths (`lib/images.js`). If they fail, a gold line-art placeholder shows.
To self-host: copy the images to `public/catalog/…` (same sub-folders) and set `NEXT_PUBLIC_IMG_BASE=/catalog` in `.env.local`.

## Before showing a real client
Product names/collections, weights and making charges are generated demo values (see `scripts/build-data.py`).
Replace WhatsApp number in `lib/data.js`, showroom addresses in `app/stores/page.js`.
