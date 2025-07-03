import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { hotelId: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { hotelId } = await params;

  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
      include: {
        rooms: true,
      },
    });

    if (!hotel) {
      return new Response("Hotel not found", { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("Error details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
