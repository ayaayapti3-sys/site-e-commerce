import { shopifyClient } from "./client";
import { transformShopifyProducts } from "./transform-product";

const PRODUCTS_QUERY = `#graphql
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        availableForSale

        images(first: 5) {
          nodes {
            url
            altText
            width
            height
          }
        }

        variants(first: 10) {
          nodes {
            id
            title
            availableForSale

            price {
              amount
              currencyCode
            }
            
            compareAtPrice {
  amount
  currencyCode
}
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 100) {
  const { data, errors } = await shopifyClient.request(
    PRODUCTS_QUERY,
    {
      variables: {
        first,
      },
    }
  );

  if (errors) {
    console.error(
      "Shopify products errors:",
      JSON.stringify(errors, null, 2)
    );

    throw new Error(
      "Impossible de récupérer les produits Shopify."
    );
  }

  const shopifyProducts = data?.products?.nodes ?? [];

  return transformShopifyProducts(shopifyProducts);
}

// export async function getNouveautes() {
//   const products = await getProducts();

//   return products.filter((product) => product.isNew);
// }

export async function getAllProducts() {
  const products = await getProducts();

  return products;
}



export async function getSacs() {
  const products = await getProducts();

   console.log(products);
  return products.filter(
    (product) =>
      product.category === "Sacs" ||
      product.category === "Sacs en cuir"
  );
}

export async function getSandales() {
  const products = await getProducts();

  return products.filter(
    (product) => product.category === "Sandales"
  );
}

export async function getBottes() {
  const products = await getProducts();

  return products.filter(
    (product) => product.category === "Bottes"
  );
}

export async function getBestSellers() {
  const products = await getProducts();

  return products.filter((product) =>
    product.tags?.some(
      (tag) => tag.toLowerCase().trim() === "best seller"
    )
  );
}

export async function getProductByHandle(handle) {
  const products = await getProducts();

  return (
    products.find((product) => product.slug === handle) ??
    null
  );
}