import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain) {
  throw new Error("SHOPIFY_STORE_DOMAIN is missing in .env.local");
}

if (!publicAccessToken) {
  throw new Error(
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing in .env.local"
  );
}

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${storeDomain}`,
  apiVersion: "2026-04",
  publicAccessToken,
});