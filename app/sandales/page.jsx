import { getSandales } from "@/lib/shopify/products";
import SandalesClient from "./sandales-client";

export default async function SandalesPage() {
  const products = await getSandales();

  return <SandalesClient products={products} />;
}