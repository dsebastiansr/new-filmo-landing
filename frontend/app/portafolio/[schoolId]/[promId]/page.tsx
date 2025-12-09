import Navbar from '../../../components/layouts/Navbar';
import Image from 'next/image';
import CTA from '@/app/components/sections/CTA';
import Instagram from '@/app/components/sections/Instagram';
import Footer from '@/app/components/layouts/Footer';
import { getStrapiData, STRAPI_BASE_URL, toRoman } from '../../../lib/strapi';
import { PromCollage } from '../../../components/sections/PromCollage';
import Link from 'next/link';

export default async function promPage({ params }: { params: Promise<{ schoolId: string; promId: string }> }) {

  const { schoolId, promId } = await params;

  const strapiProm = await getStrapiData(
    `/api/proms?filters[promId][$eq]=${promId}` +
    `&filters[school][schoolId][$eq]=${schoolId}` +
    `&populate=*`
  );

  const promRaw = strapiProm[0];

  const prom = {
    id: promRaw.promId,
    school: promRaw.school.schoolId,
    cover: promRaw.promCover?.url,
    videoId: promRaw.promVideoId,
    text: promRaw.promText,
    subText: promRaw.promSubText,
  };

  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] w-full overflow-hidden max-md:h-[550px]">
        <div className="flex h-full w-full flex-col justify-center px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col items-center gap-32 text-center max-md:gap-20">
            <div className="font-figtree text-filmo-soft-white flex gap-2 text-xl font-medium max-md:items-center max-md:text-lg">
              <Link className="underline underline-offset-3 transition-all duration-200 hover:text-filmo-yellow-100" href={`/portafolio`}>
                Portafolio
              </Link>
              <span>|</span>
              <Link
                className="underline underline-offset-3 capitalize transition-all duration-200 hover:text-filmo-yellow-100"
                href={`/portafolio/${schoolId}/`}
              >
                {schoolId}
              </Link>
              <span>|</span>
              <p className="text-filmo-yellow-100 font-bold max-md:text-sm">
                Promocion {toRoman(Number(promId), schoolId)}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <h1 className="font-garamond text-8xl font-extrabold text-white max-md:text-6xl">
                Promoción {toRoman(Number(promId), schoolId)}
              </h1>

              <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:w-auto max-md:text-xl">
                <p>
                  Lo vivimos con ellos y nosotros lo guardamos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Image
          className="fixed z-0 h-full w-full object-cover opacity-15"
          width={500}
          height={300}
          src={`${STRAPI_BASE_URL}${prom.cover}`}
          alt={`Imagen para ${toRoman(Number(promId), schoolId)}`}
        />
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-52 px-48 py-32 max-md:gap-16 max-md:px-6 max-md:py-12">
        <div className="flex w-full justify-between gap-8 max-md:flex-col max-md:gap-4">
          <div className="w-8/12 max-md:w-full">
            <h1 className="font-garamond text-filmo-white text-7xl font-extrabold max-md:text-3xl">
              {prom.text}
            </h1>
          </div>

          <div className="flex w-4/12 justify-end max-md:w-full">
            <p className="font-figtree text-filmo-soft-white w-[30ch] text-right text-2xl max-md:w-full max-md:text-left max-md:text-xl">
              {prom.subText}
            </p>
          </div>
        </div>

        <PromCollage params={{ schoolId, promId }} />

        <div className="flex w-full flex-col items-center justify-between gap-8 max-md:gap-4">
          <div className="flex w-full flex-col items-center">
            <p className="font-figtree text-filmo-gray text-center text-lg font-medium uppercase">
              Video
            </p>
            <h1 className="font-garamond text-filmo-white w-[13ch] text-center text-7xl font-extrabold max-md:w-full max-md:text-5xl">
              Un resumen de lo que se vivió
            </h1>
          </div>
          <div className="aspect-video w-4/5 bg-[#777] rounded-sm overflow-hidden">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src={`https://player.vimeo.com/video/${prom.videoId}?title=0&byline=0&portrait=0&badge=0&autopause=1&player_id=0&app_id=58479&quality=1080p&loop=1`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="Montessori 16"
              />
            </div>
          </div>
        </div>
      </div>
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
