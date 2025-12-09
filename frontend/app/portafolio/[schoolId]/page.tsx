import Image from 'next/image';

import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import CTA from '../../components/sections/CTA';
import Instagram from '../../components/sections/Instagram';
import Link from 'next/link';

import { getStrapiData, STRAPI_BASE_URL } from '@/app/lib/strapi';

import PromPreview from '../../components/ui/PromPreview';

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ schoolId: string }>;
}) {
  const { schoolId } = await params;

  const strapiSchool = await getStrapiData(
    `/api/schools?filters[schoolId][$eq]=${schoolId}&populate[schoolLogo]=true&populate[schoolCover]=true&populate[proms][populate][promCover]=true`
  );

  const schoolRaw = strapiSchool[0];

  const school = {
    id: schoolRaw.schoolId,
    name: schoolRaw.school,
    previewVideo: schoolRaw.schoolCover?.url ?? null,
    logo: schoolRaw.schoolLogo?.url ?? null,
    proms:
      schoolRaw.proms?.map((prom: any) => ({
        id: prom.promId,
        cover: prom.promCover?.url ?? null,
      })) ?? [],
  };

  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] max-md:h-[550px] w-full overflow-hidden">
        <div className="flex h-full w-full flex-col justify-center px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col items-center gap-32 max-md:gap-20 text-center">
            <div className="font-figtree text-filmo-soft-white flex gap-2 text-xl font-medium">
              <Link
                className="underline underline-offset-3 transition-all duration-200 hover:text-filmo-yellow-100"
                href={`/portafolio`}
              >
                Portafolio
              </Link>
              <span>|</span>
              <p className="text-filmo-yellow-100 font-bold capitalize">
                {schoolId}
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <Image
                src={`${school.logo}`}
                className="h-24 object-contain"
                alt=""
                width={400}
                height={200}
              />

              <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:w-auto max-md:text-xl">
                <p>
                  Lo vivimos con ellos y nosotros lo guardamos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <video
          className="fixed z-0 h-full w-full object-cover opacity-15"
          autoPlay
          muted
          loop
        >
          <source
            src={`${school.previewVideo}`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-52 px-48 py-32 max-md:px-6 max-md:py-12">
        <div className="flex w-full flex-wrap justify-center gap-20 max-xl:flex-col max-md:flex-col">
          {school.proms.map((prom) => {
            return (
              <div
                className="mb-12 flex w-5/12 max-xl:w-full max-md:w-full max-md:mb-0"
                key={prom.id}
              >
                <PromPreview
                  promId={prom.id}
                  previewImage={`${prom.cover}`}
                  schoolId={school.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
