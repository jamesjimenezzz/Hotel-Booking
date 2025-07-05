"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetHotelById } from "@/hooks/useCreateHotel";
import SpinnerGlobal from "@/components/SpinnerGlobal";
import Image from "next/image";
import hotelImage from "@/public/hotel-image.jpg";
import {
  Wifi,
  ParkingCircle,
  Utensils,
  Soup,
  Salad,
  Waves,
  Dumbbell,
  Bubbles,
  Martini,
  Bell,
  Shield,
  Fan,
  Plug,
  Car,
  Computer,
  Sofa,
  Bed,
  Umbrella,
  ChevronDownIcon,
} from "lucide-react";
import { Hotel, Room } from "@prisma/client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import BookingModal from "@/components/BookingModal";
import { useGetDisabledDates } from "@/hooks/useCreateHotel";
import RoomCard from "@/components/RoomCard";
const HotelDescription = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [open, setOpen] = React.useState(false);
  const [bookModal, setBookModal] = React.useState(false);
  const dateFrom = dateRange?.from?.toISOString();
  const dateTo = dateRange?.to?.toISOString();

  const dateFromDisplay = dateRange?.from?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateToDisplay = dateRange?.to?.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { hotelId } = useParams();
  const { data: hotel, isPending } = useGetHotelById(hotelId as string);
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

  const facilitiesLogo = {
    Adapter: <Plug className="w-4 h-4" />,
    "Air Conditioning": <Fan className="w-4 h-4" />,
    "Free Parking": <Car className="w-4 h-4" />,
    Desk: <Computer className="w-4 h-4" />,
    Sofa: <Sofa className="w-4 h-4" />,
    "Wake up service": <Bell className="w-4 h-4" />,
    Linens: <Bed className="w-4 h-4" />,
    Umbrella: <Umbrella className="w-4 h-4" />,
  };

  if (isPending) return <SpinnerGlobal />;

  return (
    <div className="max-w-5xl mt-10 flex flex-col gap-5 mx-auto">
      <div className="w-full">
        <Image
          className="w-full object-cover h-[300px]"
          src={hotelImage}
          alt="hotel-image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{hotel?.name}</h1>
            <p className="text-muted-foreground text-sm">Manila, Philippines</p>
          </div>
          <div>
            <p>Overall: 5.0 Ratings</p>
          </div>
        </div>
        <div>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </p>
        </div>
        <div className=" grid grid-cols-4">
          {hotel?.amenities.map((amenity: string) => (
            <div
              key={amenity}
              className="flex text-muted-foreground text-sm items-center gap-2"
            >
              <p>{amenitiesLogo[amenity as keyof typeof amenitiesLogo]}</p>
              <p>{amenity}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pb-10">
          <h1 className="font-bold text-3xl">Rooms</h1>
          {hotel.rooms.map((room: Room) => (
            <RoomCard key={room.id} room={room} hotel={hotel as Hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDescription;
