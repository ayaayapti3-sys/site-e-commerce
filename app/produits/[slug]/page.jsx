import { notFound } from "next/navigation";

import Header from "@/components/header/header";
import ProductView from "@/components/product/product-view";
import { products } from "@/data/products";

export default async function ProduitPage({ params }) {
  const { slug } = await params;
  
  const product = products.find(
    (item) =>
      item.slug === slug ||
      item.href === `/produits/${slug}`
  );
console.log(product)
  if (!product) {
    notFound();
  }

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