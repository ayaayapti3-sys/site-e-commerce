import { getAllProducts } from "@/lib/shopify/products";
import NouveautesClient from "./nouveautes-client";

export default async function BoutiquePage() {
  const products = await getAllProducts();

  return <NouveautesClient products={products} />;
}