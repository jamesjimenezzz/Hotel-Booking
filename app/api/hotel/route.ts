import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  console.log("userId:", userId);

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("User ensured in database");

    const { hotel, room } = await req.json();
    console.log("hotel data:", hotel);
    console.log("room data:", room);
    console.log("hotel.images:", hotel.images);

    // Ensure images is an array of strings
    let images = [];
    if (Array.isArray(hotel.images)) {
      images = hotel.images
        .map((img: any) => (typeof img === "string" ? img : img.url || ""))
        .filter(Boolean);
    } else if (typeof hotel.images === "string") {
      images = [hotel.images];
    }

    const createdHotel = await prisma.hotel.create({
      data: {
        name: hotel.title,
        description: hotel.description,
        amenities: hotel.amenities,
        images: images,
        userId: userId,
        rooms: {
          create: {
            name: room.title,
            facilities: room.facilities,
            pictures: room.pictures,
            persons: room.persons,
            price: room.price,
          },
        },
      },
    });

    console.log("Hotel created:", createdHotel);
    return NextResponse.json(createdHotel);
  } catch (error) {
    console.error("Error details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
