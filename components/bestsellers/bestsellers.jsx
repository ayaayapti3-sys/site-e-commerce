import { getBestSellers } from "@/lib/shopify/products";
import BestsellersClient from "./bestsellers-client";

export default async function Bestsellers() {
  const products = await getBestSellers();

  return <BestsellersClient products={products} />;
}