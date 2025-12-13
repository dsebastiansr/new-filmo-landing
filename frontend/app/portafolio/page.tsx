import { Metadata } from 'next';

import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import CTA from '../components/sections/CTA';
import Instagram from '../components/sections/Instagram';
import Polaroid from '../components/ui/Polaroid';
import SchoolPreview from '../components/ui/SchoolPreview';
import UnderlinedButton from '../components/ui/UnderlinedButton';
import UnderlinedText from '../components/ui/UnderlinedText';
import { getStrapiData } from '../lib/strapi';

export const metadata: Metadata = {
  title: "• Portafolio •",
  description: "Filmo",
};

export default async function Portafolio() {
  const strapiData = await getStrapiData(
    '/api/schools?populate[schoolLogo]=true&populate[schoolCover]=true&populate[priority]=true'
  );

  const data = strapiData.map((school: any) => ({
    id: school.schoolId,
    name: school.school,
    previewVideo: school.schoolCover.url,
    logo: school.schoolLogo.url,
    priority: school.priority
  }));

  return (
    <div className="bg-filmo-black-100 flex flex-col">
      <Navbar />

      <div className="flex h-[800px] max-md:h-dvh">
        <div className="flex h-full w-full flex-col justify-end px-42 py-32 max-md:px-6 max-md:py-12">
          <div className="z-10 flex flex-col gap-5">
            <div className="font-garamond text-left text-8xl font-extrabold text-white max-md:text-6xl">
              <h1>Nuestro</h1>
              <h1>Portafolio</h1>
            </div>

            <div className="font-figtree text-filmo-soft-white w-[26ch] text-2xl max-md:text-xl">
              <p>Lo vivimos con ellos y nosotros lo guardamos para siempre.</p>
            </div>

            <UnderlinedButton
              linkTo="#works"
              text="Conoce nuestro trabajo"
              styles=""
            />
          </div>
        </div>

        <video
          className="fixed z-0 h-full w-full object-cover opacity-15 max-md:h-dvh"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="bg-noise bg-filmo-black-100 z-10 flex flex-col gap-52 px-48 py-32 pt-4 max-xl:pt-32 max-md:w-full max-md:gap-32 max-md:px-6 max-md:py-16">
        <div className="flex w-full items-center justify-between max-xl:flex-col-reverse max-xl:items-center max-xl:gap-16">
          <div className="flex w-[45%] max-xl:w-3/4 max-md:w-[90%]">
            <Polaroid img="/img/polaroid.webp" />
          </div>

          <div className="flex w-1/2 items-center justify-end max-xl:justify-center max-md:w-full">
            <div className="flex flex-col items-center gap-12 max-md:gap-6">
              <div className="flex flex-col items-center gap-1">
                <p className="font-figtree text-filmo-soft-white text-xl font-medium uppercase">
                  somos filmo
                </p>
                <h1 className="font-garamond text-filmo-white w-[18ch] text-center text-6xl font-extrabold max-md:w-auto max-md:text-4xl">
                  Capturamos las historias que se viven con fuerza: en la cancha, en el aula y en esos abrazos de despedida.
                </h1>
              </div>
              <UnderlinedButton linkTo="#cta" text="Contáctanos" styles="" />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-24">
          <div className="flex flex-col gap-4 text-center">
            <p className="font-figtree text-filmo-soft-white text-xl font-medium uppercase">
              colegios
            </p>
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-garamond text-filmo-white text-7xl font-extrabold max-md:text-5xl">
                Cada colegio, una
              </h1>
              <h1 className="font-garamond text-filmo-white flex gap-5 text-7xl font-extrabold max-md:text-5xl max-md:gap-3">
                historia{' '}
                <UnderlinedText
                  text="distinta"
                  full={true}
                  textSize="5xl"
                  styles="after:-bottom-2 after:max-md:-bottom-1"
                />
              </h1>
            </div>
          </div>

          <div
            className="flex w-full flex-wrap justify-center gap-20 max-xl:flex-col max-md:gap-12"
            id="works"
          >
            {data
              .slice()
              .sort((a, b) => (a.priority) - (b.priority))
              .map((school: {
                id: string;
                name: string;
                schoolId: string;
                previewVideo: string;
                logo: string;
                priority: number;
              }) => (
                <div
                  className="mb-12 flex w-5/12 max-xl:w-full"
                  key={school.id}
                >
                  <SchoolPreview
                    schoolName={school.name}
                    schoolId={school.id}
                    schoolLogo={`${school.logo}`}
                    videoURL={`${school.previewVideo}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <CTA />
      <Instagram />
      <Footer />
    </div>
  );
}
