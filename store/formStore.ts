import { create } from "zustand";

interface HotelData {
  title: string;
  description: string;
  amenities: string[];
  images: File[];
}

interface RoomData {
  title: string;
  facilities: string[];
  persons: string;
  images: File[];
  price: string;
}

interface formStore {
  hotel: HotelData;
  room: RoomData;
  setHotel: (hotel: HotelData) => void;
  setRoom: (room: RoomData) => void;
  reset: () => void;
}

export const useFormStore = create<formStore>((set) => ({
  hotel: {
    title: "",
    description: "",
    amenities: [],
    images: [],
  },
  room: {
    title: "",
    facilities: [],
    persons: "",
    images: [],
    price: "",
  },
  setHotel: (data) => set((state) => ({ hotel: { ...state.hotel, ...data } })),
  setRoom: (data) => set((state) => ({ room: { ...state.room, ...data } })),
  reset: () =>
    set({
      hotel: {
        title: "",
        description: "",
        amenities: [],
        images: [],
      },
      room: {
        title: "",
        facilities: [],
        persons: "",
        images: [],
        price: "",
      },
    }),
}));
