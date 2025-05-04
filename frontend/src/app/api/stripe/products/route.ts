import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function GET() {
  try {
    // Fetch prices and expand product data
    const prices = await stripe.prices.list({
      expand: ["data.product"],
    });

    // Transform into a structured product list
    const products: any[] = [];

    prices.data.forEach((price) => {
      const product = price.product as Stripe.Product;
      delete (price as any).product;

      if (product.active) {
        const existingProduct = products.find((p) => p.id === product.id);
        if (existingProduct) {
          existingProduct.prices.push(price);
        } else {
          products.push({ ...product, prices: [price] });
        }
      }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
