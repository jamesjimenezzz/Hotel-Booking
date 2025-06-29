import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-between   mx-auto items-center px-10 py-4 border-b">
      <div className="flex items-center gap-4 ">
        <Link href="/">
          <h1>BookPlace</h1>
        </Link>
      </div>

      <div className="flex items-center  gap-7">
        <Link href="/create">
          <span className="text-gray-400  relative  transition-all duration-300 group">
            <p className="group-hover:text-white transition-all duration-300">
              Bookings
            </p>
            <span className="absolute bottom-0 left-0 w-full origin-left h-0.5 bg-white scale-x-0 group-hover:scale-x-30 transition-all duration-300"></span>
          </span>
        </Link>

        <Link href="/create">
          <span className="text-gray-400 hover:text-white hover:underline transition-all duration-300">
            I want to list my hotel
          </span>
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
