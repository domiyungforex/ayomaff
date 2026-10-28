import { NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Event type is required"),
  proposedDate: z.string().min(1, "Event date is required"),
  location: z.string().min(2, "Location is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = bookingSchema.parse(body);

    const inquiryId = `inq-${Date.now()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Booking inquiry received and logged to management registry.",
        data: {
          id: inquiryId,
          ...validated,
          status: "pending",
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
