import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Payment reference is required" },
        { status: 400 }
      );
    }

    // In a live Paystack integration:
    // Call https://api.paystack.co/transaction/verify/{reference} with Bearer PAYSTACK_SECRET_KEY

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified.",
      data: {
        reference,
        status: "success",
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
