/**
 * Единственият източник на истината за адреса на сайта.
 * Fallback-ът е ПРОДУКЦИОННИЯТ адрес, не localhost: build без env иначе
 * шипваше http://localhost:3000 в canonical, og:image, sitemap и robots
 * (тих деиндексиращ дефект, одитна находка). При местене на aurelisbeauty.eu:
 * една смяна на NEXT_PUBLIC_SITE_URL във Vercel.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurelis-beauty.vercel.app"
).trim();
