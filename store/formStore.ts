import { create } from "zustand";

export interface HotelData {
  name: string;
  country: string;
  state: string;
  city: string;
  description: string;
  amenities: string[];
  images: File[];
}

export interface RoomData {
  name: string;
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
    name: "",
    country: "",
    state: "",
    city: "",
    description: "",
    amenities: [],
    images: [],
  },
  room: {
    name: "",
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
        name: "",
        country: "",
        state: "",
        city: "",
        description: "",
        amenities: [],
        images: [],
      },
      room: {
        name: "",
        facilities: [],
        persons: "",
        images: [],
        price: "",
      },
    }),
}));
