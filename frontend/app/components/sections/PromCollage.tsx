import Image from 'next/image';

import PromCollageClient from './PromCollageClient';

export async function PromCollage(promPics: any) {

  const pics = promPics.promPics 

  return (
    <div className="flex items-center flex-col gap-16 w-full h-auto transition-all">
      <div
        id="collage-photos"
        className="flex w-full gap-6 max-md:gap-2 max-h-[3000px] max-md:max-h-[1000px] overflow-hidden transition-all duration-500 relative"
      >
        {/* Desktop: 3 columnas */}
        <div className="w-full flex">

          <div className="flex w-full max-md:hidden max-md:gap-2 gap-6">
            {['left', 'center', 'right'].map((col, colIndex) => (
              <div
                key={colIndex}
                className="h-full flex flex-col gap-6 max-md:gap-2 w-4/12"
              >
                {pics
                  .filter((_: any, i: number) => i % 3 === colIndex)
                  .map((fileObj: any) => (
                    <Image
                      key={fileObj.id}
                      src={`${fileObj.url}`}
                      alt={fileObj.url}
                      width={1200}
                      height={800}
                      className="rounded-lg"
                    />
                  ))}
              </div>
            ))}
          </div>

          <div className="hidden w-full max-md:flex gap-6 max-md:gap-2">
            {[0, 1].map((colIndex) => (
              <div
                key={colIndex}
                className="h-full flex flex-col gap-6 max-md:gap-2 w-1/2"
              >
                {pics
                  .filter((_: any, i: number) => i % 2 === colIndex)
                  .map((fileObj: any) => (
                    <Image
                      key={fileObj.id}
                      src={`${fileObj.url}`}
                      alt={fileObj.url}
                      width={1200}
                      height={800}
                      className="rounded-lg"
                    />
                  ))}
              </div>
            ))}
          </div>

        </div>

        <div
          id="shadow"
          className="transition-all absolute bottom-0 left-0 h-60 w-full bg-linear-to-t from-filmo-black-100 to-transparent"
        ></div>
      </div>

      <button
        id="show-more-btn"
        className="w-fit flex justify-end gap-2 bg-filmo-yellow-100 font-figtree text-filmo-black-100 rounded-full px-12 py-3 font-bold uppercase cursor-pointer"
        type="button"
      >
        Ver más
      </button>
      <PromCollageClient />
    </div>
  );
}
