import { NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify/products";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Shopify request failed",
      },
      { status: 500 }
    );
  }
}