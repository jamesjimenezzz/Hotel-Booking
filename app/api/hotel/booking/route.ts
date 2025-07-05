import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const {
    roomId,
    hotelId,
    roomName,
    hotelName,
    checkInDate,
    checkOutDate,
    roomPrice,
    fullName,
    email,
    phone,
    numberOfGuests,
  } = await req.json();

  try {
    // Convert date strings to DateTime objects
    // Set time to 00:00:00 for check-in and 23:59:59 for check-out
    const checkInDateTime = new Date(checkInDate + "T00:00:00");
    const checkOutDateTime = new Date(checkOutDate + "T23:59:59");

    const booking = await prisma.booking.create({
      data: {
        userId: userId,
        userName: fullName,
        email: email,
        phone: phone,
        numberOfGuests: numberOfGuests,
        hotelId: hotelId,
        roomId: roomId,
        roomName: roomName,
        checkIn: checkInDateTime,
        checkOut: checkOutDateTime,
        totalPrice: roomPrice,
        hotelName: hotelName,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
