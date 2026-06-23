import { Button } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="bg-[url('/book.png')] h-[70vh] w-full bg-cover bg-no-repeat bg-center flex items-center shadow-2xl">
      {/* Overlay */}
      <div className="w-full h-full rounded-lg bg-black/50 flex items-center ">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
            Empowering Voices, Sharing Stories.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl text-gray-200">
           Read. Write. Inspire. 🚀
          
          </p>

          <div className="flex gap-4">
            <Link href="/signin">
              <Button className="bg-linear-to-r from-pink-500 via-purple-500 bg-red-500">
                Get Started
              </Button>
            </Link>

            <Link href="#">
              <Button variant="outline" className="text-white">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;