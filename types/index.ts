export interface Hotel {
  title: string;
  description: string;
  amenities: string[];
  images: File[];
}

export interface Room {
  title: string;
  facilities: string[];
  persons: string;
  images: File[];
  price: string;
}
