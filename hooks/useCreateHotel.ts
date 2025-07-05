import {
  createHotel,
  getHotels,
  getHotelById,
  createBooking,
  getDisabledDates,
} from "@/app/api/createHotel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HotelData, RoomData } from "@/store/formStore";
import { BookingData } from "@/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: async ({
      hotel,
      room,
    }: {
      hotel: HotelData;
      room: RoomData;
    }) => {
      await sleep(1200);
      return createHotel(hotel, room);
    },
  });
};

export const useGetHotels = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["hotels", page, limit],
    queryFn: () => getHotels(page, limit),
  });
};

export const useGetHotelById = (hotelId: string) => {
  return useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => getHotelById(hotelId),
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (booking: BookingData) => {
      await sleep(1200);
      return createBooking(booking);
    },
  });
};

export const useGetDisabledDates = (roomId: string) => {
  return useQuery({
    queryKey: ["disabled-dates", roomId],
    queryFn: () => getDisabledDates(roomId),
    enabled: !!roomId,
  });
};
