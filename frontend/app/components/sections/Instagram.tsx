import Image from 'next/image';
import Link from 'next/link';
import IgButton from '../ui/IgButton';

export default function Instagram() {
  return (
    <div className="bg-noise bg-filmo-black-100 z-10 flex w-full items-center overflow-x-hidden py-32 pl-48 max-md:flex-col max-md:gap-12 max-md:px-6 max-md:py-12">
      <div className="flex w-[40%] flex-col gap-16 max-md:w-full max-md:items-center max-md:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-figtree text-filmo-soft-white text-2xl font-medium uppercase max-md:text-center max-md:text-lg">
            Instagram
          </h1>
          <h1 className="font-garamond text-filmo-white text-[80px] leading-20 font-extrabold max-md:w-full max-md:text-center max-md:text-5xl max-md:leading-none">
            Sigue de cerca <br /> nuestro trabajo
          </h1>
        </div>

        <IgButton />
      </div>

      <div className="relative h-[450px] w-[75%] max-md:h-[350px] max-md:w-full">
        <div className=" absolute -right-1/8 flex h-full w-full justify-end gap-4 max-md:static max-md:mr-0 max-md:w-full max-md:justify-start max-md:overflow-x-auto">
          <Link
            href="https://www.instagram.com/filmo.inc/"
            target="_blank"
            className="relative w-full rounded-xl object-cover max-xl:w-1/2 max-md:w-64 max-md:shrink-0"
          >
            <Image className="object-contain" src="/img/ff1.png" alt="" fill />
          </Link>

          <Link
            href="https://www.instagram.com/filmo.inc/"
            target="_blank"
            className="relative w-full rounded-xl object-cover max-xl:w-1/2 max-md:w-64 max-md:shrink-0"
          >
            <Image className="object-contain" src="/img/ff2.png" alt="" fill />
          </Link>

          <Link
            href="https://www.instagram.com/filmo.inc/"
            target="_blank"
            className="relative w-full rounded-xl object-cover max-xl:w-1/2 max-md:w-64 max-md:shrink-0"
          >
            <Image className="object-contain" src="/img/ff3.png" alt="" fill />
          </Link>
        </div>
      </div>
    </div>
  );
}
