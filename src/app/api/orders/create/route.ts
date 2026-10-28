import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  orderNumber: z.string(),
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  items: z.array(
    z.object({
      product: z.object({
        id: z.string(),
        title: z.string(),
      }),
      variant: z.object({
        id: z.string(),
        size: z.string(),
        color: z.string(),
      }),
      quantity: z.number().min(1),
    })
  ),
  currency: z.enum(["NGN", "USD"]),
  total: z.number().positive(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = orderSchema.parse(body);

    // In a live Paystack integration:
    // Generate Paystack authorization URL via https://api.paystack.co/transaction/initialize

    return NextResponse.json(
      {
        success: true,
        message: "Order initiated successfully in simulated mode.",
        data: {
          orderNumber: validated.orderNumber,
          reference: `PSTK-${Date.now()}`,
          authorizationUrl: null, // Simulated
          total: validated.total,
          currency: validated.currency,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
