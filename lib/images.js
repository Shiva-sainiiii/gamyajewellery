// Product photos come from the dataset's image paths (data/catalog.csv, column "image").
// By default they are loaded from the host below. To use your own copy instead, download the
// images into /public/catalog/ keeping the same sub-folders and set  NEXT_PUBLIC_IMG_BASE=/catalog
// (in .env.local). If an image cannot load, a gold line-art placeholder is shown automatically.
export const IMG_BASE = process.env.NEXT_PUBLIC_IMG_BASE ?? 'https://www.cartier.com';
export const imgUrl = (p) => (p && p.img ? IMG_BASE + p.img : '');
