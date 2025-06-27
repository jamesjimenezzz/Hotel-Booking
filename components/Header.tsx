import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="flex justify-between   mx-auto items-center px-10 py-4 border-b">
      <div className="flex items-center gap-4 w-full">
        <h1>HEADER</h1>
        <Input type="text" className="max-w-1/4 w-full" placeholder="Search" />
      </div>

      <div className="flex items-center gap-7">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        <Button variant={"secondary"}>Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
