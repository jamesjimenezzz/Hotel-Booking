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
    const { hotel, room } = await req.json();
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
        name: hotel.name,
        description: hotel.description,
        amenities: hotel.amenities,
        country: hotel.country,
        state: hotel.state,
        city: hotel.city,
        images: images,
        userId: userId,
        rooms: {
          create: {
            name: room.name,
            facilities: room.facilities,
            pictures: room.images,
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

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  try {
    const total = await prisma.hotel.count();
    const hotels = await prisma.hotel.findMany({
      skip,
      take: limit,
      include: {
        rooms: true,
      },
    });
    return NextResponse.json({
      data: hotels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error details:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
