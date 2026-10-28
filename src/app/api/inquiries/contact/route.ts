import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully.",
        data: {
          id: `msg-${Date.now()}`,
          ...validated,
          createdAt: new Date().toISOString(),
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
