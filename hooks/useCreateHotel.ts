import { createHotel } from "@/app/api/createHotel";
import { useMutation } from "@tanstack/react-query";
import { Hotel, Room } from "@/types";

export const useCreateHotel = () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return useMutation({
    mutationFn: async ({ hotel, room }: { hotel: Hotel; room: Room }) => {
      await sleep(1200);
      return createHotel(hotel, room);
    },
  });
};
