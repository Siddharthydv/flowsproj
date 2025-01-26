import dotenv from 'dotenv'
dotenv.config();
import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";

import Image from 'next/image';
export default function Home() {
  console.log(process.env.NEXT_PUBLIC_HOOKS)
  return (
    <main className="flex-col  w-[100vw]  dborder border-red-700 ">
      
        <Hero />
        {/* <div className='flex'>
            <Image
                src={githubimg}
              
                alt="Picture of the author"
                className='w-[7vmax]'
              />
          </div> */}
     
    </main>
  );
}
