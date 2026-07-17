import { NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify/client";

const CREATE_CART_MUTATION = `#graphql
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }

      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const cartItems = Array.isArray(body.cartItems)
      ? body.cartItems
      : [];

    if (cartItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Le panier est vide.",
        },
        { status: 400 }
      );
    }

    const lines = cartItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: Number(item.quantity || 1),
    }));

    const hasMissingVariant = lines.some(
      (line) => !line.merchandiseId
    );

    if (hasMissingVariant) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Un produit du panier ne possède pas de variantId Shopify.",
        },
        { status: 400 }
      );
    }

    const { data, errors } = await shopifyClient.request(
      CREATE_CART_MUTATION,
      {
        variables: {
          input: {
            lines,
          },
        },
      }
    );

    if (errors) {
      console.error(
        "Shopify cart errors:",
        JSON.stringify(errors, null, 2)
      );

      return NextResponse.json(
        {
          success: false,
          message: "Impossible de créer le panier Shopify.",
        },
        { status: 500 }
      );
    }

    const userErrors =
      data?.cartCreate?.userErrors ?? [];

    if (userErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: userErrors
            .map((error) => error.message)
            .join(", "),
        },
        { status: 400 }
      );
    }

    const cart = data?.cartCreate?.cart;

    if (!cart?.checkoutUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Checkout Shopify introuvable.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
    });
  } catch (error) {
    console.error("Create Shopify cart error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de la création du panier.",
      },
      { status: 500 }
    );
  }
}