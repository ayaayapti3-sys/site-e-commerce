import { getSacs } from "@/lib/shopify/products";
import SacsClient from "./sacs-client";

export default async function SacsPage() {
  const products = await getSacs();

  return <SacsClient products={products} />;
}