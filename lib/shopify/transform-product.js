const COLOR_HEX = {
  Noir: "#211c19",
  Cognac: "#a96337",
  Bordeaux: "#7f1524",
  Marron: "#684634",
  "Marron foncé": "#3f2d25",
  Beige: "#dfcbb7",
};

const BADGE_TAGS = [
  "Nouveau",
  "Exclusivité",
  "Édition limitée",
  "Best Seller",
];

const CATEGORY_TAGS = [
  "Sacs",
  "Sacs en cuir",
  "Sandales",
  "Bottes",
];

const COLOR_TAGS = [
  "Noir",
  "Cognac",
  "Bordeaux",
  "Marron",
  "Marron foncé",
  "Beige",
];

function findTag(tags, allowedTags) {
  return (
    allowedTags.find((allowedTag) =>
      tags.some(
        (tag) =>
          tag.toLowerCase().trim() ===
          allowedTag.toLowerCase().trim()
      )
    ) ?? null
  );
}


export function transformShopifyProduct(product) {
  const tags = product.tags ?? [];
  const images = product.images?.nodes ?? [];
  const firstVariant = product.variants?.nodes?.[0];

  const mainImage = images[0]?.url ?? "/images/placeholder.png";
  const hoverImage = images[1]?.url ?? mainImage;
  const color = findTag(tags, COLOR_TAGS) ?? "";

  return {
    id: product.id,
    slug: product.handle,
    name: product.title,
    category: findTag(tags, CATEGORY_TAGS) ?? "Autres",
    type: product.productType || "",
    style: product.productType || "",
    color,
    tags,
    price: Number(firstVariant?.price?.amount ?? 0),
    currencyCode: firstVariant?.price?.currencyCode ?? "MAD",
    description: product.description || "",

images: images.map((image) => image.url),
    image: mainImage,
    hoverImage,
    href: `/produits/${product.handle}`,
    badge: findTag(tags, BADGE_TAGS),
    isNew: tags.includes("Nouveau"),
    availableForSale: product.availableForSale,
    variantId: firstVariant?.id ?? null,
    oldPrice: firstVariant?.compareAtPrice?.amount
  ? Number(firstVariant.compareAtPrice.amount)
  : null,

badgeType: tags.includes("Best Seller")
  ? "bestseller"
  : tags.includes("Édition limitée")
    ? "sale"
    : "new",

colors: color && COLOR_HEX[color]
  ? [COLOR_HEX[color]]
  : [],
  };
  
}

export function transformShopifyProducts(products) {
  return products.map(transformShopifyProduct);
}