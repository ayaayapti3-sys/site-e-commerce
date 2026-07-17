import { notFound } from "next/navigation";

import Header from "@/components/header/header";
import ProductView from "@/components/product/product-view";
import {
  getProductByHandle,
  getProducts,
} from "@/lib/shopify/products";

export default async function ProduitPage({ params }) {
  const { slug } = await params;

  const product = await getProductByHandle(slug);

  if (!product) {
    notFound();
  }

  const products = await getProducts();

  const relatedProducts = products
    .filter(
      (item) =>
        item.href !== product.href &&
        item.category === product.category
    )
    .slice(0, 3);

  return (
    <>
      <Header />

      <ProductView
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}