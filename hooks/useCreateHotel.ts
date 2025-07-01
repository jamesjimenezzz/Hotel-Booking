import { createHotel, getHotels } from "@/app/api/createHotel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HotelData, RoomData } from "@/store/formStore";

export const useCreateHotel = () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
