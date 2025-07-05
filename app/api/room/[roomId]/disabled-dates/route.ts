import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Helper function to format date as YYYY-MM-DD without timezone issues
const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  const { roomId } = params;
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const bookings = await prisma?.booking.findMany({
    where: {
      roomId: roomId,
    },
    select: {
      checkIn: true,
      checkOut: true,
    },
  });

  const disabledDates: string[] = [];

  bookings?.forEach((booking) => {
    const date = new Date(booking.checkIn);

    while (date <= booking.checkOut) {
      disabledDates.push(formatDateToISO(date));
      date.setDate(date.getDate() + 1);
    }
  });

  return NextResponse.json(disabledDates);
}
