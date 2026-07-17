import { getNouveautes } from "@/lib/shopify/products";
import NouveautesClient from "./nouveautes-client";
import styles from "./nouveautes.module.css";

export default async function NouveautesPage() {
  const products = await getNouveautes();

  return <NouveautesClient products={products} />;
}