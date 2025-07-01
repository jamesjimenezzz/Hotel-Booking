"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Dumbbell,
  ParkingCircle,
  Utensils,
  Soup,
  Salad,
  Waves,
  Bubbles,
  Bell,
  Martini,
  Shield,
  Wifi,
} from "lucide-react";
import { WavesLadder } from "lucide-react";
import { useEffect } from "react";
import { useGetHotels } from "@/hooks/useCreateHotel";
import { Hotel, Room } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import SpinnerGlobal from "@/components/SpinnerGlobal";
export default function Page() {
  useEffect(() => {
    fetch("/api/sync-user");
  }, []);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = 5;
  const { data: hotels, isPending } = useGetHotels(page, limit);
  const allPages = hotels?.pagination.totalPages;
  const amenitiesLogo = {
    "Free Wifi": <Wifi className="w-4 h-4" />,
    "Free Parking": <ParkingCircle className="w-4 h-4" />,
    "Free Breakfast": <Utensils className="w-4 h-4" />,
    "Free Dinner": <Soup className="w-4 h-4" />,
    "Free Lunch": <Salad className="w-4 h-4" />,
    "Swimming Pool": <Waves className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
    Spa: <Bubbles className="w-4 h-4" />,
    Bar: <Martini className="w-4 h-4" />,
    Restaurant: <Utensils className="w-4 h-4" />,
    "Room Service": <Bell className="w-4 h-4" />,
    "24/7 Security": <Shield className="w-4 h-4" />,
  };

  if (isPending) {
    return <SpinnerGlobal />;
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <h1 className="text-4xl font-semibold text-center">BOOK YOUR HOTEL</h1>
      {hotels?.data.map((hotel: Hotel & { rooms: Room[] }) => (
        <Card
          className="w-full p-0  outline-1  overflow-hidden my-8"
          key={hotel.id}
        >
          <div className="flex overflow-hidden ">
            <div className="flex-shrink-0 w-80 relative overflow-hidden ">
              <Image
                className="object-cover rounded-none w-full h-full"
                src={"/hotel-image.jpg"}
                alt="hotel"
                fill
              />

              <Button variant={"outline"} className="absolute top-1 right-2">
                <Heart className="w-4 h-4" />
              </Button>
              <Badge
                variant={"secondary"}
                className="absolute  bg-blue-500 text-white top-2 left-2"
              >
                Featured Hotel
              </Badge>
            </div>
            <div className="flex-1 py-5">
              <CardContent className="flex flex-col gap-8">
                <div>
                  <h1 className="text-xl font-semibold">{hotel.name}</h1>
                  <p className="text-muted-foreground text-sm">
                    Makati City, Metro Manila
                  </p>
                </div>
                <div className="grid grid-cols-3 ">
                  {hotel.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center gap-2">
                      {amenitiesLogo[amenity as keyof typeof amenitiesLogo]}
                      <p className="text-xs text-muted-foreground">{amenity}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  <p className="text-muted-foreground">Rooms Starting From</p>
                  <h1 className="text-xl font-semibold text-green-600">
                    ₱
                    {hotel.rooms.reduce((min: number, room: Room) => {
                      return Math.min(min, Number(room.price));
                    }, Infinity)}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Link className="flex-1" href={`/hotel-rooms/${hotel.id}`}>
                    <Button className="flex-1 w-full cursor-pointer text-xs">
                      View Room and Rates
                    </Button>
                  </Link>
                  <Link
                    className=" cursor-pointer text-xs flex-1"
                    href={`/hotel-description/${hotel.id}`}
                  >
                    <Button
                      className="w-full text-xs cursor-pointer "
                      variant="outline"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
      <Pagination className="flex justify-center">
        <PaginationContent>
          {page > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious href={`/?page=${page - 1}`} />
              </PaginationItem>
            </>
          )}
          {Array.from({ length: allPages }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                isActive={page === index + 1}
                href={`/?page=${index + 1}`}
                className={`${page === index + 1} ? `}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page > 1 && page < allPages && (
            <>
              <PaginationItem>
                <PaginationNext href={`/?page=${page + 1}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
