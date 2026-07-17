import { getBottes } from "@/lib/shopify/products";
import BottesClient from "./bottes-client";

export default async function BottesPage() {
  const products = await getBottes();

  return <BottesClient products={products} />;
}