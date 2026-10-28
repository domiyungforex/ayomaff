import { NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email format"),
  fullName: z.string().optional(),
  interests: z.record(z.boolean()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = subscribeSchema.parse(body);

    // In a live Supabase environment, this writes to the subscribers table:
    // await supabase.from('subscribers').insert(...)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the Maffian Empire fan club.",
      data: {
        email: validated.email,
        subscribedAt: new Date().toISOString(),
      },
    });
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
